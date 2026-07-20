import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { getLearnArticles } from '@/lib/learn';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/fil/learn',
  locale: 'fil',
});

export default function FilLearnPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: '/fil' },
          { name: t('nav.learn'), path: '/fil/learn' },
        ])}
      />
      <LearnIndexView locale="fil" articles={getLearnArticles('fil')} />
    </>
  );
}
