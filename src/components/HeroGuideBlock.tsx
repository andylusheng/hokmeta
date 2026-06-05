import type { Hero } from '@/types/hero';

/** Laning / teamfight / rank notes only — build, combos, and matchups live in dedicated sections. */
export function HeroGuideBlock({ hero }: { hero: Hero }) {
  const g = hero.guide;
  if (!g) return null;

  return (
    <div className="space-y-6">
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

      <div
        id="high-rank"
        className="scroll-mt-20 rounded border border-hok-gold/30 bg-hok-gold/5 p-4"
      >
        <h3 className="mb-2 text-sm font-semibold text-hok-gold">
          High Rank (Diamond+)
        </h3>
        <p className="text-sm leading-relaxed text-gray-300">{g.highRank}</p>
      </div>

      {g.comparisons.length > 0 && (
        <div id="comparisons" className="scroll-mt-20">
          <h3 className="mb-3 text-sm font-semibold text-white">vs Similar Heroes</h3>
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
