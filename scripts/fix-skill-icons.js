/**
 * Patch skill icon URLs for all heroes (probes Tencent CDN per hero).
 */
const fs = require('fs');
const path = require('path');
const {
  discoverSkillIconUrls,
  resolveTencentAvatarUrl,
} = require('./hokstats-parse');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SLOT_ORDER = ['passive', 'skill1', 'skill2', 'ultimate'];

async function main() {
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  let fixed = 0;

  for (let i = 0; i < heroes.length; i++) {
    const h = heroes[i];
    if (!h.tencentId) continue;

    h.avatarFallback = await resolveTencentAvatarUrl(h.tencentId, h.avatar);
    const urls = await discoverSkillIconUrls(h.tencentId, h.avatarFallback, h);
    const skills = h.skills || [];
    const normalized = SLOT_ORDER.map((slot, idx) => {
      const existing = skills.find((s) => s.slot === slot) || skills[idx];
      return {
        slot,
        name: existing?.name || 'Data unavailable',
        description: existing?.description || 'Data unavailable',
        icon: urls[idx],
        cooldown: existing?.cooldown ?? null,
      };
    });

    const changed = normalized.some((s, idx) => s.icon !== skills[idx]?.icon);
    if (changed) fixed++;
    h.skills = normalized;

    if ((i + 1) % 10 === 0) {
      console.log(`  ${i + 1}/${heroes.length} (${h.name})`);
    }
    await sleep(80);
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  console.log(`Updated skill icons for ${heroes.length} heroes (${fixed} changed).`);

  const luara = heroes.find((x) => x.slug === 'luara');
  if (luara) console.log('Luara icons:', luara.skills.map((s) => s.icon));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
