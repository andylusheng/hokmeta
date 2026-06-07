import type { GameItem } from '@/types/hero';
import type { Locale } from '@/lib/i18n';
import { translateItemName } from '@/lib/locale-names';

export function getLocalizedItemName(item: GameItem, locale: Locale): string {
  if (locale === 'zh-TW' && item.nameZh) return item.nameZh;
  return translateItemName(item.name, locale, item.id);
}

export function getLocalizedItemDescription(item: GameItem, locale: Locale): string {
  if (locale === 'zh-TW' && item.descriptionZh) return item.descriptionZh;
  return item.description;
}

export function getLocalizedItemLabel(item: GameItem, locale: Locale): string | null {
  if (locale === 'zh-TW' && item.descLabelZh) return item.descLabelZh;
  return item.descLabel || null;
}

export function getLocalizedItemPassives(item: GameItem, locale: Locale): string[] {
  if (locale === 'zh-TW' && item.passiveSkillsZh?.length) {
    return item.passiveSkillsZh;
  }
  return item.passiveSkills || [];
}
