import type { Hero } from '@/types/hero';

function CounterList({ items }: { items: string[] }) {
  const unique = [...new Set(items)];
  if (unique.length === 1 && unique[0] === 'Data unavailable') {
    return <p className="text-sm text-gray-400">Data unavailable</p>;
  }
  return (
    <ul className="list-inside list-disc text-gray-300">
      {unique.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}

export function CounterBlock({ hero }: { hero: Hero }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-hok-gold">
          {hero.name} is strong into
        </h4>
        <p className="mb-2 text-xs text-gray-500">
          Pick {hero.name} when the enemy drafts these heroes.
        </p>
        <CounterList items={hero.counters} />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold text-red-400">
          {hero.name} struggles into
        </h4>
        <p className="mb-2 text-xs text-gray-500">
          Avoid {hero.name} or ban these when they appear on the enemy team.
        </p>
        <CounterList items={hero.counteredBy} />
      </div>
    </div>
  );
}
