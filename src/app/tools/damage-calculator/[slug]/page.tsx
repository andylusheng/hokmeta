import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
import { getFullHeroBySlug } from '@/lib/heroes-server';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { DamageCalculatorView } from '@/views/DamageCalculatorView';

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
    title: defaultTitle(`${hero.name} Damage Calculator`),
    description: `Calculate ${hero.name} damage in Honor of Kings with item builds, skill level, pierce, true damage, and the beta 602 defense formula.`,
    path: `/tools/damage-calculator/${hero.slug}`,
    locale: 'en',
    keywords: [
      `${hero.name} damage calculator`,
      `${hero.name} build damage`,
      `Honor of Kings ${hero.name} damage`,
      'HOK damage calculator',
    ],
  });
}

export default function HeroDamageCalculatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getFullHeroBySlug(params.slug);
  if (!hero) notFound();

  return <DamageCalculatorView hero={hero} locale="en" />;
}
