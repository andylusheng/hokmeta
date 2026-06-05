import type { MetadataRoute } from 'next';
import { site, heroes, getHeroSlugs } from '@/lib/data';
import { getLearnSlugs } from '@/lib/learn';
import { ROLES } from '@/types/hero';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = [
    '',
    '/heroes',
    '/tier-list',
    '/hero-trends',
    '/best-heroes',
    '/tools',
    '/tools/build-generator',
    '/tools/counter-picker',
    '/learn',
    '/privacy',
    '/about',
  ].map((path) => ({
    url: `${base}${path}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : path === '/tier-list' ? 0.95 : 0.8,
  }));

  const heroRoutes = heroes.map((hero) => ({
    url: `${base}/hero/${hero.slug}/`,
    lastModified: hero.dataUpdated ? new Date(hero.dataUpdated) : now,
    changeFrequency: 'weekly' as const,
    priority:
      hero.tier === 'S+' || hero.tier === 'S'
        ? 0.95
        : hero.tier === 'A'
          ? 0.88
          : 0.85,
  }));

  const roleRoutes = ROLES.map((role) => ({
    url: `${base}/best-heroes/${role.toLowerCase()}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const learnRoutes = getLearnSlugs().map((slug) => ({
    url: `${base}/learn/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));

  return [...staticRoutes, ...heroRoutes, ...roleRoutes, ...learnRoutes];
}
