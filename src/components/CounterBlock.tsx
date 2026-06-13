import type { Hero } from '@/types/hero';
import Link from 'next/link';
import { getHeroByName } from '@/lib/data';
import { HeroLinkRow, HeroUnknownRow } from '@/components/HeroLinkRow';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { getHeroDisplayName } from '@/lib/locale-names';
import { getCountOverrides, getCounterOverride } from '@/lib/counter-rationale-overrides';

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
  const overrides = getCountOverrides(hero.slug);
  const override = getCounterOverride(hero.slug);
  const hasHokmeta = Boolean(
    override?.bestCounter ||
    overrides.counters.length > 0 ||
    overrides.counteredBy.length > 0
  );
  const bcHero = override?.bestCounter
    ? getHeroByName(override.bestCounter.hero)
    : undefined;

  return (
    <div className="space-y-6">
      {/* ===== 官方克制关系 (Camp HOK) ===== */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-300">
            {t('counters.campLabel')}
          </h3>
          <span className="text-[10px] text-gray-600">{t('counters.campHint')}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-500/20 bg-hok-card/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-hok-gold">
              {t('counters.strongInto', { name: displayName })}
            </h4>
            <p className="mb-3 text-xs text-gray-500">
              {t('counters.strongHint', { name: displayName })}
            </p>
            <CounterHeroList names={hero.counters} locale={locale} />
          </div>
          <div className="rounded-lg border border-blue-500/20 bg-hok-card/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-red-400">
              {t('counters.weakInto', { name: displayName })}
            </h4>
            <p className="mb-3 text-xs text-gray-500">
              {t('counters.weakHint', { name: displayName })}
            </p>
            <CounterHeroList names={hero.counteredBy} locale={locale} />
          </div>
        </div>
      </div>

      {/* ===== hokmeta 统计分析 ===== */}
      {hasHokmeta && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-green-300">
              {t('counters.hokmetaLabel')}
            </h3>
            <span className="text-[10px] text-gray-600">{t('counters.hokmetaHint')}</span>
          </div>

          {/* Best Counter highlight */}
          {override?.bestCounter && bcHero && (
            <Link
              href={localePath(locale, `/hero/${bcHero.slug}/counters`)}
              className="mb-3 block rounded-lg border border-green-500/30 bg-green-500/5 p-4 transition hover:border-green-500/50"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bcHero.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-hok-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-green-400">
                    {t('counters.hokmetaBestCounter')}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {getHeroDisplayName(bcHero, locale)}
                  </div>
                  <div className="text-xs text-green-400">
                    +{override.bestCounter.advantage}% WR advantage
                  </div>
                </div>
              </div>
              {override.bestCounter.reasons?.length > 0 && (
                <ul className="mt-2 space-y-0.5 pl-2 text-xs leading-relaxed text-gray-400">
                  {override.bestCounter.reasons.slice(0, 2).map((r, i) => (
                    <li key={i} className="line-clamp-1">
                      • {typeof r === 'string' ? r : r[locale] || r.en}
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          )}

          {/* Override counter additions */}
          {(overrides.counters.length > 0 || overrides.counteredBy.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {overrides.counters.length > 0 && (
                <div className="rounded-lg border border-green-500/20 bg-hok-card/50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-hok-gold">
                    {displayName} +{overrides.counters.length} extra counters
                  </h4>
                  <CounterHeroList names={overrides.counters} locale={locale} />
                </div>
              )}
              {overrides.counteredBy.length > 0 && (
                <div className="rounded-lg border border-green-500/20 bg-hok-card/50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-red-400">
                    {displayName} +{overrides.counteredBy.length} extra countered-by
                  </h4>
                  <CounterHeroList names={overrides.counteredBy} locale={locale} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
