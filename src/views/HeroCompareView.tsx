import Link from 'next/link';
import type { ComparePair } from '@/lib/hero-compare';
import { getCompareHeroes, getRelatedPairs } from '@/lib/hero-compare';
import { HeroAvatar } from '@/components/HeroAvatar';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateRole } from '@/lib/locale-labels';
import type { HeroIndexEntry } from '@/types/hero';

function StatBar({ label, valueA, valueB, format }: {
  label: string;
  valueA: number;
  valueB: number;
  format?: (v: number) => string;
}) {
  const fmt = format ?? ((v: number) => `${v.toFixed(1)}%`);
  const max = Math.max(valueA, valueB, 1);
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm">
      <div className="flex items-center justify-end gap-2">
        <span className="font-semibold text-white">{fmt(valueA)}</span>
        <div className="h-2 rounded-full bg-hok-gold/70" style={{ width: `${(valueA / max) * 80}px` }} />
      </div>
      <span className="text-center text-xs text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <div className="h-2 rounded-full bg-blue-400/70" style={{ width: `${(valueB / max) * 80}px` }} />
        <span className="font-semibold text-white">{fmt(valueB)}</span>
      </div>
    </div>
  );
}

function HeroColumn({ hero, locale, color }: { hero: HeroIndexEntry; locale: Locale; color: string }) {
  const name = getHeroDisplayName(hero, locale);
  return (
    <div className="flex flex-col items-center gap-2">
      <Link href={localePath(locale, `/hero/${hero.slug}`)} className="group flex flex-col items-center gap-2">
        <HeroAvatar hero={hero} size={72} />
        <span className={`text-sm font-bold ${color} group-hover:underline`}>{name}</span>
      </Link>
      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-400">
        Tier {hero.tier}
      </span>
    </div>
  );
}

export function HeroCompareView({ pair, locale = 'en' }: { pair: ComparePair; locale?: Locale }) {
  const t = createT(locale);
  const heroesData = getCompareHeroes(pair);
  if (!heroesData) return null;
  const [heroA, heroB] = heroesData;
  const nameA = getHeroDisplayName(heroA, locale);
  const nameB = getHeroDisplayName(heroB, locale);
  const roleLabel = translateRole(pair.role, locale);
  const related = getRelatedPairs(pair);

  return (
    <div className="container-wide">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('compare.title'), path: localePath(locale, '/compare') },
          { name: `${nameA} vs ${nameB}`, path: localePath(locale, `/compare/${pair.pair}`) },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('compare.title'), href: localePath(locale, '/compare') },
          { label: `${nameA} vs ${nameB}` },
        ]}
      />

      <h1 className="mb-2 text-center font-display text-2xl font-black text-white sm:text-3xl">
        {nameA} vs {nameB}
      </h1>
      <p className="mb-8 text-center text-sm text-gray-400">
        {t('compare.subtitle', { role: roleLabel })}
      </p>

      {/* Hero headers */}
      <div className="mb-8 grid grid-cols-[1fr_auto_1fr] items-start gap-4">
        <HeroColumn hero={heroA} locale={locale} color="text-hok-gold" />
        <span className="mt-6 text-2xl font-black text-gray-600">VS</span>
        <HeroColumn hero={heroB} locale={locale} color="text-blue-400" />
      </div>

      {/* Stat comparison */}
      <section className="mx-auto mb-10 max-w-lg space-y-4 rounded-xl border border-hok-border bg-hok-card/60 p-6">
        <h2 className="text-center text-sm font-bold uppercase tracking-wider text-gray-400">
          {t('compare.statsTitle')}
        </h2>
        <StatBar label={t('compare.winRate')} valueA={heroA.winRate ?? 0} valueB={heroB.winRate ?? 0} />
        <StatBar label={t('compare.pickRate')} valueA={heroA.pickRate ?? 0} valueB={heroB.pickRate ?? 0} />
        <StatBar label={t('compare.banRate')} valueA={heroA.banRate ?? 0} valueB={heroB.banRate ?? 0} />
      </section>

      {/* Quick verdict */}
      <section className="mx-auto mb-10 max-w-2xl rounded-xl border border-hok-border bg-hok-card/40 p-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
          {t('compare.verdictTitle')}
        </h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            <strong className="text-hok-gold">{nameA}</strong>
            {(heroA.winRate ?? 0) >= (heroB.winRate ?? 0)
              ? t('compare.higherWr', { role: roleLabel })
              : t('compare.lowerWr', { role: roleLabel })}
          </li>
          <li>
            <strong className="text-blue-400">{nameB}</strong>
            {(heroB.winRate ?? 0) >= (heroA.winRate ?? 0)
              ? t('compare.higherWr', { role: roleLabel })
              : t('compare.lowerWr', { role: roleLabel })}
          </li>
        </ul>
      </section>

      {/* CTA links */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        <Link
          href={localePath(locale, `/hero/${heroA.slug}`)}
          className="rounded-lg bg-hok-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          {t('compare.viewHero', { name: nameA })}
        </Link>
        <Link
          href={localePath(locale, `/hero/${heroB.slug}`)}
          className="rounded-lg border border-blue-400/60 px-4 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-400/10"
        >
          {t('compare.viewHero', { name: nameB })}
        </Link>
        <Link
          href={localePath(locale, `/tools/build-compare/${heroA.slug}`)}
          className="rounded-lg border border-hok-border px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-hok-gold/50 hover:text-hok-gold"
        >
          {t('compare.buildCompareTool')}
        </Link>
      </div>

      {/* Related comparisons */}
      {related.length > 0 && (
        <section className="mx-auto max-w-2xl">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
            {t('compare.relatedTitle')}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {related.map((rp) => {
              const rh = getCompareHeroes(rp);
              if (!rh) return null;
              const rnA = getHeroDisplayName(rh[0], locale);
              const rnB = getHeroDisplayName(rh[1], locale);
              return (
                <Link
                  key={rp.pair}
                  href={localePath(locale, `/compare/${rp.pair}`)}
                  className="rounded-lg border border-hok-border/70 bg-hok-dark/40 px-4 py-2.5 text-sm text-gray-300 transition hover:border-hok-gold/50 hover:text-hok-gold"
                >
                  {rnA} vs {rnB}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
