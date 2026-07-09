import Link from 'next/link';
import type { Hero } from '@/types/hero';
import {
  getKeywordsForHero,
} from '@/lib/data';
import { getLocalizedFaqs } from '@/lib/hero-faq';
import { getLocalizedGuide } from '@/lib/hero-playbook';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { getHeroDisplayName } from '@/lib/locale-names';
import { getRelatedArticleForFaq } from '@/lib/learn-hero-links';
import { buildTopHeroGuide } from '@/lib/learn-top-hero-guides';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroCoverBanner } from '@/components/HeroCoverBanner';
import { HeroDecisionPanel } from '@/components/HeroDecisionPanel';
import { HeroAuthorityGuide } from '@/components/HeroAuthorityGuide';
import { HeroTrendHistory } from '@/components/HeroTrendHistory';
import { HeroGeoAnswerBox } from '@/components/HeroGeoAnswerBox';
import { HeroBuildVariants } from '@/components/HeroBuildVariants';
import { HeroPatchHistory } from '@/components/HeroPatchHistory';
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
import { isFeaturedHero } from '@/lib/featured-heroes';

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
  const topHeroGuide = locale === 'en' ? buildTopHeroGuide(hero) : null;
  const showFeaturedSeoBlocks = isFeaturedHero(hero.slug);

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
          <HeroDecisionPanel hero={hero} locale={locale} />
          <HeroAuthorityGuide hero={hero} locale={locale} />
          <HeroTrendHistory hero={hero} locale={locale} />

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

          {showFeaturedSeoBlocks ? <HeroBuildVariants hero={hero} locale={locale} /> : null}

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

          {showFeaturedSeoBlocks ? <HeroPatchHistory hero={hero} locale={locale} /> : null}

          {topHeroGuide ? (
            <section
              id="ranked-guide"
              className="mb-6 rounded border border-hok-border bg-hok-card/80 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
                Updated {GEO_BUILD_YEAR} ranked guide
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">{topHeroGuide.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">
                {topHeroGuide.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link
                  href={localePath(locale, `/learn/${topHeroGuide.slug}`)}
                  className="inline-flex items-center justify-center rounded bg-hok-gold px-4 py-2 font-semibold text-black transition hover:bg-yellow-300"
                >
                  Read the full {heroName} guide
                </Link>
                <Link
                  href={localePath(locale, `/hero/${hero.slug}/counters`)}
                  className="inline-flex items-center justify-center rounded border border-hok-border px-4 py-2 font-semibold text-gray-200 transition hover:border-hok-gold/60 hover:text-hok-gold"
                >
                  Check counters
                </Link>
              </div>
            </section>
          ) : null}

          <RelatedDecisionLinks
            hero={hero}
            heroName={heroName}
            locale={locale}
            guideSlug={topHeroGuide?.slug}
          />

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
          <PageTOC locale={locale} showFeaturedSections={showFeaturedSeoBlocks} />
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

function RelatedDecisionLinks({
  hero,
  heroName,
  locale,
  guideSlug,
}: {
  hero: Hero;
  heroName: string;
  locale: Locale;
  guideSlug?: string;
}) {
  const isZh = locale === 'zh-TW';
  const roleName = translateRole(hero.role, locale);
  const links = [
    guideSlug
      ? {
          label: isZh ? `${heroName} 完整攻略` : `${heroName} full guide`,
          href: `/learn/${guideSlug}`,
          desc: isZh
            ? '分路打法、團戰處理、排位常見失誤與對局思路。'
            : 'Lane plan, teamfight rules, ranked mistakes, and matchup notes.',
        }
      : null,
    {
      label: isZh ? `${heroName} 克制` : `${heroName} counters`,
      href: `/hero/${hero.slug}/counters`,
      desc: isZh
        ? '最佳克制英雄、對局細節與 BP 風險。'
        : 'Best counter picks, matchup notes, and draft risks.',
    },
    {
      label: isZh ? `${heroName} 傷害計算器` : `${heroName} damage calculator`,
      href: `/tools/damage-calculator/${hero.slug}`,
      desc: isZh
        ? '測試出裝打射手、法師、戰士與坦克模板的實際傷害。'
        : 'Test item damage against marksman, mage, fighter, and tank templates.',
    },
    {
      label: isZh ? `${heroName} 出裝比較` : `${heroName} build compare`,
      href: `/tools/build-compare/${hero.slug}`,
      desc: isZh
        ? '比較兩套出裝，查看不同對局下的結論。'
        : 'Compare two item builds and get matchup-specific conclusions.',
    },
    {
      label: isZh ? `最佳 ${roleName} 英雄` : `Best ${roleName} heroes`,
      href: `/best-heroes/${hero.role.toLowerCase()}`,
      desc: isZh
        ? '把這個英雄和同定位英雄放在一起比較。'
        : 'Compare this pick with other heroes in the same role.',
    },
  ].filter(Boolean) as Array<{ label: string; href: string; desc: string }>;

  return (
    <section className="mb-6 rounded-xl border border-hok-border bg-hok-card/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
        {isZh ? '相關決策' : 'Related decisions'}
      </p>
      <h2 className="mt-1 text-lg font-bold text-white">
        {isZh ? `繼續研究 ${heroName}` : `Keep researching ${heroName}`}
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={localePath(locale, link.href)}
            className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-3 transition hover:border-hok-gold/60 hover:bg-hok-dark/55"
          >
            <p className="text-sm font-semibold text-white">{link.label}</p>
            <p className="mt-1 text-xs leading-5 text-gray-400">{link.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
