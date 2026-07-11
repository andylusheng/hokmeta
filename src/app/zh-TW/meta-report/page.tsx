import { buildMetadata, defaultTitle } from '@/lib/seo';
import { MetaReportPageView } from '@/views/MetaReportPageView';

export const metadata = buildMetadata({
  title: defaultTitle('王者榮耀 Global 本週 Meta 報告'),
  description:
    '根據勝率、出場率、禁用率與 D1 趨勢資料整理的王者榮耀 Global 本週 Meta 報告。',
  path: '/meta-report',
  locale: 'zh-TW',
  type: 'article',
});

export default function ZhTWMetaReportPage() {
  return <MetaReportPageView locale="zh-TW" />;
}
