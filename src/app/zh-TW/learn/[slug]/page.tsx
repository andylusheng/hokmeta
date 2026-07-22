import { notFound } from 'next/navigation';
import { getLearnArticle, getLearnSlugs, slugToDate } from '@/lib/learn';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { site } from '@/lib/data';
import { LearnArticleView } from '@/views/LearnArticleView';

export function generateStaticParams() {
  return getLearnSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug, 'zh-TW');
  if (!article) return {};
  return buildMetadata({
    title: defaultTitle(article.title),
    description: article.description,
    path: `/learn/${params.slug}`,
    type: 'article',
    locale: 'zh-TW',
    publishedTime: article.datePublished,
    modifiedTime: article.lastModified ?? slugToDate(article.slug, new Date(site.dateModified)),
  });
}

export default function ZhTWLearnArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug, 'zh-TW');
  if (!article) notFound();
  return <LearnArticleView slug={params.slug} locale="zh-TW" />;
}
