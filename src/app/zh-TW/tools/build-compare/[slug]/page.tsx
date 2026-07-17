import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
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
    title: defaultTitle(`${hero.name} 出裝對比`),
    description: `對比 ${hero.name} 的推薦出裝、Camp 備選出裝、自訂換裝與實際傷害輸出。`,
    path: `/tools/build-compare/${hero.slug}`,
    locale: 'zh-TW',
    keywords: [
      `${hero.name} build compare`,
      `${hero.name} 出裝對比`,
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

  return <BuildCompareView hero={hero} locale="zh-TW" />;
}
