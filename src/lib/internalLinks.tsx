import Link from "next/link";
import { getRelatedHeroes, getTopTierHeroes } from "./data";
import type { Hero } from "./data";

export const InternalLinks = ({ hero, pageType }: { hero?: Hero; pageType: string }) => {
  const topTierHeroes = getTopTierHeroes();
  const relatedHeroes = hero ? getRelatedHeroes(hero) : [];

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Related</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Top Tier Heroes</h3>
          <ul className="space-y-2">
            {topTierHeroes.map((h) => (
              <li key={h.slug}>
                <Link href={`/hero/${h.slug}`} className="text-textSecondary hover:text-primary transition">
                  {h.name} - {h.tier} Tier
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {hero && relatedHeroes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Similar Heroes</h3>
            <ul className="space-y-2">
              {relatedHeroes.map((h) => (
                <li key={h.slug}>
                  <Link href={`/hero/${h.slug}`} className="text-textSecondary hover:text-primary transition">
                    {h.name} - {h.role}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};