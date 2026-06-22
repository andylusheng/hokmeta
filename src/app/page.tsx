import { heroes, getLatestHeroDataDate } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { HomePageView } from '@/views/HomePageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('home.title')),
  description: t('home.subtitle', { count: heroes.length }),
  path: '/',
  locale: 'en',
  modifiedTime: getLatestHeroDataDate(),
});

export default function HomePage() {
  return <HomePageView locale="en" />;
}
