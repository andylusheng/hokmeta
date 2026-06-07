import { createT, localePath, type Locale } from '@/lib/i18n';
import { getTierListByLane, LANE_ORDER } from '@/lib/lanes';
import { LaneTierGrid } from '@/components/LaneTierGrid';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { translateLane } from '@/lib/locale-labels';
import { LANE_LABEL } from '@/lib/lanes';

export function TierListPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const grouped = getTierListByLane();

  return (
    <div className="container-wide">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('common.tierList'), path: localePath(locale, '/tier-list') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.tierList') },
        ]}
      />
      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
        {t('tierList.title')}
      </h1>
      <p className="mb-6 max-w-2xl text-gray-400">{t('tierList.subtitle')}</p>

      <nav
        className="mb-8 flex flex-wrap gap-2"
        aria-label={t('tierList.jumpLanes')}
      >
        {LANE_ORDER.map((lane) => (
          <a
            key={lane}
            href={`#lane-${lane}`}
            className="rounded-lg border border-hok-border bg-hok-card px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-hok-gold/50 hover:text-white"
          >
            {translateLane(LANE_LABEL[lane], locale)}
          </a>
        ))}
      </nav>

      <LaneTierGrid grouped={grouped} locale={locale} />
    </div>
  );
}
