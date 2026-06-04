import { heroes } from '@/lib/data';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { CounterPickerClient } from '@/components/CounterPickerClient';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: defaultTitle('Counter Picker'),
  description: 'Pick counters for any meta hero using local counter matchup data.',
  path: '/tools/counter-picker',
});

export default function CounterPickerPage() {
  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Counter Picker', path: '/tools/counter-picker' },
        ])}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Counter Picker' },
        ]}
      />
      <h1 className="mb-6 text-3xl font-bold text-white">Counter Picker</h1>
      <CounterPickerClient heroes={heroes} />
    </div>
  );
}
