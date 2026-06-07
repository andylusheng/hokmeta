import type {
  Hero,
  HeroArcanaRow,
  HeroCombo,
  HeroItemNote,
  HeroSkillOrder,
} from '@/types/hero';
import { formatRate } from '@/lib/data';
import {
  getLocalizedArcana,
  getLocalizedBuild,
  getLocalizedSkills,
  getLocalizedSpells,
} from '@/lib/hero-locale-data';
import { createT, getMetaSeasonLabel, type Locale } from '@/lib/i18n';
import { getZhPlaybookOverride } from '@/lib/hero-content-zh';
import { resolveLocalizedGuide } from '@/lib/hero-guide-locale';
import {
  translateDifficulty,
  translateLane,
  translateRole,
} from '@/lib/locale-labels';
import {
  formatHeroNameList,
  formatItemNameList,
  getHeroDisplayName,
  translateArcanaName,
} from '@/lib/locale-names';
import { getArcanaRationale, getItemSlotWhy } from '@/lib/build-rationale';

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

function passiveHook(hero: Hero, locale: Locale): string {
  const t = createT(locale);
  const name = getHeroDisplayName(hero, locale);
  const passive = getLocalizedSkills(hero, locale).find((s) => s.slot === 'passive');
  if (!passive?.description) {
    return t('playbook.passiveHookNoDesc', {
      name,
      lane: translateLane(hero.lane, locale) || translateRole(hero.role, locale),
      role: translateRole(hero.role, locale),
      difficulty: translateDifficulty(hero.difficulty, locale),
    });
  }
  const first = passive.description.split(/[.!?]/)[0]?.trim();
  if (first && first.length > 20 && first.length < 160) {
    return t('playbook.passiveHookWithDesc', { name, desc: first });
  }
  return t('playbook.passiveHookNamed', {
    name,
    role: translateRole(hero.role, locale),
    lane: translateLane(hero.lane, locale) || t('playbook.flex'),
    passive: passive.name,
  });
}

function defaultSkillOrder(hero: Hero, locale: Locale): HeroSkillOrder {
  const t = createT(locale);
  const skills = getLocalizedSkills(hero, locale);
  const s1 = skills.find((s) => s.slot === 'skill1')?.name ?? t('skills.skill1');
  const s2 = skills.find((s) => s.slot === 'skill2')?.name ?? t('skills.skill2');
  const ult = skills.find((s) => s.slot === 'ultimate')?.name ?? t('skills.ultimate');

  const assassin = hero.role === 'Assassin';
  const mage = hero.role === 'Mage' || hero.role === 'Support';
  const marksman = hero.role === 'Marksman';

  if (assassin || hero.lane === 'Jungling') {
    return {
      priority: t('playbook.skillOrder.junglePriority', { s1, s2, ult }),
      reason: t('playbook.skillOrder.jungleReason', { s1, s2, ult }),
    };
  }
  if (mage) {
    return {
      priority: t('playbook.skillOrder.magePriority', { s1, s2, ult }),
      reason: t('playbook.skillOrder.mageReason', { s1, s2, ult }),
    };
  }
  if (marksman) {
    return {
      priority: t('playbook.skillOrder.adcPriority', { s1, s2, ult }),
      reason: t('playbook.skillOrder.adcReason', { s1, s2, ult }),
    };
  }
  return {
    priority: t('playbook.skillOrder.defaultPriority', { s1, s2, ult }),
    reason: t('playbook.skillOrder.defaultReason', { s1, s2, ult }),
  };
}

function defaultCombos(hero: Hero, locale: Locale): HeroCombo[] {
  const t = createT(locale);
  const g = hero.guide;
  const skills = getLocalizedSkills(hero, locale)
    .filter((s) => s.slot !== 'passive')
    .map((s) => s.name);

  if (g?.combos?.length && locale === 'en') return g.combos;

  const main =
    g?.combo ||
    (skills.length >= 2
      ? `${skills.join(' → ')} → ${t('playbook.repositionAa')}`
      : t('playbook.safeTrade'));

  const combos: HeroCombo[] = [
    {
      id: 'standard',
      name: t('playbook.comboStandard'),
      steps: main.replace(/^Standard trade:\s*/i, ''),
      when: t('playbook.comboStandardWhen', {
        lane: translateLane(hero.lane, locale) || translateRole(hero.role, locale),
      }),
    },
  ];

  if (hero.role === 'Assassin' || hero.lane === 'Jungling') {
    combos.push({
      id: 'all-in',
      name: t('playbook.comboAllIn'),
      steps: t('playbook.comboAllInSteps', {
        ult: skills[skills.length - 1] ?? t('skills.ultimate'),
      }),
      when: t('playbook.comboAllInWhen'),
    });
  }

  return combos;
}

function defaultItemNotes(hero: Hero, locale: Locale): HeroItemNote[] {
  if (hero.guide?.itemNotes?.length && locale === 'en' && hero.slug === 'musashi') {
    return hero.guide.itemNotes;
  }
  return getLocalizedBuild(hero, locale)
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .map((b) => ({
      slot: b.slot,
      why: getItemSlotWhy(hero, b, locale),
    }));
}

function defaultArcanaRows(hero: Hero, locale: Locale): HeroArcanaRow[] {
  if (hero.guide?.arcanaRows?.length && locale === 'en') return hero.guide.arcanaRows;
  const t = createT(locale);
  const arcana = getLocalizedArcana(hero, locale).filter(Boolean);
  const spells = getLocalizedSpells(hero, locale).filter(Boolean);
  const rows: HeroArcanaRow[] = arcana.map((rune, i) => ({
    slot: i === 0 ? t('playbook.arcanaPrimary') : t('playbook.arcanaRune', { n: i + 1 }),
    rune: translateArcanaName(rune, locale),
    effect: getArcanaRationale(hero, rune, locale),
  }));
  if (spells.length) {
    rows.push({
      slot: t('playbook.arcanaSpell'),
      rune: spells.join(' / '),
      effect:
        hero.guide?.arcanaSpells?.split('.')[0] || t('playbook.arcanaSpellHint'),
    });
  }
  return rows;
}

function resolveOverride(hero: Hero, locale: Locale): Partial<HeroPlaybook> {
  if (locale === 'zh-TW') {
    return getZhPlaybookOverride(hero.slug) ?? OVERRIDES[hero.slug] ?? {};
  }
  return OVERRIDES[hero.slug] ?? {};
}

export function getHeroPlaybook(hero: Hero, locale: Locale = 'en'): HeroPlaybook {
  const override = resolveOverride(hero, locale);
  const g = hero.guide;
  const matchups = g?.matchups;
  const t = createT(locale);

  const hook = override.hook ?? (locale === 'en' ? g?.hook : undefined) ?? passiveHook(hero, locale);
  const skillOrder =
    override.skillOrder ??
    (locale === 'en' ? g?.skillOrder : undefined) ??
    defaultSkillOrder(hero, locale);
  const combos =
    override.combos ??
    (locale === 'en' && g?.combos?.length ? g.combos : defaultCombos(hero, locale));
  const itemNotes = override.itemNotes ?? defaultItemNotes(hero, locale);
  const arcanaRows = override.arcanaRows ?? defaultArcanaRows(hero, locale);

  const buildNames = formatItemNameList(
    getLocalizedBuild(hero, locale)
      .filter((b) => b.name !== 'Data unavailable')
      .map((b) => b.name)
      .slice(0, 3),
    locale
  );

  const countersInto = formatHeroNameList(
    (hero.counters || []).filter((c) => c !== 'Data unavailable').slice(0, 2),
    locale
  );

  return {
    hook,
    skillOrder,
    combos,
    itemNotes,
    arcanaRows,
    tldr: override.tldr ?? {
      build:
        locale === 'en'
          ? g?.bestBuild?.split('.')[0] || `Core: ${buildNames || 'see build table'}`
          : t('playbook.tldrBuild', { items: buildNames || t('playbook.seeBuildTable') }),
      combo:
        combos[0]?.steps.slice(0, 120) ||
        (locale === 'en' ? g?.combo : undefined) ||
        t('playbook.tldrCombo'),
      counters:
        matchups?.summary && locale === 'en'
          ? matchups.summary
          : countersInto
            ? t('playbook.tldrCounters', { names: countersInto })
            : t('playbook.tldrCountersDefault'),
    },
  };
}

export function getLocalizedGuide(hero: Hero, locale: Locale = 'en') {
  return resolveLocalizedGuide(hero, locale);
}

/** @deprecated Use getLocalizedFaqs from hero-faq.ts */
export function getFeaturedFaqs(hero: Hero, limit = 5) {
  const byId = new Map(hero.faqs.map((f) => [f.id, f]));
  const picked = [];
  for (const id of [
    'faq-best-build',
    'faq-counter',
    'faq-strong-into',
    'faq-high-rank',
    'faq-arcana',
  ]) {
    const f = byId.get(id);
    if (f) picked.push(f);
    if (picked.length >= limit) break;
  }
  return picked.length ? picked : hero.faqs.slice(0, limit);
}

export function formatHeroSubtitle(hero: Hero, locale: Locale = 'en'): string {
  const t = createT(locale);
  const lane = translateLane(hero.lane, locale) || translateRole(hero.role, locale);
  return t('hero.subtitle', {
    lane,
    tier: hero.tier,
    wr: formatRate(hero.winRate),
    season: getMetaSeasonLabel(locale),
  });
}
