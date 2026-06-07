import { formatRate, heroes, metaScore } from '@/lib/data';
import { heroToLane, LANE_ORDER, type GameLane } from '@/lib/lanes';
import type { Hero } from '@/types/hero';
import { createT, type Locale } from '@/lib/i18n';

export interface ClimbPick {
  hero: Hero;
  score: number;
  reasons: string[];
  laneRank: number;
}

const PICKS_PER_LANE = 5;

function buildReasons(hero: Hero, locale: Locale): string[] {
  const t = createT(locale);
  const reasons: string[] = [];

  if (hero.tier === 'S+' || hero.tier === 'S') {
    reasons.push(t('climb.reasonTier', { tier: hero.tier }));
  }
  if ((hero.winRate ?? 0) >= 51) {
    reasons.push(t('climb.reasonWr', { wr: formatRate(hero.winRate) }));
  }
  if ((hero.pickRate ?? 0) >= 1) {
    reasons.push(t('climb.reasonPick', { pick: formatRate(hero.pickRate) }));
  }
  if ((hero.banRate ?? 0) >= 0.5) {
    reasons.push(t('climb.reasonBan', { ban: formatRate(hero.banRate) }));
  }
  if (!reasons.length) {
    reasons.push(t('climb.reasonStable', { tier: hero.tier, wr: formatRate(hero.winRate) }));
  }

  return reasons.slice(0, 3);
}

export function getClimbPicksByLane(lane: GameLane, limit = PICKS_PER_LANE): ClimbPick[] {
  const pool = heroes.filter((h) => heroToLane(h) === lane);
  const sorted = [...pool].sort((a, b) => metaScore(b) - metaScore(a));

  return sorted.slice(0, limit).map((hero, laneRank) => ({
    hero,
    score: metaScore(hero),
    reasons: buildReasons(hero, 'en'),
    laneRank: laneRank + 1,
  }));
}

export function getAllClimbPicks(locale: Locale = 'en'): Record<GameLane, ClimbPick[]> {
  const result = {} as Record<GameLane, ClimbPick[]>;
  for (const lane of LANE_ORDER) {
    result[lane] = getClimbPicksByLane(lane).map((pick) => ({
      ...pick,
      reasons: buildReasons(pick.hero, locale),
    }));
  }
  return result;
}

export function getClimbPickForHero(hero: Hero, locale: Locale = 'en'): ClimbPick | null {
  const lane = heroToLane(hero);
  const picks = getClimbPicksByLane(lane);
  const idx = picks.findIndex((p) => p.hero.slug === hero.slug);
  if (idx < 0) return null;
  const pick = picks[idx];
  return {
    ...pick,
    reasons: buildReasons(hero, locale),
    laneRank: idx + 1,
  };
}

export function isClimbPick(hero: Hero): boolean {
  return getClimbPickForHero(hero) !== null;
}
