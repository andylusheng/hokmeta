import Link from 'next/link';
import { buildMetadata, defaultTitle } from '@/lib/seo';

export const metadata = buildMetadata({
  title: defaultTitle('Page Not Found'),
  description: 'The page you requested was not found on HOK Meta.',
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="container-page py-16 text-center">
      <h1 className="mb-2 text-4xl font-bold text-white">404</h1>
      <p className="mb-8 text-gray-400">This page could not be found.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link
          href="/heroes/"
          className="rounded-md border border-hok-border px-4 py-2 text-sm font-semibold text-white hover:border-hok-gold"
        >
          All Heroes
        </Link>
      </div>
    </div>
  );
}
