import Link from 'next/link';
import { site } from '@/lib/data';
import patchesMeta from '../../data/patches.json';

const FOOTER_LINKS = [
  { href: '/heroes/', label: 'Heroes' },
  { href: '/tier-list/', label: 'Tier List' },
  { href: '/hero-trends/', label: 'Trends' },
  { href: '/best-heroes/', label: 'Best Heroes' },
  { href: '/learn/', label: 'Guides' },
  { href: '/tools/', label: 'Tools' },
  { href: '/about/', label: 'About' },
  { href: '/privacy/', label: 'Privacy' },
];

export function SiteFooter() {
  const updated =
    'updated' in patchesMeta && patchesMeta.updated ? patchesMeta.updated : null;

  return (
    <footer className="mt-12 border-t border-hok-border py-8 text-sm text-gray-500">
      <div className="container-page flex flex-col gap-6">
        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-hok-gold">
              {l.label}
            </Link>
          ))}
          <a
            href="/api/heroes.json"
            className="hover:text-hok-gold"
            rel="noopener"
          >
            API
          </a>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.author}.
          </p>
          <p className="text-xs text-gray-600">
            Stats: Camp HOK
            {updated ? ` · Synced ${updated}` : ''}. Run{' '}
            <code className="text-gray-500">npm run sync-meta</code> to refresh.
          </p>
        </div>
      </div>
    </footer>
  );
}
