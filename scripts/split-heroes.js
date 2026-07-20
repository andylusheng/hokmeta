/**
 * split-heroes.js
 * Generates data/heroes-index.json (lightweight) from data/heroes.json (full).
 * Run: node scripts/split-heroes.js
 *
 * The index strips heavy nested fields (skills, builds, guide, faqs, patchHistory,
 * metaAnalysis, tips) so client-side bundles stay small. Full data remains in
 * heroes.json for server-side build-time rendering.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const heroesPath = path.join(DATA_DIR, 'heroes.json');
const outPath = path.join(DATA_DIR, 'heroes-index.json');

const HEAVY_FIELDS = [
  'skills',
  'skillsZh',
  'build',
  'buildZh',
  'builds',
  'buildsZh',
  'guide',
  'faqs',
  'faqsZh',
  'patchHistory',
  'patchHistoryZh',
  'metaAnalysis',
  'metaAnalysisZh',
  'tips',
  'tipsZh',
];

function main() {
  const raw = fs.readFileSync(heroesPath, 'utf-8');
  const heroes = JSON.parse(raw);

  const index = heroes.map((hero) => {
    const entry = { ...hero };
    for (const field of HEAVY_FIELDS) {
      delete entry[field];
    }
    return entry;
  });

  fs.writeFileSync(outPath, JSON.stringify(index, null, 0), 'utf-8');

  const fullSize = (Buffer.byteLength(raw) / 1024).toFixed(1);
  const indexSize = (Buffer.byteLength(fs.readFileSync(outPath)) / 1024).toFixed(1);
  const reduction = ((1 - indexSize / fullSize) * 100).toFixed(1);

  console.log(`✓ heroes-index.json generated`);
  console.log(`  Full:  ${fullSize} KB (${heroes.length} heroes)`);
  console.log(`  Index: ${indexSize} KB`);
  console.log(`  Reduction: ${reduction}%`);
}

main();
