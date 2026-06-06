import type { Hero } from '@/types/hero';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { CounterPickerClient } from '@/components/CounterPickerClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function CounterPickerView({
  heroes,
  locale = 'en',
}: {
  heroes: Hero[];
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
      <h1 className="mb-6 text-3xl font-bold text-white">{t('tools.counterPageTitle')}</h1>
      <CounterPickerClient heroes={heroes} locale={locale} />
    </div>
  );
}
