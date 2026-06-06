import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { AboutView } from '@/views/AboutView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('about.title')),
  description: t('about.p1'),
  path: '/about',
  locale: 'en',
});

export default function AboutPage() {
  return <AboutView locale="en" />;
}
