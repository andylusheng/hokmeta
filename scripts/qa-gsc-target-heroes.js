const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGETS_PATH = path.join(ROOT, 'data', 'gsc-target-heroes.json');
const HEROES_PATH = path.join(ROOT, 'data', 'heroes.json');
const KEYWORDS_PATH = path.join(ROOT, 'data', 'keywords.json');
const TOP_GUIDES_PATH = path.join(ROOT, 'src', 'lib', 'learn-top-hero-guides.ts');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function hasTopGuide(source, slug) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const quoted = new RegExp(`['"]${escaped}['"]\\s*:\\s*{`);
  const bare = /^[a-zA-Z_$][\w$]*$/.test(slug)
    ? new RegExp(`\\b${escaped}\\s*:\\s*{`)
    : null;
  return quoted.test(source) || Boolean(bare && bare.test(source));
}

function buildUrls(slug) {
  return [
    `/hero/${slug}/`,
    `/learn/${slug}-guide/`,
    `/hero/${slug}/counters/`,
    `/tools/build-compare/${slug}/`,
    `/tools/damage-calculator/${slug}/`,
  ];
}

function main() {
  const targets = readJson(TARGETS_PATH);
  const heroes = readJson(HEROES_PATH);
  const keywords = readJson(KEYWORDS_PATH);
  const topGuidesSource = fs.readFileSync(TOP_GUIDES_PATH, 'utf8');
  const heroesBySlug = new Map(heroes.map((hero) => [hero.slug, hero]));

  const failures = [];
  const rows = [];

  for (const target of targets.heroes || []) {
    const slug = target.slug;
    const hero = heroesBySlug.get(slug);
    const keywordList = keywords[slug] || [];
    const topGuideReady = hasTopGuide(topGuidesSource, slug);

    if (!hero) failures.push(`${slug}: missing data/heroes.json entry`);
    if (!keywordList.length) failures.push(`${slug}: missing data/keywords.json entry`);
    if (!topGuideReady) failures.push(`${slug}: missing TOP_GUIDES entry in learn-top-hero-guides.ts`);

    rows.push({
      slug,
      name: hero?.name || '(missing hero)',
      query: target.query || '',
      priority: target.priority || 'normal',
      guideReady: topGuideReady,
      keywordCount: keywordList.length,
      urls: buildUrls(slug),
    });
  }

  console.log('GSC target hero QA');
  console.log(`Targets: ${rows.length}`);
  for (const row of rows) {
    console.log(`\n- ${row.name} (${row.slug})`);
    console.log(`  Query: ${row.query}`);
    console.log(`  Priority: ${row.priority}`);
    console.log(`  Guide ready: ${row.guideReady ? 'yes' : 'no'}`);
    console.log(`  Keyword count: ${row.keywordCount}`);
    if (Array.isArray(targets.heroes?.find((item) => item.slug === row.slug)?.queries)) {
      const queries = targets.heroes.find((item) => item.slug === row.slug).queries;
      console.log(`  GSC queries: ${queries.length}`);
      for (const item of queries.slice(0, 5)) {
        console.log(`    ${item.query} (${item.impressions || 0} impressions, ${item.clicks || 0} clicks)`);
      }
    }
    console.log('  URLs to check/index:');
    for (const url of row.urls) console.log(`    ${url}`);
  }

  if (failures.length) {
    console.error('\nFailures:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('\nqa-gsc-target-heroes: OK');
}

main();
