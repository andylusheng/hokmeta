import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';

export function HeroCard({ hero }: { hero: Hero }) {
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
        </p>
      </div>
    </Link>
  );
}
