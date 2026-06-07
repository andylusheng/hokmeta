/**
 * Camp HOK browser client — APIs require specialencodeparam from real browser session.
 */
const path = require('path');

async function launchBrowser(lang = 'en') {
  const playwright = require('playwright');
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: lang,
  });
  return { browser, context };
}

async function dismissCookies(page) {
  try {
    const accept = page.getByRole('button', { name: /accept/i });
    if (await accept.isVisible({ timeout: 1500 })) await accept.click();
  } catch {
    /* */
  }
}

async function fetchHeroBriefList(context, lang) {
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
  await page.waitForTimeout(2000);
  await dismissCookies(page);
  try {
    const btn = page.getByText(/all heroes|全部英雄|所有英雄/i);
    await btn.waitFor({ state: 'visible', timeout: 12000 });
    await btn.click();
    await page.waitForTimeout(3500);
  } catch {
    await page.waitForTimeout(4000);
  }
  await page.close();
  return payload?.data?.heroList || [];
}

async function fetchHeroDetail(context, heroId, lang) {
  const page = await context.newPage();
  let payload = null;

  page.on('response', async (res) => {
    if (!res.url().includes('getherodataall') || res.status() !== 200) return;
    try {
      const json = await res.json();
      if (json?.data?.baseInfo?.heroInfo?.heroId === heroId) payload = json;
    } catch {
      /* */
    }
  });

  await page.goto(
    `https://camp.honorofkings.com/h5/app/index.html?lang=${lang}#/hero-detail?heroId=${heroId}`,
    { waitUntil: 'domcontentloaded', timeout: 45000 }
  );
  await page.waitForTimeout(4500);
  await page.close();
  return payload;
}

async function fetchHeroBriefLists(langs = ['en', 'zh-TW']) {
  const { browser, context } = await launchBrowser('en');
  const result = {};
  try {
    for (const lang of langs) {
      console.log(`  Camp hero list (${lang})...`);
      result[lang] = await fetchHeroBriefList(context, lang);
      console.log(`    ${result[lang].length} heroes`);
    }
  } finally {
    await browser.close();
  }
  return result;
}

async function fetchHeroDetailsBatch(heroIds, lang = 'en', concurrency = 4) {
  const { browser, context } = await launchBrowser(lang);
  const results = new Map();
  const queue = [...heroIds];

  async function worker() {
    while (queue.length) {
      const id = queue.shift();
      try {
        const payload = await fetchHeroDetail(context, id, lang);
        if (payload) results.set(id, payload);
        else console.warn(`  hero ${id}: no getherodataall response`);
      } catch (e) {
        console.warn(`  hero ${id}: ${e.message}`);
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, heroIds.length) }, () =>
    worker()
  );
  await Promise.all(workers);
  await browser.close();
  return results;
}

/** Fetch EN + zh-TW getherodataall for the same hero IDs. */
async function fetchHeroDetailsBilingual(heroIds, concurrency = 3) {
  console.log(`  Camp details (en) × ${heroIds.length}...`);
  const en = await fetchHeroDetailsBatch(heroIds, 'en', concurrency);
  console.log(`  Camp details (zh-TW) × ${heroIds.length}...`);
  const zh = await fetchHeroDetailsBatch(heroIds, 'zh-TW', concurrency);
  return { en, zh };
}

module.exports = {
  fetchHeroBriefLists,
  fetchHeroDetailsBatch,
  fetchHeroDetailsBilingual,
  fetchHeroBriefList,
  fetchHeroDetail,
  launchBrowser,
};
