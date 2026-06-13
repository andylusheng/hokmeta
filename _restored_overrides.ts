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
  liang: {
    why: [
      {
        en: 'Assassins and divers close the gap before Zhang Liang can channel his suppression ult.',
        'zh-TW': '刺客/戰士突臉，不給張良讀條大招。',
      },
      {
        en: 'Purify and control-immune frames negate his primary teamfight tool.',
        'zh-TW': '淨化與免控技能直接化解大招。',
      },
      {
        en: 'Poke mages outrange him in lane and force him to burn skills on waves.',
        'zh-TW': '長手法师消耗，逼他用技能清線。',
      },
    ],
    mistakes: [
      {
        en: 'Walking in a straight line toward him without baiting Skill 2 walls.',
        'zh-TW': '直線走向他而不躲二技能牆。',
      },
      {
        en: 'Engaging 5v5 while his ultimate is available and your carry has no Purify.',
        'zh-TW': '大招在、後排沒淨化還硬開團。',
      },
      {
        en: 'Letting him roam unpunished after a failed gank — take plates or invade.',
        'zh-TW': '他遊走失敗不反野、不推塔。',
      },
    ],
    faqUltimate: {
      en: 'Spread, bait the ult on a tank with Purify ready, or dive him while he channels — the channel is interruptible.',
      'zh-TW': '分散站位，用坦克骗大+淨化，或读条时突脸打断。',
    },
    faqItems: {
      en: 'Resistance boots early; Purify on carries; magic resist if he builds full damage.',
      'zh-TW': '韧性鞋、后排淨化；他出法伤再补魔抗。',
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
  garuda: {
    why: [
      {
        en: 'Long-range mages poke her before she can fly in with Skill 2.',
        'zh-TW': '长手法师在她二技能飞近前消耗。',
      },
      {
        en: 'Anti-air hard CC (Donghuang, suppression) grounds her mid-flight.',
        'zh-TW': '东皇等硬控在她飞行途中落地。',
      },
      {
        en: 'Early invades punish her weak clear before first item.',
        'zh-TW': '前期反野，第一件装备前清野慢。',
      },
    ],
    mistakes: [
      {
        en: 'Standing still when she marks you — move unpredictably to dodge dive angle.',
        'zh-TW': '被标记后站桩 — 走位打乱俯冲角度。',
      },
      {
        en: 'Engaging when her ultimate lifesteal is active without burst focus.',
        'zh-TW': '她大招吸血时慢慢打而不集火。',
      },
      {
        en: 'Letting her scale uncontested on a winning side lane.',
        'zh-TW': '优势路放任她发育。',
      },
    ],
    faqUltimate: {
      en: 'Burst her during ult before lifesteal heals back; use grievous wounds and CC when she lands.',
      'zh-TW': '大招期间集火+制裁，落地接控。',
    },
    faqItems: {
      en: 'Magic resist and HP; grievous wounds if she builds lifesteal mage items.',
      'zh-TW': '魔抗血量；她出吸血法装则制裁。',
    },
  },
  aoyin: {
    why: [
      {
        en: 'Tanks with sustained CC survive his burst combo and lock him after his invuln ends.',
        'zh-TW': '坦辅用持续控制扛过爆发，无敌结束立刻留人。',
      },
      {
        en: 'Early lane pressure before he unlocks full dragon form skill cycle.',
        'zh-TW': '龙形态技能未齐前压线压制。',
      },
      {
        en: 'Grouped play reduces pick potential on isolated targets.',
        'zh-TW': '抱团走位，不给他单抓机会。',
      },
    ],
    mistakes: [
      {
        en: 'Trading when his elemental shields are stacked — wait for cooldowns.',
        'zh-TW': '元素盾叠满时还对拼。',
      },
      {
        en: 'Chasing through his Skill 3 terrain after he uses escape tools.',
        'zh-TW': '他用三技能地形逃生后深追。',
      },
      {
        en: 'Banning without picking hard engage — he wins poke wars at range.',
        'zh-TW': '只禁不选开团 — 远程消耗战他占优。',
      },
    ],
    faqUltimate: {
      en: 'Bait his invulnerability then CC immediately after; do not burn everything while he is immune.',
      'zh-TW': '骗出无敌再交控，无敌期间别交满技能。',
    },
    faqItems: {
      en: 'Mixed resist early; Purify on carries vs his CC chain.',
      'zh-TW': '双抗/血量；后排淨化解连锁控。',
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
  wukong: {
    why: [
      {
        en: 'Early invade and vision collapse his snowball if he cannot farm camps.',
        'zh-TW': '反野+视野让他刷不起来。',
      },
      {
        en: 'Point CC catches him after he commits with dash engages.',
        'zh-TW': '他突进后接指向性控。',
      },
      {
        en: 'Tank junglers outscale him in front-to-back teamfights.',
        'zh-TW': '坦克打野正面团更耐打。',
      },
    ],
    mistakes: [
      {
        en: 'Fighting in his clone confusion without tracking the real body.',
        'zh-TW': '分身混淆时乱交技能不找真身。',
      },
      {
        en: 'Letting him invade at level 1 uncontested.',
        'zh-TW': '一级不防反野。',
      },
      {
        en: 'Chasing a low Wukong through enemy jungle without vision.',
        'zh-TW': '残血悟空追进对面野区无视野。',
      },
    ],
    faqUltimate: {
      en: 'Save CC for after he lands from ultimate; spread so his AoE knockup hits fewer targets.',
      'zh-TW': '大招落地再接控；分散站位减击飞人数。',
    },
    faqItems: {
      en: 'Armor and HP for his burst; early vision trinket vs invades.',
      'zh-TW': '物防血量；前期买眼防反野。',
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
  dun: {
    why: [
      {
        en: 'Grievous wounds and percent-HP damage cut his massive regeneration.',
        'zh-TW': '制裁+百分比伤害克制回血。',
      },
      {
        en: 'Kiting marksmen and mages avoid his short-range hook threat.',
        'zh-TW': '远程风筝，不给他钩子近身。',
      },
      {
        en: 'True damage and armor shred reduce his effective tankiness.',
        'zh-TW': '真伤/破甲让他没那么肉。',
      },
    ],
    mistakes: [
      {
        en: 'Extended trades when his passive shield is up.',
        'zh-TW': '被动护盾在时还 prolonged 对拼。',
      },
      {
        en: 'No grievous wounds in a 20-minute game vs Xiahou Dun.',
        'zh-TW': '打夏侯惇整局不出制裁。',
      },
      {
        en: 'Letting him face-tank without focusing him when your team has DPS.',
        'zh-TW': '有输出却不集火他。',
      },
    ],
    faqUltimate: {
      en: 'Kite outside his ult radius; save burst for after shield expires.',
      'zh-TW': '大招圈外风筝；护盾结束再爆发。',
    },
    faqItems: {
      en: 'Grievous wounds mandatory; penetration for late game.',
      'zh-TW': '必出制裁；后期补穿透。',
    },
  },
  daji: {
    why: [
      {
        en: 'Assassins with blink engage delete Daji before her point-and-click charm finishes casting — she has zero mobility and dies to any flank.',
        'zh-TW': '刺客突臉在她指向魅惑抬手前秒掉——零位移，繞後必死。',
      },
      {
        en: 'Purify, spell shields, and CC-immunity frames completely negate her entire combo — Daji\'s kill threat vanishes if charm doesn\'t land.',
        'zh-TW': '淨化、法術護盾、免控幀直接讓整套連招報廢——魅惑不中妲己就沒威脅。',
      },
      {
        en: 'Early jungle pressure and mid-lane bullies deny her farm — Daji needs 2+ items to one-shot and is useless before her first power spike.',
        'zh-TW': '前期野區施壓和線霸壓制發育——妲己需要兩件以上才能秒人，第一件裝備前毫無作用。',
      },
    ],
    mistakes: [
      {
        en: 'Walking in a straight line toward her when charm is off cooldown — stagger approach angles and use minions to block Skill 1 poke.',
        'zh-TW': '魅惑CD好時直線走位——分散進場角度並用小兵擋一技能消耗。',
      },
      {
        en: 'Face-checking bushes as a squishy when Daji is missing from minimap — she sits in brush waiting for charm picks all game.',
        'zh-TW': '妲己從地圖消失時脆皮探草——她整局都在草裡等魅惑。',
      },
      {
        en: 'Burning Purify on her Skill 1 poke instead of saving it for charm — the charm is her only kill setup tool.',
        'zh-TW': '一技能消耗就交淨化而不是留給魅惑——魅惑是她唯一的擊殺啟動器。',
      },
    ],
    faqUltimate: {
      en: 'Spread formation so her 5-hit ultimate splits across multiple targets instead of one-shotting a single carry. Save Purify or spell shield for when she charms before ulting.',
      'zh-TW': '分散站位讓她大招五段分散到多人而不是秒單核。留淨化或法術盾在她魅惑接大招時使用。',
    },
    faqItems: {
      en: 'Magic resist (Sage\'s Sanctuary) early; Purify on carries is mandatory — Daji\'s entire kit revolves around charm → ult combo.',
      'zh-TW': '前期魔抗（賢者庇護）；後排必帶淨化——妲己整套技能圍繞魅惑→大招連招。',
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
  angela: {
    why: [
      {
        en: 'Assassins and divers delete Angela before she channels her full combo — her Skill 2 stun has a travel time and she\'s immobile during her ultimate beam channel.',
        'zh-TW': '刺客和戰士在她完整連招前秒掉——二技能暈眩有飛行時間，大招光束期間無法移動。',
      },
      {
        en: 'Long-range poke mages outrange her in lane — she must walk up to land Skill 2, and you can punish her approach every time.',
        'zh-TW': '長手法師消耗壓制——她必須走近才能丟二技能，每次上前都能反打。',
      },
      {
        en: 'Spread formation prevents multi-target stuns and reduces her ultimate\'s total damage output across your team.',
        'zh-TW': '分散站位不給她多人暈眩機會，大招總傷害也會被分攤。',
      },
    ],
    mistakes: [
      {
        en: 'Stacking on top of each other so one Skill 2 stuns your entire team — Angela\'s full combo wipes clumped targets instantly.',
        'zh-TW': '扎堆讓她一發二技能暈全隊——安琪拉完整連招秒團。',
      },
      {
        en: 'Walking in a straight line toward her — sidestep her Skill 2 fireball, then engage while stun is on cooldown.',
        'zh-TW': '直線走位吃火球——橫向走位躲二技能，暈眩CD時反打。',
      },
      {
        en: 'Ignoring her passive stacks — Angela gains bonus damage per skill hit; don\'t let her poke you for free to build stacks before a fight.',
        'zh-TW': '不注意她的被動層數——每次技能命中疊傷害，團戰前不要白吃消耗。',
      },
    ],
    faqUltimate: {
      en: 'Flank her during the ultimate channel — she cannot move or turn quickly. Save a dash to dodge behind her beam. CC her to cancel the channel entirely.',
      'zh-TW': '大招期間繞側翼——她無法移動也轉向慢。留位移繞到光束後面。控住可以直接打斷大招。',
    },
    faqItems: {
      en: 'Magic resist (Sage\'s Sanctuary) to survive her burst combo; Purify to escape the Skill 2 stun into ultimate death trap.',
      'zh-TW': '魔抗（賢者庇護）扛爆發連招；淨化解二技能暈眩後的大招必殺。',
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
  yaria: {
    why: [
      {
        en: 'Burst and displacement knock Yaria off her linked carry — she dies alone.',
        'zh-TW': '爆发/位移把她从宿主身上打下来。',
      },
      {
        en: 'AoE damage hits both Yaria and host when they share space.',
        'zh-TW': 'AOE 同时打到瑶和附身目标。',
      },
      {
        en: 'Early aggression before she completes shield cooldown items.',
        'zh-TW': '前期在她护盾装成型前压制。',
      },
    ],
    mistakes: [
      {
        en: 'Single-targeting only the marksman while Yaria grants shields.',
        'zh-TW': '只打射手不处理瑶的护盾节奏。',
      },
      {
        en: 'Letting bot lane 2v2 scale uncontested with Yaria hyper-carry.',
        'zh-TW': '瑶+核发育路放任发育。',
      },
      {
        en: 'No anti-shield burst when she has two support items.',
        'zh-TW': '她两件辅助装后仍慢慢磨。',
      },
    ],
    faqUltimate: {
      en: 'CC the host when Yaria detaches; burst during detach animation.',
      'zh-TW': '脱落瞬间接控集火宿主。',
    },
    faqItems: {
      en: 'Penetration and burst; Purify less useful — focus breaking link.',
      'zh-TW': '穿透爆发破盾；重点打脱落窗口。',
    },
  },
  lan: {
    why: [
      {
        en: 'Early invade and CC shut down Lan before he unlocks full combo resets.',
        'zh-TW': '前期反野+控，不让他刷出节奏。',
      },
      {
        en: 'Tank frontline absorbs his burst and survives his execute threshold.',
        'zh-TW': '坦克吃爆发，不给他收割线。',
      },
      {
        en: 'Grouped vision prevents pick resets off isolated targets.',
        'zh-TW': '视野抱团防单抓刷大招。',
      },
    ],
    mistakes: [
      {
        en: 'Fighting at low HP inside his ultimate reset zone.',
        'zh-TW': '残血在他大招圈里打。',
      },
      {
        en: 'Chasing a stacked Lan without hard CC ready.',
        'zh-TW': '没硬控追满层澜。',
      },
      {
        en: 'Ignoring his side-lane pressure after a kill.',
        'zh-TW': '杀一次后不控线、不反野。',
      },
    ],
    faqUltimate: {
      en: 'Save CC for when he enters execute range; disengage when he resets stacks.',
      'zh-TW': '斩杀线留控；他刷大时拉开。',
    },
    faqItems: {
      en: 'Armor and HP; grievous wounds if he builds lifesteal.',
      'zh-TW': '物防血量；吸血装则制裁。',
    },
  },
  musashi: {
    why: [
      {
        en: 'Hard CC interrupts Musashi dual-stance combos mid-animation.',
        'zh-TW': '硬控打断双刀连招。',
      },
      {
        en: 'Tankier junglers survive his burst and trade longer.',
        'zh-TW': '坦野扛爆发反打。',
      },
      {
        en: 'Vision on his jungle path prevents snowball from first blood.',
        'zh-TW': '视野防首杀滚雪球。',
      },
    ],
    mistakes: [
      {
        en: 'Trading when he has full passive stacks and both stances ready.',
        'zh-TW': '被动满+双形态就绪还对拼。',
      },
      {
        en: 'Face-checking river without knowing Musashi position.',
        'zh-TW': '不知道宫本位置就探河。',
      },
      {
        en: 'Letting him scale on winning side without matching farm.',
        'zh-TW': '优势路宫本不跟发育。',
      },
    ],
    faqUltimate: {
      en: 'Dodge the aerial slash landing zone; CC when he lands; spread to reduce AoE.',
      'zh-TW': '躲空中斩落点；落地控；分散减AOE。',
    },
    faqItems: {
      en: 'Armor for physical burst; early HP component.',
      'zh-TW': '物防+前期血量。',
    },
  },
  augran: {
    why: [
      {
        en: 'Kiting and disengage punish Augran when he commits with soul chains — break the tether by dashing or walking out of max range, then he loses all sustain.',
        'zh-TW': '風箏和拉開克制他魂鏈近身——位移或走出最大範圍掙斷鏈子，他就失去續航。',
      },
      {
        en: 'Burst him before his god-form execute threshold activates — Augran\'s kill pressure spikes when targets drop below 30% HP.',
        'zh-TW': '神巫形態斬殺線啟動前灌滿傷害——目標血量低於 30% 時大司命斬殺威脅暴漲。',
      },
      {
        en: 'Early jungle invades and counter-jungling delay his level 4 power spike — Augran needs god form to gank effectively.',
        'zh-TW': '4 級前反野和控野區拖慢發育——大司命需要神巫形態才能有效抓人。',
      },
    ],
    mistakes: [
      {
        en: 'Letting soul chains stack to max frequency without breaking them — each tick heals him; dash away immediately when tethered.',
        'zh-TW': '魂鏈疊滿頻率還不掙脫——每跳都回血，被鏈到立刻位移拉開。',
      },
      {
        en: 'Fighting inside his Skill 1 terrain path — he gains bonus movement speed and damage along the path; force fights elsewhere.',
        'zh-TW': '在他一技能路徑上開團——路徑上他加移速加傷害，強制在路徑外打。',
      },
      {
        en: 'Staying at low HP within his ultimate execute range — Augran\'s god form can execute from range; recall or heal before re-engaging.',
        'zh-TW': '殘血還在他大招斬殺範圍內晃——神巫形態可遠程斬殺，先回城或補血再進場。',
      },
    ],
    faqUltimate: {
      en: 'Disengage when he enters god form — he gains bonus range and execute damage. Keep HP above 30%, kite his enhanced attacks, and burst him after god form expires.',
      'zh-TW': '神巫形態時拉開——他獲得額外射程和斬殺傷害。保持血量高於 30%，風箏強化普攻，形態結束後再集火。',
    },
    faqItems: {
      en: 'HP stacking to survive execute threshold; grievous wounds (Venomous Staff / Purify Blades) to cut his chain healing; movement speed to break tethers faster.',
      'zh-TW': '堆血量扛斬殺線；制裁/夢魘克制鏈子回血；移速快速掙脫魂鏈。',
    },
  },
  kaizer: {
    why: [
      {
        en: 'Percent-HP and true damage bypass Kai\'s armor stacking.',
        'zh-TW': '百分比/真伤无视铠叠甲。',
      },
      {
        en: 'Mages poke when he uses Skill 1 to farm waves.',
        'zh-TW': '他用一技能清线时法师消耗。',
      },
      {
        en: 'Kiting after he burns ultimate armor form cooldown.',
        'zh-TW': '大招护甲形态结束后再风筝。',
      },
    ],
    mistakes: [
      {
        en: 'All-in during his ultimate armor buff without grievous wounds.',
        'zh-TW': '大招加甲时硬刚且没制裁。',
      },
      {
        en: 'Trading when he has wave and level advantage.',
        'zh-TW': '他有线权+等级优势还对拼。',
      },
      {
        en: 'No magic damage when he stacks full armor.',
        'zh-TW': '他全肉不出法伤/穿透。',
      },
    ],
    faqUltimate: {
      en: 'Kite until armor ult expires; magic damage during buff if you cannot disengage.',
      'zh-TW': '大招甲结束再打；必要时用法伤磨。',
    },
    faqItems: {
      en: 'Penetration and magic damage mix; grievous wounds in brawls.',
      'zh-TW': '穿透+法伤；近战出制裁。',
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
  haya: {
    why: [
      {
        en: 'Assassins and divers burst Haya before she can drag a target into her Mirage — she\'s vulnerable during the link channel and has no escape outside her ultimate.',
        'zh-TW': '刺客在她把人拖進幻境前秒掉——鏈接讀條期間脆弱，大招之外無逃生。',
      },
      {
        en: 'Long-range poke mages outrange her in lane — Haya must walk up to land Skill 1 marks, and you can punish every approach.',
        'zh-TW': '長手法師消耗壓制——海月必須上前用一技能疊印記，每次上前都能反打。',
      },
      {
        en: 'CC during her ultimate link prevents the Mirage pull entirely — if she\'s stunned while linking, the channel breaks and the ultimate goes on full cooldown.',
        'zh-TW': '大招鏈接期間控住直接打斷——鏈接中被暈，大招中斷並進入完整冷卻。',
      },
    ],
    mistakes: [
      {
        en: 'Trading into her when she has full moon crystals and both skills off cooldown — she can chain Skill 1 → Skill 2 → enhanced auto for massive burst.',
        'zh-TW': '她滿月盤且技能全好時還對拼——1→2→強化普攻一套爆發極高。',
      },
      {
        en: 'Burning Purify or escape before she casts ultimate — save it for when the link icon appears; once pulled into Mirage, escape options are limited.',
        'zh-TW': '她放大前就交淨化/位移——留到鏈接圖標出現再用；被拖進幻境後逃生手段極少。',
      },
      {
        en: 'Fighting her 1v1 inside the Mirage — Haya gains reduced cooldowns and a shield inside; disengage and survive until the Mirage expires.',
        'zh-TW': '在幻境裡跟她 1v1——幻境內她減CD加護盾，拉開拖到幻境結束。',
      },
    ],
    faqUltimate: {
      en: 'Break the link by moving out of max range or CC\'ing her during the channel. If pulled into Mirage, play defensively and survive until it expires — she has shorter cooldowns inside.',
      'zh-TW': '走出最大範圍或鏈接時控她打斷。被拖進幻境後防守拖時間——她在裡面技能CD更短。',
    },
    faqItems: {
      en: 'Magic resist (Sage\'s Sanctuary) to survive her burst cycle; Purify to break the ultimate link channel; HP items to outlast Mirage duration.',
      'zh-TW': '魔抗（賢者庇護）扛爆發循環；淨化可解大招鏈接；血量裝撐過幻境時間。',
    },
  },
  milady: {
    why: [
      {
        en: 'Assassins and divers delete Milady before her robots can ramp — she has zero mobility and relies on minion summons for damage and zone control.',
        'zh-TW': '刺客突臉在她機器人大軍成型前秒掉——零位移，傷害完全依賴僕從。',
      },
      {
        en: 'AoE wave clear destroys her mechanical minions instantly — without minions, Milady\'s ultimate mark deals minimal damage and she loses all lane pressure.',
        'zh-TW': 'AOE清線秒掉機器人——沒僕從時大招印記傷害極低，對線壓制力歸零。',
      },
      {
        en: 'Early ganks before she stacks minion waves — Milady is weakest at levels 1–3 when she has few robots and long cooldowns.',
        'zh-TW': '機器人疊起來前抓中——1–3 級僕從少、CD長，是米萊狄最弱時期。',
      },
    ],
    mistakes: [
      {
        en: 'Letting her build up a massive robot army unchallenged — each minion kill spawns more bots; clear them immediately with AoE skills.',
        'zh-TW': '放任她堆積機器人大軍——每次擊殺小兵就召更多僕從，立刻用AOE清掉。',
      },
      {
        en: 'Standing near a marked target when her ultimate is about to explode — the explosion deals AoE damage proportional to damage taken; spread out.',
        'zh-TW': '大招印記快爆時還靠近被標記目標——印記爆炸是AOE且傷害基於所受傷害，散開。',
      },
      {
        en: 'Ignoring her tower pressure — Milady can ult structures and melt towers with robot waves; match her push or lose turrets.',
        'zh-TW': '不處理她對塔的壓力——米萊狄大招可標記防禦塔，機器人海拆塔極快。',
      },
    ],
    faqUltimate: {
      en: 'Clear her robots before engaging — the ult mark explosion scales with damage dealt while marked. Without minions, the mark deals negligible damage. CC her during the mark duration to prevent follow-up.',
      'zh-TW': '打之前先清機器人——大招印記爆炸傷害取決於標記期間造成的傷害，沒僕從傷害極低。印記期間控住她不讓補傷害。',
    },
    faqItems: {
      en: 'AoE wave clear items to delete robot swarms; magic resist for her burst; mobility to dodge Skill 1 aircraft and close the gap on her.',
      'zh-TW': 'AOE清線裝快速清機器人；魔抗扛爆發；位移躲一技能飛機並貼身。',
    },
  },
  donghuang: {
    why: [
      {
        en: 'Long-range poke and kiting prevent Donghuang from stacking dark orbs and engaging — he must walk into melee range to deal damage with his orb rotation.',
        'zh-TW': '遠程消耗和風箏不讓他疊黑暗能量體——他必須近身才能用球轉傷害。',
      },
      {
        en: 'Percent-HP damage and true damage bypass his tankiness — Donghuang builds full HP, so %HP shredders counter him directly.',
        'zh-TW': '百分比/真傷無視坦度——東皇全堆血量，%HP傷害直接克制。',
      },
      {
        en: 'Burst him before he can cast ultimate — if you delete Donghuang before he presses R, his suppression never activates and his team loses their primary engage denial.',
        'zh-TW': '他放大前集火秒掉——在東皇按R之前擊殺，壓制就放不出來，團隊失去最強反開。',
      },
    ],
    mistakes: [
      {
        en: 'Clumping up when he has 3 dark orbs and flash ready — he can flash-ult your carry and your entire team takes shared damage from his passive.',
        'zh-TW': '他三球+閃現好時扎堆——閃現大招咬你核心，全隊一起吃被動分攤傷害。',
      },
      {
        en: 'Focusing Donghuang during his ultimate suppression — damage dealt to him is shared to your teammate; wait for suppression to end or CC him to break it.',
        'zh-TW': '大招壓制期間集火東皇——打他的傷害會分攤給你隊友；等壓制結束或控他打斷。',
      },
      {
        en: 'Engaging when your carry has no Purify or spell shield — Donghuang\'s ultimate is point-and-click suppression with zero counterplay without cleanse.',
        'zh-TW': '後排沒淨化/法術盾就開團——東皇大招是指向性壓制，沒解控手段無法反制。',
      },
    ],
    faqUltimate: {
      en: 'Bait his ult on a tank or someone with revive (Sage\'s Sanctuary). Do NOT damage him while he\'s suppressing your ally — the damage is shared. Save hard CC to peel him off after suppression ends.',
      'zh-TW': '用坦克或帶復活甲的人騙大。壓制期間不要打東皇——傷害會分攤給你隊友。留硬控在壓制結束後把他推開。',
    },
    faqItems: {
      en: 'Percent-HP damage items (Starbreaker); grievous wounds to cut his orb lifesteal; Purify on carries is mandatory to survive his flash-ult engage.',
      'zh-TW': '%HP傷害裝（破星錘）；制裁克制球吸血；後排必帶淨化防閃現大招咬。',
    },
  },
};
