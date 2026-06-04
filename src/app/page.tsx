import Link from 'next/link';
import { heroes } from '@/lib/data';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { HeroCard } from '@/components/HeroCard';
import { JsonLd, itemListSchema } from '@/lib/schema';
import { LearnCard } from '@/components/LearnCard';
import { learnArticles } from '@/lib/learn';

export const metadata = buildMetadata({
  title: defaultTitle('Honor of Kings Meta Hub'),
  description:
    'Top 30 HOK meta heroes: tier list, builds, counters, trends, and guides for ranked play.',
  path: '/',
});

export default function HomePage() {
  const featured = heroes.filter((h) => h.tier === 'S+' || h.tier === 'S').slice(0, 8);
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
          <Link href="/tier-list/" className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold">
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

      <section className="mb-10">
        <h2 className="section-title">Featured Meta Heroes</h2>
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
        <Link href="/learn/" className="mt-4 inline-block text-sm text-hok-gold hover:underline">
          View all guides →
        </Link>
      </section>
    </div>
  );
}
