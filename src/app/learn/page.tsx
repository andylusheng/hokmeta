import { learnArticles } from '@/lib/learn';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { LearnCard } from '@/components/LearnCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Learn HOK Meta'),
  description:
    'Ten pillar guides on jungling, solo queue, counters, tier lists, and post-patch hero picks.',
  path: '/learn',
});

export default function LearnIndexPage() {
  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Learn', path: '/learn' },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          'HOK Meta Learning Hub',
          learnArticles.map((a) => ({
            name: a.title,
            url: absoluteUrl(`/learn/${a.slug}`),
          }))
        )}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Learn' }]} />
      <h1 className="mb-6 text-3xl font-bold text-white">Learning Hub</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {learnArticles.map((a) => (
          <LearnCard
            key={a.slug}
            title={a.title}
            description={a.description}
            href={`/learn/${a.slug}/`}
          />
        ))}
      </div>
    </div>
  );
}
