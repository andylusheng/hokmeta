const fs = require('fs');
const filePath = 'd:/github/hokmeta/src/lib/counter-rationale-overrides.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Find the duplicated new entries block - starts at the first NEW added entry
// The new entries are ALL quoted and were appended before the closing };
// They start after the last original entry. Let me find where they begin.

// Original entries end with donghuang's closing. New entries start after that.
// Search for the pattern: 2 blank lines then new entries
const lines = content.split('\n');
let newEntriesStart = -1;

// Find where the new section begins (look for first occurrence of commented-out or 
// the point where original non-quoted entries end and quoted ones begin)
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes("'angela': {")) {
    // This is the first new entry. Go back to find the start of this section.
    while (i > 0 && lines[i-1].trim() !== '') {
      i--;
    }
    newEntriesStart = i;
    break;
  }
}

if (newEntriesStart === -1) {
  console.log('New entries not found - nothing to do.');
  process.exit(0);
}

// Extract the new entries block
const newBlock = lines.slice(newEntriesStart, lines.length - 1).join('\n');
console.log('New entries start at line', newEntriesStart + 1);
console.log('New block length:', newBlock.length, 'chars');

// Parse the new entries to extract counterDetails per hero
const newEntries = {};
const entryRegex = /'([^']+)':\s*\{([\s\S]*?)\n  \},/g;
let m;
while ((m = entryRegex.exec(newBlock)) !== null) {
  newEntries[m[1]] = {
    bestCounter: m[2].match(/bestCounter:\s*\{[\s\S]*?\n    \},/)?.[0] || '',
    counterDetails: m[2].match(/counterDetails:\s*\[[\s\S]*?\n    \],/)?.[0] || ''
  };
}

console.log('Extracted counter data for:', Object.keys(newEntries).join(', '));

// Now insert counterDetails into the ORIGINAL unquoted entries
Object.entries(newEntries).forEach(([slug, data]) => {
  // Find original entry (unquoted) - e.g., "  dun: {"
  const pattern = new RegExp(`\\n  ${slug}:\\s*\\{`);
  const match = pattern.exec(content);
  if (!match) {
    console.log(`  SKIP ${slug}: no unquoted entry found`);
    return;
  }
  
  const insertPos = match.index + match[0].length;
  
  // Build insert block
  let insert = '\n' + data.bestCounter.split('\n').map(l => '    ' + l.trim()).join('\n');
  insert += '\n' + data.counterDetails.split('\n').map(l => '    ' + l.trim()).join('\n');
  
  // Insert after the opening brace
  content = content.slice(0, insertPos) + insert + content.slice(insertPos);
  console.log(`  MERGED ${slug}`);
});

// Now remove the duplicated new entries block
const newStartPos = content.indexOf('\n\n  \'angela\':');
if (newStartPos > 0) {
  // Find the closing }; that follows
  const closingPos = content.lastIndexOf('\n};');
  content = content.slice(0, newStartPos) + '\n' + content.slice(closingPos);
  console.log('Removed duplicated new entries block');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('\nDone! Merged all counterDetails into existing entries.');
