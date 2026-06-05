import { learnArticles } from '@/lib/learn';
import { absoluteUrl, buildMetadata, defaultTitle } from '@/lib/seo';
import { LearnCard } from '@/components/LearnCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Learn HOK Meta'),
  description:
    'High-impact Honor of Kings guides: 5-stack comps, fast push, piggyback strategy, jungle tier list, and rank climb tips.',
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
      <h1 className="mb-2 text-3xl font-bold text-white">Learning Hub</h1>
      <p className="mb-6 text-gray-400">
        Meta comps, rank strategies, and counter guides — backed by Camp HOK data.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {learnArticles.map((a) => (
          <LearnCard
            key={a.slug}
            title={a.title}
            description={a.description}
            href={`/learn/${a.slug}/`}
            badge={a.badge}
          />
        ))}
      </div>
    </div>
  );
}
