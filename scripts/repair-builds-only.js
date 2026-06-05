/**
 * Fast pass: fetch HoKStats preset builds only (lane / CN / community tabs).
 */
const fs = require('fs');
const path = require('path');
const {
  parseBuildPresetsFromHtml,
  pickDefaultBuildItems,
  parseBuildFromHtml,
  parseHeroNameSlugMap,
  buildItemLookup,
} = require('./hokstats-parse');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const itemsPath = path.join(__dirname, '..', 'data', 'items.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-builds/1.0)' };

async function fetchText(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(String(res.status));
  return res.text();
}

function syncBuildTip(hero) {
  if (!Array.isArray(hero.tips) || !hero.build?.length) return;
  const path = hero.build
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .map((b) => b.name)
    .join(' → ');
  if (!path) return;
  const line = `Best build path: ${path}.`;
  const idx = hero.tips.findIndex((t) => /^Best build path:/i.test(t));
  if (idx >= 0) hero.tips[idx] = line;
}

async function main() {
  const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const lookup = buildItemLookup(items);
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  const nameToSlug = parseHeroNameSlugMap(
    await fetchText('https://hokstats.gg/heroes')
  );

  console.log(`Fetching build presets for ${heroes.length} heroes...`);
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < heroes.length; i++) {
    const hero = heroes[i];
    const hokSlug = nameToSlug[hero.name] || hero.slug;
    try {
      const html = await fetchText(`https://hokstats.gg/heroes/${hokSlug}/`);
      const presets = parseBuildPresetsFromHtml(html, lookup, hero.role);
      if (presets.length) {
        hero.builds = presets;
        hero.build =
          pickDefaultBuildItems(presets, hero.lane) || presets[0].items;
      } else {
        const build = parseBuildFromHtml(html, lookup, hero.lane, hero.role);
        if (build.filter((b) => b.icon).length >= 4) hero.build = build;
      }
      syncBuildTip(hero);
      ok++;
      if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/${heroes.length}`);
    } catch (e) {
      fail++;
      console.warn(`  ${hero.slug}: ${e.message}`);
    }
    await sleep(150);
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  const withPresets = heroes.filter((h) => (h.builds || []).length > 1).length;
  console.log(`Done. ok=${ok} fail=${fail} multi-build heroes=${withPresets}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
