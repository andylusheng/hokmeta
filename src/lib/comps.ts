import compsData from '../../data/comps.json';
import { getHeroBySlug } from '@/lib/data';
import type { Hero } from '@/types/hero';
import type { GameLane } from '@/lib/lanes';
import type { Locale } from '@/lib/i18n';

export interface CompDuo {
  id: string;
  heroes: Hero[];
  lane: GameLane;
  tags: string[];
  synergy: string;
  dataNote: string;
}

export interface CompTemplate {
  id: string;
  title: string;
  heroes: Hero[];
  description: string;
  dataNote: string;
}

type RawComps = typeof compsData;

function locText(
  field: { en: string; 'zh-TW': string } | string,
  locale: Locale
): string {
  if (typeof field === 'string') return field;
  return locale === 'zh-TW' ? field['zh-TW'] : field.en;
}

/** Ranked duos must not be two supports / double roam enablers. */
function isValidDuo(heroes: Hero[]): boolean {
  if (heroes.length !== 2) return false;
  const [a, b] = heroes;
  if (a.role === 'Support' && b.role === 'Support') return false;
  const bothRoam =
    a.lane === 'Roaming' &&
    b.lane === 'Roaming' &&
    a.role !== 'Marksman' &&
    b.role !== 'Marksman';
  if (bothRoam && a.role === 'Support' && b.role === 'Support') return false;
  return true;
}

export function getCompDuos(locale: Locale = 'en'): CompDuo[] {
  const raw = compsData as RawComps;
  return raw.duos
    .map((d) => {
      const heroes = d.slugs.map((s) => getHeroBySlug(s)).filter(Boolean) as Hero[];
      if (heroes.length < 2 || !isValidDuo(heroes)) return null;
      return {
        id: d.id,
        heroes,
        lane: d.lane as GameLane,
        tags: d.tags,
        synergy: locText(d.synergy, locale),
        dataNote: locText(d.dataNote, locale),
      };
    })
    .filter(Boolean) as CompDuo[];
}

export function getCompTemplates(locale: Locale = 'en'): CompTemplate[] {
  const raw = compsData as RawComps;
  return raw.templates
    .map((t) => {
      const heroes = t.coreSlugs
        .map((s) => getHeroBySlug(s))
        .filter(Boolean) as Hero[];
      if (!heroes.length) return null;
      return {
        id: t.id,
        title: locText(t.title, locale),
        heroes,
        description: locText(t.description, locale),
        dataNote: locText(t.dataNote, locale),
      };
    })
    .filter(Boolean) as CompTemplate[];
}

export function getCompsMeta() {
  const raw = compsData as RawComps;
  return { updated: raw.updated, source: raw.source };
}
