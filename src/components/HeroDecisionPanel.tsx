import Image from 'next/image';
import Link from 'next/link';
import type { Hero, HeroBuildItem } from '@/types/hero';
import {
  defaultBuildPresetIndex,
  formatRate,
  getHeroBuildPresets,
} from '@/lib/data';
import { getHeroPlaybook } from '@/lib/hero-playbook';
import { createT, localePath, type Locale } from '@/lib/i18n';
import {
  formatHeroNameList,
  getHeroDisplayName,
  translateItemName,
} from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';

function getCoreItems(hero: Hero, locale: Locale): HeroBuildItem[] {
  const presets = getHeroBuildPresets(hero, locale);
  if (!presets.length) return [];
  return presets[defaultBuildPresetIndex(hero, locale)].items
    .filter((item) => item.name && item.name !== 'Data unavailable')
    .slice(0, 3);
}

function getPickKey(hero: Hero): string {
  if (hero.tier === 'S+' || hero.tier === 'S') return 'hero.decision.pick.highTier';
  if (hero.role === 'Marksman' || hero.lane === 'Farm Lane') return 'hero.decision.pick.marksman';
  if (hero.role === 'Mage' || hero.lane === 'Mid Lane') return 'hero.decision.pick.mage';
  if (hero.role === 'Assassin' || hero.lane === 'Jungling') return 'hero.decision.pick.assassin';
  if (hero.role === 'Support' || hero.lane === 'Roaming') return 'hero.decision.pick.support';
  if (hero.role === 'Tank') return 'hero.decision.pick.tank';
  if (hero.role === 'Warrior' || hero.lane === 'Clash Lane') return 'hero.decision.pick.warrior';
  return 'hero.decision.pick.default';
}

function getAvoidKey(hero: Hero): string {
  if (hero.role === 'Marksman' || hero.lane === 'Farm Lane') return 'hero.decision.avoid.marksman';
  if (hero.role === 'Mage' || hero.lane === 'Mid Lane') return 'hero.decision.avoid.mage';
  if (hero.role === 'Assassin' || hero.lane === 'Jungling') return 'hero.decision.avoid.assassin';
  if (hero.role === 'Support' || hero.lane === 'Roaming') return 'hero.decision.avoid.support';
  if (hero.role === 'Tank') return 'hero.decision.avoid.tank';
  if (hero.role === 'Warrior' || hero.lane === 'Clash Lane') return 'hero.decision.avoid.warrior';
  return 'hero.decision.avoid.default';
}

export function HeroDecisionPanel({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const playbook = getHeroPlaybook(hero, locale);
  const coreItems = getCoreItems(hero, locale);
  const name = getHeroDisplayName(hero, locale);
  const lane = translateLane(hero.lane, locale) || translateRole(hero.role, locale);
  const weakCounters = (hero.counteredBy || [])
    .filter((counter) => counter && counter !== 'Data unavailable')
    .slice(0, 3);
  const weakCounterText = weakCounters.length
    ? formatHeroNameList(weakCounters, locale)
    : '';

  return (
    <section
      id="overview"
      className="scroll-mt-20 mb-6 rounded-xl border border-hok-gold/30 bg-gradient-to-br from-hok-card to-hok-dark/80 p-5 sm:p-6"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {t('hero.decision.label')}
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">
            {t('hero.decision.title', { name })}
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

      <p className="mb-4 text-sm leading-relaxed text-gray-300">{playbook.hook}</p>

      <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {t('hero.decision.tldr')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-200">
            {t('hero.decision.metaLine', {
              name,
              tier: hero.tier,
              lane,
              wr: formatRate(hero.winRate),
            })}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {playbook.tldr.combo}
          </p>
        </div>

        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {t('hero.decision.coreItems')}
          </p>
          {coreItems.length ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {coreItems.map((item) => (
                <div
                  key={`${item.slot}-${item.itemId || item.name}`}
                  className="min-w-0 rounded-lg border border-hok-border/70 bg-hok-card/60 p-2"
                  title={translateItemName(item.name, locale, item.itemId)}
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded bg-hok-dark/70">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">{item.slot}</span>
                    )}
                  </div>
                  <p className="mt-2 truncate text-center text-[11px] text-gray-300">
                    {translateItemName(item.name, locale, item.itemId)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              {t('hero.decision.coreFallback')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-500/25 bg-emerald-950/20 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            {t('hero.decision.pickWhen')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {t(getPickKey(hero), { lane, role: translateRole(hero.role, locale) })}
          </p>
        </div>
        <div className="rounded-lg border border-red-500/25 bg-red-950/20 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-red-300">
            {t('hero.decision.avoidWhen')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {weakCounterText
              ? t('hero.decision.counterRisk', { names: weakCounterText })
              : t(getAvoidKey(hero), { lane, role: translateRole(hero.role, locale) })}
          </p>
        </div>
      </div>

      <Link
        href={localePath(locale, `/hero/${hero.slug}/counters`)}
        className="mt-3 flex flex-col gap-1 rounded-lg border border-hok-gold/40 bg-hok-gold/10 px-4 py-3 text-sm text-hok-gold hover:border-hok-gold hover:bg-hok-gold/15 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="font-semibold">{t('hero.decision.counterCta')}</span>
        <span className="text-xs text-gray-300">
          {t('hero.decision.counterCtaHint', { name })}
        </span>
      </Link>
    </section>
  );
}
