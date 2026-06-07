/**
 * Add heroCover URLs to data/heroes.json from Camp getherodataall.
 * Run: node scripts/camp/enrich-covers.js [--limit=10]
 */
const fs = require('fs');
const path = require('path');
const { fetchHeroDetailsBatch } = require('./browser-client');
const { parseHeroDetail } = require('./parse-hero-detail');

const root = path.join(__dirname, '..', '..');
const heroesPath = path.join(root, 'data', 'heroes.json');
const limit = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] || 0);

async function main() {
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  let ids = heroes.map((h) => h.tencentId).filter(Boolean);
  if (limit > 0) ids = ids.slice(0, limit);

  console.log(`Fetching covers for ${ids.length} heroes...`);
  const details = await fetchHeroDetailsBatch(ids, 'en', 4);
  let updated = 0;

  for (const hero of heroes) {
    const payload = details.get(hero.tencentId);
    if (!payload) continue;
    const parsed = parseHeroDetail(payload, 'en');
    if (parsed?.heroCover) {
      hero.heroCover = parsed.heroCover;
      updated++;
    }
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  console.log(`Updated ${updated} hero covers → ${heroesPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
