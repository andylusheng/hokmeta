import { notFound } from 'next/navigation';
import { getHeroBySlug, getHeroSlugs, site } from '@/lib/data';
import { getMetaSeasonLabel } from '@/lib/i18n';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { CounterPageView } from '@/views/CounterPageView';

export function generateStaticParams() {
  return getHeroSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  const season = getMetaSeasonLabel('en');
  return buildMetadata({
    title: defaultTitle(`How to Counter ${hero.name} – Best Counters ${season}`),
    description: `Best heroes to counter ${hero.name} in Honor of Kings ${season}. Counter picks and matchup tips from Camp HOK international data.`,
    path: `/hero/${params.slug}/counters`,
    locale: 'en',
    ogImage: hero.avatar,
    type: 'article',
    modifiedTime: hero.dataUpdated ?? site.dateModified,
  });
}

export default function CounterPage({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  return <CounterPageView hero={hero} locale="en" />;
}
