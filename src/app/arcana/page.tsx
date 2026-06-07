import { ArcanaPageView } from '@/views/ArcanaPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Honor of Kings Arcana — HOKMeta',
  description: 'Popular arcana runes used in Honor of Kings meta builds.',
  path: '/arcana',
  keywords: ['HOK arcana', 'Honor of Kings runes', 'HOK emblems'],
});

export default function ArcanaPage() {
  return <ArcanaPageView locale="en" />;
}
