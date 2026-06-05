/**
 * Re-fetch builds for high-traffic / high-meta heroes and sync tips.
 * Usage: node scripts/qa-priority-heroes.js
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

const PRIORITY_SLUGS = [
  'luban-no-7',
  'daji',
  'lapulapu',
  'aoyin',
  'hou-yi',
  'marco-polo',
  'angela',
  'liang',
  'chicha',
  'augran',
  'milady',
  'haya',
  'di-renjie',
  'huang-zhong',
  'kai',
];

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const itemsPath = path.join(__dirname, '..', 'data', 'items.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-qa/1.0)' };

function syncBuildTip(hero) {
  if (!Array.isArray(hero.tips) || !hero.build?.length) return;
  const pathLine = hero.build
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .map((b) => b.name)
    .join(' → ');
  if (!pathLine) return;
  const line = `Best build path: ${pathLine}.`;
  const idx = hero.tips.findIndex((t) => /^Best build path:/i.test(t));
  if (idx >= 0) hero.tips[idx] = line;
}

async function main() {
  const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const lookup = buildItemLookup(items);
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  const bySlug = Object.fromEntries(heroes.map((h) => [h.slug, h]));
  const nameToSlug = parseHeroNameSlugMap(
    await fetch('https://hokstats.gg/heroes', { headers: UA }).then((r) => r.text())
  );

  console.log(`QA builds for ${PRIORITY_SLUGS.length} priority heroes...`);
  let ok = 0;

  for (const slug of PRIORITY_SLUGS) {
    const hero = bySlug[slug];
    if (!hero) {
      console.warn(`  skip ${slug}: not in roster`);
      continue;
    }
    const hokSlug = nameToSlug[hero.name] || hero.slug;
    try {
      const html = await fetch(`https://hokstats.gg/heroes/${hokSlug}/`, {
        headers: UA,
      }).then((r) => r.text());
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
      const names = hero.build.map((b) => b.name).join(' | ');
      console.log(`  ✓ ${slug}: ${names}`);
      ok++;
    } catch (e) {
      console.warn(`  ✗ ${slug}: ${e.message}`);
    }
    await sleep(200);
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  console.log(`Done. updated=${ok}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
