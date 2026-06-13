import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { getClimbPickForHero } from '@/lib/climb-picks';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

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

  return (
    <section className="mb-4 rounded-lg border border-hok-gold/30 bg-hok-gold/5 px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-hok-gold/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-hok-gold">
          {t('hero.climbBadge')}
        </span>
        <span className="text-xs text-gray-400">
          {t('hero.climbIntro', { name: getHeroDisplayName(hero, locale) })}
        </span>
        <Link
          href={localePath(locale, '/climb-picks')}
          className="ml-auto shrink-0 text-xs font-semibold text-hok-gold hover:underline"
        >
          {t('hero.climbViewAll')} →
        </Link>
      </div>
    </section>
  );
}
