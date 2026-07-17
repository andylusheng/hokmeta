import Link from 'next/link';
import Image from 'next/image';
import type { Hero } from '@/types/hero';
import patchesMeta from '../../../data/patches.json';
import { getHeroCoverUrl } from '@/lib/hero-media';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';

export function HeroSplash({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const cover = getHeroCoverUrl(hero);
  const season =
    'season' in patchesMeta && patchesMeta.season
      ? String(patchesMeta.season)
      : 'Live';
  const heroTitle = getHeroDisplayName(hero, locale);
  const lane = translateLane(hero.lane, locale) || translateRole(hero.role, locale);
  const wr = hero.winRate != null ? `${hero.winRate.toFixed(1)}%` : '';
  const build =
    locale === 'zh-TW'
      ? hero.buildZh?.find((b) => b.name && b.name !== 'Data unavailable')?.name ||
        hero.build?.find((b) => b.name && b.name !== 'Data unavailable')?.name
      : hero.build?.find((b) => b.name && b.name !== 'Data unavailable')?.name;
  const summary =
    locale === 'zh-TW'
      ? `${heroTitle} 是 ${lane} 的 ${hero.tier} 梯度選角${wr ? `（勝率 ${wr}）` : ''}${build ? `，核心裝是 ${build}` : ''}。`
      : locale === 'id'
        ? `${heroTitle} adalah pick Tier ${hero.tier} di ${lane}${wr ? ` (WR ${wr})` : ''}${build ? ` — item core ${build}` : ''}.`
        : locale === 'fil'
          ? `${heroTitle} ay Tier ${hero.tier} pick sa ${lane}${wr ? ` (${wr} WR)` : ''}${build ? ` — core item ${build}` : ''}.`
          : `${heroTitle} is a ${hero.tier}-tier ${lane} pick${wr ? ` (${wr} WR)` : ''}${build ? ` — core item ${build}` : ''}.`;

  return (
    <section className="relative mb-10 overflow-hidden rounded-2xl border border-hok-border bg-hok-card">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="absolute right-0 top-0 h-full w-[55%] sm:w-[50%]" aria-hidden>
        <Image
          alt=""
          src={cover}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 55vw, (max-width: 1024px) 50vw, 700px"
          className="object-cover object-top opacity-90"
        />
      </div>
      <div className="absolute inset-0 bg-splash-gradient" aria-hidden />
      <div className="relative z-10 flex min-h-[280px] flex-col justify-center p-6 sm:min-h-[320px] sm:p-10 lg:max-w-[58%]">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-hok-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-hok-gold ring-1 ring-hok-gold/30">
            {t('home.splashPatch', { season })}
          </span>
          <span className="text-xs text-hok-muted">
            {lane}
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
          {t('home.splashFeaturedLabel')}
        </p>
        <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          {t('home.splashFeaturedTitle', { name: heroTitle })}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
          {summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, `/hero/${hero.slug}#build`)}
            className="btn-primary"
          >
            {t('home.splashViewBuild')}
          </Link>
          <Link
            href={localePath(locale, '/heroes')}
            className="btn-secondary"
          >
            {t('nav.heroBuilds')}
          </Link>
        </div>
      </div>
    </section>
  );
}
