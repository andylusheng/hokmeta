import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { getLatestHeroDataDate } from '@/lib/data';
import { TierListPageView } from '@/views/TierListPageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('tierList.title')),
  description: t('tierList.subtitle'),
  path: '/tier-list',
  locale: 'en',
  modifiedTime: getLatestHeroDataDate(),
});

export default function TierListPage() {
  return <TierListPageView locale="en" />;
}
