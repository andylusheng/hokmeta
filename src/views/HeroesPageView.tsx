import { getHeroesGroupedByRole, heroes } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { HeroCard } from '@/components/HeroCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { ROLES_AZ } from '@/types/hero';

function roleLabel(role: string, locale: Locale): string {
  const t = createT(locale);
  const key = `roles.${role}`;
  const translated = t(key);
  return translated === key ? role : translated;
}

export function HeroesPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const grouped = getHeroesGroupedByRole();
  const crumbs = breadcrumbSchema([
    { name: t('common.home'), path: localePath(locale, '/') },
    { name: t('common.heroes'), path: localePath(locale, '/heroes') },
  ]);
  const list = itemListSchema(
    'All HOK Meta Heroes',
    heroes.map((h) => ({
      name: h.name,
      url: absoluteUrl(localePath(locale, `/hero/${h.slug}`)),
    }))
  );

  return (
    <div className="container-page">
      <JsonLd data={crumbs} />
      <JsonLd data={list} />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('common.allHeroes') },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{t('heroes.title')}</h1>
      <p className="mb-8 text-gray-400">
        {t('heroes.subtitle', { count: heroes.length })}
      </p>

      <div className="space-y-10">
        {ROLES_AZ.map((role) => {
          const roleHeroes = grouped[role];
          if (!roleHeroes.length) return null;
          return (
            <section key={role} id={`heroes-${role.toLowerCase()}`}>
              <h2 className="mb-4 text-2xl font-bold text-hok-gold">
                {roleLabel(role, locale)}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roleHeroes.map((hero) => (
                  <HeroCard key={hero.slug} hero={hero} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
