async function fetchHtml(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  return r.text();
}

function parseSkills(html) {
  const re =
    /<span class="text-\[11px\][^>]*>(passive|skill1|skill2|ultimate)<\/span>\s*<span class="text-sm font-bold">([^<]+)<\/span>\s*<\/div>\s*<p class="text-\[13px\][^>]*>([^<]+)<\/p>/g;
  const skills = [];
  let m;
  while ((m = re.exec(html))) {
    skills.push({ slot: m[1], name: m[2], description: m[3] });
  }
  return skills;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function main() {
  const itemsHtml = await fetchHtml('https://hokstats.gg/items');
  console.log('items html len', itemsHtml.length);
  const itemLinks = [
    ...itemsHtml.matchAll(/href="\/items\/([a-z0-9-]+)\/?"/g),
  ].map((m) => m[1]);
  console.log('item links unique', [...new Set(itemLinks)].length);
  console.log('sample', [...new Set(itemLinks)].slice(0, 8));

  const itemHtml = await fetchHtml('https://hokstats.gg/items/boots-of-fortitude');
  console.log('item page len', itemHtml.length);
  const title = itemHtml.match(/<h1[^>]*>([^<]+)</);
  console.log('title', title?.[1]);
  const desc = itemHtml.match(/text-\[13px\][^>]*>([^<]{20,})</);
  console.log('desc sample', desc?.[1]?.slice(0, 120));
}

main().catch(console.error);
