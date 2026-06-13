import type { LearnArticle } from '@/lib/learn';
import { heroes } from '@/lib/data';
import {
  getCounterOverride,
  getCounterDetails,
  getBestCounter,
  getPlaystyle,
  getMetaTrend,
} from '@/lib/counter-rationale-overrides';
import { getHeroDisplayName } from '@/lib/locale-names';

/* ═══════════════════════════════════════════
   基础辅助函数
   ═══════════════════════════════════════════ */

function zhName(hero: typeof heroes[number]): string {
  return getHeroDisplayName(hero, 'zh-TW');
}

function zhSkills(hero: typeof heroes[number]) {
  return hero.skillsZh || hero.skills;
}

function skillBySlot(hero: typeof heroes[number], slot: string) {
  return zhSkills(hero).find((s) => s.slot === slot);
}

function zhPassive(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'passive');
  return s ? `**${s.name}**：${s.description}` : '';
}

function zhSkill1(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'skill1');
  return s ? { name: s.name, desc: s.description } : { name: '一技能', desc: '' };
}

function zhSkill2(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'skill2');
  return s ? { name: s.name, desc: s.description } : { name: '二技能', desc: '' };
}

function zhUltimate(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'ultimate');
  return s ? { name: s.name, desc: s.description } : { name: '大招', desc: '' };
}

function zhBuildItems(hero: typeof heroes[number]): string {
  const src = hero.buildZh || hero.build;
  return src
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .slice(0, 6)
    .map((b, i) => `${i + 1}. ${b.name}${b.description ? `（${b.description}）` : ''}`)
    .join('\n');
}

function zhArcana(hero: typeof heroes[number]): string {
  return (hero.arcanaZh || hero.arcana).filter(Boolean).slice(0, 6).join('、');
}

function zhSpells(hero: typeof heroes[number]): string {
  return (hero.spellsZh || hero.spells).filter(Boolean).slice(0, 2).join(' / ');
}

/** 查找克制英雄的中文名 + slug */
function getCounteredHeroes(hero: typeof heroes[number]): { name: string; slug: string }[] {
  return (hero.counteredBy || [])
    .filter((c) => c && c !== 'Data unavailable')
    .slice(0, 6)
    .map((enName) => {
      const h = heroes.find((hh) => hh.name === enName);
      return h ? { name: zhName(h), slug: h.slug } : { name: enName, slug: '' };
    });
}

function getHeroesCounteredByThis(hero: typeof heroes[number]): { name: string; slug: string }[] {
  return (hero.counters || [])
    .filter((c) => c && c !== 'Data unavailable')
    .slice(0, 6)
    .map((enName) => {
      const h = heroes.find((hh) => hh.name === enName);
      return h ? { name: zhName(h), slug: h.slug } : { name: enName, slug: '' };
    });
}

/** 生成带链接的 HTML */
function heroLink(name: string, slug: string): string {
  if (!slug) return name;
  return `<a href="/zh-TW/learn/${slug}-guide" class="hero-link">${name}</a>`;
}

function counteredByLinks(hero: typeof heroes[number]): string {
  return getCounteredHeroes(hero).map((h) => heroLink(h.name, h.slug)).join('、');
}

function countersLinks(hero: typeof heroes[number]): string {
  return getHeroesCounteredByThis(hero).map((h) => heroLink(h.name, h.slug)).join('、');
}

const ROLE_ZH: Record<string, string> = {
  Tank: '坦克', Warrior: '戰士', Assassin: '刺客',
  Mage: '法師', Marksman: '射手', Support: '輔助',
};

const LANE_ZH: Record<string, string> = {
  'Clash Lane': '對抗路', 'Farm Lane': '發育路', Mid: '中路',
  Jungling: '打野', Roaming: '遊走', Jungle: '打野',
  Top: '對抗路', Bottom: '發育路',
};

function roleZh(hero: typeof heroes[number]): string {
  return ROLE_ZH[hero.role] || hero.role;
}

function laneZh(hero: typeof heroes[number]): string {
  if (!hero.lane) return roleZh(hero);
  return LANE_ZH[hero.lane] || hero.laneZh || hero.lane;
}

function isJungler(hero: typeof heroes[number]): boolean {
  return hero.lane === 'Jungling' || hero.lane === 'Jungle';
}

function isRoamer(hero: typeof heroes[number]): boolean {
  return hero.lane === 'Roaming' || hero.role === 'Support';
}

function isSquishy(hero: typeof heroes[number]): boolean {
  return ['Marksman', 'Mage', 'Assassin'].includes(hero.role);
}

function isFrontline(hero: typeof heroes[number]): boolean {
  return ['Tank', 'Warrior'].includes(hero.role);
}

function difficultyLabel(h: typeof heroes[number]): string {
  if (h.difficulty === 'Hard') return '高難度';
  if (h.difficulty === 'Medium') return '中等難度';
  return '容易上手';
}

function tierLabel(h: typeof heroes[number]): string {
  const map: Record<string, string> = {
    'S+': '版本T0', 'S': '版本T1', 'A': 'T2', 'B': 'T3', 'C': '冷門',
  };
  return map[h.tier] || h.tier;
}

/* ═══════════════════════════════════════════
   攻略文章 (Guide) — 有 override 時優先
   ═══════════════════════════════════════════ */

function generateGuideArticle(hero: typeof heroes[number]): LearnArticle {
  const name = zhName(hero);
  const slug = hero.slug;

  // 有高品質 override playstyle 時，直接使用（保持現有邏輯，這些是手寫精品）
  const ps = getPlaystyle(slug, 'zh-TW');
  if (ps && ps.summary) {
    return buildOverrideGuide(hero, name, slug, ps);
  }

  // 用真實技能數據生成的"真人感"攻略
  return buildRealGuide(hero, name, slug);
}

function buildOverrideGuide(
  hero: typeof heroes[number],
  name: string,
  slug: string,
  ps: ReturnType<typeof getPlaystyle>,
): LearnArticle {
  const g = hero.guide;
  const sections: LearnArticle['sections'] = [
    { heading: `${name} 概覽與定位`, body: ps!.summary },
    ...ps!.points.slice(0, 3).map((p) => ({
      heading: `核心機制解析`,
      body: p,
    })),
  ];

  const skillSection = buildSkillBreakdown(hero, name);
  if (skillSection) sections.push(skillSection);

  const buildSection = buildBuildSection(hero, name);
  if (buildSection) sections.push(buildSection);

  const arcanaSection = buildArcanaSection(hero, name);
  if (arcanaSection) sections.push(arcanaSection);

  const comboSection = buildComboSection(hero, name);
  if (comboSection) sections.push(comboSection);

  const laneSection = buildLaneSection(hero, name);
  if (laneSection) sections.push(laneSection);

  const tfSection = buildTeamfightSection(hero, name);
  if (tfSection) sections.push(tfSection);

  const muSection = buildMatchupSection(hero, name);
  if (muSection) sections.push(muSection);

  const rankSection = buildRankSection(hero, name);
  if (rankSection) sections.push(rankSection);

  return {
    slug: `${slug}-guide`,
    title: `${name} 攻略——最強出裝、連招與打法教學`,
    description: `${name} 完整攻略：技能解析、出裝思路、銘文搭配、連招技巧、對線團戰教學。數據來源於官方以及玩家真實反饋。`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildRealGuide(
  hero: typeof heroes[number],
  name: string,
  slug: string,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  // 1. 英雄定位
  const identityBody = buildIdentitySection(hero, name);
  sections.push({ heading: `${name} 英雄定位`, body: identityBody });

  // 2. 技能解析
  const skillSection = buildSkillBreakdown(hero, name);
  if (skillSection) sections.push(skillSection);

  // 3. 出装
  const buildSection = buildBuildSection(hero, name);
  if (buildSection) sections.push(buildSection);

  // 4. 铭文
  const arcanaSection = buildArcanaSection(hero, name);
  if (arcanaSection) sections.push(arcanaSection);

  // 5. 连招
  const comboSection = buildComboSection(hero, name);
  if (comboSection) sections.push(comboSection);

  // 6. 对线/打野
  const laneSection = buildLaneSection(hero, name);
  if (laneSection) sections.push(laneSection);

  // 7. 团战
  const tfSection = buildTeamfightSection(hero, name);
  if (tfSection) sections.push(tfSection);

  // 8. 克制关系
  const muSection = buildMatchupSection(hero, name);
  if (muSection) sections.push(muSection);

  // 9. 上分建议
  const rankSection = buildRankSection(hero, name);
  if (rankSection) sections.push(rankSection);

  return {
    slug: `${slug}-guide`,
    title: `${name} 攻略——最強出裝、連招與打法教學`,
    description: `${name} 完整攻略：技能解析、出裝思路、銘文搭配、連招技巧、對線團戰教學。數據來源於官方以及玩家真實反饋。`,
    relatedHeroSlug: slug,
    sections,
  };
}

/* ── Section Builders ── */

function buildIdentitySection(hero: typeof heroes[number], name: string): string {
  const passive = zhSkills(hero).find((s) => s.slot === 'passive');
  const ult = zhUltimate(hero);
  const role = roleZh(hero);
  const lane = laneZh(hero);
  const tier = tierLabel(hero);
  const diff = difficultyLabel(hero);

  let body = `**定位：** ${role} / ${lane} | **強度：** ${tier} | **操作難度：** ${diff}`;

  if (hero.winRate) {
    body += ` | **勝率：** ${(hero.winRate).toFixed(1)}%`;
  }

  body += `\n\n`;

  // 被动是英雄核心机制
  if (passive) {
    body += `**核心被動：** ${passive.name}\n${passive.description}\n\n`;
  }

  // 大招是英雄招牌
  body += `**招牌大招：** ${ult.name}\n${ult.desc}\n\n`;

  // 通用建议
  body += `**一句話理解 ${name}：** ${getHeroOneLiner(hero)}`;

  return body;
}

function getHeroOneLiner(hero: typeof heroes[number]): string {
  const role = hero.role;
  const lane = hero.lane;

  // 打野
  if (isJungler(hero)) {
    if (role === 'Assassin') {
      return '抓人型刺客打野，核心思路是快速清野到4級後帶節奏。前期幫優不幫劣，抓成功一次立刻轉龍或入侵對面野區滾雪球。';
    }
    return '節奏型打野，控龍壓塔比人頭更重要。4級是第一個強勢節點，抓完人不要戀戰，轉資源才能贏遊戲。';
  }

  // 射手
  if (role === 'Marksman') {
    return '後期核心輸出位。前期穩健發育，2件核心裝之前盡量別打架。發育路的輸贏不看前期人頭，看誰先出到關鍵大件。';
  }

  // 法师
  if (role === 'Mage') {
    return '中路法師，清線後立刻遊走邊路幫隊友建立優勢，不要站中路發呆。控制型法師蹲草等對面走位失誤；爆發型法師後手進場打收割。';
  }

  // 辅助
  if (isRoamer(hero) || role === 'Support') {
    return '遊走輔助，視野和節奏是最大的價值。前期幫中路搶線，然後跟打野聯動或保射手發育。你的存在感體現在對面打野抓不到人的時候。';
  }

  // 坦克/战士对抗路
  if (role === 'Tank' || role === 'Warrior') {
    return '對抗路戰坦，線上穩住就是贏。4級前注意對方打野動向，有大招後可以考慮支援中路或配合打野入侵。團戰裡你要做的事是開團或保後排，不是追人頭。';
  }

  return '根據對局情況靈活選擇打法，多看小地圖，溝通是勝利的關鍵。';
}

function buildSkillBreakdown(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const skills = zhSkills(hero);
  const s1 = skills.find((s) => s.slot === 'skill1');
  const s2 = skills.find((s) => s.slot === 'skill2');
  const ult = skills.find((s) => s.slot === 'ultimate');

  if (!s1 && !s2 && !ult) return null;

  let body = '';

  if (s1) body += `**一技能：${s1.name}**\n${s1.description}\n\n`;
  if (s2) body += `**二技能：${s2.name}**\n${s2.description}\n\n`;
  if (ult) body += `**大招：${ult.name}**\n${ult.description}\n\n`;

  // 加点建议
  const skillOrder = hero.guide?.skillOrder;
  if (skillOrder) {
    body += `**技能加點優先級：** ${skillOrder.priority}\n`;
    body += `${skillOrder.reason}\n\n`;
  } else {
    body += `**加點建議：** 主升主要輸出/控制技能，有大點大。根據對線壓力和團戰需求靈活調整。\n\n`;
  }

  // 实战技巧
  body += `**實戰要點：**\n`;
  body += getSkillTips(hero);

  return { heading: `${name} 技能詳解與加點`, body };
}

function getSkillTips(hero: typeof heroes[number]): string {
  const role = hero.role;
  const tips: string[] = [];

  if (role === 'Assassin') {
    tips.push('進場前確認敵方控制技能交了沒有。等對面交完關鍵控制再進場，不要第一個衝進去。');
    tips.push('一套技能打完立刻拉開，不要戀戰等第二套CD。刺客的生存靠的是進退節奏。');
    tips.push('後期團戰優先切對面射手和法師。換掉對面核心輸出，你死了也值。');
  } else if (role === 'Marksman') {
    tips.push('站位比輸出更重要。團戰站後面輸出，不要為了追殘血往人群裡走。');
    tips.push('隨時注意自己身邊有沒有草叢沒探過——射手被蹲到就是秒。');
    tips.push('出裝不要死板一套。對面坦克多就早出穿透，對面刺客多就早出保命裝。');
  } else if (role === 'Mage') {
    tips.push('清完兵線不要站中路發呆。立刻看小地圖——哪路打架去哪路。');
    tips.push('控制型法師蹲草等先手；爆發型法師等隊友開團再跟傷害。');
    tips.push('中路一塔是全圖最重要的防禦塔，守住它比拿一個人頭重要十倍。');
  } else if (role === 'Tank' || role === 'Warrior') {
    tips.push('對線期目標是穩住發育，不是單殺。對面打野沒露頭就不要壓線。');
    tips.push('團戰開團前確認隊友跟得上。你進去了隊友沒跟上，就是送。');
    tips.push('出裝要靈活。對面法傷多就出魔抗，物傷多就堆物防。一件防裝的取捨決定團戰能扛幾秒。');
  } else if (isRoamer(hero) || role === 'Support') {
    tips.push('前期幫中路搶線權，然後跟打野一起入侵或gank。不要一直蹲在發育路。');
    tips.push('視野是你的核心價值。關鍵草叢一定要站住，讓對面打野的位置永遠是問號。');
    tips.push('保人裝（護盾、回血）優先於輸出裝。你活著、射手活著，團戰就能贏。');
  }

  return tips.map((t) => `• ${t}`).join('\n');
}

function buildBuildSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const items = (hero.buildZh || hero.build).filter(
    (b) => b.name && b.name !== 'Data unavailable',
  );
  if (items.length === 0) return null;

  let body = `當前版本 ${name} 的推薦出裝：\n\n`;
  body += items
    .slice(0, 6)
    .map((b, i) => {
      const desc = b.description ? `（${b.description}）` : '';
      return `**第 ${i + 1} 件：${b.name}**${desc}`;
    })
    .join('\n\n');

  // 装备思路
  body += '\n\n';
  body += getBuildReasoning(hero, items);

  return { heading: `${name} 出裝思路`, body };
}

function getBuildReasoning(hero: typeof heroes[number], items: Array<{ name: string; description?: string | null }>): string {
  let reasoning = '**出裝邏輯：**\n';

  if (isFrontline(hero)) {
    reasoning += '• 先出防裝保證線上換血不吃虧，第二件補血量或雙抗提升團戰坦度。\n';
    reasoning += '• 對面法傷多就優先魔抗，物傷多就優先物防——不要一套出裝用到底。\n';
    reasoning += '• 如果前期順風，可以考慮第三件補一件半輸出裝（如暗影戰斧），滾雪球效率更高。\n';
  } else if (isSquishy(hero)) {
    reasoning += '• 前兩件是核心輸出裝，決定了你的傷害曲線。順序不要亂，第一件先出性價比最高的。\n';
    reasoning += '• 第三件開始根據局勢選擇：對面刺客猛就出保命裝，坦克多就出穿透。\n';
    reasoning += '• 不要為了多一個輸出裝而放棄保命裝。死人是沒有輸出的。\n';
  } else {
    reasoning += '• 優先出核心裝備，根據對局情況靈活調整後續選擇。\n';
    reasoning += '• 順風偏輸出，逆風偏防禦——能在劣勢局站得住才有翻盤機會。\n';
  }

  return reasoning;
}

function buildArcanaSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const arcana = zhArcana(hero);
  const spells = zhSpells(hero);

  let body = `**推薦銘文：** ${arcana || '通用銘文'}\n\n`;
  body += `**召喚師技能：** ${spells || '閃現'}\n\n`;

  if (isJungler(hero)) {
    body += '打野必帶懲擊，這個沒有爭議。二級懲擊進化方向：對面位移多進化減速，需要追擊進化加速。\n';
  } else if (isSquishy(hero)) {
    body += '閃現是容錯率最高的選擇。對面控制鏈很長（如張良+東皇），淨化比閃現更實用。\n';
  } else if (isFrontline(hero)) {
    body += '閃現配合開團效果最好。如果對面射手比較肥，斬殺可以在進場後補足傷害。\n';
  } else {
    body += '根據陣容需求靈活調整。對面控制多帶淨化，需要開團帶眩暈或閃現。\n';
  }

  return { heading: `${name} 銘文與召喚師技能`, body };
}

/** 翻译连招英文名称到 zh-TW */
const COMBO_NAME_ZH: Record<string, string> = {
  'standard trade': '常規換血',
  'all-in': '全力開',
  'full combo': '完整連招',
  'poke': '消耗',
  'poke combo': '消耗連招',
  'burst': '爆發',
  'burst combo': '爆發連招',
  'gank': '抓人',
  'gank combo': '抓人連招',
  'teamfight': '團戰',
  'escape': '逃脫',
  'chase': '追擊',
  'peel': '保護',
  'harass': '騷擾',
  'one shot': '一鍵秒殺',
  'lane trade': '線上換血',
};

function zhComboName(en: string): string {
  return COMBO_NAME_ZH[en.toLowerCase()] || en;
}

function zhComboWhen(hero: typeof heroes[number]): string {
  const tHero = hero.lane || hero.role;
  // 使用 hero-guide-locale 的翻译逻辑
  switch (tHero) {
    case 'Mid Lane': return '中路 小規模團戰或搶目標前';
    case 'Farm Lane': return '發育路 小規模團戰或搶目標前';
    case 'Clash Lane': return '對抗路 小規模團戰或搶目標前';
    case 'Jungling': return '河道抓人或隊友給控後切後排';
    case 'Roaming': return '遊走開視野或隊友給控後接技';
    default: return `${tHero} 小規模團戰或搶目標前`;
  }
}

/** 将连招步骤中的英文技能名替换为中文技能名 */
function zhComboSteps(enSteps: string, hero: typeof heroes[number]): string {
  let result = enSteps;
  const enSkills = hero.skills;
  const zhSk = hero.skillsZh || hero.skills;
  // 建立 slot → 中文名 映射
  const zhNameBySlot = new Map(zhSk.map((s) => [s.slot, s.name]));
  // 用英文技能名 → 中文技能名替换
  for (const en of enSkills) {
    const zhName = zhNameBySlot.get(en.slot);
    if (zhName && zhName !== en.name) {
      const escaped = en.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rx = new RegExp(escaped, 'gi');
      result = result.replace(rx, zhName);
    }
  }
  // 替换常见的通用短语
  result = result.replace(/weave basic attacks?/gi, '普攻銜接');
  result = result.replace(/basic attack/gi, '普攻');
  result = result.replace(/then auto/gi, '接普攻');
  result = result.replace(/follow up with/gi, '接');
  return result;
}

function buildComboSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const combos = hero.guide?.combos;
  const s1 = zhSkill1(hero);
  const s2 = zhSkill2(hero);
  const ult = zhUltimate(hero);

  let body = '';

  if (combos && combos.length > 0) {
    body += `**常用連招：**\n`;
    combos.forEach((c) => {
      body += `• **${zhComboName(c.name)}**（${zhComboWhen(hero)}）\n  ${zhComboSteps(c.steps, hero)}\n\n`;
    });
  }

  // 如果没有 combo 数据，根据技能构造通用建议
  if (!combos || combos.length === 0) {
    body += `${name} 的技能組合建議：\n\n`;
    body += `• 對線消耗：先用 ${s1.name} 或 ${s2.name} 打一套，拉開等CD，不要貪普攻。\n`;
    body += `• 爆發連招：${s1.name} → ${s2.name} → 普攻銜接 → ${ult.name} 收割。\n`;
    body += `• 技能穿插普攻可以最大化輸出，不要一套技能丟完就站著等CD。\n`;
  }

  return { heading: `${name} 連招技巧`, body };
}

function buildLaneSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  let body = '';

  if (isJungler(hero)) {
    body = jungleAdvice(hero, name);
    return { heading: `打野思路與節奏`, body };
  }

  if (isRoamer(hero) || hero.role === 'Support') {
    body = roamAdvice(hero, name);
    return { heading: `遊走思路與視野控制`, body };
  }

  if (hero.role === 'Marksman') {
    body = marksmanLaneAdvice(hero, name);
    return { heading: `發育路對線打法`, body };
  }

  if (hero.role === 'Mage') {
    body = mageLaneAdvice(hero, name);
    return { heading: `中路打法與遊走時機`, body };
  }

  // Clash Lane default
  body = clashLaneAdvice(hero, name);
  return { heading: `${laneZh(hero)}對線打法`, body };
}

function jungleAdvice(hero: typeof heroes[number], name: string): string {
  const role = hero.role;
  return [
    `**開局路線：**`,
    `• 藍開（讓藍BUFF提供冷卻續航）或紅開（加強前期gank傷害），根據哪條邊路更好抓決定。`,
    `• 第一輪完整清野到4級，不要在中途跑去沒意義的支援——沒大招去gank成功率極低。`,
    ``,
    `**4級節奏：**`,
    `• 4級是第一個強勢期，優先抓有控制的那條路（隊友有暈/減速才好配合）。`,
    `• 抓成功 → 立刻叫隊友一起開龍。殺人不拿資源等於白殺。`,
    `• 抓失敗 → 不要硬蹲，回野區繼續發育，等下一波機會。`,
    ``,
    `**中期運營：**`,
    `• 龍刷新前30秒開始往龍坑靠，提前佔視野。`,
    `• 對面打野在另一側露頭時，立刻反他的野區或偷龍——打野拼的就是信息差。`,
    `• 記住對面BUFF刷新時間。反掉一個BUFF，對面打野就廢30秒。`,
    ``,
    `**後期決策：**`,
    `• 後期不要先手開團（除非你是趙雲級別的開團坦）。等隊友開或對面失誤再進場。`,
    `• 風暴龍王大於一切。大後期兩邊都六神裝的時候，誰拿風暴龍王誰贏。`,
  ].join('\n');
}

function roamAdvice(hero: typeof heroes[number], name: string): string {
  return [
    `**前期節奏：**`,
    `• 開局幫中路搶線權（幫法師清完第一波兵），然後看小地圖決定下一步。`,
    `• 對面打野藍開就去紅區給視野；紅開就去藍區。知道對面打野位置等於廢了他前三分鐘的gank。`,
    `• 不要前期一直蹲在發育路。射手1v1能穩住的情況下，跟打野聯動創造多打少的機會。`,
    ``,
    `**遊走時機：**`,
    `• 幫射手把兵線推過去之後再遊走——兵線在對面塔下，射手1v1才安全。`,
    `• 觀察對面輔助位置。如果對面輔助也在發育路，你就得回去保射手。`,
    `• 龍刷新時間節點（4分鐘、8分鐘）提前佔龍坑視野。`,
    ``,
    `**視野控制：**`,
    `• 永遠站在射手前面、草叢裡面。你探草死了比射手探草死了划算。`,
    `• 關鍵草叢：中路兩側河道草、龍坑草、BUFF區草。這幾個位置控住了，對面的行動就是透明的。`,
    `• 逆風局不要盲目出去做視野——用技能探草，走安全路線。`,
  ].join('\n');
}

function marksmanLaneAdvice(hero: typeof heroes[number], name: string): string {
  return [
    `**前期核心：發育**`,
    `• 前4級不要主動換血。發育路射手前期誰上頭誰吃虧，補好每一個兵比什麼都重要。`,
    `• 注意河道視野。對面打野2級或4級抓發育路是最常見的節奏，沒視野就靠塔下站。`,
    `• 河蟹能搶就搶，搶不到不要強求。為了一隻河蟹送一血是最蠢的事。`,
    ``,
    `**中期轉線：**`,
    `• 推掉對面一塔後立刻轉中路幫忙推塔，不要在下路繼續待著。`,
    `• 2件核心裝出來之前盡量避免參加小規模團戰。你去了打不出傷害還容易被秒。`,
    `• 多看小地圖。哪裡有兵線需要帶就去哪裡——射手吃經濟的效率決定後期的輸出上限。`,
    ``,
    `**後期決勝：**`,
    `• 站好位置再輸出。團戰站位基本原則：不超過自家坦克/輔助的位置。`,
    `• 保命裝（名刀/復活甲）該換就換，不要捨不得那點輸出屬性。`,
    `• 對面刺客沒露頭就不要走位太靠前——他在等你。`,
  ].join('\n');
}

function mageLaneAdvice(hero: typeof heroes[number], name: string): string {
  return [
    `**清線與遊走：**`,
    `• 中路打法最忌諱的就是清完線站塔下發呆。清完兵立刻看邊路——哪邊在打架去哪邊。`,
    `• 遊走路線走自家野區，不要走河道。河道是所有法師的死亡路線。`,
    `• 回中路的路上一樣走野區。你永遠不知道對面打野在哪個草裡蹲你。`,
    ``,
    `**線權爭奪：**`,
    `• 搶線權 = 比對面法師更快清完兵線。誰先清完，誰就能先遊走幫隊友。`,
    `• 如果對面法師清線比你快，就猥瑣補刀等他走了再清。不要強行跟他拼清線速度然後被他壓血量。`,
    `• 中路一塔是全圖最重要的塔。寧可虧一波兵也不要為了守塔送人頭。`,
    ``,
    `**團戰中的法師：**`,
    `• 控制型法師蹲草找機會先手開團。爆發型法師等隊友開團後找位置打AOE。`,
    `• 永遠不要用臉探草。用技能探，或者讓坦克走在前面。`,
    `• 一套技能打完立刻拉開等CD，不要在戰場中間平A——法師平A跟刮痧差不多。`,
  ].join('\n');
}

function clashLaneAdvice(hero: typeof heroes[number], name: string): string {
  return [
    `**對線要點：**`,
    `• 對抗路是1v1的戰場，核心原則是「穩住就贏」。不要總想著單殺對面，不被單殺才是及格線。`,
    `• 注意小地圖上對面打野的最後出現位置。打野在地圖下半區時你才能壓線，否則退回來。`,
    `• 兵線控制：順風可以推線然後遊走中路，逆風就把線控在塔前安全吃。`,
    ``,
    `**4級轉折：**`,
    `• 4級有大招之後戰鬥力質變。此時可以主動換血，找機會單殺或叫打野來抓。`,
    `• 如果有TP/傳送技能，關注下路是否有團戰可以支援。一個及時的傳送能直接扭轉下路局勢。`,
    ``,
    `**中期轉線：**`,
    `• 推掉對抗路一塔後，你的任務變成：帶線 → 看地圖 → 決定參團還是繼續帶。`,
    `• 帶線的時候永遠看小地圖。看不到對面三個人以上就退——他們大概率在來抓你的路上。`,
    `• 團戰比帶線優先，但兵線不推出去就去參團，打完團家沒了也是輸。`,
  ].join('\n');
}

function buildTeamfightSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  let body = '';

  if (isFrontline(hero)) {
    body = [
      `**開團責任：**`,
      `• 你通常是隊伍的開團點。開團前確認三件事：1）隊友在附近跟得上 2）對面關鍵技能交了 3）自己有大招。`,
      `• 不要看到人就衝——等對面C位走位失誤。往上多走一步就是你的開團距離。`,
      `• 開團後盯住對面刺客。他進場切你的後排時，回頭控住他比繼續追對面C位更有價值。`,
      ``,
      `**保排 vs 切排：**`,
      `• 我方射手發育好 → 團戰優先保射手，站在他和對面刺客之間。`,
      `• 我方刺客/法師發育好 → 你負責開團吃技能，讓隊友無壓力輸出。`,
      `• 哪邊核心經濟高就服務哪邊——沒有絕對的打法，只有當下最優解。`,
    ].join('\n');
  } else if (hero.role === 'Assassin') {
    body = [
      `**進場時機：**`,
      `• 刺客在團戰中最容易犯的錯就是第一個進場。永遠等對面交了控制技能再上。`,
      `• 從側面或背後進場，不要從正面直直走進去——你是刺客不是戰士。`,
      `• 你的目標只有一個：對面射手或法師。換掉了就是你賺，哪怕自己也死了。`,
      ``,
      `**撤退時機：**`,
      `• 一套技能打完立刻拉開等CD。不要打完技能還站在人堆裡平A。`,
      `• 大招CD的時候不要主動找團。沒大招的刺客跟超級兵差不多。`,
      `• 如果進場發現隊友沒跟上——立刻撤退。送一個人頭不如等下一波。`,
    ].join('\n');
  } else if (hero.role === 'Marksman') {
    body = [
      `**站位法則：**`,
      `• 團戰站最後面，前面一定要有坦克或輔助。離你最遠的敵人才是你該打的人。`,
      `• 打最近的目標，不要為了點對面射手走到對面刺客臉上。先打前排的傷害也是有效輸出。`,
      `• 對面刺客沒露頭 → 不要往前走。他一定在某個草裡等你走位失誤。`,
      ``,
      `**生存優先級：**`,
      `• 團戰裡你活著 > 打輸出。被切了就交閃現往後跑，不要硬剛。`,
      `• 淨化/閃現捏到關鍵時刻再用。對面刺客進場交控制的時候那一瞬間交，早交晚交都是浪費。`,
      `• 團戰打贏了不要追殘血。推塔、拿龍、帶兵線才是贏遊戲的方式。`,
    ].join('\n');
  } else if (hero.role === 'Mage') {
    body = [
      `**輸出位置：**`,
      `• 法師的輸出距離決定了你的安全距離。不要為了打到對面後排而越過坦克。`,
      `• AOE技能優先打人多的地方。2-3個人吃到你的大招比單殺一個輔助有價值十倍。`,
      `• 控制技能不要亂丟。留給對面刺客進場時反手控制，這是法師最重要的團隊貢獻。`,
      ``,
      `**進退節奏：**`,
      `• 一套技能打完就往後退等CD。站在前面平A的法師死亡率極高。`,
      `• 團戰打贏後法師推塔最快（技能+普攻），不要追殘血——點塔。`,
    ].join('\n');
  } else {
    // Support / Roamer
    body = [
      `**輔助在團戰中要做的事：**`,
      `• 站在射手前面擋技能。你的血量就是用來保護輸出位的。`,
      `• 控制技能留給對面刺客或戰士進場的時候。不要一開團就把所有技能丟給對面坦克。`,
      `• 治療/護盾等保命技能捏在手裡，等射手掉血了再用。一見面就交等於沒交。`,
      ``,
      `**視野與先手：**`,
      `• 團戰開始前佔住關鍵草叢的視野，讓隊友知道對面人在哪。`,
      `• 如果對面陣容偏防守，肉輔助可以考慮先手開團——但必須確認隊友跟得上。`,
    ].join('\n');
  }

  return { heading: `團戰打法與定位`, body };
}

function buildMatchupSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const counteredLinks = counteredByLinks(hero);
  const counterLinks = countersLinks(hero);

  if (!counteredLinks && !counterLinks) return null;

  let body = '';

  if (counteredLinks) {
    body += `**${name} 害怕的英雄：** ${counteredLinks}\n`;
    body += `遇到這些英雄時：\n`;
    body += `• 線上猥瑣發育，不要主動換血。\n`;
    body += `• 叫打野來幫，不要逞強1v1。\n`;
    body += `• 出裝偏防禦，先活下去再談輸出。\n\n`;
  }

  if (counterLinks) {
    body += `**${name} 克制的英雄：** ${counterLinks}\n`;
    body += `對上這些英雄時：\n`;
    body += `• 主動壓制，不要給他們發育空間。\n`;
    body += `• 利用你的機制優勢頻繁換血。\n`;
    body += `• BP階段如果對面先亮了這些英雄，${name} 是很好的Counter選擇。\n`;
  }

  return { heading: `${name} 克制關係`, body };
}

function buildRankSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const tier = hero.tier;
  const wr = hero.winRate;

  let body = `**當前版本定位：** ${tierLabel(hero)}`;

  if (wr) {
    body += `，勝率 ${wr.toFixed(1)}%`;
  }

  body += '\n\n';

  if (tier === 'S+' || tier === 'S') {
    body += `${name} 是當前版本強勢英雄，Ban率較高，能拿到就盡量選。\n\n`;
    body += `**上分建議：**\n`;
    body += `• 搶到就圍繞你打。隊友選英雄時配合你的節奏。\n`;
    body += `• 注意對面可能會針對性地選Counter英雄，BP階段觀察對面陣容。\n`;
    body += `• 強勢英雄最大的敵人是膨脹。順風不要浪，穩穩推塔拿龍。\n`;
  } else if (tier === 'A') {
    body += `${name} 表現穩定，不是版本答案但熟練度夠了依然能上分。\n\n`;
    body += `**上分建議：**\n`;
    body += `• 專精一個英雄比頻繁換英雄上分效率高。如果你 ${name} 場次多勝率高，繼續玩就對了。\n`;
    body += `• 注意對面陣容——如果對面選了克制你的英雄，考慮換個英雄。\n`;
  } else {
    body += `${name} 當前版本不是最優選，但低分段什麼英雄都能贏。\n\n`;
    body += `**上分建議：**\n`;
    body += `• 用 ${name} 上分需要比版本強勢英雄付出更多努力。確保你對這個英雄的理解碾壓同段位對手。\n`;
    body += `• 陣容搭配很重要。隊友選出前期強勢英雄幫你拖到強勢期，${name} 才有發揮空間。\n`;
  }

  return { heading: `版本表現與上分建議`, body };
}

/* ═══════════════════════════════════════════
   克制文章 (Counter) — 針對性地寫克制策略
   ═══════════════════════════════════════════ */

function generateCounterArticle(hero: typeof heroes[number]): LearnArticle {
  const name = zhName(hero);
  const slug = hero.slug;

  // 高品質 override 數據優先
  const details = getCounterDetails(slug, 'zh-TW');
  const best = getBestCounter(slug, 'zh-TW');

  if (details.length > 0) {
    return buildOverrideCounter(hero, name, slug, details, best);
  }

  return buildRealCounter(hero, name, slug);
}

function buildOverrideCounter(
  hero: typeof heroes[number],
  name: string,
  slug: string,
  details: ReturnType<typeof getCounterDetails>,
  best: ReturnType<typeof getBestCounter>,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  if (best && !details.find((d) => d.hero === best.hero)) {
    sections.push({
      heading: `最強克制英雄：${best.hero}`,
      body: best.reasons.join('\n\n'),
    });
  }

  details.slice(0, 4).forEach((d) => {
    sections.push({
      heading: `${d.hero} 如何克制 ${name}`,
      body: d.reason,
    });
  });

  sections.push(buildBpAdvice(hero, name));

  return {
    slug: `how-to-counter-${slug}`,
    title: `如何克制 ${name}——最佳對策英雄與打法`,
    description: `${name} 克制攻略：最佳克制英雄、裝備反制、對線策略與BP建議。`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildRealCounter(
  hero: typeof heroes[number],
  name: string,
  slug: string,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  // 1. 总体克制思路
  sections.push({
    heading: `克制 ${name} 的總體思路`,
    body: buildCounterOverview(hero, name),
  });

  // 2. 具体克制英雄
  const counterList = buildCounterHeroList(hero, name);
  if (counterList) {
    sections.push({
      heading: `哪些英雄克制 ${name}`,
      body: counterList,
    });
  }

  // 3. 装备反制
  sections.push({
    heading: `裝備反制思路`,
    body: buildCounterItems(hero, name),
  });

  // 4. 对线策略
  sections.push({
    heading: `對線期如何打 ${name}`,
    body: buildCounterLaning(hero, name),
  });

  // 5. 团战处理
  sections.push({
    heading: `團戰中如何限制 ${name}`,
    body: buildCounterTeamfight(hero, name),
  });

  // 6. BP建议
  sections.push(buildBpAdvice(hero, name));

  return {
    slug: `how-to-counter-${slug}`,
    title: `如何克制 ${name}——最佳對策英雄與打法`,
    description: `${name} 克制攻略：最佳克制英雄、裝備反制、對線策略與BP建議。`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildCounterOverview(hero: typeof heroes[number], name: string): string {
  const role = hero.role;
  let body = `對付 ${name}（${roleZh(hero)}，${laneZh(hero)}）的核心思路：\n\n`;

  if (isSquishy(hero)) {
    body += `• ${name} 是脆皮英雄，吃到硬控就是死。團隊留一個穩定控制等他進場。\n`;
    body += `• 前期抓崩 ${name} 是最有效的克制方式。打野2級/4級多來照顧，讓他發育不起來就廢了。\n`;
    body += `• 不要跟他打公平的1v1。${name} 的單挑能力通常不弱——多人抓才是正解。\n`;
  } else if (isFrontline(hero)) {
    body += `• ${name} 是前排英雄，團戰中不用優先集火他——先殺他隊友。\n`;
    body += `• 出穿透裝備加速融坦。讓 ${name} 在團戰中扛不住，他的作用就廢了一半。\n`;
    body += `• 用風箏拉扯限制他的進場。手長的英雄讓 ${name} 走不過來就是最好的克制。\n`;
  } else {
    body += `• 了解 ${name} 的強勢期，在他弱勢的時候（前期/技能CD期）主動施壓。\n`;
    body += `• 控制技能是克制所有英雄的通用解法。留控給 ${name} 的關鍵技能窗口。\n`;
  }

  const links = counteredByLinks(hero);
  if (links) {
    body += `\n數據顯示克制 ${name} 的英雄包括：${links}。`;
  }

  return body;
}

function buildCounterHeroList(hero: typeof heroes[number], name: string): string {
  const heroList = getCounteredHeroes(hero);
  if (heroList.length === 0) return '';
  let body = `以下是對 ${name} 勝率較高的英雄選擇：\n\n`;
  heroList.forEach((h) => {
    const link = heroLink(h.name, h.slug);
    body += `• **${link}**：在機制上對 ${name} 有優勢，點擊查看完整攻略。\n`;
  });
  body += `\n選人時根據你的熟練度和團隊需求來挑選——不要為了拿Counter英雄而選一個你不太會玩的。熟練的弱勢對局比生疏的Counter英雄勝率高。`;
  return body;
}

function buildCounterItems(hero: typeof heroes[number], name: string): string {
  const role = hero.role;

  if (role === 'Marksman' || role === 'Mage' || role === 'Assassin') {
    return [
      `對抗 ${name}（${roleZh(hero)}）的出裝策略：`,
      ``,
      `**坦克/戰士：**`,
      `• 第一件大裝出對應防禦屬性的裝備（${role === 'Mage' ? '魔抗' : '物防'}），線上就不會被壓。`,
      `• 不滅之握或永夜守護提升團戰續航。`,
      `• ${name} 有回血/吸血機制 → 制裁之刃或夢魘之牙必須出。`,
      ``,
      `**輸出位：**`,
      `• 保命裝（名刀/復活甲）優先級大於一件輸出裝。活著才能輸出。`,
      `• 淨化可以解 ${name} 的控制鏈——比閃現多一條命的價值。`,
    ].join('\n');
  }

  return [
    `對抗 ${name}（${roleZh(hero)}）的出裝策略：`,
    ``,
    `**輸出位：**`,
    `• 出穿透裝（暗影戰斧/虛無法杖）加速融坦效率。`,
    `• 如果 ${name} 有持續回血，補一件減療裝。`,
    ``,
    `**坦克/戰士：**`,
    `• 堆雙抗+血量，優先保證團戰中能扛住。`,
    `• 對面輸出點不只 ${name} 一個的時候，針對主要傷害類型出防裝。`,
  ].join('\n');
}

function buildCounterLaning(hero: typeof heroes[number], name: string): string {
  return [
    `跟 ${name} 對線時的核心策略：`,
    ``,
    `• **前3級是最佳壓制窗口。** 大部分英雄4級前作戰能力有限，這時候主動換血能建立線上優勢。`,
    `• **注意 ${name} 的核心技能CD。** 等他交了關鍵技能再上去打——空技能就是你的反打時機。`,
    `• **控制兵線位置。** 不要無腦推線，那樣只會讓對面打野好抓你。把線控在靠近自己塔的位置。`,
    `• **ping打野來幫忙。** 告訴你家打野 ${name} 的閃現/位移CD時間，配合起來抓成功率翻倍。`,
    `• **視野是對線的生命線。** 河道草一定要給視野，對面打野沒露頭就縮回來。`,
  ].join('\n');
}

function buildCounterTeamfight(hero: typeof heroes[number], name: string): string {
  return [
    `團戰中針對 ${name} 的處理方式：`,
    ``,
    `• **不要讓 ${name} 舒服地找到進場位置。** 提前佔據側面草叢視野，限制他的可選路線。`,
    `• **硬控技能留給 ${name}。** 暈眩、擊飛、冰凍這些控制不要浪費在對面坦克身上——留著等他進場。`,
    `• **${name} 交了關鍵位移後是最佳集火窗口。** 看到他用完位移/閃現，立刻叫隊友轉火。`,
    `• **如果 ${name} 還沒進場，不要貿然開團。** 等他露頭再決定打或退。`,
    `• **散開站位。** 站在一起 = 被 ${name} 的AOE打到所有人。保持一定距離讓他每次只能打1-2個人。`,
  ].join('\n');
}

function buildBpAdvice(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] {
  const cLinks = counteredByLinks(hero);
  return {
    heading: `BP階段建議`,
    body: [
      `**Ban人環節：**`,
      `• 如果你方沒有能穩定反制 ${name} 的英雄，而對面有選的可能——直接Ban掉最安全。`,
      `• 高分段 ${name} 的出場率和威脅度更高，Ban的優先級也隨之提高。`,
      ``,
      `**選人環節：**`,
      `• 不要一樓搶 ${name}，容易被針對Counter。`,
      `• 如果對面已經先選了 ${name} 的Counter英雄（如：${cLinks || '具有硬控或高爆發的英雄'}），慎重選擇 ${name}。`,
      `• ${name} 需要特定的陣容配合才能發揮最大作用——隊友選英雄時溝通好打法思路。`,
    ].join('\n'),
  };
}

/* ═══════════════════════════════════════════
   弱點文章 (Weaknesses) — 分析英雄短板
   ═══════════════════════════════════════════ */

function generateWeaknessesArticle(hero: typeof heroes[number]): LearnArticle {
  const name = zhName(hero);
  const slug = hero.slug;

  const trend = getMetaTrend(slug, 'zh-TW');
  if (trend && trend.summary) {
    return buildOverrideWeaknesses(hero, name, slug, trend);
  }

  return buildRealWeaknesses(hero, name, slug);
}

function buildOverrideWeaknesses(
  hero: typeof heroes[number],
  name: string,
  slug: string,
  trend: ReturnType<typeof getMetaTrend>,
): LearnArticle {
  const sections: LearnArticle['sections'] = [
    { heading: `${name} 當前版本問題`, body: trend!.summary },
    ...trend!.reasons.slice(0, 4).map((r) => ({
      heading: `弱點分析`,
      body: r,
    })),
  ];

  sections.push(buildWeakBpAdvice(hero, name));

  return {
    slug: `${slug}-weaknesses`,
    title: `${name} 弱點分析——這個英雄最怕什麼`,
    description: `深入解析 ${name} 的弱點與劣勢：前期強度、弱勢對局、團戰風險與BP建議。`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildRealWeaknesses(
  hero: typeof heroes[number],
  name: string,
  slug: string,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  // 1. 弱点总览
  sections.push({
    heading: `${name} 的主要弱點`,
    body: buildWeakOverview(hero, name),
  });

  // 2. 版本表现
  sections.push({
    heading: `${name} 在當前版本的表現`,
    body: buildWeakMeta(hero, name),
  });

  // 3. 英雄短板
  sections.push({
    heading: `${name} 的機制短板`,
    body: buildWeakMechanics(hero, name),
  });

  // 4. 团战风险
  sections.push({
    heading: `團戰中的風險點`,
    body: buildWeakTeamfight(hero, name),
  });

  // 5. 劣势对局
  sections.push({
    heading: `劣勢對局怎麼應對`,
    body: buildWeakMatchups(hero, name),
  });

  // 6. BP建议
  sections.push(buildWeakBpAdvice(hero, name));

  return {
    slug: `${slug}-weaknesses`,
    title: `${name} 弱點分析——這個英雄最怕什麼`,
    description: `深入解析 ${name} 的弱點與劣勢：前期強度、弱勢對局、團戰風險與BP建議。`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildWeakOverview(hero: typeof heroes[number], name: string): string {
  const role = roleZh(hero);
  let body = `了解 ${name}（${role}，${laneZh(hero)}）的弱點，無論你是玩 ${name} 還是對抗 ${name}，都能做出更好的決策。\n\n`;

  body += `**${name} 的通用弱點：**\n`;

  if (isSquishy(hero)) {
    body += `• 身板脆——任何控制鏈都能讓他從滿血到蒸發。\n`;
    body += `• 過度依賴裝備——核心裝出來之前戰鬥力有限。\n`;
    body += `• 自保能力弱——被多人針對時很難存活。\n`;
  } else if (isFrontline(hero)) {
    body += `• 行動模式可預測——對面知道你會衝進來，提前留控就能廢掉你。\n`;
    body += `• 依賴隊友跟傷害——你開團了隊友沒跟上就是白送。\n`;
    body += `• 對穿透裝備較為脆弱——對面出了穿透後你的坦度會大幅下降。\n`;
  } else {
    body += `• 技能CD期間是最大的輸出真空期。\n`;
    body += `• 站位要求高——位置不好很難發揮作用。\n`;
  }

  const links = counteredByLinks(hero);
  if (links) {
    body += `\n具體克制 ${name} 的英雄：${links}。`;
  }

  return body;
}

function buildWeakMeta(hero: typeof heroes[number], name: string): string {
  const tier = hero.tier;
  const wr = hero.winRate;
  const pr = hero.pickRate;

  let body = `**梯度：** ${tierLabel(hero)}`;

  if (wr) body += ` | **勝率：** ${wr.toFixed(1)}%`;
  if (pr) body += ` | **選取率：** ${pr.toFixed(1)}%`;

  body += '\n\n';

  if (tier === 'S+' || tier === 'S') {
    body += `${name} 是版本熱門，但熱門也意味著更多玩家研究對策。你玩 ${name} 的時候要做好被針對的準備；對手玩 ${name} 的時候你大概率已經知道他的打法習慣。\n`;
  } else if (tier === 'A') {
    body += `${name} 表現穩定但不是版本答案。在特定陣容裡很強，但不在適合的地方拿出來容易隱形。\n`;
  } else {
    body += `${name} 不是版本主流。需要較高的熟練度或特定的陣容配合才能打出效果。新手不建議在排位中盲目選用。\n`;
  }

  return body;
}

function buildWeakMechanics(hero: typeof heroes[number], name: string): string {
  const role = hero.role;
  let body = '';

  if (role === 'Assassin') {
    body = [
      `• **一套打完就廢：** ${name} 的所有價值集中在大招和爆發技能上。技能CD的時候戰鬥力極低，對面完全可以趁這段時間反打。`,
      `• **先手控制是天敵：** 任何硬控（暈眩、擊飛、壓制）都能打斷 ${name} 的進場節奏。對面留一個控等你進場，你就無事可做。`,
      `• **後期容錯率低：** 後期大家都六神裝的時候，${name} 進場一旦沒秒掉對面C位，自己大概率被反秒。`,
      `• **前期弱勢：** 4級之前 ${name} 的gank能力有限。對面打野如果在這個窗口入侵你的野區，你只能讓資源。`,
    ].join('\n\n');
  } else if (role === 'Marksman') {
    body = [
      `• **最怕貼臉：** 射手的天敵永遠是能近身的英雄。${name} 一旦被刺客或戰士貼臉，生存機率極低。`,
      `• **發育依賴性強：** 射手沒裝備就是遠程兵。如果前期被針對抓死兩次，整局遊戲都難有存在感。`,
      `• **站位容錯率為零：** 一步走錯就被秒。團戰中的站位決定了你是MVP還是送人頭的。`,
      `• **自保手段有限：** 位移技能CD長或根本沒有，交了閃現之後就是超級兵。`,
    ].join('\n\n');
  } else if (role === 'Mage') {
    body = [
      `• **技能為核心：** 技能放完了就沒有輸出。法力不足或技能CD時，${name} 基本沒有作戰能力。`,
      `• **身板脆：** 和射手一樣，法師是脆皮。被刺客抓到幾乎必死。`,
      `• **中路容易被軍訓：** 中路是打野最愛光顧的路線。${name} 如果沒有位移技能，對面打野2級gank的威脅非常大。`,
      `• **依賴經濟和等級：** 法師需要裝備和等級支撐傷害。前期被抓死導致經濟落後，中期團戰傷害不足就是隊伍的突破口。`,
    ].join('\n\n');
  } else if (isFrontline(hero)) {
    body = [
      `• **被拉扯就廢了：** 手短的坦克最怕被風箏。對面有減速或位移技能的時候，${name} 根本走不到目標面前。`,
      `• **穿透裝是剋星：** 對面出了穿透裝備之後，${name} 的坦度會明顯下降。不要覺得自己很肉就不看對面裝備。`,
      `• **開團依賴隊友：** 坦克開團再完美，隊友沒跟輸出也是白搭。單排的時候這個問題尤其明顯。`,
      `• **逆風局無力：** 經濟落後時坦克也很脆。對面輸出比你肉經濟好，你進場就是秒蒸發。`,
    ].join('\n\n');
  } else {
    body = [
      `• **依賴隊友程度高：** 輔助的價值取決於隊友能利用多少。如果隊友不跟節奏，輔助基本沒有單獨帶節奏的能力。`,
      `• **經濟落後就沒用：** 輔助的裝備和等級通常落後，對面如果針對你，很難有反抗之力。`,
      `• **視野控制有風險：** 做視野就意味著要走在隊伍前面。遇到埋伏時輔助往往是第一個死的。`,
    ].join('\n\n');
  }

  return body;
}

function buildWeakTeamfight(hero: typeof heroes[number], name: string): string {
  return [
    `${name} 在團戰中的主要風險：`,
    ``,
    `• **關鍵技能被打斷 = 團戰零作用。** 對面留一個控制等你交關鍵技能的時候放，${name} 就廢了。`,
    `• **進場時機判斷失誤代價巨大。** 太早進 → 吃滿傷害被秒。太晚進 → 隊友死光你一個人活著也沒用。`,
    `• **視野暴露是死亡通知書。** ${name} 在沒有視野的情況下走前面 = 送。永遠讓坦克/輔助走最前面。`,
    `• **被集火時生存能力有限。** 對面一旦決定all-in ${name}，沒有多個保命手段基本活不下來。`,
  ].join('\n');
}

function buildWeakMatchups(hero: typeof heroes[number], name: string): string {
  const links = counteredByLinks(hero);

  return [
    `遇到劣勢對局時，${name} 的應對策略：`,
    ``,
    `• **線上猥瑣發育。** 劣勢對局不要想單殺，補好每一個兵就是贏。等你家打野來幫忙。`,
    `• **出裝偏生存。** 多出一件防禦裝，少出一件輸出裝。劣勢對局裡活著比輸出重要。`,
    `• **等強勢期。** ${name} 總有某個時間段是強的（特定裝備節點/等級節點）。前面忍住了，後面就有機會。`,
    `• **不要心態炸裂。** 劣勢對局考驗的是防守和找機會的能力。能從劣勢翻盤的玩家才是真的會玩這個英雄。`,
    links ? `\n尤其注意：${links} 這些英雄在機制上克制 ${name}，遇到的時候優先保證自己不送。` : '',
  ].join('\n');
}

function buildWeakBpAdvice(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] {
  const cLinks = counteredByLinks(hero);
  return {
    heading: `什麼時候該Ban / 不選 ${name}`,
    body: [
      `**Ban ${name} 的情況：**`,
      `• 你方陣容缺少穩定控制，無法有效限制 ${name} 的發揮空間。`,
      `• 對方有 ${name} 的專精玩家（看對面歷史戰績）。`,
      `• 你方沒有人會玩克制 ${name} 的英雄。`,
      ``,
      `**不選 ${name} 的情況：**`,
      `• 對面已經選了克制 ${name} 的英雄（如：${cLinks || '硬控坦克/高爆發刺客'}）。`,
      `• 你方陣容不搭配——缺少前排保護（射手/法師）或缺少跟輸出（坦克/戰士）。`,
      `• 你對 ${name} 的熟練度不足。排位不是練英雄的地方，選你最有把握的。`,
      ``,
      `**總結：** ${name} 在合適的陣容和對局中很強，但不要硬選。靈活變通是上分的關鍵。`,
    ].join('\n'),
  };
}

/* ── export ── */

export function getHeroLearnArticlesZh(): LearnArticle[] {
  return heroes.flatMap((hero) => [
    generateCounterArticle(hero),
    generateGuideArticle(hero),
    generateWeaknessesArticle(hero),
  ]);
}
