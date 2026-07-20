'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { LearnArticle } from '@/lib/learn';
import { heroes } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { LearnCard } from '@/components/LearnCard';
import { HeroAvatar } from '@/components/HeroAvatar';
import { Breadcrumb } from '@/components/Breadcrumb';

const CATEGORY_ORDER = [
  'Hero Guides',
  'Team Comps',
  'Jungle',
  'Laning',
  'Counter',
  'Teamfight',
  'Beginner',
  'Meta & Data',
] as const;

const ROLE_ORDER = ['Tank', 'Warrior', 'Assassin', 'Mage', 'Marksman', 'Support'] as const;

const FEATURED_INTENTS = [
  {
    key: 'climb',
    href: '/learn/best-solo-queue-heroes',
    articleSlug: 'best-solo-queue-heroes',
  },
  {
    key: 'counter',
    href: '/learn/how-to-counter-assassins',
    articleSlug: 'how-to-counter-assassins',
  },
  {
    key: 'jungle',
    href: '/learn/best-jungle-heroes',
    articleSlug: 'best-jungle-heroes',
  },
  {
    key: 'teamComps',
    href: '/learn/strongest-rank-climb-comps',
    articleSlug: 'strongest-rank-climb-comps',
  },
] as const;

const ROLE_HUBS = [
  { role: 'Marksman', href: '/best-heroes/marksman' },
  { role: 'Assassin', href: '/best-heroes/assassin' },
  { role: 'Mage', href: '/best-heroes/mage' },
  { role: 'Support', href: '/best-heroes/support' },
] as const;

export function LearnIndexView({ locale = 'en', articles }: { locale?: Locale; articles: LearnArticle[] }) {
  const t = createT(locale);
  const allArticles = articles;

  // Separate base articles from hero-specific ones
  const { baseArticles, heroArticles } = useMemo(() => {
    const base: typeof allArticles = [];
    const hero: typeof allArticles = [];
    for (const a of allArticles) {
      if (a.relatedHeroSlug) {
        hero.push(a);
      } else {
        base.push(a);
      }
    }
    return { baseArticles: base, heroArticles: hero };
  }, [allArticles]);

  // Category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredBase = useMemo(() => {
    let list = baseArticles;
    if (activeCategory !== 'all') {
      list = list.filter((a) => a.category === activeCategory);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [baseArticles, activeCategory, search]);

  // Group hero articles by hero slug: each hero has up to 3 article types
  const heroGroups = useMemo(() => {
    const map = new Map<
      string,
      {
        hero: (typeof heroes)[number];
        guide?: string;
        counters?: string;
        weaknesses?: string;
      }
    >();
    for (const a of heroArticles) {
      const slug = a.relatedHeroSlug;
      if (!slug) continue;
      const hero = heroes.find((h) => h.slug === slug);
      if (!hero) continue;
      if (!map.has(slug)) {
        map.set(slug, { hero });
      }
      const entry = map.get(slug)!;
      if (a.slug.endsWith('-guide')) {
        entry.guide = a.slug;
      } else if (a.slug.includes('how-to-counter')) {
        entry.counters = a.slug;
      } else if (a.slug.endsWith('-weaknesses')) {
        entry.weaknesses = a.slug;
      }
    }
    return Array.from(map.values());
  }, [heroArticles]);

  const roleLabel = (role: string): string => t(`roles.${role}`) || role;

  const heroGroupsByRole = useMemo(() => {
    const map = new Map<string, typeof heroGroups>();
    for (const role of ROLE_ORDER) {
      map.set(role, []);
    }
    for (const g of heroGroups) {
      const role = g.hero.role;
      if (map.has(role)) {
        map.get(role)!.push(g);
      } else {
        // Fallback: put unknown roles at end
        if (!map.has('Other')) map.set('Other', []);
        map.get('Other')!.push(g);
      }
    }
    // Filter out empty groups
    const result: { role: string; groups: typeof heroGroups }[] = [];
    for (const role of ROLE_ORDER) {
      const groups = map.get(role);
      if (groups && groups.length > 0) {
        result.push({ role, groups });
      }
    }
    if (map.has('Other') && map.get('Other')!.length > 0) {
      result.push({ role: 'Other', groups: map.get('Other')! });
    }
    return result;
  }, [heroGroups]);

  const filteredHeroGroupsByRole = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return heroGroupsByRole;
    return heroGroupsByRole
      .map(({ role, groups }) => ({
        role,
        groups: groups.filter((g) => {
          const name = getHeroDisplayName(g.hero, locale).toLowerCase();
          return name.includes(q);
        }),
      }))
      .filter(({ groups }) => groups.length > 0);
  }, [heroGroupsByRole, search, locale]);

  // Count base articles per category
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of CATEGORY_ORDER) {
      counts[c] = baseArticles.filter((a) => a.category === c).length;
    }
    return counts;
  }, [baseArticles]);

  const categoryLabel = (cat: string): string => {
    if (cat === 'all') return t('learn.allCategories');
    const key = `learn.categories.${cat}`;
    return t(key);
  };

  const heroArticleLabel = (type: 'guide' | 'counters' | 'weaknesses'): string => {
    if (locale === 'zh-TW') {
      return type === 'guide' ? '攻略' : type === 'counters' ? '克制' : '弱點';
    }
    if (locale === 'id') {
      return type === 'guide' ? 'Panduan' : type === 'counters' ? 'Counter' : 'Kelemahan';
    }
    if (locale === 'fil') {
      return type === 'guide' ? 'Gabay' : type === 'counters' ? 'Counter' : 'Kahinaan';
    }
    return type === 'guide' ? 'Guide' : type === 'counters' ? 'Counters' : 'Weaknesses';
  };

  const articleBySlug = useMemo(() => {
    const map = new Map<string, (typeof allArticles)[number]>();
    for (const article of allArticles) {
      map.set(article.slug, article);
    }
    return map;
  }, [allArticles]);

  const featuredIntentCards = FEATURED_INTENTS.map((intent) => ({
    ...intent,
    article: articleBySlug.get(intent.articleSlug),
  }));

  return (
    <div className="container-wide">
      {/* Schema handled server-side in page.tsx if needed — client view skips it */}

      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('learn.title') },
        ]}
      />

      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
        {t('learn.title')}
      </h1>
      <p className="mb-6 max-w-3xl text-gray-400">{t('learn.subtitle')}</p>

      <section className="mb-8 rounded-xl border border-hok-gold/30 bg-gradient-to-br from-hok-card to-hok-dark/80 p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
              {t('learn.intentLabel')}
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              {t('learn.intentTitle')}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">
              {t('learn.intentDesc')}
            </p>
          </div>
          <Link
            href={localePath(locale, '/tools/counter-picker')}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-hok-gold/40 bg-hok-gold/10 px-4 py-2 text-sm font-semibold text-hok-gold hover:border-hok-gold hover:bg-hok-gold/15"
          >
            {t('learn.counterToolCta')}
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {featuredIntentCards.map(({ key, href, article }) => (
            <Link
              key={key}
              href={localePath(locale, href)}
              className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4 transition hover:border-hok-gold/50"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
                {t(`learn.intent.${key}.label`)}
              </p>
              <h3 className="mt-2 text-sm font-semibold leading-snug text-white">
                {t(`learn.intent.${key}.title`)}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                {article?.description || t(`learn.intent.${key}.desc`)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-hok-border bg-hok-card/40 p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{t('learn.findByRoleTitle')}</h2>
              <p className="text-sm text-gray-500">{t('learn.findByRoleDesc')}</p>
            </div>
            <Link
              href={localePath(locale, '/best-heroes')}
              className="text-sm font-semibold text-hok-gold hover:underline"
            >
              {t('learn.allBestHeroes')}
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {ROLE_HUBS.map(({ role, href }) => (
              <Link
                key={role}
                href={localePath(locale, href)}
                className="rounded-lg border border-hok-border/70 bg-hok-dark/40 px-3 py-2 text-sm text-gray-300 hover:border-hok-gold/50 hover:text-hok-gold"
              >
                {t('learn.bestRoleGuide', { role: roleLabel(role) })}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-hok-border bg-hok-card/40 p-4">
          <h2 className="text-lg font-bold text-white">{t('learn.heroLookupTitle')}</h2>
          <p className="mt-1 text-sm text-gray-500">{t('learn.heroLookupDesc')}</p>
          <p className="mt-3 text-xs text-gray-600">↓ {t('learn.heroLookupHint')}</p>
        </div>
      </section>

      {/* ════ Category Pills ════ */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            activeCategory === 'all'
              ? 'bg-hok-gold text-black'
              : 'border border-hok-border text-gray-400 hover:border-hok-gold/40 hover:text-white'
          }`}
        >
          {t('learn.allCategories')}
        </button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-hok-gold text-black'
                : 'border border-hok-border text-gray-400 hover:border-hok-gold/40 hover:text-white'
            }`}
          >
            {categoryLabel(cat)}
            {catCounts[cat] > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({catCounts[cat]})</span>
            )}
          </button>
        ))}
      </div>

      {/* ════ Unified Search ════ */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('learn.searchPlaceholder')}
          className="w-full max-w-md rounded-lg border border-hok-border bg-hok-card px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-hok-gold/60 focus:outline-none"
        />
      </div>

      {/* ════ Base Guide Grid ════ */}
      {filteredBase.length > 0 ? (
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBase.map((a) => (
              <LearnCard
                key={a.slug}
                title={a.title}
                description={a.description}
                href={localePath(locale, `/learn/${a.slug}`)}
                badge={a.badge}
                category={
                  a.category ? categoryLabel(a.category) : undefined
                }
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="mb-12 py-12 text-center text-gray-500">
          {t('learn.noResults')}
        </p>
      )}

      {/* ════ Hero Guides Section ════ */}
      <section className="mb-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {t('learn.heroGuides')}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t('learn.heroGuidesDesc', {
                count: heroArticles.length,
                heroCount: heroes.length,
              })}
            </p>
          </div>
        </div>

        {filteredHeroGroupsByRole.length > 0 ? (
          <div className="space-y-6">
            {filteredHeroGroupsByRole.map(({ role, groups }) => (
              <div key={role}>
                <h3 className="mb-2 font-display text-lg font-semibold text-gray-300">
                  {roleLabel(role)}
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({groups.length})
                  </span>
                </h3>
                <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {groups.map((g) => {
                    const name = getHeroDisplayName(g.hero, locale);
                    const hasAny = g.guide || g.counters || g.weaknesses;
                    if (!hasAny) return null;
                    return (
                      <div
                        key={g.hero.slug}
                        className="flex flex-col gap-2 rounded-lg border border-hok-border/60 bg-hok-card/60 px-3 py-2 transition hover:border-hok-gold/30 sm:flex-row sm:items-center"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Link
                            href={localePath(locale, `/hero/${g.hero.slug}`)}
                            className="shrink-0"
                          >
                            <HeroAvatar hero={g.hero} size={36} />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link
                              href={localePath(locale, `/hero/${g.hero.slug}`)}
                              className="block truncate text-sm font-semibold text-white hover:text-hok-gold"
                            >
                              {name}
                            </Link>
                            <p className="truncate text-xs text-gray-600">
                              {roleLabel(g.hero.role)}
                            {g.hero.lane ? ` · ${g.hero.lane}` : ''}
                          </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:ml-auto sm:shrink-0">
                          {g.guide && (
                            <Link
                              href={localePath(locale, `/learn/${g.guide}`)}
                              className="rounded-full border border-hok-gold/30 bg-hok-gold/10 px-2 py-0.5 text-[10px] font-medium text-hok-gold transition hover:bg-hok-gold/20"
                            >
                              {heroArticleLabel('guide')}
                            </Link>
                          )}
                          {g.counters && (
                            <Link
                              href={localePath(locale, `/learn/${g.counters}`)}
                              className="rounded-full border border-hok-border bg-hok-card px-2 py-0.5 text-[10px] font-medium text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                            >
                              {heroArticleLabel('counters')}
                            </Link>
                          )}
                          {g.weaknesses && (
                            <Link
                              href={localePath(locale, `/learn/${g.weaknesses}`)}
                              className="rounded-full border border-hok-border bg-hok-card px-2 py-0.5 text-[10px] font-medium text-gray-400 transition hover:border-amber-500/40 hover:text-amber-400"
                            >
                              {heroArticleLabel('weaknesses')}
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">
            {t('learn.noResults')}
          </p>
        )}
      </section>
    </div>
  );
}
