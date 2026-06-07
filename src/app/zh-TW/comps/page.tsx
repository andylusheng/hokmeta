import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { CompsPageView } from '@/views/CompsPageView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('comps.title')),
  description: t('comps.subtitle'),
  path: '/zh-TW/comps',
  locale: 'zh-TW',
});

export default function CompsZhPage() {
  return <CompsPageView locale="zh-TW" />;
}
