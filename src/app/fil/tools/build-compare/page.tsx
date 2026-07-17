import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BuildCompareView } from '@/views/BuildCompareView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.buildComparePageTitle')),
  description: t('tools.buildComparePageDesc'),
  path: '/tools/build-compare',
  locale: 'fil',
  keywords: [
    'Honor of Kings build compare',
    'HOK build compare Philippines',
    'Honor of Kings build damage',
  ],
});

export default function ZhTWBuildComparePage() {
  return <BuildCompareView locale="fil" />;
}
