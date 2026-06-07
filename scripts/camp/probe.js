/**
 * Probe Camp HOK endpoints for hero/item data.
 */
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-camp/1.0)' };

const CANDIDATES = [
  'https://camp.honorofkings.com/camp/api/hero/list?lang=en',
  'https://camp.honorofkings.com/camp/api/hero/list?lang=zh-TW',
  'https://camp.honorofkings.com/camp/api/herolist?lang=en',
  'https://camp.honorofkings.com/camp/api/hero/detail?heroId=154&lang=zh-TW',
  'https://camp.honorofkings.com/camp/api/hero/detail?heroId=154&lang=en',
  'https://camp.honorofkings.com/camp/api/hero/detail?heroId=130&lang=zh-TW',
  'https://camp.honorofkings.com/camp/api/item/list?lang=en',
  'https://camp.honorofkings.com/camp/api/equip/list?lang=en',
  'https://camp.honorofkings.com/camp/api/rune/list?lang=en',
  'https://camp.honorofkings.com/camp/api/arcana/list?lang=en',
  'https://camp.honorofkings.com/camp/api/hero/rank/list?lang=en',
  'https://camp.honorofkings.com/camp/api/hero/rank?lang=en',
];

async function probe(url) {
  try {
    const res = await fetch(url, { headers: { ...UA, Accept: 'application/json,*/*' } });
    const text = await res.text();
    let preview = text.slice(0, 400);
    try {
      const j = JSON.parse(text);
      const keys = Object.keys(j);
      preview = JSON.stringify({ keys, sample: JSON.stringify(j).slice(0, 350) });
    } catch {
      /* html */
    }
    console.log(`[${res.status}] ${url}\n  ${preview}\n`);
    return { url, status: res.status, ok: res.ok, len: text.length };
  } catch (e) {
    console.log(`[ERR] ${url} — ${e.message}\n`);
    return { url, error: e.message };
  }
}

async function probeH5Bundle() {
  const indexUrl = 'https://camp.honorofkings.com/h5/app/index.html?lang=en&heroId=154';
  const res = await fetch(indexUrl, { headers: UA });
  const html = await res.text();
  const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map((m) => m[1]);
  console.log('H5 scripts:', scripts);
  const base = 'https://camp.honorofkings.com/h5/app/';
  for (const s of scripts.filter((x) => x.startsWith('static/'))) {
    const jsUrl = base + s;
    const jr = await fetch(jsUrl, { headers: UA });
    const js = await jr.text();
    const apis = [...js.matchAll(/["'](\/[a-zA-Z0-9_/.-]*api[a-zA-Z0-9_/.-]*)["']/g)].map((m) => m[1]);
    const urls = [...js.matchAll(/https?:\/\/camp\.honorofkings\.com[^"'`\s]+/g)].map((m) => m[0]);
    if (apis.length || urls.length) {
      console.log('\nBundle', s, 'apis:', [...new Set(apis)].slice(0, 30));
      console.log('urls:', [...new Set(urls)].slice(0, 20));
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.includes('--bundles-only')) {
    for (const u of CANDIDATES) await probe(u);
  }
  await probeH5Bundle();
}

main().catch(console.error);
