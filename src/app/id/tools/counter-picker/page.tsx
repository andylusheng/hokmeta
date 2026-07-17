import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { CounterPickerView } from '@/views/CounterPickerView';

const t = createT('id');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.counterPageTitle')),
  description: t('tools.counterDesc'),
  path: '/tools/counter-picker',
  locale: 'id',
});

export default function ZhTWCounterPickerPage() {
  return <CounterPickerView locale="id" />;
}
