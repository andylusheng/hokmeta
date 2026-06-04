import { buildMetadata, defaultTitle, authorMeta } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/data';

export const metadata = buildMetadata({
  title: defaultTitle('Privacy Policy'),
  description: 'Privacy policy for HOK Meta — how we handle data on hokmeta.com.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ])}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <h1 className="mb-6 text-3xl font-bold text-white">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-gray-300">
        <p>Last updated: {authorMeta.dateModified}</p>
        <p>
          {site.name} ({site.domain}) publishes Honor of Kings meta guides and
          tools. This site is operated by {authorMeta.name}.
        </p>
        <h2 className="text-lg font-semibold text-white">Information we collect</h2>
        <p>
          We do not require account registration. Standard server and analytics
          logs may record IP address, browser type, and pages visited. Third-party
          ad partners (e.g. Google AdSense) may use cookies per their policies.
        </p>
        <h2 className="text-lg font-semibold text-white">Cookies</h2>
        <p>
          Cookies may be used for advertising, analytics, and site preferences.
          You can disable cookies in your browser settings.
        </p>
        <h2 className="text-lg font-semibold text-white">Contact</h2>
        <p>
          For privacy questions, contact the site operator via the domain{' '}
          {site.domain.replace('https://', '')}.
        </p>
      </div>
    </div>
  );
}
