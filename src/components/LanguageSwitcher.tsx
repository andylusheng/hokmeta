'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLanguageSwitcherEntries } from '@/lib/locale-readiness';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const entries = getLanguageSwitcherEntries(pathname);

  return (
    <div className="flex items-center gap-1 rounded border border-hok-border bg-hok-card/80 p-0.5 text-xs">
      {entries.map((entry) =>
        entry.current ? (
          <span
            key={entry.locale}
            className="rounded px-2 py-1 font-semibold text-hok-gold"
            aria-current="true"
          >
            {entry.label}
          </span>
        ) : (
          <Link
            key={entry.locale}
            href={entry.href}
            className="rounded px-2 py-1 text-gray-400 transition hover:bg-hok-dark hover:text-white"
            hrefLang={entry.hrefLang}
            rel="alternate"
          >
            {entry.label}
          </Link>
        )
      )}
    </div>
  );
}
