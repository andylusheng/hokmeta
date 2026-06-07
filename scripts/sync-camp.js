/**
 * HOKMeta sync — Camp HOK primary (EN + zh-TW bilingual).
 * HoKStats.gg fallback only when Camp lacks data (counters, item catalog meta).
 */
const fs = require('fs');
const path = require('path');
const {
  fetchHeroBriefLists,
  fetchHeroDetailsBilingual,
} = require('./camp/browser-client');
const { parseHeroDetail } = require('./camp/parse-hero-detail');
const {
  collectEquipsFromPayload,
  collectRunesFromPayload,
  mergeAllEquipMaps,
  mergeAllRuneMaps,
  aggregateSeasonPatches,
} = require('./camp/catalog-collect');
const {
  parseItemListFromHtml,
  parseItemDetail,
  parseCounters,
  parseHeroNameSlugMap,
  itemNameToSlug,
  tencentItemIcon,
} = require('./hokstats-parse');

const HOKSTATS_HEROES = 'https://hokstats.gg/heroes';
const HOKSTATS_ITEMS = 'https://hokstats.gg/items';
const HOKSTATS_HERO = (slug) => `https://hokstats.gg/heroes/${slug}/`;
const HOKSTATS_ITEM = (id) => `https://hokstats.gg/items/${id}/`;
const TENCENT_AVATAR = (id) =>
  `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}.jpg`;

const root = path.join(__dirname, '..');
const heroesPath = path.join(root, 'data', 'heroes.json');
const itemsPath = path.join(root, 'data', 'items.json');
const keywordsPath = path.join(root, 'data', 'keywords.json');
const mapPath = path.join(root, 'data', 'hero-id-map.json');
const patchesPath = path.join(root, 'data', 'patches.json');
const heroNamesZhPath = path.join(root, 'data', 'hero-names-zh.json');
const itemNamesZhPath = path.join(root, 'data', 'item-names-zh.json');
const arcanaNamesZhPath = path.join(root, 'data', 'arcana-names-zh.json');
const arcanaCatalogPath = path.join(root, 'data', 'arcana.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-sync-camp/1.0)' };

async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 45000);
      const res = await fetch(url, { headers: UA, signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(800 * (i + 1));
    }
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-|-$/g, '');
}

function difficultyDefault(role) {
  if (role === 'Support' || role === 'Tank') return 'Easy';
  if (role === 'Assassin' || role === 'Mage') return 'Medium';
  return 'Medium';
}

function faqsEn(hero, buildNames) {
  const wrs = hero.winRate != null ? `${hero.winRate}% win rate` : 'N/A';
  const prs = hero.pickRate != null ? `${hero.pickRate}% pick rate` : 'N/A';
  const brs = hero.banRate != null ? `${hero.banRate}% ban rate` : 'N/A';
  return [
    {
      id: 'faq-good-season',
      question: `Is ${hero.name} good in current season?`,
      answer: `${hero.name} is Tier ${hero.tier} ${hero.role} with ${wrs}, ${prs}, and ${brs} (Camp HOK international).`,
    },
    {
      id: 'faq-best-build',
      question: `What is the best ${hero.name} build?`,
      answer: `Recommended: ${buildNames.join(', ') || 'see build section'}.`,
    },
    {
      id: 'faq-counter',
      question: `How to counter ${hero.name}?`,
      answer: `Pick ${hero.counteredBy.join(', ')}. Strong into ${hero.counters.join(', ')}.`,
    },
  ];
}

function faqsZh(hero, buildNamesZh) {
  const name = hero.nameZh || hero.name;
  const wrs = hero.winRate != null ? `${hero.winRate}%` : 'N/A';
  const prs = hero.pickRate != null ? `${hero.pickRate}%` : 'N/A';
  const brs = hero.banRate != null ? `${hero.banRate}%` : 'N/A';
  return [
    {
      id: 'faq-good-season',
      question: `${name} 這版本適合上分嗎？`,
      answer: `${name} 為 ${hero.tier} 梯度，勝率 ${wrs}、選取 ${prs}、禁用 ${brs}（Camp HOK 國際服）。`,
    },
    {
      id: 'faq-best-build',
      question: `${name} 出裝怎麼搭配？`,
      answer: `推薦：${buildNamesZh.join('、') || '見本頁出裝區'}.`,
    },
    {
      id: 'faq-counter',
      question: `怎麼克制 ${name}？`,
      answer: `可選 ${hero.counteredBy.join('、')}。${name} 克制 ${hero.counters.join('、')}。`,
    },
  ];
}

function metaAnalysisEn(hero, updated) {
  const name = hero.name;
  return [
    hero.winRate != null ? `${name} win rate ${hero.winRate}% (Camp HOK, ${updated}).` : '',
    hero.pickRate != null ? `Pick rate ${hero.pickRate}%.` : '',
    hero.banRate != null ? `Ban rate ${hero.banRate}%.` : '',
    `Counters: ${hero.counters.join(', ')}. Weak into: ${hero.counteredBy.join(', ')}.`,
  ].filter(Boolean);
}

function metaAnalysisZh(hero, updated) {
  const name = hero.nameZh || hero.name;
  return [
    hero.winRate != null ? `${name} 勝率 ${hero.winRate}%（Camp HOK，${updated}）` : '',
    hero.pickRate != null ? `選取率 ${hero.pickRate}%` : '',
    hero.banRate != null ? `禁用率 ${hero.banRate}%` : '',
    `克制：${hero.counters.join('、')}；被克制：${hero.counteredBy.join('、')}`,
  ].filter(Boolean);
}

async function syncItems(itemNameZhMap) {
  console.log('Fetching HoKStats item index (catalog fallback)...');
  const html = await fetchText(HOKSTATS_ITEMS);
  const list = parseItemListFromHtml(html);
  const items = [];

  for (let i = 0; i < list.length; i++) {
    const { id, name } = list[i];
    if (!id) continue;
    try {
      const detailHtml = await fetchText(HOKSTATS_ITEM(id));
      const row = await parseItemDetail(detailHtml, id);
      row.name = row.name || name;
      row.slug = itemNameToSlug(row.name);
      row.description = row.description || 'Data unavailable';
      row.nameZh = itemNameZhMap[row.name] || itemNameZhMap[id] || null;
      items.push(row);
    } catch {
      items.push({
        id: String(id),
        slug: itemNameToSlug(name),
        name,
        nameZh: itemNameZhMap[name] || null,
        description: 'Data unavailable',
        gold: null,
        type: null,
        icon: tencentItemIcon(id),
      });
    }
    if ((i + 1) % 25 === 0) console.log(`  items ${i + 1}/${list.length}`);
    await sleep(100);
  }

  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} items`);
  return items;
}

async function loadHokSlugMap() {
  try {
    const html = await fetchText(HOKSTATS_HEROES);
    return parseHeroNameSlugMap(html);
  } catch (e) {
    console.warn('HoKStats slug map unavailable:', e.message);
    return {};
  }
}

async function enrichCounters(hero, hokSlug) {
  try {
    const html = await fetchText(HOKSTATS_HERO(hokSlug));
    const { counters, counteredBy } = parseCounters(html, hero.name);
    if (counters.length) hero.counters = counters;
    if (counteredBy.length) hero.counteredBy = counteredBy;
  } catch {
    /* Camp-first; HoKStats fallback only */
  }
}

function collectZhNameMaps(heroes) {
  const itemNameZh = {};
  const arcanaNameZh = {};
  const heroNamesZh = {};

  for (const h of heroes) {
    if (h.nameZh) heroNamesZh[h.slug] = h.nameZh;
    const enBuild = h.build || [];
    const zhBuild = h.buildZh || [];
    enBuild.forEach((item, i) => {
      const zhItem = zhBuild[i];
      if (item?.name && zhItem?.name && item.name !== 'Data unavailable') {
        itemNameZh[item.name] = zhItem.name;
        if (item.itemId) itemNameZh[item.itemId] = zhItem.name;
      }
    });
    const enArc = h.arcana || [];
    const zhArc = h.arcanaZh || [];
    enArc.forEach((a, i) => {
      if (a && zhArc[i]) arcanaNameZh[a] = zhArc[i];
    });
  }

  return { itemNameZh, arcanaNameZh, heroNamesZh };
}

async function main() {
  const limit = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] || 0);
  const itemsOnly = process.argv.includes('--items-only');
  const skipItems = process.argv.includes('--skip-items');
  const skipCounters = process.argv.includes('--skip-counters');
  const concurrency = Number(
    process.argv.find((a) => a.startsWith('--concurrency='))?.split('=')[1] || 3
  );

  if (itemsOnly) {
    const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
    const maps = collectZhNameMaps(heroes);
    await syncItems(maps.itemNameZh);
    return;
  }

  console.log('Fetching Camp hero lists (en + zh-TW)...');
  const lists = await fetchHeroBriefLists(['en', 'zh-TW']);
  const enList = lists.en || [];
  const zhList = lists['zh-TW'] || [];
  if (!enList.length) throw new Error('Camp EN hero list empty');

  const zhBriefById = Object.fromEntries(zhList.map((h) => [h.heroId, h]));

  let heroIds = enList.map((h) => h.heroId);
  if (limit > 0) heroIds = heroIds.slice(0, limit);

  const { en: detailsEn, zh: detailsZh } = await fetchHeroDetailsBilingual(
    heroIds,
    concurrency
  );

  const nameToHokSlug = await loadHokSlugMap();
  const existingHeroes = fs.existsSync(heroesPath)
    ? JSON.parse(fs.readFileSync(heroesPath, 'utf8'))
    : [];
  const existingById = Object.fromEntries(existingHeroes.map((h) => [h.tencentId, h]));

  const heroes = [];
  const idMap = {};
  const usedSlugs = new Set();
  const updated = new Date().toISOString().slice(0, 10);
  const catalogEquipMaps = [];
  const catalogRuneMaps = [];

  for (const brief of enList) {
    if (limit > 0 && !heroIds.includes(brief.heroId)) continue;

    const zhBrief = zhBriefById[brief.heroId];
    const payloadEn = detailsEn.get(brief.heroId);
    const payloadZh = detailsZh.get(brief.heroId);
    const parsedEn = payloadEn ? parseHeroDetail(payloadEn, 'en') : null;
    const parsedZh = payloadZh ? parseHeroDetail(payloadZh, 'zh-TW') : null;

    if (payloadEn) {
      catalogEquipMaps.push({ lang: 'en', map: collectEquipsFromPayload(payloadEn) });
      catalogRuneMaps.push({ lang: 'en', map: collectRunesFromPayload(payloadEn) });
    }
    if (payloadZh) {
      catalogEquipMaps.push({ lang: 'zh-TW', map: collectEquipsFromPayload(payloadZh) });
      catalogRuneMaps.push({ lang: 'zh-TW', map: collectRunesFromPayload(payloadZh) });
    }

    const name = brief.heroName;
    let slug = nameToHokSlug[name] || slugify(name);
    if (usedSlugs.has(slug)) slug = `${slug}-${brief.heroId}`;
    usedSlugs.add(slug);

    const prev = existingById[brief.heroId];
    const role = parsedEn?.role || 'Warrior';

    const hero = {
      id: slug,
      slug,
      name,
      nameZh: zhBrief?.heroName || parsedZh?.name || null,
      role: parsedEn?.role || prev?.role || role,
      roles: parsedEn?.roles || `${brief.mainJobName || ''}, ${brief.minorJobName || ''}`.replace(/^, |, $/g, ''),
      rolesZh: zhBrief
        ? [zhBrief.mainJobName, zhBrief.minorJobName].filter(Boolean).join(', ')
        : parsedZh?.roles || null,
      lane: parsedEn?.lane || brief.recommendRoadName || prev?.lane || null,
      laneZh: zhBrief?.recommendRoadName || parsedZh?.lane || null,
      difficulty: prev?.difficulty || difficultyDefault(role),
      tier: parsedEn?.tier || prev?.tier || 'B',
      winRate: parsedEn?.winRate ?? prev?.winRate ?? null,
      pickRate: parsedEn?.pickRate ?? prev?.pickRate ?? null,
      banRate: parsedEn?.banRate ?? prev?.banRate ?? null,
      rank: null,
      avatar: parsedEn?.avatar || brief.icon || TENCENT_AVATAR(brief.heroId),
      avatarFallback: TENCENT_AVATAR(brief.heroId),
      heroCover: parsedEn?.heroCover || parsedZh?.heroCover || prev?.heroCover || null,
      tencentId: brief.heroId,
      dataSource: 'Camp HOK bilingual (primary)',
      dataUpdated: updated,
      skills: parsedEn?.skills?.length ? parsedEn.skills : prev?.skills || [],
      skillsZh: parsedZh?.skills?.length ? parsedZh.skills : prev?.skillsZh || [],
      build: parsedEn?.build?.length ? parsedEn.build : prev?.build || [],
      buildZh: parsedZh?.build?.length ? parsedZh.build : prev?.buildZh || [],
      builds: parsedEn?.builds?.length ? parsedEn.builds : prev?.builds,
      buildsZh: parsedZh?.builds?.length ? parsedZh.builds : prev?.buildsZh,
      arcana: parsedEn?.arcana?.length ? parsedEn.arcana : prev?.arcana || [],
      arcanaZh: parsedZh?.arcana?.length ? parsedZh.arcana : prev?.arcanaZh || [],
      spells: parsedEn?.spells?.length ? parsedEn.spells : prev?.spells || ['Flash', 'Execute'],
      spellsZh: parsedZh?.spells?.length ? parsedZh.spells : prev?.spellsZh || [],
      counters: prev?.counters || ['Data unavailable', 'Data unavailable', 'Data unavailable'],
      counteredBy: prev?.counteredBy || ['Data unavailable', 'Data unavailable', 'Data unavailable'],
      tips: [],
      tipsZh: [],
      patchHistory: parsedEn?.patchHistory?.length ? parsedEn.patchHistory : prev?.patchHistory || [],
      patchHistoryZh: parsedZh?.patchHistory?.length ? parsedZh.patchHistory : prev?.patchHistoryZh || [],
      faqs: [],
      faqsZh: [],
      metaAnalysis: [],
      metaAnalysisZh: [],
      guide: prev?.guide,
    };

    if (!skipCounters) {
      await enrichCounters(hero, nameToHokSlug[name] || slug);
      await sleep(100);
    }

    const buildNames = hero.build.map((b) => b.name);
    const buildNamesZh = (hero.buildZh || hero.build).map((b) => b.name);
    hero.tips = [
      `${name} (${hero.role}): Tier ${hero.tier} — ${hero.winRate != null ? hero.winRate + '% WR' : 'N/A'} (Camp HOK).`,
      hero.lane ? `Lane: ${hero.lane}.` : '',
      `Build: ${buildNames.filter((n) => n !== 'Data unavailable').slice(0, 3).join(', ') || 'see builds'}.`,
    ].filter(Boolean);
    hero.tipsZh = [
      `${hero.nameZh || name}（${hero.laneZh || hero.lane || hero.role}）：梯度 ${hero.tier}，勝率 ${hero.winRate != null ? hero.winRate + '%' : 'N/A'}（Camp HOK）。`,
      `出裝：${buildNamesZh.filter((n) => n !== 'Data unavailable').slice(0, 3).join('、') || '見出裝區'}.`,
    ];

    hero.faqs = faqsEn(hero, buildNames);
    hero.faqsZh = faqsZh(hero, buildNamesZh);
    hero.metaAnalysis = metaAnalysisEn(hero, updated);
    hero.metaAnalysisZh = metaAnalysisZh(hero, updated);

    idMap[slug] = {
      campName: name,
      campNameZh: hero.nameZh,
      tencentId: brief.heroId,
    };
    heroes.push(hero);
  }

  heroes.sort((a, b) => (b.winRate ?? -1) - (a.winRate ?? -1));
  heroes.forEach((h, i) => {
    h.rank = i + 1;
  });

  const { itemNameZh, arcanaNameZh, heroNamesZh } = collectZhNameMaps(heroes);

  const keywords = {};
  for (const h of heroes) {
    keywords[h.slug] = [
      `${h.slug} build`,
      `${h.slug} guide`,
      `${h.name} honor of kings`,
    ];
  }

  const patchAgg = aggregateSeasonPatches(heroes);
  const campItems = mergeAllEquipMaps(catalogEquipMaps);
  const campRunes = mergeAllRuneMaps(catalogRuneMaps);
  attachRuneUsage(campRunes, heroes);

  const patches = {
    season: patchAgg.currentSeason,
    currentSeason: patchAgg.currentSeason,
    source: 'Camp HOK bilingual (api-camp.honorofkings.com)',
    updated,
    heroCount: heroes.length,
    seasons: patchAgg.seasons,
    notes: `${heroes.length} heroes. Patch notes aggregated from per-hero Camp adjustData. Items/arcana from Camp equip & rune payloads.`,
  };

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  fs.writeFileSync(keywordsPath, JSON.stringify(keywords, null, 2));
  fs.writeFileSync(mapPath, JSON.stringify(idMap, null, 2));
  fs.writeFileSync(patchesPath, JSON.stringify(patches, null, 2));
  fs.writeFileSync(heroNamesZhPath, JSON.stringify(heroNamesZh, null, 2));
  fs.writeFileSync(itemNamesZhPath, JSON.stringify(itemNameZh, null, 2));
  fs.writeFileSync(arcanaNamesZhPath, JSON.stringify(arcanaNameZh, null, 2));
  fs.writeFileSync(arcanaCatalogPath, JSON.stringify(campRunes, null, 2));

  console.log(
    `Wrote ${heroes.length} heroes | zh skills: ${heroes.filter((h) => h.skillsZh?.length).length} | items: ${campItems.length} | runes: ${campRunes.length} | seasons: ${patchAgg.seasons.length}`
  );

  if (!skipItems) {
    writeCampItems(campItems);
  }
}

function attachRuneUsage(runes, heroes) {
  const counts = new Map();
  for (const h of heroes) {
    for (const list of [h.arcana, h.arcanaZh]) {
      for (const name of list || []) {
        if (!name) continue;
        counts.set(name, (counts.get(name) || 0) + 1);
      }
    }
  }
  for (const r of runes) {
    r.usedByCount = Math.max(counts.get(r.name) || 0, counts.get(r.nameZh) || 0, 0);
  }
}

function writeCampItems(campItems) {
  fs.writeFileSync(itemsPath, JSON.stringify(campItems, null, 2));
  console.log(`Wrote ${campItems.length} items (Camp catalog)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
