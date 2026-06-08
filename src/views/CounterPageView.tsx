import Link from 'next/link';

import { formatRate, getHeroByName } from '@/lib/data';
import {
  getCounterFaqs,
  getCounterList,
  getCounterMistakes,
  getCounterWhyBullets,
  getRelatedCounterHeroes,
} from '@/lib/counter-rationale';
import { createT, getMetaSeasonLabel, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import type { Hero } from '@/types/hero';

function CounterCard({ name, locale }: { name: string; locale: Locale }) {
  const counterHero = getHeroByName(name);
  if (!counterHero) {
    return (
      <div className="rounded border border-hok-border bg-hok-dark/40 px-3 py-2">
        <span className="text-sm text-gray-400">{name}</span>
      </div>
    );
  }

  const displayName = getHeroDisplayName(counterHero, locale);

  return (
    <Link
      href={localePath(locale, `/hero/${counterHero.slug}/counters`)}
      className="flex items-center gap-3 rounded border border-hok-border bg-hok-card/50 px-3 py-2 transition hover:border-hok-gold/40"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={counterHero.avatar}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-white">{displayName}</div>
        <div className="text-xs text-gray-400">
          {translateRole(counterHero.role, locale)} · {counterHero.tier}
        </div>
      </div>
    </Link>
  );
}

export function CounterPageView({ hero, locale = 'en' }: { hero: Hero; locale?: Locale }) {
  const t = createT(locale);
  const displayName = getHeroDisplayName(hero, locale);
  const season = getMetaSeasonLabel(locale);
  const counters = getCounterList(hero);
  const whyBullets = getCounterWhyBullets(hero, locale);
  const mistakes = getCounterMistakes(hero, locale);
  const faqs = getCounterFaqs(hero, locale);
  const related = getRelatedCounterHeroes(hero, 3);
  const updated = hero.dataUpdated || '—';

  const breadcrumbs = [
    { name: t('common.home'), path: localePath(locale, '/') },
    { name: t('common.allHeroes'), path: localePath(locale, '/heroes') },
    { name: displayName, path: localePath(locale, `/hero/${hero.slug}`) },
    {
      name: t('counterPage.breadcrumb'),
      path: localePath(locale, `/hero/${hero.slug}/counters`),
    },
  ];

  return (
    <div className="container-wide">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqPageSchema(faqs)} />

      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.allHeroes'), href: localePath(locale, '/heroes') },
          { label: displayName, href: localePath(locale, `/hero/${hero.slug}`) },
          { label: t('counterPage.breadcrumb') },
        ]}
      />

      <div className="mb-6 flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.avatar}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">
            {t('counterPage.title', { name: displayName })}
          </h1>
          <p className="text-sm text-gray-400">
            {t('counterPage.subtitle', { season })}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {t('counterPage.dataNote', { date: updated, source: t('counterPage.source') })}
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3 text-sm">
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          {t('counterPage.snapshotTier', { tier: hero.tier })}
        </span>
        {hero.lane && (
          <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5 text-gray-300">
            {translateLane(hero.lane, locale)}
          </span>
        )}
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          WR: <strong className="text-white">{formatRate(hero.winRate)}</strong>
        </span>
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          Pick: <strong className="text-white">{formatRate(hero.pickRate)}</strong>
        </span>
        <span className="rounded border border-hok-border bg-hok-card px-3 py-1.5">
          Ban: <strong className="text-white">{formatRate(hero.banRate)}</strong>
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="space-y-8">
          {counters.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-red-400">
                {t('counterPage.bestCounters', { name: displayName })}
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {counters.map((name) => (
                  <CounterCard key={name} name={name} locale={locale} />
                ))}
              </div>
            </section>
          )}

          <section className="rounded-xl border border-hok-border bg-hok-card/30 p-5">
            <h2 className="mb-3 text-lg font-semibold text-hok-gold">
              {t('counterPage.whyTitle')}
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
              {whyBullets.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-hok-border bg-hok-card/30 p-5">
            <h2 className="mb-3 text-lg font-semibold text-white">
              {t('counterPage.mistakesTitle')}
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
              {mistakes.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">
              {t('counterPage.faqTitle')}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded border border-hok-border bg-hok-card/30 p-4"
                >
                  <h3 className="mb-1 text-sm font-semibold text-hok-gold">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded border border-hok-border bg-hok-card/30 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">
              {t('counterPage.relatedTitle')}
            </h3>
            <Link
              href={localePath(locale, `/hero/${hero.slug}`)}
              className="mb-2 block text-sm text-hok-gold hover:underline"
            >
              ← {t('counterPage.overviewLink', { name: displayName })}
            </Link>
            <Link
              href={localePath(locale, '/tools/counter-picker')}
              className="block text-sm text-hok-gold hover:underline"
            >
              {t('counterPage.counterPickerLink')} →
            </Link>
          </div>

          {related.length > 0 && (
            <div className="rounded border border-hok-border bg-hok-card/30 p-4">
              <h3 className="mb-2 text-sm font-semibold text-white">
                {t('counterPage.relatedCounters')}
              </h3>
              <ul className="space-y-2">
                {related.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={localePath(locale, `/hero/${h.slug}/counters`)}
                      className="text-sm text-hok-gold hover:underline"
                    >
                      {t('counterPage.viewCounterGuide', {
                        name: getHeroDisplayName(h, locale),
                      })}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
