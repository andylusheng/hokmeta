import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { AboutView } from '@/views/AboutView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('about.title')),
  description: t('about.p1'),
  path: '/about',
  locale: 'zh-TW',
});

export default function ZhTWAboutPage() {
  return <AboutView locale="zh-TW" />;
}
