import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { ToolsIndexView } from '@/views/ToolsIndexView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.title')),
  description: t('tools.subtitle'),
  path: '/tools',
  locale: 'fil',
});

export default function ZhTWToolsPage() {
  return <ToolsIndexView locale="fil" />;
}
