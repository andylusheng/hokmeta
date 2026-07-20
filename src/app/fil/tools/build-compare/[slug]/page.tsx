import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
import { getFullHeroBySlug } from '@/lib/heroes-server';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
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
  const t = createT('fil');

  return buildMetadata({
    title: defaultTitle(`${hero.name} ${t('tools.buildCompareTitle')}`),
    description: t('tools.buildCompareHeroDesc', { name: hero.name }),
    path: `/tools/build-compare/${hero.slug}`,
    locale: 'fil',
    keywords: [
      `${hero.name} build compare`,
      `${hero.name} build compare Philippines`,
      'Honor of Kings build compare',
    ],
  });
}

export default function ZhTWHeroBuildComparePage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getFullHeroBySlug(params.slug);
  if (!hero) notFound();

  return <BuildCompareView hero={hero} locale="fil" />;
}
