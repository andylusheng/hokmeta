import { ItemsPageView } from '@/views/ItemsPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Honor of Kings Items — HOKMeta',
  description: 'All Honor of Kings items with stats, gold cost, and build references.',
  path: '/items',
  keywords: ['HOK items', 'Honor of Kings items', 'HOK build items'],
});

export default function ItemsPage() {
  return <ItemsPageView locale="en" />;
}
