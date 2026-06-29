import { createT, getMetaSeasonLabel, type Locale } from '@/lib/i18n';

/** Display label for current global meta season (update after major patches). */
export const META_SEASON_LABEL = 'S15 (June 2026)';
export const GEO_BUILD_YEAR = '2026';

export function heroPageTitle(heroName: string, locale: Locale = 'en'): string {
  if (locale === 'zh-TW') {
    return `${heroName} 出裝 ${GEO_BUILD_YEAR} - 裝備、銘文、克制與攻略`;
  }
  return `${heroName} Build ${GEO_BUILD_YEAR} - Best Items, Arcana, Counters & Guide`;
}

export function heroPageDescription(
  heroName: string,
  lane: string,
  date: string,
  locale: Locale = 'en'
): string {
  const season = getMetaSeasonLabel(locale);
  if (locale === 'zh-TW') {
    return `${heroName} ${lane} ${GEO_BUILD_YEAR} 出裝攻略，包含最佳裝備、銘文、召喚師技能、克制、分路打法與工具計算。更新：${date}，版本：${season}。`;
  }
  const t = createT(locale);
  const fallback = t('hero.metaDesc', { name: heroName, lane, date });
  return `Best ${heroName} build for Honor of Kings in ${GEO_BUILD_YEAR}, including items, arcana, counters, skills, lane tips, and damage tools. Updated ${date}. ${fallback}`;
}
