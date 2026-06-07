import type { Hero } from '@/types/hero';
import { getHeroByName } from '@/lib/data';
import { HeroLinkRow, HeroUnknownRow } from '@/components/HeroLinkRow';
import { createT, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { getHeroDisplayName } from '@/lib/locale-names';

function CounterHeroList({
  names,
  locale,
}: {
  names: string[];
  locale: Locale;
}) {
  const t = createT(locale);
  const unique = Array.from(new Set(names)).filter((n) => n !== 'Data unavailable');

  if (!unique.length) {
    return <p className="text-sm text-gray-400">{t('counters.unavailable')}</p>;
  }

  return (
    <ul className="space-y-2">
      {unique.map((name) => {
        const target = getHeroByName(name);
        if (!target) {
          return (
            <li
              key={name}
              className="rounded border border-hok-border bg-hok-dark/40 px-3 py-2"
            >
              <HeroUnknownRow name={name} locale={locale} avatarSize={40} />
            </li>
          );
        }
        return (
          <li key={name}>
            <div className="rounded border border-hok-border bg-hok-dark/40 px-3 py-2 transition hover:border-hok-gold/40">
              <HeroLinkRow
                hero={target}
                locale={locale}
                avatarSize={40}
                nameClassName="truncate text-sm font-medium text-white group-hover:text-hok-gold"
                subtitle={`${translateRole(target.role, locale)} · ${t('hero.tier')} ${target.tier}`}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function CounterBlock({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const displayName = getHeroDisplayName(hero, locale);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-hok-border bg-hok-card/50 p-4">
        <h4 className="mb-1 text-sm font-semibold text-hok-gold">
          {t('counters.strongInto', { name: displayName })}
        </h4>
        <p className="mb-3 text-xs text-gray-500">
          {t('counters.strongHint', { name: displayName })}
        </p>
        <CounterHeroList names={hero.counters} locale={locale} />
      </div>
      <div className="rounded-lg border border-hok-border bg-hok-card/50 p-4">
        <h4 className="mb-1 text-sm font-semibold text-red-400">
          {t('counters.weakInto', { name: displayName })}
        </h4>
        <p className="mb-3 text-xs text-gray-500">
          {t('counters.weakHint', { name: displayName })}
        </p>
        <CounterHeroList names={hero.counteredBy} locale={locale} />
      </div>
    </div>
  );
}
