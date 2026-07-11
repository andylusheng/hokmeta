import { buildMetadata, defaultTitle } from '@/lib/seo';
import { MetaReportPageView } from '@/views/MetaReportPageView';

export const metadata = buildMetadata({
  title: defaultTitle('Honor of Kings Weekly Meta Report'),
  description:
    'Weekly win rate, pick rate, ban rate, and trend summary for Honor of Kings Global.',
  path: '/meta-report',
  locale: 'fil',
  type: 'article',
});

export default function FilMetaReportPage() {
  return <MetaReportPageView locale="fil" />;
}
