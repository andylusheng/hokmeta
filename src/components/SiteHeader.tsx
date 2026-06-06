'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchBar } from '@/components/SearchBar';
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
    { href: localePath(locale, '/heroes'), label: t('nav.heroes') },
    { href: localePath(locale, '/tier-list'), label: t('nav.tierList') },
    { href: localePath(locale, '/hero-trends'), label: t('nav.trends') },
    { href: localePath(locale, '/best-heroes'), label: t('nav.bestHeroes') },
    { href: localePath(locale, '/tools'), label: t('nav.tools') },
    { href: localePath(locale, '/learn'), label: t('nav.learn') },
  ];
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);
  const nav = navItems(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-hok-border bg-hok-dark/95 backdrop-blur">
      <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href={localePath(locale, '/')} className="text-lg font-bold text-hok-gold">
            HOK Meta
          </Link>
          <nav className="hidden flex-wrap gap-3 text-sm md:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-gray-300 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar compact />
          <LanguageSwitcher />
        </div>
      </div>
      <nav
        className="container-page flex gap-3 overflow-x-auto pb-2 text-xs md:hidden"
        aria-label="Mobile"
      >
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="whitespace-nowrap text-gray-400">
            {n.label}
          </Link>
        ))}
      </nav>
      <span className="sr-only">{t('lang.switch')}</span>
    </header>
  );
}
