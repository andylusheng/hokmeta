import heroNamesZh from '../../data/hero-names-zh.json';
import itemNamesZh from '../../data/item-names-zh.json';
import arcanaNamesZh from '../../data/arcana-names-zh.json';
import { getHeroByName, getItemById } from '@/lib/data';
import type { Hero } from '@/types/hero';
import type { Locale } from '@/lib/i18n';

const HERO_ZH = heroNamesZh as Record<string, string>;
const ITEM_ZH = itemNamesZh as Record<string, string>;
const ARCANA_ZH = arcanaNamesZh as Record<string, string>;

function decodeHtmlEntities(s: string): string {
  return s.replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

export function getHeroNameZh(slug: string): string | undefined {
  return HERO_ZH[slug];
}

/** Primary display name for UI (zh-TW uses Traditional Chinese when mapped). */
export function getHeroDisplayName(
  hero: Pick<Hero, 'slug' | 'name' | 'nameZh'>,
  locale: Locale
): string {
  if (locale === 'zh-TW') {
    return hero.nameZh || HERO_ZH[hero.slug] || hero.name;
  }
  return hero.name;
}

/** Bilingual title: `宮本武藏 Musashi` on zh-TW hero pages. */
export function formatHeroBilingualTitle(hero: Hero, locale: Locale): string {
  if (locale !== 'zh-TW') return hero.name;
  const zh = hero.nameZh || HERO_ZH[hero.slug];
  if (!zh || zh === hero.name) return hero.name;
  return `${zh} ${hero.name}`;
}

/** Translate English hero name (counter lists, FAQ) to zh when possible. */
export function translateHeroName(name: string, locale: Locale): string {
  if (locale !== 'zh-TW' || !name || name === 'Data unavailable') return name;
  const hero = getHeroByName(name);
  if (hero) {
    const zh = HERO_ZH[hero.slug];
    if (zh) return zh;
  }
  return name;
}

export function translateHeroSlug(slug: string, locale: Locale): string {
  if (locale !== 'zh-TW') return slug;
  return HERO_ZH[slug] ?? slug;
}

export function translateItemName(
  name: string,
  locale: Locale,
  itemId?: string | null
): string {
  if (locale !== 'zh-TW' || !name || name === 'Data unavailable') return name;
  if (itemId) {
    const db = getItemById(itemId);
    if (db?.nameZh) return db.nameZh;
  }
  return ITEM_ZH[name] ?? name;
}

export function translateArcanaName(name: string, locale: Locale): string {
  if (locale !== 'zh-TW' || !name) return name;
  const decoded = decodeHtmlEntities(name.trim());
  return ARCANA_ZH[decoded] ?? ARCANA_ZH[name] ?? decoded;
}

/** Comma/顿号 joined hero names for lists. */
export function formatHeroNameList(
  names: string[],
  locale: Locale,
  sep?: string
): string {
  const delimiter = sep ?? (locale === 'zh-TW' ? '、' : ', ');
  return names
    .filter((n) => n && n !== 'Data unavailable')
    .map((n) => translateHeroName(n, locale))
    .join(delimiter);
}

export function formatItemNameList(
  names: string[],
  locale: Locale,
  sep?: string
): string {
  const delimiter = sep ?? (locale === 'zh-TW' ? '、' : ', ');
  return names
    .filter((n) => n && n !== 'Data unavailable')
    .map((n) => translateItemName(n, locale))
    .join(delimiter);
}
