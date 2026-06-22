/**
 * Stamp sync date on heroes + site config, then copy to public/api/.
 * Run after sync-camp (or standalone to align dates before deploy).
 *
 *   node scripts/bump-sync-date.js
 *   SYNC_DATE=2026-06-22 node scripts/bump-sync-date.js
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const SYNC_DATE = process.env.SYNC_DATE || new Date().toISOString().slice(0, 10);

const heroesPath = path.join(root, 'data', 'heroes.json');
const sitePath = path.join(root, 'config', 'site.json');
const patchesPath = path.join(root, 'data', 'patches.json');

const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
for (const hero of heroes) {
  hero.dataUpdated = SYNC_DATE;
}
fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));

const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
site.dateModified = SYNC_DATE;
fs.writeFileSync(sitePath, JSON.stringify(site, null, 2) + '\n');

if (fs.existsSync(patchesPath)) {
  const patches = JSON.parse(fs.readFileSync(patchesPath, 'utf8'));
  patches.updated = SYNC_DATE;
  fs.writeFileSync(patchesPath, JSON.stringify(patches, null, 2));
}

spawnSync(process.execPath, [path.join(__dirname, 'copy-api.js')], {
  stdio: 'inherit',
  cwd: root,
});

console.log(`Stamped ${heroes.length} heroes + site.dateModified → ${SYNC_DATE}`);
