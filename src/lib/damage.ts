import type { GameItem, Hero, HeroBuildItem } from '@/types/hero';

export type DamageType = 'physical' | 'magical' | 'true';

export interface CombatStats {
  hp: number;
  physicalAttack: number;
  magicalAttack: number;
  physicalDefense: number;
  magicalDefense: number;
  attackSpeed: number;
  critRate: number;
  cooldownReduction: number;
  physicalPierceFlat: number;
  magicalPierceFlat: number;
  physicalPiercePercent: number;
  magicalPiercePercent: number;
}

export interface GrowthStats {
  level1: Pick<
    CombatStats,
    'hp' | 'physicalAttack' | 'magicalAttack' | 'physicalDefense' | 'magicalDefense' | 'attackSpeed'
  >;
  growth: Pick<
    CombatStats,
    'hp' | 'physicalAttack' | 'magicalAttack' | 'physicalDefense' | 'magicalDefense' | 'attackSpeed'
  >;
}

export interface DamageComponentFormula {
  id: string;
  label: string;
  type: DamageType;
  base: number[];
  hits?: number;
  totalAdRatio?: number;
  extraAdRatio?: number;
  apRatio?: number;
  targetHpRatio?: number;
  note?: string;
}

export interface DamageHeroProfile {
  slug: string;
  dataQuality: 'beta' | 'verified';
  sourceNote: string;
  stats: GrowthStats;
  skills: DamageComponentFormula[];
}

export interface TargetPreset {
  id: string;
  label: string;
  description: string;
  stats: Pick<CombatStats, 'hp' | 'physicalDefense' | 'magicalDefense'>;
}

export interface DamageBreakdownRow {
  id: string;
  label: string;
  type: DamageType;
  raw: number;
  defense: number;
  effectiveDefense: number;
  damage: number;
  note?: string;
}

export interface DamageResult {
  totalRaw: number;
  totalDamage: number;
  rows: DamageBreakdownRow[];
  attackerStats: CombatStats;
  targetStats: Pick<CombatStats, 'hp' | 'physicalDefense' | 'magicalDefense'>;
}

const emptyStats: CombatStats = {
  hp: 0,
  physicalAttack: 0,
  magicalAttack: 0,
  physicalDefense: 0,
  magicalDefense: 0,
  attackSpeed: 0,
  critRate: 0,
  cooldownReduction: 0,
  physicalPierceFlat: 0,
  magicalPierceFlat: 0,
  physicalPiercePercent: 0,
  magicalPiercePercent: 0,
};

const roleDefaults: Record<string, GrowthStats> = {
  Marksman: {
    level1: { hp: 3200, physicalAttack: 170, magicalAttack: 0, physicalDefense: 85, magicalDefense: 50, attackSpeed: 0 },
    growth: { hp: 210, physicalAttack: 14, magicalAttack: 0, physicalDefense: 18, magicalDefense: 9, attackSpeed: 2.5 },
  },
  Mage: {
    level1: { hp: 3000, physicalAttack: 155, magicalAttack: 0, physicalDefense: 75, magicalDefense: 50, attackSpeed: 0 },
    growth: { hp: 190, physicalAttack: 10, magicalAttack: 0, physicalDefense: 16, magicalDefense: 9, attackSpeed: 1.5 },
  },
  Assassin: {
    level1: { hp: 3350, physicalAttack: 180, magicalAttack: 0, physicalDefense: 90, magicalDefense: 50, attackSpeed: 0 },
    growth: { hp: 220, physicalAttack: 15, magicalAttack: 0, physicalDefense: 18, magicalDefense: 9, attackSpeed: 2 },
  },
  Warrior: {
    level1: { hp: 3500, physicalAttack: 175, magicalAttack: 0, physicalDefense: 100, magicalDefense: 50, attackSpeed: 0 },
    growth: { hp: 240, physicalAttack: 13, magicalAttack: 0, physicalDefense: 20, magicalDefense: 9, attackSpeed: 1.8 },
  },
  Tank: {
    level1: { hp: 3700, physicalAttack: 165, magicalAttack: 0, physicalDefense: 115, magicalDefense: 50, attackSpeed: 0 },
    growth: { hp: 270, physicalAttack: 11, magicalAttack: 0, physicalDefense: 22, magicalDefense: 10, attackSpeed: 1.5 },
  },
  Support: {
    level1: { hp: 3400, physicalAttack: 155, magicalAttack: 0, physicalDefense: 95, magicalDefense: 50, attackSpeed: 0 },
    growth: { hp: 230, physicalAttack: 10, magicalAttack: 0, physicalDefense: 19, magicalDefense: 10, attackSpeed: 1.5 },
  },
};

export const targetPresets: TargetPreset[] = [
  {
    id: 'marksman',
    label: 'Marksman / squishy',
    description: 'Low defense carry target with mostly damage items.',
    stats: { hp: 6200, physicalDefense: 320, magicalDefense: 230 },
  },
  {
    id: 'mage',
    label: 'Mage',
    description: 'Mid-lane mage with one defensive item or boots.',
    stats: { hp: 6900, physicalDefense: 390, magicalDefense: 300 },
  },
  {
    id: 'fighter',
    label: 'Fighter',
    description: 'Side-lane bruiser with mixed health and defense.',
    stats: { hp: 8800, physicalDefense: 620, magicalDefense: 420 },
  },
  {
    id: 'tank',
    label: 'Tank',
    description: 'Frontline tank with multiple defense items.',
    stats: { hp: 11800, physicalDefense: 980, magicalDefense: 650 },
  },
];

const b = (values: number[]) => values;

export const damageHeroProfiles: Record<string, DamageHeroProfile> = {
  'hou-yi': {
    slug: 'hou-yi',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration: use for calculator flow; replace with verified in-client values when collected.',
    stats: roleDefaults.Marksman,
    skills: [
      { id: 'skill1', label: 'Skill 1 enhanced arrows', type: 'physical', base: b([120, 150, 180, 210, 240, 270]), totalAdRatio: 0.65, hits: 3 },
      { id: 'skill2', label: 'Skill 2 center hit', type: 'physical', base: b([300, 360, 420, 480, 540, 600]), extraAdRatio: 0.8 },
      { id: 'ultimate', label: 'Ultimate arrow', type: 'magical', base: b([700, 1000, 1300]), extraAdRatio: 1 },
    ],
  },
  'marco-polo': {
    slug: 'marco-polo',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for attack-speed marksman damage and passive true damage.',
    stats: roleDefaults.Marksman,
    skills: [
      { id: 'skill1', label: 'Skill 1 full burst', type: 'physical', base: b([150, 180, 210, 240, 270, 300]), totalAdRatio: 0.18, hits: 9 },
      { id: 'passive', label: 'Passive true damage proc', type: 'true', base: b([120, 160, 200, 240, 280, 320]), targetHpRatio: 0.03, hits: 2 },
      { id: 'ultimate', label: 'Ultimate channel sample', type: 'physical', base: b([120, 180, 240]), totalAdRatio: 0.22, hits: 12 },
    ],
  },
  angela: {
    slug: 'angela',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for burst combo comparison.',
    stats: roleDefaults.Mage,
    skills: [
      { id: 'skill1', label: 'Skill 1 full missiles', type: 'magical', base: b([350, 420, 490, 560, 630, 700]), apRatio: 0.75 },
      { id: 'skill2', label: 'Skill 2 stun orb', type: 'magical', base: b([300, 360, 420, 480, 540, 600]), apRatio: 0.45 },
      { id: 'ultimate', label: 'Ultimate beam sample', type: 'magical', base: b([900, 1350, 1800]), apRatio: 1.4 },
    ],
  },
  daji: {
    slug: 'daji',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for one-shot combo testing.',
    stats: roleDefaults.Mage,
    skills: [
      { id: 'skill1', label: 'Skill 1 swipe', type: 'magical', base: b([520, 620, 720, 820, 920, 1020]), apRatio: 1.05 },
      { id: 'skill2', label: 'Skill 2 charm', type: 'magical', base: b([285, 320, 355, 390, 425, 460]), apRatio: 0.66 },
      { id: 'ultimate', label: 'Ultimate full foxfire', type: 'magical', base: b([325, 405, 485]), apRatio: 0.75, hits: 5 },
    ],
  },
  'luban-no-7': {
    slug: 'luban-no-7',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for tank-shred passive testing.',
    stats: roleDefaults.Marksman,
    skills: [
      { id: 'passive', label: 'Passive sweep', type: 'physical', base: b([90, 110, 130, 150, 170, 190]), totalAdRatio: 0.32, targetHpRatio: 0.02, hits: 3 },
      { id: 'skill1', label: 'Grenade', type: 'physical', base: b([350, 420, 490, 560, 630, 700]), extraAdRatio: 0.75 },
      { id: 'ultimate', label: 'Ultimate shell sample', type: 'physical', base: b([500, 750, 1000]), extraAdRatio: 1 },
    ],
  },
  'dian-wei': {
    slug: 'dian-wei',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for bruiser burst and true-damage sample.',
    stats: roleDefaults.Warrior,
    skills: [
      { id: 'skill1', label: 'Skill 1 enhanced hit', type: 'physical', base: b([250, 300, 350, 400, 450, 500]), extraAdRatio: 1 },
      { id: 'skill2', label: 'Skill 2 slash', type: 'physical', base: b([300, 360, 420, 480, 540, 600]), extraAdRatio: 0.8 },
      { id: 'ultimate', label: 'Ultimate true damage', type: 'true', base: b([350, 525, 700]), extraAdRatio: 1.2 },
    ],
  },
  zilong: {
    slug: 'zilong',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for fighter engage combo.',
    stats: roleDefaults.Warrior,
    skills: [
      { id: 'skill1', label: 'Skill 1 stab', type: 'physical', base: b([250, 300, 350, 400, 450, 500]), extraAdRatio: 0.85 },
      { id: 'skill2', label: 'Skill 2 flurry', type: 'physical', base: b([95, 115, 135, 155, 175, 195]), totalAdRatio: 0.32, hits: 4 },
      { id: 'ultimate', label: 'Ultimate knock-up', type: 'physical', base: b([450, 675, 900]), extraAdRatio: 1.3 },
    ],
  },
  'li-bai': {
    slug: 'li-bai',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for assassin combo damage.',
    stats: roleDefaults.Assassin,
    skills: [
      { id: 'skill1', label: 'Skill 1 double dash', type: 'physical', base: b([300, 360, 420, 480, 540, 600]), extraAdRatio: 0.7, hits: 2 },
      { id: 'skill2', label: 'Skill 2 ring edge', type: 'physical', base: b([350, 420, 490, 560, 630, 700]), extraAdRatio: 1 },
      { id: 'ultimate', label: 'Ultimate full strikes', type: 'physical', base: b([220, 290, 360]), extraAdRatio: 0.5, hits: 5 },
    ],
  },
  ying: {
    slug: 'ying',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for warrior/jungle combo testing.',
    stats: roleDefaults.Warrior,
    skills: [
      { id: 'skill1', label: 'Skill 1 sweep', type: 'physical', base: b([280, 340, 400, 460, 520, 580]), extraAdRatio: 0.85 },
      { id: 'skill2', label: 'Skill 2 thrust', type: 'physical', base: b([320, 385, 450, 515, 580, 645]), extraAdRatio: 0.9 },
      { id: 'ultimate', label: 'Ultimate full hit', type: 'physical', base: b([700, 1050, 1400]), extraAdRatio: 1.6 },
    ],
  },
  augran: {
    slug: 'augran',
    dataQuality: 'beta',
    sourceNote: 'Beta calibration for magic bruiser damage.',
    stats: roleDefaults.Warrior,
    skills: [
      { id: 'skill1', label: 'Skill 1 slash', type: 'magical', base: b([300, 360, 420, 480, 540, 600]), apRatio: 0.55 },
      { id: 'skill2', label: 'Skill 2 harvest', type: 'magical', base: b([420, 510, 600, 690, 780, 870]), apRatio: 0.75 },
      { id: 'ultimate', label: 'Ultimate execute sample', type: 'true', base: b([500, 750, 1000]), targetHpRatio: 0.06 },
    ],
  },
};

export function getDamageProfile(hero: Pick<Hero, 'slug' | 'role'>): DamageHeroProfile {
  return (
    damageHeroProfiles[hero.slug] ?? {
      slug: hero.slug,
      dataQuality: 'beta',
      sourceNote: 'Role baseline only: no hero-specific scaling profile has been entered yet.',
      stats: roleDefaults[hero.role] ?? roleDefaults.Warrior,
      skills: [
        { id: 'skill1', label: 'Skill 1 baseline', type: hero.role === 'Mage' ? 'magical' : 'physical', base: b([260, 320, 380, 440, 500, 560]), extraAdRatio: hero.role === 'Mage' ? 0 : 0.75, apRatio: hero.role === 'Mage' ? 0.65 : 0 },
        { id: 'skill2', label: 'Skill 2 baseline', type: hero.role === 'Mage' ? 'magical' : 'physical', base: b([320, 390, 460, 530, 600, 670]), extraAdRatio: hero.role === 'Mage' ? 0 : 0.85, apRatio: hero.role === 'Mage' ? 0.75 : 0 },
        { id: 'ultimate', label: 'Ultimate baseline', type: hero.role === 'Mage' ? 'magical' : 'physical', base: b([650, 950, 1250]), extraAdRatio: hero.role === 'Mage' ? 0 : 1.2, apRatio: hero.role === 'Mage' ? 1.1 : 0 },
      ],
    }
  );
}

export function statsAtLevel(growth: GrowthStats, level: number): CombatStats {
  const capped = Math.min(15, Math.max(1, level));
  const steps = capped - 1;
  return {
    ...emptyStats,
    hp: growth.level1.hp + growth.growth.hp * steps,
    physicalAttack: growth.level1.physicalAttack + growth.growth.physicalAttack * steps,
    magicalAttack: growth.level1.magicalAttack + growth.growth.magicalAttack * steps,
    physicalDefense: growth.level1.physicalDefense + growth.growth.physicalDefense * steps,
    magicalDefense: growth.level1.magicalDefense + growth.growth.magicalDefense * steps,
    attackSpeed: growth.level1.attackSpeed + growth.growth.attackSpeed * steps,
  };
}

function readStat(text: string, labels: string[]): number {
  for (const label of labels) {
    const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\+\\s*([\\d,]+(?:\\.\\d+)?)`, 'i');
    const match = text.match(re);
    if (match) return Number(match[1].replace(/,/g, ''));
  }
  return 0;
}

function readPercent(text: string, labels: string[]): number {
  for (const label of labels) {
    const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\+\\s*([\\d.]+)%`, 'i');
    const match = text.match(re);
    if (match) return Number(match[1]) / 100;
  }
  return 0;
}

function levelScale(level: number, min: number, max: number): number {
  const capped = Math.min(15, Math.max(1, level));
  return min + ((max - min) * (capped - 1)) / 14;
}

export function itemStats(
  item: Pick<GameItem, 'id' | 'description' | 'passiveSkills'>,
  level: number,
  heroRole?: string
): CombatStats {
  const text = `${item.description}\n${(item.passiveSkills ?? []).join('\n')}`;
  const stats = { ...emptyStats };
  stats.hp += readStat(text, ['HP', 'Max HP']);
  stats.physicalAttack += readStat(text, ['PATK', 'Physical Attack']);
  stats.magicalAttack += readStat(text, ['MATK', 'Magical Attack']);
  stats.physicalDefense += readStat(text, ['PDEF', 'Physical Defense']);
  stats.magicalDefense += readStat(text, ['MDEF', 'Magical Defense']);
  stats.attackSpeed += readPercent(text, ['ASPD', 'Attack Speed']);
  stats.critRate += readPercent(text, ['Crit Rate']);
  stats.cooldownReduction += readPercent(text, ['CDR', 'Cooldown Reduction']);

  if (item.id === '1137') stats.physicalPierceFlat += levelScale(level, 90, 180);
  if (item.id === '1424') stats.magicalPierceFlat += levelScale(level, 60, 120);
  if (item.id === '1244') {
    stats.magicalAttack += 100;
    stats.magicalPierceFlat += 150;
  }
  if (item.id === '1155') stats.physicalPiercePercent += heroRole === 'Marksman' ? 0.3 : 0.15;
  if (item.id === '1131') stats.physicalPiercePercent += 0.3;
  if (item.id === '1231') stats.magicalPiercePercent += 0.45;
  if (item.id === '1727') stats.magicalPierceFlat += levelScale(level, 120, 240);

  return stats;
}

export function combineStats(parts: CombatStats[]): CombatStats {
  return parts.reduce(
    (acc, cur) => ({
      hp: acc.hp + cur.hp,
      physicalAttack: acc.physicalAttack + cur.physicalAttack,
      magicalAttack: acc.magicalAttack + cur.magicalAttack,
      physicalDefense: acc.physicalDefense + cur.physicalDefense,
      magicalDefense: acc.magicalDefense + cur.magicalDefense,
      attackSpeed: acc.attackSpeed + cur.attackSpeed,
      critRate: acc.critRate + cur.critRate,
      cooldownReduction: acc.cooldownReduction + cur.cooldownReduction,
      physicalPierceFlat: acc.physicalPierceFlat + cur.physicalPierceFlat,
      magicalPierceFlat: acc.magicalPierceFlat + cur.magicalPierceFlat,
      physicalPiercePercent: Math.min(0.8, acc.physicalPiercePercent + cur.physicalPiercePercent),
      magicalPiercePercent: Math.min(0.8, acc.magicalPiercePercent + cur.magicalPiercePercent),
    }),
    { ...emptyStats }
  );
}

export function getBuildItemIds(build: Array<Pick<HeroBuildItem, 'itemId'>>): string[] {
  return build.map((item) => item.itemId).filter((id): id is string => Boolean(id));
}

export function defenseMultiplier(effectiveDefense: number): number {
  if (effectiveDefense <= 0) return 1;
  return 602 / (602 + effectiveDefense);
}

export function effectiveDefense(
  defense: number,
  percentPierce: number,
  flatPierce: number
): number {
  return Math.max(0, defense * (1 - percentPierce) - flatPierce);
}

export function calculateDamage(input: {
  profile: DamageHeroProfile;
  level: number;
  skillLevel: number;
  selectedSkillIds: string[];
  basicAttackCount: number;
  selectedItems: Array<Pick<GameItem, 'id' | 'description' | 'passiveSkills'>>;
  target: Pick<CombatStats, 'hp' | 'physicalDefense' | 'magicalDefense'>;
  heroRole?: string;
}): DamageResult {
  const baseStats = statsAtLevel(input.profile.stats, input.level);
  const equipment = combineStats(input.selectedItems.map((item) => itemStats(item, input.level, input.heroRole)));
  const attackerStats = combineStats([baseStats, equipment]);
  if (input.selectedItems.some((item) => item.id === '1232')) {
    attackerStats.magicalAttack *= 1.3;
  }
  const extraAd = Math.max(0, attackerStats.physicalAttack - baseStats.physicalAttack);
  const rows: DamageBreakdownRow[] = [];

  if (input.basicAttackCount > 0) {
    const raw = attackerStats.physicalAttack * input.basicAttackCount;
    const def = input.target.physicalDefense;
    const eff = effectiveDefense(def, attackerStats.physicalPiercePercent, attackerStats.physicalPierceFlat);
    rows.push({
      id: 'basic',
      label: `${input.basicAttackCount} basic attack${input.basicAttackCount > 1 ? 's' : ''}`,
      type: 'physical',
      raw,
      defense: def,
      effectiveDefense: eff,
      damage: raw * defenseMultiplier(eff),
    });
  }

  const skillIndex = Math.max(0, input.skillLevel - 1);
  for (const skill of input.profile.skills) {
    if (!input.selectedSkillIds.includes(skill.id)) continue;
    const base = skill.base[Math.min(skillIndex, skill.base.length - 1)] ?? skill.base[skill.base.length - 1] ?? 0;
    const hits = skill.hits ?? 1;
    const raw =
      (base +
        (skill.totalAdRatio ?? 0) * attackerStats.physicalAttack +
        (skill.extraAdRatio ?? 0) * extraAd +
        (skill.apRatio ?? 0) * attackerStats.magicalAttack +
        (skill.targetHpRatio ?? 0) * input.target.hp) *
      hits;
    const defense =
      skill.type === 'magical'
        ? input.target.magicalDefense
        : skill.type === 'physical'
          ? input.target.physicalDefense
          : 0;
    const eff =
      skill.type === 'magical'
        ? effectiveDefense(defense, attackerStats.magicalPiercePercent, attackerStats.magicalPierceFlat)
        : skill.type === 'physical'
          ? effectiveDefense(defense, attackerStats.physicalPiercePercent, attackerStats.physicalPierceFlat)
          : 0;
    const damage = skill.type === 'true' ? raw : raw * defenseMultiplier(eff);
    rows.push({
      id: skill.id,
      label: skill.label,
      type: skill.type,
      raw,
      defense,
      effectiveDefense: eff,
      damage,
      note: skill.note,
    });
  }

  return {
    rows,
    attackerStats,
    targetStats: input.target,
    totalRaw: rows.reduce((sum, row) => sum + row.raw, 0),
    totalDamage: rows.reduce((sum, row) => sum + row.damage, 0),
  };
}
