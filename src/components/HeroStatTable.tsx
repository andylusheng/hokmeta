import type { Hero } from '@/types/hero';
import { formatRate, formatRank } from '@/lib/data';

export function HeroStatTable({ hero }: { hero: Hero }) {
  const rows = [
    ['Rank', formatRank(hero.rank)],
    ['Tier', hero.tier],
    ['Role', hero.role],
    ['Difficulty', hero.difficulty],
    ['Win Rate', formatRate(hero.winRate)],
    ['Pick Rate', formatRate(hero.pickRate)],
    ['Ban Rate', formatRate(hero.banRate)],
  ] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{hero.name} stats</caption>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-hok-border">
              <th
                scope="row"
                className="py-2 pr-4 font-semibold text-gray-300"
              >
                {label}
              </th>
              <td className="py-2 text-white">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
