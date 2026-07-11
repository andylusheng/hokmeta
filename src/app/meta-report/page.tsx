import { buildMetadata, defaultTitle } from '@/lib/seo';
import { MetaReportPageView } from '@/views/MetaReportPageView';

export const metadata = buildMetadata({
  title: defaultTitle('Honor of Kings Global Weekly Meta Report'),
  description:
    'Weekly Honor of Kings Global meta report based on win rate, pick rate, ban rate, sleeper picks, and D1 trend data.',
  path: '/meta-report',
  locale: 'en',
  type: 'article',
});

export default function MetaReportPage() {
  return <MetaReportPageView locale="en" />;
}
