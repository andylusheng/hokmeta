/** Parse Camp getherodataall response into hokmeta hero fields. */

function stripCampHtml(s) {
  if (!s) return '';
  return s
    .replace(/<color=[^>]+>/gi, '')
    .replace(/<\/color>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\{cd\}/gi, '')
    .replace(/\{hp\}/gi, 'HP')
    .trim();
}

function parsePercent(str) {
  if (!str || typeof str !== 'string') return null;
  const n = parseFloat(str.replace('%', '').trim());
  return Number.isFinite(n) ? n : null;
}

const POP_TIER = { S: 'S+', A: 'S', B: 'A', C: 'B', D: 'C' };

const ROLE_MAP = {
  Fighter: 'Warrior',
  Tank: 'Tank',
  Mage: 'Mage',
  Marksman: 'Marksman',
  Assassin: 'Assassin',
  Support: 'Support',
};

function primaryRole(main, minor) {
  const parts = [main, minor].filter(Boolean);
  const order = ['Tank', 'Support', 'Assassin', 'Mage', 'Marksman', 'Fighter'];
  for (const o of order) {
    if (parts.includes(o)) return ROLE_MAP[o] || 'Warrior';
  }
  return ROLE_MAP[parts[0]] || 'Warrior';
}

function slotFromSkill(skill) {
  if (skill.isPassive) return 'passive';
  if (skill.isUlt) return 'ultimate';
  if (skill.skillIndex === 1) return 'skill1';
  if (skill.skillIndex === 2) return 'skill2';
  return `skill${skill.skillIndex ?? 0}`;
}

function parseSkills(strategyData) {
  const sets = strategyData?.skill || [];
  const first = sets.find((s) => s.setOrder === 0) || sets[0];
  if (!first?.skillList?.length) return [];

  const slotOrder = ['passive', 'skill1', 'skill2', 'ultimate'];
  const mapped = [];
  for (const sk of first.skillList) {
    mapped.push({
      slot: slotFromSkill(sk),
      name: sk.skillName || 'Data unavailable',
      description: stripCampHtml(sk.skillDesc) || 'Data unavailable',
      icon: sk.skillIcon || '',
      cooldown: sk.skillCd ? `${Math.round(sk.skillCd / 1000)}s` : null,
    });
  }
  return slotOrder.map(
    (slot) => mapped.find((m) => m.slot === slot) || mapped[slotOrder.indexOf(slot)]
  ).filter(Boolean);
}

function pickBuildFromSuit(post) {
  const suit = post?.suitStrategy;
  if (!suit?.equips?.length) return null;

  const finals = suit.equips.filter((e) => e.isTopEquip);
  const picked = (finals.length ? finals : suit.equips)
    .filter((e) => e.equipLevel >= 2)
    .slice(-6);

  return picked.map((e, i) => ({
    slot: i + 1,
    itemId: String(e.equipId),
    name: e.equipName || 'Data unavailable',
    icon: e.equipIcon || null,
    description: stripCampHtml(e.equipDesc || e.equipDescLabel || '') || null,
  }));
}

function parseBuilds(strategyData) {
  const posts = strategyData?.suitStrategy || [];
  const builds = [];
  for (let i = 0; i < Math.min(posts.length, 4); i++) {
    const items = pickBuildFromSuit(posts[i]);
    if (!items?.length) continue;
    const label = posts[i].suitStrategy?.title || posts[i].tags?.[0]?.tagName || `Build ${i + 1}`;
    const laneTag = posts[i].tags?.find((t) => /top|mid|jungle|farm|roam|clash/i.test(t.tagName));
    builds.push({
      id: `camp-${i}`,
      label,
      lane: laneTag?.tagName || null,
      items,
    });
  }
  return builds;
}

function parseArcana(strategyData) {
  const post = strategyData?.suitStrategy?.[0];
  const runes = post?.suitStrategy?.runes;
  if (!runes?.length) return [];
  const seen = new Set();
  const out = [];
  for (const r of runes) {
    const key = r.runeName;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
    if (out.length >= 3) break;
  }
  return out;
}

function parseSpells(strategyData) {
  const spell = strategyData?.suitStrategy?.[0]?.suitStrategy?.skills;
  if (!spell?.skillName) return [];
  return [spell.skillName];
}

function parsePatchHistory(adjustData) {
  const { parseAdjustData } = require('./catalog-collect');
  return parseAdjustData(adjustData);
}

function parseHeroDetail(payload, locale = 'en') {
  const data = payload?.data;
  if (!data) return null;

  const info = data.baseInfo?.heroInfo || {};
  const base = data.heroData?.baseData || {};
  const strategy = data.strategyData || {};

  const role = primaryRole(info.mainJobName, info.minorJobName);
  const builds = parseBuilds(strategy);
  const defaultBuild = builds[0]?.items || [];

  return {
    tencentId: info.heroId,
    name: info.heroName,
    role,
    roles: [info.mainJobName, info.minorJobName].filter(Boolean).join(', '),
    lane: info.recommendRoadName || null,
    tier: POP_TIER[base.hot] || 'B',
    winRate: parsePercent(base.winRate),
    pickRate: parsePercent(base.matchRate),
    banRate: parsePercent(base.banRate),
    avatar: info.icon,
    heroCover:
      data.baseInfo?.displayData?.heroCover ||
      data.baseInfo?.displayData?.heroCoverHz ||
      null,
    skills: parseSkills(strategy),
    builds,
    build: defaultBuild,
    arcana: parseArcana(strategy),
    spells: parseSpells(strategy),
    patchHistory: parsePatchHistory(data.heroData?.adjustData),
    refreshTime: data.heroData?.refreshTime || null,
  };
}

module.exports = {
  stripCampHtml,
  parsePercent,
  parseHeroDetail,
  primaryRole,
  POP_TIER,
};
