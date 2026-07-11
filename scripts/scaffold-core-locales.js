const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sourceRoot = path.join(root, 'src', 'app', 'zh-TW');
const locales = ['id', 'fil'];
const excludedDirs = new Set(['learn']);

const replacements = {
  id: [
    ['王者榮耀 Global 本週 Meta 報告', 'Honor of Kings Weekly Meta Report'],
    [
      '根據勝率、出場率、禁用率與 D1 趨勢資料整理的王者榮耀 Global 本週 Meta 報告。',
      'Ringkasan win rate, pick rate, ban rate, dan tren D1 untuk Honor of Kings Global.',
    ],
    ['王者榮耀版本調整 — HOKMeta', 'Catatan Patch Honor of Kings - HOKMeta'],
    ['Camp HOK 國際服英雄平衡與版本資訊。', 'Update patch dan balance hero Honor of Kings Global dari Camp HOK.'],
    ["['王者榮耀版本', '英雄調整', '平衡性']", "['Honor of Kings patch', 'HOK patch notes', 'Honor of Kings hero balance']"],
    ['王者荣耀伤害计算器', 'Honor of Kings damage calculator'],
    ['HOK 防御公式', 'HOK defense formula'],
  ],
  fil: [
    ['王者榮耀 Global 本週 Meta 報告', 'Honor of Kings Weekly Meta Report'],
    [
      '根據勝率、出場率、禁用率與 D1 趨勢資料整理的王者榮耀 Global 本週 Meta 報告。',
      'Weekly win rate, pick rate, ban rate, and trend summary for Honor of Kings Global.',
    ],
    ['王者榮耀版本調整 — HOKMeta', 'Honor of Kings Patch Notes - HOKMeta'],
    [
      'Camp HOK 國際服英雄平衡與版本資訊。',
      'Patch updates and hero balance notes for Honor of Kings Global from Camp HOK.',
    ],
    ["['王者榮耀版本', '英雄調整', '平衡性']", "['Honor of Kings patch', 'HOK patch notes', 'Honor of Kings hero balance']"],
    ['王者荣耀伤害计算器', 'Honor of Kings damage calculator'],
    ['HOK 防御公式', 'HOK defense formula'],
  ],
};

function localizeCopiedText(text, locale) {
  return replacements[locale].reduce(
    (next, [from, to]) => next.split(from).join(to),
    text.replace(/zh-TW/g, locale)
  );
}

function copyDir(source, target, locale) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirs.has(entry.name)) continue;
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath, locale);
      continue;
    }
    if (!entry.isFile()) continue;
    const text = localizeCopiedText(fs.readFileSync(sourcePath, 'utf8'), locale);
    fs.writeFileSync(targetPath, text);
  }
}

for (const locale of locales) {
  copyDir(sourceRoot, path.join(root, 'src', 'app', locale), locale);
}
