/**
 * generate-og-images.js
 * Generates per-hero OG card SVGs (1200×630) into public/og/heroes/[slug].svg
 * Run: node scripts/generate-og-images.js
 */
const fs = require('fs');
const path = require('path');

const heroes = require('../data/heroes-index.json');
const OUT_DIR = path.join(__dirname, '..', 'public', 'og', 'heroes');

fs.mkdirSync(OUT_DIR, { recursive: true });

const TIER_COLORS = {
  'S+': '#ff4d4f',
  S: '#ff7a45',
  A: '#c9a227',
  B: '#36cfc9',
  C: '#73d13d',
  D: '#8c8c8c',
};

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateCard(hero) {
  const tierColor = TIER_COLORS[hero.tier] || '#8c8c8c';
  const wr = hero.winRate != null ? `${hero.winRate.toFixed(1)}%` : 'N/A';
  const pr = hero.pickRate != null ? `${hero.pickRate.toFixed(1)}%` : 'N/A';
  const name = escapeXml(hero.name);
  const role = escapeXml(hero.role || '');
  const lane = escapeXml(hero.lane || '');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f1419"/>
      <stop offset="100%" stop-color="#1a2332"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="30" y="30" width="1140" height="570" rx="20" fill="none" stroke="${tierColor}" stroke-width="3" opacity="0.6"/>
  <!-- Tier badge -->
  <rect x="60" y="60" width="90" height="90" rx="12" fill="${tierColor}" opacity="0.15"/>
  <text x="105" y="120" font-family="system-ui,sans-serif" font-size="48" font-weight="800" fill="${tierColor}" text-anchor="middle">${escapeXml(hero.tier)}</text>
  <!-- Hero name -->
  <text x="180" y="105" font-family="system-ui,sans-serif" font-size="56" font-weight="700" fill="#ffffff">${name}</text>
  <text x="180" y="145" font-family="system-ui,sans-serif" font-size="28" fill="#9ca3af">${role}${lane ? ' · ' + lane : ''}</text>
  <!-- Stats row -->
  <text x="60" y="280" font-family="system-ui,sans-serif" font-size="24" fill="#9ca3af">WIN RATE</text>
  <text x="60" y="330" font-family="system-ui,sans-serif" font-size="52" font-weight="700" fill="#ffffff">${wr}</text>
  <text x="320" y="280" font-family="system-ui,sans-serif" font-size="24" fill="#9ca3af">PICK RATE</text>
  <text x="320" y="330" font-family="system-ui,sans-serif" font-size="52" font-weight="700" fill="#ffffff">${pr}</text>
  <text x="580" y="280" font-family="system-ui,sans-serif" font-size="24" fill="#9ca3af">TIER</text>
  <text x="580" y="330" font-family="system-ui,sans-serif" font-size="52" font-weight="700" fill="${tierColor}">${escapeXml(hero.tier)}</text>
  <!-- CTA -->
  <text x="60" y="460" font-family="system-ui,sans-serif" font-size="30" fill="#c9a227">Best Build · Counters · Guide</text>
  <!-- Branding -->
  <text x="60" y="560" font-family="system-ui,sans-serif" font-size="26" fill="#6b7280">hokmeta.com — Honor of Kings Global Stats</text>
  <text x="1140" y="560" font-family="system-ui,sans-serif" font-size="22" fill="#4b5563" text-anchor="end">Camp HOK Data</text>
</svg>`;
}

let count = 0;
for (const hero of heroes) {
  if (!hero.slug) continue;
  const svg = generateCard(hero);
  fs.writeFileSync(path.join(OUT_DIR, `${hero.slug}.svg`), svg, 'utf-8');
  count++;
}

console.log(`✓ Generated ${count} OG cards in public/og/heroes/`);
