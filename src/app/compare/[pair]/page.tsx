import { notFound } from 'next/navigation';
import { getComparePairs, getComparePair, getCompareHeroes } from '@/lib/hero-compare';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { getHeroDisplayName } from '@/lib/locale-names';
import { HeroCompareView } from '@/views/HeroCompareView';

export function generateStaticParams() {
  return getComparePairs().map((p) => ({ pair: p.pair }));
}

export function generateMetadata({ params }: { params: { pair: string } }) {
  const pair = getComparePair(params.pair);
  if (!pair) return {};
  const heroesData = getCompareHeroes(pair);
  if (!heroesData) return {};
  const [a, b] = heroesData;
  const nameA = getHeroDisplayName(a, 'en');
  const nameB = getHeroDisplayName(b, 'en');
  return buildMetadata({
    title: defaultTitle(`${nameA} vs ${nameB} — Who Should You Pick?`),
    description: `${nameA} vs ${nameB} (${pair.role}): compare win rate, pick rate, ban rate, and tier to decide which hero fits your ranked draft.`,
    path: `/compare/${pair.pair}`,
    locale: 'en',
  });
}

export default function ComparePage({ params }: { params: { pair: string } }) {
  const pair = getComparePair(params.pair);
  if (!pair) notFound();
  return <HeroCompareView pair={pair} locale="en" />;
}
