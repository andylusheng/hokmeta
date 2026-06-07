import type { LaneTierBand } from '@/lib/lanes';

const CLASS: Record<LaneTierBand, string> = {
  S: 'tier-badge-s',
  A: 'tier-badge-a',
  B: 'tier-badge-b',
  C: 'tier-badge-c',
  D: 'tier-badge-d',
};

export function TierBadge({ tier }: { tier: LaneTierBand }) {
  return <span className={CLASS[tier]}>{tier}</span>;
}
