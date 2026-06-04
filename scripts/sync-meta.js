/**
 * Sync win/pick/ban rates, avatars, counters from Camp HOK + Tencent official data.
 * Stats: hok-meta-analyzer export (Camp HOK). Counters: qing762 honor-of-kings-api.
 */
const fs = require('fs');
const path = require('path');

const CAMP_EXPORT_URL =
  'https://raw.githubusercontent.com/lnsdeep/hok-meta-analyzer/main/heroes.json';
const QING762_BASE = 'https://qing762.is-a.dev/api/wangzhe';
const TENCENT_AVATAR = (id) =>
  `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}.jpg`;

const root = path.join(__dirname, '..');
const heroesPath = path.join(root, 'data', 'heroes.json');
const mapPath = path.join(root, 'data', 'hero-id-map.json');
const patchesPath = path.join(root, 'data', 'patches.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parsePercent(str) {
  if (!str || typeof str !== 'string') return null;
  const n = parseFloat(str.replace('%', '').trim());
  return Number.isFinite(n) ? n : null;
}

function popularityToTier(pop) {
  const m = { S: 'S+', A: 'S', B: 'A', C: 'B', D: 'C' };
  return m[pop] ?? null;
}

function findCampRow(campList, entry) {
  if (entry.matchEnglish) {
    return campList.find((h) => h.english_hero_name === entry.campName);
  }
  return campList.find((h) => h.chinese_hero_name === entry.campName);
}

async function buildQing762Maps() {
  const res = await fetch(QING762_BASE);
  if (!res.ok) throw new Error(`qing762 list failed: ${res.status}`);
  const data = await res.json();
  const idToApiName = {};
  const cnToId = {};

  for (const [name, hero] of Object.entries(data.main || {})) {
    const img = hero.skill?.[0]?.skillImg || '';
    const m = img.match(/heroimg\/(\d+)\//);
    if (m) {
      idToApiName[m[1]] = name;
      cnToId[name] = parseInt(m[1], 10);
    }
  }
  return { idToApiName, cnToId, main: data.main || {} };
}

function buildIdToGlobalName(campList) {
  const m = {};
  for (const h of campList) {
    m[h.id] = h.chinese_hero_name;
  }
  return m;
}

function cnToGlobalName(cn, main, idToGlobal) {
  const hero = main[cn];
  if (!hero) return null;
  const img = hero.skill?.[0]?.skillImg || '';
  const m = img.match(/heroimg\/(\d+)\//);
  if (m && idToGlobal[m[1]]) return idToGlobal[m[1]];
  return null;
}

async function fetchHeroCounters(apiName, main, idToGlobal) {
  const res = await fetch(
    `${QING762_BASE}/heroes/${encodeURIComponent(apiName)}`
  );
  if (!res.ok) return { counters: null, counteredBy: null };
  const d = await res.json();

  const counters = Object.keys(d.suppressingHeroes || {})
    .slice(0, 3)
    .map((cn) => cnToGlobalName(cn, main, idToGlobal) || cn);

  const counteredBy = Object.keys(d.suppressedHeroes || {})
    .slice(0, 3)
    .map((cn) => cnToGlobalName(cn, main, idToGlobal) || cn);

  return { counters, counteredBy };
}

async function main() {
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  const idMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  console.log('Fetching Camp HOK metrics export...');
  const campRes = await fetch(CAMP_EXPORT_URL);
  if (!campRes.ok) throw new Error(`Camp export failed: ${campRes.status}`);
  const campList = await campRes.json();

  console.log('Loading Tencent hero index (qing762)...');
  const { idToApiName, main } = await buildQing762Maps();
  const idToGlobal = buildIdToGlobalName(campList);

  const statsRows = [];

  for (const hero of heroes) {
    const entry = idMap[hero.slug];
    if (!entry) {
      console.warn(`No id map for ${hero.slug}`);
      continue;
    }

    const row = findCampRow(campList, entry);
    if (!row) {
      console.warn(`No Camp data for ${hero.name} (${entry.campName})`);
      hero.avatar = TENCENT_AVATAR(entry.tencentId);
      continue;
    }

    const wr = parsePercent(row.win_rate);
    const pr = parsePercent(row.pick_rate);
    const br = parsePercent(row.ban_rate);
    const tier = popularityToTier(row.popularity);

    if (wr !== null) hero.winRate = wr;
    if (pr !== null) hero.pickRate = pr;
    if (br !== null) hero.banRate = br;
    if (tier) hero.tier = tier;

    hero.tencentId = entry.tencentId;
    hero.avatar = row.image_url?.startsWith('http')
      ? row.image_url
      : TENCENT_AVATAR(entry.tencentId);
    hero.avatarFallback = TENCENT_AVATAR(entry.tencentId);
    hero.dataSource = 'Camp HOK + Tencent official';
    hero.dataUpdated = new Date().toISOString().slice(0, 10);

    const apiName = idToApiName[String(entry.tencentId)];
    if (apiName) {
      const { counters, counteredBy } = await fetchHeroCounters(
        apiName,
        main,
        idToGlobal
      );
      if (counters?.length) hero.counters = counters;
      if (counteredBy?.length) hero.counteredBy = counteredBy;
      await sleep(120);
    }

    statsRows.push({ slug: hero.slug, winRate: wr ?? -1 });

    const wrText = wr != null ? `${wr}%` : 'Data unavailable';
    const prText = pr != null ? `${pr}%` : 'Data unavailable';
    const brText = br != null ? `${br}%` : 'Data unavailable';

    hero.patchHistory = [
      {
        version: 'Live meta',
        change: `Camp HOK ranked stats — WR ${wrText}, pick ${prText}, ban ${brText}, tier band ${row.popularity || 'N/A'}.`,
      },
      {
        version: 'Matchups',
        change: `Counters ${hero.counters.join(', ')} · Weak into ${hero.counteredBy.join(', ')} (Tencent hero data).`,
      },
      { version: 'S37', change: 'Data unavailable' },
    ];

    hero.faqs = hero.faqs.map((faq) => {
      if (faq.id === 'faq-good-season') {
        return {
          ...faq,
          answer: `${hero.name} shows ${wrText} win rate, ${prText} pick rate, ${brText} ban rate (Camp HOK). Tier ${hero.tier} ${hero.role}.`,
        };
      }
      if (faq.id === 'faq-counter') {
        return {
          ...faq,
          answer: `Use ${hero.counters.join(', ')}. Ban rate ${brText} reflects draft priority against ${hero.name}.`,
        };
      }
      return faq;
    });

    hero.metaAnalysis = [
      wr != null
        ? `${hero.name} win rate ${wr}% (Camp HOK, ${hero.dataUpdated}).`
        : `${hero.name} win rate: Data unavailable.`,
      pr != null
        ? `Pick rate ${pr}% for ${hero.name} in current ranked meta.`
        : `Pick rate: Data unavailable.`,
      br != null
        ? `Ban rate ${br}% — ${br > 5 ? 'high draft pressure' : 'moderate bans'}.`
        : `Ban rate: Data unavailable.`,
      `Counters: ${hero.counters.join(', ')}. Countered by: ${hero.counteredBy.join(', ')}.`,
    ];
  }

  statsRows.sort((a, b) => b.winRate - a.winRate);
  statsRows.forEach((r, i) => {
    const h = heroes.find((x) => x.slug === r.slug);
    if (h) h.rank = i + 1;
  });

  const patches = {
    season: 'Live',
    source: 'Camp HOK + Tencent (hok-meta-analyzer, qing762 API)',
    updated: new Date().toISOString().slice(0, 10),
    notes:
      'Win/pick/ban from Camp HOK. Counters from Tencent official hero pages via qing762 API.',
  };
  fs.writeFileSync(patchesPath, JSON.stringify(patches, null, 2));
  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  console.log(`Updated ${heroes.length} heroes → ${heroesPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
