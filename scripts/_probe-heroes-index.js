function parseItemList(html) {
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      const j = JSON.parse(m[1]);
      const list = j.mainEntity?.itemListElement;
      if (list?.length > 50) return list;
    } catch {
      /* skip */
    }
  }
  return null;
}

async function main() {
  const r = await fetch('https://hokstats.gg/heroes', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const html = await r.text();
  const list = parseItemList(html);
  console.log('heroes in index', list?.length);
  const links = [...html.matchAll(/href="\/heroes\/([a-z0-9'-]+)\/?"/g)].map(
    (m) => m[1]
  );
  console.log('hero links', [...new Set(links)].length);
  const map = {};
  const re =
    /href="\/heroes\/([a-z0-9'-]+)\/?"[^>]*>[\s\S]{0,300}?alt="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) map[m[2]] = m[1];
  console.log('name->slug', Object.keys(map).length);
  console.log('Arthur', map.Arthur);
  console.log('Lian Po', map['Lian Po']);
}

main().catch(console.error);
