import { notFound } from 'next/navigation';
import {
  getHeroBySlug,
  getHeroSlugs,
  getKeywordsForHero,
  site,
} from '@/lib/data';
import { getFullHeroBySlug } from '@/lib/heroes-server';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { heroPageTitle, heroPageDescription } from '@/lib/meta-season';
import { HeroPageView } from '@/views/HeroPageView';

export function generateStaticParams() {
  return getHeroSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  const kw = getKeywordsForHero(hero.slug);
  return buildMetadata({
    title: defaultTitle(heroPageTitle(hero.name, 'en')),
    description: heroPageDescription(
      hero.name,
      hero.lane ?? hero.role,
      hero.dataUpdated ?? 'meta',
      'en'
    ),
    path: `/hero/${hero.slug}`,
    locale: 'en',
    ogImage: `/og/heroes/${hero.slug}.svg`,
    keywords: kw.length ? kw : undefined,
    type: 'article',
    modifiedTime: hero.dataUpdated ?? site.dateModified,
  });
}

export default function HeroPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getFullHeroBySlug(params.slug);
  if (!hero) notFound();
  return <HeroPageView hero={hero} locale="en" />;
}
