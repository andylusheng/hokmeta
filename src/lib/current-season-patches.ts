import patchesMeta from '../../data/patches.json';
import type { Locale } from '@/lib/i18n';
import type { PatchesMeta, SeasonPatchChange } from '@/types/hero';

const meta = patchesMeta as PatchesMeta;
const CURRENT_SEASON = meta.currentSeason || meta.season;
const LATEST_SYNC = meta.updated;
const RECENT_PATCH_WINDOW_DAYS = 45;

function parseDate(value?: string | null): number | null {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : time;
}

function isRecentEnough(publishedAt?: string | null): boolean {
  const published = parseDate(publishedAt);
  const latest = parseDate(`${LATEST_SYNC}T00:00:00Z`);
  if (published == null || latest == null) return false;
  const diff = latest - published;
  if (diff < 0) return false;
  return diff <= RECENT_PATCH_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

export function getCurrentSeasonHeroPatch(slug: string): SeasonPatchChange | undefined {
  const season = meta.seasons.find((entry) => entry.seasonName === CURRENT_SEASON);
  if (!season) return undefined;

  const candidates = season.changes
    .filter((entry) => entry.heroSlug === slug && entry.change && isRecentEnough(entry.publishedAt))
    .sort((a, b) => {
      const aTime = parseDate(a.publishedAt) ?? 0;
      const bTime = parseDate(b.publishedAt) ?? 0;
      return bTime - aTime;
    });

  return candidates[0];
}

export function formatCurrentSeasonPatch(
  slug: string,
  locale: Locale = 'en'
): string | null {
  const patch = getCurrentSeasonHeroPatch(slug);
  if (!patch) return null;

  const change =
    locale === 'zh-TW'
      ? patch.changeZh?.trim() || patch.change?.trim()
      : patch.change?.trim() || patch.changeZh?.trim();

  if (!change) return null;

  return `${CURRENT_SEASON}: ${change}`;
}
