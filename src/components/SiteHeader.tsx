import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

const NAV = [
  { href: '/heroes/', label: 'Heroes' },
  { href: '/tier-list/', label: 'Tier List' },
  { href: '/hero-trends/', label: 'Trends' },
  { href: '/best-heroes/', label: 'Best Heroes' },
  { href: '/tools/', label: 'Tools' },
  { href: '/learn/', label: 'Learn' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hok-border bg-hok-dark/95 backdrop-blur">
      <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold text-hok-gold">
            HOK Meta
          </Link>
          <nav className="hidden flex-wrap gap-3 text-sm md:flex" aria-label="Main">
            {NAV.map((n) => (
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
        <SearchBar compact />
      </div>
      <nav
        className="container-page flex gap-3 overflow-x-auto pb-2 text-xs md:hidden"
        aria-label="Mobile"
      >
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="whitespace-nowrap text-gray-400">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
