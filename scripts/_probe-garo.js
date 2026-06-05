const fs = require('fs');

async function main() {
  const html = await (
    await fetch('https://hokstats.gg/heroes/garo/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
  ).text();
  fs.writeFileSync('_garo-snippet.txt', html.slice(0, 80000));

  const pick = html.match(/Pick Garo when[\s\S]{0,2500}/i);
  const avoid = html.match(/Avoid Garo when[\s\S]{0,2500}/i);
  console.log('pick block len', pick?.[0]?.length);
  console.log('avoid block len', avoid?.[0]?.length);

  const heroLinks = [...html.matchAll(/href="\/heroes\/([a-z0-9'-]+)\/?"[^>]*>[\s\S]{0,120}?>([^<]{2,40})</g)];
  console.log('hero links sample', heroLinks.slice(0, 8).map((m) => [m[1], m[2]]));

  const counterSection = html.match(/counter data[\s\S]{0,4000}/i);
  console.log('counter section', counterSection?.[0]?.slice(0, 500));
}

main().catch(console.error);
