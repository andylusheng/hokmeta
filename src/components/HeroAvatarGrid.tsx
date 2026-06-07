import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';
import { TierBadge } from '@/components/TierBadge';
import { heroLaneTierBand } from '@/lib/lanes';
import { localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

export function HeroAvatarGrid({
  heroes: list,
  locale = 'en',
  size = 64,
  showTier = true,
  columns = 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12',
}: {
  heroes: Hero[];
  locale?: Locale;
  size?: number;
  showTier?: boolean;
  columns?: string;
}) {
  return (
    <div className={`grid gap-1 ${columns}`}>
      {list.map((hero) => (
        <Link
          key={hero.slug}
          href={localePath(locale, `/hero/${hero.slug}`)}
          className="avatar-tile group"
          title={getHeroDisplayName(hero, locale)}
        >
          <div className="relative">
            <HeroAvatar hero={hero} size={size} className="avatar-tile-img" />
            {showTier && (
              <span className="absolute -bottom-1 -right-1 scale-90">
                <TierBadge tier={heroLaneTierBand(hero)} />
              </span>
            )}
          </div>
          <span className="max-w-full truncate text-center text-[10px] text-gray-400 group-hover:text-white sm:text-xs">
            {getHeroDisplayName(hero, locale)}
          </span>
        </Link>
      ))}
    </div>
  );
}
