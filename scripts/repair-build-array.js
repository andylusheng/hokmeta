const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'heroes.json');
const heroes = JSON.parse(fs.readFileSync(p, 'utf8'));
let n = 0;
for (const h of heroes) {
  if (!Array.isArray(h.build)) {
    h.build = Array.from({ length: 6 }, (_, i) => ({
      slot: i + 1,
      itemId: null,
      name: 'Data unavailable',
      icon: null,
      description: null,
    }));
    n++;
  }
}
fs.writeFileSync(p, JSON.stringify(heroes, null, 2));
console.log('Reset build[] for', n, 'heroes');
