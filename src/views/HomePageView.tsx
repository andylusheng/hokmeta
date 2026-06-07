import Link from 'next/link';
import { heroes, sortByMetaScore } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, itemListSchema } from '@/lib/schema';
import { HeroSplash } from '@/components/home/HeroSplash';
import { StatsStrip } from '@/components/home/StatsStrip';
import { HubNavGrid } from '@/components/home/HubNavGrid';
import { RecentPatchList } from '@/components/home/RecentPatchList';
import { HeroAvatarGrid } from '@/components/HeroAvatarGrid';
import { LaneTierGrid } from '@/components/LaneTierGrid';
import { ClimbPicksSection } from '@/components/home/ClimbPicksSection';
import { getExclusiveGlobalHeroes, getTierListByLane } from '@/lib/lanes';

export function HomePageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  const splashHero =
    sortByMetaScore(heroes.filter((h) => h.tier === 'S+' || h.tier === 'S'))[0] ||
    heroes[0];

  const browseHeroes = sortByMetaScore(heroes).slice(0, 14);
  const exclusive = getExclusiveGlobalHeroes();
  const laneTiers = getTierListByLane();

  const listSchema = itemListSchema(
    'HOKMeta Heroes',
    heroes.slice(0, 20).map((h) => ({
      name: h.name,
      url: absoluteUrl(localePath(locale, `/hero/${h.slug}`)),
    }))
  );

  return (
    <div className="container-wide">
      <JsonLd data={listSchema} />

      <HeroSplash hero={splashHero} locale={locale} />

      <section className="mb-10">
        <h2 className="sr-only">{t('home.dbTitle')}</h2>
        <p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-400">
          {t('home.subtitle', { count: heroes.length })}
        </p>
        <StatsStrip locale={locale} />
        <HubNavGrid locale={locale} />
      </section>

      <RecentPatchList locale={locale} />

      <ClimbPicksSection locale={locale} />

      {exclusive.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title">{t('home.exclusiveGlobal')}</h2>
          <p className="mb-4 text-sm text-hok-muted">{t('home.exclusiveDesc')}</p>
          <HeroAvatarGrid heroes={exclusive} locale={locale} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-9" />
        </section>
      )}

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="section-title mb-0">{t('home.browseAll')}</h2>
          <Link
            href={localePath(locale, '/heroes')}
            className="text-sm font-semibold text-hok-gold hover:underline"
          >
            {t('home.viewAllHeroes', { count: heroes.length })}
          </Link>
        </div>
        <HeroAvatarGrid heroes={browseHeroes} locale={locale} />
      </section>

      <section className="mb-8">
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2 className="section-title mb-0">{t('home.laneTierPreview')}</h2>
          <Link
            href={localePath(locale, '/tier-list')}
            className="text-sm font-semibold text-hok-gold hover:underline"
          >
            {t('home.fullTierList')}
          </Link>
        </div>
        <LaneTierGrid grouped={laneTiers} locale={locale} compact />
      </section>
    </div>
  );
}
