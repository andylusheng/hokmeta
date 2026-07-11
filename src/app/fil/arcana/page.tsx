import { ArcanaPageView } from '@/views/ArcanaPageView';
import { buildMetadata } from '@/lib/seo';
import { createT } from '@/lib/i18n';

const t = createT('fil');

export const metadata = buildMetadata({
  title: `${t('nav.arcana')} — HOKMeta`,
  description: 'Arcana references used in Honor of Kings Global meta builds.',
  path: '/fil/arcana',
  locale: 'fil',
  keywords: ['Honor of Kings arcana', 'HOK arcana', 'HOKMeta arcana'],
});

export default function ArcanaPageZh() {
  return <ArcanaPageView locale="fil" />;
}
