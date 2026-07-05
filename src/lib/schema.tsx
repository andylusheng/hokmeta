import { canonicalUrl } from '@/lib/seo';
import { site } from '@/lib/data';
import { formatRate } from '@/lib/data';
import type { Hero } from '@/types/hero';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function articleSchema(title: string, path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: site.author },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.domain,
    },
    datePublished: site.datePublished,
    dateModified: site.dateModified,
    mainEntityOfPage: canonicalUrl(path),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.domain,
    description: site.description,
    publisher: { '@type': 'Organization', name: site.author },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.domain.replace(/\/$/, '')}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webApplicationSchema(input: {
  name: string;
  path: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  keywords?: string[];
}) {
  const url = canonicalUrl(input.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: input.name,
    url,
    description: input.description,
    applicationCategory: input.applicationCategory ?? 'GameApplication',
    operatingSystem: input.operatingSystem ?? 'Web',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: site.author,
      url: site.domain,
    },
    ...(input.keywords?.length ? { keywords: input.keywords.join(', ') } : {}),
  };
}

export function heroArticleSchema(hero: Hero, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${hero.name} Build, Items, Arcana & Counters`,
    description: `${hero.name} ${hero.role} — Tier ${hero.tier}. Best build, core items, arcana, counters, and meta analysis.`,
    author: { '@type': 'Organization', name: site.author },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.domain,
    },
    datePublished: site.datePublished,
    dateModified: hero.dataUpdated ?? site.dateModified,
    mainEntityOfPage: canonicalUrl(path),
    image: hero.avatar,
  };
}

function property(name: string, value: string) {
  return { '@type': 'PropertyValue', name, value };
}

/**
 * VideoGame + character stats + build/arcana ItemLists for hero pages.
 * Targets Google rich results for game guides.
 */
export function heroGameSchema(hero: Hero, path: string) {
  const pageUrl = canonicalUrl(path);
  const buildNames = hero.build
    .map((b) => b.name)
    .filter((n) => n && n !== 'Data unavailable');
  const arcanaNames = (hero.arcana ?? []).filter(
    (n) => n && !n.toLowerCase().includes('unavailable')
  );
  const spells = (hero.spells ?? []).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoGame',
        '@id': `${pageUrl}#hok-game`,
        name: 'Honor of Kings',
        alternateName: ['HOK', 'Honor of Kings Global'],
        applicationCategory: 'Game',
        operatingSystem: 'Android, iOS',
        gamePlatform: 'Mobile',
        url: site.domain,
        character: { '@id': `${pageUrl}#hero-character` },
      },
      {
        '@type': 'Thing',
        '@id': `${pageUrl}#hero-character`,
        name: hero.name,
        url: pageUrl,
        image: hero.avatar,
        description: `${hero.name} is a ${hero.role} in Honor of Kings Global ranked meta.`,
        additionalProperty: [
          property('Role', hero.role),
          property('Tier', hero.tier),
          property('Difficulty', hero.difficulty),
          property('Win Rate', formatRate(hero.winRate)),
          property('Pick Rate', formatRate(hero.pickRate)),
          property('Ban Rate', formatRate(hero.banRate)),
          ...(hero.lane ? [property('Lane', hero.lane)] : []),
        ],
      },
      ...(buildNames.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#build`,
              name: `${hero.name} recommended item build`,
              numberOfItems: buildNames.length,
              itemListElement: buildNames.map((name, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name,
              })),
            },
          ]
        : []),
      ...(arcanaNames.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#arcana`,
              name: `${hero.name} arcana setup`,
              numberOfItems: arcanaNames.length,
              itemListElement: arcanaNames.map((name, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name,
              })),
            },
          ]
        : []),
      ...(spells.length
        ? [
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#spells`,
              name: `${hero.name} battle spells`,
              itemListElement: spells.map((name, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name,
              })),
            },
          ]
        : []),
    ],
  };
}

/** @deprecated Use heroGameSchema */
export function videoGameSchema(hero: Hero) {
  return heroGameSchema(hero, `/hero/${hero.slug}`);
}
