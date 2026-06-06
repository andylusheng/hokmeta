import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { HeroTrendsPageView } from '@/views/HeroTrendsPageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('trends.title')),
  description: t('trends.subtitle'),
  path: '/hero-trends',
  locale: 'en',
});

export default function HeroTrendsPage() {
  return <HeroTrendsPageView locale="en" />;
}
