import Link from 'next/link';
import { getRecommendedHeroesByRole } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { HeroCard } from '@/components/HeroCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';
import type { HeroRole } from '@/types/hero';

export function BestHeroesRoleView({
  role,
  locale = 'en',
}: {
  role: HeroRole;
  locale?: Locale;
}) {
  const t = createT(locale);
  const roleLabel = translateRole(role, locale);
  const list = getRecommendedHeroesByRole(role, 999);
  const roleSlug = role.toLowerCase();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.bestHeroes'), path: localePath(locale, '/best-heroes') },
          { name: roleLabel, path: localePath(locale, `/best-heroes/${roleSlug}`) },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          t('bestHeroes.roleTitle', { role: roleLabel }),
          list.map((h) => ({
            name: h.name,
            url: absoluteUrl(localePath(locale, `/hero/${h.slug}`)),
          }))
        )}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.bestHeroes'), href: localePath(locale, '/best-heroes') },
          { label: roleLabel },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">
        {t('bestHeroes.roleTitle', { role: roleLabel })}
      </h1>
      <p className="mb-8 text-gray-400">
        {t('bestHeroes.roleSubtitle', { count: list.length, role: roleLabel })}{' '}
        <Link
          href={localePath(locale, '/heroes')}
          className="text-hok-gold hover:underline"
        >
          {t('bestHeroes.allHeroesLink')}
        </Link>
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((hero) => (
          <HeroCard key={hero.slug} hero={hero} locale={locale} />
        ))}
      </div>
    </div>
  );
}
