import type { Hero, HeroBuildItem } from '@/types/hero';
import { getItemById } from '@/lib/data';
import { getLocalizedSkills } from '@/lib/hero-locale-data';
import {
  getLocalizedItemDescription,
  getLocalizedItemLabel,
  getLocalizedItemPassives,
} from '@/lib/item-locale';
import { arcanaCatalog, getLocalizedRuneName } from '@/lib/arcana-catalog';
import { translateArcanaName } from '@/lib/locale-names';
import { createT, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import {
  getHeroRationaleOverride,
  getOverrideArcanaWhy,
  getOverrideItemWhy,
} from '@/lib/build-rationale-overrides';

export type StatPriority =
  | 'aspd'
  | 'patk'
  | 'crit'
  | 'lifesteal'
  | 'onhit'
  | 'cdr'
  | 'matk'
  | 'pen'
  | 'tank'
  | 'ms';

export interface BuildPhilosophy {
  summary: string;
  statPriority: StatPriority[];
  passiveQuote: string;
  arcanaSummary: string;
}

const STAT_KEYWORDS: Record<StatPriority, RegExp> = {
  aspd: /攻速|attack speed|aspd|firing|bullet|子彈|射擊|扫射|掃射/i,
  patk: /物理攻击|physical attack|patk|物攻|攻擊力|攻击力/i,
  crit: /暴击|暴擊|crit/i,
  lifesteal: /吸血|lifesteal/i,
  onhit: /普攻|basic attack|on-?hit|破败|破敗|闪电|閃電|chain/i,
  cdr: /冷却|冷卻|cdr/i,
  matk: /法术|法術|magic|matk|法攻/i,
  pen: /穿透|penetration|pen/i,
  tank: /生命|hp|防御|防禦|armor|surviv/i,
  ms: /移速|movement|mspd/i,
};

function detectPrioritiesFromPassive(text: string): StatPriority[] {
  const found: StatPriority[] = [];
  for (const [stat, re] of Object.entries(STAT_KEYWORDS) as [StatPriority, RegExp][]) {
    if (re.test(text)) found.push(stat);
  }
  if (!found.length) return ['patk'];
  return [...new Set(found)];
}

function roleDefaultPriority(hero: Hero): StatPriority[] {
  if (hero.role === 'Marksman') return ['aspd', 'patk', 'crit', 'lifesteal'];
  if (hero.role === 'Mage') return ['matk', 'cdr', 'pen'];
  if (hero.role === 'Assassin') return ['patk', 'cdr', 'pen'];
  if (hero.role === 'Tank') return ['tank', 'ms'];
  if (hero.role === 'Support') return ['tank', 'cdr', 'ms'];
  return ['patk', 'tank'];
}

function passiveSkill(hero: Hero, locale: Locale) {
  return getLocalizedSkills(hero, locale).find((s) => s.slot === 'passive');
}

function itemStatHints(itemId: string | null | undefined, locale: Locale): StatPriority[] {
  const item = itemId ? getItemById(itemId) : undefined;
  if (!item) return [];
  const text = `${getLocalizedItemDescription(item, locale)} ${getLocalizedItemLabel(item, locale) || ''} ${getLocalizedItemPassives(item, locale).join(' ')}`;
  return detectPrioritiesFromPassive(text);
}

function matchPriority(itemStats: StatPriority[], heroPriority: StatPriority[]): StatPriority | null {
  for (const p of heroPriority) {
    if (itemStats.includes(p)) return p;
  }
  return itemStats[0] ?? null;
}

export function getBuildPhilosophy(hero: Hero, locale: Locale): BuildPhilosophy {
  const override = getHeroRationaleOverride(hero, locale);
  const passive = passiveSkill(hero, locale);
  const passiveQuote = passive?.description?.split('\n')[0]?.trim() || '';

  if (override) {
    return {
      ...override,
      passiveQuote: passiveQuote || override.passiveQuote,
    };
  }

  const t = createT(locale);
  const fromPassive = passive?.description
    ? detectPrioritiesFromPassive(passive.description)
    : [];
  const statPriority =
    fromPassive.length >= 2 ? fromPassive : roleDefaultPriority(hero);

  const priorityLabels = statPriority
    .slice(0, 4)
    .map((p) => t(`rationale.stat.${p}`))
    .join(locale === 'zh-TW' ? '、' : ', ');

  const name = getHeroDisplayName(hero, locale);
  const summary = t('rationale.summaryDefault', { name, priorities: priorityLabels });

  return {
    summary,
    statPriority,
    passiveQuote,
    arcanaSummary: t('rationale.arcanaDefault', { priorities: priorityLabels }),
  };
}

export function getItemSlotWhy(
  hero: Hero,
  buildItem: HeroBuildItem,
  locale: Locale
): string {
  const override = getOverrideItemWhy(hero, buildItem.itemId, locale);
  if (override) return override;

  const t = createT(locale);
  const philosophy = getBuildPhilosophy(hero, locale);
  const dbItem = buildItem.itemId ? getItemById(buildItem.itemId) : undefined;
  const passives = dbItem ? getLocalizedItemPassives(dbItem, locale) : [];
  const itemStats = itemStatHints(buildItem.itemId, locale);
  const match = matchPriority(itemStats, philosophy.statPriority);

  if (passives.length && match) {
    const passiveShort = passives[0].split('\n').slice(0, 2).join(' — ');
    return t('rationale.itemWhyMatch', {
      stat: t(`rationale.stat.${match}`),
      passive: passiveShort,
    });
  }

  if (passives.length) {
    return passives[0].split('\n')[0];
  }

  const label = dbItem ? getLocalizedItemLabel(dbItem, locale) : null;
  if (label) {
    return t('rationale.itemWhyLabel', {
      label,
      stat: match ? t(`rationale.stat.${match}`) : t('rationale.stat.core'),
    });
  }

  if (buildItem.description && buildItem.description !== 'Data unavailable') {
    return buildItem.description.split('\n').pop() || buildItem.description;
  }

  return t('rationale.itemWhyFallback', { slot: buildItem.slot });
}

export function getArcanaRationale(
  hero: Hero,
  runeName: string,
  locale: Locale
): string {
  const override = getOverrideArcanaWhy(hero, runeName, locale);
  if (override) return override;

  const t = createT(locale);
  const philosophy = getBuildPhilosophy(hero, locale);
  const decoded = translateArcanaName(runeName, locale);

  const rune = arcanaCatalog.find(
    (r) => r.name === runeName || r.nameZh === runeName || r.name === decoded
  );

  const desc = rune
    ? locale === 'zh-TW' && rune.descriptionZh
      ? rune.descriptionZh
      : rune.description
    : '';

  const runeStats = desc ? detectPrioritiesFromPassive(desc) : [];
  const match = matchPriority(runeStats, philosophy.statPriority);

  if (match && desc && rune) {
    return t('rationale.arcanaWhyMatch', {
      rune: getLocalizedRuneName(rune, locale) || decoded,
      stat: t(`rationale.stat.${match}`),
      effect: desc.split('\n')[0],
    });
  }

  if (desc) return desc.split('\n').join(' · ');

  return t('rationale.arcanaFallback', {
    priorities: philosophy.statPriority
      .slice(0, 2)
      .map((p) => t(`rationale.stat.${p}`))
      .join(locale === 'zh-TW' ? '、' : ', '),
  });
}
