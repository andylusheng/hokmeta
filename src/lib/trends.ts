import { heroes, formatRate } from '@/lib/data';
import type { Hero, HeroRole } from '@/types/hero';
import { ROLES } from '@/types/hero';

function byWinRate(limit: number, filter?: (h: Hero) => boolean) {
  return [...heroes]
    .filter((h) => h.winRate !== null && (!filter || filter(h)))
    .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
    .slice(0, limit);
}

function byPickRate(limit: number, filter?: (h: Hero) => boolean) {
  return [...heroes]
    .filter((h) => h.pickRate !== null && (!filter || filter(h)))
    .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))
    .slice(0, limit);
}

function byBanRate(limit: number) {
  return [...heroes]
    .filter((h) => h.banRate !== null)
    .sort((a, b) => (b.banRate ?? 0) - (a.banRate ?? 0))
    .slice(0, limit);
}

function topInRole(role: HeroRole): Hero | undefined {
  return byWinRate(1, (h) => h.role === role)[0];
}

/** Current patch standouts — S+/S tier sorted by win rate. */
export function getPatchStrongest(limit = 10) {
  return byWinRate(limit, (h) => h.tier === 'S+' || h.tier === 'S');
}

/** Solo queue: high WR heroes with meaningful pick rate (not one-trick outliers). */
export function getSoloQueueKings(limit = 10) {
  return [...heroes]
    .filter((h) => h.winRate !== null && (h.pickRate ?? 0) >= 0.15)
    .sort((a, b) => {
      const scoreA = (a.winRate ?? 0) * 0.65 + (a.pickRate ?? 0) * 18;
      const scoreB = (b.winRate ?? 0) * 0.65 + (b.pickRate ?? 0) * 18;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Pro-scene proxy — no live KPL feed; ranks global ban + pick pressure
 * (heroes that dominate draft phase on Camp intl).
 */
export function getProScenePressure(limit = 10) {
  return [...heroes]
    .filter((h) => h.banRate !== null || h.pickRate !== null)
    .sort((a, b) => {
      const scoreA = (a.banRate ?? 0) * 2.2 + (a.pickRate ?? 0) * 1.1 + (a.winRate ?? 0) * 0.15;
      const scoreB = (b.banRate ?? 0) * 2.2 + (b.pickRate ?? 0) * 1.1 + (b.winRate ?? 0) * 0.15;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export interface TrendDuo {
  id: string;
  label: string;
  heroes: Hero[];
  note: string;
}

/** Synergy pairs from top picks per lane/role (Camp data proxy, not duo WR). */
export function getBestDuos(limit = 8): TrendDuo[] {
  const roam = byPickRate(3, (h) => h.lane === 'Roaming' || h.role === 'Support');
  const farm = byPickRate(3, (h) => h.role === 'Marksman');
  const jungle = byPickRate(3, (h) => h.lane === 'Jungling');
  const mid = byPickRate(2, (h) => h.lane === 'Mid Lane' || h.role === 'Mage');
  const clash = byPickRate(2, (h) => h.lane === 'Clash Lane');

  const duos: TrendDuo[] = [];
  if (roam[0] && farm[0]) {
    duos.push({
      id: 'bot-lane',
      label: 'Bot lane (roam + marksman)',
      heroes: [roam[0], farm[0]],
      note: `Peel + farm sync · ${formatRate(roam[0].pickRate)} / ${formatRate(farm[0].pickRate)} pick`,
    });
  }
  if (roam[1] && farm[1]) {
    duos.push({
      id: 'bot-lane-2',
      label: 'Bot lane alt',
      heroes: [roam[1], farm[1]],
      note: 'Second-highest pick bot pairing on global',
    });
  }
  if (jungle[0] && mid[0]) {
    duos.push({
      id: 'mid-jungle',
      label: 'Mid + jungle tempo',
      heroes: [jungle[0], mid[0]],
      note: 'Gank setup / objective control',
    });
  }
  if (jungle[1] && clash[0]) {
    duos.push({
      id: 'side-pressure',
      label: 'Jungle + clash pressure',
      heroes: [jungle[1], clash[0]],
      note: 'Dive and skirmish side lanes',
    });
  }
  const tank = topInRole('Tank');
  const assassin = byPickRate(1, (h) => h.role === 'Assassin')[0];
  if (tank && assassin) {
    duos.push({
      id: 'engage-pick',
      label: 'Engage + pick',
      heroes: [tank, assassin],
      note: 'Front-to-back pick comp core',
    });
  }

  return duos.slice(0, limit);
}

export interface TrendComp {
  id: string;
  label: string;
  heroes: Hero[];
  note: string;
}

/** Five-role draft templates from top Camp metrics (not pro match replay data). */
export function getBestComps(limit = 4): TrendComp[] {
  const picks = (role: HeroRole) => topInRole(role);
  const jungler =
    byPickRate(1, (h) => h.lane === 'Jungling')[0] ?? picks('Assassin');
  const roam =
    byPickRate(1, (h) => h.lane === 'Roaming')[0] ?? picks('Support');

  const balanced = ROLES.map(picks).filter(Boolean) as Hero[];
  const fastPush = [
    jungler,
    roam,
    byPickRate(1, (h) => h.lane === 'Clash Lane')[0] ?? picks('Warrior'),
    picks('Mage'),
    byPickRate(1, (h) => h.role === 'Marksman')[0] ?? picks('Marksman'),
  ].filter(Boolean) as Hero[];

  const piggyback = [
    byPickRate(1, (h) => h.lane === 'Farm Lane' && h.role === 'Marksman')[0] ??
      picks('Marksman'),
    roam,
    picks('Tank'),
    jungler,
    picks('Mage'),
  ].filter(Boolean) as Hero[];

  const comps: TrendComp[] = [];
  if (balanced.length >= 5) {
    comps.push({
      id: 'balanced',
      label: 'Balanced ranked (1 per role, highest WR)',
      heroes: balanced.slice(0, 5),
      note: 'Safe 5-stack template from role WR leaders',
    });
  }
  if (fastPush.length >= 5) {
    comps.push({
      id: 'fast-push',
      label: 'Fast push / early tempo',
      heroes: fastPush.slice(0, 5),
      note: 'Jungle + roam picks with clash and bot pressure',
    });
  }
  if (piggyback.length >= 5) {
    comps.push({
      id: 'piggyback',
      label: 'Piggyback (feed carry)',
      heroes: piggyback.slice(0, 5),
      note: 'Farm marksman with peel — CN 养猪 style',
    });
  }

  const banHeavy = byBanRate(5);
  if (banHeavy.length >= 3) {
    comps.push({
      id: 'ban-value',
      label: 'Ban-worthy core (draft pressure)',
      heroes: banHeavy,
      note: 'Heroes global players ban most — plan around them',
    });
  }

  return comps.slice(0, limit);
}

export { byWinRate as getTopWinRate, byPickRate as getTopPickRate, byBanRate as getTopBanRate };
