import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/data';
import { JsonLd } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Honor of Kings Meta, Builds & Tier List`,
  description: site.description,
  path: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.domain,
    description: site.description,
  };

  return (
    <html lang="en">
      <body className="font-sans">
        <JsonLd data={orgSchema} />
        <SiteHeader />
        <main className="min-h-[70vh] py-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
