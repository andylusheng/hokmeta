import { buildMetadata } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { SearchPageView } from '@/views/SearchPageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: t('search.title'),
  description: t('search.label'),
  path: '/search',
  noindex: true,
  locale: 'en',
});

export default function SearchPage() {
  return <SearchPageView locale="en" />;
}
