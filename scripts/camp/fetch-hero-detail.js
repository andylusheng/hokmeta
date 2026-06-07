/**
 * Probe getherodataall response for one hero.
 * Usage: node scripts/camp/fetch-hero-detail.js 154 zh-TW
 */
const fs = require('fs');
const path = require('path');

const HERO_ID = Number(process.argv[2] || 154);
const LANG = process.argv[3] || 'zh-TW';

async function main() {
  const playwright = require('playwright');
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: LANG,
  });
  const page = await context.newPage();
  let payload = null;

  page.on('response', async (res) => {
    if (!res.url().includes('getherodataall') || res.status() !== 200) return;
    try {
      payload = await res.json();
    } catch {
      /* */
    }
  });

  await page.goto(
    `https://camp.honorofkings.com/h5/app/index.html?lang=${LANG}#/hero-detail?heroId=${HERO_ID}`,
    { waitUntil: 'domcontentloaded', timeout: 45000 }
  );
  await page.waitForTimeout(6000);
  await browser.close();

  const out = path.join(__dirname, `_hero-detail-${HERO_ID}-${LANG}.json`);
  fs.writeFileSync(out, JSON.stringify(payload, null, 2).slice(0, 500000));
  console.log('Wrote', out);
  if (payload?.data) {
    console.log('Top keys:', Object.keys(payload.data));
    const hd = payload.data.heroData || payload.data;
    console.log('heroData keys:', Object.keys(hd));
  }
}

main().catch(console.error);
