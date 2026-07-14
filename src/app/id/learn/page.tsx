import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/id/learn',
  locale: 'id',
});

export default function IdLearnPage() {
  return <LearnIndexView locale="id" />;
}
