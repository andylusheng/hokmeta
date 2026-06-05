/**
 * Audit skill + build item icon URLs for all heroes.
 */
const fs = require('fs');
const path = require('path');
const { discoverSkillIconUrls, tencentItemIcon } = require('./hokstats-parse');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const itemsPath = path.join(__dirname, '..', 'data', 'items.json');
const UA = { 'User-Agent': 'Mozilla/5.0' };

async function urlOk(url) {
  if (!url) return false;
  try {
    const r = await fetch(url, { method: 'HEAD', headers: UA });
    if (r.ok) return true;
    const r2 = await fetch(url, {
      method: 'GET',
      headers: { ...UA, Range: 'bytes=0-32' },
    });
    return r2.ok;
  } catch {
    return false;
  }
}

async function main() {
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

  let badSkills = 0;
  let badBuild = 0;
  const skillFails = [];
  const buildFails = [];

  for (const h of heroes) {
    for (const s of h.skills || []) {
      if (!(await urlOk(s.icon))) {
        badSkills++;
        skillFails.push({ slug: h.slug, slot: s.slot, icon: s.icon });
      }
    }
    for (const b of h.build || []) {
      if (b.icon && !(await urlOk(b.icon))) {
        badBuild++;
        buildFails.push({
          slug: h.slug,
          slot: b.slot,
          name: b.name,
          icon: b.icon,
          itemId: b.itemId,
        });
      }
    }
  }

  let badItems = 0;
  for (const it of items) {
    if (!(await urlOk(it.icon))) badItems++;
  }

  console.log(
    JSON.stringify(
      {
        heroes: heroes.length,
        badSkillIcons: badSkills,
        badBuildIcons: badBuild,
        badItemCatalog: badItems,
        skillFails: skillFails.slice(0, 15),
        buildFails: buildFails.slice(0, 15),
      },
      null,
      2
    )
  );
}

main().catch(console.error);
