import { heroes } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { HomePageView } from '@/views/HomePageView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('home.title')),
  description: t('home.subtitle', { count: heroes.length }),
  path: '/',
  locale: 'zh-TW',
});

export default function ZhTWHomePage() {
  return <HomePageView locale="zh-TW" />;
}
