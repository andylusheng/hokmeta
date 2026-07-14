import Link from 'next/link';
import { site } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';

interface DataAttributionProps {
  dataSource?: string | null;
  dataUpdated?: string | null;
  /** Hero or page label for the attribution line */
  subject?: string;
  locale?: Locale;
}

export function DataAttribution({
  dataSource,
  dataUpdated,
  subject,
  locale = 'en',
}: DataAttributionProps) {
  const t = createT(locale);
  const copy = {
    'zh-TW': {
      sourceFallback: '官方每日勝率統計 + HOKMeta 編輯校對',
      aria: '資料來源與編輯政策',
    },
    id: {
      sourceFallback: 'Statistik win rate harian resmi + review editorial HOKMeta',
      aria: 'Sumber data dan kebijakan editorial',
    },
    fil: {
      sourceFallback: 'Official daily win-rate stats + HOKMeta editorial review',
      aria: 'Data sources at editorial policy',
    },
    en: {
      sourceFallback: 'Official daily win-rate stats + HOKMeta editorial review',
      aria: 'Data sources and editorial policy',
    },
  }[locale];
  const rawSource = dataSource?.trim();
  const source =
    rawSource && !/Camp HOK/i.test(rawSource)
      ? rawSource
      : copy.sourceFallback;
  const updated = dataUpdated?.trim() || site.dateModified;

  return (
    <aside
      className="mb-8 rounded-lg border border-hok-gold/25 bg-hok-card/60 px-4 py-3 text-sm leading-relaxed text-gray-400"
      aria-label={copy.aria}
    >
      <p className="mb-1 font-medium text-gray-300">
        {subject ? `${subject} — ` : ''}
        {t('attribution.title')}
      </p>
      <ul className="list-inside list-disc space-y-1 text-xs sm:text-sm">
        <li>
          <span className="text-gray-500">{t('attribution.sources')}:</span> {source}
        </li>
        <li>
          <span className="text-gray-500">{t('attribution.synced')}:</span> {updated}
        </li>
        <li>{t('attribution.buildNote')}</li>
        <li>
          {t('attribution.editedBy')}{' '}
          <Link
            href={localePath(locale, '/about')}
            className="text-hok-gold hover:underline"
          >
            {site.author}
          </Link>
          . {t('attribution.disclaimer')}
        </li>
      </ul>
    </aside>
  );
}
