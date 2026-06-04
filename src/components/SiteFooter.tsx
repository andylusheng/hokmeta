import Link from 'next/link';
import { site } from '@/lib/data';

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-hok-border py-8 text-sm text-gray-500">
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.author}.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/heroes/" className="hover:text-hok-gold">
            Heroes
          </Link>
          <Link href="/tier-list/" className="hover:text-hok-gold">
            Tier List
          </Link>
          <Link href="/learn/" className="hover:text-hok-gold">
            Guides
          </Link>
        </div>
      </div>
    </footer>
  );
}
