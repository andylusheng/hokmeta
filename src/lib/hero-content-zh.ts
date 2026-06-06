import type {
  HeroArcanaRow,
  HeroCombo,
  HeroItemNote,
  HeroSkillOrder,
} from '@/types/hero';
import type { HeroPlaybook } from '@/lib/hero-playbook';

/** Heroes with full Traditional Chinese playbook + guide body. */
export const PREMIUM_ZH_SLUGS = new Set(['musashi']);

export function hasPremiumZhContent(slug: string): boolean {
  return PREMIUM_ZH_SLUGS.has(slug);
}

const MUSASHI_PLAYBOOK_ZH: Partial<HeroPlaybook> = {
  hook:
    '雙刀打野：技能疊「氣勢」，普攻消耗氣勢獲得強化——爆發、減速與收割壓力兼具。',
  skillOrder: {
    priority: '二技能 → 一技能 → 大招（優先滿二技能）',
    reason:
      '「極意」是位移、護盾與換血核心，先滿更安全抓人。「一閃」次之，補射程、清線與擋飛行物。大招有就點，用於單抓與重傷。',
  },
  combos: [
    {
      id: 'gank',
      name: '四級河道抓人',
      steps: '二技能（突進）→ 普攻（2 層氣勢）→ 一技能 → 大招 → 普攻追擊',
      when: '敵方閃現已交；先與線上隊友推線再動手',
    },
    {
      id: 'burst',
      name: '秒後排',
      steps: '一技能（劍氣）→ 二技能 → 普攻（氣勢減速）→ 大招 → 普攻重置',
      when: '隊友已給硬控；目標無淨化',
    },
    {
      id: 'escape',
      name: '脫戰',
      steps: '一技能（擋飛行物）→ 二技能撤出 → 刷野回氣勢',
      when: '強開失敗或敵方 Dyadia / 孫臏 來保',
    },
  ],
  itemNotes: [
    { slot: 1, why: '貪婪之噬——打野核心；野怪層數提升物攻，清野與單挑更快。' },
    { slot: 2, why: '抵抗之靴——減控，被拉扯時仍能放出技能。' },
    { slot: 3, why: '折磨之斧——懲戒等級上來後對脆皮的爆發節點。' },
    { slot: 4, why: '霜痕——強化普攻附帶減速，追殘血射手更穩。' },
    { slot: 5, why: '魔女斗篷——法傷護盾，抗法師爆發再進場。' },
    { slot: 6, why: '暴烈之甲——後期坦度，秒不掉人時仍能換血存活。' },
  ],
  arcanaRows: [
    {
      slot: '套裝',
      rune: '異變',
      effect: '刺客向成長，強化氣勢普攻與爆發窗口。',
    },
    {
      slot: '技能',
      rune: '懲戒',
      effect: '標準打野；敵方硬控多可換淨化。',
    },
  ],
  tldr: {
    build: '打野：貪婪之噬 → 抵抗靴 → 折磨斧 → 霜痕 → 魔女 → 暴烈；優先滿二技能。',
    combo: '抓人：極意 → 普攻（2 氣勢）→ 一閃 → 大招 → 追擊。',
    counters: '好打貂蟬、露娜、上官；慎對 Dyadia、孫臏 等強保。',
  },
};

export interface LocalizedGuide {
  laning?: string;
  teamfight?: string;
  highRank?: string;
  comparisons?: string[];
}

const MUSASHI_GUIDE_ZH: LocalizedGuide = {
  laning:
    '四級前穩定刷野、管理好氣勢層數，半血不強開。暴君前確保中下路有推線；優先抓沒閃現的一路。',
  teamfight:
    '等隊友硬控到位再大招鎖後排；進場前用一閃擋關鍵飛行物。若重傷留不住人，用二技能撤出。',
  highRank:
    '國際服 A 梯度、勝率約 50.7%，適合單練或克制位。選取率 1.1% 但常見於排位，即使不主玩也建議熟悉對局。',
  comparisons: [
    '宮本 vs 悟空（刺客，S 梯度）：悟空選取 1.3% / 勝率 49.7%。Camp 數據宮本對悟空勝率約 +1.0%。要打野身份選宮本，要熟練度選悟空。',
    '宮本 vs 影（刺客，A 梯度）：影選取 1.0% / 勝率 52.4%，全球勝率約高 1.6%。要打野節奏選宮本，要穩定勝率可選影。',
  ],
};

const PLAYBOOK_ZH: Record<string, Partial<HeroPlaybook>> = {
  musashi: MUSASHI_PLAYBOOK_ZH,
};

const GUIDE_ZH: Record<string, LocalizedGuide> = {
  musashi: MUSASHI_GUIDE_ZH,
};

export function getZhPlaybookOverride(slug: string): Partial<HeroPlaybook> | undefined {
  return PLAYBOOK_ZH[slug];
}

export function getLocalizedGuideZh(slug: string): LocalizedGuide | undefined {
  return GUIDE_ZH[slug];
}
