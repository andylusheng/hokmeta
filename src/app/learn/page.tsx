import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { getLearnArticles } from '@/lib/learn';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/learn',
  locale: 'en',
});

export default function LearnIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: '/' },
          { name: t('nav.learn'), path: '/learn' },
        ])}
      />
      <LearnIndexView locale="en" articles={getLearnArticles('en')} />
    </>
  );
}
