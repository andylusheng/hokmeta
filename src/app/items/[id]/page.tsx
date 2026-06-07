import { notFound } from 'next/navigation';
import { getItemById, items } from '@/lib/data';
import { ItemDetailPageView } from '@/views/ItemDetailPageView';
import { buildMetadata } from '@/lib/seo';
import { getLocalizedItemName } from '@/lib/item-locale';

export function generateStaticParams() {
  return items.map((item) => ({ id: item.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);
  if (!item) return {};
  return buildMetadata({
    title: `${getLocalizedItemName(item, 'en')} — HOKMeta Items`,
    description: item.description,
    path: `/items/${item.id}`,
    locale: 'en',
  });
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);
  if (!item) notFound();
  return <ItemDetailPageView item={item} locale="en" />;
}
