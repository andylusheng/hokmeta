import Link from 'next/link';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('HOK Tools'),
  description:
    'Free Honor of Kings tools: build generator and counter picker from local meta data.',
  path: '/tools',
});

const TOOLS = [
  {
    href: '/tools/build-generator/',
    title: 'Build Generator',
    description: 'View item build paths for every meta hero from heroes.json.',
  },
  {
    href: '/tools/counter-picker/',
    title: 'Counter Picker',
    description: 'Find counter picks against any hero in the meta roster.',
  },
];

export default function ToolsPage() {
  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tools', path: '/tools' },
        ])}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} />
      <h1 className="mb-2 text-3xl font-bold text-white">HOK Meta Tools</h1>
      <p className="mb-8 text-gray-400">
        Data-driven tools — no AI APIs, all results from local JSON.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="card block hover:border-hok-gold/50">
            <h2 className="mb-2 text-lg font-semibold text-white">{t.title}</h2>
            <p className="text-sm text-gray-400">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
