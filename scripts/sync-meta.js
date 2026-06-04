/**
 * Sync win/pick/ban rates + avatars from Camp HOK public metrics
 * (via lnsdeep/hok-meta-analyzer community export).
 * Avatars: Tencent game.gtimg.cn CDN by official hero ID.
 */
const fs = require('fs');
const path = require('path');

const CAMP_EXPORT_URL =
  'https://raw.githubusercontent.com/lnsdeep/hok-meta-analyzer/main/heroes.json';
const TENCENT_AVATAR = (id) =>
  `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}.jpg`;

const root = path.join(__dirname, '..');
const heroesPath = path.join(root, 'data', 'heroes.json');
const mapPath = path.join(root, 'data', 'hero-id-map.json');
const patchesPath = path.join(root, 'data', 'patches.json');

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

async function main() {
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  const idMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  console.log('Fetching Camp HOK metrics export...');
  const res = await fetch(CAMP_EXPORT_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const campList = await res.json();

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
    hero.dataSource = 'Camp HOK via hok-meta-analyzer';
    hero.dataUpdated = new Date().toISOString().slice(0, 10);

    statsRows.push({ slug: hero.slug, winRate: wr ?? -1 });

    const wrText = wr != null ? `${wr}%` : 'Data unavailable';
    const prText = pr != null ? `${pr}%` : 'Data unavailable';
    const brText = br != null ? `${br}%` : 'Data unavailable';

    hero.patchHistory = [
      {
        version: 'Live meta',
        change: `Camp HOK ranked stats — WR ${wrText}, pick ${prText}, ban ${brText}, tier band ${row.popularity || 'N/A'}.`,
      },
      hero.patchHistory?.[1] || { version: 'S38', change: 'Data unavailable' },
      hero.patchHistory?.[2] || { version: 'S37', change: 'Data unavailable' },
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
    source: 'Camp HOK (hok-meta-analyzer export)',
    updated: new Date().toISOString().slice(0, 10),
    notes:
      'Win/pick/ban rates synced from Tencent Camp HOK public metrics. Re-run npm run sync-meta to refresh.',
  };
  fs.writeFileSync(patchesPath, JSON.stringify(patches, null, 2));

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  console.log(`Updated ${heroes.length} heroes → ${heroesPath}`);
  console.log(`Patches meta → ${patchesPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
