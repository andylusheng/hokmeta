import type { Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n';
import { getLearnArticle } from '@/lib/learn';
import { isLocaleReadyForPath } from '@/lib/locale-readiness';

export interface ArticleLink {
  url: string;
  title: string;
}

/**
 * FAQ id → hero article slug mapping for hero pages.
 * Returns the article link (url + title), or undefined if no article exists.
 */
export function getRelatedArticleForFaq(
  faqId: string,
  heroSlug: string,
  locale: Locale = 'en'
): ArticleLink | undefined {
  if (!isLocaleReadyForPath(locale, '/learn')) return undefined;
  const slug = faqToHeroSlug(faqId, heroSlug);
  if (!slug) return undefined;
  const article = getLearnArticle(slug, locale);
  if (!article) return undefined;
  return {
    url: localePath(locale, `/learn/${slug}`),
    title: article.title,
  };
}

/**
 * Counter page FAQ type → hero article slug mapping.
 * Returns the article link (url + title), or undefined if no article exists.
 */
export function getCounterRelatedArticle(
  faqType: string,
  heroSlug: string,
  locale: Locale = 'en'
): ArticleLink | undefined {
  if (!isLocaleReadyForPath(locale, '/learn')) return undefined;
  const slug = counterFaqToSlug(faqType, heroSlug);
  if (!slug) return undefined;
  const article = getLearnArticle(slug, locale);
  if (!article) return undefined;
  return {
    url: localePath(locale, `/learn/${slug}`),
    title: article.title,
  };
}

function faqToHeroSlug(faqId: string, heroSlug: string): string | undefined {
  const map: Record<string, (s: string) => string> = {
    'faq-counter': (s) => `how-to-counter-${s}`,
    'faq-best-build': (s) => `${s}-guide`,
    'faq-arcana': (s) => `${s}-guide`,
    'faq-good-season': (s) => `${s}-guide`,
    'faq-strong-into': (s) => `${s}-weaknesses`,
    'faq-high-rank': (s) => `${s}-weaknesses`,
    'faq-ban': (s) => `${s}-weaknesses`,
    'faq-lane': (s) => `${s}-guide`,
    'faq-vs-peer': (s) => `${s}-guide`,
  };
  const fn = map[faqId];
  if (!fn) return undefined;
  return fn(heroSlug);
}

function counterFaqToSlug(faqType: string, heroSlug: string): string | undefined {
  const map: Record<string, (s: string) => string> = {
    who: (s) => `how-to-counter-${s}`,
    howToLane: (s) => `${s}-guide`,
    ultimate: (s) => `${s}-weaknesses`,
    items: (s) => `${s}-guide`,
    season: (s) => `${s}-weaknesses`,
  };
  const fn = map[faqType];
  if (!fn) return undefined;
  return fn(heroSlug);
}
