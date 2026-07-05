import type { Hero } from '@/types/hero';
import { getHeroCoverUrl } from '@/lib/hero-media';
import { HeroAvatar } from '@/components/HeroAvatar';
import { TierBadge } from '@/components/TierBadge';
import { heroLaneTierBand } from '@/lib/lanes';
import { formatRate } from '@/lib/data';
import { createT, type Locale } from '@/lib/i18n';
import { formatHeroBilingualTitle } from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';

export function HeroCoverBanner({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const cover = getHeroCoverUrl(hero);
  const isZh = locale === 'zh-TW';
  const heroTitle = formatHeroBilingualTitle(hero, locale);
  const lane = translateLane(hero.lane, locale) || translateRole(hero.role, locale);

  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl border border-hok-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-hok-dark via-hok-dark/92 to-hok-dark/70" />
      <div className="relative z-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:p-8">
        <HeroAvatar hero={hero} size={96} priority className="rounded-2xl ring-2 ring-hok-gold/40" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <TierBadge tier={heroLaneTierBand(hero)} />
            <span className="text-sm text-hok-gold">
              {lane}
            </span>
          </div>
          <h1 className="font-display text-2xl font-black text-white sm:text-4xl">
            {isZh
              ? `${heroTitle} 出裝、裝備、銘文與克制`
              : `${heroTitle} Build, Items, Arcana & Counters`}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
            {isZh
              ? `${heroTitle} 是 ${lane} 的 Tier ${hero.tier} 選角；查看最佳出裝、核心裝備、銘文、召喚師技能、克制與工具計算。`
              : `${heroTitle} is a Tier ${hero.tier} ${lane} pick. Get the best build, core items, arcana, battle spell, counters, and tool-backed item decisions.`}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span>
              <span className="text-hok-muted">{t('stats.wr')}</span>{' '}
              <span className="font-bold text-white">{formatRate(hero.winRate)}</span>
            </span>
            <span>
              <span className="text-hok-muted">{t('stats.pick')}</span>{' '}
              <span className="font-bold text-white">{formatRate(hero.pickRate)}</span>
            </span>
            <span>
              <span className="text-hok-muted">{t('stats.ban')}</span>{' '}
              <span className="font-bold text-white">{formatRate(hero.banRate)}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
