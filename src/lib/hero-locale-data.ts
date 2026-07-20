import type {
  Hero,
  HeroBuildItem,
  HeroBuildPreset,
  HeroSkill,
  PatchEntry,
} from '@/types/hero';
import type { Locale } from '@/lib/i18n';
import { getHeroNameZh } from '@/lib/locale-names';

export type HeroBuildSource = Pick<
  Hero,
  'build' | 'buildZh' | 'builds' | 'buildsZh'
>;

export type HeroSkillSource = Pick<Hero, 'skills' | 'skillsZh'>;

export function hasCampZhContent(hero: Hero): boolean {
  return Boolean(
    hero.skillsZh?.length &&
      hero.skillsZh.some((s) => s.name && s.name !== 'Data unavailable')
  );
}

export function getLocalizedHeroName(hero: Hero, locale: Locale): string {
  if (locale === 'zh-TW') {
    return hero.nameZh || getHeroNameZh(hero.slug) || hero.name;
  }
  return hero.name;
}

export function getLocalizedSkills(hero: HeroSkillSource, locale: Locale): HeroSkill[] {
  if (locale === 'zh-TW' && hero.skillsZh?.length) return hero.skillsZh;
  return hero.skills;
}

export function getLocalizedBuild(
  hero: Pick<Hero, 'build' | 'buildZh'>,
  locale: Locale
): HeroBuildItem[] {
  if (locale === 'zh-TW' && hero.buildZh?.length) return hero.buildZh;
  return hero.build;
}

export function getLocalizedBuildPresets(
  hero: HeroBuildSource,
  locale: Locale
): HeroBuildPreset[] {
  if (locale === 'zh-TW' && hero.buildsZh?.length) {
    return hero.buildsZh.filter((b) => b.items?.length);
  }
  if (hero.builds?.length) return hero.builds.filter((b) => b.items?.length);
  const build = getLocalizedBuild(hero, locale);
  if (build.length) return [{ id: 'default', label: 'Recommended', items: build }];
  return [];
}

export function getLocalizedArcana(hero: Hero, locale: Locale): string[] {
  if (locale === 'zh-TW' && hero.arcanaZh?.length) return hero.arcanaZh;
  return hero.arcana;
}

export function getLocalizedSpells(hero: Hero, locale: Locale): string[] {
  if (locale === 'zh-TW' && hero.spellsZh?.length) return hero.spellsZh;
  return hero.spells;
}

export function getLocalizedPatchHistory(hero: { patchHistory?: PatchEntry[]; patchHistoryZh?: PatchEntry[] }, locale: Locale): PatchEntry[] {
  if (locale === 'zh-TW' && hero.patchHistoryZh?.length) return hero.patchHistoryZh;
  return hero.patchHistory ?? [];
}

export function getLocalizedLane(hero: Hero, locale: Locale): string | null {
  if (locale === 'zh-TW' && hero.laneZh) return hero.laneZh;
  return hero.lane ?? null;
}

export function usingZhFallback(hero: Hero, locale: Locale): boolean {
  return locale === 'zh-TW' && !hasCampZhContent(hero);
}

/** Lane label for UI — Camp zh-TW lane name when synced. */
export function getHeroLaneLabel(hero: Hero, locale: Locale): string | null {
  return getLocalizedLane(hero, locale);
}
