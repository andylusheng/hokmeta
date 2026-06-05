export type HeroRole =
  | 'Tank'
  | 'Warrior'
  | 'Assassin'
  | 'Mage'
  | 'Marksman'
  | 'Support';

export type HeroDifficulty = 'Easy' | 'Medium' | 'Hard';
export type HeroTier = 'S+' | 'S' | 'A' | 'B' | 'C';

export interface HeroBuildItem {
  name: string;
  slot: number;
  itemId?: string | null;
  icon?: string | null;
  description?: string | null;
}

export interface HeroBuildPreset {
  id: string;
  label: string;
  position?: string | null;
  lane?: string | null;
  items: HeroBuildItem[];
}

export type HeroSkillSlot = 'passive' | 'skill1' | 'skill2' | 'ultimate';

export interface HeroSkill {
  slot: HeroSkillSlot;
  name: string;
  description: string;
  icon: string;
  cooldown?: string | null;
}

export interface GameItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  gold: number | null;
  type: string | null;
}

export interface PatchEntry {
  version: string;
  change: string;
}

export interface HeroFaq {
  id: string;
  question: string;
  answer: string;
}

export interface HeroGuideMatchups {
  strongInto: string[];
  weakInto: string[];
  summary: string;
}

export interface HeroSkillOrder {
  priority: string;
  reason: string;
}

export interface HeroCombo {
  id: string;
  name: string;
  steps: string;
  when: string;
}

export interface HeroItemNote {
  slot: number;
  why: string;
}

export interface HeroArcanaRow {
  slot: string;
  rune: string;
  effect: string;
}

export interface HeroGuide {
  overview: string;
  /** One-line hero identity for the summary card */
  hook?: string;
  bestBuild: string;
  arcanaSpells: string;
  combo: string;
  skillOrder?: HeroSkillOrder;
  combos?: HeroCombo[];
  itemNotes?: HeroItemNote[];
  arcanaRows?: HeroArcanaRow[];
  laning: string;
  teamfight: string;
  highRank: string;
  comparisons: string[];
  matchups: HeroGuideMatchups;
}

export interface Hero {
  id: string;
  slug: string;
  name: string;
  role: HeroRole;
  difficulty: HeroDifficulty;
  tier: HeroTier;
  winRate: number | null;
  pickRate: number | null;
  banRate: number | null;
  rank: number | null;
  avatar: string;
  avatarFallback?: string;
  tencentId?: number;
  roles?: string;
  lane?: string | null;
  dataSource?: string;
  dataUpdated?: string;
  skills: HeroSkill[];
  build: HeroBuildItem[];
  builds?: HeroBuildPreset[];
  arcana: string[];
  spells: string[];
  counters: string[];
  counteredBy: string[];
  tips: string[];
  patchHistory: PatchEntry[];
  faqs: HeroFaq[];
  metaAnalysis: string[];
  guide?: HeroGuide;
}

export type KeywordsMap = Record<string, string[]>;

export const ROLES: HeroRole[] = [
  'Tank',
  'Warrior',
  'Assassin',
  'Mage',
  'Marksman',
  'Support',
];

/** Primary role sections — alphabetical (Assassin → Warrior). */
export const ROLES_AZ: HeroRole[] = [...ROLES].sort((a, b) =>
  a.localeCompare(b)
);

export const TIERS: HeroTier[] = ['S+', 'S', 'A', 'B', 'C'];
