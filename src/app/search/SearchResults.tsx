'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { heroes } from '@/lib/data';
import { HeroCard } from '@/components/HeroCard';

export function SearchResults() {
  const params = useSearchParams();
  const q = (params.get('q') ?? '').trim().toLowerCase();
  const results = q
    ? heroes.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.slug.includes(q) ||
          h.role.toLowerCase().includes(q)
      )
    : [];

  if (!q) {
    return <p className="text-gray-400">Enter a hero name in the header search.</p>;
  }
  if (!results.length) {
    return (
      <p className="text-gray-400">
        No heroes found.{' '}
        <Link href="/heroes/" className="text-hok-gold hover:underline">
          Browse all heroes
        </Link>
      </p>
    );
  }

  return (
    <>
      <p className="mb-6 text-gray-400">
        {results.length} result(s) for &quot;{params.get('q')}&quot;
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((hero) => (
          <HeroCard key={hero.slug} hero={hero} />
        ))}
      </div>
    </>
  );
}
