import { notFound } from 'next/navigation';
import { getHeroBySlug, getHeroSlugs } from '@/lib/data';
import { getMetaSeasonLabel } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { CounterPageView } from '@/views/CounterPageView';

export function generateStaticParams() {
  return getHeroSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  const displayName = getHeroDisplayName(hero, 'zh-TW');
  const season = getMetaSeasonLabel('zh-TW');
  return buildMetadata({
    title: defaultTitle(`如何克制 ${displayName} – ${season} 最佳克制英雄`),
    description: `Honor of Kings ${season} 克制 ${displayName} 的最佳英雄與對線思路，數據來自 Camp HOK 國際服。`,
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
