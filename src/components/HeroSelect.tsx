'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';

export function HeroSelect({
  heroes,
  value,
  onChange,
}: {
  heroes: Hero[];
  value: string;
  onChange: (slug: string) => void;
}) {
  const [query, setQuery] = useState('');
  const selected = heroes.find((h) => h.slug === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return heroes;
    return heroes.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.role.toLowerCase().includes(q) ||
        h.slug.includes(q)
    );
  }, [heroes, query]);

  return (
    <div className="space-y-3">
      {selected && (
        <div className="flex items-center gap-3 rounded border border-hok-gold/40 bg-hok-card px-3 py-2">
          <HeroAvatar hero={selected} size={48} />
          <div>
            <p className="font-semibold text-white">{selected.name}</p>
            <p className="text-sm text-gray-400">
              {selected.role} · Tier {selected.tier}
            </p>
          </div>
        </div>
      )}

      <input
        type="search"
        placeholder="Search hero…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md rounded border border-hok-border bg-hok-card px-3 py-2 text-sm text-white placeholder:text-gray-500"
      />

      <ul className="max-h-72 overflow-y-auto rounded border border-hok-border bg-hok-card">
        {filtered.map((h) => (
          <li key={h.slug}>
            <button
              type="button"
              onClick={() => onChange(h.slug)}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-hok-dark/60 ${
                h.slug === value ? 'bg-hok-gold/10' : ''
              }`}
            >
              <HeroAvatar hero={h} size={36} />
              <span className="text-sm text-white">{h.name}</span>
              <span className="ml-auto text-xs text-gray-500">{h.role}</span>
            </button>
          </li>
        ))}
        {!filtered.length && (
          <li className="px-3 py-4 text-sm text-gray-500">No heroes found.</li>
        )}
      </ul>
    </div>
  );
}
