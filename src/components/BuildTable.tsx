import type { HeroBuildItem } from '@/types/hero';
import { getItemById } from '@/lib/data';
import { getHeroPlaybook } from '@/lib/hero-playbook';
import type { Hero } from '@/types/hero';

function formatGold(gold: number | null | undefined): string {
  if (gold == null) return '—';
  return `${gold.toLocaleString()}g`;
}

export function BuildTable({
  hero,
  items,
}: {
  hero: Hero;
  items: HeroBuildItem[];
}) {
  const notes = getHeroPlaybook(hero).itemNotes;
  const noteBySlot = new Map(notes.map((n) => [n.slot, n.why]));

  const rows = items.filter((b) => b.name && b.name !== 'Data unavailable');
  if (!rows.length) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-hok-border">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <caption className="sr-only">Recommended item build order</caption>
        <thead>
          <tr className="border-b border-hok-border bg-hok-dark/60 text-xs uppercase tracking-wide text-gray-500">
            <th scope="col" className="px-3 py-2 font-semibold">
              #
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              Item
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              Gold
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              Stats
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              Why
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => {
            const db = item.itemId ? getItemById(item.itemId) : undefined;
            const gold = db?.gold ?? null;
            const stats = item.description || db?.description || '—';
            const why = noteBySlot.get(item.slot) || '—';
            return (
              <tr
                key={item.slot}
                className="border-b border-hok-border/80 last:border-0"
              >
                <td className="px-3 py-2.5 font-mono text-hok-gold">
                  {item.slot}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded object-cover"
                        loading="lazy"
                      />
                    )}
                    <span className="font-medium text-white">{item.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-gray-400">{formatGold(gold)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-400">{stats}</td>
                <td className="px-3 py-2.5 text-xs leading-relaxed text-gray-300">
                  {why}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
