import { getTierListByRole } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { TierListClient } from '@/components/TierListClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, tierListSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Tier List'),
  description:
    'Honor of Kings tier list by role — Tank, Warrior, Assassin, Mage, Marksman, Support — S+ to B tiers from Camp HOK stats.',
  path: '/tier-list',
});

export default function TierListPage() {
  const grouped = getTierListByRole();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tier List', path: '/tier-list' },
        ])}
      />
      <JsonLd data={tierListSchema(grouped)} />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Tier List' }]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">HOK Tier List</h1>
      <p className="mb-8 text-gray-400">
        Grouped by primary role (Assassin → Warrior), then S+ / S / A / B within
        each role. Stats from Camp HOK (heroes.json).
      </p>
      <TierListClient grouped={grouped} />
    </div>
  );
}
