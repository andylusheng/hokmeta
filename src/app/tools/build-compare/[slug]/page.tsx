import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
import { getFullHeroBySlug } from '@/lib/heroes-server';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { BuildCompareView } from '@/views/BuildCompareView';

export function generateStaticParams() {
  return heroes.map((hero) => ({ slug: hero.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};

  return buildMetadata({
    title: defaultTitle(`${hero.name} Build Compare`),
    description: `Compare ${hero.name} builds in Honor of Kings: recommended items, alternate Camp presets, item swaps, and actual damage output.`,
    path: `/tools/build-compare/${hero.slug}`,
    locale: 'en',
    keywords: [
      `${hero.name} build compare`,
      `${hero.name} best build damage`,
      `Honor of Kings ${hero.name} build`,
      'HOK build compare',
    ],
  });
}

export default function HeroBuildComparePage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getFullHeroBySlug(params.slug);
  if (!hero) notFound();

  return <BuildCompareView hero={hero} locale="en" />;
}
