import { notFound } from 'next/navigation';
import { getHeroBySlug, getHeroSlugs } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { CounterPageView } from '@/views/CounterPageView';

export function generateStaticParams() {
  return getHeroSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};
  return buildMetadata({
    title: defaultTitle(`How to Counter ${hero.name} – Best Counters in S14`),
    description: `Best heroes to counter ${hero.name} in Arena of Valor Season 14. Win rates and counter strategies based on real match data.`,
    path: `/hero/${params.slug}/counters`,
    locale: 'en',
    ogImage: hero.avatar,
  });
}

export default function CounterPage({ params }: { params: { slug: string } }) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();
  return <CounterPageView hero={hero} locale="en" />;
}