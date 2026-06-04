import Link from 'next/link';
import { heroes } from '@/lib/data';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { HeroCard } from '@/components/HeroCard';
import { JsonLd, itemListSchema } from '@/lib/schema';
import { LearnCard } from '@/components/LearnCard';
import { MetaBanner } from '@/components/MetaBanner';
import { learnArticles } from '@/lib/learn';

export const metadata = buildMetadata({
  title: defaultTitle('Honor of Kings Meta Hub'),
  description:
    'Top 30 HOK meta heroes: tier list, builds, counters, trends, and guides for ranked play.',
  path: '/',
});

export default function HomePage() {
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
      url: absoluteUrl(`/hero/${h.slug}`),
    }))
  );

  return (
    <div className="container-page">
      <JsonLd data={listSchema} />
      <MetaBanner />

      <section className="mb-10 text-center sm:text-left">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          Honor of Kings Meta &amp; Tier List
        </h1>
        <p className="mx-auto max-w-2xl text-gray-400 sm:mx-0">
          Data-driven guides for {heroes.length} top meta heroes — tier list,
          builds, counters, patch notes, and ranked meta tools.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link href="/heroes/" className="btn-primary">
            Browse Heroes
          </Link>
          <Link
            href="/tier-list/"
            className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold"
          >
            Tier List
          </Link>
          <Link
            href="/hero-trends/"
            className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold"
          >
            Hero Trends
          </Link>
        </div>
      </section>

      {(topWinRate.length > 0 || topBanned.length > 0) && (
        <section className="mb-10 grid gap-4 sm:grid-cols-2">
          {topWinRate.length > 0 && (
            <div className="card">
              <h2 className="mb-3 text-lg font-semibold text-white">
                Highest Win Rate
              </h2>
              <ul className="space-y-2 text-sm">
                {topWinRate.map((h) => (
                  <li key={h.slug} className="flex justify-between gap-2">
                    <Link
                      href={`/hero/${h.slug}/`}
                      className="text-hok-gold hover:underline"
                    >
                      {h.name}
                    </Link>
                    <span className="text-gray-400">{h.winRate}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {topBanned.length > 0 && (
            <div className="card">
              <h2 className="mb-3 text-lg font-semibold text-white">
                Most Banned
              </h2>
              <ul className="space-y-2 text-sm">
                {topBanned.map((h) => (
                  <li key={h.slug} className="flex justify-between gap-2">
                    <Link
                      href={`/hero/${h.slug}/`}
                      className="text-hok-gold hover:underline"
                    >
                      {h.name}
                    </Link>
                    <span className="text-gray-400">{h.banRate}%</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/hero-trends/"
                className="mt-3 inline-block text-xs text-gray-500 hover:text-hok-gold"
              >
                All trends →
              </Link>
            </div>
          )}
        </section>
      )}

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="section-title mb-0">Featured Meta Heroes</h2>
          <Link href="/heroes/" className="text-sm text-hok-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((hero) => (
            <HeroCard key={hero.slug} hero={hero} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Learning Hub</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {learnArticles.slice(0, 4).map((a) => (
            <LearnCard
              key={a.slug}
              title={a.title}
              description={a.description}
              href={`/learn/${a.slug}/`}
            />
          ))}
        </div>
        <Link
          href="/learn/"
          className="mt-4 inline-block text-sm text-hok-gold hover:underline"
        >
          View all guides →
        </Link>
      </section>
    </div>
  );
}
