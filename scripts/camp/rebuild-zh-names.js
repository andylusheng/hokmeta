/** Rebuild data/hero-names-zh.json from cached Camp lists + hero-id-map. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const enPath = path.join(__dirname, '_hero-list-en.json');
const zhPath = path.join(__dirname, '_hero-list-zh-TW.json');
const mapPath = path.join(root, 'data', 'hero-id-map.json');
const outPath = path.join(root, 'data', 'hero-names-zh.json');

if (!fs.existsSync(enPath) || !fs.existsSync(zhPath)) {
  console.error('Run fetch-hero-list.js en + zh-TW first');
  process.exit(1);
}

const enList = JSON.parse(fs.readFileSync(enPath, 'utf8')).data.heroList;
const zhList = JSON.parse(fs.readFileSync(zhPath, 'utf8')).data.heroList;
const idMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

const zhById = Object.fromEntries(zhList.map((h) => [h.heroId, h.heroName]));
const enById = Object.fromEntries(enList.map((h) => [h.heroId, h.heroName]));

const out = {};
for (const [slug, meta] of Object.entries(idMap)) {
  const id = meta.tencentId;
  if (zhById[id]) out[slug] = zhById[id];
}
// fill any missing via en name match
for (const h of enList) {
  const slugEntry = Object.entries(idMap).find(([, m]) => m.tencentId === h.heroId);
  if (slugEntry && !out[slugEntry[0]] && zhById[h.heroId]) {
    out[slugEntry[0]] = zhById[h.heroId];
  }
}

fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${Object.keys(out).length} zh names -> ${outPath}`);
