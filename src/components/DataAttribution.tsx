import Link from 'next/link';
import { site } from '@/lib/data';

interface DataAttributionProps {
  dataSource?: string | null;
  dataUpdated?: string | null;
  /** Hero or page label for the attribution line */
  subject?: string;
}

export function DataAttribution({
  dataSource,
  dataUpdated,
  subject,
}: DataAttributionProps) {
  const source =
    dataSource?.trim() ||
    'Camp HOK ranked stats + HoKStats.gg international builds & counters';
  const updated = dataUpdated?.trim() || site.dateModified;

  return (
    <aside
      className="mb-8 rounded-lg border border-hok-gold/25 bg-hok-card/60 px-4 py-3 text-sm leading-relaxed text-gray-400"
      aria-label="Data sources and editorial policy"
    >
      <p className="mb-1 font-medium text-gray-300">
        {subject ? `${subject} — ` : ''}Meta data &amp; editorial
      </p>
      <ul className="list-inside list-disc space-y-1 text-xs sm:text-sm">
        <li>
          <span className="text-gray-500">Sources:</span> {source}
        </li>
        <li>
          <span className="text-gray-500">Last synced:</span> {updated}
        </li>
        <li>
          Builds list <strong className="font-normal text-gray-300">end-game</strong>{' '}
          items; in-match purchase order may differ. Win/pick/ban and builds are
          re-synced after each Camp HOK data pull.
        </li>
        <li>
          Edited by{' '}
          <Link href="/about/" className="text-hok-gold hover:underline">
            {site.author}
          </Link>
          . Not affiliated with Tencent or Level Infinite.
        </li>
      </ul>
    </aside>
  );
}
