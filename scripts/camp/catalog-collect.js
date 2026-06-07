const { stripCampHtml } = require('./parse-hero-detail');

const EQUIP_TYPE = {
  1: 'Attack',
  2: 'Magic',
  3: 'Defense',
  4: 'Movement',
  5: 'Jungle',
  6: 'Support',
};

function parsePassiveSkills(skills) {
  if (!skills?.length) return [];
  const seen = new Set();
  const out = [];
  for (const s of skills) {
    const text = stripCampHtml(s.name || s.desc || '');
    if (!text || seen.has(text)) continue;
    seen.add(text);
    out.push(text);
  }
  return out;
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-|-$/g, '');
}

function collectEquipsFromPayload(payload) {
  const strategy = payload?.data?.strategyData;
  const out = new Map();
  for (const post of strategy?.suitStrategy || []) {
    for (const e of post?.suitStrategy?.equips || []) {
      if (!e.equipId) continue;
      const id = String(e.equipId);
      const desc = stripCampHtml(e.equipDesc || '');
      const label = stripCampHtml(e.equipDescLabel || '');
      const passives = parsePassiveSkills(e.passiveSkills);
      const prev = out.get(id) || {};
      const mergedPassives = [...new Set([...(prev.passiveSkills || []), ...passives])];
      out.set(id, {
        id,
        name: e.equipName || prev.name,
        description: desc || label || prev.description || '',
        descLabel: label || prev.descLabel || '',
        passiveSkills: mergedPassives.length ? mergedPassives : prev.passiveSkills,
        gold: e.equipPrice ?? prev.gold ?? null,
        type: EQUIP_TYPE[e.equipType] || prev.type || null,
        icon:
          e.equipIcon ||
          prev.icon ||
          `https://camp.honorofkings.com/social/game/BattleEquip/${id}.png`,
        level: e.equipLevel ?? prev.level ?? null,
      });
    }
  }
  return out;
}

function collectRunesFromPayload(payload) {
  const strategy = payload?.data?.strategyData;
  const out = new Map();
  for (const post of strategy?.suitStrategy || []) {
    for (const r of post?.suitStrategy?.runes || []) {
      if (!r.runeId) continue;
      const id = String(r.runeId);
      out.set(id, {
        id,
        name: r.runeName || out.get(id)?.name,
        icon:
          r.runeIcon ||
          out.get(id)?.icon ||
          `https://res.sgameglobal.com/social/game/Symbol/${id}.png`,
        description: stripCampHtml(r.runeDesc || '') || out.get(id)?.description || '',
        level: r.runeLevel ?? out.get(id)?.level ?? null,
        color: r.runeColor ?? out.get(id)?.color ?? null,
      });
    }
  }
  return out;
}

function parseAdjustData(adjustData) {
  if (!adjustData?.length) return [];
  return adjustData
    .map((a) => ({
      seasonId: a.seasonId,
      seasonName: a.seasonName || 'Patch',
      versionName: a.versionName || null,
      publishedAt: a.versionPublishTime || null,
      isCurrent: Boolean(a.isCurrent),
      tag: a.adjustContent?.contentTag?.text || null,
      change: stripCampHtml(a.adjustContent?.shortDesc || a.adjustContent?.desc || ''),
      detail: stripCampHtml(a.adjustContent?.desc || ''),
      version: a.seasonName || a.versionName || 'Patch',
    }))
    .filter((p) => p.change);
}

function mergeEquipMaps(enMap, zhMap) {
  const ids = new Set([...enMap.keys(), ...zhMap.keys()]);
  const items = [];
  for (const id of ids) {
    const en = enMap.get(id) || {};
    const zh = zhMap.get(id) || {};
    const name = en.name || zh.name || id;
    items.push({
      id,
      slug: slugify(name) || `item-${id}`,
      name,
      nameZh: zh.name || null,
      description: en.description || en.descLabel || 'Data unavailable',
      descriptionZh: zh.description || zh.descLabel || null,
      descLabel: en.descLabel || null,
      descLabelZh: zh.descLabel || null,
      passiveSkills: en.passiveSkills?.length ? en.passiveSkills : null,
      passiveSkillsZh: zh.passiveSkills?.length ? zh.passiveSkills : null,
      icon: en.icon || zh.icon,
      gold: en.gold ?? zh.gold ?? null,
      type: en.type || zh.type || null,
      level: en.level ?? zh.level ?? null,
    });
  }
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

function mergeAllEquipMaps(mapList) {
  const en = new Map();
  const zh = new Map();
  for (const { lang, map } of mapList) {
    for (const [id, row] of map) {
      const target = lang === 'zh-TW' ? zh : en;
      const prev = target.get(id) || {};
      target.set(id, { ...prev, ...row });
    }
  }
  return mergeEquipMaps(en, zh);
}

function mergeAllRuneMaps(mapList) {
  const en = new Map();
  const zh = new Map();
  for (const { lang, map } of mapList) {
    for (const [id, row] of map) {
      const target = lang === 'zh-TW' ? zh : en;
      const prev = target.get(id) || {};
      target.set(id, { ...prev, ...row });
    }
  }
  const ids = new Set([...en.keys(), ...zh.keys()]);
  const runes = [];
  for (const id of ids) {
    const e = en.get(id) || {};
    const z = zh.get(id) || {};
    runes.push({
      id,
      name: e.name || z.name || id,
      nameZh: z.name || null,
      icon: e.icon || z.icon,
      description: e.description || 'Data unavailable',
      descriptionZh: z.description || null,
      level: e.level ?? z.level ?? null,
      color: e.color ?? z.color ?? null,
    });
  }
  return runes.sort((a, b) => a.name.localeCompare(b.name));
}

function aggregateSeasonPatches(heroes) {
  const seasonMap = new Map();
  let currentSeason = 'Live';

  for (const h of heroes) {
    const enHist = h.patchHistory || [];
    const zhByVersion = new Map(
      (h.patchHistoryZh || []).map((p) => [p.versionName || p.version, p])
    );

    for (const p of enHist) {
      const season = p.seasonName || p.version;
      if (p.isCurrent) currentSeason = season;
      if (!seasonMap.has(season)) {
        seasonMap.set(season, {
          seasonName: season,
          seasonId: p.seasonId,
          changes: [],
        });
      }
      const zh = zhByVersion.get(p.versionName || p.version);
      seasonMap.get(season).changes.push({
        heroSlug: h.slug,
        heroName: h.name,
        heroNameZh: h.nameZh || null,
        tag: p.tag || zh?.tag || null,
        change: p.change,
        changeZh: zh?.change || null,
        detail: p.detail || null,
        detailZh: zh?.detail || null,
        versionName: p.versionName || null,
        publishedAt: p.publishedAt || null,
      });
    }
  }

  const seasons = [...seasonMap.values()].sort((a, b) => {
    const ta = a.changes[0]?.publishedAt || '';
    const tb = b.changes[0]?.publishedAt || '';
    return tb.localeCompare(ta);
  });

  return { currentSeason, seasons };
}

function countRuneUsage(heroes) {
  const counts = new Map();
  for (const h of heroes) {
    for (const name of h.arcana || []) {
      if (!name) continue;
      counts.set(name, (counts.get(name) || 0) + 1);
    }
  }
  return counts;
}

module.exports = {
  collectEquipsFromPayload,
  collectRunesFromPayload,
  parseAdjustData,
  mergeAllEquipMaps,
  mergeAllRuneMaps,
  aggregateSeasonPatches,
  countRuneUsage,
  slugify,
};
