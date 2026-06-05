import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { getHeroByName } from '@/lib/data';

function MatchupList({ names, variant }: { names: string[]; variant: 'strong' | 'weak' }) {
  const valid = names.filter((n) => n !== 'Data unavailable');
  if (!valid.length) {
    return <p className="text-sm text-gray-400">Data unavailable</p>;
  }
  return (
    <ul className="space-y-1">
      {valid.map((name) => {
        const target = getHeroByName(name);
        return (
          <li key={name}>
            {target ? (
              <Link
                href={`/hero/${target.slug}/`}
                className={
                  variant === 'strong'
                    ? 'text-sm text-hok-gold hover:underline'
                    : 'text-sm text-red-300 hover:underline'
                }
              >
                {name}
              </Link>
            ) : (
              <span className="text-sm text-gray-300">{name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function HeroGuideBlock({ hero }: { hero: Hero }) {
  const g = hero.guide;
  if (!g) return null;

  return (
    <div className="space-y-6">
      <p className="leading-relaxed text-gray-300">{g.overview}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded border border-hok-border bg-hok-dark/40 p-4">
          <h3 className="mb-2 text-sm font-semibold text-hok-gold">Best Build</h3>
          <p className="text-sm leading-relaxed text-gray-300">{g.bestBuild}</p>
        </div>
        <div className="rounded border border-hok-border bg-hok-dark/40 p-4">
          <h3 className="mb-2 text-sm font-semibold text-hok-gold">Arcana &amp; Spells</h3>
          <p className="text-sm leading-relaxed text-gray-300">{g.arcanaSpells}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-white">Combo Guide</h3>
        <p className="text-sm leading-relaxed text-gray-300">{g.combo}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-white">Laning Phase</h3>
          <p className="text-sm leading-relaxed text-gray-300">{g.laning}</p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-white">Teamfight Role</h3>
          <p className="text-sm leading-relaxed text-gray-300">{g.teamfight}</p>
        </div>
      </div>

      <div id="high-rank" className="scroll-mt-20 rounded border border-hok-gold/30 bg-hok-gold/5 p-4">
        <h3 className="mb-2 text-sm font-semibold text-hok-gold">High Rank (Diamond+)</h3>
        <p className="text-sm leading-relaxed text-gray-300">{g.highRank}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-hok-gold">{hero.name} strong into</h3>
          <MatchupList names={g.matchups.strongInto} variant="strong" />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-red-400">Counter picks</h3>
          <MatchupList names={g.matchups.weakInto} variant="weak" />
        </div>
      </div>
      <p className="text-sm text-gray-400">{g.matchups.summary}</p>

      {g.comparisons.length > 0 && (
        <div id="comparisons" className="scroll-mt-20">
          <h3 className="mb-3 text-sm font-semibold text-white">Hero Comparisons</h3>
          <ul className="space-y-2">
            {g.comparisons.map((line) => (
              <li
                key={line}
                className="rounded border border-hok-border bg-hok-dark/30 px-3 py-2 text-sm text-gray-300"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
