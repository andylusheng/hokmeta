'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import Link from 'next/link';

export function CounterPickerClient({ heroes }: { heroes: Hero[] }) {
  const [slug, setSlug] = useState(heroes[0]?.slug ?? '');

  const hero = useMemo(
    () => heroes.find((h) => h.slug === slug),
    [heroes, slug]
  );

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="mb-2 block text-sm text-gray-400">Enemy hero</span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full max-w-md rounded border border-hok-border bg-hok-card px-3 py-2 text-white"
        >
          {heroes.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.name}
            </option>
          ))}
        </select>
      </label>
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
