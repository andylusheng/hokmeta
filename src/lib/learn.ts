import type { Hero, HeroRole } from '@/types/hero';
import type { Locale } from '@/lib/i18n';
import {
  assassins,
  byLane,
  clashWarriors,
  counterLineEn,
  DATA_SYNC,
  farmMarksmen,
  GLOBAL_VS_CN_EN,
  heroes,
  jungleAssassins,
  marksmen,
  mostBanned,
  mostPicked,
  namesEn,
  recentPatches,
  roamSupports,
  sortByPickRate,
  sortByWinRate,
  statHeroEn,
  statListEn,
  supports,
  tanks,
  topByRole,
  topWR,
} from '@/lib/learn-stats';
import { learnArticlesZh, learnDataNoteZh } from '@/lib/learn-zh';
import { getHeroLearnArticles } from '@/lib/learn-hero-articles';
import { getHeroLearnArticlesZh } from '@/lib/learn-hero-articles-zh';
import { featuredArticles } from '@/lib/learn-featured';
import { featuredArticlesZh } from '@/lib/learn-featured-zh';
import {
  trendLearnArticles,
  trendLearnArticlesZh,
} from '@/lib/learn-trend-articles';
import {
  getLearnArticlesFil,
  getLearnArticlesId,
  getLearnDataNoteIdFil,
} from '@/lib/learn-id-fil';

const heroLearnArticles = getHeroLearnArticles();
const heroLearnArticlesZh = getHeroLearnArticlesZh();

export interface LearnArticle {
  slug: string;
  title: string;
  description: string;
  badge?: string;
  /** Category tag for grouping on the learn index page */
  category?: string;
  sections: { heading: string; body: string }[];
  /** Hero slug this article is about, if hero-specific. Enables back-linking. */
  relatedHeroSlug?: string;
  /** ISO date string for per-article published date. Falls back to site.datePublished. */
  datePublished?: string;
  /** ISO date string for sitemap/JSON-LD freshness. */
  lastModified?: string;
}

/**
 * Deterministic date derived from a slug string.
 * Spreads articles across a 60-day window ending at the reference date.
 */
export function slugToDate(slug: string, reference: Date): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  const offset = Math.abs(hash) % 60; // 0-59 days ago
  const d = new Date(reference);
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
}

export const learnDataSync = DATA_SYNC;
export const learnDataNote = GLOBAL_VS_CN_EN;

export const learnArticles: LearnArticle[] = [
  {
    slug: 'strongest-rank-climb-comps',
    title: 'The 5-Stack Draft That Actually Wins — Backed by Global Server Data',
    badge: 'HOT',
    category: 'Team Comps',
    description:
      'Stop guessing your draft. Here is the exact role template and hero pool that wins on Honor of Kings Global, built from Camp HOK live stats — not copied from CN tier lists.',
    sections: [
      {
        heading: 'Why CN drafts fail on global',
        body: GLOBAL_VS_CN_EN,
      },
      {
        heading: 'Win-rate anchors: lock one of these first',
        body: `Highest win-rate heroes in our current Camp export: ${statListEn(topWR.slice(0, 6))}. Pick ONE from this list as your team's win condition, then draft the other four roles to enable it. Five random comfort picks — even if each has a decent individual win rate — will bleed LP because they have no synergy, no scaling plan, and no peel chain.`,
      },
      {
        heading: 'The role template that wins on global',
        body: `Tank frontline (${statListEn(tanks.slice(0, 2))}) — engages and absorbs cooldowns. Roam support (${statListEn(supports.slice(0, 2))}) — enables picks, provides peel, controls vision. Farm marksman (${statListEn(marksmen.slice(0, 2))}) — scales into late-game insurance. Jungling assassin (${statListEn(jungleAssassins.slice(0, 2))}) — sets tempo, controls objectives. Mid mage — fills burst damage or zone control depending on comp. CN pro teams often run double roam or swap the mage for a second fighter — these variants work on global only if your stack commits to vision control and Tyrant spawn timers. Otherwise, stick to the template.`,
      },
      {
        heading: 'Draft rule: never skip scaling damage',
        body: `Most-picked heroes this sync: ${statListEn(mostPicked.slice(0, 5))}. If your draft already has two tanks with poor waveclear, swap one for a mage or marksman. Camp data is clear: teams without a scaling damage source past the 12-minute mark bleed win rate, even when they hold an early gold lead. The game does not end at one tower — it ends when someone can't kill the enemy frontline anymore.`,
      },
    ],
  },
  {
    slug: 'fast-push-5-stack',
    title: 'Fast Push 5-Stack: End Ranked Games Before 15 Minutes',
    badge: '5-STACK',
    category: 'Team Comps',
    description:
      'The early-pressure lineup that takes first tower, denies enemy jungle, and snowballs Tyrant fights — using live Jungling and Roaming pick rates from the global server.',
    sections: [
      {
        heading: 'What fast push actually means in HOK',
        body:
          'The concept is simple but execution wins games: take the first outer tower, immediately invade the enemy jungle, then force a numbers-advantage fight around Tyrant. ' +
          'You win by starving the enemy jungler of resources and crashing waves into the next objective — not by scaling to late game. ' +
          'This mirrors the CN 速推 / 四一分推 playstyle, but global ranked punishes slow rotations even harder because fewer teams contest vision early. If you push fast, you will catch people off guard almost every game.',
      },
      {
        heading: 'Heroes that fit the tempo (Jungling + Roaming data)',
        body: `Tempo junglers by international pick rate: ${statListEn(jungleAssassins)}. Roam supports with reliable CC: ${statListEn(roamSupports)}. Clash lane bruisers who win early trades: ${statListEn(clashWarriors)}. Avoid full piggyback marksman drafts — they spike too late. Only run a scaling carry if you already have a 3k+ gold lead by 8 minutes and just need insurance.`,
      },
      {
        heading: 'Shot-calling checklist (memorize this)',
        body:
          '1) Crash the wave before Tyrant spawns — never start an objective on a slow push. The enemy will rotate and you will throw. ' +
          '2) Track the enemy jungler from their red/blue start by 3:30. Ping the opposite-side camps so your team knows where the gank is coming from. ' +
          '3) Dive only when your roam has hard CC ready AND the enemy jungler shows on the far side of the map. No exceptions. ' +
          '4) Close the game at two towers plus a 4k+ gold lead. Do not throw by five-manning mid while side waves are stacked against you — that is how comebacks happen.',
      },
      {
        heading: 'Global vs CN server note',
        body: GLOBAL_VS_CN_EN,
      },
    ],
  },
  {
    slug: 'piggyback-strategy-guide',
    title: 'Piggyback Strategy: How to Funnel Gold and Hard-Carry Ranked',
    badge: 'META',
    category: 'Team Comps',
    description:
      'The feed-the-carry playstyle on Honor of Kings Global — which marksmen actually convert funnel gold into wins, how to execute it, and exactly when to abandon the plan.',
    sections: [
      {
        heading: 'What piggyback (养猪流) actually is',
        body:
          'Four players trade space, vision, and jungle camps so one Farm Lane marksman spikes two full items ahead of the enemy carry. ' +
          'Same core idea as the infamous CN 养猪流 strategy, but global solo queue almost never commits properly — you need a 5-stack with voice comms or at minimum fast pings to pull this off consistently.',
      },
      {
        heading: 'Best carries for piggyback (Farm Lane, global data)',
        body: `Top farm marksmen by combined pick rate and win rate: ${statListEn(farmMarksmen)}. Pair them with peel-heavy supports like ${namesEn(supports)} and a jungler who prioritizes vision control over chasing kills. CN VODs love showcasing Hou Yi or Da Ji in piggyback clips — but those heroes play differently on global. Trust the Farm Lane stats above before copying a CN highlight reel.`,
      },
      {
        heading: 'How to execute — the 5-step funnel',
        body:
          '1) Marksman takes red buff after the jungler\'s first clear — but only when the map is safe. Do not leash yourself into a 3-man invade. ' +
          '2) Support crashes the bot wave at level 2, then only roams if the carry already has push priority. Abandoning a frozen losing lane is griefing. ' +
          '3) Jungler trades top-side camps for bot-side pressure and Tyrant setup. Your job is not to get kills — it is to make sure the enemy jungler cannot touch your carry. ' +
          '4) Take Tyrant ONLY when bot lane has a crash wave. Never start an objective with a frozen or losing lane — the enemy will collapse and wipe you. ' +
          '5) Support and tank build peel items (Aegis, shield gear) before any damage item. Your carry IS the damage.',
      },
      {
        heading: 'When to abandon the piggyback plan',
        body: `If the enemy drafts heavy assassin dive (${namesEn(assassins.slice(0, 3))}) OR your carry is two core items behind at 14 minutes, pivot immediately. Switch to split-push pressure with a side-lane fighter and force the enemy to answer multiple lanes. Check each marksman\'s build page on hokmeta for the correct arcana and summoner spells — data synced from HoKStats.`,
      },
    ],
  },
  {
    slug: 'best-jungle-heroes',
    title: 'Jungle Tier List: Which Junglers Actually Carry Ranked Right Now',
    badge: 'JUNGLE',
    category: 'Jungle',
    description:
      'Every jungler ranked by Camp HOK win rate, pick rate, and ban rate on the global server — plus ban priorities, pathing tips, and when to pick tempo vs scaling.',
    sections: [
      {
        heading: 'Top Jungling picks by the numbers',
        body: `Assassins with the Jungling lane tag in Camp export: ${statListEn(jungleAssassins)}. Warrior junglers climbing the ranks: ${statListEn(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 4))}. Rule of thumb: pick tempo junglers (Ying, Zilong, Han Xin) when your lanes have push priority. Pick scaling junglers (Liu Bei, Augran) when the enemy jungler is an early-pressure pick and you need to match their mid-game spike.`,
      },
      {
        heading: 'Ban priority — who to remove from the draft',
        body:
          mostBanned.length > 0
            ? `Highest ban pressure junglers in our current dataset: ${statListEn(mostBanned)}. CN servers permaban junglers like Jing or Lan in almost every game — but global ban rates tell a different story. Use the table above for your international server drafts; do not waste a ban on a hero nobody is picking.`
            : 'Check individual hero pages for live ban rates after each data sync. Ban rates shift with every patch — do not rely on last month\'s memory.',
      },
      {
        heading: 'Pathing 101 — the rule that wins games',
        body:
          'Default to a full clear to level 4. The only exception: gank at level 3 if your bot or mid lane has hard CC already set up and the enemy is overextended. Contest enemy buffs ONLY when your lanes have priority — if they do not, trade camps on the opposite side, chip tower plates, and secure vision on the Tyrant pit. Dying for a buff invade with no lane backup is the most common jungler mistake on global ranked.',
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: 'Solo Queue Tier List: Heroes That Carry Without a Perfect Team',
    badge: 'SOLO',
    category: 'Laning',
    description:
      'Independent carry picks for Honor of Kings Global — heroes that win even when you cannot rely on voice comms, coordinated dives, or a 5-stack.',
    sections: [
      {
        heading: 'S+ and S tier — the independent carries',
        body:
          heroes
            .filter((h) => h.tier === 'S+' || h.tier === 'S')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 12)
            .map((h) => statHeroEn(h))
            .join('. ') || 'Data unavailable',
      },
      {
        heading: 'What makes a hero good for solo queue',
        body: `Solo queue rewards heroes that can secure objectives without waiting for teammates: split-push duelists (Li Xin, Lu Bu), pick-assassins who delete a target and escape (${namesEn(assassins.slice(0, 3))}), and self-peel marksmen who do not need a dedicated bodyguard (${namesEn(marksmen.slice(0, 3))}). One-trick a hero with 52%+ win rate in your main lane before expanding your pool — consistency beats flexibility in solo queue every time. ${GLOBAL_VS_CN_EN}`,
      },
    ],
  },
  {
    slug: 'best-beginner-heroes',
    title: 'Best Beginner Heroes That Actually Win in Ranked (Not Just vs Bots)',
    badge: 'NEW',
    category: 'Beginner',
    description:
      'Easy-to-play heroes with meta-competitive win rates — start here, build fundamentals, then climb with confidence on Honor of Kings Global.',
    sections: [
      {
        heading: 'Start with these (Easy difficulty + positive win rate)',
        body:
          heroes
            .filter((h) => h.difficulty === 'Easy')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 10)
            .map((h) => `${h.name} — ${h.role}, ${h.lane ?? 'flex'}, ${h.winRate != null ? `${h.winRate.toFixed(1)}%` : '—'} WR, Tier ${h.tier}`)
            .join(' · ') || 'Data unavailable',
      },
      {
        heading: 'Why this list beats CN beginner guides',
        body:
          'CN beginner guides frequently recommend heroes that either do not exist on the global server or have been completely reworked. Every hero listed above is in our 112-hero Camp export with full English skill descriptions, builds, and arcana. Start with Arthur for tank/fighter fundamentals or Luban No.7 for marksman positioning — then graduate to an S-tier hero in your preferred lane once you have 20+ games under your belt.',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: 'Stop Losing LP: 5 Habits That Actually Match the Current Meta',
    badge: 'GUIDE',
    category: 'Laning',
    description:
      'Rank climbing on Honor of Kings Global is not about mechanics — it is about draft discipline, data awareness, and tilt management. Here is the system.',
    sections: [
      {
        heading: 'Rule 0: Draft from data, not memory',
        body: `Queue with Tier S+ or S heroes in your main role: ${namesEn(heroes.filter((h) => h.tier === 'S+' || h.tier === 'S').slice(0, 10))}. One-trick a hero above 52% win rate before you even think about expanding your pool. Re-check your hero's stats after every data sync — CN patch VODs lag weeks behind international balance, and a hero that was S+ last month might be B-tier today.`,
      },
      {
        heading: 'The 5 habits that separate climbers from hardstuck players',
        body:
          '1) Blind-pick comfort heroes ONLY in flex slots — never into hard counters. First-picking a hero with a 45% win rate into its worst matchup is how you start the game at a disadvantage. ' +
          '2) Read the patch notes on your main hero\'s page after every sync. A single number change can flip a matchup from winning to losing. ' +
          '3) Ward the enemy jungle entrance before Tyrant spawns. Vision wins objectives — and objectives win games. ' +
          '4) Mute chat. Ping objectives instead. Nothing said in ranked chat has ever improved anyone\'s win rate. ' +
          '5) Stop queueing after two consecutive losses. Tilt queueing is the fastest way to drop an entire rank in one session. Global LP is cheaper to save than to grind back.',
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: 'Assassins Keep One-Shotting You? Here Is Exactly Who Counters Them',
    badge: 'COUNTER',
    category: 'Counter',
    description:
      'Tank and Support answers to every meta Assassin — built from hokmeta counter matrices and HoKStats matchup data, not theorycrafting.',
    sections: [
      {
        heading: 'The threat list — who you are dying to',
        body: `Meta assassins ranked by pick rate on the global server: ${statListEn(assassins)}. These are the names you see in every loading screen. Memorize their level-4 spike timing — that is when they will look for you.`,
      },
      {
        heading: 'Counter picks — who beats them (with data)',
        body: assassins.slice(0, 5).map(counterLineEn).join('. '),
      },
      {
        heading: 'Itemization and summoner spells — the actual solution',
        body:
          'Supports: build anti-burst gear BEFORE any damage item. Your job is to keep your carry alive through the assassin\'s combo — if they survive the initial dive, the assassin is out of cooldowns and dead. ' +
          'Marksmen: take Purify or equivalent cleanse when the enemy draft has two or more dive threats. Flash alone will not save you from a Ying or Han Xin who knows their timing. ' +
          'Tanks: body-block for your carry during the assassin\'s ultimate window. Same principle as CN 保C (protect the carry), but global assassins spike earlier — respect the level-4 gank and position accordingly.',
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: 'Enemy Team Too Tanky? Here Is How to Shred Any Frontline',
    badge: 'COUNTER',
    category: 'Counter',
    description:
      'Percentage-health damage, anti-heal, and kiting picks that dismantle tank-heavy drafts on global ranked — with the macro play to back it up.',
    sections: [
      {
        heading: 'Anti-tank carries — who actually shreds',
        body: `${statListEn(topByRole('Marksman', 5))}. Mages with sustained DPS and poke: ${statListEn(topByRole('Mage', 4))}. These are not just high-damage picks — they have the range and self-peel to survive long enough to kill a tank line.`,
      },
      {
        heading: 'Tank weaknesses — what the data says',
        body: tanks.slice(0, 5).map(counterLineEn).join('. '),
      },
      {
        heading: 'The macro answer — do not fight their game',
        body:
          'Do not teamfight into Dun or Lapulapu ultimate timings — take the opposite-side objective instead. If they group as five with two tanks, split the map and force them to answer multiple lanes. ' +
          'CN frontline comps often layer two tanks with a bruiser; on global, the more common setup is one tank plus a roam support. Focus on kiting the engage tank and ignore the roam until your carry is safe. If you blow cooldowns on the support while the tank walks onto your backline, you already lost the fight.',
      },
    ],
  },
  {
    slug: 'how-to-jungle',
    title: 'Jungle Pathing 101: Clear Routes, Gank Timings, and Objective Control',
    badge: 'JUNGLE',
    category: 'Jungle',
    description:
      'A complete beginner-to-intermediate jungling guide for Honor of Kings Global — hero pool, first clear routes, and objective macro aligned with the current meta.',
    sections: [
      {
        heading: 'Hero pool — who to play in the jungle',
        body: `${statListEn(jungleAssassins)}; ${statListEn(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 3))}. Start with Warrior junglers if you are new to the role — they are more forgiving. Graduate to Assassins once you have your clear timing and gank angles memorized.`,
      },
      {
        heading: 'The first clear — the most important 2 minutes of the game',
        body:
          'Default to a full clear to level 4. The only exception: gank at level 3 if your bot or mid lane has hard CC already set up AND the enemy is pushed past river. ' +
          'Contest enemy buffs ONLY when your lanes have push priority. If they do not, trade camps on the opposite side of the map, chip tower plates, and secure vision on the Tyrant pit. The jungler who dies invading with no lane backup is the jungler who loses their team the game before 5 minutes.',
      },
      {
        heading: 'Objective macro — Tyrant, Overlord, and when to take them',
        body:
          'First Tyrant spawns at 5:00 — path toward bot lane if your team has a crash wave. A Tyrant fight with a slow push is a coin flip; with a crash wave, it is free. ' +
          'Overlord at 10:00 exists to close out winning games, not to throw them by forcing a bad 5v5. If you are ahead, take Overlord and push as a unit. If you are behind, trade the opposite-side objective and stall. ' +
          'This matches CN macro pacing, but global teams contest Tyrant less consistently — if you have a numbers advantage, take the free objective and do not overthink it.',
      },
    ],
  },
  {
    slug: 'how-to-roam',
    title: 'Support Roam Timings: When to Leave Lane and Actually Create Kills',
    badge: 'SUPPORT',
    category: 'Laning',
    description:
      'The complete roaming guide for supports on Honor of Kings Global — when to leave Farm Lane, which roamers have the highest pick rates, and how to not accidentally grief your carry.',
    sections: [
      {
        heading: 'Support meta — who is actually getting picked',
        body: statListEn(roamSupports),
      },
      {
        heading: 'The roam window — when to leave and when to stay',
        body:
          'Golden rule: roam ONLY after helping your marksman crash the wave. Never roam on a frozen losing lane — you will return to find your carry dead or two levels behind, and that is your fault. ' +
          'Return to lane before Tyrant spawns if your carry lacks an escape tool. CN roam supports like Donghuang and Sun Bin dominate every CN VOD, but on global, Sakeer and Guiguzi lead pick rates — learn their CC chains on our hero pages before copying CN roam timings. The heroes are different; the principles are the same.',
      },
    ],
  },
  {
    slug: 'how-tier-list-works',
    title: 'How We Build the HOK Meta Tier List — Zero Guesswork, Pure Data',
    badge: 'DATA',
    category: 'Meta & Data',
    description:
      'S+ through B tiers explained: the exact methodology behind our rankings, what each tier means for your draft, and why this is not a CN tier list.',
    sections: [
      {
        heading: 'Tier definitions — what each band actually means',
        body:
          'S+: Top composite metrics across win rate, pick rate, and ban rate — these heroes define the meta and should be your first-pick or first-ban priority. ' +
          'S: Strong meta staples with consistently high performance. Safe blind picks in most matchups. ' +
          'A: Viable but with narrower win conditions — strong in the right comp, punishable in the wrong one. ' +
          'B: Situational picks. They can work, but you need a specific draft or matchup to justify them over an S-tier alternative. ' +
          'Every hero page on hokmeta shows the exact stats table with data sourced from Camp HOK and cross-referenced with HoKStats.gg. No opinion, no "feels strong" — just numbers.',
      },
      {
        heading: 'Role and lane grouping',
        body:
          'The tier list and hero index are grouped by Tank, Warrior, Assassin, Mage, Marksman, and Support — matching Camp HOK\'s official role tags. Each hero also displays their lane assignment (Jungling, Roaming, Farm, Clash, Mid) so you can draft with full context. A hero being S+ in one lane does not mean they are S+ in every lane.',
      },
      {
        heading: 'This is not a CN tier list — here is why that matters',
        body: GLOBAL_VS_CN_EN,
      },
    ],
  },
  {
    slug: 'best-heroes-after-patch',
    title: 'Patch Day Winners: Which Heroes Got Buffed in the Latest Sync',
    badge: 'PATCH',
    category: 'Meta & Data',
    description:
      'Every hero with meaningful changes in the latest Camp HOK data pull — plus how to actually use patch notes to gain LP before the meta catches up.',
    sections: [
      {
        heading: 'Recent balance adjustments',
        body:
          recentPatches.length > 0
            ? recentPatches
                .map(({ hero, patch }) => `${hero.name}: ${patch}`)
                .join(' | ')
            : 'Run the data sync for the latest patch notes. Buffs and nerfs shift the meta every cycle — do not draft off outdated information.',
      },
      {
        heading: 'How to exploit patch notes for free LP',
        body:
          'CN patch livestreams often preview changes weeks before they hit the global server. When a buff finally lands on international, two things happen: the hero\'s win rate shifts almost immediately, but pick rate lags behind by several days. ' +
          'This is your window. Re-check the tier list after every sync, identify the newly buffed heroes, and lock them before the playerbase catches on. By the time everyone else starts spamming the buffed hero, you have already climbed.',
      },
    ],
  },
  {
    slug: 'li-xin-build-and-counters',
    title: 'Li Xin: The Most Banned Warrior in Ranked — Build, Arcana, and How to Counter Him',
    badge: 'META',
    category: 'Hero Guides',
    relatedHeroSlug: 'li-xin',
    datePublished: '2026-07-22',
    lastModified: '2026-07-22',
    description:
      'Li Xin holds a 53.6% win rate and the highest ban rate among top warriors. Here is his current build, arcana, and the heroes that shut him down — all from live ranked data.',
    sections: [
      {
        heading: 'Why Li Xin dominates ranked',
        body:
          'Li Xin sits at 53.64% win rate with a 2.84% ban rate — the most feared warrior in the current meta. His dual-form kit (swordsman for burst, spearman for sustained DPS) lets him adapt mid-fight, and his gap-closer makes backline access trivial. When the enemy team lacks hard CC or anti-dive tools, Li Xin deletes carries before they can react.',
      },
      {
        heading: 'Current best build (July 2026)',
        body:
          'Core items from ranked data: Ominous Premonition → Demonsbane → Tempest → Sage\'s Sanctuary → Destiny → Boots of Resistance. This build balances burst penetration with survivability. Ominous Premonition provides the shield + CDR needed to survive initial focus fire, while Demonsbane and Tempest stack penetration for the spearman execute. Swap Destiny for a defensive item if the enemy has two+ burst mages.',
      },
      {
        heading: 'Arcana setup',
        body:
          'Run Fate (attack + penetration), Hunt (attack speed + move speed), and Reaver (lifesteal + attack). This page maximizes early dueling power — Li Xin\'s win condition is snowballing a 1v1 in the first 4 minutes, then snowballing map pressure. Do not run tank arcana; his kit ratios reward full damage.',
      },
      {
        heading: 'How to counter Li Xin',
        body:
          'Heroes that shut him down: Cai Yan (heal denial + CC lock), Da Qiao (silence interrupts his combo), and Guiguzi (sustained CC prevents form-switch). General principles: save your CC for his spearman dash, never 1v1 him at equal gold, and build anti-heal (Dominance) if he runs Reaver arcana. If you see Li Xin in draft and your team has no hard CC, consider banning — his 2.84% ban rate exists for a reason.',
      },
      {
        heading: 'When NOT to pick Li Xin',
        body:
          'Avoid Li Xin into heavy-CC comps (multiple stuns, suppressions, or pulls). He also struggles against tanks with 10k+ HP who build Dominance — his burst falls off if the target survives the first rotation. If your team already has an assassin jungler, picking Li Xin as a second diver creates a comp with zero peel for your marksman.',
      },
    ],
  },
];

export function getLearnDataNote(locale: Locale = 'en'): string {
  if (locale === 'zh-TW') return learnDataNoteZh;
  if (locale === 'id') return getLearnDataNoteIdFil('id');
  if (locale === 'fil') return getLearnDataNoteIdFil('fil');
  return learnDataNote;
}

export function getLearnArticles(locale: Locale = 'en') {
  if (locale === 'id') return getLearnArticlesId();
  if (locale === 'fil') return getLearnArticlesFil();
  const base = locale === 'zh-TW' ? learnArticlesZh : learnArticles;
  const hero = locale === 'zh-TW' ? heroLearnArticlesZh : heroLearnArticles;
  const featured = locale === 'zh-TW' ? featuredArticlesZh : featuredArticles;
  const trends = locale === 'zh-TW' ? trendLearnArticlesZh : trendLearnArticles;
  return [...base, ...featured, ...trends, ...hero];
}

export function getLearnArticle(slug: string, locale: Locale = 'en') {
  return getLearnArticles(locale).find((a) => a.slug === slug);
}

export function getLearnSlugs() {
  const baseSlugs = learnArticles.map((a) => a.slug);
  const heroSlugs = heroLearnArticles.map((a) => a.slug);
  const featuredSlugs = featuredArticles.map((a) => a.slug);
  const trendSlugs = trendLearnArticles.map((a) => a.slug);
  return [...baseSlugs, ...featuredSlugs, ...trendSlugs, ...heroSlugs];
}
