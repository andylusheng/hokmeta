/**
 * Full repair: skill icons (CDN probe), item catalog icons, hero builds (HoKStats re-parse).
 */
const fs = require('fs');
const path = require('path');
const {
  discoverSkillIconUrls,
  resolveItemIconUrl,
  buildItemLookup,
  parseBuildFromHtml,
  parseSkills,
  parseHeroNameSlugMap,
  buildItemEntry,
  findItemByName,
  parseBuildItemNames,
  resolveBuildFromNames,
} = require('./hokstats-parse');

const root = path.join(__dirname, '..');
const heroesPath = path.join(root, 'data', 'heroes.json');
const itemsPath = path.join(root, 'data', 'items.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-fix/1.0)' };
const SLOT_ORDER = ['passive', 'skill1', 'skill2', 'ultimate'];

async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 60000);
      const res = await fetch(url, { headers: UA, signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(String(res.status));
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1500 * (i + 1));
    }
  }
}

function needsBuildFix(hero) {
  return (hero.build || []).some(
    (b) => !b.icon || b.name === 'Data unavailable' || !b.itemId
  );
}

async function main() {
  const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  console.log('Resolving item catalog icons...');
  for (const it of items) {
    it.icon = await resolveItemIconUrl(it.id);
  }
  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));

  const lookup = buildItemLookup(items);
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));

  let nameToSlug = {};
  try {
    const indexHtml = await fetchText('https://hokstats.gg/heroes');
    nameToSlug = parseHeroNameSlugMap(indexHtml);
  } catch (e) {
    console.warn('Hero slug map:', e.message);
  }

  let skillFixed = 0;
  let buildFixed = 0;

  for (let i = 0; i < heroes.length; i++) {
    const h = heroes[i];
    const avatar =
      h.avatarFallback ||
      (h.tencentId
        ? `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.tencentId}/${h.tencentId}.jpg`
        : h.avatar);

    if (h.tencentId) {
      const urls = await discoverSkillIconUrls(h.tencentId, avatar);
      const existing = h.skills || [];
      h.skills = SLOT_ORDER.map((slot, idx) => {
        const ex = existing.find((s) => s.slot === slot) || existing[idx];
        return {
          slot,
          name: ex?.name || 'Data unavailable',
          description: ex?.description || 'Data unavailable',
          icon: urls[idx],
          cooldown: ex?.cooldown ?? null,
        };
      });
      skillFixed++;
    }

    const fixBuild = needsBuildFix(h);
    if (fixBuild) {
      const hokSlug = nameToSlug[h.name] || h.slug;
      try {
        const html = await fetchText(`https://hokstats.gg/heroes/${hokSlug}/`);
        const parsed = parseSkills(html).slice(0, 4);
        if (parsed.length) {
          h.skills = SLOT_ORDER.map((slot, idx) => {
            const p = parsed.find((s) => s.slot === slot) || parsed[idx];
            return {
              ...h.skills[idx],
              name: p?.name || h.skills[idx]?.name,
              description: p?.description || h.skills[idx]?.description,
            };
          });
        }
        const build = await parseBuildFromHtml(html, lookup);
        if (build.filter((b) => b.icon).length >= 1) {
          h.build = build;
          buildFixed++;
        } else {
          const names = parseBuildItemNames(html);
          if (names.length) h.build = resolveBuildFromNames(names, lookup);
        }
      } catch (e) {
        console.warn(`  build ${h.slug}: ${e.message}`);
        for (const b of h.build || []) {
          if (!b.icon && b.name && b.name !== 'Data unavailable') {
            const it = findItemByName(b.name, lookup);
            if (it) Object.assign(b, buildItemEntry(it, b.slot));
          }
        }
      }
      await sleep(120);
    } else {
      for (const b of h.build || []) {
        if (b.itemId) {
          const it = items.find((x) => x.id === String(b.itemId));
          if (it) Object.assign(b, buildItemEntry(it, b.slot));
        } else if (b.name && b.name !== 'Data unavailable') {
          const it = findItemByName(b.name, lookup);
          if (it) Object.assign(b, buildItemEntry(it, b.slot));
        }
      }
    }

    if ((i + 1) % 15 === 0) {
      console.log(`  ${i + 1}/${heroes.length}`);
    }
    if (!fixBuild) await sleep(40);
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  console.log(
    `Done. Skills refreshed: ${skillFixed}. Builds improved: ${buildFixed}. Items: ${items.length}.`
  );

  const luara = heroes.find((x) => x.slug === 'luara');
  const ata = heroes.find((x) => x.slug === 'ata');
  const garo = heroes.find((x) => x.slug === 'garo');
  console.log('Luara skills:', luara?.skills?.map((s) => s.icon));
  console.log('Ata skills:', ata?.skills?.map((s) => s.icon));
  console.log('Garo build icons:', garo?.build?.map((b) => b.icon).filter(Boolean).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
