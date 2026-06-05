async function main() {
  const html = await (
    await fetch('https://hokstats.gg/items', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
  ).text();

  const re =
    /href="\/items\/(\d+)\/?"[^>]*>[\s\S]{0,250}?alt="([^"]+)"/g;
  const items = [];
  let m;
  while ((m = re.exec(html))) {
    items.push({ id: m[1], name: m[2] });
  }
  console.log('parsed from cards', items.length);
  console.log(items.slice(0, 5));
  console.log(items.slice(-3));
}

main();
