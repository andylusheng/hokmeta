import { createT, type Locale } from '@/lib/i18n';

const LANE_KEYS: Record<string, string> = {
  Jungling: 'lanes.jungling',
  'Mid Lane': 'lanes.mid',
  'Farm Lane': 'lanes.farm',
  'Clash Lane': 'lanes.clash',
  Roaming: 'lanes.roam',
};

const DIFFICULTY_KEYS: Record<string, string> = {
  Easy: 'difficulty.easy',
  Medium: 'difficulty.medium',
  Hard: 'difficulty.hard',
};

export function translateRole(role: string, locale: Locale): string {
  if (locale === 'en') return role;
  const t = createT(locale);
  const key = `roles.${role}`;
  const out = t(key);
  return out === key ? role : out;
}

export function translateLane(lane: string | null | undefined, locale: Locale): string {
  if (!lane || locale === 'en') return lane ?? '';
  const t = createT(locale);
  const key = LANE_KEYS[lane];
  return key ? t(key) : lane;
}

export function translateDifficulty(
  difficulty: string | null | undefined,
  locale: Locale
): string {
  if (!difficulty || locale === 'en') return difficulty ?? '';
  const t = createT(locale);
  const key = DIFFICULTY_KEYS[difficulty];
  return key ? t(key) : difficulty;
}
