import type { Hero } from '@/types/hero';
import { heroes, formatRate } from '@/lib/data';
import { createT, type Locale } from '@/lib/i18n';
import { translateLane, translateRole } from '@/lib/locale-labels';

const FAQ_PRIORITY = [
  'faq-best-build',
  'faq-counter',
  'faq-strong-into',
  'faq-high-rank',
  'faq-arcana',
  'faq-good-season',
  'faq-lane',
  'faq-vs-peer',
  'faq-ban',
] as const;

export interface HeroFaq {
  id: string;
  question: string;
  answer: string;
}

function tierNote(hero: Hero, locale: Locale): string {
  const t = createT(locale);
  if (hero.tier === 'S+' || hero.tier === 'S') return t('faq.tierNoteStrong');
  if (hero.tier === 'A') return t('faq.tierNoteSolid');
  return t('faq.tierNoteNiche');
}

function counterStruggle(hero: Hero, locale: Locale): string {
  const t = createT(locale);
  if (hero.role === 'Marksman') return t('faq.struggleDive');
  if (hero.role === 'Assassin') return t('faq.strugglePeel');
  return t('faq.struggleRange');
}

const LANING_TIP_KEYS: Record<string, string> = {
  Jungling: 'faq.laning.jungling',
  'Mid Lane': 'faq.laning.mid',
  'Farm Lane': 'faq.laning.farm',
  'Clash Lane': 'faq.laning.clash',
  Roaming: 'faq.laning.roam',
};

export function buildLaningTip(hero: Hero, locale: Locale): string {
  const t = createT(locale);
  const lane = hero.lane || hero.role;
  const key = hero.lane ? LANING_TIP_KEYS[hero.lane] : undefined;
  if (key) {
    const tip = t(key);
    if (tip !== key) return tip;
  }
  return t('faq.laningDefault', {
    name: hero.name,
    lane: translateLane(lane, locale) || translateRole(hero.role, locale),
  });
}

export function buildHighRankNote(hero: Hero, locale: Locale): string {
  const t = createT(locale);
  const parts: string[] = [];
  const wr = formatRate(hero.winRate);
  const pick = formatRate(hero.pickRate);
  const ban = formatRate(hero.banRate);

  if (hero.tier === 'S+' || hero.tier === 'S') {
    parts.push(t('faq.highRankStaple', { name: hero.name, tier: hero.tier }));
  } else if (hero.tier === 'A') {
    parts.push(t('faq.highRankViable', { name: hero.name, wr }));
  } else {
    parts.push(t('faq.highRankNiche', { name: hero.name, tier: hero.tier, wr }));
  }

  const banRate = hero.banRate ?? 0;
  const pickRate = hero.pickRate ?? 0;
  const winRate = hero.winRate ?? 0;

  if (banRate >= 0.5) {
    parts.push(t('faq.highRankBan', { name: hero.name, ban }));
  } else if (pickRate >= 0.8) {
    parts.push(t('faq.highRankPick', { name: hero.name, pick }));
  } else if (pickRate < 0.2) {
    parts.push(t('faq.highRankLowPick', { pick }));
  }

  if (winRate >= 52) {
    parts.push(t('faq.highRankAboveAvg'));
  } else if (winRate < 49) {
    parts.push(t('faq.highRankBelowAvg'));
  }

  return parts.join(' ');
}

function topPeer(hero: Hero): Hero | undefined {
  return [...heroes]
    .filter(
      (h) =>
        h.slug !== hero.slug &&
        h.role === hero.role &&
        (h.lane === hero.lane || !hero.lane)
    )
    .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))[0];
}

function peerComparison(hero: Hero, peer: Hero, locale: Locale): string {
  const t = createT(locale);
  const wrDiff =
    hero.winRate != null && peer.winRate != null
      ? hero.winRate - peer.winRate
      : null;
  let wrNote = '';
  if (wrDiff != null) {
    wrNote =
      wrDiff > 0
        ? t('faq.peerWrWin', { name: hero.name, peer: peer.name, diff: wrDiff.toFixed(1) })
        : t('faq.peerWrLose', { peer: peer.name, diff: Math.abs(wrDiff).toFixed(1) });
  }
  return t('faq.peerCompare', {
    name: hero.name,
    peer: peer.name,
    peerRole: translateRole(peer.role, locale),
    peerTier: peer.tier,
    peerPick: formatRate(peer.pickRate),
    peerWr: formatRate(peer.winRate),
    wrNote,
    lane: translateLane(hero.lane, locale) || translateRole(hero.role, locale),
    peerLane: translateLane(peer.lane, locale) || translateRole(peer.role, locale),
  });
}

function buildZhTWFaqs(hero: Hero): HeroFaq[] {
  const t = createT('zh-TW');
  const buildNames = (hero.build || [])
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .map((b) => b.name)
    .slice(0, 6)
    .join('、');
  const arcana = (hero.arcana || []).filter(Boolean).join('、') || t('faq.seeBuild');
  const spells = (hero.spells || []).join(' / ') || 'Flash';
  const into = (hero.counters || [])
    .filter((c) => c !== 'Data unavailable')
    .slice(0, 4)
    .join('、') || t('faq.flexCc');
  const weak = (hero.counteredBy || [])
    .filter((c) => c !== 'Data unavailable')
    .slice(0, 4)
    .join('、') || t('faq.diveComp');
  const peer = topPeer(hero);
  const date = hero.dataUpdated ?? 'meta';
  const role = translateRole(hero.role, 'zh-TW');
  const lane = translateLane(hero.lane, 'zh-TW') || role;

  const faqs: HeroFaq[] = [
    {
      id: 'faq-good-season',
      question: t('faq.q.goodSeason', { name: hero.name }),
      answer: t('faq.a.goodSeason', {
        name: hero.name,
        tier: hero.tier,
        role,
        wr: formatRate(hero.winRate),
        pick: formatRate(hero.pickRate),
        ban: formatRate(hero.banRate),
        date,
        tierNote: tierNote(hero, 'zh-TW'),
      }),
    },
    {
      id: 'faq-best-build',
      question: t('faq.q.bestBuild', { name: hero.name }),
      answer: t('faq.a.bestBuild', { name: hero.name, build: buildNames, arcana, spells }),
    },
    {
      id: 'faq-counter',
      question: t('faq.q.counter', { name: hero.name }),
      answer: t('faq.a.counter', {
        name: hero.name,
        weak,
        lane,
        struggle: counterStruggle(hero, 'zh-TW'),
      }),
    },
    {
      id: 'faq-strong-into',
      question: t('faq.q.strongInto', { name: hero.name }),
      answer: t('faq.a.strongInto', { name: hero.name, into, lane }),
    },
    {
      id: 'faq-high-rank',
      question: t('faq.q.highRank', { name: hero.name }),
      answer: buildHighRankNote(hero, 'zh-TW'),
    },
    {
      id: 'faq-lane',
      question: t('faq.q.lane', { name: hero.name }),
      answer: t('faq.a.lane', {
        name: hero.name,
        lane,
        roles: hero.roles || role,
        tip: buildLaningTip(hero, 'zh-TW'),
      }),
    },
    {
      id: 'faq-arcana',
      question: t('faq.q.arcana', { name: hero.name }),
      answer: t('faq.a.arcana', { name: hero.name, arcana, spells }),
    },
  ];

  if (peer) {
    faqs.push({
      id: 'faq-vs-peer',
      question: t('faq.q.vsPeer', { name: hero.name, peer: peer.name }),
      answer: peerComparison(hero, peer, 'zh-TW'),
    });
  }

  const banRate = hero.banRate ?? 0;
  const pickRate = hero.pickRate ?? 0;
  let banAnswer: string;
  if (banRate >= 0.3) {
    banAnswer = t('faq.a.banYes', { name: hero.name, ban: formatRate(hero.banRate), role });
  } else if (pickRate >= 1) {
    banAnswer = t('faq.a.banOptional', {
      name: hero.name,
      role,
      pick: formatRate(hero.pickRate),
      ban: formatRate(hero.banRate),
    });
  } else {
    banAnswer = t('faq.a.banLow', { ban: formatRate(hero.banRate), role });
  }

  faqs.push({
    id: 'faq-ban',
    question: t('faq.q.ban', { name: hero.name }),
    answer: banAnswer,
  });

  return faqs;
}

function pickFeatured(faqs: HeroFaq[], limit: number): HeroFaq[] {
  const byId = new Map(faqs.map((f) => [f.id, f]));
  const picked: HeroFaq[] = [];
  for (const id of FAQ_PRIORITY) {
    const f = byId.get(id);
    if (f) picked.push(f);
    if (picked.length >= limit) break;
  }
  return picked.length ? picked : faqs.slice(0, limit);
}

export function getLocalizedFaqs(
  hero: Hero,
  locale: Locale = 'en',
  limit = 5
): HeroFaq[] {
  if (locale === 'zh-TW') {
    return pickFeatured(buildZhTWFaqs(hero), limit);
  }
  const byId = new Map(hero.faqs.map((f) => [f.id, f]));
  const picked: HeroFaq[] = [];
  for (const id of FAQ_PRIORITY) {
    const f = byId.get(id);
    if (f) picked.push(f);
    if (picked.length >= limit) break;
  }
  return picked.length ? picked : hero.faqs.slice(0, limit);
}
