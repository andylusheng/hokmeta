import { heroes, items } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { DamageCalculatorView } from '@/views/DamageCalculatorView';

const t = createT('zh-TW');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.damagePageTitle')),
  description: t('tools.damagePageDesc'),
  path: '/tools/damage-calculator',
  locale: 'zh-TW',
  keywords: [
    '王者荣耀伤害计算器',
    'Honor of Kings damage calculator',
    'HOK 防御公式',
  ],
});

export default function ZhTWDamageCalculatorPage() {
  return <DamageCalculatorView heroes={heroes} items={items} locale="zh-TW" />;
}
