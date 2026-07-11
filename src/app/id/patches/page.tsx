import { PatchesPageView } from '@/views/PatchesPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Catatan Patch Honor of Kings - HOKMeta',
  description: 'Update patch dan balance hero Honor of Kings Global dari Camp HOK.',
  path: '/patches',
  locale: 'id',
  keywords: ['Honor of Kings patch', 'HOK patch notes', 'Honor of Kings hero balance'],
});

export default function PatchesPageId() {
  return <PatchesPageView locale="id" />;
}
