import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { ClimbPicksPageView } from '@/views/ClimbPicksPageView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('climb.title')),
  description: t('climb.subtitle'),
  path: '/id/climb-picks',
  locale: 'id',
});

export default function ClimbPicksZhPage() {
  return <ClimbPicksPageView locale="id" />;
}
