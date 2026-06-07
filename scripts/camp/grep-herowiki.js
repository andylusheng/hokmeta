const fs = require('fs');
const path = require('path');
const dir = __dirname;
for (const f of fs.readdirSync(dir)) {
  if (!f.startsWith('_bundle-')) continue;
  const js = fs.readFileSync(path.join(dir, f), 'utf8');
  const idx = js.indexOf('herowiki');
  if (idx === -1) continue;
  console.log('\n===', f, '===');
  console.log(js.slice(Math.max(0, idx - 200), idx + 400));
}
