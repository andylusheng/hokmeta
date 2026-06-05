import type { Metadata } from 'next';
import { site } from '@/lib/data';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  keywords?: string[];
}

export function getSiteBase(): string {
  return site.domain.replace(/\/$/, '');
}

export function canonicalUrl(path: string): string {
  const base = getSiteBase();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized === '/' ? '' : normalized}`;
}

/** Absolute URL for JSON-LD ItemList entries */
export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const withSlash = p.endsWith('/') ? p : `${p}/`;
  return `${getSiteBase()}${withSlash === '//' ? '/' : withSlash}`;
}

export function buildMetadata(input: SeoInput): Metadata {
  const url = canonicalUrl(input.path);
  const og = input.ogImage ?? site.ogImage;
  const fullOg = og.startsWith('http') ? og : `${getSiteBase()}${og}`;

  const google = site.googleSiteVerification?.trim();
  const bing = site.bingSiteVerification?.trim();
  const verification =
    google || bing
      ? {
          ...(google ? { google } : {}),
          ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
        }
      : undefined;

  return {
    metadataBase: new URL(getSiteBase()),
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    ...(verification ? { verification } : {}),
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: input.type ?? 'website',
      images: [{ url: fullOg, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [fullOg],
    },
  };
}

export function defaultTitle(page: string): string {
  return `${page} | ${site.name}`;
}

export const authorMeta = {
  name: site.author,
  datePublished: site.datePublished,
  dateModified: site.dateModified,
};
