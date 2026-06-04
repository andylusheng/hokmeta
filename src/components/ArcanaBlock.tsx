import type { Hero } from '@/types/hero';

export function ArcanaBlock({ hero }: { hero: Hero }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {hero.arcana.map((a) => (
        <li
          key={a}
          className="rounded-full border border-hok-border bg-hok-dark/50 px-3 py-1 text-sm text-gray-200"
        >
          {a}
        </li>
      ))}
      <li className="rounded-full border border-hok-border bg-hok-dark/50 px-3 py-1 text-sm text-gray-200">
        Spells: {hero.spells.join(' + ')}
      </li>
    </ul>
  );
}
