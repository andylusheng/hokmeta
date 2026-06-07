import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { ClimbPicksPageView } from '@/views/ClimbPicksPageView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('climb.title')),
  description: t('climb.subtitle'),
  path: '/climb-picks',
  locale: 'en',
});

export default function ClimbPicksPage() {
  return <ClimbPicksPageView locale="en" />;
}
