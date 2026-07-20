import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { getLearnArticles } from '@/lib/learn';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/learn',
  locale: 'zh-TW',
});

export default function ZhTWLearnPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: '/zh-TW' },
          { name: t('nav.learn'), path: '/zh-TW/learn' },
        ])}
      />
      <LearnIndexView locale="zh-TW" articles={getLearnArticles('zh-TW')} />
    </>
  );
}
