import type { Hero } from '@/types/hero';
import { getHeroPlaybook } from '@/lib/hero-playbook';
import { createT, type Locale } from '@/lib/i18n';

export function ArcanaTable({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const { arcanaRows } = getHeroPlaybook(hero, locale);
  if (!arcanaRows.length) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-hok-border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Arcana and battle spell setup</caption>
        <thead>
          <tr className="border-b border-hok-border bg-hok-dark/60 text-xs uppercase tracking-wide text-gray-500">
            <th scope="col" className="px-3 py-2 font-semibold">
              {t('arcana.colSlot')}
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              {t('arcana.colChoice')}
            </th>
            <th scope="col" className="px-3 py-2 font-semibold">
              {t('arcana.colEffect')}
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
