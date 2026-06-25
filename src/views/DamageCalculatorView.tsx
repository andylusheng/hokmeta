import type { GameItem, Hero } from '@/types/hero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DamageCalculatorClient } from '@/components/DamageCalculatorClient';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function DamageCalculatorView({
  heroes,
  items,
  locale = 'en',
}: {
  heroes: Hero[];
  items: GameItem[];
  locale?: Locale;
}) {
  const t = createT(locale);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.tools'), path: localePath(locale, '/tools') },
          { name: t('tools.damagePageTitle'), path: localePath(locale, '/tools/damage-calculator') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.tools'), href: localePath(locale, '/tools') },
          { label: t('tools.damagePageTitle') },
        ]}
      />
      <div className="mb-6 max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">{t('tools.damagePageTitle')}</h1>
        <p className="text-gray-400">{t('tools.damagePageDesc')}</p>
      </div>
      <DamageCalculatorClient heroes={heroes} items={items} locale={locale} />
    </div>
  );
}
