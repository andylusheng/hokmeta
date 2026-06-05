import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getHeroBySlug,
  getHeroSlugs,
  getKeywordsForHero,
} from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { heroPageTitle } from '@/lib/meta-season';
import { getFeaturedFaqs } from '@/lib/hero-playbook';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroSummary } from '@/components/HeroSummary';
import { BuildBlock } from '@/components/BuildBlock';
import { SkillBlock } from '@/components/SkillBlock';
import { ArcanaTable } from '@/components/ArcanaTable';
import { CounterBlock } from '@/components/CounterBlock';
import { HeroGuideBlock } from '@/components/HeroGuideBlock';
import { SkillOrderBlock } from '@/components/SkillOrderBlock';
import { ComboListBlock } from '@/components/ComboListBlock';
import { FaqAccordion } from '@/components/FaqAccordion';
import { PageTOC } from '@/components/PageTOC';
import { RelatedSearchBox } from '@/components/RelatedSearchBox';
import { DataAttribution } from '@/components/DataAttribution';
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  heroArticleSchema,
  heroGameSchema,
} from '@/lib/schema';

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
    title: defaultTitle(heroPageTitle(hero.name)),
    description: `${hero.name} ${hero.lane ?? hero.role} guide — best build, skill order, combos, counters, and arcana for Honor of Kings Global (${hero.dataUpdated ?? 'meta'}).`,
    path: `/hero/${hero.slug}`,
    ogImage: hero.avatar,
    keywords: kw.length ? kw : undefined,
  });
}

export default function HeroPage({
  params,
}: {
  params: { slug: string };
}) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();

  const keywords = getKeywordsForHero(hero.slug);
  const featuredFaqs = getFeaturedFaqs(hero, 5);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Heroes', path: '/heroes' },
          { name: hero.name, path: `/hero/${hero.slug}` },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          featuredFaqs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />
      <JsonLd data={heroGameSchema(hero, `/hero/${hero.slug}`)} />
      <JsonLd data={heroArticleSchema(hero, `/hero/${hero.slug}`)} />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Heroes', href: '/heroes/' },
          { label: hero.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <article>
          <HeroSummary hero={hero} />

          <section id="build" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Best Build for {hero.name}</h2>
            <p className="mb-4 text-sm text-gray-400">
              End-game item order with gold costs and slot notes. Purchase path
              may differ in-match.
            </p>
            <BuildBlock hero={hero} />
          </section>

          <section id="arcana" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Best Arcana &amp; Spells</h2>
            <ArcanaTable hero={hero} />
          </section>

          <section id="skill-order" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Skill Order</h2>
            <SkillOrderBlock hero={hero} />
          </section>

          <section id="combos" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Combos</h2>
            <ComboListBlock hero={hero} />
          </section>

          <section id="skills" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Abilities</h2>
            <SkillBlock hero={hero} />
          </section>

          <section id="counters" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Counters &amp; Matchups</h2>
            <CounterBlock hero={hero} />
          </section>

          <section id="guide" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Playstyle &amp; Ranked Tips</h2>
            <HeroGuideBlock hero={hero} />
          </section>

          <section id="faq" className="scroll-mt-20 mb-8">
            <h2 className="section-title">FAQ</h2>
            <FaqAccordion faqs={featuredFaqs} />
          </section>

          <DataAttribution
            subject={hero.name}
            dataSource={hero.dataSource}
            dataUpdated={hero.dataUpdated}
          />

          <RelatedSearchBox terms={keywords} />
        </article>

        <aside>
          <PageTOC />
        </aside>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/tools/counter-picker/" className="text-hok-gold hover:underline">
          Counter picker tool
        </Link>
      </p>
    </div>
  );
}
