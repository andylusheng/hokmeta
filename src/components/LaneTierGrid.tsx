import type { Hero } from '@/types/hero';
import type { GameLane, LaneTierBand } from '@/lib/lanes';
import { LANE_TIER_BANDS } from '@/lib/lanes';
import { TierBadge } from '@/components/TierBadge';
import { HeroAvatarGrid } from '@/components/HeroAvatarGrid';
import { type Locale } from '@/lib/i18n';
import { translateLane } from '@/lib/locale-labels';
import { LANE_LABEL } from '@/lib/lanes';

function laneTitle(lane: GameLane, locale: Locale): string {
  const en = LANE_LABEL[lane];
  return translateLane(en, locale) || en;
}

export function LaneTierGrid({
  grouped,
  locale = 'en',
  compact = false,
  maxPerTier = 0,
  avatarSize = 64,
}: {
  grouped: Record<GameLane, Record<LaneTierBand, Hero[]>>;
  locale?: Locale;
  compact?: boolean;
  maxPerTier?: number;
  avatarSize?: number;
}) {
  const lanes = (Object.keys(grouped) as GameLane[]).filter((lane) =>
    LANE_TIER_BANDS.some((t) => grouped[lane][t]?.length)
  );

  const tierColumns =
    avatarSize >= 64
      ? 'grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'
      : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8';

  return (
    <div className={compact ? 'space-y-6' : 'space-y-10'}>
      {lanes.map((lane) => (
        <section key={lane} id={`lane-${lane}`}>
          <h3 className="mb-3 text-lg font-bold text-white sm:text-xl">
            {laneTitle(lane, locale)}
          </h3>
          <div className="space-y-4">
            {LANE_TIER_BANDS.map((tier) => {
              let list = grouped[lane][tier];
              if (!list?.length) return null;
              if (maxPerTier > 0) list = list.slice(0, maxPerTier);
              return (
                <div key={tier} className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-2 shrink-0">
                    <TierBadge tier={tier} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <HeroAvatarGrid
                      heroes={list}
                      locale={locale}
                      size={avatarSize}
                      showTier={false}
                      columns={tierColumns}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
