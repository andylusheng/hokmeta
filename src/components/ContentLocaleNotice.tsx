import type { Hero } from '@/types/hero';
import type { Locale } from '@/lib/i18n';
import { createT } from '@/lib/i18n';
import { usingZhFallback } from '@/lib/hero-locale-data';

/** Shown only when zh-TW page lacks Camp Traditional Chinese skill data. */
export function ContentLocaleNotice({
  locale,
  hero,
}: {
  locale: Locale;
  hero?: Hero;
}) {
  if (locale !== 'zh-TW') return null;
  if (hero && !usingZhFallback(hero, locale)) return null;
  const t = createT(locale);
  return (
    <p className="mb-6 rounded-lg border border-hok-border/80 bg-hok-card/40 px-4 py-3 text-sm text-gray-400">
      {t('common.skillsFallbackNotice')}
    </p>
  );
}
