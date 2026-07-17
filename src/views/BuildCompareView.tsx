import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuildCompareClient } from '@/components/BuildCompareClient';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbSchema, webApplicationSchema } from '@/lib/schema';

export function BuildCompareView({
  locale = 'en',
  hero,
}: {
  locale?: Locale;
  hero?: Hero;
}) {
  const t = createT(locale);
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
      <JsonLd
        data={webApplicationSchema({
          name: title,
          path: localePath(locale, path),
          description,
          keywords: hero
            ? [
                `${hero.name} build compare`,
                `${hero.name} build 2026`,
                `best build for ${hero.name} in HOK`,
                'Honor of Kings build compare',
              ]
            : [
                'Honor of Kings build compare',
                'HOK build compare',
                'Honor of Kings item comparison',
              ],
        })}
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
        locale={locale}
        initialHeroSlug={hero?.slug}
      />
      {hero ? (
        <section className="card mt-8">
          <h2 className="section-title">{t('tools.buildCompareHelperTitle', { name: hero.name })}</h2>
          <p className="text-sm leading-7 text-gray-400">{t('tools.buildCompareHelperBody')}</p>
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
