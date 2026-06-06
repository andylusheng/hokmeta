import Link from 'next/link';
import { heroes } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { HeroCard } from '@/components/HeroCard';
import { HeroLinkRow } from '@/components/HeroLinkRow';
import { JsonLd, itemListSchema } from '@/lib/schema';
import { LearnCard } from '@/components/LearnCard';
import { MetaBanner } from '@/components/MetaBanner';
import { learnArticles } from '@/lib/learn';

export function HomePageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  const featured = [...heroes]
    .filter((h) => h.tier === 'S+' || h.tier === 'S')
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  const topWinRate = [...heroes]
    .filter((h) => h.winRate !== null)
    .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
    .slice(0, 5);

  const topBanned = [...heroes]
    .filter((h) => h.banRate !== null)
    .sort((a, b) => (b.banRate ?? 0) - (a.banRate ?? 0))
    .slice(0, 5);

  const listSchema = itemListSchema(
    'Featured HOK Heroes',
    featured.map((h) => ({
      name: h.name,
      url: absoluteUrl(localePath(locale, `/hero/${h.slug}`)),
    }))
  );

  return (
    <div className="container-page">
      <JsonLd data={listSchema} />
      <MetaBanner locale={locale} />

      <section className="mb-10 text-center sm:text-left">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          {t('home.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-gray-400 sm:mx-0">
          {t('home.subtitle', { count: heroes.length })}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link href={localePath(locale, '/heroes')} className="btn-primary">
            {t('home.browseHeroes')}
          </Link>
          <Link
            href={localePath(locale, '/tier-list')}
            className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold"
          >
            {t('common.tierList')}
          </Link>
          <Link
            href={localePath(locale, '/hero-trends')}
            className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold"
          >
            {t('home.heroTrends')}
          </Link>
        </div>
      </section>

      {(topWinRate.length > 0 || topBanned.length > 0) && (
        <section className="mb-10 grid gap-4 sm:grid-cols-2">
          {topWinRate.length > 0 && (
            <div className="card">
              <h2 className="mb-3 text-lg font-semibold text-white">
                {t('home.highestWr')}
              </h2>
              <ul className="space-y-2">
                {topWinRate.map((h) => (
                  <li key={h.slug}>
                    <HeroLinkRow
                      hero={h}
                      locale={locale}
                      avatarSize={28}
                      trailing={`${h.winRate}%`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {topBanned.length > 0 && (
            <div className="card">
              <h2 className="mb-3 text-lg font-semibold text-white">
                {t('home.mostBanned')}
              </h2>
              <ul className="space-y-2">
                {topBanned.map((h) => (
                  <li key={h.slug}>
                    <HeroLinkRow
                      hero={h}
                      locale={locale}
                      avatarSize={28}
                      trailing={`${h.banRate}%`}
                    />
                  </li>
                ))}
              </ul>
              <Link
                href={localePath(locale, '/hero-trends')}
                className="mt-3 inline-block text-xs text-gray-500 hover:text-hok-gold"
              >
                {t('home.allTrends')}
              </Link>
            </div>
          )}
        </section>
      )}

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="section-title mb-0">{t('home.featured')}</h2>
          <Link
            href={localePath(locale, '/heroes')}
            className="text-sm text-hok-gold hover:underline"
          >
            {t('common.viewAll')}
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((hero) => (
            <HeroCard key={hero.slug} hero={hero} locale={locale} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">{t('home.learningHub')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {learnArticles.slice(0, 4).map((a) => (
            <LearnCard
              key={a.slug}
              title={a.title}
              description={a.description}
              href={localePath(locale, `/learn/${a.slug}`)}
              badge={a.badge}
            />
          ))}
        </div>
        <Link
          href={localePath(locale, '/learn')}
          className="mt-4 inline-block text-sm text-hok-gold hover:underline"
        >
          {t('home.allGuides')}
        </Link>
      </section>
    </div>
  );
}
