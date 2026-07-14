import { PatchesPageView } from '@/views/PatchesPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Patch Honor of Kings Global - HOKMeta',
  description: 'Catatan patch dan statistik resmi harian Honor of Kings Global untuk server internasional.',
  path: '/id/patches',
  locale: 'id',
  keywords: ['Honor of Kings patch', 'HOK patch Indonesia', 'hero balance HOK'],
});

export default function PatchesPageId() {
  return <PatchesPageView locale="id" />;
}
