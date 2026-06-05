'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import Link from 'next/link';
import { HeroSelect } from '@/components/HeroSelect';

export function CounterPickerClient({ heroes }: { heroes: Hero[] }) {
  const [slug, setSlug] = useState(heroes[0]?.slug ?? '');

  const hero = useMemo(
    () => heroes.find((h) => h.slug === slug),
    [heroes, slug]
  );

  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block text-sm text-gray-400">Enemy hero</span>
        <HeroSelect heroes={heroes} value={slug} onChange={setSlug} />
      </div>
      {hero ? (
        <div className="card">
          <h2 className="section-title">Counters for {hero.name}</h2>
          <ul className="space-y-2">
            {hero.counters.map((name) => {
              const match = heroes.find(
                (h) => h.name.toLowerCase() === name.toLowerCase()
              );
              return (
                <li key={name}>
                  {match ? (
                    <Link
                      href={`/hero/${match.slug}/`}
                      className="text-hok-gold hover:underline"
                    >
                      {name}
                    </Link>
                  ) : (
                    <span className="text-gray-300">{name}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            Ban rate {hero.banRate != null ? `${hero.banRate}%` : 'Data unavailable'} ·
            Role {hero.role}
          </p>
        </div>
      ) : null}
    </div>
  );
}
