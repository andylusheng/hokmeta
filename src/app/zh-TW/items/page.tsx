import { ItemsPageView } from '@/views/ItemsPageView';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { createT } from '@/lib/i18n';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: '王者榮耀裝備圖鑑 — HOKMeta',
  description: '國際服裝備列表、金幣與出裝參考。',
  path: '/zh-TW/items',
  locale: 'zh-TW',
  keywords: ['王者榮耀裝備', 'HOK 裝備', '出裝'],
});

export default function ItemsPageZh() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: '/zh-TW' },
          { name: t('nav.items'), path: '/zh-TW/items' },
        ])}
      />
      <ItemsPageView locale="zh-TW" />
    </>
  );
}
