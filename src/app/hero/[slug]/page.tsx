import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getHeroBySlug,
  getHeroSlugs,
  getKeywordsForHero,
} from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroAvatar } from '@/components/HeroAvatar';
import { HeroStatTable } from '@/components/HeroStatTable';
import { BuildBlock } from '@/components/BuildBlock';
import { SkillBlock } from '@/components/SkillBlock';
import { ArcanaBlock } from '@/components/ArcanaBlock';
import { CounterBlock } from '@/components/CounterBlock';
import { HeroGuideBlock } from '@/components/HeroGuideBlock';
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
    title: defaultTitle(`${hero.name} Build, Counters & Guide`),
    description: `${hero.name} ${hero.role} guide — best build, arcana, combos, counters, high-rank tips, hero comparisons, and ${hero.faqs.length}+ FAQs (Camp HOK ${hero.dataUpdated ?? 'meta'}).`,
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
          hero.faqs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />
      <JsonLd data={heroGameSchema(hero, `/hero/${hero.slug}`)} />
      <JsonLd
        data={heroArticleSchema(hero, `/hero/${hero.slug}`)}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Heroes', href: '/heroes/' },
          { label: hero.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <article>
          <header id="overview" className="scroll-mt-20 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HeroAvatar hero={hero} size={96} priority />
            <div>
              <h1 className="text-3xl font-bold text-white">{hero.name}</h1>
              <p className="text-gray-400">
                {hero.role} · Tier {hero.tier} · {hero.difficulty}
              </p>
            </div>
          </header>

          <DataAttribution
            subject={hero.name}
            dataSource={hero.dataSource}
            dataUpdated={hero.dataUpdated}
          />

          <section className="card mb-8">
            <HeroStatTable hero={hero} />
          </section>

          <section id="skills" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Skills</h2>
            <SkillBlock hero={hero} />
          </section>

          <section id="build" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Build</h2>
            <BuildBlock hero={hero} />
          </section>

          <section id="arcana" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Arcana &amp; Spells</h2>
            <ArcanaBlock hero={hero} />
          </section>

          <section id="guide" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{hero.name} Guide</h2>
            <HeroGuideBlock hero={hero} />
          </section>

          <section id="counters" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Counters &amp; Matchups</h2>
            <CounterBlock hero={hero} />
          </section>

          <section id="patch-history" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Patch History</h2>
            <ul className="space-y-2">
              {hero.patchHistory.map((p) => (
                <li
                  key={p.version}
                  className="rounded border border-hok-border px-3 py-2 text-sm text-gray-300"
                >
                  <strong className="text-hok-gold">{p.version}</strong>: {p.change}
                </li>
              ))}
            </ul>
          </section>

          <section id="faq" className="scroll-mt-20 mb-8">
            <h2 className="section-title">FAQ</h2>
            <FaqAccordion faqs={hero.faqs} />
          </section>

          <section id="meta-analysis" className="scroll-mt-20 mb-8">
            <h2 className="section-title">Meta Analysis</h2>
            <div className="card space-y-3 text-sm leading-relaxed text-gray-300">
              {hero.metaAnalysis.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>

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
