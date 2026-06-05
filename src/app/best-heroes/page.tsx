import Link from 'next/link';
import { getHeroesGroupedByRole } from '@/lib/data';
import { ROLES_AZ } from '@/types/hero';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { HeroCard } from '@/components/HeroCard';

export const metadata = buildMetadata({
  title: defaultTitle('Best Heroes by Role'),
  description:
    'Quick ranked picks by primary role — top win-rate heroes per Tank, Warrior, Assassin, Mage, Marksman, Support.',
  path: '/best-heroes',
});

export default function BestHeroesIndexPage() {
  const grouped = getHeroesGroupedByRole();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Best Heroes', path: '/best-heroes' },
        ])}
      />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Best Heroes' }]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">Best Heroes by Role</h1>
      <p className="mb-4 max-w-2xl text-gray-400">
        SEO-friendly quick picks: who to queue in each primary role, sorted by win
        rate. For full S+ / S / A / B bands use the{' '}
        <Link href="/tier-list/" className="text-hok-gold hover:underline">
          Tier List
        </Link>
        ; for every hero use{' '}
        <Link href="/heroes/" className="text-hok-gold hover:underline">
          All Heroes
        </Link>
        .
      </p>
      <p className="mb-8 text-sm text-gray-500">
        This page answers &ldquo;who should I play as {`{role}`}?&rdquo; — not a
        duplicate of Trends (pick/ban boards) or Learn (strategy articles).
      </p>

      <div className="space-y-10">
        {ROLES_AZ.map((role) => {
          const top = grouped[role].slice(0, 3);
          if (!top.length) return null;
          return (
            <section key={role}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-xl font-bold text-hok-gold">Best {role}</h2>
                <Link
                  href={`/best-heroes/${role.toLowerCase()}/`}
                  className="text-sm text-hok-gold hover:underline"
                >
                  View all {role} →
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {top.map((hero) => (
                  <HeroCard key={hero.slug} hero={hero} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
