/**
 * Intercept Camp H5 network calls to discover real API URLs, methods, and bodies.
 * Run: npx playwright install chromium && node scripts/camp/probe-playwright.js
 */
const fs = require('fs');
const path = require('path');

async function main() {
  let playwright;
  try {
    playwright = require('playwright');
  } catch {
    console.error('Install playwright: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }

  const captured = [];
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'zh-TW',
  });

  const page = await context.newPage();
  page.on('request', (req) => {
    const url = req.url();
    if (!/\/api\//.test(url)) return;
    if (!/hero|equip|item|rune|skill|wiki|ming|spell|build|counter|arcana|adjust/i.test(url))
      return;
    captured.push({
      method: req.method(),
      url,
      postData: req.postData() || null,
      headers: req.headers(),
    });
  });

  page.on('response', async (res) => {
    const url = res.url();
    if (!/getallherobriefinfo|getherodataall|getherodetail|getheroskill|getheroequip|hero/i.test(url))
      return;
    if (res.status() !== 200) return;
    try {
      const json = await res.json();
      const out = path.join(__dirname, '_probe-response.json');
      const existing = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
      existing[url] = json;
      fs.writeFileSync(out, JSON.stringify(existing, null, 2).slice(0, 200000));
      console.log('Saved response:', url.slice(0, 120));
    } catch {
      /* */
    }
  });

  console.log('Loading hero homepage (zh-TW)...');
  await page.goto(
    'https://camp.honorofkings.com/h5/app/index.html?lang=zh-TW#/hero-homepage',
    { waitUntil: 'domcontentloaded', timeout: 30000 }
  );
  await page.waitForTimeout(3000);
  try {
    const accept = page.getByRole('button', { name: /accept/i });
    if (await accept.isVisible({ timeout: 2000 })) await accept.click();
  } catch {
    /* */
  }
  try {
    const allHeroes = page.getByText(/all heroes|全部英雄|所有英雄/i);
    await allHeroes.waitFor({ state: 'visible', timeout: 10000 });
    await allHeroes.click();
    await page.waitForTimeout(3000);
  } catch (e) {
    console.log('All heroes click failed:', e.message);
  }

  console.log('Loading hero detail (Mulan 154)...');
  await page.goto(
    'https://camp.honorofkings.com/h5/app/index.html?lang=zh-TW#/hero-detail?heroId=154',
    { waitUntil: 'domcontentloaded', timeout: 30000 }
  );
  await page.waitForTimeout(5000);

  const outPath = path.join(__dirname, '_probe-requests.json');
  fs.writeFileSync(outPath, JSON.stringify(captured, null, 2));
  console.log(`Captured ${captured.length} API requests -> ${outPath}`);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
