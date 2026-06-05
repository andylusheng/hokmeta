import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { getHeroByName } from '@/lib/data';
import { HeroAvatar } from '@/components/HeroAvatar';

function CounterHeroList({ names }: { names: string[] }) {
  const unique = Array.from(new Set(names)).filter((n) => n !== 'Data unavailable');

  if (!unique.length) {
    return <p className="text-sm text-gray-400">Data unavailable</p>;
  }

  return (
    <ul className="space-y-2">
      {unique.map((name) => {
        const target = getHeroByName(name);
        if (!target) {
          return (
            <li
              key={name}
              className="rounded border border-hok-border bg-hok-dark/40 px-3 py-2 text-sm text-gray-300"
            >
              {name}
            </li>
          );
        }
        return (
          <li key={name}>
            <Link
              href={`/hero/${target.slug}/`}
              className="flex items-center gap-3 rounded border border-hok-border bg-hok-dark/40 px-3 py-2 transition hover:border-hok-gold/40"
            >
              <HeroAvatar hero={target} size={40} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{target.name}</p>
                <p className="text-xs text-gray-500">
                  {target.role} · Tier {target.tier}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function CounterBlock({ hero }: { hero: Hero }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-hok-border bg-hok-card/50 p-4">
        <h4 className="mb-1 text-sm font-semibold text-hok-gold">
          {hero.name} is strong into
        </h4>
        <p className="mb-3 text-xs text-gray-500">
          Pick {hero.name} when the enemy drafts these heroes.
        </p>
        <CounterHeroList names={hero.counters} />
      </div>
      <div className="rounded-lg border border-hok-border bg-hok-card/50 p-4">
        <h4 className="mb-1 text-sm font-semibold text-red-400">
          {hero.name} struggles into
        </h4>
        <p className="mb-3 text-xs text-gray-500">
          Avoid {hero.name} or ban these when they appear on the enemy team.
        </p>
        <CounterHeroList names={hero.counteredBy} />
      </div>
    </div>
  );
}
