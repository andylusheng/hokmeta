import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';
import { TierBadge } from '@/components/TierBadge';
import { heroLaneTierBand } from '@/lib/lanes';
import { localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

export function TierCard({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  return (
    <Link
      href={localePath(locale, `/hero/${hero.slug}`)}
      className="inline-flex items-center gap-2 rounded-lg border border-hok-border bg-hok-dark/50 px-2 py-1.5 transition hover:border-hok-gold/40 hover:bg-hok-card"
    >
      <HeroAvatar hero={hero} size={32} />
      <span className="text-sm font-medium text-white">
        {getHeroDisplayName(hero, locale)}
      </span>
      <TierBadge tier={heroLaneTierBand(hero)} />
    </Link>
  );
}
