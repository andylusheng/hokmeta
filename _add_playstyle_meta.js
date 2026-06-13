// Add playstyle + metaTrend to existing overrides that lack them
const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, 'src/lib/counter-rationale-overrides.ts');
let content = fs.readFileSync(TARGET, 'utf8');

const additions = require('./_playstyle_meta_additions.json');

let modified = 0;
for (const [slug, data] of Object.entries(additions)) {
  // Find the hero's override block
  // Pattern: "'slug': {\n    bestCounter:" or "'slug': {\n    counterDetails:"
  const heroPattern = "'" + slug + "': {";
  const idx = content.indexOf(heroPattern);
  if (idx === -1) {
    console.log('NOT FOUND:', slug);
    continue;
  }

  // Check if already has playstyle
  const afterBrace = content.substring(idx + heroPattern.length, idx + heroPattern.length + 50);
  if (afterBrace.includes('playstyle')) {
    console.log('SKIP (has playstyle):', slug);
    continue;
  }

  // Find the insertion point: right after the opening "{"
  const insertIdx = idx + heroPattern.length;

  // Insert playstyle block
  const playstyleBlock = '\n    playstyle: ' + JSON.stringify(data.playstyle, null, 6)
    .replace(/"([^"]+)":/g, '$1:')
    + ',';

  // Now also insert metaTrend — find the bestCounter? block end or counterDetails end
  // We'll insert it after bestCounter if exists, or after counterDetails
  // Search for "metaTrend:" to check if it exists
  // Find the search region (next 3000 chars after the hero key)
  const searchRegion = content.substring(idx, idx + 5000);
  if (searchRegion.includes('metaTrend:')) {
    console.log('SKIP (has metaTrend):', slug);
    // Still need to insert playstyle if not present
  }

  // Insert playstyle right after "{"
  content = content.slice(0, insertIdx + 1) + playstyleBlock + content.slice(insertIdx + 1);

  // Now insert metaTrend after bestCounter or counterDetails
  // Recalculate positions since we've modified content
  const newIdx = content.indexOf(heroPattern);
  const newSearch = content.substring(newIdx, newIdx + 8000);

  // Find where to insert metaTrend — after "bestCounter: {" block or "counterDetails" block
  // Let's insert it after "bestCounter" closing (or after counterDetails if no bestCounter)
  const bestCounterEnd = findBlockEnd(newSearch, 'bestCounter');
  const counterDetailsEnd = findBlockEnd(newSearch, 'counterDetails');

  let metaInsertPoint;
  if (bestCounterEnd !== -1) {
    metaInsertPoint = newIdx + bestCounterEnd;
  } else if (counterDetailsEnd !== -1) {
    metaInsertPoint = newIdx + counterDetailsEnd;
  } else {
    console.log('No insertion point for metaTrend:', slug);
    continue;
  }

  const metaBlock = '\n    metaTrend: ' + JSON.stringify(data.metaTrend, null, 6)
    .replace(/"([^"]+)":/g, '$1:')
    + ',';

  content = content.slice(0, metaInsertPoint) + metaBlock + content.slice(metaInsertPoint);
  console.log('UPDATED:', slug);
  modified++;
}

fs.writeFileSync(TARGET, content, 'utf8');
console.log('\nModified', modified, 'heroes');

function findBlockEnd(str, key) {
  const startMarker = key + ':';
  const idx = str.indexOf(startMarker);
  if (idx === -1) return -1;

  // Find the matching closing brace
  let depth = 0;
  let inBlock = false;
  for (let i = idx + startMarker.length; i < str.length; i++) {
    if (str[i] === '{') { depth++; inBlock = true; }
    if (str[i] === '}') { depth--; }
    if (inBlock && depth === 0) {
      // This is the closing brace of the block
      // Skip trailing whitespace and comma
      let j = i + 1;
      while (j < str.length && (str[j] === ' ' || str[j] === '\n' || str[j] === '\r' || str[j] === ',')) j++;
      return j;
    }
  }
  return -1;
}
