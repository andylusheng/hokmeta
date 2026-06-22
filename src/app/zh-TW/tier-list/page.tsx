import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { getLatestHeroDataDate } from '@/lib/data';
import { TierListPageView } from '@/views/TierListPageView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('tierList.title')),
  description: t('tierList.subtitle'),
  path: '/tier-list',
  locale: 'zh-TW',
  modifiedTime: getLatestHeroDataDate(),
});

export default function ZhTWTierListPage() {
  return <TierListPageView locale="zh-TW" />;
}
