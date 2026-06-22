import { notFound } from 'next/navigation';
import {
  getHeroBySlug,
  getHeroSlugs,
  getKeywordsForHero,
  site,
} from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { heroPageTitle, heroPageDescription } from '@/lib/meta-season';
import { getHeroDisplayName } from '@/lib/locale-names';
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
    title: defaultTitle(heroPageTitle(getHeroDisplayName(hero, 'zh-TW'), 'zh-TW')),
    description: heroPageDescription(
      getHeroDisplayName(hero, 'zh-TW'),
      hero.lane ?? hero.role,
      hero.dataUpdated ?? 'meta',
      'zh-TW'
    ),
    path: `/hero/${hero.slug}`,
    locale: 'zh-TW',
    ogImage: hero.avatar,
    keywords: kw.length ? kw : undefined,
    type: 'article',
    modifiedTime: hero.dataUpdated ?? site.dateModified,
  });
}

export default function ZhTWHeroPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  return <HeroPageView hero={hero} locale="zh-TW" />;
}
