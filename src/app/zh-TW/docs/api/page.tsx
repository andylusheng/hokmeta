import { buildMetadata, defaultTitle } from '@/lib/seo';
import { ApiDocsView } from '@/views/ApiDocsView';

export const metadata = buildMetadata({
  title: defaultTitle('HOKMeta API 與結構化資料'),
  description:
    '王者榮耀國際服英雄、裝備、出裝、銘文、克制與工具資料的靜態 JSON 端點。',
  path: '/docs/api',
  locale: 'zh-TW',
  type: 'article',
  keywords: [
    'Honor of Kings API',
    'HOK API',
    '王者榮耀國際服資料',
    'HOKMeta API',
  ],
});

export default function ZhTWApiDocsPage() {
  return <ApiDocsView locale="zh-TW" />;
}
