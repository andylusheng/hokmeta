const fs = require('fs');
const path = require('path');
const dir = __dirname;
const apis = new Set();
for (const f of fs.readdirSync(dir)) {
  if (!f.startsWith('_bundle-')) continue;
  const js = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of js.matchAll(/["'](\/api\/[^"']+)["']/g)) apis.add(m[1]);
}
[...apis]
  .filter((a) => /hero|equip|item|rune|skill|wiki|ming|spell|adjust|arcana/i.test(a))
  .sort()
  .forEach((a) => console.log(a));
