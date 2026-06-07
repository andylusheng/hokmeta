import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { CompsPageView } from '@/views/CompsPageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('comps.title')),
  description: t('comps.subtitle'),
  path: '/comps',
  locale: 'en',
});

export default function CompsPage() {
  return <CompsPageView locale="en" />;
}
