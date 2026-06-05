import { buildMetadata, defaultTitle, authorMeta } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, articleSchema } from '@/lib/schema';
import { site, heroes } from '@/lib/data';

export const metadata = buildMetadata({
  title: defaultTitle('About'),
  description:
    'About HOK Meta — data-driven Honor of Kings tier lists, builds, and guides by the HOK Meta Team.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <JsonLd
        data={articleSchema(
          'About HOK Meta',
          '/about',
          site.description
        )}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <h1 className="mb-6 text-3xl font-bold text-white">About HOK Meta</h1>
      <div className="space-y-4 text-sm leading-relaxed text-gray-300">
        <p>{site.description}</p>
        <p>
          We cover {heroes.length} Honor of Kings <strong className="text-white">global server</strong> heroes
          with English skills, item builds (icons + descriptions), Arcana, counters,
          and Camp HOK win/pick/ban stats. Data is synced from official Camp metrics
          and HoKStats.gg international references — not invented.
        </p>
        <p>
          <strong className="text-white">Editorial:</strong> {authorMeta.name}
          <br />
          <strong className="text-white">Published:</strong>{' '}
          {authorMeta.datePublished}
          <br />
          <strong className="text-white">Updated:</strong>{' '}
          {authorMeta.dateModified}
        </p>
      </div>
    </div>
  );
}
