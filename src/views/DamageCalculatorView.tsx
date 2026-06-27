import Link from 'next/link';
import type { GameItem, Hero } from '@/types/hero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DamageCalculatorClient } from '@/components/DamageCalculatorClient';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

function rate(value: number | null): string {
  return value == null ? 'untracked' : `${value.toFixed(1)}%`;
}

export function DamageCalculatorView({
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
    ? `${hero.name} ${t('tools.damageShortTitle')}`
    : t('tools.damagePageTitle');
  const description = hero
    ? t('tools.damageHeroDesc', { name: hero.name, tier: hero.tier, role: hero.role })
    : t('tools.damagePageDesc');
  const path = hero
    ? `/tools/damage-calculator/${hero.slug}`
    : '/tools/damage-calculator';

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.tools'), path: localePath(locale, '/tools') },
          { name: t('tools.damagePageTitle'), path: localePath(locale, '/tools/damage-calculator') },
          ...(hero ? [{ name: title, path: localePath(locale, path) }] : []),
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.tools'), href: localePath(locale, '/tools') },
          ...(hero
            ? [
                { label: t('tools.damagePageTitle'), href: localePath(locale, '/tools/damage-calculator') },
                { label: title },
              ]
            : [{ label: t('tools.damagePageTitle') }]),
        ]}
      />
      <div className="mb-6 max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
      <DamageCalculatorClient
        heroes={heroes}
        items={items}
        locale={locale}
        initialHeroSlug={initialHeroSlug}
      />
      {hero ? (
        <section className="card mt-8">
          <h2 className="section-title">How to read the {hero.name} damage calculator</h2>
          <div className="space-y-4 text-sm leading-7 text-gray-400">
            <p>
              This calculator is built for practical {hero.name} testing, not for a generic stat screenshot. Set the
              hero level, skill level, basic attack count, and equipment list to match the moment you care about: first
              item skirmish, three-item objective fight, or full-build late game. The result separates raw damage from
              actual damage after defense, so you can see when penetration, magic pierce, HP-based damage, or true
              damage is doing the real work. That matters for {hero.name} because ranked fights rarely happen into a
              dummy target with zero armor.
            </p>
            <p>
              Treat the output as a decision tool before queueing. If {hero.name} is Tier {hero.tier} in the current
              snapshot, with {rate(hero.winRate)} win rate and {rate(hero.pickRate)} pick rate, the question is not only
              whether the hero is strong. The useful question is whether your selected build can finish a carry before
              peel arrives, or whether it still has enough damage when the enemy frontline buys defense. Adjust one item
              at a time, then watch how the actual damage and effective defense numbers move.
            </p>
            <p>
              For the full ranked setup, pair this tool with the{' '}
              <Link className="text-hok-gold hover:text-white" href={localePath(locale, `/hero/${hero.slug}`)}>
                {hero.name} hero guide
              </Link>{' '}
              and the{' '}
              <Link className="text-hok-gold hover:text-white" href={localePath(locale, `/hero/${hero.slug}/counters`)}>
                {hero.name} counter page
              </Link>
              . The guide explains skill order, arcana, and combo timing; the counter page explains when the enemy draft
              makes the damage harder to apply. Use the{' '}
              <Link className="text-hok-gold hover:text-white" href={localePath(locale, '/items')}>
                item database
              </Link>{' '}
              when you need to inspect a passive, gold cost, or defensive stat line before changing the build.
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
