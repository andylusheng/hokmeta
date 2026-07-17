import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BuildCompareView } from '@/views/BuildCompareView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.buildComparePageTitle')),
  description: t('tools.buildComparePageDesc'),
  path: '/tools/build-compare',
  locale: 'zh-TW',
  keywords: [
    'Honor of Kings build compare',
    'HOK 出裝對比',
    'Honor of Kings build damage',
  ],
});

export default function ZhTWBuildComparePage() {
  return <BuildCompareView locale="zh-TW" />;
}
