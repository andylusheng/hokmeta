const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGETS_PATH = path.join(ROOT, 'data', 'seo-priority-heroes.json');
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

  console.log('SEO priority hero QA');
  console.log(`Targets: ${(targets.heroes || []).length}`);

  for (const target of targets.heroes || []) {
    const slug = target.slug;
    const hero = heroesBySlug.get(slug);
    const keywordList = keywords[slug] || [];
    const topGuideReady = hasTopGuide(topGuidesSource, slug);

    if (!hero) failures.push(`${slug}: missing data/heroes.json entry`);
    if (!keywordList.length) failures.push(`${slug}: missing data/keywords.json entry`);
    if (!topGuideReady) failures.push(`${slug}: missing TOP_GUIDES entry in learn-top-hero-guides.ts`);

    console.log(`\n- ${hero?.name || '(missing hero)'} (${slug})`);
    console.log(`  Priority: ${target.priority || 'normal'}`);
    console.log(`  Guide ready: ${topGuideReady ? 'yes' : 'no'}`);
    console.log(`  Keyword count: ${keywordList.length}`);
    console.log(`  Reason: ${target.reason || ''}`);
    console.log('  URLs to check/index:');
    for (const url of buildUrls(slug)) console.log(`    ${url}`);
  }

  if (failures.length) {
    console.error('\nFailures:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('\nqa-seo-priority-heroes: OK');
}

main();
