import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { LearnIndexView } from '@/views/LearnIndexView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('learn.metaTitle')),
  description: t('learn.metaDesc'),
  path: '/learn',
  locale: 'zh-TW',
});

export default function ZhTWLearnPage() {
  return <LearnIndexView locale="zh-TW" />;
}
