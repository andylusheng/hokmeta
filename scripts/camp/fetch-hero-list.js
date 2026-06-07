/**
 * Fetch Camp hero brief list via browser (handles specialencodeparam auth).
 * Usage: node scripts/camp/fetch-hero-list.js [en|zh-TW]
 */
const fs = require('fs');
const path = require('path');

const LANG = process.argv[2] || 'en';

async function fetchHeroList(lang) {
  const playwright = require('playwright');
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: lang,
  });
  const page = await context.newPage();
  let payload = null;

  page.on('response', async (res) => {
    if (!res.url().includes('getallherobriefinfo') || res.status() !== 200) return;
    try {
      payload = await res.json();
    } catch {
      /* */
    }
  });

  await page.goto(
    `https://camp.honorofkings.com/h5/app/index.html?lang=${lang}#/hero-homepage`,
    { waitUntil: 'domcontentloaded', timeout: 45000 }
  );
  await page.waitForTimeout(2500);
  try {
    const accept = page.getByRole('button', { name: /accept/i });
    if (await accept.isVisible({ timeout: 1500 })) await accept.click();
  } catch {
    /* */
  }
  try {
    const btn = page.getByText(/all heroes|全部英雄|所有英雄/i);
    await btn.waitFor({ state: 'visible', timeout: 12000 });
    await btn.click();
    await page.waitForTimeout(4000);
  } catch (e) {
    console.warn('All heroes button:', e.message);
    await page.waitForTimeout(5000);
  }

  await browser.close();
  return payload;
}

async function main() {
  console.log(`Fetching getallherobriefinfo (${LANG})...`);
  const data = await fetchHeroList(LANG);
  if (!data?.data?.heroList?.length) {
    console.error('No heroList in response', data?.code, data?.msg);
    process.exit(1);
  }
  const out = path.join(__dirname, `_hero-list-${LANG}.json`);
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log(`Wrote ${data.data.heroList.length} heroes -> ${out}`);
  console.log('Sample:', JSON.stringify(data.data.heroList[0], null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
