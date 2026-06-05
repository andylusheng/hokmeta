import type { Hero } from '@/types/hero';
import { getHeroPlaybook } from '@/lib/hero-playbook';

export function ComboListBlock({ hero }: { hero: Hero }) {
  const { combos } = getHeroPlaybook(hero);

  return (
    <ol className="space-y-4">
      {combos.map((combo, i) => (
        <li
          key={combo.id}
          className="rounded-lg border border-hok-border bg-hok-dark/40 p-4"
        >
          <p className="text-sm font-semibold text-hok-gold">
            {i + 1}. {combo.name}
          </p>
          <p className="mt-2 font-mono text-sm text-white">{combo.steps}</p>
          <p className="mt-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-400">When: </span>
            {combo.when}
          </p>
        </li>
      ))}
    </ol>
  );
}
