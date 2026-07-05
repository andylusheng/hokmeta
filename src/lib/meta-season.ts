import { createT, getMetaSeasonLabel, type Locale } from '@/lib/i18n';

/** Display label for current global meta season (update after major patches). */
export const META_SEASON_LABEL = 'S15 (June 2026)';
export const GEO_BUILD_YEAR = '2026';

export function heroPageTitle(heroName: string, locale: Locale = 'en'): string {
  if (locale === 'zh-TW') {
    return `${heroName} 出裝、裝備、銘文與克制 - Honor of Kings`;
  }
  return `${heroName} Build, Items, Arcana & Counters - Honor of Kings`;
}

export function heroPageDescription(
  heroName: string,
  lane: string,
  date: string,
  locale: Locale = 'en'
): string {
  const season = getMetaSeasonLabel(locale);
  if (locale === 'zh-TW') {
    return `${heroName} ${lane} ${season} 出裝攻略，包含核心裝備、銘文、召喚師技能、克制、分路打法與工具計算。更新：${date}。`;
  }
  return `Best ${heroName} build for Honor of Kings Global ${season}, with core items, arcana, battle spell, counters, matchup tips, and damage tools. Updated ${date}.`;
}
