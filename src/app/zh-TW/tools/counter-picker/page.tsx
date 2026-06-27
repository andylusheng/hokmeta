import { heroes, items } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { CounterPickerView } from '@/views/CounterPickerView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.counterPageTitle')),
  description: t('tools.counterDesc'),
  path: '/tools/counter-picker',
  locale: 'zh-TW',
});

export default function ZhTWCounterPickerPage() {
  return <CounterPickerView heroes={heroes} items={items} locale="zh-TW" />;
}
