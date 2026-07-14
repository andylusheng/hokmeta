import metaTrendsData from '../../data/meta-trends.json';
import type { Locale } from '@/lib/i18n';

export interface MetaTrendDelta {
  winRate: number | null;
  pickRate: number | null;
  banRate: number | null;
}

export interface MetaTrendHero {
  slug: string;
  name: string;
  role: string;
  lane: string | null;
  tier: string;
  winRate: number | null;
  pickRate: number | null;
  banRate: number | null;
  delta7d: MetaTrendDelta;
  delta30d: MetaTrendDelta;
  history30d: MetaTrendHistoryPoint[];
}

export interface MetaTrendHistoryPoint {
  date: string;
  winRate: number | null;
  pickRate: number | null;
  banRate: number | null;
}

export interface MetaTrendRoleMover {
  role: string;
  topWinRate: MetaTrendHero[];
  rising: MetaTrendHero[];
  mostPicked: MetaTrendHero[];
}

export interface MetaTrendLaneLeader {
  lane: string;
  leaders: MetaTrendHero[];
}

export interface MetaTrendContentIdea {
  title: string;
  angle: string;
  primaryUrl: string;
}

export interface MetaTrends {
  generatedAt: string;
  source: {
    database: string;
    table: string;
    note: string;
  };
  latestDate: string;
  comparisonDates: {
    sevenDay: string;
    thirtyDay: string;
  };
  coverage: {
    trackedDays: number;
    totalRows: number;
    latestHeroCount: number;
    daysCompared7d: number;
    daysCompared30d: number;
  };
  allHeroes: MetaTrendHero[];
  topWinRate: MetaTrendHero[];
  lowestWinRate: MetaTrendHero[];
  mostPicked: MetaTrendHero[];
  mostBanned: MetaTrendHero[];
  risingWinRate: MetaTrendHero[];
  risingPickRate: MetaTrendHero[];
  risingBanRate: MetaTrendHero[];
  fallingWinRate: MetaTrendHero[];
  sleeperPicks: MetaTrendHero[];
  overratedPicks: MetaTrendHero[];
  laneLeaders: MetaTrendLaneLeader[];
  roleMovers: MetaTrendRoleMover[];
  contentIdeas: MetaTrendContentIdea[];
}

export const metaTrends = metaTrendsData as MetaTrends;

export function trendRate(value: number | null): string {
  return value == null ? 'N/A' : `${value.toFixed(2)}%`;
}

export function trendDelta(value: number | null): string {
  if (value == null) return 'N/A';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)} pts`;
}

export function trendDirection(value: number | null): 'up' | 'down' | 'flat' {
  if (value == null || Math.abs(value) < 0.01) return 'flat';
  return value > 0 ? 'up' : 'down';
}

export function getTrendHero(slug: string): MetaTrendHero | undefined {
  return metaTrends.allHeroes.find((hero) => hero.slug === slug);
}

export function laneLabel(lane: string | null, locale: Locale = 'en'): string {
  if (!lane) {
    if (locale === 'zh-TW') return '未指定分路';
    if (locale === 'id') return 'Belum ditentukan';
    if (locale === 'fil') return 'Hindi pa nakatakda';
    return 'Unassigned';
  }
  if (locale === 'zh-TW') {
    if (lane === 'Clash') return '對抗路';
    if (lane === 'Jungle') return '打野';
    if (lane === 'Mid') return '中路';
    if (lane === 'Farm') return '發育路';
    if (lane === 'Roam') return '遊走';
  }
  if (locale === 'id') {
    if (lane === 'Clash') return 'Clash Lane';
    if (lane === 'Jungle') return 'Jungle';
    if (lane === 'Mid') return 'Mid Lane';
    if (lane === 'Farm') return 'Farm Lane';
    if (lane === 'Roam') return 'Roam';
  }
  if (locale === 'fil') {
    if (lane === 'Clash') return 'Clash Lane';
    if (lane === 'Jungle') return 'Jungle';
    if (lane === 'Mid') return 'Mid Lane';
    if (lane === 'Farm') return 'Farm Lane';
    if (lane === 'Roam') return 'Roam';
  }
  if (lane === 'Clash') return 'Clash Lane';
  if (lane === 'Jungle') return 'Jungle';
  if (lane === 'Mid') return 'Mid Lane';
  if (lane === 'Farm') return 'Farm Lane';
  if (lane === 'Roam') return 'Roam';
  return lane;
}
