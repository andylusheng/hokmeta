/**
 * slim-meta-trends.js
 * Strips history30d from all summary lists in data/meta-trends.json.
 * Only allHeroes retains history30d (used by HeroTrendHistory sparkline).
 * Run: node scripts/slim-meta-trends.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'data', 'meta-trends.json');
const raw = fs.readFileSync(FILE, 'utf-8');
const data = JSON.parse(raw);

const beforeKB = (Buffer.byteLength(raw) / 1024).toFixed(1);

// Lists that contain MetaTrendHero objects but don't need history30d
const SUMMARY_LISTS = [
  'topWinRate',
  'lowestWinRate',
  'mostPicked',
  'mostBanned',
  'risingWinRate',
  'risingPickRate',
  'risingBanRate',
  'fallingWinRate',
  'sleeperPicks',
  'overratedPicks',
];

function stripHistory(hero) {
  const { history30d, ...rest } = hero;
  return rest;
}

for (const key of SUMMARY_LISTS) {
  if (Array.isArray(data[key])) {
    data[key] = data[key].map(stripHistory);
  }
}

// laneLeaders: array of { lane, leaders: MetaTrendHero[] }
if (Array.isArray(data.laneLeaders)) {
  data.laneLeaders = data.laneLeaders.map((group) => ({
    ...group,
    leaders: (group.leaders || []).map(stripHistory),
  }));
}

// roleMovers: array of { role, topWinRate: [], rising: [], mostPicked: [] }
if (Array.isArray(data.roleMovers)) {
  data.roleMovers = data.roleMovers.map((mover) => ({
    ...mover,
    topWinRate: (mover.topWinRate || []).map(stripHistory),
    rising: (mover.rising || []).map(stripHistory),
    mostPicked: (mover.mostPicked || []).map(stripHistory),
  }));
}

const output = JSON.stringify(data, null, 2);
fs.writeFileSync(FILE, output, 'utf-8');
const afterKB = (Buffer.byteLength(output) / 1024).toFixed(1);

console.log(`meta-trends.json: ${beforeKB} KB → ${afterKB} KB (saved ${(beforeKB - afterKB).toFixed(1)} KB, ${((1 - afterKB / beforeKB) * 100).toFixed(1)}%)`);
