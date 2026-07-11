import { buildMetadata, defaultTitle } from '@/lib/seo';
import { MetaReportPageView } from '@/views/MetaReportPageView';

export const metadata = buildMetadata({
  title: defaultTitle('Honor of Kings Weekly Meta Report'),
  description:
    'Ringkasan win rate, pick rate, ban rate, dan tren D1 untuk Honor of Kings Global.',
  path: '/meta-report',
  locale: 'id',
  type: 'article',
});

export default function IdMetaReportPage() {
  return <MetaReportPageView locale="id" />;
}
