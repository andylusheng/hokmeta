import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { HeroTrendsPageView } from '@/views/HeroTrendsPageView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('trends.title')),
  description: t('trends.subtitle'),
  path: '/hero-trends',
  locale: 'id',
});

export default function ZhTWHeroTrendsPage() {
  return <HeroTrendsPageView locale="id" />;
}
