import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { PrivacyView } from '@/views/PrivacyView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('privacy.title')),
  description: t('privacy.collectBody'),
  path: '/privacy',
  locale: 'id',
});

export default function ZhTWPrivacyPage() {
  return <PrivacyView locale="id" />;
}
