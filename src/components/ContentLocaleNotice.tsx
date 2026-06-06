import type { Locale } from '@/lib/i18n';
import { createT } from '@/lib/i18n';

/** International server: skill/item names stay English in-game. */
export function ContentLocaleNotice({ locale }: { locale: Locale }) {
  if (locale !== 'zh-TW') return null;
  const t = createT(locale);
  return (
    <p className="mb-6 rounded-lg border border-hok-border/80 bg-hok-card/40 px-4 py-3 text-sm text-gray-400">
      {t('common.skillsEnglishNotice')}
    </p>
  );
}
