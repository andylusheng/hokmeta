import Link from 'next/link';
import type { TrendComp } from '@/lib/trends';
import { HeroAvatar } from '@/components/HeroAvatar';
import { localePath, type Locale } from '@/lib/i18n';

export function TrendCompList({
  comps,
  locale = 'en',
}: {
  comps: TrendComp[];
  locale?: Locale;
}) {
  return (
    <ul className="space-y-4">
      {comps.map((comp) => (
        <li
          key={comp.id}
          className="rounded border border-hok-border bg-hok-dark/30 p-3"
        >
          <p className="mb-2 text-sm font-semibold text-hok-gold">{comp.label}</p>
          <div className="flex flex-wrap gap-2">
            {comp.heroes.map((hero) => (
              <Link
                key={hero.slug}
                href={localePath(locale, `/hero/${hero.slug}`)}
                className="flex items-center gap-1.5 rounded border border-hok-border px-2 py-1 hover:border-hok-gold/40"
                title={`${hero.role} · Tier ${hero.tier}`}
              >
                <HeroAvatar hero={hero} size={28} />
                <span className="text-xs text-white">{hero.name}</span>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">{comp.note}</p>
        </li>
      ))}
    </ul>
  );
}
