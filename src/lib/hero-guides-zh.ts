import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';
import { getFullHeroBySlug } from '@/lib/heroes-server';
import { getHeroDisplayName, formatHeroNameList } from '@/lib/locale-names';
export interface LocalizedGuide {
  laning?: string;
  teamfight?: string;
  highRank?: string;
  comparisons?: string[];
}

function fmtCounters(names: string[] | undefined, limit = 3): string {
  return formatHeroNameList((names ?? []).slice(0, limit), 'zh-TW');
}

function guideFromHero(hero: Hero, extras: Partial<LocalizedGuide>): LocalizedGuide {
  const name = getHeroDisplayName(hero, 'zh-TW');
  const lane = hero.lane ?? hero.role;
  const wr = formatRate(hero.winRate);
  const pick = formatRate(hero.pickRate);
  const ban = formatRate(hero.banRate);
  const into = fmtCounters(hero.counters);
  const weak = fmtCounters(hero.counteredBy);

  return {
    laning:
      extras.laning ??
      `${name} 走 ${lane}：穩定吃經濟到第一件核心，別在弱勢期硬拼。暴君前確保邊路有推線再動手。`,
    teamfight:
      extras.teamfight ??
      `團戰等隊友先手或視野就位再開。${name} 擅長打 ${into || '脆皮後排'}；注意 ${weak || '硬控與爆發'} 的克制。`,
    highRank:
      extras.highRank ??
      `國際服 ${hero.tier} 梯度，勝率 ${wr}、選取 ${pick}、禁用 ${ban}（${hero.dataUpdated ?? 'meta'}）。${hero.tier === 'S+' || hero.tier === 'S' ? '高分段常見，值得投入練習。' : '高分段建議後手或單練。'}`,
    comparisons: extras.comparisons,
  };
}

/** S+ / key S heroes with tailored Traditional Chinese guide prose. */
export const S_PLUS_GUIDES_ZH: Record<string, LocalizedGuide> = {
  'li-xin': guideFromHero(
    { slug: 'li-xin', name: 'Li Xin', tier: 'S+', role: 'Warrior', lane: 'Clash Lane', winRate: 52.58, pickRate: 1.86, banRate: 1.33, counters: ['Da Qiao', 'Liang'], counteredBy: ['Cai Yan', 'Da Qiao', 'Guiguzi'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '對抗路四級前用一技能清線換血，半血不追。有閃現可配合打野越塔；沒閃現就穩線等暴君團。',
      teamfight: '側翼切入或繞後秒後排，別第一個吃滿控。大招期間注意蔡文姬、鬼谷子保核。',
      highRank: 'S+ 對抗路核心之一，52.6% 勝率、1.9% 選取。好打大喬、梁山；慎對蔡文姬、鬼谷子連控。',
    }
  ),
  angela: guideFromHero(
    { slug: 'angela', name: 'Angela', tier: 'S+', role: 'Mage', lane: 'Mid Lane', winRate: 51.81, pickRate: 2.3, banRate: 3.02, counters: ['Jing', 'Athena', 'Zilong'], counteredBy: ['Han Xin', 'Gao Changgong'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '中路清線後支援邊路，二技能命中是換血關鍵。對韓信、高長恭等突進要留閃現與自保技能。',
      teamfight: '站在坦克身後持續輸出，技能全交前排時果斷後撤。團前確保有視野，避免被鏡、趙雲繞後。',
      highRank: '禁用率 3.0% 的中路常規 Ban 位。51.8% 勝率穩定，高分段先手拿或搶斷都合理。',
    }
  ),
  liang: guideFromHero(
    { slug: 'liang', name: 'Liang', tier: 'S+', role: 'Mage', lane: 'Mid Lane', winRate: 51.46, pickRate: 0.76, banRate: 5.05, counters: ['Han Xin', 'Lam', 'Mulan'], counteredBy: ['Li Xin', 'Mayene', 'Mulan'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '遠程 poke 消耗，別貪線被開。對韓信 gank 留位移；木蘭、美恩對線要尊重爆發窗口。',
      teamfight: '團戰前用技能壓血量，團中站後排輸出。李信、美恩衝臉時先交自保再輸出。',
      highRank: '禁用率 5.1% 的頂級中路威脅。選取率不高但勝率 51.5%，適合後手 counter 或單練。',
    }
  ),
  daji: guideFromHero(
    { slug: 'daji', name: 'Daji', tier: 'S+', role: 'Mage', lane: 'Mid Lane', winRate: 51.03, pickRate: 2.38, banRate: 3.13, counters: ['Luna', 'Diaochan'], counteredBy: ['Gao Changgong', 'Mulan'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '二技能命中是對線核心，清完線可支援。對高長恭、木蘭等突進法師要計算技能 CD。',
      teamfight: '等硬控鏈到位再灌傷害，別第一個進場。露娜、貂蟬等法刺需隊友幫忙看住。',
      highRank: '2.4% 選取、3.1% 禁用，中路 Meta 常規。51% 勝率在高分段仍值得主玩。',
    }
  ),
  'marco-polo': guideFromHero(
    { slug: 'marco-polo', name: 'Marco Polo', tier: 'S+', role: 'Marksman', lane: 'Farm Lane', winRate: 50.06, pickRate: 2.12, banRate: 0.3, counters: ['Cirrus', 'Mai Shiranui', 'Wukong'], counteredBy: ['Lian Po', 'Liu Bang', 'Zhang Fei'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '發育路穩定補刀，一技能 poke 換血。雲中君、不知火舞突進多時出防禦裝或帶淨化。',
      teamfight: '保持距離輸出，普攻疊滿後再交爆發。廉頗、劉邦、張飛等強開坦需隊友保核。',
      highRank: 'S+ 射手，2.1% 選取。禁用率低適合單排先手拿，注意刺客與法刺切入時機。',
    }
  ),
  haya: guideFromHero(
    { slug: 'haya', name: 'Haya', tier: 'S+', role: 'Mage', lane: 'Mid Lane', winRate: 49.78, pickRate: 0.93, banRate: 3.01, counters: ['Sakeer', 'Zilong', 'Milady'], counteredBy: ['Li Xin', 'Kaizer', 'Dun'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '中路消耗為主，利用射程優勢壓制短手。李信、凱瑟、盾山等硬開需留閃現。',
      teamfight: '團戰持續輸出與封路，別站太前。薩科爾、趙雲、米萊狄等需隊友幫忙拆火。',
      highRank: '禁用 3.0% 的法師，勝率近 50% 但 Ban 位高。適合熟悉技能機制後在高分段後手。',
    }
  ),
  'hou-yi': guideFromHero(
    { slug: 'hou-yi', name: 'Hou Yi', tier: 'S+', role: 'Marksman', lane: 'Farm Lane', winRate: 49.28, pickRate: 2.85, banRate: 0.2, counters: ['Cirrus', 'Mulan', 'Xuance'], counteredBy: ['Agudo', 'Master Luban'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '發育路穩線，二技能減速配合隊友換血。雲中君、木蘭、玄策突進時注意站位與淨化。',
      teamfight: '站後排持續輸出，大招鎖定時機配合隊友硬控。阿古朵、魯班等遠程壓制需隊友創造空間。',
      highRank: '2.9% 選取率最高的 S+ 射手之一。49.3% 勝率略低但選取穩定，單排發育路常選。',
    }
  ),
  milady: guideFromHero(
    { slug: 'milady', name: 'Milady', tier: 'S+', role: 'Mage', lane: 'Mid Lane', winRate: 48.95, pickRate: 1.9, banRate: 2.4, counters: ['Nakoruru', 'Pei', 'Mai Shiranui'], counteredBy: ['Allain', 'Fuzi', 'Haya'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '召喚物推線後支援邊路，注意野區視野。艾倫、夫子、海月等突進法師要計算自保。',
      teamfight: '用召喚物封路與磨塔，團戰站遠處指揮機械兵。娜可露露、裴擒虎、不知火舞切後排時先撤。',
      highRank: '1.9% 選取、2.4% 禁用。推塔節奏強，高分段需隊友配合拿塔而非只團戰。',
    }
  ),
  donghuang: guideFromHero(
    { slug: 'donghuang', name: 'Donghuang', tier: 'S+', role: 'Tank', lane: 'Roaming', winRate: 48.66, pickRate: 0.79, banRate: 3.39, counters: ['Allain', 'Cirrus', 'Kaizer'], counteredBy: ['Wukong', 'Musashi', 'Ying'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '遊走幫射手推線後跟打野抓人。大招按住關鍵刺客或法師，別空大。',
      teamfight: '開團大招鎖 C 位或突進，隊友跟上集火。孫悟空、宮本、影等位移刺客需隊友補控。',
      highRank: '禁用 3.4% 的頂級輔坦。48.7% 勝率但 Ban 高，五排或高分段保核價值大。',
    }
  ),
  aoyin: guideFromHero(
    { slug: 'aoyin', name: "Ao'yin", tier: 'S+', role: 'Marksman', lane: 'Farm Lane', winRate: 48.42, pickRate: 1.57, banRate: 5.06, counters: ['Liu Bei', 'Athena', 'Zilong'], counteredBy: ['Kaizer', 'Dun', 'Arthur'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '發育路利用技能清線與換血，注意劉備、雅典娜、趙雲 gank。前期別深壓沒視野的線。',
      teamfight: '保持輸出距離，技能銜接普攻。凱瑟、盾山、亞瑟強開時等隊友拆火再反打。',
      highRank: '禁用率 5.1% 的射手 Ban 位。48.4% 勝率，高分段常見先 Ban 或後手。',
    }
  ),
  augran: guideFromHero(
    { slug: 'augran', name: 'Augran', tier: 'S+', role: 'Warrior', lane: 'Jungling', winRate: 46.93, pickRate: 1.18, banRate: 5.05, counters: ['Mai Shiranui', 'Nezha'], counteredBy: ['Liu Bei', 'Yixing', 'Liu Shan'], dataUpdated: '2026-06-05' } as Hero,
    {
      laning: '打野刷滿四級再抓人，優先幫有推線的路。不知火舞、哪吒等法刺需計算交戰時機。',
      teamfight: '切入後排或分割戰場，別孤軍深入。劉備、弈星、劉禪等保核陣容需等隊友先手。',
      highRank: '禁用 5.1% 但勝率 46.9%——高分段 Ban 多、需熟練度。好打不知火舞、哪吒。',
    }
  ),
};

function sTierGuide(slug: string, extras: Partial<LocalizedGuide>): LocalizedGuide | undefined {
  const hero = getFullHeroBySlug(slug);
  if (!hero) return undefined;
  return guideFromHero(hero, extras);
}

const S_TIER_EXTRAS: Record<string, Partial<LocalizedGuide>> = {
  'zhang-fei': {
    laning: '遊走開盾幫射手換血，大招吼開突進是核心。別在沒視野時深遊走。',
    teamfight: '吼開刺客或法師進場路線，保核心站位。馬可波羅、后羿等射手需要你的大招窗口。',
    highRank: 'S 梯度遊走坦，國際服高分段常見。孫悟空、宮本切入時大招價值最高。',
  },
  wukong: {
    laning: '打野四級抓沒閃現的路，分身探草再開戰。東皇大招期別硬開。',
    teamfight: '繞後秒後排，一技能突進後立即接普攻。沒視野別單進——等隊友先手。',
    highRank: 'S 梯度打野，選取穩定。對東皇太一、宮本等需計算進場時機。',
  },
  dun: {
    laning: '對抗路幫隊友擋技能，二技能與隊友配合換血。別追太深被包。',
    teamfight: '舉盾保後排，吸收關鍵飛行物與爆發。海月、李信等需隊友幫忙看側翼。',
    highRank: 'S 梯度對抗坦，保核價值高。法師與射手陣容時優先考慮。',
  },
};

for (const [slug, extras] of Object.entries(S_TIER_EXTRAS)) {
  const g = sTierGuide(slug, extras);
  if (g) S_PLUS_GUIDES_ZH[slug] = g;
}

export const PREMIUM_ZH_SLUGS_LIST = [
  'musashi',
  ...Object.keys(S_PLUS_GUIDES_ZH),
];
