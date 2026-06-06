'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { detectLocaleFromPath } from '@/lib/i18n';

export function LocaleDocument() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = detectLocaleFromPath(pathname);
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant' : 'en';
  }, [pathname]);

  return null;
}
