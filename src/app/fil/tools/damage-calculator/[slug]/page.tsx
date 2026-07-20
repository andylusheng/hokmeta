import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
import { getFullHeroBySlug } from '@/lib/heroes-server';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
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
  const t = createT('fil');

  return buildMetadata({
    title: defaultTitle(`${hero.name} ${t('tools.damageShortTitle')}`),
    description: t('tools.damageHeroDesc', {
      name: hero.name,
      tier: hero.tier,
      role: hero.role,
    }),
    path: `/tools/damage-calculator/${hero.slug}`,
    locale: 'fil',
    keywords: [
      `${hero.name} damage calculator`,
      `${hero.name} damage calculator HOK`,
      'Honor of Kings damage calculator',
    ],
  });
}

export default function ZhTWHeroDamageCalculatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getFullHeroBySlug(params.slug);
  if (!hero) notFound();

  return <DamageCalculatorView hero={hero} locale="fil" />;
}
