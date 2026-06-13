import type { Hero } from '@/types/hero';
import { heroes } from '@/lib/data';
import { createT, type Locale } from '@/lib/i18n';
import { getLocalizedGuideZh } from '@/lib/hero-content-zh';
import { buildLaningTip, buildHighRankNote, topPeer, peerComparison } from '@/lib/hero-faq';

const TEAMFIGHT_KEYS: Record<string, string> = {
  Tank: 'guide.teamfight.tank',
  Warrior: 'guide.teamfight.warrior',
  Assassin: 'guide.teamfight.assassin',
  Mage: 'guide.teamfight.mage',
  Marksman: 'guide.teamfight.marksman',
  Support: 'guide.teamfight.support',
};

export function buildTeamfightTip(hero: Hero, locale: Locale): string {
  const t = createT(locale);
  const key = TEAMFIGHT_KEYS[hero.role];
  if (key) {
    const tip = t(key);
    if (tip !== key) return tip;
  }
  return t('guide.teamfight.default');
}

export interface LocalizedGuideContent {
  laning: string;
  teamfight: string;
  highRank: string;
  comparisons: string[];
}

/** Generate localized comparison text for a hero vs its top same-role peers */
function buildComparisons(hero: Hero, locale: Locale, count = 2): string[] {
  const peers = [...heroes]
    .filter(
      (h) =>
        h.slug !== hero.slug &&
        h.role === hero.role &&
        (h.lane === hero.lane || !hero.lane)
    )
    .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))
    .slice(0, count);

  return peers.map((peer) => peerComparison(hero, peer, locale));
}

/** Camp-data-derived guide copy (lane/role templates + live stats). Not invented prose. */
export function getDerivedGuideContent(
  hero: Hero,
  locale: Locale
): LocalizedGuideContent {
  return {
    laning: buildLaningTip(hero, locale),
    teamfight: buildTeamfightTip(hero, locale),
    highRank: buildHighRankNote(hero, locale),
    comparisons: locale === 'zh-TW' ? buildComparisons(hero, locale) : (hero.guide?.comparisons ?? []),
  };
}

export function resolveLocalizedGuide(
  hero: Hero,
  locale: Locale
): LocalizedGuideContent | null {
  const g = hero.guide;
  if (!g && locale === 'en') return null;

  if (locale === 'zh-TW') {
    const premium = getLocalizedGuideZh(hero.slug);
    if (premium?.laning || premium?.teamfight || premium?.highRank) {
      const derived = getDerivedGuideContent(hero, locale);
      return {
        laning: premium.laning ?? derived.laning,
        teamfight: premium.teamfight ?? derived.teamfight,
        highRank: premium.highRank ?? derived.highRank,
        comparisons: premium.comparisons ?? derived.comparisons,
      };
    }
    if (g || hero.lane || hero.role) {
      return getDerivedGuideContent(hero, locale);
    }
    return null;
  }

  if (!g) return null;
  return {
    laning: g.laning,
    teamfight: g.teamfight,
    highRank: g.highRank,
    comparisons: g.comparisons ?? [],
  };
}
