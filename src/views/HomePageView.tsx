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
import { ClimbPicksSection } from '@/components/home/ClimbPicksSection';
import { getExclusiveGlobalHeroes } from '@/lib/lanes';

export function HomePageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  const splashHero =
    heroes.find((h) => h.slug === 'hou-yi') ||
    sortByMetaScore(heroes.filter((h) => h.tier === 'S+' || h.tier === 'S'))[0] ||
    heroes[0];

  const browseHeroes = sortByMetaScore(heroes).slice(0, 14);
  const exclusive = getExclusiveGlobalHeroes();

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

      <section className="mb-8 max-w-4xl">
        <h1 className="font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          {t('home.headline')}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
          {t('home.subtitle', { count: heroes.length })}
        </p>
      </section>

      <HeroSplash hero={splashHero} locale={locale} />

      <section className="mb-10">
        <h2 className="sr-only">{t('home.dbTitle')}</h2>
        <StatsStrip locale={locale} />
        <HubNavGrid locale={locale} />
      </section>

      <section className="defer-section mb-12 grid gap-4 lg:grid-cols-2">
        <div className="rounded border border-hok-border bg-hok-card p-5">
          <h2 className="text-xl font-bold text-white">{t('home.decisionsTitle')}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">{t('home.decisionsBody')}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <Link href={localePath(locale, '/heroes')} className="text-hok-gold hover:underline">
              {t('home.decisionsHeroesCta')}
            </Link>
            <Link href={localePath(locale, '/tools')} className="text-hok-gold hover:underline">
              {t('home.decisionsToolsCta')}
            </Link>
          </div>
        </div>
        <div className="rounded border border-hok-border bg-hok-card p-5">
          <h2 className="text-xl font-bold text-white">{t('home.trendsTitle')}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">{t('home.trendsBody')}</p>
          <Link
            href={localePath(locale, '/hero-trends')}
            className="mt-4 inline-flex text-sm font-semibold text-hok-gold hover:underline"
          >
            {t('home.trendsCta')}
          </Link>
        </div>
      </section>

      <div className="defer-section">
        <RecentPatchList locale={locale} />
      </div>

      <div className="defer-section">
        <ClimbPicksSection locale={locale} />
      </div>

      {exclusive.length > 0 && (
        <section className="defer-section mb-12">
          <h2 className="section-title">{t('home.exclusiveGlobal')}</h2>
          <p className="mb-4 text-sm text-hok-muted">{t('home.exclusiveDesc')}</p>
          <HeroAvatarGrid heroes={exclusive} locale={locale} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-9" />
        </section>
      )}

      <section className="defer-section mb-12">
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

      <section className="defer-section mb-12 max-w-4xl">
        <h2 className="section-title">{t('home.faqTitle')}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ['faqWhatQuestion', 'faqWhatAnswer'],
            ['faqUpdateQuestion', 'faqUpdateAnswer'],
            ['faqBuildQuestion', 'faqBuildAnswer'],
          ].map(([question, answer]) => (
            <div key={question} className="rounded border border-hok-border bg-hok-card p-4">
              <h3 className="text-sm font-bold text-white">{t(`home.${question}`)}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">{t(`home.${answer}`)}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
