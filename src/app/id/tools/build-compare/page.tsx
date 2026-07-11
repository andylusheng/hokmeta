import { heroes, items } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BuildCompareView } from '@/views/BuildCompareView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.buildComparePageTitle')),
  description: t('tools.buildComparePageDesc'),
  path: '/tools/build-compare',
  locale: 'id',
  keywords: [
    'Honor of Kings build compare',
    'HOK build compare Indonesia',
    'Honor of Kings build damage',
  ],
});

export default function ZhTWBuildComparePage() {
  return <BuildCompareView heroes={heroes} items={items} locale="id" />;
}
