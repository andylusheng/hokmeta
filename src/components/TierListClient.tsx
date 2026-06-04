'use client';

import type { HeroRole, HeroTier } from '@/types/hero';
import type { Hero } from '@/types/hero';
import { TierCard } from '@/components/TierCard';
import { ROLES, TIERS } from '@/types/hero';

export function TierListClient({
  grouped,
}: {
  grouped: Record<HeroTier, Record<HeroRole, Hero[]>>;
}) {
  return (
    <div className="space-y-10">
      {TIERS.map((tier) => (
        <section key={tier} id={`tier-${tier.replace('+', 'plus')}`}>
          <h2 className="mb-4 text-2xl font-bold text-hok-gold">Tier {tier}</h2>
          <div className="space-y-6">
            {ROLES.map((role) => {
              const list = grouped[tier][role];
              if (!list.length) return null;
              return (
                <div key={role}>
                  <h3 className="mb-2 text-lg font-semibold text-white">{role}</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {list.map((hero) => (
                      <TierCard key={hero.slug} hero={hero} />
                    ))}
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
