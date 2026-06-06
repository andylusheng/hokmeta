'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { createT, detectLocaleFromPath, localePath } from '@/lib/i18n';

export function SearchBar({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const t = createT(locale);
  const [q, setQ] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`${localePath(locale, '/search')}?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'w-full max-w-xs' : 'w-full max-w-md'}>
      <label htmlFor="site-search" className="sr-only">
        {t('search.label')}
      </label>
      <div className="flex gap-2">
        <input
          id="site-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full rounded-md border border-hok-border bg-hok-card px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-hok-gold focus:outline-none"
        />
        <button type="submit" className="btn-primary shrink-0 px-3">
          {t('search.submit')}
        </button>
      </div>
    </form>
  );
}
