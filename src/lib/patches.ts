import patchesData from '../../data/patches.json';
import type { PatchesMeta, SeasonPatchGroup } from '@/types/hero';
import type { Locale } from '@/lib/i18n';

export const patchesMeta = patchesData as PatchesMeta;

export function getSeasonPatches(): SeasonPatchGroup[] {
  return patchesMeta.seasons || [];
}

export function getCurrentSeason(): string {
  return patchesMeta.currentSeason || patchesMeta.season || 'Live';
}

export function localizedChange(
  row: SeasonPatchGroup['changes'][0],
  locale: Locale
): string {
  if (locale === 'zh-TW' && row.changeZh) return row.changeZh;
  return row.change;
}

export function localizedHeroName(
  row: SeasonPatchGroup['changes'][0],
  locale: Locale
): string {
  if (locale === 'zh-TW' && row.heroNameZh) return row.heroNameZh;
  return row.heroName;
}
