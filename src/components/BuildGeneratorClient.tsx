"use client";

import { useState } from "react";
import { getHeroes } from "@/lib/data";

export default function BuildGeneratorClient() {
  const heroes = getHeroes();
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  const hero = heroes.find(h => h.slug === selectedHero);

  return (
    <>
      <div className="bg-surface border border-border rounded-lg p-6 mb-8">
        <label className="block text-sm font-semibold mb-2">Select Hero</label>
        <select
          value={selectedHero || ""}
          onChange={(e) => setSelectedHero(e.target.value)}
          className="w-full bg-surfaceHover border border-border rounded-lg px-4 py-3 text-text"
        >
          <option value="">Choose a hero</option>
          {heroes.map((h) => (
            <option key={h.slug} value={h.slug}>{h.name} - {h.role}</option>
          ))}
        </select>
      </div>

      {hero && (
        <div className="space-y-8">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{hero.name} Build</h2>
            <p className="text-textSecondary mb-6">
              {hero.name} has a {hero.winRate}% win rate. This build maximizes {hero.role === "Jungle" || hero.role === "Exp Lane" ? "survivability and damage" : "damage and attack speed"}.
            </p>

            <h3 className="font-semibold mb-3">Core Items</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {hero.build.items.map((item, i) => (
                <span key={i} className="bg-surfaceHover border border-border px-3 py-1 rounded">{item}</span>
              ))}
            </div>

            <h3 className="font-semibold mb-3">Best Arcana</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {hero.arcana.map((arcana, i) => (
                <span key={i} className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded">{arcana}</span>
              ))}
            </div>

            <a href={`/hero/${hero.slug}`} className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition">
              View Full Guide
            </a>
          </div>
        </div>
      )}
    </>
  );
}