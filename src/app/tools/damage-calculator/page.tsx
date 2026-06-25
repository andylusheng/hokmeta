import { heroes, items } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { DamageCalculatorView } from '@/views/DamageCalculatorView';

const t = createT('en');

export const metadata = buildMetadata({
  title: defaultTitle(t('tools.damagePageTitle')),
  description: t('tools.damagePageDesc'),
  path: '/tools/damage-calculator',
  locale: 'en',
  keywords: [
    'Honor of Kings damage calculator',
    'HOK damage calculator',
    'Honor of Kings defense formula',
    'HOK hero damage',
  ],
});

export default function DamageCalculatorPage() {
  return <DamageCalculatorView heroes={heroes} items={items} locale="en" />;
}
