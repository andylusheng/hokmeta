import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { PrivacyView } from '@/views/PrivacyView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('privacy.title')),
  description: t('privacy.collectBody'),
  path: '/privacy',
  locale: 'fil',
});

export default function ZhTWPrivacyPage() {
  return <PrivacyView locale="fil" />;
}
