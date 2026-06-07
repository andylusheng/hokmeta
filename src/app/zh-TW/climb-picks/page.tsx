import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { ClimbPicksPageView } from '@/views/ClimbPicksPageView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('climb.title')),
  description: t('climb.subtitle'),
  path: '/zh-TW/climb-picks',
  locale: 'zh-TW',
});

export default function ClimbPicksZhPage() {
  return <ClimbPicksPageView locale="zh-TW" />;
}
