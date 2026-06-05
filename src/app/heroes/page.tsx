import { getHeroesGroupedByRole, heroes } from '@/lib/data';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { HeroCard } from '@/components/HeroCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { ROLES_AZ } from '@/types/hero';

export const metadata = buildMetadata({
  title: defaultTitle('All Heroes'),
  description:
    'Browse all Honor of Kings global heroes by role — skills, builds, stats, and counters.',
  path: '/heroes',
});

export default function HeroesPage() {
  const grouped = getHeroesGroupedByRole();
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Heroes', path: '/heroes' },
  ]);
  const list = itemListSchema(
    'All HOK Meta Heroes',
    heroes.map((h) => ({
      name: h.name,
      url: absoluteUrl(`/hero/${h.slug}`),
    }))
  );

  return (
    <div className="container-page">
      <JsonLd data={crumbs} />
      <JsonLd data={list} />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'All Heroes' }]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">All Meta Heroes</h1>
      <p className="mb-8 text-gray-400">
        {heroes.length} heroes grouped by role · sorted by win rate
      </p>

      <div className="space-y-10">
        {ROLES_AZ.map((role) => {
          const list = grouped[role];
          if (!list.length) return null;
          return (
            <section key={role} id={`heroes-${role.toLowerCase()}`}>
              <h2 className="mb-4 text-2xl font-bold text-hok-gold">{role}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((hero) => (
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
