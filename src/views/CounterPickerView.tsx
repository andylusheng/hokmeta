import type { GameItem, Hero } from '@/types/hero';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { CounterPickerClient } from '@/components/CounterPickerClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function CounterPickerView({
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
          { name: t('tools.counterPageTitle'), path: localePath(locale, '/tools/counter-picker') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('tools.counterPageTitle') },
        ]}
      />
      <div className="mb-6 max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">{t('tools.counterPageTitle')}</h1>
        <p className="text-gray-400">
          Enter the enemy draft to compare counter picks, ban priority, equipment answers, and teamfight rules for Honor
          of Kings Global ranked games.
        </p>
      </div>
      <CounterPickerClient heroes={heroes} items={items} locale={locale} />
    </div>
  );
}
