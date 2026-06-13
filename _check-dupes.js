const fs = require('fs');
const c = fs.readFileSync('d:/github/hokmeta/src/lib/counter-rationale-overrides.ts', 'utf-8');
const lines = c.split('\n');

// Check for BOTH quoted and unquoted hero entries
const quoted = [...c.matchAll(/'([a-z0-9-]+)':\s*\{/g)].map(m => m[1]);
const unquoted = [...c.matchAll(/\n  ([a-z][a-z0-9-]+):\s*\{/g)].map(m => m[1]);
const excludeW = ['en', 'zh-TW', 'zh'];
const excluded = unquoted.filter(n => !excludeW.includes(n) && 
  n !== 'counterDetails' && n !== 'bestCounter' && n !== 'tags' && n !== 'reasons' && 
  n !== 'why' && n !== 'mistakes' && n !== 'faqUltimate' && n !== 'faqItems' && 
  n !== 'faqWho' && n !== 'faqHowToLane' && n !== 'faqSeason' && n !== 'playstyle' && 
  n !== 'metaTrend' && n !== 'summary' && n !== 'points' && n !== 'reason');

console.log('Quoted hero entries:', quoted.length);
console.log('Unquoted hero entries:', excluded.length);

// Find entries in both
const both = quoted.filter(q => excluded.includes(q));
if (both.length) {
  console.log('\nDUPLICATE (both quoted and unquoted):', both.join(', '));
  both.forEach(slug => {
    let count = 0;
    lines.forEach((line, i) => {
      if ((line.includes("'" + slug + "':") || line.includes(' ' + slug + ': {')) &&
          !line.includes("zh-TW") && !line.includes('"') && line.includes('{')) {
        count++;
        console.log('  Line ' + (i+1) + ': ' + line.trim().substring(0, 60));
      }
    });
  });
} else {
  console.log('No duplicates found between quoted and unquoted.');
}

// Check unquoted entries that have counterDetails
console.log('\nUnquoted entries without counterDetails:');
excluded.forEach(slug => {
  const entryStart = c.indexOf('\n  ' + slug + ': {');
  if (entryStart === -1) return;
  const nextEntry = c.indexOf('\n  ', entryStart + slug.length + 10);
  const block = c.substring(entryStart, nextEntry > 0 ? nextEntry : c.length);
  const hasCD = block.includes('counterDetails');
  if (!hasCD) console.log('  ' + slug + ' - MISSING counterDetails');
});

// Check NEW quoted entries at end
console.log('\nLAST 30 lines check for duplicates:');
const quotedSlugs = new Set(quoted);
const unquotedSlugs = new Set(excluded);
const inBoth = [...quotedSlugs].filter(s => unquotedSlugs.has(s));
console.log('Heroes appearing in BOTH quoted and unquoted:', inBoth.join(', ') || 'none');
