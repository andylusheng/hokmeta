import { notFound } from 'next/navigation';
import { getLearnArticle, getLearnSlugs } from '@/lib/learn';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { LearnArticleView } from '@/views/LearnArticleView';

export function generateStaticParams() {
  return getLearnSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: defaultTitle(article.title),
    description: article.description,
    path: `/learn/${params.slug}`,
    type: 'article',
    locale: 'zh-TW',
  });
}

export default function ZhTWLearnArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug);
  if (!article) notFound();
  return <LearnArticleView slug={params.slug} locale="zh-TW" />;
}
