import {
  heroes,
  getHeroesByRole,
  formatRate,
  getMostPickedHeroes,
  getMostBannedHeroes,
  getRecentMetaChanges,
} from '@/lib/data';
import type { Hero, HeroRole } from '@/types/hero';

export interface LearnArticle {
  slug: string;
  title: string;
  description: string;
  badge?: string;
  sections: { heading: string; body: string }[];
}

const DATA_SYNC = heroes[0]?.dataUpdated ?? 'latest Camp HOK pull';

const GLOBAL_VS_CN =
  `Stats from Camp HOK international ranked (synced ${DATA_SYNC}), cross-checked against HoKStats.gg builds and counters. ` +
  '国服 (王者荣耀) runs on a faster patch cycle with a larger hero pool and different ban culture — use CN guides for mechanics and combos, but draft off global win/pick/ban numbers on this site.';

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

function statHero(h: Hero): string {
  return `${h.name} — ${formatRate(h.winRate)} WR, ${formatRate(h.pickRate)} pick, Tier ${h.tier}`;
}

function statList(list: Hero[]): string {
  return list.map(statHero).join('; ');
}

function names(list: { name: string }[]) {
  return list.map((h) => h.name).join(', ');
}

function counterLine(h: Hero): string {
  const into = h.counteredBy.filter((c) => c !== 'Data unavailable');
  return into.length
    ? `${h.name} → answered by ${into.slice(0, 3).join(', ')}`
    : `${h.name} → see /hero/${h.slug}/ for matchup notes`;
}

const topWR = sortByWinRate(heroes).slice(0, 10);
const mostPicked = getMostPickedHeroes(8);
const mostBanned = getMostBannedHeroes(6);
const jungleAssassins = sortByPickRate(byLane('Jungling', 'Assassin')).slice(
  0,
  5
);
const roamSupports = sortByPickRate(byLane('Roaming', 'Support')).slice(0, 4);
const clashWarriors = sortByWinRate(byLane('Clash Lane', 'Warrior')).slice(0, 4);
const farmMarksmen = sortByPickRate(byLane('Farm Lane', 'Marksman')).slice(
  0,
  5
);
const marksmen = topByRole('Marksman', 5);
const supports = topByRole('Support', 4, 'pick');
const tanks = topByRole('Tank', 4);
const assassins = topByRole('Assassin', 5, 'pick');
const recentPatches = getRecentMetaChanges(12);

export const learnDataSync = DATA_SYNC;
export const learnDataNote = GLOBAL_VS_CN;

export const learnArticles: LearnArticle[] = [
  {
    slug: 'strongest-rank-climb-comps',
    title: 'The Strongest Rank Climb Comps Are Actually THESE Heroes!',
    badge: 'HOT',
    description:
      'Five-stack drafting on Honor of Kings Global — built from Camp HOK win rate, pick rate, and role fit, not recycled MOBA myths.',
    sections: [
      {
        heading: 'Data snapshot (international server)',
        body: GLOBAL_VS_CN,
      },
      {
        heading: 'Highest win-rate anchors right now',
        body: `Current top WR heroes in our Camp export: ${statList(topWR.slice(0, 6))}. In 5-stack, pick one win condition from this list and build peel around it — five unrelated comfort picks bleed LP even when individual WR looks fine.`,
      },
      {
        heading: 'Role template that wins on global',
        body: `Tank front (${statList(tanks.slice(0, 2))}) starts fights. Roam support (${statList(supports.slice(0, 2))}) enables picks and peel. Farm marksman (${statList(marksmen.slice(0, 2))}) scales. Jungling assassin (${statList(jungleAssassins.slice(0, 2))}) sets tempo. Mid mage fills burst or zone. CN pro drafts often double roam or swap mage for extra fighter — viable globally only if your stack commits to vision and Tyrant timers.`,
      },
      {
        heading: 'Draft rule from the numbers',
        body: `Most-picked heroes this sync: ${statList(mostPicked.slice(0, 5))}. If two tanks with low waveclear are already locked, swap one for a mage or marksman. Camp data shows drafts without a scaling damage source past 12 minutes bleed win rate even with early leads.`,
      },
    ],
  },
  {
    slug: 'fast-push-5-stack',
    title: 'Fast Push 5-Stack: Win Ranked Before 15 Minutes',
    badge: '5-STACK',
    description:
      'Early-pressure lineups for Honor of Kings Global — first tower, jungle denial, and Tyrant fights using live Jungling and Roaming pick rates.',
    sections: [
      {
        heading: 'What fast push means in HOK',
        body:
          'Take the first outer tower, immediately invade enemy jungle camps, then fight around Tyrant with numbers. ' +
          'You win by starving the enemy jungler and crashing waves into the next objective — not by scaling to Storm Dragon. ' +
          'This mirrors CN 速推/四一分推 concepts, but global ranked punishes slow rotations harder because fewer teams contest vision early.',
      },
      {
        heading: 'Heroes that fit (Jungling + Roaming data)',
        body: `Tempo junglers by intl pick rate: ${statList(jungleAssassins)}. Roam supports with reliable CC: ${statList(roamSupports)}. Clash lane bruisers for early trades: ${statList(clashWarriors)}. Skip full piggyback marksman drafts unless you already have a gold lead at 8 minutes.`,
      },
      {
        heading: 'Shot-calling checklist',
        body:
          '1) Crash the wave before Tyrant spawns — never start objective on a slow push. ' +
          '2) Track enemy jungler from red/blue start by 3:30 and ping opposite side camps. ' +
          '3) Dive only when roam has hard CC ready and enemy jungler is on the far side of the map. ' +
          '4) Close at two towers plus a 4k+ gold lead; do not throw by five-manning mid while side waves are stacked.',
      },
      {
        heading: 'Global vs 国服 note',
        body: GLOBAL_VS_CN,
      },
    ],
  },
  {
    slug: 'piggyback-strategy-guide',
    title: 'Piggyback Strategy: Snowball Your Carry and Climb Fast',
    badge: 'META',
    description:
      'Feed-the-carry (养猪) style on Honor of Kings Global — which marksmen actually convert funnel gold, and when to abandon the plan.',
    sections: [
      {
        heading: 'What piggyback is',
        body:
          'Four players trade space, vision, and camps so one Farm Lane marksman spikes two items ahead. ' +
          'It is the same core idea as CN 养猪流, but global solo queue rarely commits — run it in 5-stack with voice or fast pings.',
      },
      {
        heading: 'Best carries (Farm Lane, international data)',
        body: `Top farm marksmen by pick + WR: ${statList(farmMarksmen)}. Pair with peel supports like ${names(supports)} and a jungler who contests vision instead of chasing kills. On CN, marksmen like Hou Yi or Da Ji variants dominate piggyback clips — on global, trust the Farm Lane pick rates above before copying a CN VOD.`,
      },
      {
        heading: 'How to form fast',
        body:
          '1) Marksman takes red after first jungler clear when safe. ' +
          '2) Support helps crash bot wave at level 2, then roams only if carry has push. ' +
          '3) Jungler trades top-side camps for bot-side pressure and Tyrant setup. ' +
          '4) Take Tyrant when bot has crash wave — never start with a frozen losing lane. ' +
          '5) Support/tank builds peel items (aegis, shield gear) before damage.',
      },
      {
        heading: 'When to abandon piggyback',
        body: `If enemy drafts assassin dive (${names(assassins.slice(0, 3))}) or your carry is two core items behind at 14 minutes, pivot to split push with a side-lane fighter. Check each marksman build page on hokmeta for arcana and spell choices synced from HoKStats.`,
      },
    ],
  },
  {
    slug: 'best-jungle-heroes',
    title: 'Jungle Tier List: Who Actually Carries Ranked in 2026?',
    badge: 'JUNGLE',
    description:
      'Jungling-lane heroes ranked by Camp HOK win rate, pick rate, and ban rate on the international server.',
    sections: [
      {
        heading: 'Top Jungling picks (lane-filtered)',
        body: `Assassins actually tagged Jungling in Camp export: ${statList(jungleAssassins)}. Warrior junglers: ${statList(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 4))}. Pick tempo (Ying, Zilong, Han Xin) when lanes have push; pick scaling (Liu Bei, Augran) when enemy jungler is early-pressure.`,
      },
      {
        heading: 'Ban priority',
        body:
          mostBanned.length > 0
            ? `Highest ban pressure in our dataset: ${statList(mostBanned)}. CN junglers like Jing or Lan are permabanned in 国服 clips — global ban rates differ; trust the table above for intl draft.`
            : 'See individual hero pages for live ban rates after each sync.',
      },
      {
        heading: 'Pathing reminder',
        body:
          'Full clear to level four unless bot or mid has hard CC setup for a level-3 gank. Contest enemy buffs only with lane priority; otherwise trade camps for tower plates and Tyrant vision.',
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: "Solo Queue Carry Picks That Don't Need a Perfect Team",
    badge: 'SOLO',
    description:
      'Independent win rates on Honor of Kings Global when you cannot rely on voice comms or CN-style coordinated dives.',
    sections: [
      {
        heading: 'Tier S+ and S outliers',
        body:
          heroes
            .filter((h) => h.tier === 'S+' || h.tier === 'S')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 12)
            .map((h) => statHero(h))
            .join('. ') || 'Data unavailable',
      },
      {
        heading: 'Pick logic',
        body: `Solo queue rewards heroes who secure objectives alone: split push (Li Xin, Lu Bu), pick threat (${names(assassins.slice(0, 3))}), or self-peel marksmen (${names(marksmen.slice(0, 3))}). One-trick a 52%+ WR hero in your main lane before expanding pool. ${GLOBAL_VS_CN}`,
      },
    ],
  },
  {
    slug: 'best-beginner-heroes',
    title: 'Beginner Heroes That Still Win in Ranked (Not Just Training Mode)',
    badge: 'NEW',
    description:
      'Easy-difficulty kits with meta-friendly win rates for new Honor of Kings Global players.',
    sections: [
      {
        heading: 'Start here (Easy + positive WR)',
        body:
          heroes
            .filter((h) => h.difficulty === 'Easy')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 10)
            .map((h) => `${h.name} — ${h.role}, ${h.lane ?? 'flex'}, ${formatRate(h.winRate)} WR, Tier ${h.tier}`)
            .join(' · ') || 'Data unavailable',
      },
      {
        heading: 'Why these over CN beginner lists',
        body:
          'CN beginner guides often recommend heroes unavailable or reworked on global. Every name above exists in our 112-hero Camp export with builds and skills in English. Start Arthur or Luban No.7 for fundamentals, then move to one S-tier hero in your preferred lane.',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: 'Stop Losing LP: 5 Ranked Habits That Match the Current Meta',
    badge: 'GUIDE',
    description:
      'Rank climbing on Honor of Kings Global — draft, data, and discipline tied to live Camp HOK stats.',
    sections: [
      {
        heading: 'Draft with data, not memory',
        body: `Queue with Tier S+ / S heroes in your main role: ${names(heroes.filter((h) => h.tier === 'S+' || h.tier === 'S').slice(0, 10))}. One-trick a hero above 52% WR before expanding. Re-check after each \`npm run sync-global\` — CN patch VODs lag weeks behind international balance.`,
      },
      {
        heading: 'Five habits',
        body:
          '1) Blind-pick comfort only in flex slots — not into hard counters. ' +
          '2) Read patch notes on your main hero page after every sync. ' +
          '3) Ward enemy jungle entrance before Tyrant. ' +
          '4) Mute chat, ping objectives. ' +
          '5) Stop queue after two tilt losses — global LP is cheaper to save than to grind back.',
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: 'Assassins Keep Diving You? Here’s Who Actually Counters Them',
    badge: 'COUNTER',
    description:
      'Tank and Support answers to Assassin win conditions — from hokmeta counter matrices and HoKStats matchup notes.',
    sections: [
      {
        heading: 'Threat list (high pick junglers)',
        body: `Meta assassins by pick rate: ${statList(assassins)}.`,
      },
      {
        heading: 'Counter picks from our data',
        body: assassins.slice(0, 5).map(counterLine).join('. '),
      },
      {
        heading: 'Item and spell tips',
        body:
          'Supports: build anti-burst gear before damage. Marksmen: Purify or equivalent cleanse when dive comps are draftable. Tanks: body-block for carry during assassin ult windows — same principle as CN 保C, but global assassins (Ying, Han Xin) spike earlier, so respect level-4 ganks.',
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: 'Tank Too Tanky? Marksmen and Mages That Shred Frontline',
    badge: 'COUNTER',
    description:
      'Percentage damage, sustain cut, and kiting picks against Tank-heavy drafts on global ranked.',
    sections: [
      {
        heading: 'Anti-tank carries (Marksman + Mage WR)',
        body: `${statList(topByRole('Marksman', 5))}. Mages with sustained poke: ${statList(topByRole('Mage', 4))}.`,
      },
      {
        heading: 'Tank weaknesses on record',
        body: tanks.slice(0, 5).map(counterLine).join('. '),
      },
      {
        heading: 'Macro answer',
        body:
          'Do not teamfight into Dun or Lapulapu ult timings — take opposite objective. CN frontline comps often layer two tanks; on global, one tank plus roam support is more common, so focus kiting the engage tank and ignore the roam until carry is safe.',
      },
    ],
  },
  {
    slug: 'how-to-jungle',
    title: 'Jungle Pathing 101 for Honor of Kings Global',
    badge: 'JUNGLE',
    description:
      'Clear routes, gank timing, and hero selection aligned with current Jungling-lane meta.',
    sections: [
      {
        heading: 'Hero pool (Camp Jungling tag)',
        body: `${statList(jungleAssassins)}; ${statList(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 3))}.`,
      },
      {
        heading: 'First clear rule',
        body:
          'Full clear to four unless bot/mid has hard CC setup for level-3. Contest only when lanes have push — otherwise trade camps for tower damage and vision on Tyrant pit.',
      },
      {
        heading: 'Objective timing',
        body:
          'First Tyrant at 5:00 — path toward bot if your team has crash wave. Overlord at 10:00 is for closing, not throwing a winning game by forcing a bad 5v5. Matches CN macro pacing but global teams contest Tyrant less consistently — free objective if you have numbers.',
      },
    ],
  },
  {
    slug: 'how-to-roam',
    title: 'Support Roam Timings That Create Free Kills',
    badge: 'SUPPORT',
    description:
      'When to leave Farm Lane, which Roaming supports have pick rate, and how not to grief your carry.',
    sections: [
      {
        heading: 'Support meta (Roaming lane tag)',
        body: statList(roamSupports),
      },
      {
        heading: 'Roam windows',
        body:
          'Roam after helping marksman crash wave — never roam on a frozen losing bot. Return before Tyrant if your carry has no escape. CN roam supports (Donghuang, Sun Bin) appear in every CN VOD; on global, Sakeer and Guiguzi lead pick rate — learn their CC chains on our hero pages before copying CN timing.',
      },
    ],
  },
  {
    slug: 'how-tier-list-works',
    title: 'How We Build the HOK Meta Tier List (No Guesswork)',
    badge: 'DATA',
    description:
      'Tier S+ through B from Camp HOK win rate, pick rate, ban rate, and rank index — international server only.',
    sections: [
      {
        heading: 'Tier bands',
        body:
          'S+: top composite metrics and ban pressure. S: strong meta staples. A/B: viable but narrower win conditions. Every hero page shows the exact stats table with data source Camp HOK + HoKStats.gg.',
      },
      {
        heading: 'Role grouping',
        body:
          'Tier list and hero index group by Tank, Warrior, Assassin, Mage, Marksman, and Support — matching Camp role tags. Lane (Jungling, Roaming, Farm, Clash, Mid) is shown per hero for draft context.',
      },
      {
        heading: 'Not a 国服 tier list',
        body: GLOBAL_VS_CN,
      },
    ],
  },
  {
    slug: 'best-heroes-after-patch',
    title: 'Patch Day Winners: Who Got Buffed in the Latest Meta Sync',
    badge: 'PATCH',
    description:
      'Heroes with meaningful patchHistory entries after the latest Camp HOK data pull.',
    sections: [
      {
        heading: 'Recent adjustments',
        body:
          recentPatches.length > 0
            ? recentPatches
                .map(({ hero, patch }) => `${hero.name}: ${patch}`)
                .join(' | ')
            : 'Run npm run sync-global for latest patch notes.',
      },
      {
        heading: 'How to use patch notes',
        body:
          'CN patch livestreams often preview changes weeks before global. When a buff hits international, re-check win rate on our tier list before spamming ranked — pick rate lags buffs by several days.',
      },
    ],
  },
];

export function getLearnArticles() {
  return learnArticles;
}

export function getLearnArticle(slug: string) {
  return learnArticles.find((a) => a.slug === slug);
}

export function getLearnSlugs() {
  return learnArticles.map((a) => a.slug);
}
