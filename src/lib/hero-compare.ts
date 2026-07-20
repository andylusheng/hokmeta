/**
 * hero-compare.ts
 * Generates same-role hero comparison pairs for /compare/[pair] pages.
 * Each pair slug is "slug-a-vs-slug-b" (alphabetical order within role).
 */
import { heroes } from '@/lib/data';
import type { HeroIndexEntry, HeroRole } from '@/types/hero';

export interface ComparePair {
  /** URL param: "slug-a-vs-slug-b" */
  pair: string;
  slugA: string;
  slugB: string;
  role: HeroRole;
}

const TOP_PER_ROLE = 9; // C(9,2)=36 × 6 roles = 216 pairs

let _pairs: ComparePair[] | null = null;

/** Generate all comparison pairs (top N per role by pick rate). */
export function getComparePairs(): ComparePair[] {
  if (_pairs) return _pairs;

  const roles: HeroRole[] = ['Tank', 'Warrior', 'Assassin', 'Mage', 'Marksman', 'Support'];
  const result: ComparePair[] = [];

  for (const role of roles) {
    const inRole = heroes
      .filter((h) => h.role === role)
      .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))
      .slice(0, TOP_PER_ROLE);

    for (let i = 0; i < inRole.length; i++) {
      for (let j = i + 1; j < inRole.length; j++) {
        const a = inRole[i];
        const b = inRole[j];
        // alphabetical order for consistent URLs
        const [first, second] = a.slug < b.slug ? [a, b] : [b, a];
        result.push({
          pair: `${first.slug}-vs-${second.slug}`,
          slugA: first.slug,
          slugB: second.slug,
          role,
        });
      }
    }
  }

  _pairs = result;
  return result;
}

/** Get a single pair by its URL param. */
export function getComparePair(pair: string): ComparePair | undefined {
  return getComparePairs().find((p) => p.pair === pair);
}

/** Get both heroes for a pair. */
export function getCompareHeroes(pair: ComparePair): [HeroIndexEntry, HeroIndexEntry] | null {
  const a = heroes.find((h) => h.slug === pair.slugA);
  const b = heroes.find((h) => h.slug === pair.slugB);
  if (!a || !b) return null;
  return [a, b];
}

/** Get related pairs (same role, sharing one hero). */
export function getRelatedPairs(pair: ComparePair, limit = 6): ComparePair[] {
  return getComparePairs()
    .filter((p) => p.pair !== pair.pair && p.role === pair.role)
    .filter((p) => p.slugA === pair.slugA || p.slugB === pair.slugA || p.slugA === pair.slugB || p.slugB === pair.slugB)
    .slice(0, limit);
}
