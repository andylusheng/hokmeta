import { getFullHeroes } from '@/lib/heroes-server';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BuildGeneratorView } from '@/views/BuildGeneratorView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.buildPageTitle')),
  description: t('tools.buildGenDesc'),
  path: '/tools/build-generator',
  locale: 'id',
});

export default function ZhTWBuildGeneratorPage() {
  return <BuildGeneratorView heroes={getFullHeroes()} locale="id" />;
}
