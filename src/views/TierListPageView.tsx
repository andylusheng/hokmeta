import { getTierListByRole } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { TierListClient } from '@/components/TierListClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, tierListSchema } from '@/lib/schema';

export function TierListPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const grouped = getTierListByRole();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('common.tierList'), path: localePath(locale, '/tier-list') },
        ])}
      />
      <JsonLd data={tierListSchema(grouped)} />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.tierList') },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{t('tierList.title')}</h1>
      <p className="mb-8 text-gray-400">{t('tierList.subtitle')}</p>
      <TierListClient grouped={grouped} locale={locale} />
    </div>
  );
}
