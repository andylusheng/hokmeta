const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'out');
const distDir = path.join(root, 'dist');

if (!fs.existsSync(outDir)) {
  console.error('FATAL: out/ missing after next build');
  process.exit(1);
}

if (!fs.existsSync(path.join(outDir, 'index.html'))) {
  console.error('FATAL: out/index.html missing');
  process.exit(1);
}

fs.cpSync(outDir, distDir, { recursive: true });
console.log('Static export copied: out/ -> dist/ (for Hostinger output dir)');
