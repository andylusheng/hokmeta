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
  dataSource?: string;
  dataUpdated?: string;
  build: HeroBuildItem[];
  arcana: string[];
  spells: string[];
  counters: string[];
  counteredBy: string[];
  tips: string[];
  patchHistory: PatchEntry[];
  faqs: HeroFaq[];
  metaAnalysis: string[];
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

export const TIERS: HeroTier[] = ['S+', 'S', 'A', 'B', 'C'];
