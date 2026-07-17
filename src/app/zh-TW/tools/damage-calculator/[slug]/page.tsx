import { notFound } from 'next/navigation';
import { heroes, getHeroBySlug } from '@/lib/data';
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
    title: defaultTitle(`${hero.name} 傷害計算器`),
    description: `計算 ${hero.name} 的出裝、技能等級、穿透、真實傷害與 beta 602 防禦公式實際傷害。`,
    path: `/tools/damage-calculator/${hero.slug}`,
    locale: 'zh-TW',
    keywords: [
      `${hero.name} damage calculator`,
      `${hero.name} 傷害計算器`,
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

  return <DamageCalculatorView hero={hero} locale="zh-TW" />;
}
