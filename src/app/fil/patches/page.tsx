import { PatchesPageView } from '@/views/PatchesPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Honor of Kings Patch Notes - HOKMeta',
  description: 'Patch updates and hero balance notes for Honor of Kings Global from Camp HOK.',
  path: '/patches',
  locale: 'fil',
  keywords: ['Honor of Kings patch', 'HOK patch notes', 'Honor of Kings hero balance'],
});

export default function PatchesPageFil() {
  return <PatchesPageView locale="fil" />;
}
