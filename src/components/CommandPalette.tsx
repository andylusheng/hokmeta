'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { heroes } from '@/lib/data';
import { HeroAvatar } from '@/components/HeroAvatar';
import { createT, detectLocaleFromPath, localePath } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

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
        ⌘K
      </kbd>
    </button>
  );
}

export function CommandPaletteHost() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('hokmeta-open-search', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hokmeta-open-search', onOpen);
    };
  }, []);

  const pages = useMemo(
    () => [
      { label: t('nav.climbPicks'), href: localePath(locale, '/climb-picks') },
      { label: t('nav.tierList'), href: localePath(locale, '/tier-list') },
      { label: t('nav.heroBuilds'), href: localePath(locale, '/heroes') },
      { label: t('nav.tools'), href: localePath(locale, '/tools') },
      { label: t('tools.damageTitle'), href: localePath(locale, '/tools/damage-calculator') },
      { label: t('tools.buildCompareTitle'), href: localePath(locale, '/tools/build-compare') },
      { label: t('nav.items'), href: localePath(locale, '/items') },
      { label: t('nav.arcana'), href: localePath(locale, '/arcana') },
      { label: t('nav.guides'), href: localePath(locale, '/learn') },
      { label: t('nav.patches'), href: localePath(locale, '/patches') },
    ],
    [locale, t]
  );

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      return pages.map((p) => ({ ...p, hero: undefined as (typeof heroes)[0] | undefined }));
    }
    const out: { label: string; href: string; hero?: (typeof heroes)[0] }[] = [];
    for (const h of heroes) {
      const name = getHeroDisplayName(h, locale).toLowerCase();
      if (name.includes(query) || h.slug.includes(query)) {
        out.push({
          label: getHeroDisplayName(h, locale),
          href: localePath(locale, `/hero/${h.slug}`),
          hero: h,
        });
      }
      if (out.length >= 10) break;
    }
    if (!out.length) {
      return pages
        .filter((p) => p.label.toLowerCase().includes(query))
        .map((p) => ({ ...p, hero: undefined }));
    }
    return out;
  }, [q, pages, locale]);

  useEffect(() => setIdx(0), [q]);

  if (!open) return null;

  function navigate(href: string) {
    setOpen(false);
    setQ('');
    router.push(href);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-hok-border bg-hok-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') setIdx((i) => Math.min(i + 1, results.length - 1));
            if (e.key === 'ArrowUp') setIdx((i) => Math.max(i - 1, 0));
            if (e.key === 'Enter' && results[idx]) navigate(results[idx].href);
            if (e.key === 'Escape') setOpen(false);
          }}
          placeholder={t('search.placeholder')}
          className="w-full border-b border-hok-border bg-transparent px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none"
        />
        <ul className="max-h-80 overflow-y-auto py-2">
          {results.map((r, i) => (
            <li key={`${r.href}-${r.label}`}>
              <button
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm ${
                  i === idx ? 'bg-hok-gold/15 text-white' : 'text-gray-300 hover:bg-hok-dark/60'
                }`}
                onClick={() => navigate(r.href)}
              >
                {r.hero && <HeroAvatar hero={r.hero} size={32} />}
                <span className="truncate">{r.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-hok-border px-4 py-2 text-[10px] text-hok-muted">
          ↑↓ {t('search.navigate')} · ↵ {t('search.open')}
        </p>
      </div>
    </div>
  );
}
