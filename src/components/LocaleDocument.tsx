'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { detectLocaleFromPath, htmlLang } from '@/lib/i18n';

export function LocaleDocument() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = detectLocaleFromPath(pathname);
    document.documentElement.lang = htmlLang(locale);
  }, [pathname]);

  return null;
}
