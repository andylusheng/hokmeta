/**
 * Persist Musashi playbook fields into heroes.json (template hero).
 */
const fs = require('fs');
const path = require('path');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));
const musashi = heroes.find((h) => h.slug === 'musashi');
if (!musashi?.guide) {
  console.error('Musashi not found');
  process.exit(1);
}

Object.assign(musashi.guide, {
  hook:
    'Dual-blade jungler who stacks Vigor with skills, then cashes it in on enhanced basic attacks for burst, slow, and kill pressure.',
  bestBuild:
    'Jungle: Rapacious Bite → Boots of Resistance → Axe of Torment → Frostscar\'s Embrace → Succubus Cloak → Cuirass of Savagery. Skill 2 max first for gank tempo.',
  arcanaSpells:
    'Mutation arcana for assassin burst on Vigor autos. Smite standard; Purify vs heavy CC.',
  combo:
    'Gank: Extreme Speed → AA (2× Vigor) → Illuminating Slash → Duel to the Death → chase.',
  skillOrder: {
    priority: 'Skill 2 → Skill 1 → Ultimate (max Skill 2 first)',
    reason:
      'Extreme Speed is your gap-close, shield, and trade tool—max it first for safer ganks. Illuminating Slash second for range, wave clear, and projectile block. Take Ultimate whenever available.',
  },
  combos: [
    {
      id: 'gank',
      name: 'Lv4 river gank',
      steps:
        'Skill 2 (dash) → AA with 2× Vigor → Skill 1 → Ultimate → chase with autos',
      when: 'Enemy flash down; crash wave with laner first',
    },
    {
      id: 'burst',
      name: 'Carry delete',
      steps:
        'Skill 1 (line) → Skill 2 → AA (Vigor slow) → Ultimate → AA resets',
      when: 'After ally CC; target has no cleanse',
    },
    {
      id: 'escape',
      name: 'Disengage',
      steps: 'Skill 1 (block projectiles) → Skill 2 out → jungle camp for Vigor',
      when: 'Dive failed or Dyadia/Sun Bin peel arrives',
    },
  ],
  itemNotes: [
    { slot: 1, why: 'Rapacious Bite — jungle core; camp stacks boost PATK for faster clears and duels.' },
    { slot: 2, why: 'Boots of Resistance — CC reduction keeps you casting through peel attempts.' },
    { slot: 3, why: 'Axe of Torment — anti-squishy spike once Smite levels are online.' },
    { slot: 4, why: "Frostscar's Embrace — slows on enhanced autos stick to fleeing carries." },
    { slot: 5, why: 'Succubus Cloak — magic shield vs burst mages during dive windows.' },
    { slot: 6, why: 'Cuirass of Savagery — late bruiser item to survive focus after assassination.' },
  ],
  arcanaRows: [
    { slot: 'Set', rune: 'Mutation', effect: 'Assassin scaling for Vigor-enhanced basic attacks and burst windows.' },
    { slot: 'Spell', rune: 'Smite', effect: 'Standard jungle clear; swap Purify vs heavy hard-CC drafts.' },
  ],
  laning:
    'Full clear to level four with Vigor management—never gank at half health. Secure Tyrant when bot/mid has crash wave; prioritize the lane without Flash.',
  teamfight:
    'Wait for hard CC, then Duel to the Death the carry. Use Illuminating Slash to block key projectiles before diving. Exit with Skill 2 if anti-heal does not secure the kill.',
});

fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2) + '\n');
console.log('Patched Musashi guide playbook fields.');
