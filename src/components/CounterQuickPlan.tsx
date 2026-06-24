import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { formatRate, getHeroByName } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { formatHeroNameList, getHeroDisplayName } from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';
import type { LaneCounterList } from '@/lib/counter-rationale';

function rolePlanKey(hero: Hero): string {
  if (hero.role === 'Marksman' || hero.lane === 'Farm Lane') return 'marksman';
  if (hero.role === 'Mage' || hero.lane === 'Mid Lane') return 'mage';
  if (hero.role === 'Assassin' || hero.lane === 'Jungling') return 'assassin';
  if (hero.role === 'Support' || hero.lane === 'Roaming') return 'support';
  if (hero.role === 'Tank') return 'tank';
  if (hero.role === 'Warrior' || hero.lane === 'Clash Lane') return 'warrior';
  return 'default';
}

function uniqueCounterNames(counters: string[], laneCounters: LaneCounterList): string[] {
  const ordered = [
    ...laneCounters.sameLane,
    ...laneCounters.otherLane,
    ...counters,
  ];
  const seen = new Set<string>();
  return ordered.filter((name) => {
    const key = name.toLowerCase();
    if (!name || name === 'Data unavailable' || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function CounterPickCard({
  name,
  target,
  locale,
  sameLane,
}: {
  name: string;
  target: Hero;
  locale: Locale;
  sameLane: boolean;
}) {
  const t = createT(locale);
  const hero = getHeroByName(name);
  if (!hero) {
    return (
      <div className="rounded-lg border border-hok-border/70 bg-hok-dark/40 p-3">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="mt-1 text-xs text-gray-500">{t('counterPage.quickFallbackPick')}</p>
      </div>
    );
  }

  return (
    <Link
      href={localePath(locale, `/hero/${hero.slug}`)}
      className="group rounded-lg border border-hok-border/70 bg-hok-card/60 p-3 transition hover:border-hok-gold/50"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.avatar}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full border border-hok-border object-cover"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white group-hover:text-hok-gold">
            {getHeroDisplayName(hero, locale)}
          </p>
          <p className="text-xs text-gray-400">
            {translateRole(hero.role, locale)} · {hero.tier}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-hok-gold/10 px-2 py-0.5 text-hok-gold">
          {sameLane ? t('counterPage.quickSameLane') : t('counterPage.quickTeamfight')}
        </span>
        <span className="text-gray-500">
          {t('counterPage.quickVs', {
            name: getHeroDisplayName(target, locale),
          })}
        </span>
      </div>
    </Link>
  );
}

export function CounterQuickPlan({
  hero,
  locale = 'en',
  counters,
  laneCounters,
}: {
  hero: Hero;
  locale?: Locale;
  counters: string[];
  laneCounters: LaneCounterList;
}) {
  const t = createT(locale);
  const name = getHeroDisplayName(hero, locale);
  const lane = translateLane(hero.lane, locale) || translateRole(hero.role, locale);
  const role = translateRole(hero.role, locale);
  const roleKey = rolePlanKey(hero);
  const orderedCounters = uniqueCounterNames(counters, laneCounters);
  const topCounters = orderedCounters.slice(0, 3);
  const topCounterText = formatHeroNameList(topCounters, locale);

  return (
    <section className="mb-8 rounded-xl border border-hok-gold/30 bg-gradient-to-br from-hok-card to-hok-dark/80 p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {t('counterPage.quickLabel')}
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">
            {topCounterText
              ? t('counterPage.quickTitle', { name, counters: topCounterText })
              : t('counterPage.quickTitleFallback', { name })}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-gray-300">
          <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-1">
            {t('hero.tier')} {hero.tier}
          </span>
          <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-1">
            {formatRate(hero.winRate)} {t('hero.wr')}
          </span>
          <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-1">
            {lane}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-gray-300">
        {t('counterPage.quickMeta', { name, lane, role })}
      </p>

      <div className="grid gap-3 lg:grid-cols-[1fr_1.05fr]">
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {t('counterPage.quickTopPicks')}
          </p>
          {topCounters.length ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {topCounters.map((counterName) => (
                <CounterPickCard
                  key={counterName}
                  name={counterName}
                  target={hero}
                  locale={locale}
                  sameLane={laneCounters.sameLane.includes(counterName)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-400">
              {t('counterPage.quickNoCounters', { name })}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          {(['lane', 'teamfight', 'draft'] as const).map((slot) => (
            <div
              key={slot}
              className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
                {t(`counterPage.quickPlan.${slot}Title`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                {t(`counterPage.quickPlan.${slot}.${roleKey}`, { name, lane, role })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Link
          href={localePath(locale, `/hero/${hero.slug}`)}
          className="rounded-lg border border-hok-gold/40 bg-hok-gold/10 px-4 py-3 text-sm font-semibold text-hok-gold hover:border-hok-gold hover:bg-hok-gold/15"
        >
          {t('counterPage.quickHeroCta', { name })}
        </Link>
        <Link
          href={localePath(locale, '/tools/counter-picker')}
          className="rounded-lg border border-hok-border bg-hok-dark/50 px-4 py-3 text-sm font-semibold text-gray-200 hover:border-hok-gold/50 hover:text-hok-gold"
        >
          {t('counterPage.quickToolCta')}
        </Link>
      </div>
    </section>
  );
}
