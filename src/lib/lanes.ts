import { heroes, sortByMetaScore } from '@/lib/data';
import type { Hero, HeroTier } from '@/types/hero';

export type GameLane = 'clash' | 'jungle' | 'mid' | 'farm' | 'roam';

export const LANE_ORDER: GameLane[] = ['clash', 'jungle', 'mid', 'farm', 'roam'];

export const LANE_LABEL: Record<GameLane, string> = {
  clash: 'Clash Lane',
  jungle: 'Jungling',
  mid: 'Mid Lane',
  farm: 'Farm Lane',
  roam: 'Roaming',
};

/** HoKStats-style lane tier bands (S+ maps to S). */
export const LANE_TIER_BANDS = ['S', 'A', 'B', 'C', 'D'] as const;
export type LaneTierBand = (typeof LANE_TIER_BANDS)[number];

const LANE_TIER_MAP: Record<HeroTier, LaneTierBand> = {
  'S+': 'S',
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'D',
};

export function heroToLane(hero: Hero): GameLane {
  const lane = (hero.lane || '').toLowerCase();
  if (lane.includes('clash') || lane.includes('對抗')) return 'clash';
  if (lane.includes('jungle') || lane.includes('打野')) return 'jungle';
  if (lane.includes('mid') || lane.includes('中路')) return 'mid';
  if (lane.includes('farm') || lane.includes('发育') || lane.includes('發育')) return 'farm';
  if (lane.includes('roam') || lane.includes('游走') || lane.includes('輔助')) return 'roam';
  const role = hero.role;
  if (role === 'Marksman') return 'farm';
  if (role === 'Mage') return 'mid';
  if (role === 'Support') return 'roam';
  if (role === 'Assassin') return 'jungle';
  if (role === 'Tank') return 'clash';
  return 'clash';
}

export function heroLaneTierBand(hero: Hero): LaneTierBand {
  return LANE_TIER_MAP[hero.tier] ?? 'C';
}

export function getTierListByLane(): Record<GameLane, Record<LaneTierBand, Hero[]>> {
  const result = {} as Record<GameLane, Record<LaneTierBand, Hero[]>>;
  for (const lane of LANE_ORDER) {
    result[lane] = { S: [], A: [], B: [], C: [], D: [] };
  }
  for (const hero of heroes) {
    const lane = heroToLane(hero);
    const band = heroLaneTierBand(hero);
    result[lane][band].push(hero);
  }
  for (const lane of LANE_ORDER) {
    for (const band of LANE_TIER_BANDS) {
      result[lane][band] = sortByMetaScore(result[lane][band]);
    }
  }
  return result;
}

/** International-only roster highlights (HoKStats "Exclusive on Global"). */
export const EXCLUSIVE_GLOBAL_SLUGS = [
  'ata',
  'butterfly',
  'fatih',
  'flowborn-mage',
  'flowborn-tank',
  'flowborn-marksman',
  'garuda',
  'lapulapu',
  'luara',
] as const;

export function getExclusiveGlobalHeroes(): Hero[] {
  return EXCLUSIVE_GLOBAL_SLUGS.map(
    (slug) => heroes.find((h) => h.slug === slug)!
  ).filter(Boolean);
}

export function countUniqueArcana(): number {
  const set = new Set<string>();
  for (const h of heroes) {
    for (const a of h.arcana || []) {
      if (a && a !== 'Data unavailable') set.add(a);
    }
  }
  return set.size;
}
