const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const heroes = JSON.parse(
  fs.readFileSync(path.join(root, 'data', 'heroes.json'), 'utf8')
);

const outDir = path.join(root, 'public', 'api', 'heroes');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(root, 'public', 'api', 'heroes.json'),
  JSON.stringify(heroes, null, 2)
);

for (const hero of heroes) {
  fs.writeFileSync(
    path.join(outDir, `${hero.slug}.json`),
    JSON.stringify(hero, null, 2)
  );
}

console.log('API JSON copied to public/api/');
