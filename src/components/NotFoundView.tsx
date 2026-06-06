'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createT, detectLocaleFromPath, localePath } from '@/lib/i18n';

export function NotFoundView() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);

  return (
    <div className="container-page py-16 text-center">
      <h1 className="mb-2 text-4xl font-bold text-white">{t('notFound.title')}</h1>
      <p className="mb-8 text-gray-400">{t('notFound.message')}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href={localePath(locale, '/')} className="btn-primary">
          {t('notFound.home')}
        </Link>
        <Link
          href={localePath(locale, '/heroes')}
          className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold"
        >
          {t('notFound.allHeroes')}
        </Link>
      </div>
    </div>
  );
}
