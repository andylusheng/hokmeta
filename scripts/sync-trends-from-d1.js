/**
 * Generate user-facing meta trend data from Cloudflare D1 snapshots.
 *
 * Output:
 *   - data/meta-trends.json
 *   - public/api/trends/latest.json
 *
 * Usage:
 *   node scripts/sync-trends-from-d1.js
 *   D1_DATABASE_NAME=hokmeta-heroes node scripts/sync-trends-from-d1.js
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const D1_NAME = process.env.D1_DATABASE_NAME || 'hokmeta-heroes';
const OUT_DATA = path.join(ROOT, 'data', 'meta-trends.json');
const OUT_API = path.join(ROOT, 'public', 'api', 'trends', 'latest.json');
const HEROES_PATH = path.join(ROOT, 'data', 'heroes.json');

const QUERY = `
SELECT
  hero_slug,
  hero_name,
  role,
  tier,
  snapshot_date,
  win_rate,
  pick_rate,
  ban_rate
FROM hero_daily_snapshot
ORDER BY snapshot_date ASC, hero_slug ASC
`;

const heroesData = JSON.parse(fs.readFileSync(HEROES_PATH, 'utf8'));
const heroesBySlug = new Map(heroesData.map((hero) => [hero.slug, hero]));

function runD1Query(query) {
  const wrangler = path.join(ROOT, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  const result = spawnSync(
    process.execPath,
    [
      wrangler,
      'd1',
      'execute',
      D1_NAME,
      '--remote',
      '--command',
      query,
      '--json',
    ],
    {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 20,
    }
  );

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error([result.stdout, result.stderr].filter(Boolean).join('\n'));
  }

  const payload = JSON.parse(result.stdout);
  return payload[0]?.results ?? [];
}

function toDate(value) {
  return new Date(`${value}T00:00:00Z`);
}

function daysBetween(a, b) {
  return Math.round((toDate(a).getTime() - toDate(b).getTime()) / 86400000);
}

function pct(value) {
  if (value == null || Number.isNaN(Number(value))) return null;
  return Number(Number(value).toFixed(2));
}

function delta(current, previous) {
  if (current == null || previous == null) return null;
  return Number((Number(current) - Number(previous)).toFixed(2));
}

function nearestDateAtOrBefore(dates, latestDate, daysBack) {
  const target = new Date(toDate(latestDate).getTime() - daysBack * 86400000);
  const targetText = target.toISOString().slice(0, 10);
  const candidates = dates.filter((date) => date <= targetText);
  return candidates[candidates.length - 1] ?? dates[0];
}

function groupByDate(rows) {
  const grouped = new Map();
  for (const row of rows) {
    if (!grouped.has(row.snapshot_date)) grouped.set(row.snapshot_date, []);
    grouped.get(row.snapshot_date).push(row);
  }
  return grouped;
}

function groupBySlug(rows) {
  const grouped = new Map();
  for (const row of rows) {
    if (!grouped.has(row.hero_slug)) grouped.set(row.hero_slug, []);
    grouped.get(row.hero_slug).push(row);
  }
  return grouped;
}

function indexBySlug(rows) {
  return new Map(rows.map((row) => [row.hero_slug, row]));
}

function normalizeLane(lane) {
  if (!lane) return null;
  const text = String(lane).trim();
  if (text === 'Clash Lane') return 'Clash';
  if (text === 'Jungling' || text === 'Jungle') return 'Jungle';
  if (text === 'Mid Lane' || text === 'Mid') return 'Mid';
  if (text === 'Farm Lane') return 'Farm';
  if (text === 'Roaming' || text === 'Roam') return 'Roam';
  return text;
}

function buildHistory(rows, startDate) {
  return rows
    .filter((row) => row.snapshot_date >= startDate)
    .map((row) => ({
      date: row.snapshot_date,
      winRate: pct(row.win_rate),
      pickRate: pct(row.pick_rate),
      banRate: pct(row.ban_rate),
    }));
}

function buildEntry(current, seven, thirty, history30d) {
  const heroMeta = heroesBySlug.get(current.hero_slug);
  return {
    slug: current.hero_slug,
    name: current.hero_name,
    role: current.role,
    lane: normalizeLane(heroMeta?.lane),
    tier: current.tier,
    winRate: pct(current.win_rate),
    pickRate: pct(current.pick_rate),
    banRate: pct(current.ban_rate),
    delta7d: {
      winRate: delta(current.win_rate, seven?.win_rate),
      pickRate: delta(current.pick_rate, seven?.pick_rate),
      banRate: delta(current.ban_rate, seven?.ban_rate),
    },
    delta30d: {
      winRate: delta(current.win_rate, thirty?.win_rate),
      pickRate: delta(current.pick_rate, thirty?.pick_rate),
      banRate: delta(current.ban_rate, thirty?.ban_rate),
    },
    history30d,
  };
}

function hasNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function top(entries, getValue, limit, filter = () => true) {
  return entries
    .filter((entry) => hasNumber(getValue(entry)) && filter(entry))
    .sort((a, b) => getValue(b) - getValue(a))
    .slice(0, limit);
}

function bottom(entries, getValue, limit, filter = () => true) {
  return entries
    .filter((entry) => hasNumber(getValue(entry)) && filter(entry))
    .sort((a, b) => getValue(a) - getValue(b))
    .slice(0, limit);
}

function roleMovers(entries) {
  const roles = [...new Set(entries.map((entry) => entry.role).filter(Boolean))].sort();
  return roles.map((role) => {
    const roleEntries = entries.filter((entry) => entry.role === role);
    return {
      role,
      topWinRate: top(roleEntries, (entry) => entry.winRate, 3),
      rising: top(roleEntries, (entry) => entry.delta7d.winRate, 3),
      mostPicked: top(roleEntries, (entry) => entry.pickRate, 3),
    };
  });
}

function laneLeaders(entries) {
  const lanes = ['Clash', 'Jungle', 'Mid', 'Farm', 'Roam'];
  return lanes
    .map((lane) => {
      const laneEntries = entries.filter((entry) => entry.lane === lane);
      return {
        lane,
        leaders: top(laneEntries, (entry) => entry.winRate, 5, (entry) => (entry.pickRate ?? 0) >= 0.35),
      };
    })
    .filter((group) => group.leaders.length > 0);
}

function buildContentIdeas(trends) {
  const ideas = [];
  for (const hero of trends.topWinRate.slice(0, 3)) {
    ideas.push({
      title: `Is ${hero.name} the best ${hero.role} this week?`,
      angle: `${hero.name} leads the current win-rate board at ${hero.winRate}%. Build the article around why the pick works, when to avoid it, and which counters matter.`,
      primaryUrl: `/hero/${hero.slug}/`,
    });
  }
  for (const hero of trends.sleeperPicks.slice(0, 3)) {
    ideas.push({
      title: `${hero.name} looks underrated in Honor of Kings Global`,
      angle: `${hero.name} has a strong win rate (${hero.winRate}%) with low pick pressure (${hero.pickRate}%). This is useful for a sleeper-pick post.`,
      primaryUrl: `/hero/${hero.slug}/`,
    });
  }
  for (const hero of trends.mostBanned.slice(0, 2)) {
    ideas.push({
      title: `Why players keep banning ${hero.name}`,
      angle: `${hero.name} has one of the highest ban rates this week (${hero.banRate}%). Use this for a counter-focused article.`,
      primaryUrl: `/hero/${hero.slug}/counters/`,
    });
  }
  return ideas;
}

function buildTrends(rows) {
  if (!rows.length) throw new Error('No D1 rows returned from hero_daily_snapshot');

  const byDate = groupByDate(rows);
  const dates = [...byDate.keys()].sort();
  const latestDate = dates[dates.length - 1];
  const sevenDayDate = nearestDateAtOrBefore(dates, latestDate, 7);
  const thirtyDayDate = nearestDateAtOrBefore(dates, latestDate, 30);

  const latestRows = byDate.get(latestDate);
  const sevenRows = indexBySlug(byDate.get(sevenDayDate) ?? []);
  const thirtyRows = indexBySlug(byDate.get(thirtyDayDate) ?? []);
  const bySlug = groupBySlug(rows);
  const entries = latestRows.map((row) =>
    buildEntry(
      row,
      sevenRows.get(row.hero_slug),
      thirtyRows.get(row.hero_slug),
      buildHistory(bySlug.get(row.hero_slug) ?? [], thirtyDayDate)
    )
  );

  const minPickForTrust = 0.5;
  const minPickForSleeper = 0.15;

  const trends = {
    generatedAt: new Date().toISOString(),
    source: {
      database: D1_NAME,
      table: 'hero_daily_snapshot',
      note: 'Camp HOK international snapshot data synced by HOKMeta.',
    },
    latestDate,
    comparisonDates: {
      sevenDay: sevenDayDate,
      thirtyDay: thirtyDayDate,
    },
    coverage: {
      trackedDays: dates.length,
      totalRows: rows.length,
      latestHeroCount: latestRows.length,
      daysCompared7d: daysBetween(latestDate, sevenDayDate),
      daysCompared30d: daysBetween(latestDate, thirtyDayDate),
    },
    allHeroes: entries,
    topWinRate: top(entries, (entry) => entry.winRate, 10, (entry) => (entry.pickRate ?? 0) >= minPickForTrust),
    lowestWinRate: bottom(entries, (entry) => entry.winRate, 10, (entry) => (entry.pickRate ?? 0) >= minPickForTrust),
    mostPicked: top(entries, (entry) => entry.pickRate, 10),
    mostBanned: top(entries, (entry) => entry.banRate, 10),
    risingWinRate: top(entries, (entry) => entry.delta7d.winRate, 10, (entry) => (entry.pickRate ?? 0) >= minPickForTrust),
    risingPickRate: top(entries, (entry) => entry.delta7d.pickRate, 10),
    risingBanRate: top(entries, (entry) => entry.delta7d.banRate, 10),
    fallingWinRate: bottom(entries, (entry) => entry.delta7d.winRate, 10, (entry) => (entry.pickRate ?? 0) >= minPickForTrust),
    sleeperPicks: top(
      entries,
      (entry) => (entry.winRate ?? 0) - (entry.pickRate ?? 0) * 0.35,
      10,
      (entry) =>
        (entry.winRate ?? 0) >= 51 &&
        (entry.pickRate ?? 0) >= minPickForSleeper &&
        (entry.pickRate ?? 0) < 1.5
    ),
    overratedPicks: top(
      entries,
      (entry) => (entry.pickRate ?? 0) - Math.max((entry.winRate ?? 0) - 50, 0),
      10,
      (entry) => (entry.pickRate ?? 0) >= 1.5 && (entry.winRate ?? 0) < 50.5
    ),
    laneLeaders: laneLeaders(entries),
    roleMovers: roleMovers(entries),
  };

  return {
    ...trends,
    contentIdeas: buildContentIdeas(trends),
  };
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function main() {
  console.log(`Reading ${D1_NAME}.hero_daily_snapshot from Cloudflare D1...`);
  const rows = runD1Query(QUERY);
  const trends = buildTrends(rows);
  writeJson(OUT_DATA, trends);
  writeJson(OUT_API, trends);
  console.log(
    `Generated trends: ${trends.latestDate}, ${trends.coverage.latestHeroCount} heroes, ${trends.coverage.trackedDays} days`
  );
  console.log(`- ${path.relative(ROOT, OUT_DATA)}`);
  console.log(`- ${path.relative(ROOT, OUT_API)}`);
}

main();
