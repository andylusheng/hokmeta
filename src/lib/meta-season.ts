import { createT, getMetaSeasonLabel, type Locale } from '@/lib/i18n';

/** Display label for current global meta season (update after major patches). */
export const META_SEASON_LABEL = 'S12 (June 2026)';

export function heroPageTitle(heroName: string, locale: Locale = 'en'): string {
  const t = createT(locale);
  return t('hero.metaTitle', {
    name: heroName,
    season: getMetaSeasonLabel(locale),
  });
}

export function heroPageDescription(
  heroName: string,
  lane: string,
  date: string,
  locale: Locale = 'en'
): string {
  const t = createT(locale);
  return t('hero.metaDesc', { name: heroName, lane, date });
}
