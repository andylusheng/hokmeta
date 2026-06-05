const fs = require('fs');

async function main() {
  const html = await (
    await fetch('https://hokstats.gg/heroes/ata/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
  ).text();

  const yx = [...html.matchAll(/https?:\/\/[^"'\s]*yxzj[^"'\s]*\.(?:png|jpg)/g)].map(
    (m) => m[0]
  );
  console.log('yxzj urls', [...new Set(yx)].slice(0, 20));

  const icons = [...html.matchAll(/heroes-icons\/[^"'\s]+\.(png|webp)/g)].map(
    (m) => m[0]
  );
  console.log('local icons', [...new Set(icons)].slice(0, 10));

  const skillBlock = html.match(/id="skills"[\s\S]{0,6000}/i);
  if (skillBlock) {
    const imgs = [...skillBlock[0].matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
    console.log('skills section imgs', imgs);
  }
}

main();
