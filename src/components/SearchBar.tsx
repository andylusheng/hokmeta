'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function SearchBar({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search/?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'w-full max-w-xs' : 'w-full max-w-md'}>
      <label htmlFor="site-search" className="sr-only">
        Search heroes
      </label>
      <div className="flex gap-2">
        <input
          id="site-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search heroes..."
          className="w-full rounded-md border border-hok-border bg-hok-card px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-hok-gold focus:outline-none"
        />
        <button type="submit" className="btn-primary shrink-0 px-3">
          Go
        </button>
      </div>
    </form>
  );
}
