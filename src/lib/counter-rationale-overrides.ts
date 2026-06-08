import type { Locale } from '@/lib/i18n';

type LocalizedField = string | { en: string; 'zh-TW': string };

export type CounterOverride = {
  why?: LocalizedField[];
  mistakes?: LocalizedField[];
  faqUltimate?: LocalizedField;
  faqItems?: LocalizedField;
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

/** Top-20 meta heroes — hand-tuned counter rationale. */
const OVERRIDES: Record<string, CounterOverride> = {
  'marco-polo': {
    why: [
      {
        en: 'Hard CC and dive punish Marco before he stacks attack speed for extra Skill 1 and Ultimate bullets.',
        'zh-TW': '硬控與突進在他疊攻速、一技能/大招多子彈前就能壓制馬可。',
      },
      {
        en: 'Tanks with shields (Lian Po, Liu Bang) absorb his sustained true-damage barrage in teamfights.',
        'zh-TW': '廉頗、劉邦等護盾坦克能吃掉馬可持续真傷掃射。',
      },
      {
        en: 'Early lane bullies deny his weak level 1–3 and delay his first core item spike.',
        'zh-TW': '前期強勢英雄壓制他 1–3 級弱勢，拖慢第一件核心裝。',
      },
    ],
    mistakes: [
      {
        en: 'Chasing Marco through his Skill 1 zone — kite outside the barrage arc.',
        'zh-TW': '追進一技能掃射範圍 — 應在外圈拉扯，別貼臉吃滿子彈。',
      },
      {
        en: 'Building only magic resist — Marco deals mixed true damage; prioritize HP and CC.',
        'zh-TW': '只堆魔抗 — 馬可混傷/真傷，優先血量與控制。',
      },
      {
        en: 'Fighting 5v5 without peeling your carry when Marco has two core items.',
        'zh-TW': '馬可兩件核心後仍放任他切後排 — 必須留保護技能。',
      },
    ],
    faqUltimate: {
      en: 'Spread before his Ultimate lands, use Purify or hard CC when he channels, and burst him while the channel is on cooldown.',
      'zh-TW': '大招落點前分散站位，施法時用淨化或硬控打斷，冷卻期集火。',
    },
    faqItems: {
      en: 'HP and shield items (Sage\'s Sanctuary, tank passives); Purify vs his CC follow-up — not armor stacking alone.',
      'zh-TW': '血量與護盾（賢者的庇護等）；帶淨化解控，別只堆單一防禦。',
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
        en: 'Kiting mages and marksmen punish Li Xin when he commits to dark form without escape.',
        'zh-TW': '暗形态交完技能后，远程风筝他。',
      },
      {
        en: 'CC chains stop his animation-cancel burst combos.',
        'zh-TW': '控制链打断技能衔接爆发。',
      },
      {
        en: 'Early lane bullies win before his form swap comes online.',
        'zh-TW': '前期压制，形态切换未成型前压死。',
      },
    ],
    mistakes: [
      {
        en: 'Trading when he has minion wave and dark form ready.',
        'zh-TW': '他有兵线+暗形态时还换血。',
      },
      {
        en: 'Standing in his Skill 1 slash arc during all-in.',
        'zh-TW': '对拼站在一技能斩击范围内。',
      },
      {
        en: 'Ignoring his split-push after winning lane — match sideline pressure.',
        'zh-TW': '他带线时不跟线、不牵制。',
      },
    ],
    faqUltimate: {
      en: 'Disengage when he ults for attack speed — kite until buff expires then re-engage.',
      'zh-TW': '大招攻速期间拉开，buff 结束再打。',
    },
    faqItems: {
      en: 'Armor vs physical burst; slow effects reduce his stickiness.',
      'zh-TW': '物防；减速降低粘人能力。',
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
        en: 'Assassins burst Daji before she can charm — she is immobile without flash.',
        'zh-TW': '刺客在她魅惑前秒掉；无闪现极脆。',
      },
      {
        en: 'Purify and spread formation negate charm picks.',
        'zh-TW': '淨化+分散站位防魅惑。',
      },
      {
        en: 'Early jungle ganks punish her weak wave clear.',
        'zh-TW': '前期抓中，清线慢。',
      },
    ],
    mistakes: [
      {
        en: 'Walking in a line for her Skill 2 fan — stagger paths.',
        'zh-TW': '二技能扇形区域排队走位。',
      },
      {
        en: 'Engaging without knowing charm cooldown.',
        'zh-TW': '不知道魅惑 CD 就开团。',
      },
      {
        en: 'Leaving her unpunished after failed roam.',
        'zh-TW': '游走失败不反野不推塔。',
      },
    ],
    faqUltimate: {
      en: 'Spread before fox fire volley; use Purify if charmed; burst her during ult animation if reachable.',
      'zh-TW': '大招前分散；魅惑淨化；能摸到则读条时集火。',
    },
    faqItems: {
      en: 'Magic resist early; Purify on carries.',
      'zh-TW': '前期魔抗；后排淨化。',
    },
  },
  'hou-yi': {
    why: [
      {
        en: 'Dive comps with multiple threats overwhelm Hou Yi — he has no escape.',
        'zh-TW': '多人冲脸，后羿无位移必死。',
      },
      {
        en: 'Assassins punish his immobile positioning in lane and teamfights.',
        'zh-TW': '刺客抓站位失误。',
      },
      {
        en: 'Early pressure before his attack-speed passive stacks.',
        'zh-TW': '攻速被动叠起来前压死。',
      },
    ],
    mistakes: [
      {
        en: 'Standing in his ultimate sun zone — walk out immediately.',
        'zh-TW': '站在大招太阳圈里不走出。',
      },
      {
        en: 'Peeling only one diver when enemy has flank and front engage.',
        'zh-TW': '只防正面不防绕后。',
      },
      {
        en: 'Letting him free-farm when your comp cannot outscale.',
        'zh-TW': '阵容不能后期还放任他发育。',
      },
    ],
    faqUltimate: {
      en: 'Exit the sun field; engage him while it is on cooldown; flank during channel.',
      'zh-TW': '出太阳圈；技能空窗开团；读条时绕后。',
    },
    faqItems: {
      en: 'Armor for his physical DPS; anti-dive HP on supports.',
      'zh-TW': '物防；辅助出血量保核。',
    },
  },
  angela: {
    why: [
      {
        en: 'Assassins delete Angela before she detaches from a linked ally.',
        'zh-TW': '刺客在她附身前秒掉。',
      },
      {
        en: 'Long-range poke forces her to burn shield cooldowns in lane.',
        'zh-TW': '远程消耗逼盾。',
      },
      {
        en: 'Spread formation reduces double-target burst from her Skill 1.',
        'zh-TW': '分散站位减一技能双线伤害。',
      },
    ],
    mistakes: [
      {
        en: 'Standing together so one Angela skill hits multiple heroes.',
        'zh-TW': '扎堆吃一技能。',
      },
      {
        en: 'Ignoring Angela after she ults an ally — focus the host body.',
        'zh-TW': '她大招附身后不打真身/宿主。',
      },
      {
        en: 'Not buying anti-burst when she pairs with a hyper-carry.',
        'zh-TW': '保核阵容不出防爆发装。',
      },
    ],
    faqUltimate: {
      en: 'Burst the host carry or Angela before shield detonation; CC when she tries to reattach.',
      'zh-TW': '护盾爆前集火宿主或安琪拉；再附身时接控。',
    },
    faqItems: {
      en: 'Magic resist; dive items on jungler when she sits on marksman.',
      'zh-TW': '魔抗；打野出穿透切附身目标。',
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
        en: 'Kiting and disengage punish Augran when he commits on soul-link range.',
        'zh-TW': '他链魂近身时风筝拉开。',
      },
      {
        en: 'Burst before his execute threshold activates in god form.',
        'zh-TW': '神巫形态斩杀线前灌伤害。',
      },
      {
        en: 'Early jungle invades slow his level 4 power spike.',
        'zh-TW': '4 级前反野压制大司命。',
      },
    ],
    mistakes: [
      {
        en: 'Letting soul chains stack to max frequency without breaking off.',
        'zh-TW': '魂链叠满频率还不挣脱。',
      },
      {
        en: 'Fighting on his path skill terrain without vision.',
        'zh-TW': '在他一技能路径无视野开团。',
      },
      {
        en: 'Low HP staying in execute range during his ult.',
        'zh-TW': '残血还在他大招斩杀范围内。',
      },
    ],
    faqUltimate: {
      en: 'Disengage when he enters god form; burst carries above execute threshold; CC the clone body.',
      'zh-TW': '神巫形态拉开；保持血量高于斩杀线；注意灵体。',
    },
    faqItems: {
      en: 'HP stack; grievous wounds vs his heal; MS to break chains.',
      'zh-TW': '堆血；制裁回血；移速挣脱链。',
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
};
