import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';
import { localePath, type Locale } from '@/lib/i18n';

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
      className="flex items-center gap-2 rounded border border-hok-border bg-hok-dark/50 p-2 transition hover:border-hok-gold/40"
    >
      <HeroAvatar hero={hero} size={40} />
      <span className="text-sm font-medium text-white">{hero.name}</span>
    </Link>
  );
}
