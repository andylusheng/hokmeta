import { notFound } from 'next/navigation';
import { heroes, items, getHeroBySlug } from '@/lib/data';
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
  const t = createT('id');

  return buildMetadata({
    title: defaultTitle(`${hero.name} ${t('tools.damageShortTitle')}`),
    description: t('tools.damageHeroDesc', {
      name: hero.name,
      tier: hero.tier,
      role: hero.role,
    }),
    path: `/tools/damage-calculator/${hero.slug}`,
    locale: 'id',
    keywords: [
      `${hero.name} damage calculator`,
      `${hero.name} kalkulator damage`,
      'Honor of Kings damage calculator',
    ],
  });
}

export default function ZhTWHeroDamageCalculatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();

  return <DamageCalculatorView heroes={heroes} items={items} locale="id" initialHeroSlug={hero.slug} />;
}
