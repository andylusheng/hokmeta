import { notFound } from 'next/navigation';
import { getLearnArticle, getLearnArticles } from '@/lib/learn';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { LearnArticleView } from '@/views/LearnArticleView';

export function generateStaticParams() {
  return getLearnArticles('id').map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug, 'id');
  if (!article) return {};
  return buildMetadata({
    title: defaultTitle(article.title),
    description: article.description,
    path: `/id/learn/${params.slug}`,
    type: 'article',
    locale: 'id',
  });
}

export default function IdLearnArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug, 'id');
  if (!article) notFound();
  return <LearnArticleView slug={params.slug} locale="id" />;
}
