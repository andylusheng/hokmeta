import type { Hero } from '@/types/hero';
import { getHeroPlaybook } from '@/lib/hero-playbook';
import { createT, type Locale } from '@/lib/i18n';

export function ComboListBlock({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const { combos } = getHeroPlaybook(hero, locale);

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
            <span className="font-semibold text-gray-400">{t('combo.when')}: </span>
            {combo.when}
          </p>
        </li>
      ))}
    </ol>
  );
}
