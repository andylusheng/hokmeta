'use client';

import { usePathname } from 'next/navigation';
import { createT, detectLocaleFromPath } from '@/lib/i18n';

export function SkipToContent() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-hok-gold focus:px-3 focus:py-2 focus:text-hok-dark"
    >
      {t('common.skipToContent')}
    </a>
  );
}
