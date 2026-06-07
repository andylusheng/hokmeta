import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Hero } from '@/types/hero';
import { HeroAvatar } from '@/components/HeroAvatar';
import { localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName, translateHeroName } from '@/lib/locale-names';

export function HeroUnknownRow({
  name,
  locale = 'en',
  avatarSize = 32,
}: {
  name: string;
  locale?: Locale;
  avatarSize?: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-1 py-0.5">
      <div
        className="flex shrink-0 items-center justify-center rounded-full border border-hok-border bg-hok-dark/60 text-gray-500"
        style={{ width: avatarSize, height: avatarSize, fontSize: avatarSize * 0.35 }}
        aria-hidden
      >
        ?
      </div>
      <span className="truncate text-sm text-gray-300">
        {translateHeroName(name, locale)}
      </span>
    </div>
  );
}

export function HeroLinkRow({
  hero,
  locale = 'en',
  href,
  avatarSize = 32,
  subtitle,
  trailing,
  className = '',
  nameClassName = 'truncate text-sm font-medium text-hok-gold group-hover:text-white',
}: {
  hero: Hero;
  locale?: Locale;
  href?: string;
  avatarSize?: number;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  nameClassName?: string;
}) {
  const linkHref = href ?? localePath(locale, `/hero/${hero.slug}`);

  return (
    <Link
      href={linkHref}
      className={`group flex min-w-0 items-center gap-2.5 transition ${className}`}
    >
      <HeroAvatar hero={hero} size={avatarSize} />
      <span className="min-w-0 flex-1">
        <span className={`block ${nameClassName}`}>
          {getHeroDisplayName(hero, locale)}
        </span>
        {subtitle != null && (
          <span className="block text-xs text-gray-500">{subtitle}</span>
        )}
      </span>
      {trailing != null && (
        <span className="shrink-0 text-sm text-gray-400">{trailing}</span>
      )}
    </Link>
  );
}
