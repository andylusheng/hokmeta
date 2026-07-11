'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/data';
import patchesMeta from '../../data/patches.json';
import { createT, detectLocaleFromPath, localePath } from '@/lib/i18n';
import { isLocaleReadyForPath } from '@/lib/locale-readiness';

export function SiteFooter() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);
  const updated =
    'updated' in patchesMeta && patchesMeta.updated ? patchesMeta.updated : null;

  const footerLinks = [
    { href: localePath(locale, '/heroes'), label: t('nav.heroBuilds') },
    { href: localePath(locale, '/items'), label: t('nav.items') },
    { href: localePath(locale, '/arcana'), label: t('nav.arcana') },
    { href: localePath(locale, '/learn'), label: t('nav.guides') },
    { href: localePath(locale, '/patches'), label: t('nav.patches') },
    { href: localePath(locale, '/about'), label: t('nav.about') },
    { href: localePath(locale, '/privacy'), label: t('nav.privacy') },
  ].filter((item) => isLocaleReadyForPath(locale, item.href));

  return (
    <footer className="mt-12 border-t border-hok-border py-8 text-sm text-gray-500">
      <div className="container-page flex flex-col gap-6">
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-hok-gold">
              {l.label}
            </Link>
          ))}
          <a
            href="/api/heroes.json"
            className="hover:text-hok-gold"
            rel="noopener"
          >
            {t('nav.api')}
          </a>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.author}.
          </p>
          <p className="text-xs text-gray-600">
            {t('footer.stats')}
            {updated ? ` · ${t('footer.synced', { date: updated })}` : ''}.{' '}
            {t('footer.refresh')}
          </p>
        </div>
      </div>
    </footer>
  );
}
