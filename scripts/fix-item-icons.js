/**
 * One-off patch: correct Tencent item icon URLs in items.json + hero builds.
 */
const fs = require('fs');
const path = require('path');
const { tencentItemIcon } = require('./hokstats-parse');

const root = path.join(__dirname, '..');
const itemsPath = path.join(root, 'data', 'items.json');
const heroesPath = path.join(root, 'data', 'heroes.json');

const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
for (const it of items) {
  if (it.id) it.icon = tencentItemIcon(it.id);
}
fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const bySlug = Object.fromEntries(items.map((i) => [i.slug, i]));

const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
for (const h of heroes) {
  for (const b of h.build || []) {
    if (b.itemId && byId[b.itemId]) {
      b.icon = byId[b.itemId].icon;
      b.name = byId[b.itemId].name;
      b.description = byId[b.itemId].description;
    } else if (b.name && b.name !== 'Data unavailable') {
      const slug = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const it = Object.values(bySlug).find(
        (x) => x.slug.includes(slug) || slug.includes(x.slug.split('-')[0])
      );
      if (it) {
        b.itemId = it.id;
        b.icon = it.icon;
        b.name = it.name;
        b.description = it.description;
      }
    }
  }
}
fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
console.log('Fixed icons for', items.length, 'items and', heroes.length, 'heroes');
