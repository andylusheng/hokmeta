import { ArcanaPageView } from '@/views/ArcanaPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: '王者榮耀銘文 — HOKMeta',
  description: 'Meta 出裝常用銘文統計。',
  path: '/zh-TW/arcana',
  locale: 'zh-TW',
  keywords: ['王者榮耀銘文', 'HOK 銘文'],
});

export default function ArcanaPageZh() {
  return <ArcanaPageView locale="zh-TW" />;
}
