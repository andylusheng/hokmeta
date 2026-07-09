import { getHeroBySlug } from '@/lib/data';
import {
  laneLabel,
  metaTrends,
  trendDelta,
  trendRate,
  type MetaTrendHero,
} from '@/lib/meta-trends';
import type { LearnArticle } from '@/lib/learn';

function listHeroes(items: MetaTrendHero[]) {
  return items
    .map(
      (hero, index) =>
        `${index + 1}. ${hero.name} (${laneLabel(hero.lane)}, ${hero.role}, Tier ${hero.tier}) - ${trendRate(hero.winRate)} WR, ${trendRate(hero.pickRate)} pick, ${trendRate(hero.banRate)} ban, 7d WR ${trendDelta(hero.delta7d.winRate)}`
    )
    .join('\n');
}

function listHeroesZh(items: MetaTrendHero[]) {
  return items
    .map(
      (hero, index) =>
        `${index + 1}. ${hero.name}（${laneLabel(hero.lane, 'zh-TW')}，${hero.role}，Tier ${hero.tier}）- 勝率 ${trendRate(hero.winRate)}，出場率 ${trendRate(hero.pickRate)}，禁用率 ${trendRate(hero.banRate)}，7 日勝率變化 ${trendDelta(hero.delta7d.winRate)}`
    )
    .join('\n');
}

function topNames(items: MetaTrendHero[]) {
  return items.slice(0, 3).map((hero) => hero.name).join(', ');
}

function patchReason(hero: MetaTrendHero, locale: 'en' | 'zh-TW' = 'en') {
  const fullHero = getHeroBySlug(hero.slug);
  const latestPatch = fullHero?.patchHistory?.find(
    (entry) => entry.change && entry.change !== 'Data unavailable'
  );
  if (!latestPatch) {
    return locale === 'zh-TW'
      ? `${hero.name} 最近沒有可直接引用的平衡條目，所以目前更應該從勝率、出場率與禁用率變化去判斷它是變強還是被環境針對。`
      : `${hero.name} does not have a clean recent balance note to quote, so the safer read is to treat the current movement as a live result of win rate, pick rate, and ban pressure instead.`;
  }
  return locale === 'zh-TW'
    ? `${hero.name} 最近可見的平衡條目是 ${latestPatch.version}: ${latestPatch.change}。這通常是最近勝率變化最先要檢查的原因。`
    : `${hero.name}'s latest visible balance note is ${latestPatch.version}: ${latestPatch.change}. That is usually the first reason to check when the weekly numbers shift.`;
}

function trendReason(hero: MetaTrendHero, locale: 'en' | 'zh-TW' = 'en') {
  const up7d = hero.delta7d.winRate ?? 0;
  const pick = hero.pickRate ?? 0;
  const ban = hero.banRate ?? 0;

  if (locale === 'zh-TW') {
    if (up7d >= 1) {
      return `${hero.name} 這週勝率明顯上升（${trendDelta(hero.delta7d.winRate)}），代表玩家已經開始把它用對，或版本環境正在變得更適合它。`;
    }
    if (up7d <= -1) {
      return `${hero.name} 這週勝率明顯下滑（${trendDelta(hero.delta7d.winRate)}），通常代表環境開始不利、熱門克制增加，或者主流出裝節奏不再合適。`;
    }
    if (pick >= 8 && ban >= 5) {
      return `${hero.name} 不只是熱門，還有明顯 BP 壓力。這種英雄的勝率稍微波動，都值得優先補打法與克制內容。`;
    }
    if (pick < 2 && (hero.winRate ?? 0) >= 51) {
      return `${hero.name} 出場率不高但勝率夠穩，這更像是真正的冷門上分答案，而不是大眾都在搶的英雄。`;
    }
    return `${hero.name} 的數據沒有極端波動，但這種穩定本身就有價值，代表它不是只靠一時熱度撐起來。`;
  }

  if (up7d >= 1) {
    return `${hero.name} is climbing fast this week (${trendDelta(hero.delta7d.winRate)}), which usually means players have settled on a cleaner build path or the patch environment has turned in its favor.`;
  }
  if (up7d <= -1) {
    return `${hero.name} is sliding this week (${trendDelta(hero.delta7d.winRate)}), which usually points to worse patch fit, more common counters, or a build order that is no longer keeping up.`;
  }
  if (pick >= 8 && ban >= 5) {
    return `${hero.name} is not just popular. It is also creating real draft pressure, which means even small win-rate shifts deserve counter and build follow-up.`;
  }
  if (pick < 2 && (hero.winRate ?? 0) >= 51) {
    return `${hero.name} is low-pressure in draft but still converting games, which makes it a more credible sleeper than a hero inflated by hype.`;
  }
  return `${hero.name} is relatively stable right now, and that stability matters because it suggests the hero is not surviving on temporary hype alone.`;
}

function laneSummary(locale: 'en' | 'zh-TW' = 'en') {
  return metaTrends.laneLeaders
    .map((group) => {
      const leader = group.leaders[0];
      if (!leader) return null;
      if (locale === 'zh-TW') {
        return `${laneLabel(group.lane, 'zh-TW')} 目前第一名是 ${leader.name}，勝率 ${trendRate(leader.winRate)}，出場率 ${trendRate(leader.pickRate)}。`;
      }
      return `${laneLabel(group.lane, 'en')} is currently led by ${leader.name} at ${trendRate(leader.winRate)} win rate with ${trendRate(leader.pickRate)} pick rate.`;
    })
    .filter(Boolean)
    .join('\n');
}

export const trendLearnArticles: LearnArticle[] = [
  {
    slug: 'highest-win-rate-heroes-this-week',
    title: `Highest Win Rate Heroes This Week (${metaTrends.latestDate})`,
    badge: 'DATA',
    category: 'Meta & Data',
    description:
      'The top Honor of Kings Global heroes by trusted weekly win rate, filtered with pick-rate context so low-sample spikes do not dominate the list.',
    sections: [
      {
        heading: 'The short answer',
        body: `${topNames(metaTrends.topWinRate)} are the strongest win-rate signals in this HOKMeta sync. This list uses current win rate with pick-rate context, not raw win rate alone.`,
      },
      {
        heading: 'Top 10 by trusted win-rate signal',
        body: listHeroes(metaTrends.topWinRate),
      },
      {
        heading: 'Why these heroes are rising right now',
        body: metaTrends.topWinRate
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero)} ${patchReason(hero)}`)
          .join('\n'),
      },
      {
        heading: 'How to use this list in ranked',
        body:
          'Do not first-pick a hero just because the win rate is high. Check the hero page, compare the build, and confirm that your draft can support the pick. A high win-rate marksman still needs peel; a high win-rate tank still needs damage behind it; a high win-rate assassin still needs targets without reliable protection.',
      },
    ],
  },
  {
    slug: 'lowest-win-rate-heroes-this-week',
    title: `Lowest Win Rate Heroes This Week (${metaTrends.latestDate})`,
    badge: 'RISK',
    category: 'Meta & Data',
    description:
      'The lowest-performing Honor of Kings Global heroes this week, plus why low win rate does not always mean the hero is unplayable.',
    sections: [
      {
        heading: 'The current danger list',
        body: listHeroes(metaTrends.lowestWinRate),
      },
      {
        heading: 'Why these heroes are struggling',
        body: metaTrends.lowestWinRate
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero)} ${patchReason(hero)}`)
          .join('\n'),
      },
      {
        heading: 'How to use a low-win board correctly',
        body:
          'A low weekly win rate does not force you to abandon a hero forever. It tells you to slow down and ask better questions: is the build outdated, is the lane matchup harsher this patch, and is the hero only good inside a narrower draft window? This is the board to use when you want to stop bleeding ranked points from blind comfort picks.',
      },
    ],
  },
  {
    slug: 'best-heroes-by-lane-this-week',
    title: `Best Heroes by Lane This Week (${metaTrends.latestDate})`,
    badge: 'LANE',
    category: 'Meta & Data',
    description:
      'The current lane-by-lane win-rate leaders for Clash, Jungle, Mid, Farm, and Roam on Honor of Kings Global.',
    sections: [
      {
        heading: 'The lane leaders in one scan',
        body: laneSummary('en'),
      },
      {
        heading: 'Why lane leaders matter more than one global board',
        body:
          'Most players do not choose from 100+ heroes every queue. They choose from 5 to 15 heroes in one role. That is why lane-based leaders are more practical than a giant all-hero board. A strong Clash hero does not solve your Jungle pool, and a top Roam pick will not tell you what to blind-pick in Mid.',
      },
      {
        heading: 'What to do next',
        body:
          'Open the top two heroes in your main lane, compare their build pages, and check whether one is winning through raw stats while the other is winning through cleaner matchups. That is where real ranked edge starts to show up.',
      },
    ],
  },
  {
    slug: 'most-picked-heroes-this-week',
    title: `Most Picked Heroes This Week (${metaTrends.latestDate})`,
    badge: 'POPULAR',
    category: 'Meta & Data',
    description:
      'The heroes players are actually queuing into on Honor of Kings Global this week, based on HOKMeta D1 pick-rate snapshots.',
    sections: [
      {
        heading: 'The current popularity board',
        body: listHeroes(metaTrends.mostPicked),
      },
      {
        heading: 'Why popularity can still hide risk',
        body: metaTrends.mostPicked
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero)} ${patchReason(hero)}`)
          .join('\n'),
      },
      {
        heading: 'Why pick rate matters',
        body:
          'Pick rate is demand data. It tells you which heroes you will actually meet in ranked, which guides need better counters, and which builds deserve testing. A hero with a modest win rate but high pick rate can still be important because players face it constantly.',
      },
      {
        heading: 'What to do with popular picks',
        body:
          'Open the hero page for every high-pick hero in your role. Learn the first three core items, the common spell choice, and the counter page. If a popular hero has a weak win rate, that is a sign to prepare counter content rather than blindly copying the pick.',
      },
    ],
  },
  {
    slug: 'most-underrated-heroes-this-week',
    title: `Most Underrated Heroes This Week (${metaTrends.latestDate})`,
    badge: 'SLEEPER',
    category: 'Meta & Data',
    description:
      'Low-pick but high-performing Honor of Kings Global heroes that may be worth testing before the wider player base catches up.',
    sections: [
      {
        heading: 'Sleeper picks from this sync',
        body: listHeroes(metaTrends.sleeperPicks),
      },
      {
        heading: 'Why these low-pressure picks stand out',
        body: metaTrends.sleeperPicks
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero)} ${patchReason(hero)}`)
          .join('\n'),
      },
      {
        heading: 'What underrated means here',
        body:
          'Underrated does not mean guaranteed overpowered. It means the hero has a strong current win rate while pick pressure stays low enough that most players are not prioritizing it. These are good candidates for one-tricks, role specialists, and players looking for less contested picks.',
      },
      {
        heading: 'How to test a sleeper pick safely',
        body:
          'Start in normal games or low-risk ranked sessions. Check whether the hero fits your lane pool, whether its core build is complete, and whether the counter page exposes a common draft weakness. If the pick still feels stable after 10 games, then consider adding it to your ranked pool.',
      },
    ],
  },
  {
    slug: 'most-banned-heroes-this-week',
    title: `Most Banned Heroes This Week (${metaTrends.latestDate})`,
    badge: 'BAN',
    category: 'Counter',
    description:
      'The heroes creating the most draft pressure in Honor of Kings Global this week, with notes on when to ban and when to counter instead.',
    sections: [
      {
        heading: 'Highest ban pressure',
        body: listHeroes(metaTrends.mostBanned),
      },
      {
        heading: 'Why these bans keep happening',
        body: metaTrends.mostBanned
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero)} ${patchReason(hero)}`)
          .join('\n'),
      },
      {
        heading: 'Ban rate is a warning signal',
        body:
          'Ban rate usually points to frustration, draft pressure, or strong one-trick value. It does not always mean the hero is unbeatable. Before spending a ban, check whether your team has a reliable counter pick or whether the hero only becomes dangerous in specific lanes.',
      },
      {
        heading: 'When to ban instead of counter',
        body:
          'Ban the hero when your draft cannot answer its main engage window, when your team has multiple squishy carries, or when the hero is a common one-trick in your rank. Counter it when you have same-lane pressure, reliable crowd control, and enough damage to punish the first failed engage.',
      },
    ],
  },
];

export const trendLearnArticlesZh: LearnArticle[] = [
  {
    slug: 'highest-win-rate-heroes-this-week',
    title: `本週勝率最高英雄（${metaTrends.latestDate}）`,
    badge: 'DATA',
    category: 'Meta & Data',
    description:
      '根據 HOKMeta 每日 D1 快照整理的本週高勝率英雄，並加入出場率判斷，避免被低樣本勝率誤導。',
    sections: [
      {
        heading: '先看結論',
        body: `${topNames(metaTrends.topWinRate)} 是這次同步裡最值得關注的勝率信號。這份清單不是只看裸勝率，而是同時參考出場率，避免低樣本英雄突然衝高造成誤判。`,
      },
      {
        heading: '本週可信勝率前 10',
        body: listHeroesZh(metaTrends.topWinRate),
      },
      {
        heading: '為什麼這些英雄最近在上升',
        body: metaTrends.topWinRate
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero, 'zh-TW')} ${patchReason(hero, 'zh-TW')}`)
          .join('\n'),
      },
      {
        heading: '排位裡應該怎麼用',
        body:
          '不要只因為勝率高就無腦先選。先打開英雄頁確認核心出裝、銘文、技能節奏，再看隊伍能不能支援這個英雄。高勝率射手仍然需要保護，高勝率坦克仍然需要隊友補傷害，高勝率刺客也需要敵方後排缺少保命手段才好進場。',
      },
    ],
  },
  {
    slug: 'lowest-win-rate-heroes-this-week',
    title: `本週勝率最低英雄（${metaTrends.latestDate}）`,
    badge: 'RISK',
    category: 'Meta & Data',
    description:
      '整理本週表現最差的 Honor of Kings Global 英雄，並說明低勝率到底是版本問題、對局問題，還是玩家用法出了偏差。',
    sections: [
      {
        heading: '目前的風險名單',
        body: listHeroesZh(metaTrends.lowestWinRate),
      },
      {
        heading: '為什麼這些英雄最近容易輸',
        body: metaTrends.lowestWinRate
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero, 'zh-TW')} ${patchReason(hero, 'zh-TW')}`)
          .join('\n'),
      },
      {
        heading: '怎麼正確看低勝率榜',
        body:
          '低勝率不代表這個英雄永遠不能玩，而是提醒你先別再靠直覺硬玩。先檢查核心裝順序有沒有過時、對線是不是剛好撞上熱門克制、這個英雄是不是其實只適合更窄的陣容窗口。這份榜單的價值，是幫你少掉那些其實可以避免的排位分數。',
      },
    ],
  },
  {
    slug: 'best-heroes-by-lane-this-week',
    title: `本週各分路最佳英雄（${metaTrends.latestDate}）`,
    badge: 'LANE',
    category: 'Meta & Data',
    description:
      '整理對抗路、打野、中路、發育路、遊走目前勝率最穩的英雄，讓你不用在全英雄大榜裡迷路。',
    sections: [
      {
        heading: '各分路冠軍一眼看完',
        body: laneSummary('zh-TW'),
      },
      {
        heading: '為什麼分路榜比全站總榜更實用',
        body:
          '大部分玩家不是每把都從一百多個英雄裡選，而是在自己主玩的那一路裡做決策。所以分路前 5 比整站總榜更能直接幫助排位。對抗路的答案，不會自動變成你打野池的答案；遊走第一名，也不代表你中路就該去學它。',
      },
      {
        heading: '下一步要怎麼用',
        body:
          '先打開你主分路前兩名英雄的詳情頁，比對它們的核心裝、克制頁和近 30 天趨勢。你真正要找的，不是誰一時數字最高，而是誰能在你的對局環境裡穩定複製勝場。',
      },
    ],
  },
  {
    slug: 'most-picked-heroes-this-week',
    title: `本週出場率最高英雄（${metaTrends.latestDate}）`,
    badge: 'POPULAR',
    category: 'Meta & Data',
    description:
      '用 HOKMeta D1 出場率快照整理本週玩家最常選的 Honor of Kings Global 英雄。',
    sections: [
      {
        heading: '本週熱門英雄榜',
        body: listHeroesZh(metaTrends.mostPicked),
      },
      {
        heading: '為什麼熱門不代表安全',
        body: metaTrends.mostPicked
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero, 'zh-TW')} ${patchReason(hero, 'zh-TW')}`)
          .join('\n'),
      },
      {
        heading: '為什麼出場率很重要',
        body:
          '出場率代表玩家實際在排位裡遇到什麼。它不一定等於最強，但能告訴我們哪些英雄需要補出裝、克制、對線和打法說明。某些英雄勝率普通但出場率很高，對 SEO 和玩家決策一樣重要，因為大家真的會遇到它。',
      },
      {
        heading: '遇到熱門英雄要做什麼',
        body:
          '把你主位置裡的高出場英雄逐個打開。先記住前三件核心裝、常用召喚師技能和常見克制。如果某個熱門英雄勝率偏低，這反而是做克制內容的機會，而不是跟著盲目複製。',
      },
    ],
  },
  {
    slug: 'most-underrated-heroes-this-week',
    title: `本週最被低估英雄（${metaTrends.latestDate}）`,
    badge: 'SLEEPER',
    category: 'Meta & Data',
    description:
      '低出場但表現不錯的 Honor of Kings Global 英雄，適合在大眾玩家注意到之前先測試。',
    sections: [
      {
        heading: '這次同步裡的冷門強勢候選',
        body: listHeroesZh(metaTrends.sleeperPicks),
      },
      {
        heading: '為什麼這些英雄值得先測',
        body: metaTrends.sleeperPicks
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero, 'zh-TW')} ${patchReason(hero, 'zh-TW')}`)
          .join('\n'),
      },
      {
        heading: '這裡的「被低估」是什麼意思',
        body:
          '被低估不等於必定超標。它的意思是：目前勝率不錯，但出場壓力還不高，玩家沒有大量搶選。這類英雄適合專精玩家、補位玩家，或想避開熱門鏡像對局的人先測試。',
      },
      {
        heading: '怎麼安全測試冷門英雄',
        body:
          '先不要直接拿去高壓排位。先看英雄頁確認出裝是否完整，再看克制頁找出最容易被針對的點。正常局或低風險排位打 10 場左右，如果對線、團戰和逆風都穩定，再考慮加入自己的排位英雄池。',
      },
    ],
  },
  {
    slug: 'most-banned-heroes-this-week',
    title: `本週最常被禁英雄（${metaTrends.latestDate}）`,
    badge: 'BAN',
    category: 'Counter',
    description:
      '整理本週 Honor of Kings Global BP 壓力最高的英雄，並說明什麼時候該 ban，什麼時候該用克制處理。',
    sections: [
      {
        heading: '本週最高禁用壓力',
        body: listHeroesZh(metaTrends.mostBanned),
      },
      {
        heading: '為什麼這些英雄一直被 ban',
        body: metaTrends.mostBanned
          .slice(0, 5)
          .map((hero) => `- ${trendReason(hero, 'zh-TW')} ${patchReason(hero, 'zh-TW')}`)
          .join('\n'),
      },
      {
        heading: '禁用率代表一個警訊',
        body:
          '高禁用率通常代表玩家覺得難處理、單排壓力大，或某些絕活玩家能把英雄價值打滿。但它不一定代表無解。浪費 ban 位之前，應該先看你的隊伍是否有同路克制、硬控、保排或足夠的反打傷害。',
      },
      {
        heading: '什麼時候該 ban，而不是硬 counter',
        body:
          '如果你的陣容沒有辦法處理這個英雄的第一波進場、隊伍裡有多個脆皮核心，或者你所在分段常見該英雄絕活玩家，那就應該直接 ban。反過來，如果你能選同路壓制、穩定控制，並且能在它第一波失誤後立刻反打，那就可以用 counter 取代 ban。',
      },
    ],
  },
];
