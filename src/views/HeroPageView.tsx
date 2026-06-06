import Link from 'next/link';
import type { Hero } from '@/types/hero';
import {
  getKeywordsForHero,
} from '@/lib/data';
import { getLocalizedFaqs } from '@/lib/hero-faq';
import { createT, localePath, type Locale } from '@/lib/i18n';
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
import { ContentLocaleNotice } from '@/components/ContentLocaleNotice';
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  heroArticleSchema,
  heroGameSchema,
} from '@/lib/schema';

export function HeroPageView({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const keywords = getKeywordsForHero(hero.slug);
  const featuredFaqs = getLocalizedFaqs(hero, locale, 5);
  const heroPath = `/hero/${hero.slug}`;

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('common.heroes'), path: localePath(locale, '/heroes') },
          { name: hero.name, path: localePath(locale, heroPath) },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          featuredFaqs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
      />
      <JsonLd data={heroGameSchema(hero, localePath(locale, heroPath))} />
      <JsonLd data={heroArticleSchema(hero, localePath(locale, heroPath))} />

      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.allHeroes'), href: localePath(locale, '/heroes') },
          { label: hero.name },
        ]}
      />

      <ContentLocaleNotice locale={locale} />

      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <article>
          <HeroSummary hero={hero} locale={locale} />

          <section id="build" className="scroll-mt-20 mb-8">
            <h2 className="section-title">
              {t('hero.buildTitle', { name: hero.name })}
            </h2>
            <p className="mb-4 text-sm text-gray-400">{t('hero.buildIntro')}</p>
            <BuildBlock hero={hero} locale={locale} />
          </section>

          <section id="arcana" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.arcanaTitle')}</h2>
            <ArcanaTable hero={hero} locale={locale} />
          </section>

          <section id="skill-order" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.skillOrderTitle')}</h2>
            <SkillOrderBlock hero={hero} locale={locale} />
          </section>

          <section id="combos" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.combosTitle')}</h2>
            <ComboListBlock hero={hero} locale={locale} />
          </section>

          <section id="skills" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.abilitiesTitle')}</h2>
            <SkillBlock hero={hero} locale={locale} />
          </section>

          <section id="counters" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.countersTitle')}</h2>
            <CounterBlock hero={hero} locale={locale} />
          </section>

          <section id="guide" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.playstyleTitle')}</h2>
            <HeroGuideBlock hero={hero} locale={locale} />
          </section>

          <section id="faq" className="scroll-mt-20 mb-8">
            <h2 className="section-title">{t('hero.faqTitle')}</h2>
            <FaqAccordion faqs={featuredFaqs} />
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
