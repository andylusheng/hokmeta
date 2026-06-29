'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchTrigger } from '@/components/SearchTrigger';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  createT,
  detectLocaleFromPath,
  localePath,
  type Locale,
} from '@/lib/i18n';

function navItems(locale: Locale) {
  const t = createT(locale);
  return [
    { href: localePath(locale, '/climb-picks'), label: t('nav.climbPicks') },
    { href: localePath(locale, '/tier-list'), label: t('nav.tierList') },
    { href: localePath(locale, '/heroes'), label: t('nav.heroBuilds') },
    { href: localePath(locale, '/tools'), label: t('nav.tools') },
    { href: localePath(locale, '/items'), label: t('nav.items') },
    { href: localePath(locale, '/arcana'), label: t('nav.arcana') },
    { href: localePath(locale, '/learn'), label: t('nav.guides') },
    { href: localePath(locale, '/patches'), label: t('nav.patches') },
  ];
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);
  const nav = navItems(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-hok-border/80 bg-hok-dark/95 backdrop-blur-md">
      <div className="container-wide flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href={localePath(locale, '/')} className="group flex flex-col leading-tight">
            <span className="font-display text-xl font-black tracking-tight text-hok-gold group-hover:text-yellow-400">
              HOKMeta
            </span>
            <span className="hidden text-[10px] text-hok-muted sm:block">{t('brand.slogan')}</span>
          </Link>
          <nav className="hidden gap-1 lg:flex" aria-label="Main">
            {nav.map((n) => {
              const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-hok-gold/15 text-hok-gold'
                      : 'text-gray-400 hover:bg-hok-card hover:text-white'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <SearchTrigger />
          <LanguageSwitcher />
        </div>
      </div>
      <nav
        className="container-wide flex gap-2 overflow-x-auto pb-2 lg:hidden"
        aria-label="Mobile"
      >
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="whitespace-nowrap rounded-lg border border-hok-border px-3 py-1.5 text-xs text-gray-400 hover:border-hok-gold/40 hover:text-white"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
