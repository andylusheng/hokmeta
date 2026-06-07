import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { getClimbPickForHero } from '@/lib/climb-picks';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateLane } from '@/lib/locale-labels';
import { heroToLane, LANE_LABEL } from '@/lib/lanes';

export function HeroClimbRecommend({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const pick = getClimbPickForHero(hero, locale);
  if (!pick) return null;

  const t = createT(locale);
  const lane = heroToLane(hero);
  const laneLabel =
    locale === 'zh-TW'
      ? translateLane(LANE_LABEL[lane], locale) || LANE_LABEL[lane]
      : LANE_LABEL[lane];

  return (
    <section className="mb-6 rounded-xl border border-hok-gold/40 bg-hok-gold/5 p-4 sm:p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-hok-gold/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-hok-gold">
          {t('hero.climbBadge')}
        </span>
        <span className="text-xs text-gray-500">
          {t('hero.climbLaneRank', { lane: laneLabel, rank: pick.laneRank })}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-gray-300">
        {t('hero.climbIntro', { name: getHeroDisplayName(hero, locale) })}
      </p>
      <ul className="mt-2 list-inside list-disc text-sm text-gray-400">
        {pick.reasons.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-500">
        {t('hero.climbDataNote')}
      </p>
      <Link
        href={localePath(locale, '/climb-picks')}
        className="mt-2 inline-block text-xs font-semibold text-hok-gold hover:underline"
      >
        {t('hero.climbViewAll')} →
      </Link>
    </section>
  );
}
