import Link from 'next/link';
import { ROLES } from '@/types/hero';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Best Heroes by Role'),
  description: 'Best Honor of Kings heroes by role — Tank, Warrior, Assassin, Mage, Marksman, Support.',
  path: '/best-heroes',
});

export default function BestHeroesIndexPage() {
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
      <h1 className="mb-6 text-3xl font-bold text-white">Best Heroes by Role</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <Link
            key={role}
            href={`/best-heroes/${role.toLowerCase()}/`}
            className="card text-lg font-semibold text-white hover:border-hok-gold/50"
          >
            Best {role} Heroes
          </Link>
        ))}
      </div>
    </div>
  );
}
