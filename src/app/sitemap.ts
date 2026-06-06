import type { MetadataRoute } from 'next';
import { site, heroes } from '@/lib/data';
import { getLearnSlugs } from '@/lib/learn';
import { ROLES } from '@/types/hero';
import { localePath, type Locale } from '@/lib/i18n';

function sitemapEntry(
  base: string,
  path: string,
  opts: {
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }
) {
  return {
    url: `${base}${path}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  };
}

function localizedEntries(
  base: string,
  logicalPath: string,
  opts: {
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
    zhPriorityScale?: number;
  }
) {
  const zhScale = opts.zhPriorityScale ?? 0.98;
  return (['en', 'zh-TW'] as Locale[]).map((locale) =>
    sitemapEntry(base, localePath(locale, logicalPath), {
      lastModified: opts.lastModified,
      changeFrequency: opts.changeFrequency,
      priority: locale === 'zh-TW' ? opts.priority * zhScale : opts.priority,
    })
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, '');
  const now = new Date();

  const staticPaths = [
    { path: '/', priority: 1 },
    { path: '/heroes', priority: 0.8 },
    { path: '/tier-list', priority: 0.95 },
    { path: '/hero-trends', priority: 0.8 },
    { path: '/best-heroes', priority: 0.8 },
    { path: '/tools', priority: 0.8 },
    { path: '/tools/build-generator', priority: 0.75 },
    { path: '/tools/counter-picker', priority: 0.75 },
    { path: '/learn', priority: 0.72 },
    { path: '/about', priority: 0.55 },
    { path: '/privacy', priority: 0.5 },
  ];

  const staticRoutes = staticPaths.flatMap(({ path, priority }) =>
    localizedEntries(base, path, {
      lastModified: now,
      changeFrequency: 'weekly',
      priority: path === '/' ? priority : priority,
      zhPriorityScale: path === '/' ? 0.95 : 0.98,
    })
  );

  const heroRoutes = heroes.flatMap((hero) => {
    const lastModified = hero.dataUpdated ? new Date(hero.dataUpdated) : now;
    const priority =
      hero.tier === 'S+' || hero.tier === 'S'
        ? 0.95
        : hero.tier === 'A'
          ? 0.88
          : 0.85;
    return localizedEntries(base, `/hero/${hero.slug}`, {
      lastModified,
      changeFrequency: 'weekly',
      priority,
    });
  });

  const roleRoutes = ROLES.flatMap((role) =>
    localizedEntries(base, `/best-heroes/${role.toLowerCase()}`, {
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    })
  );

  const learnRoutes = getLearnSlugs().flatMap((slug) =>
    localizedEntries(base, `/learn/${slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.72,
    })
  );

  return [...staticRoutes, ...heroRoutes, ...roleRoutes, ...learnRoutes];
}
