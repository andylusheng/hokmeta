import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroTOC } from "@/components/HeroTOC";
import HeroAvatar from "@/components/HeroAvatar";
import { getHeroBySlug, getHeroes } from "@/lib/data";
import type { Hero } from "@/lib/data";
import { BreadcrumbListSchema, GameSchema, HowToSchema, FAQPageSchema, ArticleSchema } from "@/lib/schema";
import { getLastUpdatedDate } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hero = getHeroBySlug(params.slug);
  if (!hero) return {};

  return {
    title: `${hero.name} Build & Guide | ${siteConfig.currentSeason}`,
    description: `${hero.name} build, arcana, and guide for ${siteConfig.currentSeason}`,
  };
}

export async function generateStaticParams() {
  const heroes = getHeroes();
  return heroes.map(hero => ({ slug: hero.slug }));
}

export default function HeroDetailPage({ params }: Props) {
  const hero = getHeroBySlug(params.slug);
  if (!hero) notFound();

  const generalFaqs = [
    { question: `Is ${hero.name} good in ${siteConfig.currentSeason}?`, answer: `${hero.name} has a ${hero.winRate}% win rate in ${siteConfig.currentSeason} and is ${hero.tier} tier.` },
    { question: `What is the best ${hero.name} build?`, answer: `The best build for ${hero.name} includes ${hero.build.items.join(", ")}.` },
    { question: `What lane should ${hero.name} play?`, answer: `${hero.name} should be played in ${hero.role}.` },
    { question: `How to counter ${hero.name}?`, answer: `${hero.name} is countered by ${hero.counteredBy.map(c => getHeroBySlug(c)?.name).filter(Boolean).join(", ")}.` },
    { question: `Is ${hero.name} good for beginners?`, answer: `${hero.name} has ${hero.difficulty} difficulty.` },
  ];

  const allFaqs = [...generalFaqs, ...hero.faqs];

  const breadcrumbs = [{ name: "Heroes", url: "/heroes" }, { name: hero.name, url: `/hero/${hero.slug}` }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbListSchema breadcrumbs={breadcrumbs} />
      <GameSchema name={hero.name} description={`${hero.name} build and guide`} />
      <HowToSchema name={`How to Build ${hero.name}`} steps={hero.build.order.map(item => ({ text: `Buy ${item}` }))} />
      <FAQPageSchema faqs={allFaqs} />
      <ArticleSchema
        headline={`${hero.name} Build & Guide ${siteConfig.currentSeason}`}
        description={`Complete build and guide for ${hero.name}`}
        dateModified={getLastUpdatedDate()}
      />

      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-4xl font-bold mb-8">{hero.name} Build & Guide | {siteConfig.currentSeason}</h1>

      <HeroTOC hero={hero} />

      {/* Overview */}
      <section id="overview" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-textSecondary">Role</p>
              <p className="font-semibold">{hero.role}</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">Difficulty</p>
              <p className="font-semibold">{hero.difficulty}</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">Win Rate</p>
              <p className="font-semibold">{hero.winRate}%</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">Pick Rate</p>
              <p className="font-semibold">{hero.pickRate}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Build */}
      <section id="best-build" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Best Build</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Core Items</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {hero.build.items.map((item, i) => (
              <span key={i} className="bg-surfaceHover border border-border px-3 py-1 rounded">{item}</span>
            ))}
          </div>
          <h3 className="font-semibold mb-4">Build Order</h3>
          <ol className="list-decimal list-inside text-textSecondary">
            {hero.build.order.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Best Arcana */}
      <section id="best-arcana" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Best Arcana</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex flex-wrap gap-2">
            {hero.arcana.map((arcana, i) => (
              <span key={i} className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded">{arcana}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Counters */}
      <section id="counters" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-green-500">Counters</h3>
            <div className="flex flex-wrap gap-3">
              {hero.counters.map((slug, i) => {
                const counterHero = getHeroBySlug(slug);
                if (!counterHero) return null;
                return (
                  <Link key={i} href={`/hero/${counterHero.slug}`} className="group">
                    <div className="flex items-center gap-2 p-2 rounded hover:bg-surfaceHover transition">
                      {counterHero.avatar ? (
                        <HeroAvatar avatar={counterHero.avatar} name={counterHero.name} size="sm" />
                      ) : (
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                          {counterHero.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-textSecondary group-hover:text-primary transition">{counterHero.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-red-500">Countered By</h3>
            <div className="flex flex-wrap gap-3">
              {hero.counteredBy.map((slug, i) => {
                const counterHero = getHeroBySlug(slug);
                if (!counterHero) return null;
                return (
                  <Link key={i} href={`/hero/${counterHero.slug}`} className="group">
                    <div className="flex items-center gap-2 p-2 rounded hover:bg-surfaceHover transition">
                      {counterHero.avatar ? (
                        <HeroAvatar avatar={counterHero.avatar} name={counterHero.name} size="sm" />
                      ) : (
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                          {counterHero.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-textSecondary group-hover:text-primary transition">{counterHero.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Tips</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <ul className="space-y-2">
            {hero.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Patch History */}
      <section id="patch-history" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Patch History</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <ul className="space-y-2 text-textSecondary">
            {hero.patchHistory.map((patch, i) => (
              <li key={i}>{patch}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          {allFaqs.map((faq, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-textSecondary">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <InternalLinks hero={hero} pageType="hero-detail" />
    </div>
  );
}