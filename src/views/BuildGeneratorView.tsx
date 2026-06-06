import type { Hero } from '@/types/hero';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { BuildGeneratorClient } from '@/components/BuildGeneratorClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function BuildGeneratorView({
  heroes,
  locale = 'en',
}: {
  heroes: Hero[];
  locale?: Locale;
}) {
  const t = createT(locale);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('tools.buildPageTitle'), path: localePath(locale, '/tools/build-generator') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('tools.buildPageTitle') },
        ]}
      />
      <h1 className="mb-6 text-3xl font-bold text-white">{t('tools.buildPageTitle')}</h1>
      <BuildGeneratorClient heroes={heroes} locale={locale} />
    </div>
  );
}
