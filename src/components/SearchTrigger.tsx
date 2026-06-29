'use client';

import { usePathname } from 'next/navigation';
import { createT, detectLocaleFromPath } from '@/lib/i18n';

export function SearchTrigger() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('hokmeta-open-search'))}
      className="flex min-w-[140px] items-center gap-2 rounded-lg border border-hok-border bg-hok-card px-3 py-2 text-sm text-gray-400 transition hover:border-hok-gold/40 hover:text-white sm:min-w-[200px]"
    >
      <span className="flex-1 text-left">{t('search.placeholder')}</span>
      <kbd className="hidden rounded border border-hok-border px-1.5 py-0.5 text-[10px] text-gray-500 sm:inline">
        Ctrl K
      </kbd>
    </button>
  );
}
