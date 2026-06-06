import Link from 'next/link';
import type { TrendDuo } from '@/lib/trends';
import { HeroAvatar } from '@/components/HeroAvatar';
import { localePath, type Locale } from '@/lib/i18n';

export function TrendDuoList({
  duos,
  locale = 'en',
}: {
  duos: TrendDuo[];
  locale?: Locale;
}) {
  return (
    <ul className="space-y-3">
      {duos.map((duo) => (
        <li
          key={duo.id}
          className="rounded border border-hok-border bg-hok-dark/30 p-3"
        >
          <p className="mb-2 text-sm font-medium text-white">{duo.label}</p>
          <div className="flex flex-wrap items-center gap-2">
            {duo.heroes.map((hero, i) => (
              <span key={hero.slug} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-xs text-gray-500" aria-hidden>
                    +
                  </span>
                )}
                <Link
                  href={localePath(locale, `/hero/${hero.slug}`)}
                  className="flex items-center gap-2 rounded border border-hok-border px-2 py-1 hover:border-hok-gold/40"
                >
                  <HeroAvatar hero={hero} size={32} />
                  <span className="text-sm text-white">{hero.name}</span>
                </Link>
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">{duo.note}</p>
        </li>
      ))}
    </ul>
  );
}
