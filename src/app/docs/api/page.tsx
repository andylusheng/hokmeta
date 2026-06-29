import { buildMetadata, defaultTitle } from '@/lib/seo';
import { ApiDocsView } from '@/views/ApiDocsView';

export const metadata = buildMetadata({
  title: defaultTitle('HOKMeta API and Structured Data'),
  description:
    'Static JSON endpoints for Honor of Kings Global heroes, items, builds, arcana, counters, and tool-ready data.',
  path: '/docs/api',
  locale: 'en',
  type: 'article',
  keywords: [
    'Honor of Kings API',
    'HOK API',
    'Honor of Kings hero data',
    'HOKMeta API',
  ],
});

export default function ApiDocsPage() {
  return <ApiDocsView locale="en" />;
}
