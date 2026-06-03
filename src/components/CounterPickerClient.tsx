"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getHeroes, getHeroBySlug } from "@/lib/data";

export default function CounterPickerClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const enemyParam = searchParams.get("enemy");
  const initialEnemySlugs = enemyParam ? enemyParam.split(",") : [];

  const heroes = getHeroes();
  const [selectedEnemies, setSelectedEnemies] = useState<string[]>(initialEnemySlugs);

  const counters = useMemo(() => {
    const counterCounts: Record<string, number> = {};

    selectedEnemies.forEach((enemySlug) => {
      const enemyHero = getHeroBySlug(enemySlug);
      if (enemyHero) {
        enemyHero.counters.forEach((counterSlug) => {
          counterCounts[counterSlug] = (counterCounts[counterSlug] || 0) + 1;
        });
      }
    });

    return Object.entries(counterCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([slug, count]) => ({
        hero: getHeroBySlug(slug),
        count,
      }))
      .filter((item) => item.hero);
  }, [selectedEnemies]);

  const toggleEnemy = (slug: string) => {
    let newSelected: string[];
    if (selectedEnemies.includes(slug)) {
      newSelected = selectedEnemies.filter((s) => s !== slug);
    } else {
      newSelected = [...selectedEnemies, slug];
    }
    setSelectedEnemies(newSelected);

    const params = new URLSearchParams(searchParams);
    if (newSelected.length > 0) {
      params.set("enemy", newSelected.join(","));
    } else {
      params.delete("enemy");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const fullShareUrl = `https://hokmeta.com${pathname}?${new URLSearchParams({ enemy: selectedEnemies.join(",") }).toString()}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Select Enemy Heroes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {heroes.map((hero) => (
              <button
                key={hero.slug}
                onClick={() => toggleEnemy(hero.slug)}
                className={`px-3 py-2 rounded-lg text-left transition ${selectedEnemies.includes(hero.slug) ? "bg-primary text-white" : "bg-surfaceHover border border-border hover:bg-surface"}`}
              >
                {hero.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Share</h2>
          <input
            type="text"
            value={fullShareUrl}
            readOnly
            className="w-full bg-surfaceHover border border-border rounded-lg px-4 py-3 text-text"
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigator.clipboard.writeText(fullShareUrl)}
              className="bg-surfaceHover border border-border px-4 py-2 rounded-lg hover:bg-surface transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Best Counters</h2>
          {counters.length === 0 ? (
            <p className="text-textSecondary">Select enemy heroes to see counters</p>
          ) : (
            <ul className="space-y-3">
              {counters.map((item) => (
                <li key={item.hero?.slug} className="bg-surfaceHover border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <a href={`/hero/${item.hero?.slug}`} className="text-primary font-semibold hover:underline">
                        {item.hero?.name}
                      </a>
                      <p className="text-sm text-textSecondary">{item.hero?.role} • {item.hero?.winRate}% WR</p>
                    </div>
                    <span className="text-secondary font-bold">{item.count}x</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}