var fs = require('fs');
var c = fs.readFileSync('src/lib/counter-rationale-overrides.ts', 'utf8');
var out = [];
var lines = c.split('\n');
var keys = [];
lines.forEach(function(l) {
  var m = l.match(/^\s{2}'([a-z][a-z0-9-]*)': \{/);
  if (m) keys.push(m[1]);
});
var uq = [];
keys.forEach(function(k) { if (uq.indexOf(k) === -1) uq.push(k); });
out.push('Keys found: ' + uq.length);
uq.forEach(function(k) { out.push(k); });
out.push('Total lines: ' + lines.length);
fs.writeFileSync('_check_keys_output.txt', out.join('\n'), 'utf8');
console.log('done');
