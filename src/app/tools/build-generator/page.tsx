import { heroes } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { BuildGeneratorClient } from '@/components/BuildGeneratorClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Build Generator'),
  description: 'Generate Honor of Kings item builds from verified hero JSON data.',
  path: '/tools/build-generator',
});

export default function BuildGeneratorPage() {
  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Build Generator', path: '/tools/build-generator' },
        ])}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Build Generator' },
        ]}
      />
      <h1 className="mb-6 text-3xl font-bold text-white">Build Generator</h1>
      <BuildGeneratorClient heroes={heroes} />
    </div>
  );
}
