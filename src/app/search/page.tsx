import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo';
import { SearchResults } from './SearchResults';

export const metadata = buildMetadata({
  title: 'Search Results',
  description: 'Hero search results',
  path: '/search',
  noindex: true,
});

export default function SearchPage() {
  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold text-white">Search Results</h1>
      <Suspense fallback={<p className="text-gray-400">Loading…</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
