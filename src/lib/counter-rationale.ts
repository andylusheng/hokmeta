import { formatRate, getHeroByName, heroes } from '@/lib/data';
import { getLocalizedSkills } from '@/lib/hero-locale-data';
import { createT, getMetaSeasonLabel, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { heroToLane } from '@/lib/lanes';
import { getClimbPicksByLane } from '@/lib/climb-picks';
import type { Hero } from '@/types/hero';
import {
  getCounterOverride,
  getOverrideFaqItems,
  getOverrideFaqUltimate,
  locList,
} from '@/lib/counter-rationale-overrides';

// 只改这个函数！其他所有代码全部保留！
export function getCounterList(hero: Hero): string[] {
  // 导入英雄数据（只在这个函数里导入，不影响其他代码）
  const heroes = require('../../public/api/heroes.json') as Hero[];
  const currentHeroName = hero.name.trim().toLowerCase();

  // 1. 保留原始数据
  const original = (hero.counteredBy || []).filter(c => c && c !== 'Data unavailable');
  
  // 2. 反向查找所有克制当前英雄的角色
  const reverse = heroes
    .filter(h => (h.counters || []).some(n => n.toLowerCase() === currentHeroName))
    .map(h => h.name);

  // 3. 合并去重，最多5个
  return [...new Set([...original, ...reverse])].slice(0, 5);
}

function resolveCounterHero(name: string): Hero | undefined {
  return getHeroByName(name);
}

function formatCounterNames(names: string[], locale: Locale): string {
  return names
    .map((n) => {
      const h = resolveCounterHero(n);
      return h ? getHeroDisplayName(h, locale) : n;
    })
    .join(locale === 'zh-TW' ? '、' : ', ');
}

function genericWhyBullets(hero: Hero, counterNames: string[], locale: Locale): string[] {
  const t = createT(locale);
  const counters = counterNames
    .map(resolveCounterHero)
    .filter((h): h is Hero => Boolean(h));

  const bullets: string[] = [];
  const roles = new Set(counters.map((c) => c.role));

  if (roles.has('Tank') || roles.has('Support')) {
    bullets.push(
      t('counterPage.whyGenericPeel', { name: getHeroDisplayName(hero, locale) })
    );
  }
  if (roles.has('Assassin')) {
    bullets.push(
      t('counterPage.whyGenericAssassin', { name: getHeroDisplayName(hero, locale) })
    );
  }
  if (roles.has('Mage')) {
    bullets.push(
      t('counterPage.whyGenericMage', { name: getHeroDisplayName(hero, locale) })
    );
  }
  if (!bullets.length && counters.length) {
    bullets.push(
      t('counterPage.whyGenericDraft', {
        list: formatCounterNames(counterNames.slice(0, 3), locale),
      })
    );
  }

  const passive = getLocalizedSkills(hero, locale).find((s) => s.slot === 'passive');
  if (passive && bullets.length < 3) {
    const hook = passive.description.split(/[。.!\n]/)[0]?.trim();
    if (hook && hook.length > 12 && hook.length < 120) {
      bullets.push(t('counterPage.whyGenericPassive', { hook }));
    }
  }

  while (bullets.length < 2) {
    bullets.push(t('counterPage.whyGenericEarly', { name: getHeroDisplayName(hero, locale) }));
    break;
  }

  return bullets.slice(0, 3);
}

function genericMistakes(hero: Hero, locale: Locale): string[] {
  const t = createT(locale);
  const name = getHeroDisplayName(hero, locale);
  const role = hero.role;

  if (role === 'Marksman') {
    return [
      t('counterPage.mistakeMarksmanPeel', { name }),
      t('counterPage.mistakeMarksmanPosition'),
      t('counterPage.mistakeMarksmanItems'),
    ];
  }
  if (role === 'Assassin') {
    return [
      t('counterPage.mistakeAssassinVision', { name }),
      t('counterPage.mistakeAssassinDive'),
      t('counterPage.mistakeAssassinReset'),
    ];
  }
  if (role === 'Mage') {
    return [
      t('counterPage.mistakeMagePosition', { name }),
      t('counterPage.mistakeMageCooldown'),
      t('counterPage.mistakeMageWave'),
    ];
  }
  if (role === 'Tank' || role === 'Support') {
    return [
      t('counterPage.mistakeTankIsolate', { name }),
      t('counterPage.mistakeTankKite'),
      t('counterPage.mistakeTankItems'),
    ];
  }
  return [
    t('counterPage.mistakeDefaultTrade', { name }),
    t('counterPage.mistakeDefaultObjective'),
    t('counterPage.mistakeDefaultDraft'),
  ];
}

export function getCounterWhyBullets(hero: Hero, locale: Locale): string[] {
  const override = locList(getCounterOverride(hero.slug)?.why, locale);
  if (override.length) return override.slice(0, 3);
  return genericWhyBullets(hero, getCounterList(hero), locale);
}

export function getCounterMistakes(hero: Hero, locale: Locale): string[] {
  const override = locList(getCounterOverride(hero.slug)?.mistakes, locale);
  if (override.length) return override.slice(0, 3);
  return genericMistakes(hero, locale);
}

export function getCounterFaqs(
  hero: Hero,
  locale: Locale
): { question: string; answer: string }[] {
  const t = createT(locale);
  const name = getHeroDisplayName(hero, locale);
  const counters = getCounterList(hero);
  const list = formatCounterNames(counters.slice(0, 5), locale);
  const date = hero.dataUpdated || '—';
  const wr = formatRate(hero.winRate);
  const pick = formatRate(hero.pickRate);
  const ban = formatRate(hero.banRate);

  const ultAnswer =
    getOverrideFaqUltimate(hero.slug, locale) ||
    t('counterPage.faqUltimateGeneric', { name });

  const itemsAnswer =
    getOverrideFaqItems(hero.slug, locale) ||
    t('counterPage.faqItemsGeneric', { name, role: hero.role });

  return [
    {
      question: t('counterPage.faqWho', { name }),
      answer:
        counters.length > 0
          ? t('counterPage.faqWhoAnswer', { name, list })
          : t('counterPage.faqWhoNone', { name }),
    },
    {
      question: t('counterPage.faqUltimate', { name }),
      answer: ultAnswer,
    },
    {
      question: t('counterPage.faqItems', { name }),
      answer: itemsAnswer,
    },
    {
      question: t('counterPage.faqSeason', { name, season: getMetaSeasonLabel(locale) }),
      answer: t('counterPage.faqSeasonAnswer', {
        name,
        tier: hero.tier,
        wr,
        pick,
        ban,
        date,
      }),
    },
  ];
}

export function getRelatedCounterHeroes(hero: Hero, limit = 3): Hero[] {
  const lane = heroToLane(hero);
  const picks = getClimbPicksByLane(lane, 8)
    .map((p) => p.hero)
    .filter((h) => h.slug !== hero.slug);

  const seen = new Set<string>();
  const related: Hero[] = [];
  for (const h of picks) {
    if (seen.has(h.slug)) continue;
    seen.add(h.slug);
    related.push(h);
    if (related.length >= limit) break;
  }

  if (related.length < limit) {
    for (const h of heroes) {
      if (h.slug === hero.slug || seen.has(h.slug)) continue;
      if (heroToLane(h) !== lane) continue;
      related.push(h);
      seen.add(h.slug);
      if (related.length >= limit) break;
    }
  }

  return related;
}