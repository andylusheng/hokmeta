import type { GameItem, Hero } from '@/types/hero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuildCompareClient } from '@/components/BuildCompareClient';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

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
    </div>
  );
}
