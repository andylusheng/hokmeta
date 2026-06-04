import Link from "next/link";
import { getRelatedHeroes, getTopTierHeroes } from "./data";
import type { Hero } from "./data";
import HeroAvatar from "@/components/HeroAvatar";

export const InternalLinks = ({ hero, pageType }: { hero?: Hero; pageType: string }) => {
  const topTierHeroes = getTopTierHeroes();
  const relatedHeroes = hero ? getRelatedHeroes(hero) : [];

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Related</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Top Tier Heroes</h3>
          <div className="flex flex-wrap gap-3">
            {topTierHeroes.map((h) => (
              <Link key={h.slug} href={`/hero/${h.slug}`} className="group">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-surfaceHover transition">
                  {h.avatar ? (
                    <HeroAvatar avatar={h.avatar} name={h.name} size="sm" />
                  ) : (
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                      {h.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-textSecondary group-hover:text-primary transition">{h.name} - {h.tier}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {hero && relatedHeroes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Similar Heroes</h3>
            <div className="flex flex-wrap gap-3">
              {relatedHeroes.map((h) => (
                <Link key={h.slug} href={`/hero/${h.slug}`} className="group">
                  <div className="flex items-center gap-2 p-2 rounded hover:bg-surfaceHover transition">
                    {h.avatar ? (
                      <HeroAvatar avatar={h.avatar} name={h.name} size="sm" />
                    ) : (
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                        {h.name.charAt(0)}
                    </div>
                  )}
                    <span className="text-textSecondary group-hover:text-primary transition">{h.name} - {h.role}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};