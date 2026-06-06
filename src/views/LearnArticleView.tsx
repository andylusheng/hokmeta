import { getLearnArticle, learnDataNote, learnDataSync } from '@/lib/learn';
import { authorMeta } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, articleSchema } from '@/lib/schema';

export function LearnArticleView({
  slug,
  locale = 'en',
}: {
  slug: string;
  locale?: Locale;
}) {
  const t = createT(locale);
  const article = getLearnArticle(slug);
  if (!article) return null;
  const path = `/learn/${slug}`;

  return (
    <div className="container-page max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('learn.title'), path: localePath(locale, '/learn') },
          { name: article.title, path: localePath(locale, path) },
        ])}
      />
      <JsonLd
        data={articleSchema(article.title, localePath(locale, path), article.description)}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('learn.title'), href: localePath(locale, '/learn') },
          { label: article.title },
        ]}
      />
      {locale === 'zh-TW' && (
        <p className="mb-4 rounded-lg border border-hok-border/80 bg-hok-card/40 px-4 py-3 text-sm text-gray-400">
          {t('common.learnBodyNotice')}
        </p>
      )}
      <h1 className="mb-2 text-3xl font-bold text-white">{article.title}</h1>
      <p className="mb-4 text-sm text-gray-500">
        {t('learn.byAuthor', {
          author: authorMeta.name,
          published: authorMeta.datePublished,
          updated: learnDataSync,
        })}
      </p>
      <div className="prose prose-invert max-w-none space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-xl font-semibold text-white">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-gray-300">{section.body}</p>
          </section>
        ))}
        <section className="rounded-lg border border-hok-border bg-hok-dark/40 p-4">
          <h2 className="mb-2 text-sm font-semibold text-hok-gold">{t('learn.dataNote')}</h2>
          <p className="text-xs leading-relaxed text-gray-400">{learnDataNote}</p>
        </section>
      </div>
    </div>
  );
}
