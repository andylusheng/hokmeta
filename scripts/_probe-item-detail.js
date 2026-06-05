async function main() {
  const r = await fetch('https://hokstats.gg/items/1137/', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const html = await r.text();
  console.log('len', html.length);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of ld) {
    try {
      const j = JSON.parse(m[1]);
      console.log(JSON.stringify(j, null, 2).slice(0, 1500));
    } catch {
      console.log('parse fail', m[1].slice(0, 200));
    }
  }
}

main().catch(console.error);
