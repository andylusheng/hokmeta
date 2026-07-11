import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BestHeroesIndexView } from '@/views/BestHeroesIndexView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('bestHeroes.title')),
  description: t('bestHeroes.subtitle'),
  path: '/best-heroes',
  locale: 'fil',
});

export default function ZhTWBestHeroesPage() {
  return <BestHeroesIndexView locale="fil" />;
}
