'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  alternateLocalePath,
  detectLocaleFromPath,
  type Locale,
} from '@/lib/i18n';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  'zh-TW': '繁中',
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const current = detectLocaleFromPath(pathname);
  const other: Locale = current === 'en' ? 'zh-TW' : 'en';
  const href = alternateLocalePath(pathname, other);

  return (
    <div className="flex items-center gap-1 rounded border border-hok-border bg-hok-card/80 p-0.5 text-xs">
      <span
        className="rounded px-2 py-1 font-semibold text-hok-gold"
        aria-current="true"
      >
        {LABELS[current]}
      </span>
      <Link
        href={href}
        className="rounded px-2 py-1 text-gray-400 transition hover:bg-hok-dark hover:text-white"
        hrefLang={other === 'zh-TW' ? 'zh-Hant' : 'en'}
        rel="alternate"
      >
        {LABELS[other]}
      </Link>
    </div>
  );
}
