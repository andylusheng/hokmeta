import { heroes, sortByMetaScore } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { HeroAvatarGrid } from '@/components/HeroAvatarGrid';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { LANE_ORDER, LANE_LABEL, heroToLane, type GameLane } from '@/lib/lanes';
import { translateLane } from '@/lib/locale-labels';

export function HeroesPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const sorted = sortByMetaScore(heroes);

  const crumbs = breadcrumbSchema([
    { name: t('common.home'), path: localePath(locale, '/') },
    { name: t('nav.heroBuilds'), path: localePath(locale, '/heroes') },
  ]);
  const list = itemListSchema(
    'All HOKMeta Heroes',
    heroes.map((h) => ({
      name: h.name,
      url: absoluteUrl(localePath(locale, `/hero/${h.slug}`)),
    }))
  );

  const byLane = LANE_ORDER.reduce(
    (acc, lane) => {
      acc[lane] = sorted.filter((h) => heroToLane(h) === lane);
      return acc;
    },
    {} as Record<GameLane, typeof heroes>
  );

  return (
    <div className="container-wide">
      <JsonLd data={crumbs} />
      <JsonLd data={list} />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.heroBuilds') },
        ]}
      />
      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
        {t('heroes.title')}
      </h1>
      <p className="mb-8 text-gray-400">
        {t('heroes.subtitle', { count: heroes.length })}
      </p>

      <section className="mb-12">
        <HeroAvatarGrid heroes={sorted} locale={locale} size={56} />
      </section>

      <div className="space-y-10">
        {LANE_ORDER.map((lane) => {
          const laneHeroes = byLane[lane];
          if (!laneHeroes.length) return null;
          return (
            <section key={lane} id={`lane-${lane}`}>
              <h2 className="mb-4 text-xl font-bold text-hok-gold">
                {translateLane(LANE_LABEL[lane], locale)}
              </h2>
              <HeroAvatarGrid
                heroes={laneHeroes}
                locale={locale}
                size={52}
                columns="grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
