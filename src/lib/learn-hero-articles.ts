import type { LearnArticle } from '@/lib/learn';
import { heroes } from '@/lib/data';
import {
  getCounterOverride,
  getCounterDetails,
  getBestCounter,
  getPlaystyle,
  getMetaTrend,
} from '@/lib/counter-rationale-overrides';

/* ═══════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════ */

function skills(hero: typeof heroes[number]) {
  return hero.skills;
}

function skillBySlot(hero: typeof heroes[number], slot: string) {
  return skills(hero).find((s) => s.slot === slot);
}

function getPassive(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'passive');
  return s ? `**${s.name}**: ${s.description}` : '';
}

function getSkill1(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'skill1');
  return s ? { name: s.name, desc: s.description } : { name: 'Skill 1', desc: '' };
}

function getSkill2(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'skill2');
  return s ? { name: s.name, desc: s.description } : { name: 'Skill 2', desc: '' };
}

function getUltimate(hero: typeof heroes[number]) {
  const s = skillBySlot(hero, 'ultimate');
  return s ? { name: s.name, desc: s.description } : { name: 'Ultimate', desc: '' };
}

function buildItems(hero: typeof heroes[number]): string {
  return hero.build
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .slice(0, 6)
    .map((b, i) => `${i + 1}. ${b.name}${b.description ? ` (${b.description})` : ''}`)
    .join('\n');
}

function arcanaNames(hero: typeof heroes[number]): string {
  return hero.arcana.filter(Boolean).slice(0, 6).join(', ');
}

function spellNames(hero: typeof heroes[number]): string {
  return hero.spells.filter(Boolean).slice(0, 2).join(' / ');
}

/** Lookup counter hero with slug */
function getCounteredHeroesEn(hero: typeof heroes[number]): { name: string; slug: string }[] {
  return (hero.counteredBy || [])
    .filter((c) => c && c !== 'Data unavailable')
    .slice(0, 6)
    .map((enName) => {
      const h = heroes.find((hh) => hh.name === enName);
      return h ? { name: h.name, slug: h.slug } : { name: enName, slug: '' };
    });
}

function getHeroesCounteredByThisEn(hero: typeof heroes[number]): { name: string; slug: string }[] {
  return (hero.counters || [])
    .filter((c) => c && c !== 'Data unavailable')
    .slice(0, 6)
    .map((enName) => {
      const h = heroes.find((hh) => hh.name === enName);
      return h ? { name: h.name, slug: h.slug } : { name: enName, slug: '' };
    });
}

function heroLinkEn(name: string, slug: string): string {
  if (!slug) return name;
  return `<a href="/en/learn/${slug}-guide" class="hero-link">${name}</a>`;
}

function counteredByLinksEn(hero: typeof heroes[number]): string {
  return getCounteredHeroesEn(hero).map((h) => heroLinkEn(h.name, h.slug)).join(', ');
}

function countersLinksEn(hero: typeof heroes[number]): string {
  return getHeroesCounteredByThisEn(hero).map((h) => heroLinkEn(h.name, h.slug)).join(', ');
}

const LANE_LABELS: Record<string, string> = {
  'Clash Lane': 'Clash Lane (Top)',
  'Farm Lane': 'Farm Lane (Bot)',
  Mid: 'Mid Lane',
  Jungling: 'Jungle',
  Roaming: 'Roaming Support',
  Jungle: 'Jungle',
  Top: 'Top Lane',
  Bottom: 'Farm Lane (Bot)',
};

function laneLabel(hero: typeof heroes[number]): string {
  if (!hero.lane) return hero.role;
  return LANE_LABELS[hero.lane] || hero.lane;
}

function isJungler(hero: typeof heroes[number]): boolean {
  return hero.lane === 'Jungling' || hero.lane === 'Jungle';
}

function isRoamer(hero: typeof heroes[number]): boolean {
  return hero.lane === 'Roaming' || hero.role === 'Support';
}

function isSquishy(hero: typeof heroes[number]): boolean {
  return ['Marksman', 'Mage', 'Assassin'].includes(hero.role);
}

function isFrontline(hero: typeof heroes[number]): boolean {
  return ['Tank', 'Warrior'].includes(hero.role);
}

function difficultyLabel(h: typeof heroes[number]): string {
  return h.difficulty;
}

function tierLabel(h: typeof heroes[number]): string {
  const map: Record<string, string> = {
    'S+': 'S+ (Top Meta)', 'S': 'S (Strong)', 'A': 'A (Viable)',
    'B': 'B (Situational)', 'C': 'C (Niche)',
  };
  return map[h.tier] || h.tier;
}

/* ═══════════════════════════════════════════
   Guide Article
   ═══════════════════════════════════════════ */

function generateGuideArticle(hero: typeof heroes[number]): LearnArticle {
  const name = hero.name;
  const slug = hero.slug;

  // High-quality override playstyle data
  const ps = getPlaystyle(slug, 'en');
  if (ps && ps.summary) {
    return buildOverrideGuide(hero, name, slug, ps);
  }

  return buildRealGuide(hero, name, slug);
}

function buildOverrideGuide(
  hero: typeof heroes[number],
  name: string,
  slug: string,
  ps: ReturnType<typeof getPlaystyle>,
): LearnArticle {
  const sections: LearnArticle['sections'] = [
    { heading: `${name} Overview & Identity`, body: ps!.summary },
    ...ps!.points.slice(0, 3).map((p) => ({
      heading: `Core Mechanic`,
      body: p,
    })),
  ];

  const skillSection = buildSkillBreakdown(hero, name);
  if (skillSection) sections.push(skillSection);

  const buildSection = buildBuildSection(hero, name);
  if (buildSection) sections.push(buildSection);

  const arcanaSection = buildArcanaSection(hero, name);
  if (arcanaSection) sections.push(arcanaSection);

  const comboSection = buildComboSection(hero, name);
  if (comboSection) sections.push(comboSection);

  const laneSection = buildLaneSection(hero, name);
  if (laneSection) sections.push(laneSection);

  const tfSection = buildTeamfightSection(hero, name);
  if (tfSection) sections.push(tfSection);

  const muSection = buildMatchupSection(hero, name);
  if (muSection) sections.push(muSection);

  const rankSection = buildRankSection(hero, name);
  if (rankSection) sections.push(rankSection);

  return {
    slug: `${slug}-guide`,
    title: `${name} Guide — Best Build, Combos & Playstyle`,
    description: `Complete ${name} guide: skill breakdown, build path, arcana setup, combos, laning, and teamfight strategy. Data sourced from official stats and real player feedback.`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildRealGuide(
  hero: typeof heroes[number],
  name: string,
  slug: string,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  const identityBody = buildIdentitySection(hero, name);
  sections.push({ heading: `${name} Hero Identity`, body: identityBody });

  const skillSection = buildSkillBreakdown(hero, name);
  if (skillSection) sections.push(skillSection);

  const buildSection = buildBuildSection(hero, name);
  if (buildSection) sections.push(buildSection);

  const arcanaSection = buildArcanaSection(hero, name);
  if (arcanaSection) sections.push(arcanaSection);

  const comboSection = buildComboSection(hero, name);
  if (comboSection) sections.push(comboSection);

  const laneSection = buildLaneSection(hero, name);
  if (laneSection) sections.push(laneSection);

  const tfSection = buildTeamfightSection(hero, name);
  if (tfSection) sections.push(tfSection);

  const muSection = buildMatchupSection(hero, name);
  if (muSection) sections.push(muSection);

  const rankSection = buildRankSection(hero, name);
  if (rankSection) sections.push(rankSection);

  return {
    slug: `${slug}-guide`,
    title: `${name} Guide — Best Build, Combos & Playstyle`,
    description: `Complete ${name} guide: skill breakdown, build path, arcana setup, combos, laning, and teamfight strategy. Data sourced from official stats and real player feedback.`,
    relatedHeroSlug: slug,
    sections,
  };
}

/* ── Section Builders ── */

function buildIdentitySection(hero: typeof heroes[number], name: string): string {
  const passive = skills(hero).find((s) => s.slot === 'passive');
  const ult = getUltimate(hero);
  const role = hero.role;
  const lane = laneLabel(hero);
  const tier = tierLabel(hero);
  const diff = difficultyLabel(hero);

  let body = `**Role:** ${role} / ${lane} | **Strength:** ${tier} | **Difficulty:** ${diff}`;

  if (hero.winRate) {
    body += ` | **Win Rate:** ${(hero.winRate).toFixed(1)}%`;
  }

  body += '\n\n';

  if (passive) {
    body += `**Core Passive:** ${passive.name}\n${passive.description}\n\n`;
  }

  body += `**Signature Ultimate:** ${ult.name}\n${ult.desc}\n\n`;
  body += `**TL;DR ${name}:** ${getHeroOneLiner(hero)}`;

  return body;
}

function getHeroOneLiner(hero: typeof heroes[number]): string {
  const role = hero.role;

  if (isJungler(hero)) {
    if (role === 'Assassin') {
      return 'An assassin jungler built for ganking. Rush to level 4, then pressure the weakest lane. Successful gank → rotate to objective (Tyrant/tower) immediately. Snowballing wins games, not KDA.';
    }
    return 'A tempo jungler. Objectives > kills. Hit level 4, gank, take Tyrant, invade. Always be doing something — a jungler standing still is losing the game.';
  }

  if (role === 'Marksman') {
    return 'A late-game hypercarry. Play safe early — farm until 2 core items, then you can fight. Lane phase is about CS, not kills. The marksman with more gold wins.';
  }

  if (role === 'Mage') {
    return 'A mid-lane mage. Shove wave, then roam — never stand mid doing nothing. Control mages look for picks; burst mages wait for engage then dump damage.';
  }

  if (isRoamer(hero) || role === 'Support') {
    return 'A roaming support. Vision and tempo are your real value. Help mid secure lane priority, then shadow your jungler or peel for your marksman. If the enemy jungler can\'t gank anyone, you\'re doing your job.';
  }

  if (role === 'Tank' || role === 'Warrior') {
    return 'A clash-lane fighter/tank. Survive lane phase — don\'t die 1v1. After level 4, look for TP plays or roam mid. In teamfights, your job is to engage or peel, not to chase kills.';
  }

  return 'Adapt to the game state. Watch the minimap. Communication wins games.';
}

function buildSkillBreakdown(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const allSkills = skills(hero);
  const s1 = allSkills.find((s) => s.slot === 'skill1');
  const s2 = allSkills.find((s) => s.slot === 'skill2');
  const ult = allSkills.find((s) => s.slot === 'ultimate');

  if (!s1 && !s2 && !ult) return null;

  let body = '';

  if (s1) body += `**Skill 1: ${s1.name}**\n${s1.description}\n\n`;
  if (s2) body += `**Skill 2: ${s2.name}**\n${s2.description}\n\n`;
  if (ult) body += `**Ultimate: ${ult.name}**\n${ult.description}\n\n`;

  const skillOrder = hero.guide?.skillOrder;
  if (skillOrder) {
    body += `**Skill Priority:** ${skillOrder.priority}\n${skillOrder.reason}\n\n`;
  } else {
    body += `**Skill Priority:** Max your primary damage/utility skill first. Level ultimate whenever available.\n\n`;
  }

  body += `**Practical Tips:**\n`;
  body += getSkillTips(hero);

  return { heading: `${name} Skills & Leveling`, body };
}

function getSkillTips(hero: typeof heroes[number]): string {
  const role = hero.role;
  const tips: string[] = [];

  if (role === 'Assassin') {
    tips.push('Wait for enemy CC to be used before going in. Never be the first one to engage unless you\'re 100% sure of the pick.');
    tips.push('Blow your combo, then get out. Don\'t stand around auto-attacking waiting for cooldowns — that\'s how assassins die.');
    tips.push('Late game, your only target is the enemy carry. Trading 1-for-1 with their marksman or mage is almost always worth it.');
  } else if (role === 'Marksman') {
    tips.push('Positioning > damage. Stay behind your frontline. Chasing a low-HP enemy into fog of war is the #1 way marksmen throw games.');
    tips.push('Always assume every bush has an assassin in it. Use skills to check bushes — don\'t face-check.');
    tips.push('Flex your build. Heavy enemy frontline → early penetration items. Enemy assassins fed → defensive item 3rd or 4th.');
  } else if (role === 'Mage') {
    tips.push('After clearing your wave, immediately check sidelanes. A mage standing mid doing nothing is a wasted pick.');
    tips.push('Control mages: sit in bushes and look for picks. Burst mages: wait for your tank to engage, then dump everything.');
    tips.push('Mid T1 tower is the most important structure on the map. Defend it at all costs — losing it means losing your entire jungle vision.');
  } else if (role === 'Tank' || role === 'Warrior') {
    tips.push('Lane phase goal: survive and farm. You don\'t need solo kills to win. If the enemy jungler is MIA, play safe.');
    tips.push('Before engaging a teamfight, check if your team can follow up. Diving in alone = feeding, no matter how tanky you are.');
    tips.push('Build adaptively. Enemy has heavy magic damage → magic resist. Heavy physical → armor. One defensive item choice wins or loses teamfights.');
  } else if (isRoamer(hero) || role === 'Support') {
    tips.push('Early game: help mid secure lane priority, then link up with your jungler. Don\'t just sit in bot lane the entire laning phase.');
    tips.push('Vision control is your real job. Hold key brush positions so your team always knows where the enemy jungler is.');
    tips.push('Protective items (shields, heals) before damage items. If you and your carry are alive, the teamfight is won.');
  }

  return tips.map((t) => `• ${t}`).join('\n');
}

function buildBuildSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const items = hero.build.filter(
    (b) => b.name && b.name !== 'Data unavailable',
  );
  if (items.length === 0) return null;

  let body = `Current recommended build for ${name}:\n\n`;
  body += items
    .slice(0, 6)
    .map((b, i) => {
      const desc = b.description ? ` (${b.description})` : '';
      return `**Slot ${i + 1}: ${b.name}**${desc}`;
    })
    .join('\n\n');

  body += '\n\n';
  body += getBuildReasoning(hero);

  return { heading: `${name} Build & Itemization`, body };
}

function getBuildReasoning(hero: typeof heroes[number]): string {
  let reasoning = '**Build Logic:**\n';

  if (isFrontline(hero)) {
    reasoning += '• Start with a defensive item for lane trading. Second item should add HP or dual resists for teamfight survivability.\n';
    reasoning += '• Adjust based on enemy damage types — don\'t autopilot the same build every game.\n';
    reasoning += '• If you get an early lead, slotting one semi-damage item (e.g. Shadow Ripper) accelerates your snowball.\n';
  } else if (isSquishy(hero)) {
    reasoning += '• First two items are your core damage spike. Don\'t change the order — build the most gold-efficient item first.\n';
    reasoning += '• Third item onward is situational: defensive item vs fed assassins, penetration vs tanky comps.\n';
    reasoning += '• Never skip a defensive item for a 6th damage item. Dead carries deal zero DPS.\n';
  } else {
    reasoning += '• Prioritize your core items, then adapt based on game state.\n';
    reasoning += '• Ahead → lean damage. Behind → lean defense. Staying alive in losing games creates comeback windows.\n';
  }

  return reasoning;
}

function buildArcanaSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const arcana = arcanaNames(hero);
  const spells = spellNames(hero);

  let body = `**Recommended Arcana:** ${arcana || 'Standard runes'}\n\n`;
  body += `**Summoner Spell:** ${spells || 'Flash'}\n\n`;

  if (isJungler(hero)) {
    body += 'Smite is mandatory for junglers. Upgrade path: slowing smite vs mobile enemies, damage smite for burst.\n';
  } else if (isSquishy(hero)) {
    body += 'Flash is the safest choice. If the enemy has heavy CC chains (point-click stuns, suppression), Purify saves more lives than Flash.\n';
  } else if (isFrontline(hero)) {
    body += 'Flash enables aggressive engages. Execute can finish off fed carries after your initial combo. Choose based on draft.\n';
  } else {
    body += 'Adjust based on team comp: Purify vs heavy CC, Flash for general purpose, Heal or Shield for protective supports.\n';
  }

  return { heading: `${name} Arcana & Summoner Spells`, body };
}

function buildComboSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const combos = hero.guide?.combos;
  const s1 = getSkill1(hero);
  const s2 = getSkill2(hero);
  const ult = getUltimate(hero);

  let body = '';

  if (combos && combos.length > 0) {
    body += `**Standard Combos:**\n`;
    combos.forEach((c) => {
      body += `• **${c.name}** (${c.when})\n  ${c.steps}\n\n`;
    });
  }

  if (!combos || combos.length === 0) {
    body += `${name} combo guidelines:\n\n`;
    body += `• Lane trade: ${s1.name} → ${s2.name} → weave autos → back off. Don\'t overcommit.\n`;
    body += `• All-in: ${s1.name} → ${s2.name} → auto-attack weave → ${ult.name} to finish.\n`;
    body += `• Always weave basic attacks between skills for maximum DPS. Don\'t just dump all skills and stand there.\n`;
  }

  return { heading: `${name} Combos`, body };
}

function buildLaneSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  let body = '';

  if (isJungler(hero)) {
    body = jungleAdvice();
    return { heading: `Jungle Pathing & Tempo`, body };
  }

  if (isRoamer(hero) || hero.role === 'Support') {
    body = roamAdvice();
    return { heading: `Roaming & Vision Control`, body };
  }

  if (hero.role === 'Marksman') {
    body = marksmanLaneAdvice();
    return { heading: `Farm Lane Strategy`, body };
  }

  if (hero.role === 'Mage') {
    body = mageLaneAdvice();
    return { heading: `Mid Lane & Roaming Timings`, body };
  }

  body = clashLaneAdvice();
  return { heading: `${laneLabel(hero)} Laning`, body };
}

function jungleAdvice(): string {
  return [
    `**Opening Clear:**`,
    `• Start on the side where you can gank the most vulnerable lane first. Blue buff for mana-hungry champs, red buff for early aggression.`,
    `• Full clear to level 4 before ganking. Don\'t waste time on half-committed ganks pre-6 — the risk/reward ratio is terrible.`,
    ``,
    `**Level 4 Powerspike:**`,
    `• Your first gank target should be the lane with the most CC setup. A lane with hard CC = guaranteed kill or summoner spell burned.`,
    `• Successful gank → ping your team to take Tyrant immediately. Getting a kill without an objective is a wasted lead.`,
    `• Failed gank → go back to farming. Don\'t sit in a bush for 30 seconds hoping — that\'s how you fall 2 levels behind.`,
    ``,
    `**Mid-Game Macro:**`,
    `• 30 seconds before Tyrant/Overlord spawns, start pathing toward that side of the map and secure vision.`,
    `• If the enemy jungler shows on the opposite side of the map, immediately invade their jungle or take the objective on your side. Information asymmetry is a jungler\'s biggest weapon.`,
    `• Track enemy buff timers. Stealing a buff puts the enemy jungler behind for 30+ seconds.`,
    ``,
    `**Late Game Decisions:**`,
    `• Don\'t engage first unless your hero is specifically designed for it. Let your tank find the opening.`,
    `• Tempest Dragon > everything. At full build, whoever secures Tempest wins the game. Be alive and have Smite ready.`,
  ].join('\n');
}

function roamAdvice(): string {
  return [
    `**Early Game Tempo:**`,
    `• Help mid clear the first wave to secure lane priority, then check the minimap. Knowing where the enemy jungler started is your first major contribution.`,
    `• Don\'t camp bot lane the entire laning phase. If your marksman is safe 1v1, shadow your jungler for 2v1 invades and ganks.`,
    `• The enemy support\'s position dictates your response. If they\'re bot, you need to be bot too. If they\'re roaming, you roam.`,
    ``,
    `**Roaming Windows:**`,
    `• Roam after helping your laner crash the wave into the enemy tower. A crashed wave means your laner can farm safely while you\'re gone.`,
    `• Pre-4 minute and pre-8 minute: start positioning for Tyrant/Overlord vision control.`,
    ``,
    `**Vision Control:**`,
    `• Always stand between your carry and the fog of war. You face-checking a bush and dying is better than your carry face-checking and dying.`,
    `• Key brush positions: both river brushes in mid, the dragon pit area, and enemy buff brushes. Control these and the enemy team is playing blind.`,
    `• When behind, use skills to check bushes. Don\'t walk into fog you can\'t see — dying for vision in a losing game just accelerates the loss.`,
  ].join('\n');
}

function marksmanLaneAdvice(): string {
  return [
    `**Early Game: Farm First**`,
    `• Pre-level 4, just last-hit. Don\'t force trades you don\'t need to take. Every CS you miss is gold you\'ll never get back.`,
    `• Watch the river. The enemy jungler ganking farm lane at level 2 or 4 is the most common early-game pattern. No vision = play near your tower.`,
    `• The river Scuttler is nice but not worth dying for. Losing your flash or dying for 80 gold is always a bad trade.`,
    ``,
    `**Mid-Game Rotations:**`,
    `• After taking the enemy T1 tower, rotate mid to help siege. Don\'t stay bot farming while your team fights 4v5.`,
    `• Avoid joining fights before you hit your 2-item spike. An under-farmed marksman is the least useful hero in any skirmish.`,
    `• Always be farming something. Between fights, take jungle camps, side waves, anything. Marksmen are gold vacuums — the richer you are, the harder you carry.`,
    ``,
    `**Late Game Teamfighting:**`,
    `• Position before damage. Stay behind your frontline. The enemy you should be hitting is the closest one, not their backline.`,
    `• Defensive item swap is not optional. Swap boots or your 6th item for a revive/immortality item when death timers matter.`,
    `• If the enemy assassin hasn\'t shown on the map, don\'t walk forward. They\'re in a bush waiting for you.`,
  ].join('\n');
}

function mageLaneAdvice(): string {
  return [
    `**Wave Clear & Roam:**`,
    `• The #1 mistake mid players make: clearing wave then standing under tower. Clear → look at minimap → roam to whichever side needs help.`,
    `• Roam through your own jungle, never through the river alone. The river is where mages go to die.`,
    `• Same on the way back. Walking back to mid through the river after a roam is asking to get picked.`,
    ``,
    `**Lane Priority:**`,
    `• Lane priority = clearing your wave before the enemy mage clears theirs. Whoever has priority roams first and creates plays.`,
    `• If the enemy mage out-pushes you, farm under tower and ping missing when they roam. Don\'t try to match a roam into fog — you\'ll get collapsed on.`,
    `• Mid T1 tower is the most important structure in the game. Losing it means losing vision of your entire jungle. Even if it means missing a wave, don\'t let it fall for free.`,
    ``,
    `**Mage in Teamfights:**`,
    `• Control mages: sit in bushes, look for picks, open fights with CC. Burst mages: wait for engage, then dump everything on the clumped enemy team.`,
    `• Never face-check bushes. Use skills. Let your tank walk first.`,
    `• After your rotation, back off and wait for cooldowns. Standing in the frontline auto-attacking as a mage is a great way to throw your lead.`,
  ].join('\n');
}

function clashLaneAdvice(): string {
  return [
    `**Lane Fundamentals:**`,
    `• Clash lane is a 1v1 island. The golden rule: survive first, pressure second. Not dying is way more valuable than getting a solo kill.`,
    `• Always track the enemy jungler on the minimap. When they\'re botside, you can play up. When they\'re MIA, play near your tower.`,
    `• Wave management: ahead → slow push into enemy tower then roam. Behind → freeze near your tower and farm safely.`,
    ``,
    `**Level 4 Powerspike:**`,
    `• Most clash laners get a massive power spike at level 4 with their ultimate. This is your first real opportunity to trade aggressively or look for a solo kill.`,
    `• If you have TP, watch bot lane for opportunities. A well-timed TP can turn a losing 2v2 into a winning 3v2.`,
    ``,
    `**Mid-Game Side Laning:**`,
    `• After taking T1 tower, your job splits between pushing side waves and joining fights. Push wave → check minimap → decide.`,
    `• While split pushing, if you can\'t see 3+ enemies on the map, they\'re probably coming for you. Retreat.`,
    `• Teamfights generally take priority over split pushing, but if you group without pushing your wave first and lose the fight, you lose towers too.`,
  ].join('\n');
}

function buildTeamfightSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  let body = '';

  if (isFrontline(hero)) {
    body = [
      `**Engage Responsibilities:**`,
      `• You\'re usually the primary engage. Before going in, check: 1) teammates are in range to follow 2) enemy key cooldowns are down 3) you have your ultimate.`,
      `• Don\'t dive as soon as you see an enemy. Wait for the carry to misposition — one step too far forward is your engage window.`,
      `• After engaging, watch for the enemy assassin. Turning around to CC them when they dive your backline is often more valuable than chasing the enemy carry.`,
      ``,
      `**Peel vs Dive Decision:**`,
      `• Your marksman is fed → stay back and peel. Stand between them and the enemy assassin.`,
      `• Your assassin/mage is fed → engage hard, eat cooldowns, let your carries free-fire.`,
      `• Whichever side has the gold lead is the side you play around. There\'s no one-size-fits-all — adapt to the game state.`,
    ].join('\n');
  } else if (hero.role === 'Assassin') {
    body = [
      `**Engage Timing:**`,
      `• The #1 assassin mistake: engaging first. Always wait for the enemy team to use their CC, then go in.`,
      `• Approach from the flank or behind. Walking straight at the enemy team as an assassin is a death sentence.`,
      `• Your target: the enemy marksman or mage. Trading 1-for-1 with their hypercarry is a win.`,
      ``,
      `**When to Back Off:**`,
      `• Blow your combo → get out. Don\'t linger in the middle of the fight auto-attacking.`,
      `• Never start a fight without your ultimate. An assassin without their ult is a melee minion.`,
      `• If you engage and your team doesn\'t follow, disengage immediately. One death is better than an ace.`,
    ].join('\n');
  } else if (hero.role === 'Marksman') {
    body = [
      `**Positioning Rules:**`,
      `• Stay at max range behind your frontline. Hit whatever is closest — damaging the enemy tank is still effective damage.`,
      `• Don\'t walk forward to hit the enemy carry. The moment you step past your tank, you\'re dead.`,
      `• If the enemy assassin hasn\'t shown, don\'t advance. They\'re in a bush waiting.`,
      ``,
      `**Survival > Damage:**`,
      `• Staying alive is more important than maximizing DPS. If you get dove, Flash backward immediately — don\'t try to outplay.`,
      `• Hold Purify/Flash for the moment the enemy assassin commits. Using it early or late is equally wasteful.`,
      `• After winning a teamfight, take objectives. Chasing low-HP stragglers instead of taking towers is how you throw won games.`,
    ].join('\n');
  } else if (hero.role === 'Mage') {
    body = [
      `**Damage Positioning:**`,
      `• Your ability range = your safety zone. Don\'t walk past your tank to hit the enemy backline.`,
      `• AoE skills should hit as many enemies as possible. Landing your ultimate on 3 people is ten times more valuable than killing a lone support.`,
      `• Hold your CC for the enemy assassin\'s dive. Counter-engaging on the assassin when they jump your carry is a mage\'s most important contribution.`,
      ``,
      `**Engage Rhythm:**`,
      `• Dump your rotation → back off → wait for cooldowns. Mages who stand in the front auto-attacking have a near-100% death rate.`,
      `• After winning a fight, mages shred towers fastest (skills + autos). Don\'t chase kills — hit the tower.`,
    ].join('\n');
  } else {
    body = [
      `**Support Teamfight Priorities:**`,
      `• Stand between your carry and the enemy team. Your HP bar exists to absorb damage for your damage dealers.`,
      `• Save your CC for the enemy assassin/fighter\'s engage. Don\'t blow everything on the enemy tank at the start of the fight.`,
      `• Hold protective abilities (heals, shields) until your carry actually takes damage. Using them preemptively at full HP is a waste.`,
      ``,
      `**Vision & Initiation:**`,
      `• Before the fight starts, secure vision in key brush positions so your team can see the enemy setup.`,
      `• Tank supports can engage first if your team is in position — but always confirm follow-up is available before committing.`,
    ].join('\n');
  }

  return { heading: `Teamfight Strategy & Positioning`, body };
}

function buildMatchupSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const counteredLinks = counteredByLinksEn(hero);
  const counterLinks = countersLinksEn(hero);

  if (!counteredLinks && !counterLinks) return null;

  let body = '';

  if (counteredLinks) {
    body += `**${name} struggles against:** ${counteredLinks}\n`;
    body += `When facing these champions:\n`;
    body += `• Play passive in lane. Surviving > trading.\n`;
    body += `• Call your jungler for help — don\'t try to 1v1 a counter matchup.\n`;
    body += `• Adjust build toward defense. Staying alive is more valuable than an extra damage item.\n\n`;
  }

  if (counterLinks) {
    body += `**${name} counters:** ${counterLinks}\n`;
    body += `Against these champions:\n`;
    body += `• Play aggressive. Deny them farm and force them out of lane.\n`;
    body += `• Use your matchup advantage to create a lead, then roam and spread it.\n`;
    body += `• In draft, ${name} is a strong counter-pick if the enemy locks one of these early.\n`;
  }

  return { heading: `${name} Matchups`, body };
}

function buildRankSection(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] | null {
  const tier = hero.tier;
  const wr = hero.winRate;

  let body = `**Current Meta Position:** ${tierLabel(hero)}`;

  if (wr) {
    body += `, ${wr.toFixed(1)}% WR`;
  }

  body += '\n\n';

  if (tier === 'S+' || tier === 'S') {
    body += `${name} is a top-tier pick right now. High ban rate — lock it in whenever available.\n\n`;
    body += `**Climbing Advice:**\n`;
    body += `• If you secure ${name}, your team should draft around enabling you. Communicate in champ select.\n`;
    body += `• Expect counter-picks — opponents will try to specifically shut you down. Play around it.\n`;
    body += `• Overconfidence is the #1 reason strong picks lose. Play clean, don\'t force, take objectives.`;
  } else if (tier === 'A') {
    body += `${name} is a solid, consistent pick. Not the best in class, but mastery beats meta.\n\n`;
    body += `**Climbing Advice:**\n`;
    body += `• One-tricking ${name} is better than constantly switching to "meta" picks you\'re less comfortable on.\n`;
    body += `• Be willing to flex off ${name} if the enemy drafts hard counters.`;
  } else {
    body += `${name} isn\'t meta right now, but any hero can win in solo queue with enough mastery.\n\n`;
    body += `**Climbing Advice:**\n`;
    body += `• You\'ll need to outplay meta picks through superior champion knowledge. Know your limits and powerspikes cold.\n`;
    body += `• Team comp matters more. If your team picks strong early-game champs to buy you time to scale, ${name} can work.`;
  }

  return { heading: `Meta Performance & Ranked Tips`, body };
}

/* ═══════════════════════════════════════════
   Counter Article
   ═══════════════════════════════════════════ */

function generateCounterArticle(hero: typeof heroes[number]): LearnArticle {
  const name = hero.name;
  const slug = hero.slug;

  const details = getCounterDetails(slug, 'en');
  const best = getBestCounter(slug, 'en');

  if (details.length > 0) {
    return buildOverrideCounter(hero, name, slug, details, best);
  }

  return buildRealCounter(hero, name, slug);
}

function buildOverrideCounter(
  hero: typeof heroes[number],
  name: string,
  slug: string,
  details: ReturnType<typeof getCounterDetails>,
  best: ReturnType<typeof getBestCounter>,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  if (best && !details.find((d) => d.hero === best.hero)) {
    sections.push({
      heading: `Best Counter: ${best.hero}`,
      body: best.reasons.join('\n\n'),
    });
  }

  details.slice(0, 4).forEach((d) => {
    sections.push({
      heading: `How ${d.hero} Counters ${name}`,
      body: d.reason,
    });
  });

  sections.push(buildBpAdvice(hero, name));

  return {
    slug: `how-to-counter-${slug}`,
    title: `How to Counter ${name} — Best Picks & Strategy`,
    description: `Counter ${name} guide: best counter heroes, itemization, laning strategy, and draft advice. Data sourced from official stats and real player feedback.`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildRealCounter(
  hero: typeof heroes[number],
  name: string,
  slug: string,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  sections.push({
    heading: `Countering ${name} — Big Picture`,
    body: buildCounterOverview(hero, name),
  });

  const counterList = buildCounterHeroList(hero, name);
  if (counterList) {
    sections.push({
      heading: `Heroes That Counter ${name}`,
      body: counterList,
    });
  }

  sections.push({
    heading: `Item Counters vs ${name}`,
    body: buildCounterItems(hero, name),
  });

  sections.push({
    heading: `How to Lane vs ${name}`,
    body: buildCounterLaning(name),
  });

  sections.push({
    heading: `Shutting Down ${name} in Teamfights`,
    body: buildCounterTeamfight(name),
  });

  sections.push(buildBpAdvice(hero, name));

  return {
    slug: `how-to-counter-${slug}`,
    title: `How to Counter ${name} — Best Picks & Strategy`,
    description: `Counter ${name} guide: best counter heroes, itemization, laning strategy, and draft advice. Data sourced from official stats and real player feedback.`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildCounterOverview(hero: typeof heroes[number], name: string): string {
  const role = hero.role;
  let body = `How to approach ${name} (${role}, ${laneLabel(hero)}):\n\n`;

  if (isSquishy(hero)) {
    body += `• ${name} is squishy — any hard CC chain deletes them. Save one reliable stun for their engage window.\n`;
    body += `• Shut them down early. Gank pre-4 to deny their first powerspike. A behind ${name} is one of the weakest heroes on the map.\n`;
    body += `• Don\'t fight fair 1v1s. ${name} excels in duels — collapse with numbers instead.\n`;
  } else if (isFrontline(hero)) {
    body += `• ${name} is a frontline tank/fighter. Don\'t waste your burst on them — kill their teammates first.\n`;
    body += `• Build penetration items to shred through their defenses. A tank that melts in 3 seconds can\'t do their job.\n`;
    body += `• Kite them. Ranged champions that can keep ${name} at distance neutralize their threat entirely.\n`;
  } else {
    body += `• Identify ${name}'s weak window (early game / cooldown periods) and pressure during those moments.\n`;
    body += `• CC is the universal counter. Hold it for ${name}'s key ability timing.\n`;
  }

  const links = counteredByLinksEn(hero);
  if (links) {
    body += `\nStatistically, ${name} struggles vs: ${links}.`;
  }

  return body;
}

function buildCounterHeroList(hero: typeof heroes[number], name: string): string {
  const heroList = getCounteredHeroesEn(hero);
  if (heroList.length === 0) return '';
  let body = `These heroes have favorable win rates vs ${name}:\n\n`;
  heroList.forEach((h) => {
    const link = heroLinkEn(h.name, h.slug);
    body += `• **${link}**: Has a mechanical advantage over ${name}. Click for full guide.\n`;
  });
  body += `\nPick based on your champion pool and team needs. A comfortable pick in a slightly losing matchup outperforms an uncomfortable "counter" pick every time.`;
  return body;
}

function buildCounterItems(hero: typeof heroes[number], name: string): string {
  const role = hero.role;

  if (role === 'Marksman' || role === 'Mage' || role === 'Assassin') {
    return [
      `Itemization vs ${name} (${role}):`,
      ``,
      `**Tanks/Warriors:**`,
      `• First big item should be defensive stats matching ${name}'s primary damage type (${role === 'Mage' ? 'magic resist' : 'armor'}).`,
      `• Immortal Robe or Blade of Resilience for anti-burst survivability.`,
      `• If ${name} has sustain/lifesteal → build anti-heal immediately.`,
      ``,
      `**Damage Dealers:**`,
      `• Defensive item 3rd or 4th. Surviving ${name}'s burst is more important than a 6th damage item.`,
      `• Purify can cleanse ${name}'s CC chain — often saves more lives than Flash.`,
    ].join('\n');
  }

  return [
    `Itemization vs ${name} (${role}):`,
    ``,
    `**Damage Dealers:**`,
    `• Build penetration items to kill ${name} faster. Shadow Ripper or Void Staff depending on damage type.`,
    `• Anti-heal if ${name} has sustain mechanics.`,
    ``,
    `**Tanks/Warriors:**`,
    `• Stack dual resists + HP. Prioritize defensive stats matching the most fed enemy carry.`,
    `• If ${name} isn\'t the only threat, build for the enemy team\'s primary damage profile.`,
  ].join('\n');
}

function buildCounterLaning(name: string): string {
  return [
    `Core strategy when laning against ${name}:`,
    ``,
    `• **Levels 1-3 are your best window.** Most heroes are weakest before their ultimate. Trade aggressively early.`,
    `• **Track cooldowns.** Bait out ${name}'s key ability, then punish during the cooldown window.`,
    `• **Control wave position.** Don\'t mindlessly push — a frozen wave near your tower sets up easy jungle ganks.`,
    `• **Ping your jungler.** Let them know when ${name}'s Flash or escape is on cooldown for guaranteed kills.`,
    `• **Vision is life.** Ward the river brush. If you don\'t see the enemy jungler, assume they\'re coming for you.`,
  ].join('\n');
}

function buildCounterTeamfight(name: string): string {
  return [
    `How to handle ${name} in teamfights:`,
    ``,
    `• **Deny comfortable positioning.** Control vision around flank routes so ${name} can\'t find an easy angle.`,
    `• **Save hard CC for ${name} specifically.** Don\'t waste stuns, knockups, or suppression on the enemy tank — ${name} is the real threat.`,
    `• **The moment ${name} uses their mobility/escape cooldown is your kill window.** Call for immediate focus fire.`,
    `• **If ${name} hasn\'t shown yet, don\'t hard commit.** Wait for them to reveal before fully engaging.`,
    `• **Spread your formation.** Clumping together lets ${name} hit everyone with AoE. Keep some distance between teammates.`,
  ].join('\n');
}

function buildBpAdvice(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] {
  const cLinks = counteredByLinksEn(hero);
  return {
    heading: `Draft & Ban Strategy`,
    body: [
      `**Ban Phase:**`,
      `• If your team lacks reliable ways to shut down ${name} and the enemy might pick it — ban it.`,
      `• ${name}'s ban priority increases at higher ranks where players can maximize the champion's potential.`,
      ``,
      `**Pick Phase:**`,
      `• Don\'t first-pick ${name}. It invites counter-picks.`,
      `• If the enemy has already locked a known ${name} counter (e.g. ${cLinks || 'hard CC tanks / burst assassins'}), seriously reconsider picking ${name}.`,
      `• ${name} shines with specific team compositions. Communicate with your team about playstyle before locking in.`,
    ].join('\n'),
  };
}

/* ═══════════════════════════════════════════
   Weaknesses Article
   ═══════════════════════════════════════════ */

function generateWeaknessesArticle(hero: typeof heroes[number]): LearnArticle {
  const name = hero.name;
  const slug = hero.slug;

  const trend = getMetaTrend(slug, 'en');
  if (trend && trend.summary) {
    return buildOverrideWeaknesses(hero, name, slug, trend);
  }

  return buildRealWeaknesses(hero, name, slug);
}

function buildOverrideWeaknesses(
  hero: typeof heroes[number],
  name: string,
  slug: string,
  trend: ReturnType<typeof getMetaTrend>,
): LearnArticle {
  const sections: LearnArticle['sections'] = [
    { heading: `Why ${name} Struggles Right Now`, body: trend!.summary },
    ...trend!.reasons.slice(0, 4).map((r) => ({
      heading: `Weakness`,
      body: r,
    })),
  ];

  sections.push(buildWeakBpAdvice(hero, name));

  return {
    slug: `${slug}-weaknesses`,
    title: `${name} Weaknesses — What Makes This Hero Vulnerable`,
    description: `Discover ${name}'s biggest weaknesses: early-game struggles, mechanical counters, itemization, and teamfight vulnerabilities.`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildRealWeaknesses(
  hero: typeof heroes[number],
  name: string,
  slug: string,
): LearnArticle {
  const sections: LearnArticle['sections'] = [];

  sections.push({
    heading: `${name}'s Biggest Weaknesses`,
    body: buildWeakOverview(hero, name),
  });

  sections.push({
    heading: `${name} in the Current Meta`,
    body: buildWeakMeta(hero, name),
  });

  sections.push({
    heading: `${name}'s Mechanical Weaknesses`,
    body: buildWeakMechanics(hero, name),
  });

  sections.push({
    heading: `Teamfight Vulnerabilities`,
    body: buildWeakTeamfight(hero, name),
  });

  sections.push({
    heading: `How to Handle Bad Matchups`,
    body: buildWeakMatchups(hero, name),
  });

  sections.push(buildWeakBpAdvice(hero, name));

  return {
    slug: `${slug}-weaknesses`,
    title: `${name} Weaknesses — What Makes This Hero Vulnerable`,
    description: `Discover ${name}'s biggest weaknesses: early-game struggles, mechanical counters, itemization, and teamfight vulnerabilities.`,
    relatedHeroSlug: slug,
    sections,
  };
}

function buildWeakOverview(hero: typeof heroes[number], name: string): string {
  const role = hero.role;
  let body = `Understanding ${name}'s (${role}, ${laneLabel(hero)}) weaknesses helps whether you\'re piloting or playing against them.\n\n`;

  body += `**Universal Weaknesses:**\n`;

  if (isSquishy(hero)) {
    body += `• Glass cannon — any CC chain means instant death.\n`;
    body += `• Item-dependent — weak before core items are completed.\n`;
    body += `• Limited self-peel — vulnerable to coordinated dives.\n`;
  } else if (isFrontline(hero)) {
    body += `• Predictable pathing — enemies know you\'re going to dive, so they save CC for you.\n`;
    body += `• Requires follow-up — engaging without your team is just feeding.\n`;
    body += `• Penetration items significantly reduce your effective tankiness.\n`;
  } else {
    body += `• Cooldown-dependent — significant downtime between rotations.\n`;
    body += `• Positioning-reliant — bad positioning means zero impact.\n`;
  }

  const links = counteredByLinksEn(hero);
  if (links) {
    body += `\nSpecific counter picks: ${links}.`;
  }

  return body;
}

function buildWeakMeta(hero: typeof heroes[number], name: string): string {
  const tier = hero.tier;
  const wr = hero.winRate;
  const pr = hero.pickRate;

  let body = `**Tier:** ${tierLabel(hero)}`;

  if (wr) body += ` | **Win Rate:** ${wr.toFixed(1)}%`;
  if (pr) body += ` | **Pick Rate:** ${pr.toFixed(1)}%`;

  body += '\n\n';

  if (tier === 'S+' || tier === 'S') {
    body += `${name} is meta, but popularity means more players study counterplay. Expect to get targeted in draft and in-game. When you play against ${name}, you likely already know their standard patterns.\n`;
  } else if (tier === 'A') {
    body += `${name} is solid but not dominant. Strong in the right comp, invisible in the wrong one. Don\'t blind-pick without team synergy.\n`;
  } else {
    body += `${name} is off-meta. Needs high mastery or specific team comps to outperform meta picks. Not recommended for new players in ranked.\n`;
  }

  return body;
}

function buildWeakMechanics(hero: typeof heroes[number], name: string): string {
  const role = hero.role;
  let body = '';

  if (role === 'Assassin') {
    body = [
      `• **One-combo wonder:** ${name}'s entire value is in their burst rotation. During cooldowns, they\'re essentially a melee minion. Punish hard after they blow their skills.`,
      `• **CC is death:** Any hard CC (stun, knockup, suppression) interrupts ${name}'s engage and leaves them exposed in the middle of your team.`,
      `• **Late-game coinflip:** At full build, ${name} either one-shots the carry or gets one-shot. No middle ground.`,
      `• **Weak early:** Before level 4, ${name}'s gank pressure is limited. Invade their jungle early to set them behind.`,
    ].join('\n\n');
  } else if (role === 'Marksman') {
    body = [
      `• **Gets deleted by dive:** Marksmen die when anything reaches them. ${name} has limited tools to escape once engaged.`,
      `• **Farming-dependent:** Behind on gold = useless. If ${name} gets ganked twice early, they\'re irrelevant for the next 15 minutes.`,
      `• **Zero positioning forgiveness:** One step too far forward and you\'re dead. Positioning mistakes on marksmen are punished harder than any other role.`,
      `• **Limited self-peel:** Long dash cooldowns or no dash at all. Once Flash is down, you\'re a free kill.`,
    ].join('\n\n');
  } else if (role === 'Mage') {
    body = [
      `• **Cooldown-gated:** All damage is in skills. When abilities are down or mana is low, ${name} contributes nothing.`,
      `• **Squishy:** Like marksmen, mages explode when caught. One assassin rotation = gray screen.`,
      `• **Mid lane is a highway:** The most ganked lane in the game. ${name} without mobility is a prime target for level-2 jungle ganks.`,
      `• **Needs gold and XP:** Falling behind on mage means your spells tickle. One death in lane can snowball into irrelevance.`,
    ].join('\n\n');
  } else if (isFrontline(hero)) {
    body = [
      `• **Gets kited into irrelevance:** Short-range tanks are helpless against slows and mobility. If they can\'t reach anyone, they can\'t do anything.`,
      `• **Penetration items are brutal:** Once the enemy builds armor/magic pen, your tankiness drops off a cliff. Don\'t feel invincible just because you have defensive items.`,
      `• **Engage needs follow-up:** A perfect tank engage with no follow-up damage is just a suicide. This is especially painful in solo queue.`,
      `• **Behind = useless:** An under-farmed tank is just a squishy champion with a big hitbox. No gold = no defensive stats = instant death.`,
    ].join('\n\n');
  } else {
    body = [
      `• **Team-reliant:** A support\'s value depends entirely on how well their team uses them. If your carries can\'t carry, you can\'t either.`,
      `• **Gold-starved:** Supports are always behind in items and levels. If the enemy focuses you, you have very few options.`,
      `• **Vision control is dangerous:** Warding means walking into fog first. Ambushes kill the support first.`,
    ].join('\n\n');
  }

  return body;
}

function buildWeakTeamfight(hero: typeof heroes[number], name: string): string {
  return [
    `${name}'s main teamfight vulnerabilities:`,
    ``,
    `• **Interrupted key ability = zero teamfight impact.** Enemies who save one CC for ${name}'s critical moment neutralize them entirely.`,
    `• **Engage timing mistakes are game-losing.** Too early → focused and killed. Too late → team dies 4v5.`,
    `• **Vision exposure = death.** ${name} walking into fog without a tank in front is asking to get picked.`,
    `• **Can\'t survive focus fire.** If the enemy team decides to all-in ${name}, they rarely survive without multiple defensive cooldowns.`,
  ].join('\n');
}

function buildWeakMatchups(hero: typeof heroes[number], name: string): string {
  const links = counteredByLinksEn(hero);

  return [
    `How to play ${name} in bad matchups:`,
    ``,
    `• **Play passive, farm safe.** You don\'t need to win lane to win game. Every CS you secure without dying is a small victory.`,
    `• **Build defensively.** Swap one damage item for defense. In counter matchups, survival > greed.`,
    `• **Wait for your powerspike.** ${name} has a moment where they come online. Survive until then, and you have a window to turn it around.`,
    `• **Don\'t tilt.** Bad matchups teach patience and defensive fundamentals. Players who can play from behind are the ones who actually climb.`,
    links ? `\nEspecially watch out for: ${links}. These champions counter ${name} mechanically — prioritize survival over ego.` : '',
  ].join('\n');
}

function buildWeakBpAdvice(hero: typeof heroes[number], name: string): LearnArticle['sections'][number] {
  const cLinks = counteredByLinksEn(hero);
  return {
    heading: `When to Ban or Skip ${name}`,
    body: [
      `**Ban ${name} when:**`,
      `• Your team lacks reliable CC to shut them down.`,
      `• An enemy player is a known ${name} one-trick (check match history).`,
      `• No one on your team plays ${name}'s counter picks comfortably.`,
      ``,
      `**Skip ${name} when:**`,
      `• The enemy has already locked ${name} counters (e.g. ${cLinks || 'CC-heavy tanks / burst assassins'}).`,
      `• Your team comp doesn\'t support ${name}'s playstyle — missing frontline (for carries) or missing damage follow-up (for tanks/fighters).`,
      `• You\'re not comfortable on ${name}. Ranked is not practice mode — play what you know.`,
      ``,
      `**Bottom line:** ${name} can dominate in the right hands and the right draft. But forcing it into a bad situation is the fastest way to lose LP.`,
    ].join('\n'),
  };
}

/* ── export ── */

export function getHeroLearnArticles(): LearnArticle[] {
  return heroes.flatMap((hero) => [
    generateCounterArticle(hero),
    generateGuideArticle(hero),
    generateWeaknessesArticle(hero),
  ]);
}
