import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/fil/learn',
  locale: 'fil',
});

export default function FilLearnPage() {
  return <LearnIndexView locale="fil" />;
}
