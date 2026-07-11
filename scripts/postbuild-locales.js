const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'out');

const localeLang = {
  'zh-TW': 'zh-Hant',
  id: 'id',
  fil: 'fil-PH',
};

function walkHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

let updated = 0;

for (const [locale, lang] of Object.entries(localeLang)) {
  const localeDir = path.join(outDir, locale);
  for (const file of walkHtmlFiles(localeDir)) {
    const html = fs.readFileSync(file, 'utf8');
    const next = html.replace('<html lang="en">', `<html lang="${lang}">`);
    if (next !== html) {
      fs.writeFileSync(file, next);
      updated += 1;
    }
  }
}

console.log(`Locale HTML lang updated in ${updated} files.`);
