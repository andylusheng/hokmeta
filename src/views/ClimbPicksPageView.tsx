import Link from 'next/link';
import { getAllClimbPicks } from '@/lib/climb-picks';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroAvatar } from '@/components/HeroAvatar';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { formatRate } from '@/lib/data';
import { LANE_ORDER, LANE_LABEL } from '@/lib/lanes';
import { translateLane } from '@/lib/locale-labels';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function ClimbPicksPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const picks = getAllClimbPicks(locale);

  return (
    <div className="container-wide">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('climb.title'), path: localePath(locale, '/climb-picks') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('climb.title') },
        ]}
      />
      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
        {t('climb.title')}
      </h1>
      <p className="mb-2 max-w-2xl text-gray-400">{t('climb.subtitle')}</p>
      <p className="mb-8 text-xs text-gray-500">{t('climb.dataDisclaimer')}</p>

      <div className="space-y-10">
        {LANE_ORDER.map((lane) => {
          const lanePicks = picks[lane];
          const laneLabel = translateLane(LANE_LABEL[lane], locale) || LANE_LABEL[lane];
          return (
            <section key={lane} id={`lane-${lane}`} className="scroll-mt-20">
              <h2 className="section-title">{laneLabel}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {lanePicks.map((pick) => (
                  <Link
                    key={pick.hero.slug}
                    href={localePath(locale, `/hero/${pick.hero.slug}`)}
                    className="rounded-xl border border-hok-border bg-hok-card/80 p-4 transition hover:border-hok-gold/40"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <HeroAvatar hero={pick.hero} size={56} />
                      <div>
                        <p className="font-semibold text-white">
                          {getHeroDisplayName(pick.hero, locale)}
                        </p>
                        <p className="text-xs text-hok-gold">
                          {pick.hero.tier} · #{pick.laneRank} {laneLabel}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2 flex gap-3 text-xs text-gray-500">
                      <span>{formatRate(pick.hero.winRate)} WR</span>
                      <span>{formatRate(pick.hero.pickRate)} pick</span>
                    </div>
                    <ul className="list-inside list-disc text-xs leading-relaxed text-gray-400">
                      {pick.reasons.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
