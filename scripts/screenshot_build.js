const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  // Try a few heroes to see if any have vertical text
  const heroes = ['marco-polo', 'aoyin', 'lian-po', 'angela'];
  
  for (const slug of heroes) {
    const url = `http://localhost:3001/zh-TW/hero/${slug}/`;
    console.log(`\nChecking ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForSelector('#build', { timeout: 5000 });
      
      // Screenshot the build section
      const buildSection = await page.$('#build');
      if (buildSection) {
        await buildSection.screenshot({ path: `build-${slug}.png` });
        console.log(`  Screenshot saved: build-${slug}.png`);
      }
      
      // Check for any vertical text or layout issues
      const buildText = await page.$eval('#build', el => {
        const tables = el.querySelectorAll('table');
        const rows = el.querySelectorAll('tr');
        return {
          tableCount: tables.length,
          rowCount: rows.length,
          // Check if any text content has unusual layout
          html: el.innerHTML.substring(0, 500)
        };
      }).catch(() => ({}));
      console.log(`  Build section info:`, JSON.stringify(buildText, null, 2).substring(0, 300));
      
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }
  
  await browser.close();
  console.log('\nDone!');
})();
