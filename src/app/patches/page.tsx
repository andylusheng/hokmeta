import { PatchesPageView } from '@/views/PatchesPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Honor of Kings Patch Notes & Balance — HOKMeta',
  description: 'Live hero balance changes and patch notes from Camp HOK international.',
  path: '/patches',
  keywords: ['HOK patch notes', 'Honor of Kings balance', 'HOK meta changes'],
});

export default function PatchesPage() {
  return <PatchesPageView locale="en" />;
}
