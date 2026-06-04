import type { Hero } from '@/types/hero';

export function BuildBlock({ hero }: { hero: Hero }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {hero.build.map((item) => (
        <div
          key={item.slot}
          className="flex items-center gap-2 rounded border border-hok-border bg-hok-dark/40 px-3 py-2"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-hok-gold/20 text-xs font-bold text-hok-gold">
            {item.slot}
          </span>
          <span className="text-sm text-gray-100">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
