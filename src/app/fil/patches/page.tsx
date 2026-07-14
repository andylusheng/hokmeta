import { PatchesPageView } from '@/views/PatchesPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Honor of Kings Global Patches - HOKMeta',
  description: 'Patch notes and official daily stats for Honor of Kings Global international server.',
  path: '/fil/patches',
  locale: 'fil',
  keywords: ['Honor of Kings patch Philippines', 'HOK patch', 'HOK hero balance'],
});

export default function PatchesPageFil() {
  return <PatchesPageView locale="fil" />;
}
