import { getLearnArticles } from '@/lib/learn';
import { absoluteUrl } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { LearnCard } from '@/components/LearnCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';

export function LearnIndexView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const articles = getLearnArticles(locale);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('learn.title'), path: localePath(locale, '/learn') },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          'HOK Meta Learning Hub',
          articles.map((a) => ({
            name: a.title,
            url: absoluteUrl(localePath(locale, `/learn/${a.slug}`)),
          }))
        )}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('learn.title') },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{t('learn.title')}</h1>
      <p className="mb-6 text-gray-400">{t('learn.subtitle')}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          <LearnCard
            key={a.slug}
            title={a.title}
            description={a.description}
            href={localePath(locale, `/learn/${a.slug}`)}
            badge={a.badge}
          />
        ))}
      </div>
    </div>
  );
}
