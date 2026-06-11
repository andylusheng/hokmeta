/**
 * Read data/heroes.json and upsert daily metrics into Cloudflare D1 (remote).
 *
 * Prereqs:
 *   - npm run sync-camp (heroes.json up to date)
 *   - wrangler.toml with [[d1_databases]]
 *   - npx wrangler login  OR  CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
 *   - Remote D1 tables: hero_daily_snapshot, sync_runs (optional)
 *
 * Usage:
 *   node scripts/snapshot-to-d1.js
 *   D1_DATABASE_NAME=hokmeta-heroes node scripts/snapshot-to-d1.js
 *   SNAPSHOT_DATE=2026-06-09 node scripts/snapshot-to-d1.js
 *   D1_LOCAL=1 node scripts/snapshot-to-d1.js   # write to local D1 (dev only)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const HEROES_PATH = path.join(ROOT, 'data', 'heroes.json');
const D1_NAME = process.env.D1_DATABASE_NAME || 'hokmeta-heroes';
const SNAPSHOT_DATE =
  process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10);
const USE_REMOTE = process.env.D1_LOCAL !== '1';

function sqlStr(value) {
  if (value == null || value === '') return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlNum(value) {
  if (value == null || value === '' || Number.isNaN(Number(value))) return 'NULL';
  return String(Number(value));
}

function runWranglerD1(sqlFile) {
  const args = ['wrangler', 'd1', 'execute', D1_NAME, '--file', sqlFile];
  if (USE_REMOTE) args.push('--remote');

  const result = spawnSync('npx', args, {
    cwd: ROOT,
    env: { ...process.env },
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    const err = [result.stdout, result.stderr].filter(Boolean).join('\n');
    throw new Error(`wrangler d1 execute failed:\n${err}`);
  }
  return result.stdout || '';
}

function buildHeroSnapshotSql(heroes) {
  const lines = [];

  for (const hero of heroes) {
    const heroId = hero.id || hero.slug || '';
    const heroSlug = hero.slug || hero.id || '';
    const heroName = hero.name || '';

    lines.push(`
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  ${sqlStr(heroId)},
  ${sqlStr(heroSlug)},
  ${sqlStr(heroName)},
  ${sqlStr(SNAPSHOT_DATE)},
  ${sqlNum(hero.winRate)},
  ${sqlNum(hero.pickRate)},
  ${sqlNum(hero.banRate)},
  ${sqlStr(hero.tier)},
  ${sqlStr(hero.role)}
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;`.trim());
  }

  return lines.join('\n');
}

function logSyncRun(status, heroesCount, durationSec, errorMsg) {
  const msg = errorMsg
    ? String(errorMsg).slice(0, 500).replace(/'/g, "''")
    : null;

  const sql = `
INSERT INTO sync_runs (run_date, status, heroes_count, duration_sec, error_msg)
VALUES (
  ${sqlStr(SNAPSHOT_DATE)},
  ${sqlStr(status)},
  ${sqlNum(heroesCount)},
  ${sqlNum(durationSec)},
  ${msg ? `'${msg}'` : 'NULL'}
)
ON CONFLICT(run_date) DO UPDATE SET
  status = excluded.status,
  heroes_count = excluded.heroes_count,
  duration_sec = excluded.duration_sec,
  error_msg = excluded.error_msg,
  created_at = datetime('now');
`.trim();

  const tmp = path.join(ROOT, 'scripts', `.sync-run-${SNAPSHOT_DATE}.sql`);
  fs.writeFileSync(tmp, sql, 'utf8');
  try {
    runWranglerD1(tmp);
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

function main() {
  const started = Date.now();

  if (!fs.existsSync(HEROES_PATH)) {
    console.error(`Missing ${HEROES_PATH} — run: npm run sync-camp`);
    process.exit(1);
  }

  const heroes = JSON.parse(fs.readFileSync(HEROES_PATH, 'utf8'));
  if (!Array.isArray(heroes) || !heroes.length) {
    console.error('heroes.json is empty or invalid');
    process.exit(1);
  }

  const sql = buildHeroSnapshotSql(heroes);
  const tmpFile = path.join(ROOT, 'scripts', `.snapshot-${SNAPSHOT_DATE}.sql`);
  fs.writeFileSync(tmpFile, sql, 'utf8');

  const target = USE_REMOTE ? 'remote' : 'local';
  console.log(
    `Writing ${heroes.length} heroes to D1 (${D1_NAME}, ${target}) for ${SNAPSHOT_DATE}...`
  );

  try {
    const out = runWranglerD1(tmpFile);
    if (out.trim()) console.log(out.trim());

    const durationSec = Math.round((Date.now() - started) / 1000);

    try {
      logSyncRun('success', heroes.length, durationSec, null);
    } catch (logErr) {
      console.warn('sync_runs log skipped:', logErr.message);
    }

    console.log(`Done: ${heroes.length} heroes saved for ${SNAPSHOT_DATE} (${durationSec}s)`);
  } catch (err) {
    const durationSec = Math.round((Date.now() - started) / 1000);
    try {
      logSyncRun('failed', heroes.length, durationSec, err.message);
    } catch (_) {
      /* ignore */
    }
    console.error(err.message);
    process.exit(1);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}

main();