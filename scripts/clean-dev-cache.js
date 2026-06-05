/**
 * Clear Next.js dev cache before start — fixes webpack ENOENT / 500 chunk errors on Windows.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const nextDir = path.join(root, '.next');

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('Removed .next/');
} else {
  console.log('.next/ not present — nothing to clean');
}
