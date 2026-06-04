import { heroes } from '@/lib/data';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { HeroCard } from '@/components/HeroCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('All Heroes'),
  description: 'Browse all 30 top Honor of Kings meta heroes with builds, stats, and counters.',
  path: '/heroes',
});

export default function HeroesPage() {
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
      <h1 className="mb-6 text-3xl font-bold text-white">All Meta Heroes</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {heroes.map((hero) => (
          <HeroCard key={hero.slug} hero={hero} />
        ))}
      </div>
    </div>
  );
}
