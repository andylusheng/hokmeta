const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const heroes = JSON.parse(
  fs.readFileSync(path.join(root, 'data', 'heroes.json'), 'utf8')
);
const itemsPath = path.join(root, 'data', 'items.json');
const items = fs.existsSync(itemsPath)
  ? JSON.parse(fs.readFileSync(itemsPath, 'utf8'))
  : [];

const outDir = path.join(root, 'public', 'api', 'heroes');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(root, 'public', 'api', 'heroes.json'),
  JSON.stringify(heroes, null, 2)
);
fs.writeFileSync(
  path.join(root, 'public', 'api', 'items.json'),
  JSON.stringify(items, null, 2)
);

function toolBuildItems(build = []) {
  return build.map((entry) => ({ itemId: entry.itemId ?? null }));
}

function toolBuildPresets(builds = []) {
  return builds.map((preset) => ({
    id: preset.id,
    label: preset.label,
    items: toolBuildItems(preset.items),
  }));
}

const toolData = {
  heroes: heroes.map((hero) => ({
    slug: hero.slug,
    name: hero.name,
    nameZh: hero.nameZh ?? null,
    role: hero.role,
    lane: hero.lane ?? null,
    tier: hero.tier,
    winRate: hero.winRate ?? null,
    pickRate: hero.pickRate ?? null,
    banRate: hero.banRate ?? null,
    counters: hero.counters ?? [],
    counteredBy: hero.counteredBy ?? [],
    avatar: hero.avatar,
    avatarFallback: hero.avatarFallback ?? null,
    skills: (hero.skills ?? []).map((skill) => ({ slot: skill.slot, icon: skill.icon })),
    skillsZh: (hero.skillsZh ?? []).map((skill) => ({ slot: skill.slot, icon: skill.icon })),
    build: toolBuildItems(hero.build),
    buildZh: toolBuildItems(hero.buildZh),
    builds: toolBuildPresets(hero.builds),
    buildsZh: toolBuildPresets(hero.buildsZh),
  })),
  items: items.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    nameZh: item.nameZh ?? null,
    description: item.description,
    descriptionZh: item.descriptionZh ?? null,
    icon: item.icon,
    type: item.type ?? null,
    level: item.level ?? null,
    passiveSkills: item.passiveSkills ?? [],
    passiveSkillsZh: item.passiveSkillsZh ?? [],
  })),
};

fs.writeFileSync(
  path.join(root, 'public', 'api', 'tools.json'),
  JSON.stringify(toolData)
);

for (const hero of heroes) {
  fs.writeFileSync(
    path.join(outDir, `${hero.slug}.json`),
    JSON.stringify(hero, null, 2)
  );
}

console.log('API JSON copied to public/api/');
