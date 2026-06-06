import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { PrivacyView } from '@/views/PrivacyView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('privacy.title')),
  description: t('privacy.collectBody'),
  path: '/privacy',
  locale: 'zh-TW',
});

export default function ZhTWPrivacyPage() {
  return <PrivacyView locale="zh-TW" />;
}
