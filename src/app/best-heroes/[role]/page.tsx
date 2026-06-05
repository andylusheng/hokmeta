import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecommendedHeroesByRole } from '@/lib/data';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { HeroCard } from '@/components/HeroCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';
import type { HeroRole } from '@/types/hero';
import { ROLES } from '@/types/hero';

const roleMap: Record<string, HeroRole> = {
  tank: 'Tank',
  warrior: 'Warrior',
  assassin: 'Assassin',
  mage: 'Mage',
  marksman: 'Marksman',
  support: 'Support',
};

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.toLowerCase() }));
}

export function generateMetadata({
  params,
}: {
  params: { role: string };
}) {
  const role = roleMap[params.role.toLowerCase()];
  if (!role) return {};
  return buildMetadata({
    title: defaultTitle(`Best ${role} Heroes`),
    description: `Best ${role} heroes in Honor of Kings ranked by tier, win rate, and pick rate.`,
    path: `/best-heroes/${params.role}`,
  });
}

export default function BestHeroesRolePage({
  params,
}: {
  params: { role: string };
}) {
  const role = roleMap[params.role.toLowerCase()];
  if (!role) notFound();

  const list = getRecommendedHeroesByRole(role, 999);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Best Heroes', path: '/best-heroes' },
          { name: role, path: `/best-heroes/${params.role}` },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          `Best ${role} Heroes`,
          list.map((h) => ({
            name: h.name,
            url: absoluteUrl(`/hero/${h.slug}`),
          }))
        )}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Best Heroes', href: '/best-heroes/' },
          { label: role },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">Best {role} Heroes</h1>
      <p className="mb-8 text-gray-400">
        {list.length} {role} heroes · meta score (tier + pick + ban) ·{' '}
        <Link
          href={`/tier-list/#role-${role.toLowerCase()}`}
          className="text-hok-gold hover:underline"
        >
          Tier bands
        </Link>{' '}
        on Tier List
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((hero) => (
          <HeroCard key={hero.slug} hero={hero} />
        ))}
      </div>
    </div>
  );
}
