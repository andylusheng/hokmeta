'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { heroes } from '@/lib/data';
import { HeroCard } from '@/components/HeroCard';
import { createT, localePath, type Locale } from '@/lib/i18n';

export function SearchResults({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const params = useSearchParams();
  const q = (params.get('q') ?? '').trim().toLowerCase();
  const results = q
    ? heroes.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.slug.includes(q) ||
          h.role.toLowerCase().includes(q)
      )
    : [];

  if (!q) {
    return <p className="text-gray-400">{t('search.empty')}</p>;
  }
  if (!results.length) {
    return (
      <p className="text-gray-400">
        {t('search.noResults')}{' '}
        <Link
          href={localePath(locale, '/heroes')}
          className="text-hok-gold hover:underline"
        >
          {t('search.browseAll')}
        </Link>
      </p>
    );
  }

  return (
    <>
      <p className="mb-6 text-gray-400">
        {t('search.resultCount', { count: results.length, q: params.get('q') ?? '' })}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((hero) => (
          <HeroCard key={hero.slug} hero={hero} locale={locale} />
        ))}
      </div>
    </>
  );
}
