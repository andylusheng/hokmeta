import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { ClimbPicksPageView } from '@/views/ClimbPicksPageView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('climb.title')),
  description: t('climb.subtitle'),
  path: '/fil/climb-picks',
  locale: 'fil',
});

export default function ClimbPicksZhPage() {
  return <ClimbPicksPageView locale="fil" />;
}
