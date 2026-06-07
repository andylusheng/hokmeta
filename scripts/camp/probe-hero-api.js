const fs = require('fs');
const path = require('path');
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-camp/1.0)' };
const BASE = 'https://camp.honorofkings.com/h5/app/';

async function fetchText(url) {
  const res = await fetch(url, { headers: UA });
  return res.text();
}

async function main() {
  const html = await fetchText('https://camp.honorofkings.com/h5/app/index.html?lang=zh-TW&heroId=154');
  const scripts = [...html.matchAll(/src="(static\/js\/[^"]+\.js)"/g)].map((m) => m[1]);
  const allApis = new Set();
  const heroApis = new Set();

  for (const s of scripts) {
    const js = await fetchText(BASE + s);
    const out = path.join(__dirname, '_bundle-' + s.replace(/\//g, '_'));
    if (s.includes('index') || s.includes('5944') || s.includes('vendor')) {
      fs.writeFileSync(out, js);
      console.log('saved', out, js.length);
    }
    for (const m of js.matchAll(/["'](\/api\/[^"']+)["']/g)) {
      allApis.add(m[1]);
      if (/hero|equip|item|rune|skill|build|counter|arcana|ming|spell/i.test(m[1])) {
        heroApis.add(m[1]);
      }
    }
  }

  console.log('\nHero-related APIs:');
  [...heroApis].sort().forEach((a) => console.log(a));
  console.log('\nAll /api/game/* sample:');
  [...allApis].filter((a) => a.includes('/api/game/')).sort().slice(0, 80).forEach((a) => console.log(a));
}

main().catch(console.error);
