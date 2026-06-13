/**
 * 用法: node scripts/generate-counter-prompt.js <hero-slug>
 * 示例: node scripts/generate-counter-prompt.js marco-polo
 *
 * 输出: 可直接复制到 LLM 的完整 prompt（英雄数据已嵌入）
 */

const fs = require('fs');
const path = require('path');

const slug = process.argv[2];
if (!slug) {
  console.error('请提供英雄 slug，例如: node scripts/generate-counter-prompt.js marco-polo');
  process.exit(1);
}

const heroPath = path.join(__dirname, '..', 'public', 'api', 'heroes', `${slug}.json`);
if (!fs.existsSync(heroPath)) {
  console.error(`找不到英雄数据: ${heroPath}`);
  process.exit(1);
}

const hero = JSON.parse(fs.readFileSync(heroPath, 'utf-8'));

// 精简 hero 数据，只保留 prompt 需要的字段
const input = {
  slug: hero.slug,
  name: hero.name,
  nameZh: hero.nameZh,
  role: hero.role,
  rolesZh: hero.rolesZh,
  lane: hero.lane,
  laneZh: hero.laneZh,
  difficulty: hero.difficulty,
  tier: hero.tier,
  winRate: hero.winRate,
  pickRate: hero.pickRate,
  banRate: hero.banRate,
  dataUpdated: hero.dataUpdated,
  skills: hero.skills.map((s) => ({
    slot: s.slot,
    name: s.name,
    description: s.description,
    cooldown: s.cooldown,
  })),
  skillsZh: (hero.skillsZh || []).map((s) => ({
    slot: s.slot,
    name: s.name,
    description: s.description,
    cooldown: s.cooldown,
  })),
  build: (hero.build || []).map((b) => ({ slot: b.slot, name: b.name })),
  buildZh: (hero.buildZh || []).map((b) => ({ slot: b.slot, name: b.name })),
  spells: hero.spells || [],
  spellsZh: hero.spellsZh || [],
  counters: hero.counters || [],
  counteredBy: hero.counteredBy || [],
  metaAnalysis: hero.metaAnalysis || [],
  metaAnalysisZh: hero.metaAnalysisZh || [],
  tips: hero.tips || [],
  tipsZh: hero.tipsZh || [],
  faqs: (hero.faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
  faqsZh: (hero.faqsZh || []).map((f) => ({ question: f.question, answer: f.answer })),
};

const promptPath = path.join(__dirname, 'prompts', 'counter-override-generator.md');
const prompt = fs.readFileSync(promptPath, 'utf-8');

// 替换占位符
const fullPrompt = prompt.replace(
  '{INSERT_HERO_JSON_HERE}',
  JSON.stringify(input, null, 2)
);

console.log(fullPrompt);
