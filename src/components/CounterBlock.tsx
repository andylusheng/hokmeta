import type { Hero } from '@/types/hero';

export function CounterBlock({ hero }: { hero: Hero }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-hok-gold">
          Counters {hero.name}
        </h4>
        <ul className="list-inside list-disc text-gray-300">
          {hero.counters.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold text-red-400">
          {hero.name} is countered by
        </h4>
        <ul className="list-inside list-disc text-gray-300">
          {hero.counteredBy.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
