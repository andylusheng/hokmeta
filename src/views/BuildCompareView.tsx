import Link from 'next/link';
import type { GameItem, Hero } from '@/types/hero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuildCompareClient } from '@/components/BuildCompareClient';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

function rate(value: number | null): string {
  return value == null ? 'untracked' : `${value.toFixed(1)}%`;
}

export function BuildCompareView({
  heroes,
  items,
  locale = 'en',
  initialHeroSlug,
}: {
  heroes: Hero[];
  items: GameItem[];
  locale?: Locale;
  initialHeroSlug?: string;
}) {
  const t = createT(locale);
  const hero = initialHeroSlug ? heroes.find((h) => h.slug === initialHeroSlug) : undefined;
  const title = hero
    ? `${hero.name} ${t('tools.buildCompareTitle')}`
    : t('tools.buildComparePageTitle');
  const description = hero
    ? t('tools.buildCompareHeroDesc', { name: hero.name })
    : t('tools.buildComparePageDesc');
  const path = hero ? `/tools/build-compare/${hero.slug}` : '/tools/build-compare';

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.tools'), path: localePath(locale, '/tools') },
          { name: t('tools.buildComparePageTitle'), path: localePath(locale, '/tools/build-compare') },
          ...(hero ? [{ name: title, path: localePath(locale, path) }] : []),
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.tools'), href: localePath(locale, '/tools') },
          ...(hero
            ? [
                { label: t('tools.buildComparePageTitle'), href: localePath(locale, '/tools/build-compare') },
                { label: title },
              ]
            : [{ label: t('tools.buildComparePageTitle') }]),
        ]}
      />
      <div className="mb-6 max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
      <BuildCompareClient
        heroes={heroes}
        items={items}
        locale={locale}
        initialHeroSlug={initialHeroSlug}
      />
      {hero ? (
        <section className="card mt-8">
          <h2 className="section-title">How to use this {hero.name} build comparison</h2>
          <div className="space-y-4 text-sm leading-7 text-gray-400">
            <p>
              This page is for players who already know they want to play {hero.name}, but are not sure which item path
              fits the next ranked draft. Start with the recommended build, then compare it against a Camp preset or a
              custom six-item setup. The calculator tests the same combo into marksman, mage, fighter, and tank target
              templates, so the result is more useful than looking at raw attack or magic power alone. A build that wins
              against a marksman template may still lose value into a tank if it lacks penetration, HP-based damage, or
              enough survivability to keep attacking.
            </p>
            <p>
              Use the automatic conclusions as a first read, not as a blind rule. If {hero.name} is drafted as a{' '}
              {hero.lane || hero.role} pick, check whether your team needs burst, front-to-back damage, or a safer late
              game slot. Current data marks {hero.name} as Tier {hero.tier}, with {rate(hero.winRate)} win rate,{' '}
              {rate(hero.pickRate)} pick rate, and {rate(hero.banRate)} ban rate on the HOKMeta snapshot. Those numbers
              explain draft pressure, while the table below explains item tradeoffs.
            </p>
            <p>
              After comparing builds, open the{' '}
              <Link className="text-hok-gold hover:text-white" href={localePath(locale, `/hero/${hero.slug}`)}>
                {hero.name} hero guide
              </Link>{' '}
              for skill order, arcana, and playstyle notes. If the enemy draft is the reason you are changing items,
              review the{' '}
              <Link className="text-hok-gold hover:text-white" href={localePath(locale, `/hero/${hero.slug}/counters`)}>
                {hero.name} counter page
              </Link>{' '}
              before locking the pick. For individual stat lines and passive effects, use the{' '}
              <Link className="text-hok-gold hover:text-white" href={localePath(locale, '/items')}>
                item database
              </Link>
              .
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
