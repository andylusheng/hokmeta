/**
 * Faster icon repair: skills (CDN patterns) + build fuzzy match + item URLs.
 * Re-fetches HoKStats only for heroes missing build icons.
 */
const fs = require('fs');
const path = require('path');
const {
  discoverSkillIconUrls,
  resolveItemIconUrl,
  resolveTencentAvatarUrl,
  buildItemLookup,
  parseBuildFromHtml,
  parseHeroNameSlugMap,
  buildItemEntry,
  findItemByName,
  parseBuildItemNames,
  resolveBuildFromNames,
} = require('./hokstats-parse');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const itemsPath = path.join(__dirname, '..', 'data', 'items.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0' };
const SLOT_ORDER = ['passive', 'skill1', 'skill2', 'ultimate'];

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 45000);
  const res = await fetch(url, { headers: UA, signal: ctrl.signal });
  clearTimeout(t);
  if (!res.ok) throw new Error(String(res.status));
  return res.text();
}

async function main() {
  const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  for (let i = 0; i < items.length; i += 10) {
    await Promise.all(
      items.slice(i, i + 10).map(async (it) => {
        it.icon = await resolveItemIconUrl(it.id);
      })
    );
  }
  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));
  const lookup = buildItemLookup(items);
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));

  let nameToSlug = {};
  try {
    nameToSlug = parseHeroNameSlugMap(await fetchText('https://hokstats.gg/heroes'));
  } catch (e) {
    console.warn('slug map:', e.message);
  }

  const needBuild = heroes.filter((h) =>
    (h.build || []).some((b) => !b.icon || b.name === 'Data unavailable')
  );
  console.log(`Skills: ${heroes.length}, build refetch: ${needBuild.length}`);

  for (let i = 0; i < heroes.length; i++) {
    const h = heroes[i];
    if (h.tencentId) {
      h.avatarFallback = await resolveTencentAvatarUrl(h.tencentId, h.avatar);
      const urls = await discoverSkillIconUrls(h.tencentId, h.avatarFallback, h);
      h.skills = SLOT_ORDER.map((slot, idx) => {
        const ex = (h.skills || []).find((s) => s.slot === slot) || h.skills?.[idx];
        return {
          slot,
          name: ex?.name || 'Data unavailable',
          description: ex?.description || 'Data unavailable',
          icon: urls[idx],
          cooldown: ex?.cooldown ?? null,
        };
      });
    }

    for (const b of h.build || []) {
      if (b.itemId) {
        const it = items.find((x) => x.id === String(b.itemId));
        if (it) Object.assign(b, buildItemEntry(it, b.slot));
      } else if (b.name && b.name !== 'Data unavailable') {
        const it = findItemByName(b.name, lookup);
        if (it) Object.assign(b, buildItemEntry(it, b.slot));
      }
    }

    if ((i + 1) % 25 === 0) console.log(`  skills ${i + 1}/${heroes.length}`);
  }

  for (let j = 0; j < needBuild.length; j++) {
    const h = needBuild[j];
    const hokSlug = nameToSlug[h.name] || h.slug;
    try {
      const html = await fetchText(`https://hokstats.gg/heroes/${hokSlug}/`);
      const build = parseBuildFromHtml(html, lookup);
      if (Array.isArray(build)) h.build = build;
      if (h.build.filter((b) => b.icon).length < 3) {
        const names = parseBuildItemNames(html);
        if (names.length) h.build = resolveBuildFromNames(names, lookup);
      }
    } catch (e) {
      console.warn(`  ${h.slug}: ${e.message}`);
    }
    if ((j + 1) % 10 === 0) console.log(`  builds ${j + 1}/${needBuild.length}`);
    await sleep(100);
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));

  let missingSkills = 0;
  let missingBuild = 0;
  for (const h of heroes) {
    if ((h.skills || []).some((s) => !s.icon)) missingSkills++;
    if ((h.build || []).some((b) => !b.icon)) missingBuild++;
  }
  console.log(`Done. Missing skill icons: ${missingSkills}, missing build icons: ${missingBuild}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
