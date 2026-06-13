// Batch appends new override entries to counter-rationale-overrides.ts
const fs = require('fs');
const path = require('path');

const TARGET = path.join(__dirname, 'src/lib/counter-rationale-overrides.ts');

// Read current file
let content = fs.readFileSync(TARGET, 'utf8');

// Check if already inserted
const ALREADY_DONE = ['dun', 'kaizer', 'wukong', 'angela', 'daji', 'milady',
  'aoyin', 'augran', 'yaria'];
const pending = ALREADY_DONE.filter(s => !content.includes("'" + s + "': {"));

if (pending.length === 0) {
  console.log('All heroes already inserted!');
  process.exit(0);
}

console.log('Pending heroes:', pending.join(', '));

// Find the closing "};" of OVERRIDES
const closingIdx = content.lastIndexOf('\n};\n');
if (closingIdx === -1) {
  console.error('Could not find closing };');
  process.exit(1);
}

// The new data to insert — replace this section
const newEntries = `\n\n// --- BEGIN BATCH-INSERTED OVERRIDES ---\n${fs.readFileSync(path.join(__dirname, '_overrides_batch.ts'), 'utf8')}\n// --- END BATCH-INSERTED OVERRIDES ---`;

const newContent = content.slice(0, closingIdx + 1) + newEntries + '\n};';

fs.writeFileSync(TARGET, newContent, 'utf8');
console.log('Batch insert complete!');
