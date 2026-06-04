'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import { BuildBlock } from '@/components/BuildBlock';

export function BuildGeneratorClient({ heroes }: { heroes: Hero[] }) {
  const [slug, setSlug] = useState(heroes[0]?.slug ?? '');

  const hero = useMemo(
    () => heroes.find((h) => h.slug === slug),
    [heroes, slug]
  );

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="mb-2 block text-sm text-gray-400">Select hero</span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full max-w-md rounded border border-hok-border bg-hok-card px-3 py-2 text-white"
        >
          {heroes.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.name} ({h.role})
            </option>
          ))}
        </select>
      </label>
      {hero ? (
        <div className="card">
          <h2 className="section-title">{hero.name} build path</h2>
          <BuildBlock hero={hero} />
          <p className="mt-4 text-sm text-gray-400">
            Tier {hero.tier} · {formatRate(hero.winRate)} win rate · Data from
            heroes.json
          </p>
        </div>
      ) : null}
    </div>
  );
}

function formatRate(value: number | null): string {
  if (value === null) return 'Data unavailable';
  return `${value.toFixed(1)}%`;
}
