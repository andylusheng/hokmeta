'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Hero, HeroItemNote } from '@/types/hero';
import { defaultBuildPresetIndex, getHeroBuildPresets } from '@/lib/data';
import { BuildTable } from '@/components/BuildTable';
import { createT, type Locale } from '@/lib/i18n';

function presetBadge(label: string, lane?: string | null) {
  if (/国服/.test(label)) return 'CN 国服';
  if (lane && lane !== 'CN preset') return lane;
  return null;
}

function presetHintKey(label: string, lane?: string | null): string | null {
  const l = label.toLowerCase();
  if (/jungl|jungle/.test(l) || lane === 'Jungling') return 'build.presetJungle';
  if (/clash|top|lane 1/.test(l) || lane === 'Clash Lane') return 'build.presetClash';
  if (/farm|bot|adc|marksman/.test(l) || lane === 'Farm Lane') return 'build.presetFarm';
  if (/mid/.test(l) || lane === 'Mid Lane') return 'build.presetMid';
  if (/roam|support/.test(l) || lane === 'Roaming') return 'build.presetRoam';
  if (/国服/.test(label)) return 'build.presetCn';
  if (/recommend|default/.test(l)) return 'build.presetDefault';
  return null;
}

export function BuildBlock({
  hero,
  itemNotes,
  locale = 'en',
}: {
  hero: Pick<Hero, 'slug' | 'lane' | 'build' | 'buildZh' | 'builds' | 'buildsZh'>;
  itemNotes: HeroItemNote[];
  locale?: Locale;
}) {
  const t = createT(locale);
  const presets = useMemo(() => getHeroBuildPresets(hero, locale), [hero, locale]);
  const defaultIdx = useMemo(() => defaultBuildPresetIndex(hero, locale), [hero, locale]);
  const [active, setActive] = useState(defaultIdx);

  useEffect(() => {
    setActive(defaultIdx);
  }, [hero.slug, defaultIdx]);

  const current = presets[active] ?? presets[0];

  if (!current) {
    return <p className="text-sm text-gray-400">{t('counters.unavailable')}</p>;
  }

  return (
    <div className="space-y-4">
      {presets.length > 1 && (
        <div>
          <p className="mb-2 text-xs text-gray-500">
            {t('build.presetsHint', {
              count: presets.length,
              lane: hero.lane ?? 'recommended',
            })}
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, i) => {
              const badge = presetBadge(preset.label, preset.lane);
              const hintKey = presetHintKey(preset.label, preset.lane);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded border px-3 py-1.5 text-left text-sm transition ${
                    i === active
                      ? 'border-hok-gold bg-hok-gold/15 text-white'
                      : 'border-hok-border bg-hok-card text-gray-300 hover:border-hok-gold/40'
                  }`}
                >
                  <span className="font-medium">{preset.label}</span>
                  {badge && (
                    <span className="ml-1.5 text-[10px] uppercase tracking-wide text-hok-gold">
                      {badge}
                    </span>
                  )}
                  {hintKey && (
                    <span className="mt-0.5 block text-[10px] text-gray-500">
                      {t(hintKey)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <BuildTable items={current.items} itemNotes={itemNotes} locale={locale} />
    </div>
  );
}
