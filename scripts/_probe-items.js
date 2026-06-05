const fs = require('fs');

async function main() {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 60000);
  let html;
  try {
    const r = await fetch('https://hokstats.gg/items', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal,
    });
    html = await r.text();
  } finally {
    clearTimeout(t);
  }

  fs.writeFileSync('_items-sample.html', html.slice(0, 50000));
  console.log('len', html.length);

  // item cards: href="/items/1351" ... name nearby
  const re =
    /href="\/items\/(\d+)\/?"[^>]*>[\s\S]{0,400}?<(?:h2|h3|span)[^>]*>([^<]{2,60})</g;
  const items = [];
  let m;
  while ((m = re.exec(html))) {
    items.push({ id: m[1], name: m[2].trim() });
  }
  console.log('parsed items', items.length);
  console.log(items.slice(0, 10));

  // alt: JSON embedded
  const jsonLike = html.match(/"items":\s*\[/);
  console.log('has items json', !!jsonLike);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
