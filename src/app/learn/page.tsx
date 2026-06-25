import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/learn',
  locale: 'en',
});

export default function LearnIndexPage() {
  return <LearnIndexView locale="en" />;
}
