import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { CompsPageView } from '@/views/CompsPageView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('comps.title')),
  description: t('comps.subtitle'),
  path: '/fil/comps',
  locale: 'fil',
});

export default function CompsZhPage() {
  return <CompsPageView locale="fil" />;
}
