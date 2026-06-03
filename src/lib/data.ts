import heroesData from "../data/heroes.json";
import patchesData from "../data/patches.json";

export type Hero = typeof heroesData[0];
export type Patch = typeof patchesData[0];

export const getHeroes = (): Hero[] => heroesData;
export const getHeroBySlug = (slug: string): Hero | undefined => heroesData.find(h => h.slug === slug);
export const getTopHeroesByPickRate = (limit: number = 10): Hero[] =>
  [...heroesData].sort((a, b) => b.pickRate - a.pickRate).slice(0, limit);
export const getHeroesByRole = (role: string): Hero[] =>
  heroesData.filter(h => h.role.toLowerCase() === role.toLowerCase());
export const getTopTierHeroes = (): Hero[] =>
  heroesData.filter(h => h.tier === "S+" || h.tier === "S");
export const getRelatedHeroes = (hero: Hero): Hero[] =>
  getHeroesByRole(hero.role).filter(h => h.slug !== hero.slug).slice(0, 3);

export const getPatches = (): Patch[] => patchesData;
export const getPatchBySeason = (season: number): Patch | undefined =>
  patchesData.find(p => p.season === season);

export const roles = ["Jungle", "Mid", "Gold Lane", "Exp Lane", "Roam"] as const;
export const tiers = ["S+", "S", "A", "B", "C", "D"] as const;