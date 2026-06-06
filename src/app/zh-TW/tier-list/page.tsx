import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { TierListPageView } from '@/views/TierListPageView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('tierList.title')),
  description: t('tierList.subtitle'),
  path: '/tier-list',
  locale: 'zh-TW',
});

export default function ZhTWTierListPage() {
  return <TierListPageView locale="zh-TW" />;
}
