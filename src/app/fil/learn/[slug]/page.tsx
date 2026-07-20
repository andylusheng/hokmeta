import { notFound } from 'next/navigation';
import { getLearnArticle, getLearnArticles, slugToDate } from '@/lib/learn';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { site } from '@/lib/data';
import { LearnArticleView } from '@/views/LearnArticleView';

export function generateStaticParams() {
  return getLearnArticles('fil').map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug, 'fil');
  if (!article) return {};
  return buildMetadata({
    title: defaultTitle(article.title),
    description: article.description,
    path: `/fil/learn/${params.slug}`,
    type: 'article',
    locale: 'fil',
    modifiedTime: article.lastModified ?? slugToDate(article.slug, new Date(site.dateModified)),
  });
}

export default function FilLearnArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug, 'fil');
  if (!article) notFound();
  return <LearnArticleView slug={params.slug} locale="fil" />;
}
