import { heroes } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { HeroesPageView } from '@/views/HeroesPageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('heroes.title')),
  description: t('heroes.subtitle', { count: heroes.length }),
  path: '/heroes',
  locale: 'en',
});

export default function HeroesPage() {
  return <HeroesPageView locale="en" />;
}
