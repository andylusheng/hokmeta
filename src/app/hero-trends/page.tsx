import {
  getTopRisingHeroes,
  getMostPickedHeroes,
  getMostBannedHeroes,
  getRecentMetaChanges,
} from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { TrendList } from '@/components/TrendList';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: defaultTitle('Hero Trends'),
  description:
    'Top rising, most picked, most banned heroes and recent meta changes from HOK Meta data.',
  path: '/hero-trends',
});

export default function HeroTrendsPage() {
  const rising = getTopRisingHeroes(5);
  const picked = getMostPickedHeroes(5);
  const banned = getMostBannedHeroes(5);
  const changes = getRecentMetaChanges(8);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Hero Trends', path: '/hero-trends' },
        ])}
      />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Hero Trends' }]}
      />
      <h1 className="mb-8 text-3xl font-bold text-white">Hero Trends</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="card">
          <h2 className="section-title">Top Rising Heroes</h2>
          <TrendList heroes={rising} metric="winRate" />
        </section>
        <section className="card">
          <h2 className="section-title">Most Picked Heroes</h2>
          <TrendList heroes={picked} metric="pickRate" />
        </section>
        <section className="card">
          <h2 className="section-title">Most Banned Heroes</h2>
          <TrendList heroes={banned} metric="banRate" />
        </section>
        <section className="card">
          <h2 className="section-title">Recent Meta Changes</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {changes.map(({ hero, patch }) => (
              <li key={`${hero.slug}-${patch}`}>
                <Link
                  href={`/hero/${hero.slug}/`}
                  className="font-medium text-hok-gold hover:underline"
                >
                  {hero.name}
                </Link>
                : {patch}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
