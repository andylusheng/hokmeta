"use client";

import { useState } from "react";
import { HeroCard } from "@/components/HeroCard";
import { getHeroes, roles } from "@/lib/data";

export default function TierListClient() {
  const heroes = getHeroes();
  const [selectedRole, setSelectedRole] = useState<string>("All");

  const filteredHeroes = selectedRole === "All"
    ? heroes
    : heroes.filter(h => h.role === selectedRole);

  const sortedHeroes = [...filteredHeroes].sort((a, b) => {
    const tierOrder = { "S+": 0, "S": 1, "A": 2, "B": 3, "C": 4, "D": 5 };
    return tierOrder[a.tier as keyof typeof tierOrder] - tierOrder[b.tier as keyof typeof tierOrder];
  });

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedRole("All")}
          className={`px-4 py-2 rounded-lg transition ${selectedRole === "All" ? "bg-primary text-white" : "bg-surface border border-border hover:bg-surfaceHover"}`}
        >
          All
        </button>
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-lg transition ${selectedRole === role ? "bg-primary text-white" : "bg-surface border border-border hover:bg-surfaceHover"}`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedHeroes.map(hero => (
          <HeroCard key={hero.slug} hero={hero} showTier />
        ))}
      </div>
    </>
  );
}