const fs = require('fs');
// Read the file and extract which keys have which fields by scanning
const content = fs.readFileSync('src/lib/counter-rationale-overrides.ts', 'utf8');

const top30 = [
  'hou-yi','luban-no-7','angela','daji','marco-polo','dun','milady',
  'wang-zhaojun','lady-sun','li-xin','xiao-qiao','dolia','kaizer',
  'luara','consort-yu','chicha','erin','aoyin','wukong','arthur',
  'kongming','cai-yan','augran','mozi','garo','lu-bu','yaria',
  'zhang-fei','dyadia','musashi'
];

// Simple heuristic: find hero block and check for fields
function checkHero(slug) {
  var pattern = "'" + slug + "':";
  var idx = content.indexOf(pattern);
  if (idx === -1) return { exists: false };
  
  // Find the block (from this key to the next top-level key)
  // Look for next key - find the next line matching "  'xxx': {" after this position
  var blockStart = idx + pattern.length;
  var nextKeyMatch = content.substring(blockStart).match(/\n  '[a-z]+\w+-\w+|\n  '[a-z]+':/);
  var blockEnd = nextKeyMatch ? blockStart + nextKeyMatch.index + 1 : content.length;
  var block = content.substring(blockStart, blockEnd);
  
  return {
    exists: true,
    hasPlaystyle: block.indexOf('playstyle:') > -1,
    hasMetaTrend: block.indexOf('metaTrend:') > -1,
    hasCounterDetails: block.indexOf('counterDetails:') > -1,
    hasBestCounter: block.indexOf('bestCounter:') > -1,
    counterDetailsCount: (block.match(/hero:\s*'/g) || []).length,
  };
}

console.log('=== TOP30 OVERRIDE COMPLETENESS ===\n');
console.log('HERO               | EXISTS | PLAYSTYLE | METATREND | COUNTERDETAILS | BESTCOUNTER');
console.log('-------------------|--------|-----------|-----------|----------------|------------');

var incomplete = [];
var missing = [];

top30.forEach(function(slug) {
  var r = checkHero(slug);
  var status = r.exists ? '✅' : '❌';
  console.log(
    slug.padEnd(18) + ' | ' +
    status.padEnd(6) + ' | ' +
    (r.exists && r.hasPlaystyle ? '✅' : '❌').padEnd(9) + ' | ' +
    (r.exists && r.hasMetaTrend ? '✅' : '❌').padEnd(9) + ' | ' +
    (r.exists && r.hasCounterDetails ? ('✅(' + r.counterDetailsCount + ')').padEnd(14) : '❌').padEnd(14) + ' | ' +
    (r.exists && r.hasBestCounter ? '✅' : '❌')
  );
  if (!r.exists) {
    missing.push(slug);
  } else if (!r.hasPlaystyle || !r.hasMetaTrend || !r.hasCounterDetails) {
    incomplete.push({
      slug: slug,
      playstyle: r.hasPlaystyle,
      metaTrend: r.hasMetaTrend,
      counterDetails: r.hasCounterDetails,
      bestCounter: r.hasBestCounter,
      cdCount: r.counterDetailsCount
    });
  }
});

console.log('\n=== MISSING (' + missing.length + ') ===');
console.log(missing.join('\n'));

console.log('\n=== INCOMPLETE (' + incomplete.length + ') ===');
incomplete.forEach(function(h) {
  var parts = [];
  if (!h.playstyle) parts.push('playstyle');
  if (!h.metaTrend) parts.push('metaTrend');
  if (!h.counterDetails) parts.push('counterDetails');
  console.log(h.slug + ': missing ' + parts.join(', ') + ' (cdCount=' + h.cdCount + ')');
});
