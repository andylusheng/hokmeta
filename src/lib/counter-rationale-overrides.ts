import type { Locale } from '@/lib/i18n';

type LocalizedField = string | { en: string; 'zh-TW': string };

export interface CounterDetail {
  hero: string;
  reason: LocalizedField;
  tags?: LocalizedField[];
}

export interface BestCounter {
  hero: string;
  advantage: number;
  reasons: LocalizedField[];
}

export interface MetaTrend {
  summary: LocalizedField;
  reasons: LocalizedField[];
}

export interface PlaystyleInfo {
  summary: LocalizedField;
  points: LocalizedField[];
}

export type CounterOverride = {
  why?: LocalizedField[];
  mistakes?: LocalizedField[];
  faqUltimate?: LocalizedField;
  faqItems?: LocalizedField;
  faqWho?: LocalizedField;
  faqHowToLane?: LocalizedField;
  faqSeason?: LocalizedField;
  bestCounter?: BestCounter;
  counterDetails?: CounterDetail[];
  metaTrend?: MetaTrend;
  playstyle?: PlaystyleInfo;
};

function loc(field: LocalizedField | undefined, locale: Locale): string | undefined {
  if (!field) return undefined;
  if (typeof field === 'string') return field;
  return locale === 'zh-TW' ? field['zh-TW'] : field.en;
}

export function locList(
  fields: LocalizedField[] | undefined,
  locale: Locale
): string[] {
  if (!fields?.length) return [];
  return fields.map((f) => loc(f, locale)).filter((s): s is string => Boolean(s));
}

export function getCounterOverride(slug: string): CounterOverride | undefined {
  return OVERRIDES[slug];
}

export function getOverrideFaqUltimate(
  slug: string,
  locale: Locale
): string | undefined {
  return loc(OVERRIDES[slug]?.faqUltimate, locale);
}

export function getOverrideFaqItems(
  slug: string,
  locale: Locale
): string | undefined {
  return loc(OVERRIDES[slug]?.faqItems, locale);
}

export function getOverrideFaqWho(
  slug: string,
  locale: Locale
): string | undefined {
  return loc(OVERRIDES[slug]?.faqWho, locale);
}

export function getOverrideFaqHowToLane(
  slug: string,
  locale: Locale
): string | undefined {
  return loc(OVERRIDES[slug]?.faqHowToLane, locale);
}

export function getOverrideFaqSeason(
  slug: string,
  locale: Locale
): string | undefined {
  return loc(OVERRIDES[slug]?.faqSeason, locale);
}

export function getBestCounter(slug: string, locale: Locale) {
  const override = OVERRIDES[slug];
  if (!override?.bestCounter) return undefined;
  return {
    ...override.bestCounter,
    reasons: override.bestCounter.reasons.map((r) => loc(r, locale)).filter((s): s is string => Boolean(s)),
  };
}

export function getCounterDetails(slug: string, locale: Locale) {
  const override = OVERRIDES[slug];
  if (!override?.counterDetails?.length) return [];
  return override.counterDetails.map((d) => ({
    hero: d.hero,
    reason: loc(d.reason, locale) || '',
    tags: d.tags ? d.tags.map((t) => loc(t, locale)).filter((s): s is string => Boolean(s)) : undefined,
  })).filter((d) => Boolean(d.reason));
}

export function getMetaTrend(slug: string, locale: Locale) {
  const override = OVERRIDES[slug];
  if (!override?.metaTrend) return undefined;
  return {
    summary: loc(override.metaTrend.summary, locale) || '',
    reasons: override.metaTrend.reasons.map((r) => loc(r, locale)).filter((s): s is string => Boolean(s)),
  };
}

export function getPlaystyle(slug: string, locale: Locale) {
  const override = OVERRIDES[slug];
  if (!override?.playstyle) return undefined;
  return {
    summary: loc(override.playstyle.summary, locale) || '',
    points: override.playstyle.points.map((p) => loc(p, locale)).filter((s): s is string => Boolean(s)),
  };
}

/** Top-20 meta heroes — hand-tuned counter rationale. */
const OVERRIDES: Record<string, CounterOverride> = {
  'marco-polo': {
    playstyle: {
      summary: {
        en: 'Marco Polo is a high-mobility Marksman dealing **Physical + True Damage**. His entire kit revolves around his passive **Chain Reaction**: every basic attack and skill hit places a stack — at 10 stacks, all subsequent damage becomes true damage (ignores armor). **Attack Speed directly increases his Skill 1 bullet count and Ultimate hit frequency**, making ASPD his most important stat. He deals zero magic damage and does not rely on critical strikes.',
        'zh-TW': '馬可波羅是機動型射手，傷害類型為**物理+真實傷害**。核心機制圍繞被動**連鎖反應**疊印記——每次普攻和技能命中疊一層，疊滿10層後後續所有攻擊轉為真實傷害（無視護甲）。**攻速直接決定一技能子彈數和大招段數**，是馬可最重要的屬性。他完全無法術傷害，也不依賴暴擊。',
      },
      points: [
        {
          en: '**Damage source:** Physical basic attacks + True Damage (proc at 10 passive stacks). No magic damage, no crit scaling.',
          'zh-TW': '**傷害來源：** 物理普攻 + 真實傷害（被動10層觸發）。無法傷，不靠暴擊。',
        },
        {
          en: '**Power spike:** Doomsday + Frigid Charge (2 items) — enough ASPD to trigger passive quickly, enough durability to commit to fights with Ultimate.',
          'zh-TW': '**強勢期：** 末世+冰霜衝擊（2件）——攻速夠快能疊被動，血量夠敢轉大進場。',
        },
        {
          en: '**Key weakness:** Zero hard CC, zero sustain pre-6. Relies entirely on Skill 2 blink (5s CD) for self-peel. Immobile while channeling Ultimate.',
          'zh-TW': '**核心弱點：** 零硬控，6級前零續航。完全依賴二技能位移（5秒CD）自保。大招讀條時無法移動。',
        },
        {
          en: '**Laning phase:** Weak pre-6. Any marksman with longer range bullies him in lane — he must walk close to land Skill 1 and cannot sustain through poke.',
          'zh-TW': '**對線期：** 6級前弱勢。手比他長的射手都能壓他——他必須走很近才能打一技能，被消耗了沒法回血。',
        },
      ],
    },
    bestCounter: {
      hero: 'lian-po',
      advantage: 4.8,
      reasons: [
        {
          en: 'Lian Po has CC immunity during skill casts — he walks straight through Marco\'s Skill 1 and knocks him up mid-ult. Marco just stands there getting chain-CC\'d.',
          'zh-TW': '廉頗技能自帶霸體，直接無視馬可一技能走上去，大招擊飛打斷他讀條。馬可原地罰站被連控到死。',
        },
        {
          en: 'Damage reduction + shield means Marco\'s true damage burst deals negligible damage. Other tanks melt to his passive; Lian Po shrugs it off.',
          'zh-TW': '被動減傷+護盾讓馬可真傷爆發跟刮痧一樣。其他坦克扛不住的真傷，廉頗硬吃沒事。',
        },
        {
          en: 'Lian Po dives backline without fear. Marco is forced to use Skill 2 defensively — he can never go aggressive.',
          'zh-TW': '廉頗無腦衝後排，馬可只能交二技能往後跑，整局無法進場輸出。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'lian-po',
        reason: {
          en: 'Lian Po is Marco\'s hardest counter. Passive grants damage reduction + CC immunity while casting — he walks through Skill 1 unharmed. Ultimate chain-knockup cancels Fevered Barrage entirely. Shield absorbs the true damage burst that kills every other tank.',
          'zh-TW': '廉頗是馬可的最大天敵。被動施法期間減傷+霸體，一技能打他跟沒打一樣。大招三連擊飛直接斷馬可大招讀條。護盾硬吃被動真傷，其他坦克扛不住的他扛完還能反打。',
        },
        tags: [
          { en: 'CC Immune', 'zh-TW': '霸體' },
          { en: 'Chain Knockup', 'zh-TW': '連環擊飛' },
          { en: 'Damage Reduction', 'zh-TW': '減傷' },
        ],
      },
      {
        hero: 'zhang-fei',
        reason: {
          en: 'Zhang Fei Ultimate pushes Marco out of effective range — can\'t deal damage while flying across the screen. Team-wide shield negates all of Marco\'s lane poke. In transformed state, he\'s too tanky for Marco to burst before Zhang Fei\'s team collapses.',
          'zh-TW': '張飛大招把馬可推出輸出範圍——人飛了打什麼傷害。全隊護盾讓馬可對線消耗全白打。變身後坦度爆炸，馬可一套打完張飛還站著，隊友就壓上來了。',
        },
        tags: [
          { en: 'Displacement', 'zh-TW': '擊退' },
          { en: 'Team Shield', 'zh-TW': '團隊護盾' },
          { en: 'Massive HP', 'zh-TW': '超高血量' },
        ],
      },
      {
        hero: 'yu-ji',
        reason: {
          en: 'Yu Ji\'s Skill 2 grants 2s physical damage immunity — Marco\'s entire kit deals zero damage. Her Ultimate is a point-click stun he cannot dodge. In a pure 1v1 matchup, Yu Ji bullies Marco in lane with Skill 2 up and forces him to concede farm.',
          'zh-TW': '虞姬二技能物理免疫2秒——馬可全套技能打空氣。大招指向暈眩他躲不掉。純射手1v1對線，虞姬開二技能往臉上走馬可就得退。',
        },
        tags: [
          { en: 'Physical Immune', 'zh-TW': '物理免疫' },
          { en: 'Point-Click Stun', 'zh-TW': '指向暈眩' },
          { en: 'Lane Bully', 'zh-TW': '對線碾壓' },
        ],
      },
      {
        hero: 'liu-bang',
        reason: {
          en: 'Liu Bang\'s Ultimate (teleport + massive shield) saves any ally Marco dives. Skill 1 shield blocks the burst, Skill 2 stun cancels Fevered Barrage. Marco commits his Ultimate — suddenly the target has a huge shield and Liu Bang appears next to him.',
          'zh-TW': '劉邦大招傳送+巨量護盾直接廢掉馬可的入場。一技能護盾吃爆發，二技能暈眩打斷大招讀條。馬可轉大的瞬間目標身上多出一大管護盾，劉邦落地補暈。',
        },
        tags: [
          { en: 'Global Shield', 'zh-TW': '全圖護盾' },
          { en: 'Teleport Save', 'zh-TW': '傳送救援' },
          { en: 'Stun Cancel', 'zh-TW': '暈眩打斷' },
        ],
      },
      {
        hero: 'luban-no-7',
        reason: {
          en: 'Luban No.7 outranges Marco significantly. Passive scattershot + Skill 1 forces Marco to burn Skill 2 defensively. Marco can never walk up to trade. Late game Luban kills Marco before he enters Ultimate range.',
          'zh-TW': '魯班七號手比馬可長太多。被動掃射+一技能逼馬可全程後退。馬可根本走不上去換血。後期魯班在大招範圍外就能秒馬可。',
        },
        tags: [
          { en: 'Range Advantage', 'zh-TW': '手長壓制' },
          { en: 'Poke King', 'zh-TW': '消耗之王' },
          { en: 'Late Game', 'zh-TW': '後期碾壓' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Marco Polo is a low-elo pubstomper that falls off hard in Diamond+. Tank-heavy meta is a double-edged sword: more HP pools = more passive stack time, but also more CC chains to interrupt his Ultimate. His core items (Doomsday + Frigid Charge) are unchanged — other marksmen simply outscale him in the current meta.',
        'zh-TW': '馬可波羅是低分段虐菜英雄，鑽石以上斷崖式下滑。坦克版本是雙面刃：血量多=更多時間疊被動，但連控更多=大招容易被斷。核心裝（末世+冰霜衝擊）一直沒改動——純粹是其他射手在當前版本比他強。',
      },
      reasons: [
        {
          en: 'His lane phase is weak — Yu Ji, Luban No.7, Hou Yi all out-trade him. Marco cannot walk up to farm without losing HP.',
          'zh-TW': '對線弱——虞姬、魯班、后羿隨便換血都贏。馬可上前補兵就掉血。',
        },
        {
          en: 'Tank meta hurts more than helps. More CC chains (Lian Po, Zhang Fei are everywhere) mean Marco gets locked down during Ultimate.',
          'zh-TW': '坦克版本弊大於利。更多連控（廉頗、張飛滿大街）讓馬可轉大就被打斷。',
        },
        {
          en: 'High-elo players save stuns specifically for Fevered Barrage. Low-elo players panic and run; Diamond+ counters him by just holding CC.',
          'zh-TW': '高分段專門留控等他開狂熱彈幕。低分段看轉大就慌，鑽石以上故意留暈廢他大招。',
        },
      ],
    },
    why: [
      {
        en: 'Marco needs Attack Speed to fire bullets — CC him before he stacks. No bullets = no damage, no passive true damage proc. Tanks like Lian Po and Zhang Fei have multiple CC layers to keep him locked down.',
        'zh-TW': '馬可依賴攻速堆子彈——被動疊滿前控住他。沒子彈=沒傷害=沒真傷。廉頗、張飛等多段控坦克讓他全程動不了。',
      },
      {
        en: 'His passive true damage requires 10 hits to proc. Tanks with shields and damage reduction survive long enough for the team to collapse on him.',
        'zh-TW': '被動真傷要打10下才觸發。有護盾和減傷的坦克能扛到隊友支援——馬可交了全套技能沒打死人就廢了。',
      },
      {
        en: 'Zero hard CC, no self-peel beyond Skill 2 blink (5s cooldown). Dive him with multiple teammates and he has no answer.',
        'zh-TW': '零硬控，自保只有二技能位移（5秒CD）。多人一起衝臉他完全沒轍。',
      },
    ],
    mistakes: [
      {
        en: 'Chasing Marco when his Skill 2 is still up — he dashes away and kites. Wait for him to blink (5s CD), then engage. Zone him off farm if he holds it.',
        'zh-TW': '追馬可時他二技能還捏著——他瞬走然後風箏你。等他交完位移（5秒CD）再上。死捏著不交就卡他位置不讓吃兵。',
      },
      {
        en: 'Building magic resist against Marco. His damage is physical + true damage. Stack HP and physical armor. The tiny base magic damage on his skills is negligible.',
        'zh-TW': '對馬可出魔抗。他的傷害是物理+真傷，跟法傷沒關係。堆血量和物防。技能那一點基礎法傷可以忽略。',
      },
      {
        en: 'Fighting 5v5 when Marco has Doomsday + Frigid Charge (his 2-item power spike). He deletes squishies in 2s. Dive him before he gets there, or don\'t take fair fights.',
        'zh-TW': '馬可末世+冰霜衝擊兩件出完還打正面5v5。那是他最強時間點——2秒融化脆皮。要嘛前期抓爆他，要嘛別跟他打公平團。',
      },
    ],
    faqUltimate: {
      en: 'Marco stands still for 1.5s during Fevered Barrage. Step 1: save one hard CC (stun/suppression) for when he starts spinning. Step 2: if targeted, Purify and walk **sideways** out of range — running straight back still gets you hit. Step 3: spread formation so he hits at most 2 people. After his Ultimate ends, he has zero kill threat for ~50s — force a fight immediately.',
      'zh-TW': '馬可開狂熱彈幕站樁1.5秒。第一步：專門留一個硬控等他轉起來。第二步：被鎖定立刻淨化，**往側邊走**出範圍——直線後退子彈還是追得到。第三步：散開站位，最多讓他打到2個人。大招放完有約50秒真空期——立刻反打。',
    },
    faqItems: {
      en: '**Tanks:** Stack HP + physical armor (Frostscar\'s Embrace, Sage\'s Sanctuary). Skip magic resist — Marco deals physical + true damage. **Marksmen:** Destiny as 3rd/4th item to survive his burst. **Supports:** If your team lacks hard CC, buy Frigid Charge or an active-stun item. **Key:** Items help, but CC coordination during his Ultimate is what actually beats him.',
      'zh-TW': '**坦克：** 堆血量+物防（冰痕之握、賢者的庇護）。別出魔抗——馬可是物理+真傷。**射手：** 第三/四件出名刀・司命保命。**輔助：** 隊友缺硬控就出冰霜衝擊或帶主動暈的裝備。**核心：** 裝備有幫助，但真正解法是大招收控——暈住就廢。',
    },
    faqWho: {
      en: 'Lian Po (#1 counter) — CC immunity walks through Skill 1, chain-knockup cancels Ultimate. Zhang Fei — pushes Marco out of range, team-wide shield. Liu Bang — global teleport shield saves any dive target, Skill 2 stuns mid-Ultimate. Yu Ji — 2s physical immunity makes Marco deal zero damage. Luban No.7 — outranges him so hard Marco can\'t even farm.',
      'zh-TW': '廉頗（頭號天敵）——霸體無視一技能，連環擊飛斷大招。張飛——推出輸出範圍，全隊護盾。劉邦——全圖傳送護盾救場，二技能暈眩打斷大招。虞姬——2秒物理免疫讓馬可零輸出。魯班七號——手長壓制，馬可連兵都補不了。',
    },
    faqHowToLane: {
      en: 'Poke Marco every time he steps up to last-hit — he has zero sustain before level 6. Call jungle ganks pre-4 (his only escape is Skill 2, 5s CD). If your support has hard CC, lock him under tower after he burns Skill 2. The goal: never let him reach Doomsday + Frigid Charge without dying at least twice. A behind Marco is one of the weakest heroes in the game.',
      'zh-TW': '馬可每次上前補兵就消耗他——6級前零續航。叫打野4級前來抓（唯一逃生是二技能，5秒CD）。輔助有硬控就等他交完二技能控到塔下。核心目標：決不能讓他順利出到末世+冰霜衝擊——至少抓死兩次。落後的馬可是全遊戲最弱的英雄之一。',
    },
    faqSeason: {
      en: 'Marco is a low-elo pubstomper. Bronze–Gold: players don\'t CC his Ultimate, don\'t spread — free wins. Diamond+: coordinated teams save stuns for Fevered Barrage, tanks walk into his face. Verdict: spam Marco below Diamond. Diamond+ only pick him with a dedicated peel support (Yaria, Zhang Fei).',
      'zh-TW': '馬可低分段虐菜神器。青銅~黃金：玩家不留控、不散開——免費上分。鑽石以上：配好的隊伍專門留控等他開大，坦克直接衝臉。結論：鑽石以下隨便選馬可上分。鑽石以上只有輔助是瑤或張飛這種強保人型才考慮拿。',
    },
  },
  'gao-changgong': {
    why: [
      {
        en: 'Vision tools and early invades reveal his long stealth windows before level 4 spike.',
        'zh-TW': '視野與反野在 4 級前抓出長時間隱身，限制蘭陵王節奏。',
      },
      {
        en: 'Point-and-click CC (Zhang Liang ult, Donghuang) locks him the moment he commits.',
        'zh-TW': '張良大招、東皇等指向性控，在他現身瞬間鎖死。',
      },
      {
        en: 'Grouped farming forces him to waste ultimate on minions or show on vision.',
        'zh-TW': '抱團清線逼他用大招清兵或暴露在視野下。',
      },
    ],
    mistakes: [
      {
        en: 'Face-checking bushes alone as a squishy carry — assume Lanling is in every fog.',
        'zh-TW': '脆皮單人探草 — 預設每叢草裡都有蘭陵王。',
      },
      {
        en: 'Wasting your only escape on his clone or a fake engage.',
        'zh-TW': '把唯一位移交在分身或假開團上。',
      },
      {
        en: 'Split-pushing without trinket vision when Lanling is off-map.',
        'zh-TW': '蘭陵王消失時單帶不插眼。',
      },
    ],
    faqUltimate: {
      en: 'Stay near allies when his ult indicator blinks faster (closer range); use AoE reveal (Crimson Shadow Radiance) or stay under tower until he shows.',
      'zh-TW': '指示器閃得快代表距離近，抱團或塔下等視野；極影·形昭等可照隱身。',
    },
    faqItems: {
      en: 'Early HP (boots + tank component); Purify only if he runs Execute — vision is more important than raw armor.',
      'zh-TW': '前期補血量；淨化看情況，視野比堆甲更重要。',
    },
  },


  'luban-no-7': {
    why: [
      {
        en: 'Assassins and blink divers reach Luban before his scattershot passive ramps.',
        'zh-TW': '刺客突脸在他扫射被动叠起来前秒掉。',
      },
      {
        en: 'Hard CC stops his enhanced basic attacks from proccing AoE scatter.',
        'zh-TW': '硬控打断强化普攻和扫射触发。',
      },
      {
        en: 'Early game bullies deny farm — Luban is immobile without flash.',
        'zh-TW': '前期压制发育，无闪现时极难自保。',
      },
    ],
    mistakes: [
      {
        en: 'Standing in his Skill 3 rocket line during siege — sidestep or engage behind it.',
        'zh-TW': '推塔时站在三技能火箭线上。',
      },
      {
        en: 'Ignoring his passive fifth-shot scatter in trades — back off on the counter.',
        'zh-TW': '对拼时不数他第五下扫射。',
      },
      {
        en: 'Leaving him unpeeled in teamfights when he has two items.',
        'zh-TW': '两件装后团战不保护后排、不切他。',
      },
    ],
    faqUltimate: {
      en: 'Dodge the rocket barrage sideways; engage while missiles are on cooldown or from flanks he cannot aim.',
      'zh-TW': '横向躲火箭雨；技能空窗或绕侧翼开团。',
    },
    faqItems: {
      en: 'Early magic resist or HP vs his mixed damage; anti-assassin armor if jungler feeds him.',
      'zh-TW': '前期魔抗/血量；被喂肥则出防刺客装。',
    },
  },
  'mi-yue': {
    why: [
      {
        en: 'Burst and grievous wounds cut through her shadow-lifesteal sustain in extended trades.',
        'zh-TW': '爆发+制裁克制她影子吸血续航。',
      },
      {
        en: 'CC interrupts her ultimate channel and prevents untargetable reposition.',
        'zh-TW': '控制打断大招，不让她无敌换位。',
      },
      {
        en: 'Early aggressive fighters win before she stacks shadow power on side lane.',
        'zh-TW': '前期战士压线，不让她叠暗影。',
      },
    ],
    mistakes: [
      {
        en: 'Trading into her when she has full shadow stacks and ultimate ready.',
        'zh-TW': '她满暗影+有大时还跟她换血。',
      },
      {
        en: 'Chasing her into minion waves where her passive heals freely.',
        'zh-TW': '追进兵堆让她被动狂回血。',
      },
      {
        en: 'Forgetting grievous wounds after she completes lifesteal core.',
        'zh-TW': '她出吸血装后不出制裁/梦魇。',
      },
    ],
    faqUltimate: {
      en: 'Save hard CC for when she channels ult; burst her before shadow stacks max out.',
      'zh-TW': '留控给大招读条；暗影未满时集火。',
    },
    faqItems: {
      en: 'Grievous wounds (Nirvana Crossbow, Purify Blades); magic resist for her mixed damage.',
      'zh-TW': '制裁/梦魇；混伤时补魔抗。',
    },
  },




  'huang-zhong': {
    why: [
      {
        en: 'Flankers and assassins hit Huang Zhong while he is locked in ultimate channel.',
        'zh-TW': '绕后在他大招读条时切他。',
      },
      {
        en: 'Hard engage forces him to cancel siege or die channeling.',
        'zh-TW': '强开逼他取消大招或读条死。',
      },
      {
        en: 'Dive comps with multiple threats split his peel in bot lane.',
        'zh-TW': '多人冲脸分散辅助保护。',
      },
    ],
    mistakes: [
      {
        en: 'Walking into his minefield without sweeping vision.',
        'zh-TW': '不排雷就走位。',
      },
      {
        en: 'Starting objectives while he is free to channel on your team.',
        'zh-TW': '他无压力时开龙/暴君。',
      },
      {
        en: 'Peeling only one angle — coordinate flanks when he ults.',
        'zh-TW': '大招时只防正面、不防绕后。',
      },
    ],
    faqUltimate: {
      en: 'Flank or dive during channel; use displacement to knock him out of turret range; Purify slow if needed.',
      'zh-TW': '读条时绕后/突脸；位移推出塔外；减速带淨化。',
    },
    faqItems: {
      en: 'Armor for his physical barrage; mobility boots to reposition out of his cone.',
      'zh-TW': '物防+移速鞋，躲炮线。',
    },
  },


  'li-xin': {
    why: [
      {
        en: 'Hard CC chains shut down his Dark Form combo before he can cancel animations for burst — one stun and he dies before lifesteal kicks in.',
        'zh-TW': '硬控鏈打斷暗形態連招取消動畫的爆發節奏——一個暈眩就能在他吸血生效前帶走。',
      },
      {
        en: 'Kiting marksmen and mages exploit his short range in Dark Form — he burns dash to close gaps, then has no escape when you re-position.',
        'zh-TW': '風箏型射手/法師拉開距離——暗形態手短，交完突進後你位移拉開他就只能白挨打。',
      },
      {
        en: 'Early-game lane bullies deny his weak level 1–3 before form swap — freeze wave near your tower and he cannot trade without dying.',
        'zh-TW': '前期線霸在他 1–3 級形態切換前壓制——把兵線控在塔前，他上前換血就死。',
      },
    ],
    mistakes: [
      {
        en: 'Trading into him when his Dark Form passive stacks are maxed and wave is present — he heals per hit on minions and out-sustains you.',
        'zh-TW': '他暗形態被動疊滿且有兵線時還對拼——他打小兵回血，續航遠超你。',
      },
      {
        en: 'Standing in the wide slash arc of his charged Skill 2 — it deals bonus damage at max range and slows for follow-up engage.',
        'zh-TW': '站在他蓄力二技能的大範圍斬擊線上——最遠距離有額外傷害且減速，他順勢突臉。',
      },
      {
        en: 'Ignoring his split-push after winning your lane — Li Xin melts towers with Dark Form attack speed; match his sidelane or lose inhib.',
        'zh-TW': '打贏對線後不跟他的邊帶——暗形態攻速拆塔極快，不牽制高地塔就沒了。',
      },
    ],
    faqUltimate: {
      en: 'Disengage immediately when he ults into Dark Form — the attack speed and lifesteal spike lasts 8s. Kite it out, then re-engage while his ult is on cooldown.',
      'zh-TW': '他大招變暗形態立刻拉開——8 秒的攻速吸血爆發期別硬剛，等大招冷卻再反打。',
    },
    faqItems: {
      en: 'Armor (Frostscar\'s Embrace) vs his physical burst; anti-heal (Venomous Staff / Purify Blades) cuts his Dark Form lifesteal sustain.',
      'zh-TW': '物防（冰痕之握）扛物理爆發；制裁/夢魘克制暗形態吸血續航。',
    },
  },




  'hou-yi': {
    why: [
      {
        en: 'Dive comps with multiple gap-closers overwhelm Hou Yi — he has zero mobility and relies entirely on flash and peel to survive.',
        'zh-TW': '多人衝臉陣容直接淹沒后羿——零位移，完全依賴閃現和隊友保護才能活。',
      },
      {
        en: 'Assassins with stealth or long-range engage punish his immobile positioning — he cannot dodge without flash and dies to any flank.',
        'zh-TW': '隱身或長距突進刺客針對站位——沒閃現躲不掉，繞後必死。',
      },
      {
        en: 'Early lane pressure and repeated ganks delay his attack-speed item spike — Hou Yi needs 2+ items to deal meaningful DPS.',
        'zh-TW': '前期壓線+反覆抓下路拖慢攻速裝成型——后羿需要兩件以上才有威脅。',
      },
    ],
    mistakes: [
      {
        en: 'Standing in his ultimate sun zone — it deals sustained AoE damage and slows; walk out immediately and re-engage from outside.',
        'zh-TW': '站在大招太陽圈裡不走——持續AOE傷害+減速，立刻走出再從圈外打。',
      },
      {
        en: 'Fighting front-to-back without flanking — Hou Yi melts tanks and frontline if he can free-fire from behind his team.',
        'zh-TW': '只打正面不繞後——后羿在隊友背後無壓力輸出能融化坦克。',
      },
      {
        en: 'Letting him free-farm in a losing matchup — if your comp cannot outscale, you must deny his farm or lose late game.',
        'zh-TW': '劣勢對線還放任發育——陣容後期不如他就必須壓制，否則後期穩輸。',
      },
    ],
    faqUltimate: {
      en: 'Exit the sun field immediately; flank or dive him during ultimate channel when he\'s stationary. Use hard CC to cancel the channel or burst him before he can reposition.',
      'zh-TW': '立刻走出太陽圈；大招讀條站樁時繞後或突臉。硬控打斷讀條或在他換位前集火。',
    },
    faqItems: {
      en: 'Armor (Frostscar\'s Embrace) for his physical DPS; dive survivability (Sage\'s Sanctuary) on assassins who commit to killing him.',
      'zh-TW': '物防（冰痕之握）扛持續物理輸出；刺客出賢者庇護保證切後成功。',
    },
  },


  'liu-bei': {
    why: [
      {
        en: 'Kiting and percent-HP damage beat Liu Bei in extended brawls.',
        'zh-TW': '风筝+百分比伤害磨死。',
      },
      {
        en: 'Disengage when he ults for attack speed and lifesteal.',
        'zh-TW': '大招攻速吸血期间拉开。',
      },
      {
        en: 'Early invades before he completes jungle item spike.',
        'zh-TW': '大件成型前反野压制。',
      },
    ],
    mistakes: [
      {
        en: 'Melee brawling during his ultimate lifesteal window.',
        'zh-TW': '大招吸血时近战硬刚。',
      },
      {
        en: 'Letting him invade your jungle with no collapse.',
        'zh-TW': '被反野不包夹。',
      },
      {
        en: 'No grievous wounds in long fights vs Liu Bei.',
        'zh-TW': '持久战不出制裁。',
      },
    ],
    faqUltimate: {
      en: 'Disengage and kite until ult ends; do not chase into brush during buff.',
      'zh-TW': '大招期间撤退风筝，buff 完再打。',
    },
    faqItems: {
      en: 'Grievous wounds; armor if he builds physical; kite with MS items.',
      'zh-TW': '制裁；物攻出装则物防；移速拉扯。',
    },
  },










  'zhang-fei': {
    why: [
      {
        en: 'Disengage and spread reduce Zhang Fei roar engage value.',
        'zh-TW': '分散站位减吼开效果。',
      },
      {
        en: 'Poke before fights so he burns shield on wave clear.',
        'zh-TW': '团战前消耗，逼他用盾清线。',
      },
      {
        en: 'Kiting marksmen avoid his short-range burst after engage.',
        'zh-TW': '射手风筝，他开团后摸不到人。',
      },
    ],
    mistakes: [
      {
        en: 'Clustering for his Skill 2 knockback into wall.',
        'zh-TW': '扎堆吃二技能撞墙。',
      },
      {
        en: 'Engaging when Zhang Fei has flash + ult ready.',
        'zh-TW': '他闪现+大就绪时盲目开团。',
      },
      {
        en: 'Ignoring peel order — focus carry while he zones your backline.',
        'zh-TW': '不处理他切后排的威胁。',
      },
    ],
    faqUltimate: {
      en: 'Spread before roar; Purify knockback if critical; burst him if he overextends.',
      'zh-TW': '吼前分散；关键位淨化击退；走位过深集火。',
    },
    faqItems: {
      en: 'Resistance boots; HP on carries; Purify vs long CC chain.',
      'zh-TW': '韧性鞋；后排血量；淨化解控链。',
    },
  },






};
