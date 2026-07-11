import { ItemsPageView } from '@/views/ItemsPageView';
import { buildMetadata } from '@/lib/seo';
import { createT } from '@/lib/i18n';

const t = createT('fil');

export const metadata = buildMetadata({
  title: `${t('items.title')} — HOKMeta`,
  description: t('items.subtitle', { count: 0 }),
  path: '/fil/items',
  locale: 'fil',
  keywords: ['Honor of Kings items', 'HOK items', 'HOK build Philippines'],
});

export default function ItemsPageZh() {
  return <ItemsPageView locale="fil" />;
}
