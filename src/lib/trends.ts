import { heroes, formatRate, sortByMetaScore } from '@/lib/data';
import type { HeroIndexEntry, HeroRole } from '@/types/hero';
import { ROLES } from '@/types/hero';

const MIN_PICK = 0.2;

function byWinRate(limit: number, filter?: (h: HeroIndexEntry) => boolean) {
  return [...heroes]
    .filter((h) => h.winRate !== null && (!filter || filter(h)))
    .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
    .slice(0, limit);
}

function byPickRate(limit: number, filter?: (h: HeroIndexEntry) => boolean) {
  return [...heroes]
    .filter(
      (h) =>
        h.pickRate !== null &&
        (h.pickRate ?? 0) >= MIN_PICK &&
        (!filter || filter(h))
    )
    .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))
    .slice(0, limit);
}

function byBanRate(limit: number) {
  return [...heroes]
    .filter((h) => h.banRate !== null)
    .sort((a, b) => (b.banRate ?? 0) - (a.banRate ?? 0))
    .slice(0, limit);
}

function topInRole(role: HeroRole): HeroIndexEntry | undefined {
  return sortByMetaScore(heroes.filter((h) => h.role === role))[0];
}

/** Current patch standouts — S+/S tier sorted by win rate. */
export function getPatchStrongest(limit = 10) {
  return byWinRate(limit, (h) => h.tier === 'S+' || h.tier === 'S');
}

/** Solo queue: meta score with minimum 51% WR. */
export function getSoloQueueKings(limit = 10) {
  return sortByMetaScore(
    heroes.filter((h) => h.winRate !== null && (h.winRate ?? 0) >= 51)
  ).slice(0, limit);
}

/**
 * Pro-scene proxy — ban + pick pressure on Camp international ranked.
 */
export function getProScenePressure(limit = 10) {
  return [...heroes]
    .filter((h) => h.banRate !== null || h.pickRate !== null)
    .sort((a, b) => {
      const scoreA =
        (a.banRate ?? 0) * 2.2 + (a.pickRate ?? 0) * 1.1 + (a.winRate ?? 0) * 0.15;
      const scoreB =
        (b.banRate ?? 0) * 2.2 + (b.pickRate ?? 0) * 1.1 + (b.winRate ?? 0) * 0.15;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export interface TrendDuo {
  id: string;
  label: string;
  heroes: HeroIndexEntry[];
  note: string;
}

/**
 * Lane-based pairs from top picks in the same strategic slot.
 * Not official duo win rates — only pairs that actually share a lane role.
 */
export function getBestDuos(limit = 6): TrendDuo[] {
  const roam = byPickRate(1, (h) => h.lane === 'Roaming')[0];
  const botAdc = byPickRate(1, (h) => h.lane === 'Farm Lane' && h.role === 'Marksman')[0];
  const jungler = byPickRate(1, (h) => h.lane === 'Jungling')[0];
  const mid = byPickRate(1, (h) => h.lane === 'Mid Lane')[0];
  const clash = byPickRate(1, (h) => h.lane === 'Clash Lane')[0];
  const peelTank = sortByMetaScore(
    heroes.filter((h) => h.role === 'Tank' || h.lane === 'Roaming')
  )[0];
  const diveAssassin = sortByMetaScore(
    heroes.filter((h) => h.role === 'Assassin' && h.lane === 'Jungling')
  )[0];

  const duos: TrendDuo[] = [];

  if (roam && botAdc) {
    duos.push({
      id: 'bot-lane',
      label: 'Bot lane (roam + marksman)',
      heroes: [roam, botAdc],
      note: `${roam.name} peel for ${botAdc.name} · ${formatRate(roam.pickRate)} / ${formatRate(botAdc.pickRate)} pick`,
    });
  }
  if (jungler && mid) {
    duos.push({
      id: 'mid-jungle',
      label: 'Mid + jungle tempo',
      heroes: [jungler, mid],
      note: `Gank chain / objective setup · ${formatRate(jungler.pickRate)} jungle pick`,
    });
  }
  if (jungler && clash) {
    duos.push({
      id: 'side-gank',
      label: 'Jungle + clash side pressure',
      heroes: [jungler, clash],
      note: 'Dive and skirmish top/side after jungle tempo',
    });
  }
  if (peelTank && diveAssassin) {
    duos.push({
      id: 'engage-pick',
      label: 'Engage + assassin pick',
      heroes: [peelTank, diveAssassin],
      note: `Front-to-back: ${peelTank.name} opens, ${diveAssassin.name} follows`,
    });
  }

  const farmMage = byPickRate(1, (h) => h.lane === 'Farm Lane' && h.role === 'Mage')[0];
  if (roam && farmMage) {
    duos.push({
      id: 'farm-mage',
      label: 'Roam + farm mage',
      heroes: [roam, farmMage],
      note: 'Roaming support enables farm-lane mage poke',
    });
  }

  return duos.slice(0, limit);
}

export interface TrendComp {
  id: string;
  label: string;
  heroes: HeroIndexEntry[];
  note: string;
}

/** Five-role draft templates from top Camp metrics. */
export function getBestComps(limit = 4): TrendComp[] {
  const picks = (role: HeroRole) => topInRole(role);
  const jungler =
    byPickRate(1, (h) => h.lane === 'Jungling')[0] ?? picks('Assassin');
  const roam =
    byPickRate(1, (h) => h.lane === 'Roaming')[0] ?? picks('Support');

  const balanced = ROLES.map(picks).filter(Boolean) as HeroIndexEntry[];
  const fastPush = [
    jungler,
    roam,
    byPickRate(1, (h) => h.lane === 'Clash Lane')[0] ?? picks('Warrior'),
    picks('Mage'),
    byPickRate(1, (h) => h.lane === 'Farm Lane' && h.role === 'Marksman')[0] ??
      picks('Marksman'),
  ].filter(Boolean) as HeroIndexEntry[];

  const piggyback = [
    byPickRate(1, (h) => h.lane === 'Farm Lane' && h.role === 'Marksman')[0] ??
      picks('Marksman'),
    roam,
    picks('Tank'),
    jungler,
    picks('Mage'),
  ].filter(Boolean) as HeroIndexEntry[];

  const comps: TrendComp[] = [];
  if (balanced.length >= 5) {
    comps.push({
      id: 'balanced',
      label: 'Balanced ranked (1 per role)',
      heroes: balanced.slice(0, 5),
      note: 'Meta score leaders per role from Camp HOK',
    });
  }
  if (fastPush.length >= 5) {
    comps.push({
      id: 'fast-push',
      label: 'Fast push / early tempo',
      heroes: fastPush.slice(0, 5),
      note: 'Jungle + roam with clash and bot pressure',
    });
  }
  if (piggyback.length >= 5) {
    comps.push({
      id: 'piggyback',
      label: 'Protect the carry',
      heroes: piggyback.slice(0, 5),
      note: 'Farm marksman with peel and jungle space',
    });
  }

  const banHeavy = byBanRate(5);
  if (banHeavy.length >= 3) {
    comps.push({
      id: 'ban-value',
      label: 'Ban-worthy core (draft pressure)',
      heroes: banHeavy,
      note: 'Most banned on global — plan drafts around them',
    });
  }

  return comps.slice(0, limit);
}

export { byWinRate as getTopWinRate, byPickRate as getTopPickRate, byBanRate as getTopBanRate };
