import heroesData from '../../data/heroes.json';
import itemsData from '../../data/items.json';
import keywordsData from '../../data/keywords.json';
import siteConfig from '../../config/site.json';
import { getLocalizedBuildPresets } from '@/lib/hero-locale-data';
import type { Locale } from '@/lib/i18n';
import type {
  GameItem,
  Hero,
  HeroBuildPreset,
  HeroRole,
  HeroTier,
  KeywordsMap,
} from '@/types/hero';

export const site = siteConfig;
export const heroes = heroesData as Hero[];
export const items = itemsData as GameItem[];
export const keywords = keywordsData as KeywordsMap;

export function getItemById(id: string): GameItem | undefined {
  return items.find((i) => i.id === id);
}

export function getItemSlugs(): string[] {
  return items.map((i) => i.id);
}

export function getHeroBySlug(slug: string): Hero | undefined {
  return heroes.find((h) => h.slug === slug);
}

export function getHeroBuildPresets(hero: Hero, locale: Locale = 'en'): HeroBuildPreset[] {
  return getLocalizedBuildPresets(hero, locale);
}

export function defaultBuildPresetIndex(hero: Hero, locale: Locale = 'en'): number {
  const presets = getHeroBuildPresets(hero, locale);
  if (!presets.length) return 0;
  if (hero.lane) {
    const laneIdx = presets.findIndex(
      (p) =>
        p.lane === hero.lane ||
        p.label.toLowerCase().includes(hero.lane!.split(' ')[0].toLowerCase())
    );
    if (laneIdx >= 0) return laneIdx;
  }
  const recIdx = presets.findIndex(
    (p) => p.id === 'recommended' || /principal|recommend/i.test(p.label)
  );
  return recIdx >= 0 ? recIdx : 0;
}

export function getHeroByName(name: string): Hero | undefined {
  const key = name.trim().toLowerCase();
  if (!key || key === 'data unavailable') return undefined;
  return heroes.find((h) => h.name.toLowerCase() === key);
}

export function getHeroesGroupedByRole(): Record<HeroRole, Hero[]> {
  const roles = [
    'Tank',
    'Warrior',
    'Assassin',
    'Mage',
    'Marksman',
    'Support',
  ] as HeroRole[];
  const result = {} as Record<HeroRole, Hero[]>;
  for (const role of roles) {
    result[role] = sortByMetaScore(heroes.filter((h) => h.role === role));
  }
  return result;
}

export function getHeroSlugs(): string[] {
  return heroes.map((h) => h.slug);
}

export function getKeywordsForHero(slug: string): string[] {
  return keywords[slug] ?? [];
}

export function formatRate(value: number | null): string {
  if (value === null || Number.isNaN(value)) return 'Data unavailable';
  return `${value.toFixed(1)}%`;
}

export function formatRank(rank: number | null): string {
  if (rank === null) return 'Data unavailable';
  return `#${rank}`;
}

export function getHeroesByRole(role: HeroRole): Hero[] {
  return heroes.filter((h) => h.role === role);
}

export function getHeroesByTier(tier: HeroTier): Hero[] {
  return heroes.filter((h) => h.tier === tier);
}

function sortByWinRate(list: Hero[]): Hero[] {
  return [...list].sort((a, b) => (b.winRate ?? -1) - (a.winRate ?? -1));
}

const TIER_WEIGHT: Record<HeroTier, number> = {
  'S+': 5,
  S: 4,
  A: 3,
  B: 2,
  C: 1,
};

/** Ranked meta score: tier + pick/ban pressure + WR (not raw WR alone). */
export function metaScore(hero: Hero): number {
  const tier = TIER_WEIGHT[hero.tier] ?? 0;
  return (
    tier * 100 +
    (hero.pickRate ?? 0) * 35 +
    (hero.banRate ?? 0) * 25 +
    (hero.winRate ?? 0) * 0.4
  );
}

export function sortByMetaScore(list: Hero[]): Hero[] {
  return [...list].sort((a, b) => metaScore(b) - metaScore(a));
}

/** Best heroes to queue per role — tier and meta activity, not niche high-WR picks. */
export function getRecommendedHeroesByRole(role: HeroRole, limit = 10): Hero[] {
  return sortByMetaScore(heroes.filter((h) => h.role === role)).slice(0, limit);
}

export function getTierListGrouped(): Record<HeroTier, Record<HeroRole, Hero[]>> {
  const tiers = ['S+', 'S', 'A', 'B', 'C'] as HeroTier[];
  const roles = [
    'Tank',
    'Warrior',
    'Assassin',
    'Mage',
    'Marksman',
    'Support',
  ] as HeroRole[];

  const result = {} as Record<HeroTier, Record<HeroRole, Hero[]>>;
  for (const tier of tiers) {
    result[tier] = {} as Record<HeroRole, Hero[]>;
    for (const role of roles) {
      result[tier][role] = sortByWinRate(
        heroes.filter((h) => h.tier === tier && h.role === role)
      );
    }
  }
  return result;
}

/** Tier list: primary role → S+ / S / A / B bands. */
export function getTierListByRole(): Record<HeroRole, Record<HeroTier, Hero[]>> {
  const tiers = ['S+', 'S', 'A', 'B', 'C'] as HeroTier[];
  const roles = [
    'Tank',
    'Warrior',
    'Assassin',
    'Mage',
    'Marksman',
    'Support',
  ] as HeroRole[];

  const result = {} as Record<HeroRole, Record<HeroTier, Hero[]>>;
  for (const role of roles) {
    result[role] = {} as Record<HeroTier, Hero[]>;
    for (const tier of tiers) {
      result[role][tier] = sortByWinRate(
        heroes.filter((h) => h.role === role && h.tier === tier)
      );
    }
  }
  return result;
}

const tierOrder: HeroTier[] = ['S+', 'S', 'A', 'B', 'C'];

function sortByTier( list: Hero[]): Hero[] {
  return [...list].sort(
    (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  );
}

export function getTopRisingHeroes(limit = 5): Hero[] {
  const withStats = heroes.filter((h) => h.winRate !== null);
  if (withStats.length) {
    return [...withStats]
      .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
      .slice(0, limit);
  }
  return sortByTier(heroes).slice(0, limit);
}

export function getMostPickedHeroes(limit = 5): Hero[] {
  const withStats = heroes.filter((h) => h.pickRate !== null);
  if (withStats.length) {
    return [...withStats]
      .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))
      .slice(0, limit);
  }
  return sortByTier(heroes).slice(0, limit);
}

export function getMostBannedHeroes(limit = 5): Hero[] {
  const withStats = heroes.filter((h) => h.banRate !== null);
  if (withStats.length) {
    return [...withStats]
      .sort((a, b) => (b.banRate ?? 0) - (a.banRate ?? 0))
      .slice(0, limit);
  }
  return sortByTier(heroes).slice(0, limit);
}

export function getRecentMetaChanges(limit = 8): { hero: Hero; patch: string }[] {
  const items: { hero: Hero; patch: string }[] = [];
  for (const hero of heroes) {
    for (const p of hero.patchHistory) {
      if (p.change && p.change !== 'Data unavailable') {
        items.push({ hero, patch: `${p.version}: ${p.change}` });
      }
    }
  }
  return items.slice(0, limit);
}

export const AVATAR_CDN =
  'https://image.inews.gtimg.com/newsapp_bt/0/hokmeta/hero';

export function heroAvatarUrl(slug: string): string {
  const hero = getHeroBySlug(slug);
  return hero?.avatar ?? `${AVATAR_CDN}/${slug}.png`;
}
