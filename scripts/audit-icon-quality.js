/**
 * Audit: valid image bytes (not 404 HTML), min size, avatar fallback misuse.
 */
const fs = require('fs');
const path = require('path');
const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const UA = { 'User-Agent': 'Mozilla/5.0' };

async function fetchMeta(url) {
  if (!url) return { ok: false, len: 0, status: 0 };
  try {
    const r = await fetch(url, { headers: UA });
    const buf = Buffer.from(await r.arrayBuffer());
    const isHtml =
      buf.length < 1200 &&
      (buf.toString('utf8', 0, 80).includes('<') ||
        r.headers.get('content-type')?.includes('text/html'));
    return {
      ok: r.ok && !isHtml && buf.length >= 500,
      len: buf.length,
      status: r.status,
      html: isHtml,
    };
  } catch {
    return { ok: false, len: 0, status: 0 };
  }
}

async function main() {
  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
  const badSkills = [];
  const badBuild = [];

  for (const h of heroes) {
    const av = h.avatarFallback || h.avatar || '';
    for (const s of h.skills || []) {
      const meta = await fetchMeta(s.icon);
      const isAv =
        s.icon === av ||
        (h.tencentId &&
          s.icon?.endsWith(`/${h.tencentId}/${h.tencentId}.jpg`));
      if (!meta.ok || isAv) {
        badSkills.push({
          slug: h.slug,
          slot: s.slot,
          isAv,
          len: meta.len,
          status: meta.status,
          icon: s.icon?.slice(-50),
        });
      }
    }
    for (const b of h.build || []) {
      if (!b.icon || b.name === 'Data unavailable') continue;
      const meta = await fetchMeta(b.icon);
      if (!meta.ok) {
        badBuild.push({
          slug: h.slug,
          name: b.name,
          itemId: b.itemId,
          len: meta.len,
          icon: b.icon,
        });
      }
    }
  }

  console.log(JSON.stringify({ badSkills, badBuild }, null, 2));
}

main();
