import Link from 'next/link';
import type { Hero } from '@/types/hero';
import {
  getKeywordsForHero,
} from '@/lib/data';
import { getLocalizedFaqs } from '@/lib/hero-faq';
import { getLocalizedGuide } from '@/lib/hero-playbook';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { getRelatedArticleForFaq } from '@/lib/learn-hero-links';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroCoverBanner } from '@/components/HeroCoverBanner';
import { BuildStrip } from '@/components/BuildStrip';
import { HeroDecisionPanel } from '@/components/HeroDecisionPanel';
import { HeroGeoAnswerBox } from '@/components/HeroGeoAnswerBox';
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
import { ContentLocaleNotice } from '@/components/ContentLocaleNotice';
import { HeroClimbRecommend } from '@/components/HeroClimbRecommend';
import { BuildPhilosophyCard } from '@/components/BuildPhilosophyCard';
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  heroArticleSchema,
  heroGameSchema,
} from '@/lib/schema';
import { heroGeoFaqs } from '@/lib/hero-geo';
import { GEO_BUILD_YEAR } from '@/lib/meta-season';

function ComparisonsBlock({ hero, locale }: { hero: Hero; locale: Locale }) {
  const g = getLocalizedGuide(hero, locale);
  const comparisons = g?.comparisons;
  if (!comparisons || comparisons.length === 0) return null;

  return (
    <ul className="space-y-2">
      {comparisons.map((line) => (
        <li
          key={line}
          className="rounded border border-hok-border bg-hok-dark/30 px-3 py-2 text-sm text-gray-300"
        >
          {line}
        </li>
      ))}
    </ul>
  );
}

export function HeroPageView({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const keywords = getKeywordsForHero(hero.slug);
  const heroPath = `/hero/${hero.slug}`;
  const heroName = getHeroDisplayName(hero, locale);
  const featuredFaqs = getLocalizedFaqs(hero, locale, 5);
  const geoFaqs = heroGeoFaqs(hero, locale);
  const visibleFaqs = [...geoFaqs, ...featuredFaqs]
    .filter((faq, index, list) => list.findIndex((f) => f.id === faq.id) === index)
    .slice(0, 8);
  const faqTitle =
    locale === 'zh-TW'
      ? `${heroName} ${GEO_BUILD_YEAR} 出裝常見問題`
      : `${heroName} Build ${GEO_BUILD_YEAR} FAQ`;
  const damageCalculatorPath = localePath(locale, `/tools/damage-calculator/${hero.slug}`);
  const buildComparePath = localePath(locale, `/tools/build-compare/${hero.slug}`);

  // Build FAQ → learn article links
  const faqArticleLinks = Object.fromEntries(
    featuredFaqs
      .map((faq) => {
        const link = getRelatedArticleForFaq(faq.id, hero.slug, locale);
        return link ? [faq.id, link] : null;
      })
      .filter(Boolean) as [string, { url: string; title: string }][]
  );

  return (
    <div className="container-wide">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('common.heroes'), path: localePath(locale, '/heroes') },
          { name: heroName, path: localePath(locale, heroPath) },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          visibleFaqs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />
      <JsonLd data={heroGameSchema(hero, localePath(locale, heroPath))} />
      <JsonLd data={heroArticleSchema(hero, localePath(locale, heroPath))} />

      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.allHeroes'), href: localePath(locale, '/heroes') },
          { label: heroName },
        ]}
      />

      <ContentLocaleNotice locale={locale} hero={hero} />

      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <article className="min-w-0">
          <HeroCoverBanner hero={hero} locale={locale} />
          <HeroGeoAnswerBox hero={hero} locale={locale} />
          <HeroClimbRecommend hero={hero} locale={locale} />
          <BuildStrip hero={hero} locale={locale} />
          <HeroDecisionPanel hero={hero} locale={locale} />

          <section className="mb-6 rounded border border-hok-gold/30 bg-hok-gold/10 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
                  {t('hero.buildCompareTool.label')}
                </p>
                <h2 className="mt-1 text-lg font-bold text-white">
                  {t('hero.buildCompareTool.title', { name: heroName })}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-300">
                  {t('hero.buildCompareTool.desc', { name: heroName })}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link
                  href={damageCalculatorPath}
                  className="inline-flex items-center justify-center rounded bg-hok-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
                >
                  {t('hero.buildCompareTool.damageCta')}
                </Link>
                <Link
                  href={buildComparePath}
                  className="inline-flex items-center justify-center rounded border border-hok-gold/60 px-4 py-2 text-sm font-semibold text-hok-gold transition hover:bg-hok-gold/10"
                >
                  {t('hero.buildCompareTool.compareCta')}
                </Link>
              </div>
            </div>
          </section>

          <section id="build" className="scroll-mt-20 mb-6">
            <h2 className="section-title">
              {t('hero.buildTitle', { name: heroName })}
            </h2>
            <p className="mb-4 text-sm text-gray-400">{t('hero.buildIntro')}</p>
            <BuildPhilosophyCard hero={hero} locale={locale} />
            <BuildBlock hero={hero} locale={locale} />
          </section>

          <section id="arcana" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{t('hero.arcanaTitle')}</h2>
            <ArcanaTable hero={hero} locale={locale} />
          </section>

          <section id="skills" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{t('hero.abilitiesTitle')}</h2>
            <div className="mb-3">
              <h3 className="mb-1 text-sm font-semibold text-gray-400">{t('hero.skillOrderTitle')}</h3>
              <SkillOrderBlock hero={hero} locale={locale} />
            </div>
            <SkillBlock hero={hero} locale={locale} />
          </section>

          <section id="combos" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{t('hero.combosTitle')}</h2>
            <ComboListBlock hero={hero} locale={locale} />
          </section>

          <section id="counters" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{t('hero.countersTitle')}</h2>
            <CounterBlock hero={hero} locale={locale} />
            <div className="mt-3">
              <Link
                href={localePath(locale, `/hero/${hero.slug}/counters`)}
                className="text-sm text-hok-gold hover:underline"
              >
                Full counter analysis →
              </Link>
            </div>
          </section>

          <section id="comparisons" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{t('guide.comparisons')}</h2>
            <ComparisonsBlock hero={hero} locale={locale} />
          </section>

          <section id="guide" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{t('hero.playstyleTitle')}</h2>
            <HeroGuideBlock hero={hero} locale={locale} />
          </section>

          <section id="faq" className="scroll-mt-20 mb-6">
            <h2 className="section-title">{faqTitle}</h2>
            <p className="mb-4 text-sm leading-6 text-gray-400">
              {locale === 'zh-TW'
                ? `快速確認 ${heroName} 的出裝、銘文、克制、分路與是否值得練。`
                : `Quick answers for ${heroName} builds, arcana, counters, lane choice, and ranked value.`}
            </p>
            <FaqAccordion faqs={visibleFaqs} relatedLinks={faqArticleLinks} maxVisible={6} />
          </section>

          <DataAttribution
            subject={hero.name}
            dataSource={hero.dataSource}
            dataUpdated={hero.dataUpdated}
            locale={locale}
          />

          <RelatedSearchBox terms={keywords} locale={locale} />
        </article>

        <aside>
          <PageTOC locale={locale} />
        </aside>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link
          href={localePath(locale, '/tools/counter-picker')}
          className="text-hok-gold hover:underline"
        >
          {t('hero.counterPicker')}
        </Link>
      </p>
    </div>
  );
}
