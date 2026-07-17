import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
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
  const t = createT('id');

  return buildMetadata({
    title: defaultTitle(`${hero.name} ${t('tools.buildCompareTitle')}`),
    description: t('tools.buildCompareHeroDesc', { name: hero.name }),
    path: `/tools/build-compare/${hero.slug}`,
    locale: 'id',
    keywords: [
      `${hero.name} build compare`,
      `${hero.name} build compare Indonesia`,
      'Honor of Kings build compare',
    ],
  });
}

export default function ZhTWHeroBuildComparePage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();

  return <BuildCompareView hero={hero} locale="id" />;
}
