import { ItemsPageView } from '@/views/ItemsPageView';
import { buildMetadata } from '@/lib/seo';
import { createT } from '@/lib/i18n';

const t = createT('id');

export const metadata = buildMetadata({
  title: `${t('items.title')} — HOKMeta`,
  description: t('items.subtitle', { count: 0 }),
  path: '/id/items',
  locale: 'id',
  keywords: ['Honor of Kings items', 'HOK items', 'HOK build Indonesia'],
});

export default function ItemsPageZh() {
  return <ItemsPageView locale="id" />;
}
