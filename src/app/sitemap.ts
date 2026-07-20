import type { MetadataRoute } from 'next';
import { site, heroes, items, getLatestHeroDataDate } from '@/lib/data';
import { getLearnArticle, getLearnArticles, slugToDate } from '@/lib/learn';
import { getComparePairs } from '@/lib/hero-compare';
import { ROLES } from '@/types/hero';
import { LOCALES, localePath } from '@/lib/i18n';
import { isLocaleReadyForPath } from '@/lib/locale-readiness';

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
  const secondaryScale = 0.94;
  return LOCALES.filter((locale) => isLocaleReadyForPath(locale, logicalPath)).map(
    (locale) =>
      sitemapEntry(base, localePath(locale, logicalPath), {
        lastModified: opts.lastModified,
        changeFrequency: opts.changeFrequency,
        priority:
          locale === 'zh-TW'
            ? opts.priority * zhScale
            : locale === 'en'
              ? opts.priority
              : opts.priority * secondaryScale,
      })
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, '');
  const freshness = new Date(getLatestHeroDataDate());

  const staticPaths = [
    { path: '/', priority: 1, changeFrequency: 'daily' as const },
    { path: '/heroes', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/tier-list', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/items', priority: 0.78, changeFrequency: 'weekly' as const },
    { path: '/arcana', priority: 0.72, changeFrequency: 'weekly' as const },
    { path: '/patches', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/hero-trends', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/meta-report', priority: 0.84, changeFrequency: 'daily' as const },
    { path: '/best-heroes', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/tools', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/damage-calculator', priority: 0.82, changeFrequency: 'weekly' as const },
    { path: '/tools/build-compare', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/tools/build-generator', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/tools/counter-picker', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/docs/api', priority: 0.72, changeFrequency: 'weekly' as const },
    { path: '/learn', priority: 0.72, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.55, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const staticRoutes = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    localizedEntries(base, path, {
      lastModified: freshness,
      changeFrequency,
      priority: path === '/' ? priority : priority,
      zhPriorityScale: path === '/' ? 0.95 : 0.98,
    })
  );

  const heroRoutes = heroes.flatMap((hero) => {
    const lastModified = hero.dataUpdated ? new Date(hero.dataUpdated) : freshness;
    const priority =
      hero.tier === 'S+' || hero.tier === 'S'
        ? 0.95
        : hero.tier === 'A'
          ? 0.88
          : 0.85;
    const routes = localizedEntries(base, `/hero/${hero.slug}`, {
      lastModified,
      changeFrequency: 'daily',
      priority,
    });
    routes.push(
      ...localizedEntries(base, `/hero/${hero.slug}/counters`, {
        lastModified,
        changeFrequency: 'daily',
        priority: Math.max(priority * 0.9, 0.68),
      })
    );
    routes.push(
      ...localizedEntries(base, `/tools/damage-calculator/${hero.slug}`, {
        lastModified,
        changeFrequency: 'weekly',
        priority: Math.max(priority * 0.86, 0.72),
      }),
      ...localizedEntries(base, `/tools/build-compare/${hero.slug}`, {
        lastModified,
        changeFrequency: 'weekly',
        priority: Math.max(priority * 0.82, 0.7),
      })
    );
    return routes;
  });

  const itemRoutes = items.flatMap((item) =>
    localizedEntries(base, `/items/${item.id}`, {
      lastModified: freshness,
      changeFrequency: 'monthly',
      priority: 0.62,
    })
  );

  const roleRoutes = ROLES.flatMap((role) =>
    localizedEntries(base, `/best-heroes/${role.toLowerCase()}`, {
      lastModified: freshness,
      changeFrequency: 'daily',
      priority: 0.75,
    })
  );

  const learnRoutes = LOCALES.flatMap((locale) =>
    getLearnArticles(locale)
      .filter((article) => isLocaleReadyForPath(locale, `/learn/${article.slug}`))
      .map((article) =>
        sitemapEntry(base, localePath(locale, `/learn/${article.slug}`), {
          lastModified: new Date(article.lastModified ?? slugToDate(article.slug, freshness)),
          changeFrequency: article.relatedHeroSlug ? 'weekly' : 'monthly',
          priority: article.relatedHeroSlug ? 0.82 : 0.72,
        })
      )
  );

  const compareRoutes = getComparePairs().map((p) =>
    sitemapEntry(base, `/compare/${p.pair}`, {
      lastModified: freshness,
      changeFrequency: 'weekly' as const,
      priority: 0.68,
    })
  );

  return [...staticRoutes, ...heroRoutes, ...itemRoutes, ...roleRoutes, ...learnRoutes, ...compareRoutes];
}
