import { canonicalUrl } from '@/lib/seo';
import { site } from '@/lib/data';
import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';

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

export function heroArticleSchema(hero: Hero, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${hero.name} Build & Guide`,
    description: `${hero.name} ${hero.role} — Tier ${hero.tier}. Builds, counters, and meta analysis.`,
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

export function videoGameSchema(hero: Hero) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Honor of Kings',
    character: {
      '@type': 'Thing',
      name: hero.name,
      description: `${hero.name} ${hero.role} — Tier ${hero.tier}. Win rate ${formatRate(hero.winRate)}.`,
    },
  };
}
