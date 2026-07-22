import Link from 'next/link';
import { getLearnArticle, getLearnDataNote, learnDataSync } from '@/lib/learn';
import { getHeroBySlug } from '@/lib/data';
import { getHeroDisplayName } from '@/lib/locale-names';
import { authorMeta } from '@/lib/seo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, articleSchema } from '@/lib/schema';

/** Convert article body text (with **bold**, newlines) to HTML */
function formatBody(raw: string): string {
  return raw
    .split(/\n\n+/)
    .map((p) => {
      let html = p
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
      return `<p>${html}</p>`;
    })
    .join('');
}

export function LearnArticleView({
  slug,
  locale = 'en',
}: {
  slug: string;
  locale?: Locale;
}) {
  const t = createT(locale);
  const article = getLearnArticle(slug, locale);
  if (!article) return null;
  const path = `/learn/${slug}`;

  const relatedHero = article.relatedHeroSlug
    ? getHeroBySlug(article.relatedHeroSlug)
    : undefined;

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
        data={articleSchema(article.title, localePath(locale, path), article.description, {
          datePublished: article.datePublished,
          dateModified: article.lastModified,
        })}
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
          published: article.datePublished ?? authorMeta.datePublished,
          updated: article.lastModified ?? learnDataSync,
        })}
      </p>
      <div className="prose prose-invert max-w-none space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-xl font-semibold text-white">{section.heading}</h2>
            <div
              className="article-body text-sm leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: formatBody(section.body) }}
            />
          </section>
        ))}
        <section className="rounded-lg border border-hok-border bg-hok-dark/40 p-4">
          <h2 className="mb-2 text-sm font-semibold text-hok-gold">{t('learn.dataNote')}</h2>
          <p className="text-xs leading-relaxed text-gray-400">{getLearnDataNote(locale)}</p>
        </section>
      </div>

      {/* ── Hero back-links ── */}
      {relatedHero && (
        <div className="mt-8 rounded-lg border border-hok-border bg-hok-card/30 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-400">
            {locale === 'zh-TW'
              ? '相關英雄'
              : locale === 'id'
                ? 'Hero terkait'
                : locale === 'fil'
                  ? 'Kaugnay na hero'
                  : 'Related Hero'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={localePath(locale, `/hero/${relatedHero.slug}`)}
              className="text-sm text-hok-gold hover:underline"
            >
              {locale === 'zh-TW'
                ? `← ${getHeroDisplayName(relatedHero, locale)} 英雄首頁`
                : locale === 'id'
                  ? `← Halaman hero ${getHeroDisplayName(relatedHero, locale)}`
                  : locale === 'fil'
                    ? `← Hero page ni ${getHeroDisplayName(relatedHero, locale)}`
                    : `← ${getHeroDisplayName(relatedHero, locale)} Hero Page`}
            </Link>
            <Link
              href={localePath(locale, `/hero/${relatedHero.slug}/counters`)}
              className="text-sm text-hok-gold hover:underline"
            >
              {locale === 'zh-TW'
                ? `${getHeroDisplayName(relatedHero, locale)} 克制頁 →`
                : locale === 'id'
                  ? `Counter ${getHeroDisplayName(relatedHero, locale)} →`
                  : locale === 'fil'
                    ? `Counters ni ${getHeroDisplayName(relatedHero, locale)} →`
                    : `${getHeroDisplayName(relatedHero, locale)} Counters →`}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
