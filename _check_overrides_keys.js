const fs = require('fs');

// Check current file
const c = fs.readFileSync('src/lib/counter-rationale-overrides.ts', 'utf8');
const re = /^\s*('(\S+)'|(\w+))\s*:\s*\{/gm;
const keyNames = [];
let m;
while ((m = re.exec(c)) !== null) {
  keyNames.push(m[2] || m[3]);
}

let out = '=== CURRENT FILE ===\n';
out += 'Keys found: ' + keyNames.length + '\n';
out += 'Lines: ' + c.split('\n').length + '\n';
out += 'Chars: ' + c.length + '\n';
keyNames.forEach(k => { out += '  - ' + k + '\n'; });

// Check for playstyle/metaTrend
out += '\n=== FIELD CHECK ===\n';
keyNames.forEach(k => {
  const escKey = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keyRe = new RegExp('\\b' + escKey + '\\s*:\\s*\\{');
  const idx = c.search(keyRe);
  if (idx < 0) { out += '  ' + k + ': NOT FOUND\n'; return; }
  const chunk = c.substring(idx, idx + 3000);
  const hp = chunk.includes('playstyle:');
  const hmt = chunk.includes('metaTrend:');
  const hbc = chunk.includes('bestCounter:');
  const hcd = chunk.includes('counterDetails:');
  out += '  ' + k + ': playstyle=' + hp + ' metaTrend=' + hmt + ' bestCounter=' + hbc + ' counterDetails=' + hcd + '\n';
});

// Check git original
let gitKeys = [];
if (fs.existsSync('_git_original.ts')) {
  const g = fs.readFileSync('_git_original.ts', 'utf8');
  out += '\n=== GIT ORIGINAL ===\n';
  out += 'Size: ' + g.length + ' chars\n';
  out += 'First 100 chars: ' + g.substring(0, 100) + '\n';
  const gre = /^\s*('(\S+)'|(\w+))\s*:\s*\{/gm;
  let gm;
  while ((gm = gre.exec(g)) !== null) {
    gitKeys.push(gm[2] || gm[3]);
  }
  out += 'Keys found: ' + gitKeys.length + '\n';
  gitKeys.forEach(k => { out += '  - ' + k + '\n'; });
}

// Compare
out += '\n=== COMPARISON ===\n';
const currentSet = new Set(keyNames);
const gitSet = new Set(gitKeys);
const inGitNotCurrent = gitKeys.filter(k => !currentSet.has(k));
const inCurrentNotGit = keyNames.filter(k => !gitSet.has(k));
out += 'In git but NOT in current: ' + (inGitNotCurrent.length ? inGitNotCurrent.join(', ') : 'none') + '\n';
out += 'In current but NOT in git: ' + (inCurrentNotGit.length ? inCurrentNotGit.join(', ') : 'none') + '\n';

fs.writeFileSync('_check_output.txt', out, 'utf8');
console.log('Output written to _check_output.txt');
