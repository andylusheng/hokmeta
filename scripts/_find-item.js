const fs = require('fs');
const { parseItemListFromHtml } = require('./hokstats-parse');

async function main() {
  const html = await (
    await fetch('https://hokstats.gg/items', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
  ).text();
  const list = parseItemListFromHtml(html);
  for (const q of ['siege', 'longevity', 'wisdom', 'dominator', 'sunpool', 'sun']) {
    console.log(
      q,
      list.filter((i) => i.name.toLowerCase().includes(q)).map((i) => `${i.id} ${i.name}`)
    );
  }
}

main();
