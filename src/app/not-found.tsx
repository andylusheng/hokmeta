import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { NotFoundView } from '@/components/NotFoundView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('notFound.title')),
  description: t('notFound.message'),
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return <NotFoundView />;
}
