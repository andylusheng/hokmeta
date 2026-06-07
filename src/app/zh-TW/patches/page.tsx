import { PatchesPageView } from '@/views/PatchesPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: '王者榮耀版本調整 — HOKMeta',
  description: 'Camp HOK 國際服英雄平衡與版本資訊。',
  path: '/zh-TW/patches',
  locale: 'zh-TW',
  keywords: ['王者榮耀版本', '英雄調整', '平衡性'],
});

export default function PatchesPageZh() {
  return <PatchesPageView locale="zh-TW" />;
}
