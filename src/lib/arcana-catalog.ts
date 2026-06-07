import arcanaData from '../../data/arcana.json';
import type { ArcanaRune } from '@/types/hero';
import type { Locale } from '@/lib/i18n';
import { translateArcanaName } from '@/lib/locale-names';

export const arcanaCatalog = arcanaData as ArcanaRune[];

export function getArcanaById(id: string): ArcanaRune | undefined {
  return arcanaCatalog.find((r) => r.id === id);
}

export function getLocalizedRuneName(rune: ArcanaRune, locale: Locale): string {
  if (locale === 'zh-TW' && rune.nameZh) return rune.nameZh;
  return translateArcanaName(rune.name, locale);
}

export function getLocalizedRuneDescription(rune: ArcanaRune, locale: Locale): string {
  if (locale === 'zh-TW' && rune.descriptionZh) return rune.descriptionZh;
  return rune.description;
}
