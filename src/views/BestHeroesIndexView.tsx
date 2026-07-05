import Link from 'next/link';
import { getHeroesGroupedByRole } from '@/lib/data';
import { ROLES_AZ } from '@/types/hero';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { HeroCard } from '@/components/HeroCard';

export function BestHeroesIndexView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const grouped = getHeroesGroupedByRole();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.bestHeroes'), path: localePath(locale, '/best-heroes') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.bestHeroes') },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{t('bestHeroes.title')}</h1>
      <p className="mb-4 max-w-2xl text-gray-400">
        {t('bestHeroes.subtitle')}{' '}
        <Link
          href={localePath(locale, '/heroes')}
          className="text-hok-gold hover:underline"
        >
          {t('bestHeroes.allHeroesLink')}
        </Link>
        .
      </p>
      <p className="mb-8 text-sm text-gray-500">{t('bestHeroes.disclaimer')}</p>

      <div className="space-y-10">
        {ROLES_AZ.map((role) => {
          const top = grouped[role].slice(0, 3);
          if (!top.length) return null;
          const roleLabel = translateRole(role, locale);
          return (
            <section key={role}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-xl font-bold text-hok-gold">
                  {t('bestHeroes.bestRole', { role: roleLabel })}
                </h2>
                <Link
                  href={localePath(locale, `/best-heroes/${role.toLowerCase()}`)}
                  className="text-sm text-hok-gold hover:underline"
                >
                  {t('bestHeroes.viewAllRole', { role: roleLabel })}
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {top.map((hero) => (
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
