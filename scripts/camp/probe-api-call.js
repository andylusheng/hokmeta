const fs = require('fs');
const path = require('path');

const UA = {
  'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-camp/1.0)',
  Accept: 'application/json',
  Referer: 'https://camp.honorofkings.com/h5/app/index.html',
};

const BASES = [
  'https://camp.honorofkings.com',
  'https://camp.honorofkings.com/h5/app',
];

function extractApis() {
  const dir = __dirname;
  const apis = new Set();
  for (const f of fs.readdirSync(dir)) {
    if (!f.startsWith('_bundle-')) continue;
    const js = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of js.matchAll(/["'](\/api\/[^"']+)["']/g)) apis.add(m[1]);
  }
  return [...apis].filter((a) => /hero|equip|item|rune|skill|wiki|ming|spell|build|counter|arcana/i.test(a));
}

async function tryCall(base, api, params) {
  const qs = new URLSearchParams(params).toString();
  const url = `${base}${api}${qs ? `?${qs}` : ''}`;
  try {
    const res = await fetch(url, { headers: UA });
    const text = await res.text();
    let preview = text.slice(0, 500);
    if (text.startsWith('{') || text.startsWith('[')) {
      try {
        const j = JSON.parse(text);
        preview = JSON.stringify(j).slice(0, 600);
      } catch {
        /* */
      }
    }
    console.log(`[${res.status}] ${url}`);
    console.log(preview, '\n');
    return res.ok;
  } catch (e) {
    console.log(`[ERR] ${url} — ${e.message}\n`);
    return false;
  }
}

async function main() {
  const apis = extractApis();
  console.log('Hero APIs found:', apis.sort().join('\n'), '\n');

  const tests = [
    ['/api/herowiki/getallherobriefinfo', { lang: 'en' }],
    ['/api/herowiki/getallherobriefinfo', { lang: 'zh-TW' }],
    ['/api/herowiki/getherodetail', { heroId: '154', lang: 'zh-TW' }],
    ['/api/herowiki/getherodetail', { heroId: '154', lang: 'en' }],
    ['/api/herowiki/getheroinfo', { heroId: '154', lang: 'zh-TW' }],
    ['/api/herowiki/getheroattribute', { heroId: '154', lang: 'zh-TW' }],
    ['/api/herowiki/getheroskill', { heroId: '154', lang: 'zh-TW' }],
    ['/api/herowiki/getheroequip', { heroId: '154', lang: 'zh-TW' }],
    ['/api/game/camphome/horizontal/herolist', { lang: 'zh-TW' }],
  ];

  for (const [api, params] of tests) {
    for (const base of BASES) {
      const ok = await tryCall(base, api, params);
      if (ok) break;
    }
  }
}

main().catch(console.error);
