import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { PrivacyView } from '@/views/PrivacyView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('privacy.title')),
  description: t('privacy.collectBody'),
  path: '/privacy',
  locale: 'en',
});

export default function PrivacyPage() {
  return <PrivacyView locale="en" />;
}
