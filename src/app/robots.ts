import type { MetadataRoute } from 'next';
import { site } from '@/lib/data';

export default function robots(): MetadataRoute.Robots {
  const base = site.domain.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search/'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
