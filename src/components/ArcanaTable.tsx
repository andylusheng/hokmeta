import type { Hero } from '@/types/hero';
import { getHeroPlaybook } from '@/lib/hero-playbook';

export function ArcanaTable({ hero }: { hero: Hero }) {
  const { arcanaRows } = getHeroPlaybook(hero);
  if (!arcanaRows.length) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-hok-border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Arcana and battle spell setup</caption>
        <thead>
          <tr className="border-b border-hok-border bg-hok-dark/60 text-xs uppercase tracking-wide text-gray-500">
            <th scope="col" className="px-3 py-2 font-semibold">
              Slot
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              Choice
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              Effect
            </th>
          </tr>
        </thead>
        <tbody>
          {arcanaRows.map((row) => (
            <tr
              key={`${row.slot}-${row.rune}`}
              className="border-b border-hok-border/80 last:border-0"
            >
              <td className="px-3 py-2.5 text-gray-400">{row.slot}</td>
              <td className="px-3 py-2.5 font-medium text-white">{row.rune}</td>
              <td className="px-3 py-2.5 text-xs leading-relaxed text-gray-300">
                {row.effect}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
