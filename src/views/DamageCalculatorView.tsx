import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DamageCalculatorClient } from '@/components/DamageCalculatorClient';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbSchema, webApplicationSchema } from '@/lib/schema';

export function DamageCalculatorView({
  locale = 'en',
  hero,
}: {
  locale?: Locale;
  hero?: Hero;
}) {
  const t = createT(locale);
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
      <JsonLd
        data={webApplicationSchema({
          name: title,
          path: localePath(locale, path),
          description,
          keywords: hero
            ? [
                `${hero.name} damage calculator`,
                `${hero.name} build damage`,
                `Honor of Kings ${hero.name} build`,
                'HOK damage calculator',
              ]
            : [
                'Honor of Kings damage calculator',
                'HOK damage calculator',
                'Honor of Kings item damage',
              ],
        })}
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
        locale={locale}
        initialHeroSlug={hero?.slug}
      />
      {hero ? (
        <section className="card mt-8">
          <h2 className="section-title">{t('tools.damageHelperTitle', { name: hero.name })}</h2>
          <p className="text-sm leading-7 text-gray-400">{t('tools.damageHelperBody')}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link className="text-hok-gold hover:text-white" href={localePath(locale, `/hero/${hero.slug}`)}>
              {t('tools.heroGuideCta', { name: hero.name })}
            </Link>
            <Link className="text-hok-gold hover:text-white" href={localePath(locale, `/hero/${hero.slug}/counters`)}>
              {t('tools.heroCounterCta', { name: hero.name })}
            </Link>
            <Link className="text-hok-gold hover:text-white" href={localePath(locale, '/items')}>
              {t('tools.itemDatabaseCta')}
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
