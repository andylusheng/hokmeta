import type { Hero } from '@/types/hero';
import type { Locale } from '@/lib/i18n';
import type { BuildPhilosophy, StatPriority } from '@/lib/build-rationale';

type LocalizedField = string | { en: string; 'zh-TW': string };

type Override = {
  statPriority?: StatPriority[];
  summary?: LocalizedField;
  arcanaSummary?: LocalizedField;
  itemWhy?: Record<string, LocalizedField>;
  arcanaWhy?: Record<string, LocalizedField>;
};

const OVERRIDES: Record<string, Override> = {
  'marco-polo': {
    statPriority: ['aspd', 'onhit', 'lifesteal', 'crit'],
    summary: {
      en: 'Marco scales with attack speed: more ASPD means more Skill 1 and Ultimate bullets. Stack ASPD early (Doomsday, Deepfrost, Daybreaker), add on-hit and survivability after core spike.',
      'zh-TW':
        '馬可是典型攻速收益射手：被動明確寫「額外攻速會增加技能1和技能3子彈數」。先疊攻速核心（末世、寒霜、破曉），再補續航與保命。',
    },
    arcanaSummary: {
      en: 'Red Moon + Hunt + Eagle Eye: Hunt/Red Moon push ASPD for extra barrage bullets; Eagle Eye adds pen for multi-hit damage.',
      'zh-TW': '紅月+狩獵+鷹眼：狩獵/紅月拉攻速，讓一技能與大招多射子彈；鷹眼穿透配合多段命中。',
    },
    itemWhy: {
      '1126': {
        en: 'Core ASPD item: +20% ASPD and lifesteal. Passive on-hit scales with your bullet spam — pairs with passive stacks.',
        'zh-TW': '核心攻速裝：+20%攻速與吸血。被動「破敗」配合高攻速疊層，適合馬可持续普攻與一技能掃射。',
      },
      '1135': {
        en: '35% ASPD + chain lightning on basic attacks — multiplies Marco’s bullet volume in teamfights.',
        'zh-TW': '35%攻速+普攻連鎖閃電，經典双晕套核心；高攻速讓普攻與一技能觸發更頻繁。',
      },
      '1128': {
        en: '+25% ASPD and slow on basics — kiting while channeling Skill 1.',
        'zh-TW': '+25%攻速並減速敵人，一技能掃射時更好拉扯走位。',
      },
      '1155': {
        en: 'Marksman capstone: +30% ASPD and crit — directly feeds more Skill 1/Ult bullets per passive.',
        'zh-TW': '射手神裝：+30%攻速與暴擊，直接放大被動「攻速→子彈數」收益。',
      },
    },
    arcanaWhy: {
      'Lvl 5: Red Moon': {
        en: '+ASPD rune — more bullets on Skill 1 and Ultimate.',
        'zh-TW': '攻速銘文，提升一技能/大招子彈數量。',
      },
      'Lvl 5: Hunt': {
        en: '+ASPD% — primary stat for Marco’s passive scaling.',
        'zh-TW': '攻速加成，馬可被動核心屬性。',
      },
      '5級：紅月': { en: '+ASPD rune.', 'zh-TW': '攻速銘文，多子彈。' },
      '5級：狩獵': { en: '+ASPD%.', 'zh-TW': '攻速%，被動收益。' },
    },
  },
  'luban-no-7': {
    statPriority: ['patk', 'aspd', 'crit', 'lifesteal'],
    summary: {
      en: 'Luban wants high physical attack and attack speed: passive turns every 5th basic and post-skill autos into scattershots. Build PATK breakpoints and ASPD so enhanced basics proc often.',
      'zh-TW':
        '魯班依賴高物攻與攻速：被動讓「每第5次普攻與技能後普攻」變掃射。出裝優先攻擊力與攻速，讓強化普攻觸發更勤、掃射傷害更高。',
    },
    arcanaSummary: {
      en: 'Hunt + Disaster + Eagle Eye: ASPD for passive proc rate; Disaster crit on scatter bursts; Eagle Eye pen.',
      'zh-TW': '狩獵+禍源+鷹眼：攻速加快強化普攻頻率；禍源暴擊放大掃射；鷹眼穿透。',
    },
    itemWhy: {
      '1135': {
        en: 'High ASPD + chain lightning — speeds up passive scattershot cycle.',
        'zh-TW': '高攻速+閃電鏈，加快被動掃射觸發節奏。',
      },
      '1155': {
        en: 'PATK + ASPD + crit — core marksman spike for scatter damage.',
        'zh-TW': '物攻攻速暴擊三合一，強化掃射爆發。',
      },
    },
  },
};

function locText(field: LocalizedField | undefined, locale: Locale): string | undefined {
  if (!field) return undefined;
  if (typeof field === 'string') return field;
  return locale === 'zh-TW' ? field['zh-TW'] : field.en;
}

export function getHeroRationaleOverride(
  hero: Hero,
  locale: Locale
): BuildPhilosophy | null {
  const o = OVERRIDES[hero.slug];
  if (!o) return null;
  const summary = locText(o.summary, locale);
  const arcanaSummary = locText(o.arcanaSummary, locale);
  if (!summary) return null;
  return {
    summary,
    statPriority: (o.statPriority as StatPriority[]) || [],
    passiveQuote: '',
    arcanaSummary: arcanaSummary || '',
  };
}

export function getOverrideItemWhy(
  hero: Hero,
  itemId: string | null | undefined,
  locale: Locale
): string | undefined {
  if (!itemId) return undefined;
  const o = OVERRIDES[hero.slug]?.itemWhy?.[itemId];
  return locText(o, locale);
}

export function getOverrideArcanaWhy(
  hero: Hero,
  runeName: string,
  locale: Locale
): string | undefined {
  const o = OVERRIDES[hero.slug]?.arcanaWhy?.[runeName];
  return locText(o, locale);
}
