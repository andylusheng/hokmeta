/**
 * Re-enrich all heroes from HoKStats.gg (skills, build, arcana, spells, counters, icons).
 * Updates tips / patchHistory / faqs from current hero fields.
 */
const fs = require('fs');
const path = require('path');
const {
  parseSkills,
  parseBuildFromHtml,
  parseArcana,
  parseSpells,
  parseCounters,
  parseHeroNameSlugMap,
  discoverSkillIconUrls,
  resolveTencentAvatarUrl,
  buildItemLookup,
} = require('./hokstats-parse');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const itemsPath = path.join(__dirname, '..', 'data', 'items.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-repair/1.0)' };
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
      await sleep(1200 * (i + 1));
    }
  }
}

function fill3(value) {
  return [value, value, value];
}

function isBadCounterName(n) {
  if (!n || n === 'Data unavailable') return true;
  return n.length > 30 || /[.!?]/.test(n) || /\b(lane|farm|team|match)\b/i.test(n);
}

function needsRepair(h) {
  const buildOk = (h.build || []).filter((b) => b.name !== 'Data unavailable' && b.icon).length;
  const badCounters = [...(h.counters || []), ...(h.counteredBy || [])].some(isBadCounterName);
  const noArcana = !(h.arcana || []).length;
  return buildOk < 4 || badCounters || noArcana;
}

function faqs(hero, buildNames) {
  const wrs =
    hero.winRate != null ? `${hero.winRate}% win rate` : 'Data unavailable win rate';
  const prs =
    hero.pickRate != null ? `${hero.pickRate}% pick rate` : 'Data unavailable pick rate';
  const brs =
    hero.banRate != null ? `${hero.banRate}% ban rate` : 'Data unavailable ban rate';
  return [
    {
      id: 'faq-good-season',
      question: `Is ${hero.name} good in current season?`,
      answer: `${hero.name} is Tier ${hero.tier} ${hero.role} with ${wrs}, ${prs}, and ${brs} on the international server (Camp HOK).`,
    },
    {
      id: 'faq-best-build',
      question: `What is the best ${hero.name} build?`,
      answer: `Recommended item path: ${buildNames.join(', ') || 'Data unavailable'}. Spells and Arcana are listed on this page.`,
    },
    {
      id: 'faq-counter',
      question: `How to counter ${hero.name}?`,
      answer: `Strong picks into ${hero.name}: ${hero.counteredBy.join(', ')}. ${hero.name} is strong into ${hero.counters.join(', ')}.`,
    },
  ];
}

function refreshDerived(hero) {
  const buildNames = hero.build.map((b) => b.name);
  hero.tips = [
    `${hero.name} (${hero.role}): Tier ${hero.tier} on international ranked — ${hero.winRate != null ? hero.winRate + '% WR' : 'WR unavailable'}.`,
    hero.lane ? `Primary lane: ${hero.lane}.` : 'Lane data unavailable.',
    `Build core: ${buildNames.filter((n) => n !== 'Data unavailable').slice(0, 3).join(', ') || 'Data unavailable'}.`,
  ];
  const wrText = hero.winRate != null ? `${hero.winRate}%` : 'Data unavailable';
  const prText = hero.pickRate != null ? `${hero.pickRate}%` : 'Data unavailable';
  const brText = hero.banRate != null ? `${hero.banRate}%` : 'Data unavailable';
  hero.patchHistory = [
    {
      version: 'Live meta',
      change: `Camp HOK — WR ${wrText}, pick ${prText}, ban ${brText}, popularity tier ${hero.tier}.`,
    },
    {
      version: 'Matchups',
      change: `Counters ${hero.counters.join(', ')} · Weak into ${hero.counteredBy.join(', ')}.`,
    },
  ];
  hero.faqs = faqs(hero, buildNames);
  hero.metaAnalysis = [
    hero.winRate != null
      ? `${hero.name} win rate ${hero.winRate}% (Camp HOK, ${hero.dataUpdated}).`
      : `${hero.name} win rate: Data unavailable.`,
    hero.pickRate != null ? `Pick rate ${hero.pickRate}% in global ranked.` : 'Pick rate: Data unavailable.',
    hero.banRate != null ? `Ban rate ${hero.banRate}%.` : 'Ban rate: Data unavailable.',
    `Counters: ${hero.counters.join(', ')}. Countered by: ${hero.counteredBy.join(', ')}.`,
  ];
  hero.dataUpdated = new Date().toISOString().slice(0, 10);
}

async function enrichHero(hero, hokSlug, lookup) {
  const html = await fetchText(`https://hokstats.gg/heroes/${hokSlug}/`);

  const parsedSkills = parseSkills(html).slice(0, 4);
  if (hero.tencentId) {
    hero.avatarFallback = await resolveTencentAvatarUrl(hero.tencentId, hero.avatar);
    const urls = await discoverSkillIconUrls(hero.tencentId, hero.avatarFallback, hero);
    hero.skills = SLOT_ORDER.map((slot, idx) => {
      const parsed = parsedSkills.find((s) => s.slot === slot) || parsedSkills[idx];
      return {
        slot,
        name: parsed?.name || 'Data unavailable',
        description: parsed?.description || 'Data unavailable',
        icon: urls[idx],
        cooldown: null,
      };
    });
  }

  const build = parseBuildFromHtml(html, lookup);
  if (build.filter((b) => b.icon).length >= 4) hero.build = build;

  const arc = parseArcana(html);
  if (arc.length) hero.arcana = arc;

  const sp = parseSpells(html);
  if (sp.length) hero.spells = sp;

  const { counters, counteredBy } = parseCounters(html, hero.name);
  hero.counters = counters.length ? counters : fill3('Data unavailable');
  hero.counteredBy = counteredBy.length ? counteredBy : fill3('Data unavailable');

  refreshDerived(hero);
}

async function main() {
  const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const lookup = buildItemLookup(items);
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));

  let nameToSlug = {};
  try {
    nameToSlug = parseHeroNameSlugMap(await fetchText('https://hokstats.gg/heroes'));
  } catch (e) {
    console.warn('slug map:', e.message);
  }

  const onlyMissing = process.argv.includes('--missing-only');
  const targets = onlyMissing ? heroes.filter(needsRepair) : heroes;
  console.log(`Repairing ${targets.length}/${heroes.length} heroes...`);

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < targets.length; i++) {
    const h = targets[i];
    const hokSlug = nameToSlug[h.name] || h.slug;
    try {
      await enrichHero(h, hokSlug, lookup);
      ok++;
      if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${targets.length} (${h.name})`);
    } catch (e) {
      fail++;
      console.warn(`  ${h.slug}: ${e.message}`);
      refreshDerived(h);
    }
    await sleep(200);
  }

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));

  let noBuild = 0;
  let noArcana = 0;
  let badCounters = 0;
  for (const h of heroes) {
    if ((h.build || []).filter((b) => b.icon).length < 4) noBuild++;
    if (!(h.arcana || []).length) noArcana++;
    if ([...(h.counters || []), ...(h.counteredBy || [])].some(isBadCounterName)) badCounters++;
  }

  console.log(`Done. ok=${ok} fail=${fail}`);
  console.log(`Remaining — no build: ${noBuild}, no arcana: ${noArcana}, bad counters: ${badCounters}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
