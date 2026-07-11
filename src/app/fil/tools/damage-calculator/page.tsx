import { heroes, items } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { DamageCalculatorView } from '@/views/DamageCalculatorView';

const t = createT('fil');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.damagePageTitle')),
  description: t('tools.damagePageDesc'),
  path: '/tools/damage-calculator',
  locale: 'fil',
  keywords: [
    'Honor of Kings damage calculator',
    'HOK damage formula',
    'HOK defense formula',
  ],
});

export default function FilDamageCalculatorPage() {
  return <DamageCalculatorView heroes={heroes} items={items} locale="fil" />;
}
