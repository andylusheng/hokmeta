import { buildMetadata, defaultTitle } from '@/lib/seo';
import { ApiDocsView } from '@/views/ApiDocsView';

export const metadata = buildMetadata({
  title: defaultTitle('HOKMeta API and Structured Data'),
  description:
    'Static JSON endpoints for Honor of Kings Global hero, item, build, arcana, counter, and tool data.',
  path: '/docs/api',
  locale: 'fil',
  type: 'article',
  keywords: [
    'Honor of Kings API',
    'HOK API',
    'Honor of Kings Global data',
    'HOKMeta API',
  ],
});

export default function ZhTWApiDocsPage() {
  return <ApiDocsView locale="fil" />;
}
