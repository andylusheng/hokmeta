const data = require('./public/api/heroes.json');
const sorted = [...data].sort((a, b) => (b.pickRate || 0) - (a.pickRate || 0));
const top30 = sorted.slice(0, 30);

console.log('=== TOP 30 HEROES BY PICK RATE ===');
top30.forEach((h, i) => {
  const cb = (h.counteredBy || []).join(', ');
  console.log(`${String(i+1).padStart(2)}. ${h.name.padEnd(18)} (${(h.nameZh||'').padEnd(6)}) pick:${String(h.pickRate||0).padEnd(5)}% win:${String(h.winRate||0).padEnd(5)}% | counteredBy: [${cb}]`);
});

console.log('\n=== SLUGS ONLY (for batch fetch) ===');
console.log(top30.map(h => h.slug).join('\n'));
