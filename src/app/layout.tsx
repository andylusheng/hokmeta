import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/data';
import { JsonLd, webSiteSchema } from '@/lib/schema';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { LocaleDocument } from '@/components/LocaleDocument';
import { SkipToContent } from '@/components/SkipToContent';

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — Honor of Kings Meta, Builds & Tier List`,
    description: site.description,
    path: '/',
    keywords: [
      'Honor of Kings',
      'HOK tier list',
      'HOK builds',
      'HOK counters',
      'HOK meta',
    ],
  }),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.json',
  other: { 'theme-color': '#0f1419' },
};

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
        <LocaleDocument />
        <GoogleAnalytics />
        <SkipToContent />
        <JsonLd data={orgSchema} />
        <JsonLd data={webSiteSchema()} />
        <SiteHeader />
        <main id="main-content" className="min-h-[70vh] py-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
