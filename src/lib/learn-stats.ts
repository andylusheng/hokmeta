import {
  heroes,
  getHeroesByRole,
  formatRate,
  getMostPickedHeroes,
  getMostBannedHeroes,
  getRecentMetaChanges,
} from '@/lib/data';
import type { Hero, HeroRole } from '@/types/hero';

export const DATA_SYNC = heroes[0]?.dataUpdated ?? 'latest Camp HOK pull';

export const GLOBAL_VS_CN_EN =
  `Stats from Camp HOK international ranked (synced ${DATA_SYNC}), cross-checked against HoKStats.gg builds and counters. ` +
  '国服 (王者荣耀) runs on a faster patch cycle with a larger hero pool and different ban culture — use CN guides for mechanics and combos, but draft off global win/pick/ban numbers on this site.';

export const GLOBAL_VS_CN_ZH =
  `數據來自 Camp HOK 國際服排位（同步於 ${DATA_SYNC}），出裝與克制交叉比對 HoKStats.gg。` +
  '國服（王者榮耀）版本節奏更快、英雄池更大、禁用文化不同——機制與連招可參考國服攻略，但選人請以本站國際服勝率／選取／禁用為準。';

function sortByWinRate(list: Hero[]) {
  return [...list]
    .filter((h) => h.winRate !== null)
    .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0));
}

function sortByPickRate(list: Hero[]) {
  return [...list]
    .filter((h) => h.pickRate !== null)
    .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0));
}

function byLane(lane: string, role?: HeroRole) {
  let list = heroes.filter(
    (h) => (h.lane ?? '').toLowerCase() === lane.toLowerCase()
  );
  if (role) list = list.filter((h) => h.role === role);
  return list;
}

function topByRole(role: HeroRole, n = 5, sort: 'wr' | 'pick' = 'wr') {
  const list = getHeroesByRole(role).filter((h) => h.winRate !== null);
  return (sort === 'pick' ? sortByPickRate(list) : sortByWinRate(list)).slice(
    0,
    n
  );
}

export function statHeroEn(h: Hero): string {
  return `${h.name} — ${formatRate(h.winRate)} WR, ${formatRate(h.pickRate)} pick, Tier ${h.tier}`;
}

export function statListEn(list: Hero[]): string {
  return list.map(statHeroEn).join('; ');
}

export function namesEn(list: { name: string }[]): string {
  return list.map((h) => h.name).join(', ');
}

export function counterLineEn(h: Hero): string {
  const into = h.counteredBy.filter((c) => c !== 'Data unavailable');
  return into.length
    ? `${h.name} → answered by ${into.slice(0, 3).join(', ')}`
    : `${h.name} → see /hero/${h.slug}/ for matchup notes`;
}

export const topWR = sortByWinRate(heroes).slice(0, 10);
export const mostPicked = getMostPickedHeroes(8);
export const mostBanned = getMostBannedHeroes(6);
export const jungleAssassins = sortByPickRate(byLane('Jungling', 'Assassin')).slice(0, 5);
export const roamSupports = sortByPickRate(byLane('Roaming', 'Support')).slice(0, 4);
export const clashWarriors = sortByWinRate(byLane('Clash Lane', 'Warrior')).slice(0, 4);
export const farmMarksmen = sortByPickRate(byLane('Farm Lane', 'Marksman')).slice(0, 5);
export const marksmen = topByRole('Marksman', 5);
export const supports = topByRole('Support', 4, 'pick');
export const tanks = topByRole('Tank', 4);
export const assassins = topByRole('Assassin', 5, 'pick');
export const recentPatches = getRecentMetaChanges(12);

export { sortByWinRate, sortByPickRate, byLane, topByRole, heroes };
