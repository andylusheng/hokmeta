'use client';

import type { Hero, HeroRole, HeroTier } from '@/types/hero';
import { ROLES_AZ } from '@/types/hero';
import { TierCard } from '@/components/TierCard';

const DISPLAY_TIERS: HeroTier[] = ['S+', 'S', 'A', 'B'];

const TIER_LABEL: Record<HeroTier, string> = {
  'S+': 'S+',
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
};

export function TierListClient({
  grouped,
}: {
  grouped: Record<HeroRole, Record<HeroTier, Hero[]>>;
}) {
  return (
    <div>
      <nav
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Jump to role"
      >
        {ROLES_AZ.map((role) => {
          const roleTiers = grouped[role];
          const count = DISPLAY_TIERS.reduce(
            (n, t) => n + (roleTiers[t]?.length ?? 0),
            0
          );
          if (!count) return null;
          return (
            <a
              key={role}
              href={`#role-${role.toLowerCase()}`}
              className="rounded border border-hok-border bg-hok-card px-3 py-1.5 text-sm text-gray-300 transition hover:border-hok-gold/50 hover:text-white"
            >
              {role}
              <span className="ml-1 text-xs text-gray-500">({count})</span>
            </a>
          );
        })}
      </nav>

      <div className="space-y-10">
        {ROLES_AZ.map((role) => {
          const roleTiers = grouped[role];
          const hasHeroes = DISPLAY_TIERS.some((t) => roleTiers[t]?.length);
          if (!hasHeroes) return null;

          return (
            <section key={role} id={`role-${role.toLowerCase()}`}>
              <h2 className="mb-1 text-2xl font-bold text-hok-gold">{role}</h2>
              <p className="mb-4 text-sm text-gray-500">
                Primary role · S+ through B · sorted by win rate within each tier
              </p>
              <div className="space-y-6">
                {DISPLAY_TIERS.map((tier) => {
                  const list = roleTiers[tier];
                  if (!list?.length) return null;
                  return (
                    <div key={tier}>
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        Tier {TIER_LABEL[tier]}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {list.map((hero) => (
                          <TierCard key={hero.slug} hero={hero} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
