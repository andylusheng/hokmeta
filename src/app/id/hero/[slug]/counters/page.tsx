import { notFound } from 'next/navigation';
import { getHeroBySlug, getHeroSlugs, site } from '@/lib/data';
import { createT, getMetaSeasonLabel } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { CounterPageView } from '@/views/CounterPageView';

export function generateStaticParams() {
  return getHeroSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  const t = createT('id');
  const displayName = getHeroDisplayName(hero, 'id');
  const season = getMetaSeasonLabel('id');
  return buildMetadata({
    title: defaultTitle(t('counterPage.title', { name: displayName })),
    description: t('counterPage.subtitle', { season }),
    path: `/hero/${params.slug}/counters`,
    locale: 'id',
    ogImage: hero.avatar,
    type: 'article',
    modifiedTime: hero.dataUpdated ?? site.dateModified,
  });
}

export default function ZhTWCounterPage({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  return <CounterPageView hero={hero} locale="id" />;
}
