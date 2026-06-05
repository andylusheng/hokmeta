/**
 * Honor of Kings Global roster sync.
 * Heroes/stats: Camp HOK export (hok-meta-analyzer).
 * English skills, builds, items, counters: HoKStats.gg (camp-sourced intl reference).
 * Icons: Tencent CDN (game.gtimg.cn).
 */
const fs = require('fs');
const path = require('path');
const {
  parseItemListFromHtml,
  parseItemDetail,
  parseSkills,
  parseBuildItemSlugs,
  parseArcana,
  parseSpells,
  parseCounters,
  parseHeroNameSlugMap,
  itemNameToSlug,
  discoverSkillIcons,
  resolveTencentAvatarUrl,
  parseBuildFromHtml,
  buildItemLookup,
  tencentItemIcon,
} = require('./hokstats-parse');

const CAMP_EXPORT_URL =
  'https://raw.githubusercontent.com/lnsdeep/hok-meta-analyzer/main/heroes.json';
const HOKSTATS_HEROES = 'https://hokstats.gg/heroes';
const HOKSTATS_ITEMS = 'https://hokstats.gg/items';
const HOKSTATS_HERO = (slug) => `https://hokstats.gg/heroes/${slug}/`;
const HOKSTATS_ITEM = (id) => `https://hokstats.gg/items/${id}/`;
const TENCENT_AVATAR = (id) =>
  `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}.jpg`;

const root = path.join(__dirname, '..');
const heroesPath = path.join(root, 'data', 'heroes.json');
const itemsPath = path.join(root, 'data', 'items.json');
const keywordsPath = path.join(root, 'data', 'keywords.json');
const mapPath = path.join(root, 'data', 'hero-id-map.json');
const patchesPath = path.join(root, 'data', 'patches.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-sync/1.0)' };

async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 45000);
      const res = await fetch(url, { headers: UA, signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(800 * (i + 1));
    }
  }
}

function parsePercent(str) {
  if (!str || typeof str !== 'string') return null;
  const n = parseFloat(str.replace('%', '').trim());
  return Number.isFinite(n) ? n : null;
}

function popularityToTier(pop) {
  const m = { S: 'S+', A: 'S', B: 'A', C: 'B', D: 'C' };
  return m[pop] ?? 'B';
}

const ROLE_MAP = {
  Fighter: 'Warrior',
  Tank: 'Tank',
  Mage: 'Mage',
  Marksman: 'Marksman',
  Assassin: 'Assassin',
  Support: 'Support',
};

function primaryRole(rolesStr) {
  const parts = rolesStr.split(',').map((s) => s.trim());
  const order = ['Tank', 'Support', 'Assassin', 'Mage', 'Marksman', 'Fighter'];
  for (const o of order) {
    if (parts.includes(o)) return ROLE_MAP[o] || 'Warrior';
  }
  return ROLE_MAP[parts[0]] || 'Warrior';
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-|-$/g, '');
}

function difficultyDefault(role) {
  if (role === 'Support' || role === 'Tank') return 'Easy';
  if (role === 'Assassin' || role === 'Mage') return 'Medium';
  return 'Medium';
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

async function syncItems() {
  console.log('Fetching HoKStats item index...');
  const html = await fetchText(HOKSTATS_ITEMS);
  const list = parseItemListFromHtml(html);
  console.log(`Found ${list.length} items. Fetching details...`);

  const items = [];
  const slugToId = {};
  const nameToId = {};

  for (let i = 0; i < list.length; i++) {
    const { id, name } = list[i];
    if (!id) continue;
    try {
      const detailHtml = await fetchText(HOKSTATS_ITEM(id));
      const row = await parseItemDetail(detailHtml, id);
      row.name = row.name || name;
      row.slug = itemNameToSlug(row.name);
      row.description = row.description || 'Data unavailable';
      items.push(row);
      slugToId[row.slug] = id;
      nameToId[row.name.toLowerCase()] = id;
    } catch (e) {
      console.warn(`  item ${id} (${name}): ${e.message}`);
      items.push({
        id: String(id),
        slug: itemNameToSlug(name),
        name,
        description: 'Data unavailable',
        gold: null,
        type: null,
        icon: tencentItemIcon(id),
      });
      slugToId[itemNameToSlug(name)] = id;
      nameToId[name.toLowerCase()] = id;
    }
    if ((i + 1) % 20 === 0) console.log(`  items ${i + 1}/${list.length}`);
    await sleep(120);
  }

  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} items → ${itemsPath}`);
  return { items, slugToId, nameToId };
}

function resolveBuild(slugs, itemsBySlug) {
  const build = [];
  slugs.slice(0, 6).forEach((slug, i) => {
    let item = itemsBySlug[slug];
    if (!item) {
      item = Object.values(itemsBySlug).find((it) => {
        const s = itemNameToSlug(it.name);
        return (
          s === slug ||
          s.includes(slug) ||
          slug.includes(s) ||
          s.replace(/s-virtue$/, '').includes(slug)
        );
      });
    }
    build.push({
      slot: i + 1,
      itemId: item?.id || null,
      name: item?.name || slug.replace(/-/g, ' '),
      icon: item?.icon || null,
      description: item?.description || null,
    });
  });
  while (build.length < 6) {
    build.push({
      slot: build.length + 1,
      itemId: null,
      name: 'Data unavailable',
      icon: null,
      description: null,
    });
  }
  return build;
}

async function main() {
  const itemsOnly = process.argv.includes('--items-only');
  const heroesOnly = process.argv.includes('--heroes-only');
  const skipItems = process.argv.includes('--skip-items') || heroesOnly;
  const skipHeroEnrich = process.argv.includes('--skip-enrich');

  if (itemsOnly) {
    await syncItems();
    return;
  }

  let itemsBySlug = {};
  let itemLookup = buildItemLookup([]);
  if (!skipItems) {
    const { items } = await syncItems();
    for (const it of items) itemsBySlug[it.slug] = it;
    itemLookup = buildItemLookup(items);
  } else if (fs.existsSync(itemsPath)) {
    const cached = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
    for (const it of cached) itemsBySlug[it.slug] = it;
    itemLookup = buildItemLookup(cached);
    console.log(`Loaded ${cached.length} items from cache`);
  }

  console.log('Fetching Camp HOK hero export...');
  const campRes = await fetch(CAMP_EXPORT_URL);
  if (!campRes.ok) throw new Error(`Camp export failed: ${campRes.status}`);
  const campList = await campRes.json();

  let nameToHokSlug = {};
  try {
    console.log('Fetching HoKStats hero index (slug map)...');
    const heroesHtml = await fetchText(HOKSTATS_HEROES);
    nameToHokSlug = parseHeroNameSlugMap(heroesHtml);
    console.log(`Mapped ${Object.keys(nameToHokSlug).length} hero slugs`);
  } catch (e) {
    console.warn('HoKStats hero index failed, using slugify fallback:', e.message);
  }

  const heroes = [];
  const idMap = {};
  const usedSlugs = new Set();

  for (const row of campList) {
    const name = row.chinese_hero_name;
    const tencentId = row.id;
    let slug = nameToHokSlug[name] || slugify(name);
    if (usedSlugs.has(slug)) slug = `${slug}-${tencentId}`;
    usedSlugs.add(slug);

    const role = primaryRole(row.roles || '');
    const wr = parsePercent(row.win_rate);
    const pr = parsePercent(row.pick_rate);
    const br = parsePercent(row.ban_rate);
    const tier = popularityToTier(row.popularity);

    const hero = {
      id: slug,
      slug,
      name,
      role,
      roles: row.roles,
      lane: row.recommended_lane || null,
      difficulty: difficultyDefault(role),
      tier,
      winRate: wr,
      pickRate: pr,
      banRate: br,
      rank: null,
      avatar: row.image_url?.startsWith('http')
        ? row.image_url
        : TENCENT_AVATAR(tencentId),
      avatarFallback: TENCENT_AVATAR(tencentId), // patched below after probe
      tencentId,
      dataSource: 'Camp HOK + HoKStats.gg (intl)',
      dataUpdated: new Date().toISOString().slice(0, 10),
      skills: [],
      build: [],
      arcana: [],
      spells: ['Flash', 'Execute'],
      counters: ['Data unavailable', 'Data unavailable', 'Data unavailable'],
      counteredBy: ['Data unavailable', 'Data unavailable', 'Data unavailable'],
      tips: [],
      patchHistory: [],
      faqs: [],
      metaAnalysis: [],
    };

    hero.avatarFallback = await resolveTencentAvatarUrl(tencentId, hero.avatar);
    idMap[slug] = { campName: name, tencentId };

    if (!skipHeroEnrich) {
      const hokSlug = nameToHokSlug[name] || slug;
      try {
        const html = await fetchText(HOKSTATS_HERO(hokSlug));
        const parsedSkills = parseSkills(html).slice(0, 4);
        const iconSlots = await discoverSkillIcons(
          tencentId,
          hero.avatarFallback,
          hero
        );
        const slotOrder = ['passive', 'skill1', 'skill2', 'ultimate'];
        if (parsedSkills.length) {
          hero.skills = slotOrder.map((slot, idx) => {
            const parsed =
              parsedSkills.find((s) => s.slot === slot) || parsedSkills[idx];
            const ic = iconSlots.find((x) => x.slot === slot) || iconSlots[idx];
            return {
              slot,
              name: parsed?.name || 'Data unavailable',
              description: parsed?.description || 'Data unavailable',
              icon: ic?.icon || iconSlots[0].icon,
              cooldown: null,
            };
          });
        } else {
          hero.skills = iconSlots.map((ic) => ({
            slot: ic.slot,
            name: 'Data unavailable',
            description: 'Data unavailable',
            icon: ic.icon,
            cooldown: null,
          }));
        }

        hero.build = parseBuildFromHtml(html, itemLookup);
        const arc = parseArcana(html);
        if (arc.length) hero.arcana = arc;
        const sp = parseSpells(html);
        if (sp.length) hero.spells = sp;
        const { counters, counteredBy } = parseCounters(html, name);
        if (counters.length >= 1) hero.counters = counters;
        else hero.counters = ['Data unavailable'];
        if (counteredBy.length >= 1) hero.counteredBy = counteredBy;
        else hero.counteredBy = ['Data unavailable'];
      } catch (e) {
        console.warn(`  enrich ${name} (${hokSlug}): ${e.message}`);
        const iconSlots = await discoverSkillIcons(
          tencentId,
          hero.avatarFallback,
          hero
        );
        hero.skills = iconSlots.map((ic) => ({
          slot: ic.slot,
          name: 'Data unavailable',
          description: 'Data unavailable',
          icon: ic.icon,
          cooldown: null,
        }));
        hero.build = resolveBuild([], itemsBySlug, {});
      }
      await sleep(150);
    } else {
      const iconSlots = await discoverSkillIcons(
        tencentId,
        hero.avatarFallback,
        hero
      );
      hero.skills = iconSlots.map((ic) => ({
        slot: ic.slot,
        name: 'Data unavailable',
        description: 'Data unavailable',
        icon: ic.icon,
        cooldown: null,
      }));
      hero.build = Array.from({ length: 6 }, (_, i) => ({
        slot: i + 1,
        itemId: null,
        name: 'Data unavailable',
        icon: null,
        description: null,
      }));
    }

    const buildNames = hero.build.map((b) => b.name);
    hero.tips = [
      `${name} (${role}): Tier ${tier} on international ranked — ${wr != null ? wr + '% WR' : 'WR unavailable'}.`,
      row.recommended_lane
        ? `Primary lane: ${row.recommended_lane}.`
        : 'Lane data unavailable.',
      `Build core: ${buildNames.filter((n) => n !== 'Data unavailable').slice(0, 3).join(', ') || 'Data unavailable'}.`,
    ];

    const wrText = wr != null ? `${wr}%` : 'Data unavailable';
    const prText = pr != null ? `${pr}%` : 'Data unavailable';
    const brText = br != null ? `${br}%` : 'Data unavailable';

    hero.patchHistory = [
      {
        version: 'Live meta',
        change: `Camp HOK — WR ${wrText}, pick ${prText}, ban ${brText}, popularity ${row.popularity || 'N/A'}.`,
      },
      {
        version: 'Matchups',
        change: `Counters ${hero.counters.join(', ')} · Weak into ${hero.counteredBy.join(', ')}.`,
      },
    ];

    hero.faqs = faqs(hero, buildNames);
    hero.metaAnalysis = [
      wr != null
        ? `${name} win rate ${wr}% (Camp HOK, ${hero.dataUpdated}).`
        : `${name} win rate: Data unavailable.`,
      pr != null ? `Pick rate ${pr}% in global ranked.` : 'Pick rate: Data unavailable.',
      br != null ? `Ban rate ${br}%.` : 'Ban rate: Data unavailable.',
      `Counters: ${hero.counters.join(', ')}. Countered by: ${hero.counteredBy.join(', ')}.`,
    ];

    heroes.push(hero);
  }

  heroes.sort((a, b) => (b.winRate ?? -1) - (a.winRate ?? -1));
  heroes.forEach((h, i) => {
    h.rank = i + 1;
  });

  const keywords = {};
  for (const h of heroes) {
    keywords[h.slug] = [
      `${h.slug} build`,
      `${h.slug} guide`,
      `${h.slug} counter`,
      `${h.name} honor of kings`,
    ];
  }

  const patches = {
    season: 'Live',
    source: 'Camp HOK + HoKStats.gg (Honor of Kings Global)',
    updated: new Date().toISOString().slice(0, 10),
    heroCount: heroes.length,
    notes:
      '112 international heroes. Stats from Camp HOK. English skills/items/builds from HoKStats.gg. Icons from Tencent CDN.',
  };

  fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2));
  fs.writeFileSync(keywordsPath, JSON.stringify(keywords, null, 2));
  fs.writeFileSync(mapPath, JSON.stringify(idMap, null, 2));
  fs.writeFileSync(patchesPath, JSON.stringify(patches, null, 2));

  console.log(`Wrote ${heroes.length} heroes → ${heroesPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
