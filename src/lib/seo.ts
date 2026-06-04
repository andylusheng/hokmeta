import type { Metadata } from 'next';
import { site } from '@/lib/data';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

export function canonicalUrl(path: string): string {
  const base = site.domain.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized === '/' ? '' : normalized}`;
}

export function buildMetadata(input: SeoInput): Metadata {
  const url = canonicalUrl(input.path);
  const og = input.ogImage ?? site.ogImage;
  const fullOg = og.startsWith('http') ? og : `${site.domain}${og}`;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
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
