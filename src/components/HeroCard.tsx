import Link from 'next/link';
import type { HeroIndexEntry } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';
import { formatRate } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { getHeroDisplayName } from '@/lib/locale-names';

export function HeroCard({
  hero,
  locale = 'en',
}: {
  hero: HeroIndexEntry;
  locale?: Locale;
}) {
  const t = createT(locale);
  const hasStats = hero.winRate !== null;

  return (
    <Link
      href={localePath(locale, `/hero/${hero.slug}`)}
      className="card flex items-center gap-3 transition hover:border-hok-gold/50"
    >
      <HeroAvatar hero={hero} size={56} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white">
          {getHeroDisplayName(hero, locale)}
        </h3>
        <p className="text-sm text-gray-400">
          {translateRole(hero.role, locale)} · {t('hero.tier')} {hero.tier}
          {hero.rank != null && (
            <span className="text-gray-500"> · #{hero.rank}</span>
          )}
        </p>
        {hasStats && (
          <p className="mt-1 text-xs text-hok-gold">
            {t('stats.wr')} {formatRate(hero.winRate)} · {t('stats.pick')}{' '}
            {formatRate(hero.pickRate)} · {t('stats.ban')}{' '}
            {formatRate(hero.banRate)}
          </p>
        )}
      </div>
    </Link>
  );
}
