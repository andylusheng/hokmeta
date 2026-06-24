'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getLearnArticles } from '@/lib/learn';
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

export function LearnIndexView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const allArticles = getLearnArticles(locale);

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
  const [baseSearch, setBaseSearch] = useState('');
  const [heroSearch, setHeroSearch] = useState('');

  const filteredBase = useMemo(() => {
    let list = baseArticles;
    if (activeCategory !== 'all') {
      list = list.filter((a) => a.category === activeCategory);
    }
    const q = baseSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [baseArticles, activeCategory, baseSearch]);

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
    const q = heroSearch.trim().toLowerCase();
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
  }, [heroGroupsByRole, heroSearch, locale]);

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
      <p className="mb-8 max-w-2xl text-gray-400">{t('learn.subtitle')}</p>

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

      {/* ════ Search for base guides ════ */}
      <div className="mb-8">
        <input
          type="text"
          value={baseSearch}
          onChange={(e) => setBaseSearch(e.target.value)}
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
          <input
            type="text"
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
            placeholder={t('learn.heroSearchPlaceholder')}
            className="w-full rounded-lg border border-hok-border bg-hok-card px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-hok-gold/60 focus:outline-none sm:w-64"
          />
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
                        className="flex items-center gap-3 rounded-lg border border-hok-border/60 bg-hok-card/60 px-3 py-2 transition hover:border-hok-gold/30"
                      >
                        <Link
                          href={localePath(locale, `/hero/${g.hero.slug}`)}
                          className="shrink-0"
                        >
                          <HeroAvatar hero={g.hero} size={36} />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Link
                              href={localePath(locale, `/hero/${g.hero.slug}`)}
                              className="truncate text-sm font-semibold text-white hover:text-hok-gold"
                            >
                              {name}
                            </Link>
                            <div className="hidden shrink-0 gap-1 sm:flex">
                              {g.guide && (
                                <Link
                                  href={localePath(locale, `/learn/${g.guide}`)}
                                  className="rounded-full border border-hok-gold/30 bg-hok-gold/10 px-2 py-0.5 text-[10px] font-medium text-hok-gold transition hover:bg-hok-gold/20"
                                >
                                  {locale === 'zh-TW' ? '攻略' : 'Guide'}
                                </Link>
                              )}
                              {g.counters && (
                                <Link
                                  href={localePath(locale, `/learn/${g.counters}`)}
                                  className="rounded-full border border-hok-border bg-hok-card px-2 py-0.5 text-[10px] font-medium text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                                >
                                  {locale === 'zh-TW' ? '克制' : 'Counters'}
                                </Link>
                              )}
                              {g.weaknesses && (
                                <Link
                                  href={localePath(locale, `/learn/${g.weaknesses}`)}
                                  className="rounded-full border border-hok-border bg-hok-card px-2 py-0.5 text-[10px] font-medium text-gray-400 transition hover:border-amber-500/40 hover:text-amber-400"
                                >
                                  {locale === 'zh-TW' ? '弱點' : 'Weaknesses'}
                                </Link>
                              )}
                            </div>
                          </div>
                          <p className="truncate text-xs text-gray-600">
                            {g.hero.role}
                            {g.hero.lane ? ` · ${g.hero.lane}` : ''}
                          </p>
                        </div>
                        {/* Mobile: pills below */}
                        <div className="flex shrink-0 gap-1 sm:hidden">
                          {g.guide && (
                            <Link
                              href={localePath(locale, `/learn/${g.guide}`)}
                              className="rounded-full border border-hok-gold/30 bg-hok-gold/10 px-2 py-0.5 text-[10px] font-medium text-hok-gold"
                            >
                              {locale === 'zh-TW' ? '攻略' : 'Guide'}
                            </Link>
                          )}
                          {g.counters && (
                            <Link
                              href={localePath(locale, `/learn/${g.counters}`)}
                              className="rounded-full border border-hok-border bg-hok-card px-2 py-0.5 text-[10px] font-medium text-gray-400"
                            >
                              {locale === 'zh-TW' ? '克制' : 'Counters'}
                            </Link>
                          )}
                          {g.weaknesses && (
                            <Link
                              href={localePath(locale, `/learn/${g.weaknesses}`)}
                              className="rounded-full border border-hok-border bg-hok-card px-2 py-0.5 text-[10px] font-medium text-gray-400"
                            >
                              {locale === 'zh-TW' ? '弱點' : 'Weaknesses'}
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
