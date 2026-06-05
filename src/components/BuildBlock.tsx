'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import { defaultBuildPresetIndex, getHeroBuildPresets } from '@/lib/data';
import { BuildTable } from '@/components/BuildTable';

function presetBadge(label: string, lane?: string | null) {
  if (/国服/.test(label)) return 'CN 国服';
  if (lane && lane !== 'CN preset') return lane;
  return null;
}

function presetHint(label: string, lane?: string | null): string | null {
  const l = label.toLowerCase();
  if (/jungl|jungle/.test(l) || lane === 'Jungling') return 'Jungle clear & gank tempo';
  if (/clash|top|lane 1/.test(l) || lane === 'Clash Lane') return 'Side lane bruiser / split';
  if (/farm|bot|adc|marksman/.test(l) || lane === 'Farm Lane') return 'Farm lane scaling';
  if (/mid/.test(l) || lane === 'Mid Lane') return 'Mid pressure & roam';
  if (/roam|support/.test(l) || lane === 'Roaming') return 'Roaming peel & vision';
  if (/国服/.test(label)) return 'CN server community preset';
  if (/recommend|default/.test(l)) return 'Default ranked path';
  return null;
}

export function BuildBlock({ hero }: { hero: Hero }) {
  const presets = useMemo(() => getHeroBuildPresets(hero), [hero]);
  const defaultIdx = useMemo(() => defaultBuildPresetIndex(hero), [hero]);
  const [active, setActive] = useState(defaultIdx);

  useEffect(() => {
    setActive(defaultIdx);
  }, [hero.slug, defaultIdx]);

  const current = presets[active] ?? presets[0];

  if (!current) {
    return <p className="text-sm text-gray-400">Build data unavailable.</p>;
  }

  return (
    <div className="space-y-4">
      {presets.length > 1 && (
        <div>
          <p className="mb-2 text-xs text-gray-500">
            {presets.length} presets — switch by draft, lane, or CN meta. Default
            matches {hero.lane ?? 'recommended'} when available.
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, i) => {
              const badge = presetBadge(preset.label, preset.lane);
              const hint = presetHint(preset.label, preset.lane);
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
                  {hint && (
                    <span className="mt-0.5 block text-[10px] text-gray-500">
                      {hint}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <BuildTable hero={hero} items={current.items} />
    </div>
  );
}
