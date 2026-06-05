/** Shared HTML parsers for HoKStats.gg (international English reference). */

function tencentItemIcon(id) {
  return `https://game.gtimg.cn/images/yxzj/img201606/itemimg/${id}.jpg`;
}

function hokstatsItemIcon(id) {
  return `https://hokstats.gg/items/${id}.png`;
}

function itemIconCandidates(id) {
  const sid = String(id);
  return [
    tencentItemIcon(sid),
    `https://game.gtimg.cn/images/yxzj/img201606/itemimg/${sid}/${sid}.jpg`,
    hokstatsItemIcon(sid),
  ];
}

async function itemIconExists(url) {
  try {
    const buf = await fetchIconBytes(url);
    return !!buf && buf.length >= MIN_ITEM_ICON_BYTES;
  } catch {
    return false;
  }
}

async function resolveItemIconUrl(id) {
  for (const url of itemIconCandidates(id)) {
    if (await itemIconExists(url)) return url;
  }
  return hokstatsItemIcon(id);
}

function normalizeItemKey(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function buildItemLookup(items) {
  const byNorm = new Map();
  const bySlug = {};
  for (const it of items) {
    byNorm.set(normalizeItemKey(it.name), it);
    bySlug[it.slug] = it;
    bySlug[itemNameToSlug(it.name)] = it;
  }
  return { byNorm, bySlug, list: items };
}

function findItemByName(name, lookup) {
  if (!name || name === 'Data unavailable') return null;
  const { byNorm, bySlug, list } = lookup;
  const key = normalizeItemKey(name);
  if (byNorm.has(key)) return byNorm.get(key);

  const slug = itemNameToSlug(name);
  if (bySlug[slug]) return bySlug[slug];
  const hyphenSlug = name
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  if (bySlug[hyphenSlug]) return bySlug[hyphenSlug];

  const words = name
    .toLowerCase()
    .replace(/['.]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  let best = null;
  let bestScore = 0;
  for (const it of list) {
    const lower = it.name.toLowerCase();
    const score = words.filter((w) => lower.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  }
  if (best && bestScore >= Math.min(2, words.length)) return best;

  for (const it of list) {
    const n = normalizeItemKey(it.name);
    if (n.includes(key) || key.includes(n)) return it;
  }
  return null;
}

function parseBuildItemNames(html) {
  const patterns = [
    /Public build references for[^.]+recommend\s+([^.]+)\./i,
    /build (?:centered on|references for)[^.]+recommend\s+([^.]+)\./i,
    /Default\s+\w+\s+path[\s\S]{0,400}?recommend\s+([^.]+)\./i,
  ];
  const names = [];
  for (const re of patterns) {
    const m = html.match(re);
    if (!m) continue;
    const chunk = decodeHtml(m[1]);
    chunk.split(/,\s*(?![^()]*\))/).forEach((seg) => {
      const cleaned = seg
        .trim()
        .replace(/^\s*and\s+/i, '')
        .replace(/\s+and\s*$/i, '');
      if (cleaned.length > 2 && !names.includes(cleaned)) names.push(cleaned);
    });
    if (names.length >= 4) break;
  }
  return names.slice(0, 6);
}

function decodeHtml(s) {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

function parseJsonLdBlocks(html) {
  const blocks = [];
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      /* skip */
    }
  }
  return blocks;
}

function parseItemListFromHtml(html) {
  const byId = new Map();

  for (const j of parseJsonLdBlocks(html)) {
    const list = j.mainEntity?.itemListElement;
    if (list?.length) {
      for (const el of list) {
        const url = el.url || '';
        const id = url.match(/\/items\/(\d+)\/?/)?.[1];
        if (id) byId.set(id, { id, name: el.name, url });
      }
    }
  }

  const re =
    /href="\/items\/(\d+)\/?"[^>]*>[\s\S]{0,250}?alt="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    if (!byId.has(m[1])) {
      byId.set(m[1], { id: m[1], name: decodeHtml(m[2].trim()), url: null });
    }
  }

  return [...byId.values()];
}

async function parseItemDetail(html, id) {
  const name =
    html.match(
      /<h1 class="font-display[^"]*">([^<]+?) Honor of Kings Item/
    )?.[1] || null;
  const tagline = html.match(
    /<p class="text-text-secondary text-sm md:text-base mb-3">([^<]+)<\/p>/
  )?.[1];
  const gold = html.match(/(\d+)\s*gold/)?.[1];
  const type = html.match(
    /<span class="text-text-secondary">(Attack|Magic|Defense|Movement|Jungle)[^<]*<\/span>/
  )?.[1];
  let faqDesc = null;
  for (const j of parseJsonLdBlocks(html)) {
    if (j['@type'] === 'FAQPage' && j.mainEntity?.[0]) {
      faqDesc = j.mainEntity[0].acceptedAnswer?.text || null;
      break;
    }
  }
  return {
    id: String(id),
    name: name ? decodeHtml(name.trim()) : null,
    description: tagline
      ? decodeHtml(tagline.trim())
      : faqDesc
        ? decodeHtml(faqDesc)
        : 'Data unavailable',
    gold: gold ? parseInt(gold, 10) : null,
    type: type || null,
    icon: await resolveItemIconUrl(id),
  };
}

function parseSkills(html) {
  const re =
    /<span class="text-\[11px\][^>]*>(passive|skill1|skill2|ultimate)<\/span>\s*<span class="text-sm font-bold">([^<]+)<\/span>\s*<\/div>\s*<p class="text-\[13px\][^>]*>([^<]+)<\/p>/g;
  const skills = [];
  let m;
  while ((m = re.exec(html))) {
    skills.push({
      slot: m[1],
      name: decodeHtml(m[2].trim()),
      description: decodeHtml(m[3].trim()),
    });
  }
  return skills;
}

const ARCANA_HASH = new Set([
  'fate',
  'harmony',
  'vacuity',
  'hunt',
  'gale',
  'mvp',
  'duel',
  'mind',
  'penetration',
]);

function parseBuildItemSlugs(html) {
  const block = html.match(/Recommended Build[\s\S]{0,1500}/i);
  if (!block) return [];
  const slugs = [];
  const re = /#([a-z0-9-]+)/g;
  let m;
  while ((m = re.exec(block[0]))) {
    if (ARCANA_HASH.has(m[1])) continue;
    if (!slugs.includes(m[1])) slugs.push(m[1]);
  }
  return slugs;
}

/** HoKStats 2026: item chains in flex-wrap rows (href="/items/{id}/"). */
function parseBuildItemChains(html) {
  const chains = [];
  const re =
    /flex flex-wrap items-center gap-1\.5">([\s\S]*?)<\/div>\s*<\/div>/g;
  let block;
  while ((block = re.exec(html))) {
    const items = [];
    const itemRe =
      /href="\/items\/(\d+)\/"[^>]*>[\s\S]*?<span[^>]*>\s*([^<]+?)\s*<\/span>/g;
    let m;
    while ((m = itemRe.exec(block[1]))) {
      const name = decodeHtml(m[2].trim());
      if (!items.some((x) => x.id === m[1])) {
        items.push({ id: m[1], name });
      }
    }
    if (items.length >= 3) chains.push(items);
  }
  return chains;
}

function parseBuildNamesFromProse(html) {
  const names = [];
  const proseRe =
    /([A-Z][A-Za-z' -]+(?:\s-\s[A-Za-z][A-Za-z' -]*)?)\s+(?:accelerates|adds|provides|reinforces|stacks|shortens|boosts|grants|deals|supports)/g;
  let m;
  while ((m = proseRe.exec(html))) {
    const name = decodeHtml(m[1].trim());
    if (name.length > 3 && !names.includes(name)) names.push(name);
  }
  return names.slice(0, 6);
}

function padBuildToSix(build) {
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

function resolveBuildFromIds(entries, lookup, heroRole) {
  const finalized = finalizeBuildEntries(entries, lookup, heroRole);
  const build = [];
  finalized.forEach((entry, i) => {
    const byId = lookup.list.find((it) => it.id === String(entry.id));
    if (byId) {
      build.push(buildItemEntry(byId, i + 1));
      return;
    }
    const byName = findItemByName(entry.name, lookup);
    if (byName) {
      build.push(buildItemEntry(byName, i + 1));
      return;
    }
    build.push({
      slot: i + 1,
      itemId: String(entry.id),
      name: entry.name,
      icon: hokstatsItemIcon(entry.id),
      description: null,
    });
  });
  return padBuildToSix(build);
}

const ARCANA_NAMES = [
  'Fate',
  'Harmony',
  'Vacuity',
  'Void',
  'Hunt',
  'Gale',
  'Mvp',
  'Duel',
  'Mind',
  'Penetration',
];

function capitalizeArcana(s) {
  const lower = s.toLowerCase();
  if (lower === 'mvp') return 'Mvp';
  if (lower === 'void') return 'Vacuity';
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function parseArcana(html) {
  const rec = html.match(/recommended arcana are\s+([^.<]+)/i);
  if (rec) {
    const list = rec[1]
      .split(/,|\sand\s/)
      .map((s) => capitalizeArcana(s.trim()))
      .filter((s) => s.length > 1);
    if (list.length) return list.slice(0, 3);
  }

  const m = html.match(/Arcana[\s\S]{0,400}?#([a-z#]+)/i);
  if (m) {
    const raw = m[1] || '';
    const fromHash = raw
      .split('#')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => capitalizeArcana(s));
    if (fromHash.length) return fromHash.slice(0, 3);
  }

  const block = html.match(/Arcana\s*&amp;\s*battle spell[\s\S]{0,500}/i);
  const found = ARCANA_NAMES.filter((n) =>
    new RegExp(`\\b${n}\\b`, 'i').test(block?.[0] || html.slice(18000, 32000))
  ).map(capitalizeArcana);
  return [...new Set(found)].slice(0, 3);
}

const SPELL_NAMES = [
  'Flash',
  'Heal',
  'Execute',
  'Punish',
  'Flicker',
  'Smite',
  'Arctic Orb',
  'Haste',
];

function parseSpells(html) {
  const battle = html.match(
    /\b(Flash|Heal|Execute|Punish|Flicker|Smite|Arctic Orb|Haste)\s+is the battle spell/i
  );
  if (battle) return [battle[1]];

  const m = html.match(
    /Spells[\s\S]{0,200}?>(Flash|Heal|Execute|Punish|Flicker|Smite|Arctic Orb|Haste)[^<]*</i
  );
  if (m) {
    const found = [
      ...html.matchAll(
        /\b(Flash|Heal|Execute|Punish|Flicker|Smite|Arctic Orb|Haste)\b/g
      ),
    ].map((x) => x[1]);
    return [...new Set(found)].slice(0, 2);
  }

  const early = html.match(
    /early defensive value,\s*(Flash|Heal|Execute|Punish|Flicker|Smite|Arctic Orb|Haste)/i
  );
  if (early) return [early[1]];

  const found = SPELL_NAMES.filter((s) =>
    new RegExp(`\\b${s}\\b`).test(html.slice(18000, 32000))
  );
  return found.length ? found.slice(0, 2) : ['Flash', 'Execute'];
}

function splitHeroNames(raw) {
  return raw
    .split(/,|\sand\s/)
    .map((s) => s.trim().replace(/^and\s+/i, ''))
    .filter(
      (s) =>
        s.length > 1 &&
        !/^(the|your|enemy|Updated|Pick|Avoid|Honor|English)/i.test(s)
    );
}

function parseCounters(html, heroName) {
  const counters = [];
  const counteredBy = [];
  const esc = heroName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const pickBlock = html.match(
    new RegExp(`Pick ${esc} when[\\s\\S]{0,4000}?Avoid ${esc} when`, 'i')
  );
  if (pickBlock) {
    const m = pickBlock[0].match(
      /(?:draft includes|including)\s+([^.]+?),\s*who appear in counter data as matchups/i
    );
    if (m) splitHeroNames(decodeHtml(m[1])).forEach((n) => counters.push(n));
  }

  const avoidBlock = html.match(
    new RegExp(`Avoid ${esc} when[\\s\\S]{0,2500}`, 'i')
  );
  if (avoidBlock) {
    const m = avoidBlock[0].match(
      /enemy already drafted\s+([^.]+?),\s*who counter data identifies/i
    );
    if (m) splitHeroNames(decodeHtml(m[1])).forEach((n) => counteredBy.push(n));
  }

  const matchup = html.match(
    /enemy is built around\s+([^.]+?),\s*who counter data flags/i
  );
  if (matchup) {
    splitHeroNames(decodeHtml(matchup[1])).forEach((n) => {
      if (!counteredBy.includes(n)) counteredBy.push(n);
    });
  }

  const BAD_NAMES = new Set([
    'Stick',
    'Watch',
    'Honor',
    'English',
    'Updated',
    'Pick',
    'Avoid',
    'The',
    'Your',
    'Enemy',
    'Public',
    'Mobile',
    'Ranged',
  ]);

  const looksLikeHero = (n) =>
    n.length <= 28 &&
    !/[.!?]/.test(n) &&
    !/\b(the|your|enemy|team|match|lane|farm|draft|when|because)\b/i.test(n);

  const clean = (list) =>
    [...new Set(list)].filter(
      (n) =>
        n &&
        n !== heroName &&
        n.length > 2 &&
        looksLikeHero(n) &&
        !BAD_NAMES.has(n) &&
        !/^(Pick|Avoid|Updated)/i.test(n)
    );

  return {
    counters: clean(counters).slice(0, 3),
    counteredBy: clean(counteredBy).slice(0, 3),
  };
}

function parseHeroNameSlugMap(html) {
  const map = {};
  const re =
    /href="\/heroes\/([a-z0-9'-]+)\/?"[^>]*>[\s\S]{0,400}?alt="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    map[decodeHtml(m[2].trim())] = m[1];
  }
  return map;
}

function itemNameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/['.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const FETCH_HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; hokmeta-sync/1.0)' };

function skillIconUrl(heroId, suffix) {
  const id = String(heroId);
  return `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}${suffix}.png`;
}

const MIN_SKILL_ICON_BYTES = 800;
const MIN_ITEM_ICON_BYTES = 400;

async function fetchIconBytes(url) {
  const r = await fetch(url, { headers: FETCH_HEADERS });
  if (!r.ok) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  const type = r.headers.get('content-type') || '';
  if (type.includes('text/html') || buf.length < 120) return null;
  return buf;
}

async function skillIconExists(url) {
  try {
    const buf = await fetchIconBytes(url);
    return !!buf && buf.length >= MIN_SKILL_ICON_BYTES;
  } catch {
    return false;
  }
}

function hokstatsHeroIcon(slug) {
  return `https://hokstats.gg/heroes-icons/${slug}.png`;
}

async function resolveTencentAvatarUrl(tencentId, campAvatar) {
  const url = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${tencentId}/${tencentId}.jpg`;
  if (await itemIconExists(url)) return url;
  if (campAvatar?.startsWith('http')) return campAvatar;
  return url;
}

/** Prefer camp avatar, then HoKStats hero icon — avoids broken Tencent portrait JPGs. */
function resolveSkillIconFallback(hero) {
  if (hero?.avatar?.startsWith('http')) return hero.avatar;
  if (hero?.slug) return hokstatsHeroIcon(hero.slug);
  const id = hero?.tencentId;
  if (id) return `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}.jpg`;
  return '';
}

const SKILL_SUFFIX_PATTERNS = [
  ['00', '10', '20', '30'],
  ['00', '11', '23', '35'],
  ['07', '70', '80', '90'],
  ['00', '01', '02', '03'],
  ['00', '10', '11', '20'],
];

async function probeSuffixBatch(id, indices) {
  const found = [];
  await Promise.all(
    indices.map(async (i) => {
      const suf = String(i).padStart(2, '0');
      const url = skillIconUrl(id, suf);
      if (await skillIconExists(url)) found.push({ suf: i, url });
    })
  );
  return found;
}

/** Discover real CDN paths — patterns vary (00/10/20/30, 00/11/23/35, 07/70/80/90, …). */
async function discoverSkillIconUrls(tencentId, avatarFallback, heroMeta) {
  const id = String(tencentId);

  for (const pattern of SKILL_SUFFIX_PATTERNS) {
    const urls = [];
    let complete = true;
    for (const suf of pattern) {
      const url = skillIconUrl(id, suf);
      if (await skillIconExists(url)) urls.push(url);
      else complete = false;
    }
    if (complete && urls.length === 4) return urls;
  }

  let found = await probeSuffixBatch(
    id,
    Array.from({ length: 50 }, (_, i) => i)
  );
  if (found.length < 4) {
    const more = await probeSuffixBatch(
      id,
      Array.from({ length: 50 }, (_, i) => i + 50)
    );
    found = found.concat(more);
  }

  found.sort((a, b) => a.suf - b.suf);
  const urls = found.map((f) => f.url);

  if (urls.length >= 4) return urls.slice(0, 4);
  if (urls.length > 0) {
    while (urls.length < 4) urls.push(urls[urls.length - 1]);
    return urls;
  }

  let fallback =
    avatarFallback ||
    (heroMeta ? resolveSkillIconFallback(heroMeta) : '') ||
    `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${id}/${id}.jpg`;

  if (!(await skillIconExists(fallback)) && heroMeta?.slug) {
    const hs = hokstatsHeroIcon(heroMeta.slug);
    if (await skillIconExists(hs)) fallback = hs;
  }

  return [fallback, fallback, fallback, fallback];
}

const SKILL_SLOTS = ['passive', 'skill1', 'skill2', 'ultimate'];

async function discoverSkillIcons(tencentId, avatarFallback, heroMeta) {
  const urls = await discoverSkillIconUrls(tencentId, avatarFallback, heroMeta);
  return SKILL_SLOTS.map((slot, i) => ({ slot, icon: urls[i] }));
}

function buildItemEntry(item, slot) {
  return {
    slot,
    itemId: item.id,
    name: item.name,
    icon: item.icon,
    description: item.description || null,
  };
}

/** Component → finished item (same build branch). */
const COMPONENT_UPGRADES = {
  '1154': ['1155', '1141'], // Cloud Piercer → Daybreaker's Virtue | Sunchaser
  '1129': ['1159'], // Swiftstrike Lance → Tempest
  '1521': ['1531'], // Guerrilla Machete → Runeblade
  '1522': ['1532'], // Patrol Axe → Giant's Grip
  '1523': ['1533'], // Relentless Blade → Rapacious Bite
  '13211': ['1347'], // Mirror of Radiance → Longnight Guardian
};

const COMPONENT_MAX_GOLD = 1200;
const TIER2_BOOTS = new Set(['1421', '1422', '1423', '1424', '1425', '1426']);
const DEFAULT_BOOT_BY_ROLE = {
  marksman: '1425',
  assassin: '1425',
  warrior: '1421',
  tank: '1421',
  mage: '1424',
  support: '1423',
};

function pickComponentUpgrade(componentId, upgradeIds, presentIds, heroRole) {
  const present = new Set(presentIds.map(String));
  const available = upgradeIds.filter((id) => !present.has(String(id)));
  if (!available.length) return null;
  if (componentId === '1154') {
    if (present.has('1141')) return null;
    return '1155';
  }
  if (componentId === '1411') {
    const roleKey = String(heroRole || '').toLowerCase();
    return DEFAULT_BOOT_BY_ROLE[roleKey] || '1425';
  }
  return available[0];
}

function shouldSkipEntry(id, used) {
  if (id === '1411' && [...used].some((x) => TIER2_BOOTS.has(x))) return true;
  if (id === '1154' && (used.has('1155') || used.has('1141'))) return true;
  if (COMPONENT_UPGRADES[id]?.some((target) => used.has(target))) return true;
  return false;
}

function finalizeBuildEntries(entries, lookup, heroRole) {
  const rawIds = entries.map((e) => String(e.id));
  const upgradedIds = rawIds.map((id) => {
    if (id === '1411' && rawIds.some((x) => TIER2_BOOTS.has(x))) return null;
    const upgrades = COMPONENT_UPGRADES[id];
    if (!upgrades?.length && id !== '1411') return id;
    if (id === '1411' || upgrades?.length) {
      return pickComponentUpgrade(id, upgrades || [], rawIds, heroRole) || id;
    }
    return id;
  });

  const finalIds = [];
  const used = new Set();
  for (let i = 0; i < upgradedIds.length; i++) {
    const id = upgradedIds[i];
    if (!id || shouldSkipEntry(id, used)) continue;
    if (used.has(id)) continue;
    used.add(id);
    finalIds.push(id);
    if (finalIds.length >= 6) break;
  }

  return finalIds.map((id) => {
    const item = lookup.list.find((it) => it.id === id);
    const entry = entries.find((e) => String(e.id) === id);
    return { id, name: item?.name || entry?.name || id };
  });
}

function resolveBuildFromNames(names, lookup, heroRole) {
  const entries = [];
  names.forEach((name) => {
    const item = findItemByName(name, lookup);
    if (item && !entries.some((e) => e.id === item.id)) {
      entries.push({ id: item.id, name: item.name });
    }
  });
  if (entries.length >= 3) {
    return resolveBuildFromIds(entries, lookup, heroRole);
  }

  const build = [];
  names.slice(0, 6).forEach((name, i) => {
    const item = findItemByName(name, lookup);
    if (item) build.push(buildItemEntry(item, i + 1));
    else {
      build.push({
        slot: i + 1,
        itemId: null,
        name,
        icon: null,
        description: null,
      });
    }
  });
  return padBuildToSix(build);
}

function slugifyBuildLabel(label) {
  return (
    String(label)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\u4e00-\u9fff-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'build'
  );
}

function inferBuildLane(label) {
  const l = String(label).toLowerCase();
  if (/jungl/.test(l)) return 'Jungling';
  if (/clash|\btop\b/.test(l)) return 'Clash Lane';
  if (/farm|bot|marksman|adc/.test(l)) return 'Farm Lane';
  if (/\bmid\b/.test(l)) return 'Mid Lane';
  if (/roam|support/.test(l)) return 'Roaming';
  if (/国服|cn\s*set/.test(l)) return 'CN preset';
  return null;
}

function buildPresetPriority(preset) {
  const label = preset.label.toLowerCase();
  if (/principal|recommend|default/.test(label) || preset.id === 'recommended') return 0;
  if (/国服/.test(preset.label)) return 1;
  if (preset.lane && preset.lane !== 'CN preset') return 2;
  return 3;
}

function pickDefaultBuildItems(presets, heroLane) {
  if (!presets.length) return null;
  const recommended = presets.find(
    (p) => p.id === 'recommended' || /principal|recommend/i.test(p.label)
  );
  if (recommended) return recommended.items;

  if (heroLane) {
    const laneMatch = presets.find(
      (p) =>
        p.lane === heroLane ||
        new RegExp(heroLane.split(' ')[0], 'i').test(p.label)
    );
    if (laneMatch) return laneMatch.items;
  }

  return presets[0].items;
}

/** HoKStats preset cards: Late Game, Clash Lane, 国服套装, Jungling, etc. */
function parseBuildPresetsFromHtml(html, lookup, heroRole) {
  const presets = [];
  const seen = new Set();
  const cardRe =
    /<h3 class="text-sm font-bold text-text-primary truncate">([^<]+)<\/h3>[\s\S]*?<span class="text-\[11px\] text-text-muted shrink-0">([^<]*)<\/span>[\s\S]*?<div class="flex flex-wrap items-center gap-1\.5">([\s\S]*?)<\/div>/g;

  let m;
  while ((m = cardRe.exec(html))) {
    const label = decodeHtml(m[1].trim());
    const position = decodeHtml(m[2].trim()) || null;
    const entries = [];
    const itemRe =
      /href="\/items\/(\d+)\/"[^>]*>[\s\S]*?<span[^>]*>\s*([^<]+?)\s*<\/span>/g;
    let im;
    while ((im = itemRe.exec(m[3]))) {
      const id = im[1];
      const name = decodeHtml(im[2].trim());
      if (!entries.some((x) => x.id === id)) entries.push({ id, name });
    }
    if (entries.length < 3) continue;

    const items = resolveBuildFromIds(entries, lookup, heroRole);
    if (items.filter((b) => b.icon).length < 3) continue;

    const key = items.map((b) => b.itemId || b.name).join('|');
    if (seen.has(key)) continue;
    seen.add(key);

    presets.push({
      id: slugifyBuildLabel(label),
      label,
      position,
      lane: inferBuildLane(label),
      items,
    });
  }

  const slugs = parseBuildItemSlugs(html);
  if (slugs.length >= 4) {
    const fromSlugs = resolveBuildFromNames(
      slugs.map((s) => s.replace(/-/g, ' ')),
      lookup,
      heroRole
    );
    if (fromSlugs.filter((b) => b.icon).length >= 4) {
      const key = fromSlugs.map((b) => b.itemId || b.name).join('|');
      if (!seen.has(key)) {
        presets.unshift({
          id: 'recommended',
          label: 'Recommended',
          position: null,
          lane: null,
          items: fromSlugs,
        });
        seen.add(key);
      }
    }
  }

  presets.sort((a, b) => buildPresetPriority(a) - buildPresetPriority(b));
  return presets.slice(0, 10);
}

function parseBuildFromHtml(html, lookup, heroLane, heroRole) {
  const presets = parseBuildPresetsFromHtml(html, lookup, heroRole);
  if (presets.length) {
    return pickDefaultBuildItems(presets, heroLane) || presets[0].items;
  }

  const chains = parseBuildItemChains(html);
  if (chains.length) {
    const best = chains.reduce((a, b) => (b.length > a.length ? b : a), chains[0]);
    const fromChain = resolveBuildFromIds(best, lookup, heroRole);
    if (fromChain.filter((b) => b.icon).length >= 4) return fromChain;
  }

  const named = parseBuildItemNames(html);
  if (named.length >= 4) return resolveBuildFromNames(named, lookup, heroRole);

  const prose = parseBuildNamesFromProse(html);
  if (prose.length >= 4) {
    const fromProse = resolveBuildFromNames(prose, lookup, heroRole);
    if (fromProse.filter((b) => b.icon).length >= 4) return fromProse;
  }

  const slugs = parseBuildItemSlugs(html);
  const fromSlugs = resolveBuildFromNames(
    slugs.map((s) => s.replace(/-/g, ' ')),
    lookup,
    heroRole
  );
  const namedIcons = resolveBuildFromNames(named, lookup, heroRole).filter((b) => b.icon)
    .length;
  const hasIcons = fromSlugs.filter((b) => b.icon).length;
  return namedIcons > hasIcons
    ? resolveBuildFromNames(named, lookup, heroRole)
    : fromSlugs;
}

/** @deprecated Use discoverSkillIcons — kept for callers that only need default URLs */
function skillIcons(heroId) {
  const id = String(heroId);
  return SKILL_SLOTS.map((slot, i) => ({
    slot,
    icon: skillIconUrl(id, ['00', '10', '20', '30'][i]),
  }));
}

module.exports = {
  decodeHtml,
  tencentItemIcon,
  hokstatsItemIcon,
  itemIconCandidates,
  resolveItemIconUrl,
  normalizeItemKey,
  buildItemLookup,
  findItemByName,
  parseBuildItemNames,
  buildItemEntry,
  resolveBuildFromNames,
  parseBuildFromHtml,
  parseBuildPresetsFromHtml,
  pickDefaultBuildItems,
  parseItemListFromHtml,
  parseItemDetail,
  parseSkills,
  parseBuildItemSlugs,
  parseBuildItemChains,
  parseBuildNamesFromProse,
  resolveBuildFromIds,
  finalizeBuildEntries,
  COMPONENT_UPGRADES,
  parseArcana,
  parseSpells,
  parseCounters,
  parseHeroNameSlugMap,
  itemNameToSlug,
  skillIcons,
  discoverSkillIcons,
  discoverSkillIconUrls,
  skillIconUrl,
  skillIconExists,
  itemIconExists,
  hokstatsHeroIcon,
  resolveSkillIconFallback,
  resolveTencentAvatarUrl,
  fetchIconBytes,
};
