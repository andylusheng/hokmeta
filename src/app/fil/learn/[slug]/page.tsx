import { notFound } from 'next/navigation';
import { getLearnArticle, getLearnArticles } from '@/lib/learn';
import { buildMetadata, defaultTitle } from '@/lib/seo';
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
