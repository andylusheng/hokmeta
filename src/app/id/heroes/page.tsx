import { heroes } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { HeroesPageView } from '@/views/HeroesPageView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('heroes.title')),
  description: t('heroes.subtitle', { count: heroes.length }),
  path: '/heroes',
  locale: 'id',
});

export default function ZhTWHeroesPage() {
  return <HeroesPageView locale="id" />;
}
