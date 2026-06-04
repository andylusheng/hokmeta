import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';
import { HeroAvatar } from '@/components/HeroAvatar';

export function TrendList({
  heroes,
  metric,
}: {
  heroes: Hero[];
  metric: 'winRate' | 'pickRate' | 'banRate';
}) {
  const label =
    metric === 'winRate'
      ? 'Win Rate'
      : metric === 'pickRate'
        ? 'Pick Rate'
        : 'Ban Rate';

  return (
    <ul className="space-y-2">
      {heroes.map((hero) => (
        <li key={hero.slug}>
          <Link
            href={`/hero/${hero.slug}/`}
            className="flex items-center justify-between gap-2 rounded border border-hok-border p-2 hover:border-hok-gold/40"
          >
            <div className="flex items-center gap-2">
              <HeroAvatar hero={hero} size={36} />
              <span className="text-sm font-medium text-white">{hero.name}</span>
            </div>
            <span className="text-sm text-hok-gold">
              {label}: {formatRate(hero[metric])}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
