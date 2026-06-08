// src/app/zh-TW/hero/[slug]/counters/page.tsx
import { notFound } from 'next/navigation';
import { getHeroBySlug, getHeroSlugs } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { getHeroDisplayName } from '@/lib/locale-names';
import { CounterPageView } from '@/views/CounterPageView';

export function generateStaticParams() {
  return getHeroSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  const displayName = getHeroDisplayName(hero, 'zh-TW');
  return buildMetadata({
    title: defaultTitle(`如何克制 ${displayName} – S14 最佳克制英雄`),
    description: `在傳說對決 S14 賽季中，哪些英雄最克制 ${displayName}？基於真實對局數據的勝率分析和克制策略。`,
    path: `/hero/${params.slug}/counters`,
    locale: 'zh-TW',
    ogImage: hero.avatar,
  });
}

export default function ZhTWCounterPage({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  return <CounterPageView hero={hero} locale="zh-TW" />;
}