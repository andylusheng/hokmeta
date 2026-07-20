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
  /** Camp zh-TW equip name when synced */
  nameZh?: string | null;
  description: string;
  descriptionZh?: string | null;
  descLabel?: string | null;
  descLabelZh?: string | null;
  icon: string;
  gold: number | null;
  type: string | null;
  level?: number | null;
  /** Camp passive skill text (bilingual) */
  passiveSkills?: string[];
  passiveSkillsZh?: string[];
}

export interface PatchEntry {
  version: string;
  change: string;
  seasonName?: string;
  seasonId?: string;
  versionName?: string | null;
  publishedAt?: string | null;
  isCurrent?: boolean;
  tag?: string | null;
  detail?: string | null;
}

export interface ArcanaRune {
  id: string;
  name: string;
  nameZh?: string | null;
  icon: string;
  description: string;
  descriptionZh?: string | null;
  level?: number | null;
  color?: number | null;
  usedByCount?: number;
}

export interface SeasonPatchChange {
  heroSlug: string;
  heroName: string;
  heroNameZh?: string | null;
  tag?: string | null;
  change: string;
  changeZh?: string | null;
  detail?: string | null;
  detailZh?: string | null;
  versionName?: string | null;
  publishedAt?: string | null;
}

export interface SeasonPatchGroup {
  seasonName: string;
  seasonId?: string;
  changes: SeasonPatchChange[];
}

export interface PatchesMeta {
  season: string;
  currentSeason: string;
  source: string;
  updated: string;
  heroCount: number;
  notes?: string;
  seasons: SeasonPatchGroup[];
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
  /** Camp wide splash / cover art */
  heroCover?: string | null;
  tencentId?: number;
  roles?: string;
  lane?: string | null;
  dataSource?: string;
  dataUpdated?: string;
  skills: HeroSkill[];
  /** Camp zh-TW skills (Traditional Chinese) */
  skillsZh?: HeroSkill[];
  build: HeroBuildItem[];
  buildZh?: HeroBuildItem[];
  builds?: HeroBuildPreset[];
  buildsZh?: HeroBuildPreset[];
  arcana: string[];
  arcanaZh?: string[];
  spells: string[];
  spellsZh?: string[];
  /** Camp zh-TW display name */
  nameZh?: string | null;
  laneZh?: string | null;
  rolesZh?: string | null;
  counters: string[];
  counteredBy: string[];
  tips: string[];
  patchHistory: PatchEntry[];
  patchHistoryZh?: PatchEntry[];
  faqs: HeroFaq[];
  faqsZh?: HeroFaq[];
  metaAnalysis: string[];
  metaAnalysisZh?: string[];
  tipsZh?: string[];
  guide?: HeroGuide;
}

export type KeywordsMap = Record<string, string[]>;

/** Lightweight hero entry for list pages & client components (no skills/builds/guide/faqs/patchHistory). */
export type HeroIndexEntry = Omit<
  Hero,
  | 'skills'
  | 'skillsZh'
  | 'build'
  | 'buildZh'
  | 'builds'
  | 'buildsZh'
  | 'guide'
  | 'faqs'
  | 'faqsZh'
  | 'patchHistory'
  | 'patchHistoryZh'
  | 'metaAnalysis'
  | 'metaAnalysisZh'
  | 'tips'
  | 'tipsZh'
> & {
  patchHistory?: PatchEntry[];
};

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
