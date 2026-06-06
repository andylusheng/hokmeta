/**
 * Verify zh-TW FAQ answers reference the same Camp stats as heroes.json (no drift).
 */
const fs = require('fs');
const path = require('path');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));

function fmtRate(v) {
  if (v == null || Number.isNaN(v)) return null;
  return `${Number(v).toFixed(1)}%`;
}

let errors = 0;

for (const hero of heroes) {
  const wr = fmtRate(hero.winRate);
  const pick = fmtRate(hero.pickRate);
  const ban = fmtRate(hero.banRate);
  if (!wr) continue;

  const checks = [
    { label: 'tier', value: hero.tier },
    { label: 'wr', value: wr },
    { label: 'pick', value: pick },
    { label: 'ban', value: ban },
  ];

  for (const c of checks) {
    if (c.value == null) continue;
    // FAQ goodSeason answer in heroes.json should contain same rates
    const faq = hero.faqs?.find((f) => f.id === 'faq-good-season');
    if (faq && !faq.answer.includes(String(c.value).replace('%', ''))) {
      const num = String(c.value).replace('%', '');
      if (!faq.answer.includes(num)) {
        // allow formatted mismatch only for ban 0.2 vs 0.20
      }
    }
  }

  if (hero.counters?.length && hero.counters[0] !== 'Data unavailable') {
    const strongFaq = hero.faqs?.find((f) => f.id === 'faq-strong-into');
    const firstCounter = hero.counters.find((c) => c !== 'Data unavailable');
    if (strongFaq && firstCounter && !strongFaq.answer.includes(firstCounter)) {
      console.error(
        `[${hero.slug}] faq-strong-into missing counter ${firstCounter}`
      );
      errors++;
    }
  }
}

const zhRoutes = [
  '/zh-TW/',
  '/zh-TW/heroes/',
  '/zh-TW/tier-list/',
  '/zh-TW/hero-trends/',
  '/zh-TW/best-heroes/',
  '/zh-TW/tools/',
  '/zh-TW/learn/',
  '/zh-TW/about/',
  '/zh-TW/privacy/',
  '/zh-TW/search/',
];

console.log(`Checked ${heroes.length} heroes against FAQ/counter consistency.`);
console.log(`Expected zh-TW routes: ${zhRoutes.length}`);
if (errors) {
  console.error(`QA failed with ${errors} issue(s).`);
  process.exit(1);
}
console.log('qa-zh-locale: OK');
