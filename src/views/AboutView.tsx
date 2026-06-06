import { site, heroes } from '@/lib/data';
import { authorMeta } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, articleSchema } from '@/lib/schema';

export function AboutView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  return (
    <div className="container-page max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.about'), path: localePath(locale, '/about') },
        ])}
      />
      <JsonLd
        data={articleSchema(t('about.title'), localePath(locale, '/about'), site.description)}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.about') },
        ]}
      />
      <h1 className="mb-6 text-3xl font-bold text-white">{t('about.title')}</h1>
      <div className="space-y-4 text-sm leading-relaxed text-gray-300">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2', { count: heroes.length })}</p>
        <p>
          <strong className="text-white">{t('about.editorial')}</strong> {authorMeta.name}
          <br />
          <strong className="text-white">{t('about.published')}</strong>{' '}
          {authorMeta.datePublished}
          <br />
          <strong className="text-white">{t('about.updated')}</strong>{' '}
          {authorMeta.dateModified}
        </p>
      </div>
    </div>
  );
}
