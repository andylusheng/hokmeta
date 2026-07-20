import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { getLearnArticles } from '@/lib/learn';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/id/learn',
  locale: 'id',
});

export default function IdLearnPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: '/id' },
          { name: t('nav.learn'), path: '/id/learn' },
        ])}
      />
      <LearnIndexView locale="id" articles={getLearnArticles('id')} />
    </>
  );
}
