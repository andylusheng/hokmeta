import { heroes, items } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BuildCompareView } from '@/views/BuildCompareView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.buildComparePageTitle')),
  description: t('tools.buildComparePageDesc'),
  path: '/tools/build-compare',
  locale: 'en',
  keywords: [
    'Honor of Kings build compare',
    'HOK item comparison',
    'Honor of Kings build damage',
    'HOK best build calculator',
  ],
});

export default function BuildComparePage() {
  return <BuildCompareView heroes={heroes} items={items} locale="en" />;
}
