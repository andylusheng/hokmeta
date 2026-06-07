import Link from 'next/link';
import { getAllClimbPicks } from '@/lib/climb-picks';
import { HeroAvatar } from '@/components/HeroAvatar';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { LANE_ORDER } from '@/lib/lanes';
import { translateLane } from '@/lib/locale-labels';
import { LANE_LABEL } from '@/lib/lanes';

export function ClimbPicksSection({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const picks = getAllClimbPicks(locale);

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="section-title mb-1">{t('home.climbPicksTitle')}</h2>
          <p className="text-sm text-hok-muted">{t('home.climbPicksDesc')}</p>
        </div>
        <Link
          href={localePath(locale, '/climb-picks')}
          className="shrink-0 text-sm font-semibold text-hok-gold hover:underline"
        >
          {t('home.climbPicksViewAll')}
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {LANE_ORDER.map((lane) => {
          const lanePicks = picks[lane].slice(0, 3);
          const laneLabel = translateLane(LANE_LABEL[lane], locale) || LANE_LABEL[lane];
          return (
            <div
              key={lane}
              className="rounded-xl border border-hok-border bg-hok-card/60 p-4"
            >
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-hok-gold">
                {laneLabel}
              </h3>
              <ul className="space-y-3">
                {lanePicks.map((pick) => (
                  <li key={pick.hero.slug}>
                    <Link
                      href={localePath(locale, `/hero/${pick.hero.slug}`)}
                      className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-hok-dark/50"
                    >
                      <HeroAvatar hero={pick.hero} size={40} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">
                          {getHeroDisplayName(pick.hero, locale)}
                          <span className="ml-1.5 text-xs text-hok-gold">
                            {pick.hero.tier}
                          </span>
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {pick.reasons[0]}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-gray-500">{t('climb.dataDisclaimer')}</p>
    </section>
  );
}
