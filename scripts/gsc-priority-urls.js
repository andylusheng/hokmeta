/**
 * Print priority URLs for GSC / Bing manual indexing.
 * Usage: node scripts/gsc-priority-urls.js
 */
const heroes = require('../data/heroes.json');
const items = require('../data/items.json');
const site = require('../config/site.json');

const base = site.domain.replace(/\/$/, '');
const tierScore = { 'S+': 6, S: 5, A: 4 };
const priority = heroes
  .filter((h) => tierScore[h.tier])
  .sort(
    (a, b) =>
      (tierScore[b.tier] || 0) - (tierScore[a.tier] || 0) ||
      (b.pickRate || 0) - (a.pickRate || 0)
  )
  .slice(0, 40);

const hub = [
  '/',
  '/tier-list/',
  '/hero-trends/',
  '/best-heroes/',
  '/learn/',
  '/tools/build-generator/',
  '/tools/counter-picker/',
];

console.log('# === Submit in Google Search Console & Bing Webmaster ===');
console.log(`# Sitemap: ${base}/sitemap.xml`);
console.log('# GSC: Sitemaps → Add sitemap → paste URL above');
console.log('# Bing: Sitemaps → Submit sitemap → same URL\n');

console.log('## Hub pages (index first)\n');
for (const p of hub) console.log(`${base}${p}`);

console.log(`\n## Top ${priority.length} hero pages\n`);
for (const h of priority) {
  console.log(`${base}/hero/${h.slug}/  (${h.tier} ${h.role})`);
}

console.log(`\n## Top ${priority.length} counter pages\n`);
for (const h of priority) {
  console.log(`${base}/hero/${h.slug}/counters/  (${h.tier} ${h.role})`);
}

console.log(`\n## Item detail pages (${items.length})\n`);
for (const item of items) {
  console.log(`${base}/items/${item.id}/`);
}
