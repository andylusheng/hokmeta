import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { CommandPaletteLazyHost } from '@/components/CommandPaletteLazyHost';
import { SiteFooter } from '@/components/SiteFooter';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/data';
import { JsonLd, webSiteSchema } from '@/lib/schema';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { GoogleAdSense } from '@/components/GoogleAdSense';
import { LocaleDocument } from '@/components/LocaleDocument';
import { SkipToContent } from '@/components/SkipToContent';

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — Honor of Kings Meta, Stats & Builds`,
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
      <head>
        <link rel="preconnect" href="https://camp.honorofkings.com" />
        <link rel="preconnect" href="https://game.gtimg.cn" />
        <link rel="preconnect" href="https://image.inews.gtimg.com" />
        <link rel="dns-prefetch" href="https://hokstats.gg" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body className="font-sans">
        <LocaleDocument />
        <GoogleAnalytics />
        <GoogleAdSense />
        <SkipToContent />
        <JsonLd data={orgSchema} />
        <JsonLd data={webSiteSchema()} />
        <SiteHeader />
        <CommandPaletteLazyHost />
        <main id="main-content" className="min-h-[70vh] py-6 sm:py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
