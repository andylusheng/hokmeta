import { ItemsPageView } from '@/views/ItemsPageView';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { createT } from '@/lib/i18n';

const t = createT('en');

export const metadata = buildMetadata({
  title: 'Honor of Kings Items — HOKMeta',
  description: 'All Honor of Kings items with stats, gold cost, and build references.',
  path: '/items',
  keywords: ['HOK items', 'Honor of Kings items', 'HOK build items'],
});

export default function ItemsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: '/' },
          { name: t('nav.items'), path: '/items' },
        ])}
      />
      <ItemsPageView locale="en" />
    </>
  );
}
