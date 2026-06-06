import { notFound } from 'next/navigation';
import {
  getHeroBySlug,
  getHeroSlugs,
  getKeywordsForHero,
} from '@/lib/data';
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
    ogImage: hero.avatar,
    keywords: kw.length ? kw : undefined,
  });
}

export default function HeroPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  return <HeroPageView hero={hero} locale="en" />;
}
