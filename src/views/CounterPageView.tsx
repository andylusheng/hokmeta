import Link from 'next/link';
import React from 'react';

import { formatRate, getHeroByName, heroes } from '@/lib/data';
import {
  getCounterDetails,
  getCounterFaqs,
  getCounterList,
  getCounterListByLane,
  getCounterMistakes,
  getCounterWhyBullets,
  getMetaTrend,
  getPlaystyle,
  getRelatedCounters,
} from '@/lib/counter-rationale';
import { createT, getMetaSeasonLabel, localePath, type Locale } from '@/lib/i18n';
import { getLearnArticle } from '@/lib/learn';
import { getCounterRelatedArticle } from '@/lib/learn-hero-links';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import type { Hero } from '@/types/hero';

/* ─── helpers ─── */

function computeStars(tier: string, advantage?: number): number {
  let base = 3;
  if (tier === 'S+') base = 5;
  else if (tier === 'S') base = 4;
  else if (tier === 'A') base = 3;
  else if (tier === 'B') base = 2;
  else base = 1;
  if (advantage !== undefined && advantage > 0) {
    base = Math.min(5, base + Math.round(advantage));
  }
  return base;
}

/** Render 1–5 stars. */
function StarRating({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <span
      className="inline-flex gap-0.5 text-hok-gold"
      aria-label={`${count} out of 5 stars`}
      style={{ fontSize: size }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < count ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

/**
 * Turn hero names inside a text string into clickable Next.js Links.
 * Walks the entire heroes list, looks for English + zh-TW names, replaces them.
 */
function linkifyHeroNames(
  text: string,
  locale: Locale,
): React.ReactNode {
  if (!text) return text;

  // Build a sorted (longest-first) map so "Zhang Fei" is matched before "Zhang"
  const nameMap = new Map<string, { slug: string; name: string }>();
  for (const h of heroes) {
    const en = h.name;
    const zh = h.nameZh;
    nameMap.set(en.toLowerCase(), { slug: h.slug, name: en });
    if (zh) nameMap.set(zh.toLowerCase(), { slug: h.slug, name: zh });
  }

  // Sort by length desc to avoid partial matches
  const sorted = Array.from(nameMap.entries())
    .sort((a, b) => b[0].length - a[0].length);

  // We'll split and reconstruct
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let matched = false;
    for (const [lower, { slug, name }] of sorted) {
      const idx = remaining.toLowerCase().indexOf(lower);
      if (idx === 0) {
        // Check that it's a word boundary before/after
        const beforeOk = parts.length === 0 || /[\s,，、.。!！?？:：(（\-—"「『【［]/.test(remaining.charAt(0) === name.charAt(0) ? '' : ' ');
        const afterChar = remaining.charAt(name.length);
        const afterOk = !afterChar || /[\s,，、.。!！?？:：(（\-—"「『】］)）]/.test(afterChar);

        if (beforeOk && afterOk) {
          parts.push(
            <Link
              key={key++}
              href={localePath(locale, `/hero/${slug}`)}
              className="font-medium text-hok-gold hover:underline"
            >
              {name}
            </Link>,
          );
          remaining = remaining.slice(name.length);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      // Take one char
      parts.push(remaining.charAt(0));
      remaining = remaining.slice(1);
    }
  }

  return <>{parts}</>;
}

/* ─── Counter card (enhanced) ─── */

function EnhancedCounterCard({
  name,
  advantage,
  locale,
}: {
  name: string;
  advantage?: number;
  locale: Locale;
}) {
  const t = createT(locale);
  const counterHero = getHeroByName(name);
  if (!counterHero) {
    return (
      <div className="rounded border border-hok-border bg-hok-dark/40 px-3 py-2">
        <span className="text-sm text-gray-400">{name}</span>
      </div>
    );
  }

  const displayName = getHeroDisplayName(counterHero, locale);
  const stars = computeStars(counterHero.tier, advantage);

  return (
    <Link
      href={localePath(locale, `/hero/${counterHero.slug}/counters`)}
      className="flex flex-col gap-2 rounded border border-hok-border bg-hok-card/50 px-3 py-3 transition hover:border-hok-gold/40"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={counterHero.avatar}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover border border-hok-border"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-white">{displayName}</div>
          <div className="text-xs text-gray-400">
            {translateRole(counterHero.role, locale)} · {counterHero.tier}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <StarRating count={stars} size={12} />
        {advantage !== undefined && advantage > 0 && (
          <span className="rounded-full bg-green-500/15 px-2 py-0.5 font-medium text-green-400">
            {t('counterPage.counterAdvantage', { advantage })}
          </span>
        )}
      </div>
    </Link>
  );
}

/* ─── main view ─── */

export function CounterPageView({ hero, locale = 'en' }: { hero: Hero; locale?: Locale }) {
  const t = createT(locale);
  const displayName = getHeroDisplayName(hero, locale);
  const season = getMetaSeasonLabel(locale);
  const counters = getCounterList(hero);
  const laneCounters = getCounterListByLane(hero);
  const whyBullets = getCounterWhyBullets(hero, locale);
  const mistakes = getCounterMistakes(hero, locale);
  const faqs = getCounterFaqs(hero, locale);
  const related = getRelatedCounters(hero, 6);

  // New data
  const counterDetails = getCounterDetails(hero.slug, locale);
  const metaTrend = getMetaTrend(hero.slug, locale);
  const playstyle = getPlaystyle(hero.slug, locale);
  const updated = hero.dataUpdated || '—';

  const breadcrumbs = [
    { name: t('common.home'), path: localePath(locale, '/') },
    { name: t('common.allHeroes'), path: localePath(locale, '/heroes') },
    { name: displayName, path: localePath(locale, `/hero/${hero.slug}`) },
    {
      name: t('counterPage.breadcrumb'),
      path: localePath(locale, `/hero/${hero.slug}/counters`),
    },
  ];

  // Build an empty advantage map (bestCounter feature removed).
  const advantageMap = new Map<string, number>();

  // Build detail map: counter name → CounterDetail
  const detailMap = new Map(counterDetails.map((d) => [d.hero, d]));

  // FAQ types by order in getCounterFaqs()
  const faqTypes = ['who', 'howToLane', 'ultimate', 'items', 'season'] as const;
  const faqArticleLinks = faqs.map((faq, i) => ({
    faq,
    link: i < faqTypes.length
      ? getCounterRelatedArticle(faqTypes[i], hero.slug, locale)
      : undefined,
  }));

  return (
    <div className="container-wide">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqPageSchema(faqs)} />

      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.allHeroes'), href: localePath(locale, '/heroes') },
          { label: displayName, href: localePath(locale, `/hero/${hero.slug}`) },
          { label: t('counterPage.breadcrumb') },
        ]}
      />

      {/* ── Hero header ── */}
      <div className="mb-6 flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.avatar}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">
            {t('counterPage.title', { name: displayName })}
          </h1>
          <p className="text-sm text-gray-400">
            {t('counterPage.subtitle', { season })}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {t('counterPage.dataNote', { date: updated, source: t('counterPage.source') })}
          </p>
        </div>
      </div>

      {/* ── Snapshot badges ── */}
      <div className="mb-6 flex flex-wrap gap-3 text-sm">
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          {t('counterPage.snapshotTier', { tier: hero.tier })}
        </span>
        {hero.lane && (
          <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5 text-gray-300">
            {translateLane(hero.lane, locale)}
          </span>
        )}
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          WR: <strong className="text-white">{formatRate(hero.winRate)}</strong>
        </span>
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          Pick: <strong className="text-white">{formatRate(hero.pickRate)}</strong>
        </span>
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          Ban: <strong className="text-white">{formatRate(hero.banRate)}</strong>
        </span>
      </div>


      {/* ── P0.5: Playstyle & Damage Source ── */}
      {playstyle && (
        <section className="mb-8 rounded-xl border border-green-500/25 bg-green-500/5 p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-300">
              hokmeta
            </span>
            <span className="text-xs text-gray-500">{t('counterPage.hokmetaAnalysisTitle')}</span>
          </div>
          <h2 className="mb-3 text-lg font-semibold text-hok-gold flex items-center gap-2">
            <span>⚔️</span>
            {t('counterPage.playstyleTitle', { name: displayName })}
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 mb-3">
            {linkifyHeroNames(playstyle.summary, locale)}
          </p>
          <ul className="space-y-1.5 text-sm leading-relaxed text-gray-400">
            {playstyle.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-hok-gold mt-0.5 shrink-0">▸</span>
                <span>{linkifyHeroNames(point, locale)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="space-y-8">
          {/* ── Counter list blocked by lane ── */}
          {counters.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-300">
                  Camp HOK
                </span>
                <h2 className="text-lg font-semibold text-red-400">
                  {t('counterPage.bestCounters', { name: displayName })}
                </h2>
              </div>
              <p className="mb-3 text-xs italic text-gray-500">
                {t('counterPage.bestCounterBaseData')}
              </p>

              {/* Same-lane counters — most impactful */}
              {laneCounters.sameLane.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-hok-gold">
                      {t('counterPage.sameLaneCounters')}
                    </h3>
                    <span className="text-[10px] text-gray-600">{t('counterPage.sameLaneHint')}</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {laneCounters.sameLane.map((name) => (
                      <EnhancedCounterCard
                        key={name}
                        name={name}
                        advantage={advantageMap.get(name.toLowerCase())}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other-lane counters — secondary */}
              {laneCounters.otherLane.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-400">
                      {t('counterPage.otherLaneCounters')}
                    </h3>
                    <span className="text-[10px] text-gray-600">{t('counterPage.otherLaneHint')}</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {laneCounters.otherLane.map((name) => (
                      <EnhancedCounterCard
                        key={name}
                        name={name}
                        advantage={advantageMap.get(name.toLowerCase())}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── P1: Why each counter works (expanded, per-hero details) ── */}
          {counterDetails.length > 0 && (
            <section className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-300">
                  hokmeta
                </span>
                <span className="text-xs text-gray-500">{t('counterPage.hokmetaAnalysisTitle')}</span>
              </div>
              <h2 className="mb-4 text-lg font-semibold text-hok-gold">
                {t('counterPage.whyTitle')}
              </h2>
              <div className="space-y-4">
                {counterDetails.map((detail) => {
                  const detailHero = getHeroByName(detail.hero);
                  if (!detailHero) return null;
                  const detailDisplayName = getHeroDisplayName(detailHero, locale);
                  return (
                    <div
                      key={detail.hero}
                      className="flex gap-3 rounded-lg border border-hok-border/60 bg-hok-dark/30 p-3"
                    >
                      <Link
                        href={localePath(locale, `/hero/${detailHero.slug}`)}
                        className="flex-shrink-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={detailHero.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover border border-hok-border hover:border-hok-gold/60 transition"
                          loading="lazy"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-white mb-1">
                          <Link
                            href={localePath(locale, `/hero/${detailHero.slug}`)}
                            className="hover:text-hok-gold transition"
                          >
                            {t('counterPage.counterDetailTitle', {
                              counter: detailDisplayName,
                              name: displayName,
                            })}
                          </Link>
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-300">
                          {linkifyHeroNames(detail.reason, locale)}
                        </p>
                        {detail.tags && detail.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {detail.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-hok-gold/10 px-2 py-0.5 text-xs text-hok-gold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Fallback: generic why bullets (only when no counterDetails) ── */}
          {counterDetails.length === 0 && whyBullets.length > 0 && (
            <section className="rounded-xl border border-hok-border bg-hok-card/30 p-5">
              <h2 className="mb-3 text-lg font-semibold text-hok-gold">
                {t('counterPage.whyTitle')}
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
                {whyBullets.map((line) => (
                  <li key={line}>• {linkifyHeroNames(line, locale)}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ── P1: Meta trend analysis ── */}
          {metaTrend ? (
            <section className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-300">
                  hokmeta
                </span>
                <span className="text-xs text-gray-500">{t('counterPage.hokmetaAnalysisTitle')}</span>
              </div>
              <h2 className="mb-3 text-lg font-semibold text-hok-gold flex items-center gap-2">
                <span>📊</span>
                {t('counterPage.metaTrendTitle', { name: displayName })}
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 mb-3">
                {linkifyHeroNames(metaTrend.summary, locale)}
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
                {metaTrend.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-hok-gold mt-0.5 shrink-0">{idx + 1}.</span>
                    <span>{linkifyHeroNames(reason, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="rounded-xl border border-hok-border/50 bg-hok-card/20 p-5">
              <h2 className="mb-2 text-lg font-semibold text-gray-500 flex items-center gap-2">
                <span>📊</span>
                {t('counterPage.metaTrendTitle', { name: displayName })}
              </h2>
              <p className="text-sm text-gray-500">
                {t('counterPage.metaTrendNoData', { name: displayName })}
              </p>
            </section>
          )}

          {/* ── Common mistakes ── */}
          {mistakes.length > 0 && (
            <section className="rounded-xl border border-hok-border bg-hok-card/30 p-5">
              <h2 className="mb-3 text-lg font-semibold text-white">
                {t('counterPage.mistakesTitle')}
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
                {mistakes.map((line) => (
                  <li key={line}>• {linkifyHeroNames(line, locale)}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ── FAQ (condensed) ── */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              {t('counterPage.faqTitle')}
            </h2>
            <div className="space-y-3">
              {faqArticleLinks.map(({ faq, link }) => (
                <div
                  key={faq.question}
                  className="rounded border border-hok-border bg-hok-card/30 p-4"
                >
                  <h3 className="mb-1 text-sm font-semibold text-hok-gold">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {linkifyHeroNames(faq.answer, locale)}
                  </p>
                  {link && (
                    <Link
                      href={link.url}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-hok-gold hover:underline"
                    >
                      {link.title} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Sidebar: Related counter guides (P1) ── */}
        <aside className="space-y-4">
          <div className="rounded border border-hok-border bg-hok-card/30 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">
              {t('counterPage.relatedCounterTitle')}
            </h3>
            <ul className="space-y-2">
              {related.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={localePath(locale, `/hero/${h.slug}/counters`)}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-hok-gold transition"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={h.avatar}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span>{t('counterPage.viewCounterGuide', { name: getHeroDisplayName(h, locale) })}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Related Learn Articles ── */}
          <div className="rounded border border-hok-border bg-hok-card/30 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">
              {locale === 'zh-TW' ? '相關攻略' : 'Related Guides'}
            </h3>
            <ul className="space-y-2">
              {(() => {
                const slugs = [
                  `how-to-counter-${hero.slug}`,
                  `${hero.slug}-guide`,
                  `${hero.slug}-weaknesses`,
                ];
                return slugs.map((slug) => {
                  const article = getLearnArticle(slug, locale);
                  if (!article) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={localePath(locale, `/learn/${slug}`)}
                        className="block text-sm text-gray-300 hover:text-hok-gold transition"
                      >
                        {article.title} →
                      </Link>
                    </li>
                  );
                });
              })()}
            </ul>
          </div>

          <div className="rounded border border-hok-border bg-hok-card/30 p-4">
            <Link
              href={localePath(locale, `/hero/${hero.slug}`)}
              className="mb-2 block text-sm text-hok-gold hover:underline"
            >
              ← {t('counterPage.overviewLink', { name: displayName })}
            </Link>
            <Link
              href={localePath(locale, '/tools/counter-picker')}
              className="block text-sm text-hok-gold hover:underline"
            >
              {t('counterPage.counterPickerLink')} →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
