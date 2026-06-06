import { Suspense } from 'react';
import { createT, type Locale } from '@/lib/i18n';
import { SearchResults } from '@/app/search/SearchResults';

export function SearchPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold text-white">{t('search.title')}</h1>
      <Suspense fallback={<p className="text-gray-400">{t('search.loading')}</p>}>
        <SearchResults locale={locale} />
      </Suspense>
    </div>
  );
}
