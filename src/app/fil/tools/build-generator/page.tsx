import { heroes } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BuildGeneratorView } from '@/views/BuildGeneratorView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.buildPageTitle')),
  description: t('tools.buildGenDesc'),
  path: '/tools/build-generator',
  locale: 'fil',
});

export default function ZhTWBuildGeneratorPage() {
  return <BuildGeneratorView heroes={heroes} locale="fil" />;
}
