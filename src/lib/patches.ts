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
  if (locale === 'id') return translatePatchChange(row, 'id');
  if (locale === 'fil') return translatePatchChange(row, 'fil');
  return row.change;
}

export function localizedHeroName(
  row: SeasonPatchGroup['changes'][0],
  locale: Locale
): string {
  if (locale === 'zh-TW' && row.heroNameZh) return row.heroNameZh;
  return row.heroName;
}

export function localizedPatchTag(tag: string | null | undefined, locale: Locale): string | null {
  if (!tag) return null;
  const lower = tag.toLowerCase();
  if (locale === 'id') {
    if (lower.includes('buff') || lower.includes('增')) return 'Buff';
    if (lower.includes('nerf') || lower.includes('削')) return 'Nerf';
    return 'Penyesuaian';
  }
  if (locale === 'fil') {
    if (lower.includes('buff') || lower.includes('增')) return 'Buff';
    if (lower.includes('nerf') || lower.includes('削')) return 'Nerf';
    return 'Adjustment';
  }
  return tag;
}

function translatePatchChange(
  row: SeasonPatchGroup['changes'][0],
  locale: 'id' | 'fil'
): string {
  const text = row.change.trim();
  const camp = text.match(/WR ([\d.]+)%, pick ([\d.]+)%, ban ([\d.]+)%, tier ([A-Z+]+)/i);
  if (camp) {
    const [, wr, pick, ban, tier] = camp;
    return locale === 'id'
      ? `Statistik terbaru: win rate ${wr}%, pick ${pick}%, ban ${ban}%, Tier ${tier}.`
      : `Pinakabagong stats: win rate ${wr}%, pick ${pick}%, ban ${ban}%, Tier ${tier}.`;
  }

  const matchups = text.match(/Strong into (.+) · Weak into (.+)\./i);
  if (matchups) {
    const [, strong, weak] = matchups;
    return locale === 'id'
      ? `Kuat melawan ${strong}. Perlu hati-hati terhadap ${weak}.`
      : `Malakas laban sa ${strong}. Mag-ingat laban sa ${weak}.`;
  }

  const lower = text.toLowerCase();
  const dictionary: Array<[RegExp, string, string]> = [
    [/skill mechanics upgraded/i, 'Mekanisme skill ditingkatkan.', 'Pinahusay ang skill mechanics.'],
    [/increased skill damage/i, 'Damage skill ditingkatkan.', 'Tinaasan ang damage ng skill.'],
    [/adjusted skill damage/i, 'Damage skill disesuaikan.', 'Inayos ang damage ng skill.'],
    [/adjusted skill effect/i, 'Efek skill disesuaikan.', 'Inayos ang epekto ng skill.'],
    [/reduced skill cooldown/i, 'Cooldown skill dikurangi.', 'Binawasan ang cooldown ng skill.'],
    [/reduced mana consumption/i, 'Konsumsi mana dikurangi dan damage skill disesuaikan.', 'Binawasan ang mana cost at inayos ang skill damage.'],
    [/increased recovery/i, 'Efek pemulihan ditingkatkan.', 'Tinaasan ang recovery effect.'],
    [/damage reduced/i, 'Damage dikurangi.', 'Binawasan ang damage.'],
    [/cooldown/i, 'Cooldown skill disesuaikan.', 'Inayos ang skill cooldown.'],
    [/damage/i, 'Damage skill disesuaikan.', 'Inayos ang skill damage.'],
  ];

  for (const [pattern, id, fil] of dictionary) {
    if (pattern.test(lower)) return locale === 'id' ? id : fil;
  }

  return locale === 'id'
    ? `Ada penyesuaian resmi untuk ${row.heroName}. Cek halaman hero untuk build, counter, dan tren terbaru.`
    : `May opisyal na adjustment para kay ${row.heroName}. Tingnan ang hero page para sa build, counters, at bagong trend.`;
}
