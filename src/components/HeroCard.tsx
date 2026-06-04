import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';
import { formatRate } from '@/lib/data';

export function HeroCard({ hero }: { hero: Hero }) {
  const hasStats = hero.winRate !== null;

  return (
    <Link
      href={`/hero/${hero.slug}/`}
      className="card flex items-center gap-3 transition hover:border-hok-gold/50"
    >
      <HeroAvatar hero={hero} size={56} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white">{hero.name}</h3>
        <p className="text-sm text-gray-400">
          {hero.role} · Tier {hero.tier}
          {hero.rank != null && (
            <span className="text-gray-500"> · #{hero.rank}</span>
          )}
        </p>
        {hasStats && (
          <p className="mt-1 text-xs text-hok-gold">
            WR {formatRate(hero.winRate)} · Pick {formatRate(hero.pickRate)} · Ban{' '}
            {formatRate(hero.banRate)}
          </p>
        )}
      </div>
    </Link>
  );
}
