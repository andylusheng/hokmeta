import type {
  Hero,
  HeroArcanaRow,
  HeroCombo,
  HeroItemNote,
  HeroSkillOrder,
} from '@/types/hero';
import { formatRate } from '@/lib/data';
import { META_SEASON_LABEL } from '@/lib/meta-season';

export interface HeroPlaybook {
  hook: string;
  skillOrder: HeroSkillOrder;
  combos: HeroCombo[];
  itemNotes: HeroItemNote[];
  arcanaRows: HeroArcanaRow[];
  tldr: {
    build: string;
    combo: string;
    counters: string;
  };
}

const MUSASHI_PLAYBOOK: Partial<HeroPlaybook> = {
  hook:
    'Dual-blade jungler who stacks Vigor with skills, then cashes it in on enhanced basic attacks for burst, slow, and kill pressure.',
  skillOrder: {
    priority: 'Skill 2 → Skill 1 → Ultimate (max Skill 2 first)',
    reason:
      'Extreme Speed is your gap-close, shield, and trade tool—max it first for safer ganks. Illuminating Slash second for range, wave clear, and projectile block. Take Ultimate whenever available; it sets up isolated picks and anti-heal.',
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
    {
      slot: 1,
      why: 'Rapacious Bite — jungle core; camp stacks boost PATK for faster clears and duels.',
    },
    {
      slot: 2,
      why: 'Boots of Resistance — CC reduction keeps you casting through peel attempts.',
    },
    {
      slot: 3,
      why: 'Axe of Torment — anti-squishy spike once you have Smite levels online.',
    },
    {
      slot: 4,
      why: "Frostscar's Embrace — slows on enhanced autos stick to fleeing carries.",
    },
    {
      slot: 5,
      why: 'Succubus Cloak — magic shield vs burst mages during dive windows.',
    },
    {
      slot: 6,
      why: 'Cuirass of Savagery — late bruiser item to survive focus after assassination.',
    },
  ],
  arcanaRows: [
    {
      slot: 'Set',
      rune: 'Mutation',
      effect: 'Assassin scaling for Vigor-enhanced basic attacks and burst windows.',
    },
    {
      slot: 'Spell',
      rune: 'Smite',
      effect: 'Standard jungle clear; swap Purify vs heavy hard-CC drafts.',
    },
  ],
};

const OVERRIDES: Record<string, Partial<HeroPlaybook>> = {
  musashi: MUSASHI_PLAYBOOK,
};

function passiveHook(hero: Hero): string {
  const passive = hero.skills?.find((s) => s.slot === 'passive');
  if (!passive?.description) {
    return `${hero.name} is a ${hero.lane ?? hero.role} ${hero.role} with a ${hero.difficulty.toLowerCase()} skill floor on Honor of Kings Global.`;
  }
  const first = passive.description.split(/[.!?]/)[0]?.trim();
  if (first && first.length > 20 && first.length < 160) {
    return `${hero.name}: ${first}.`;
  }
  return `${hero.name} — ${hero.role} (${hero.lane ?? 'flex'}) built around ${passive.name}.`;
}

function defaultSkillOrder(hero: Hero): HeroSkillOrder {
  const s1 = hero.skills?.find((s) => s.slot === 'skill1')?.name ?? 'Skill 1';
  const s2 = hero.skills?.find((s) => s.slot === 'skill2')?.name ?? 'Skill 2';
  const ult = hero.skills?.find((s) => s.slot === 'ultimate')?.name ?? 'Ultimate';

  const assassin = hero.role === 'Assassin';
  const mage = hero.role === 'Mage' || hero.role === 'Support';
  const marksman = hero.role === 'Marksman';

  if (assassin || hero.lane === 'Jungling') {
    return {
      priority: `Skill 2 → Skill 1 → ${ult} (max Skill 2 first)`,
      reason: `${s2} usually provides mobility or stick—max first for ganks. ${s1} second for damage. ${ult} on every level available.`,
    };
  }
  if (mage) {
    return {
      priority: `Skill 2 → Skill 1 → ${ult} (max Skill 2 first)`,
      reason: `Wave clear and poke from ${s2} first. ${s1} for trade patterns. ${ult} whenever unlocked for fight swing.`,
    };
  }
  if (marksman) {
    return {
      priority: `Skill 1 → Skill 2 → ${ult} (max Skill 1 first)`,
      reason: `${s1} is your lane trade tool—max for farm lane pressure. ${s2} second for peel or burst. ${ult} on cooldown.`,
    };
  }
  return {
    priority: `Skill 1 → Skill 2 → ${ult}`,
    reason: `Max your primary trade skill first, then ${s2} for utility, and ${ult} on every level.`,
  };
}

function defaultCombos(hero: Hero): HeroCombo[] {
  const g = hero.guide;
  const skills = (hero.skills || [])
    .filter((s) => s.slot !== 'passive')
    .map((s) => s.name);

  if (g?.combos?.length) return g.combos;

  const main =
    g?.combo ||
    (skills.length >= 2
      ? `${skills.join(' → ')} → reposition with basic attacks`
      : 'Trade with safest skill, confirm cooldowns, then commit ultimate.');

  const combos: HeroCombo[] = [
    {
      id: 'standard',
      name: 'Standard trade',
      steps: main.replace(/^Standard trade:\s*/i, ''),
      when: `${hero.lane ?? hero.role} skirmish or objective setup`,
    },
  ];

  if (hero.role === 'Assassin' || hero.lane === 'Jungling') {
    combos.push({
      id: 'all-in',
      name: 'All-in',
      steps: `${skills[skills.length - 1] ?? 'Ultimate'} after full rotation when enemy escape is down`,
      when: 'River gank or backline dive with team CC',
    });
  }

  return combos;
}

function defaultItemNotes(hero: Hero): HeroItemNote[] {
  if (hero.guide?.itemNotes?.length) return hero.guide.itemNotes;
  return (hero.build || [])
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .map((b) => ({
      slot: b.slot,
      why: b.description && b.description !== 'Data unavailable'
        ? b.description
        : `Core item #${b.slot} in the recommended ${hero.lane ?? hero.role} path.`,
    }));
}

function defaultArcanaRows(hero: Hero): HeroArcanaRow[] {
  if (hero.guide?.arcanaRows?.length) return hero.guide.arcanaRows;
  const arcana = (hero.arcana || []).filter(Boolean);
  const spells = (hero.spells || []).filter(Boolean);
  const rows: HeroArcanaRow[] = arcana.map((rune, i) => ({
    slot: i === 0 ? 'Primary' : `Rune ${i + 1}`,
    rune,
    effect: `Recommended for ${hero.role} ${hero.lane ?? ''}`.trim(),
  }));
  if (spells.length) {
    rows.push({
      slot: 'Spell',
      rune: spells.join(' / '),
      effect: hero.guide?.arcanaSpells?.split('.')[0] || 'See matchup section for swaps.',
    });
  }
  return rows;
}

export function getHeroPlaybook(hero: Hero): HeroPlaybook {
  const override = OVERRIDES[hero.slug] ?? {};
  const g = hero.guide;
  const matchups = g?.matchups;

  const hook = override.hook ?? g?.hook ?? passiveHook(hero);
  const skillOrder = override.skillOrder ?? g?.skillOrder ?? defaultSkillOrder(hero);
  const combos = override.combos ?? defaultCombos(hero);
  const itemNotes = override.itemNotes ?? defaultItemNotes(hero);
  const arcanaRows = override.arcanaRows ?? defaultArcanaRows(hero);

  const buildNames = (hero.build || [])
    .filter((b) => b.name !== 'Data unavailable')
    .map((b) => b.name)
    .slice(0, 3)
    .join(', ');

  return {
    hook,
    skillOrder,
    combos,
    itemNotes,
    arcanaRows,
    tldr: {
      build: g?.bestBuild?.split('.')[0] || `Core: ${buildNames || 'see build table'}`,
      combo: combos[0]?.steps.slice(0, 120) || g?.combo || 'Weave skills with basic attacks.',
      counters:
        matchups?.summary ||
        `Strong into ${(hero.counters || []).filter((c) => c !== 'Data unavailable').slice(0, 2).join(', ') || 'favorable drafts'}`,
    },
  };
}

const FAQ_PRIORITY = [
  'faq-best-build',
  'faq-counter',
  'faq-strong-into',
  'faq-high-rank',
  'faq-arcana',
  'faq-good-season',
  'faq-lane',
  'faq-vs-peer',
  'faq-ban',
];

export function getFeaturedFaqs(hero: Hero, limit = 5) {
  const byId = new Map(hero.faqs.map((f) => [f.id, f]));
  const picked = [];
  for (const id of FAQ_PRIORITY) {
    const f = byId.get(id);
    if (f) picked.push(f);
    if (picked.length >= limit) break;
  }
  return picked.length ? picked : hero.faqs.slice(0, limit);
}

export function formatHeroSubtitle(hero: Hero): string {
  return `${hero.lane ?? hero.role} · Tier ${hero.tier} · ${formatRate(hero.winRate)} WR · ${META_SEASON_LABEL}`;
}
