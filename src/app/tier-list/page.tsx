import { getTierListGrouped } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { TierListClient } from '@/components/TierListClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Tier List'),
  description:
    'Honor of Kings tier list S+ to C grouped by role — win rate, pick rate, and ban rate driven.',
  path: '/tier-list',
});

export default function TierListPage() {
  const grouped = getTierListGrouped();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tier List', path: '/tier-list' },
        ])}
      />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Tier List' }]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">HOK Tier List</h1>
      <p className="mb-8 text-gray-400">
        Grouped by tier band and role. Stats sourced from heroes.json.
      </p>
      <TierListClient grouped={grouped} />
    </div>
  );
}
