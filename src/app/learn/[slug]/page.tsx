import { notFound } from 'next/navigation';
import { getLearnArticle, getLearnSlugs } from '@/lib/learn';
import { buildMetadata, defaultTitle, authorMeta } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, articleSchema } from '@/lib/schema';

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
  });
}

export default function LearnArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getLearnArticle(params.slug);
  if (!article) notFound();

  return (
    <div className="container-page max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Learn', path: '/learn' },
          { name: article.title, path: `/learn/${params.slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema(
          article.title,
          `/learn/${params.slug}`,
          article.description
        )}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Learn', href: '/learn/' },
          { label: article.title },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{article.title}</h1>
      <p className="mb-4 text-sm text-gray-500">
        By {authorMeta.name} · Published {authorMeta.datePublished} · Updated{' '}
        {authorMeta.dateModified}
      </p>
      <p className="mb-8 text-gray-400">{article.description}</p>
      {article.sections.map((s) => (
        <section key={s.heading} className="mb-8">
          <h2 className="section-title">{s.heading}</h2>
          <p className="leading-relaxed text-gray-300">{s.body}</p>
        </section>
      ))}
    </div>
  );
}
