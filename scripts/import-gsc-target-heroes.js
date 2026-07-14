const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HEROES_PATH = path.join(ROOT, 'data', 'heroes.json');
const HERO_NAMES_ZH_PATH = path.join(ROOT, 'data', 'hero-names-zh.json');
const TARGETS_PATH = path.join(ROOT, 'data', 'gsc-target-heroes.json');

const inputFile = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

const HERO_ALIAS_OVERRIDES = {
  kaizer: ['kaiser'],
};

const EXCLUDED_QUERY_TERMS = [
  'smite',
  'mobile legends',
  'league of legends',
  'pokemon',
];

if (!inputFile) {
  console.error('Usage: node scripts/import-gsc-target-heroes.js <gsc-queries.csv> [--dry-run]');
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === ',' && !quoted) {
      cells.push(cell.trim());
      cell = '';
      continue;
    }

    cell += char;
  }

  cells.push(cell.trim());
  return cells;
}

function parseNumber(value) {
  if (value == null || value === '') return 0;
  const parsed = Number(String(value).replace(/[%,"\s]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCsv(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];

  const header = splitCsvLine(lines[0]);
  const normalizedHeader = header.map((cell) => normalizeText(cell));
  const queryIndex = normalizedHeader.findIndex((cell) =>
    ['query', 'queries', 'top queries', 'search query', '查询', '查詢', '查询数', '查詢數'].includes(cell)
  );
  const clicksIndex = normalizedHeader.findIndex((cell) =>
    ['clicks', '点击次数', '點擊次數'].includes(cell)
  );
  const impressionsIndex = normalizedHeader.findIndex((cell) =>
    ['impressions', '展示次数', '曝光次数', '曝光次數', '曝光'].includes(cell)
  );
  const positionIndex = normalizedHeader.findIndex((cell) =>
    ['position', 'average position', '排名', '平均排名'].includes(cell)
  );

  const startsWithHeader = queryIndex >= 0 || normalizedHeader.includes('clicks');
  const dataLines = startsWithHeader ? lines.slice(1) : lines;

  return dataLines
    .map((line) => {
      const cells = splitCsvLine(line);
      return {
        query: cells[queryIndex >= 0 ? queryIndex : 0] || '',
        clicks: parseNumber(cells[clicksIndex]),
        impressions: parseNumber(cells[impressionsIndex >= 0 ? impressionsIndex : 1]),
        position: positionIndex >= 0 ? parseNumber(cells[positionIndex]) : null,
      };
    })
    .filter((row) => row.query);
}

function makeAliases(hero, zhName) {
  const names = new Set([
    hero.slug,
    hero.slug.replace(/-/g, ' '),
    hero.slug.replace(/-/g, ''),
    hero.id,
    hero.name,
    hero.name?.replace(/\s+/g, ''),
    zhName,
    ...(HERO_ALIAS_OVERRIDES[hero.slug] || []),
  ]);

  return [...names]
    .filter(Boolean)
    .map((name) => normalizeText(name))
    .filter((name) => name.length >= 2);
}

function aliasMatches(query, alias) {
  if (!alias) return false;
  if (/^[a-z0-9 ]+$/.test(alias)) {
    return ` ${query} `.includes(` ${alias} `);
  }
  return query.includes(alias);
}

function buildHeroIndex() {
  const heroes = readJson(HEROES_PATH);
  const zhNames = fs.existsSync(HERO_NAMES_ZH_PATH) ? readJson(HERO_NAMES_ZH_PATH) : {};
  return heroes.map((hero) => ({
    slug: hero.slug,
    name: hero.name,
    aliases: makeAliases(hero, zhNames[hero.slug]),
  }));
}

function findMatchingHeroes(row, heroIndex) {
  const query = normalizeText(row.query);
  if (EXCLUDED_QUERY_TERMS.some((term) => query.includes(normalizeText(term)))) {
    return [];
  }
  return heroIndex.filter((hero) => hero.aliases.some((alias) => aliasMatches(query, alias)));
}

function addMatch(matched, hero, row) {
  const existing =
    matched.get(hero.slug) || {
      slug: hero.slug,
      clicks: 0,
      impressions: 0,
      bestPosition: null,
      queries: [],
    };

  existing.clicks += row.clicks;
  existing.impressions += row.impressions;
  if (row.position != null && row.position > 0) {
    existing.bestPosition =
      existing.bestPosition == null ? row.position : Math.min(existing.bestPosition, row.position);
  }
  existing.queries.push({
    query: row.query,
    clicks: row.clicks,
    impressions: row.impressions,
    position: row.position,
  });

  matched.set(hero.slug, existing);
}

function choosePrimaryQuery(item) {
  return [...item.queries].sort(
    (a, b) =>
      b.impressions - a.impressions ||
      b.clicks - a.clicks ||
      String(a.query).localeCompare(String(b.query))
  )[0];
}

function main() {
  const fullInputPath = path.resolve(process.cwd(), inputFile);
  if (!fs.existsSync(fullInputPath)) {
    console.error(`Missing GSC export: ${fullInputPath}`);
    process.exit(1);
  }

  const rows = parseCsv(fullInputPath);
  const heroIndex = buildHeroIndex();
  const matched = new Map();

  for (const row of rows) {
    if ((row.impressions || 0) <= 0 && (row.clicks || 0) <= 0) continue;
    for (const hero of findMatchingHeroes(row, heroIndex)) {
      addMatch(matched, hero, row);
    }
  }

  const targets = [...matched.values()]
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks || a.slug.localeCompare(b.slug))
    .map((item) => {
      const primary = choosePrimaryQuery(item);
      return {
        slug: item.slug,
        query: primary.query,
        reason: `Imported from Google Search Console export with ${item.impressions} total impressions and ${item.clicks} total clicks.`,
        priority: item.clicks > 0 || item.impressions >= 3 ? 'high' : 'normal',
        metrics: {
          clicks: item.clicks,
          impressions: item.impressions,
          bestPosition: item.bestPosition,
        },
        queries: item.queries.sort(
          (a, b) =>
            b.impressions - a.impressions ||
            b.clicks - a.clicks ||
            String(a.query).localeCompare(String(b.query))
        ),
      };
    });

  const output = {
    updatedAt: new Date().toISOString().slice(0, 10),
    source: `Google Search Console export: ${path.basename(fullInputPath)}`,
    notes: [
      'Generated from actual GSC queries. Do not add heroes without confirmed impressions or clicks.',
      'Use this list to verify hero pages, guide pages, counter pages, and tool deep links before requesting indexing.',
    ],
    heroes: targets,
  };

  console.log(`Read ${rows.length} GSC rows`);
  console.log(`Matched ${targets.length} hero targets`);
  for (const target of targets) {
    console.log(
      `- ${target.slug}: ${target.query} (${target.metrics.impressions} impressions, ${target.metrics.clicks} clicks)`
    );
    for (const query of target.queries.slice(0, 5)) {
      console.log(`  - ${query.query}: ${query.impressions} impressions, ${query.clicks} clicks`);
    }
  }

  if (dryRun) {
    console.log('\nDry run only. data/gsc-target-heroes.json was not changed.');
    return;
  }

  fs.writeFileSync(TARGETS_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(`\nUpdated ${path.relative(ROOT, TARGETS_PATH)}`);
}

main();
