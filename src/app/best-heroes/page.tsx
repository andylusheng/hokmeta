import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { BestHeroesIndexView } from '@/views/BestHeroesIndexView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('bestHeroes.title')),
  description: t('bestHeroes.subtitle'),
  path: '/best-heroes',
  locale: 'en',
});

export default function BestHeroesIndexPage() {
  return <BestHeroesIndexView locale="en" />;
}
