'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import { BuildBlock } from '@/components/BuildBlock';
import { HeroSelect } from '@/components/HeroSelect';

export function BuildGeneratorClient({ heroes }: { heroes: Hero[] }) {
  const [slug, setSlug] = useState(heroes[0]?.slug ?? '');

  const hero = useMemo(
    () => heroes.find((h) => h.slug === slug),
    [heroes, slug]
  );

  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block text-sm text-gray-400">Select hero</span>
        <HeroSelect heroes={heroes} value={slug} onChange={setSlug} />
      </div>
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
