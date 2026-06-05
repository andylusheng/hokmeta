'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Hero, HeroBuildItem } from '@/types/hero';
import { defaultBuildPresetIndex, getHeroBuildPresets } from '@/lib/data';

function BuildItemGrid({ items }: { items: HeroBuildItem[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.slot}
          className="flex items-start gap-3 rounded border border-hok-border bg-hok-dark/40 px-3 py-2"
        >
          {item.icon ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.icon}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded object-cover"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget;
                if (!item.itemId) return;
                const hokstats = `https://hokstats.gg/items/${item.itemId}.png`;
                const tencent = `https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.itemId}.jpg`;
                if (el.dataset.fallback === '1' && el.src !== tencent) {
                  el.dataset.fallback = '2';
                  el.src = tencent;
                } else if (!el.dataset.fallback && el.src !== hokstats) {
                  el.dataset.fallback = '1';
                  el.src = hokstats;
                }
              }}
            />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-hok-gold/20 text-xs font-bold text-hok-gold">
              {item.slot}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-100">{item.name}</p>
            {item.description && item.description !== 'Data unavailable' && (
              <p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function presetBadge(label: string, lane?: string | null) {
  if (/国服/.test(label)) return 'CN 国服';
  if (lane && lane !== 'CN preset') return lane;
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
            {presets.length} presets from HoKStats — lane builds, CN 国服套装, and
            community sets. Default matches {hero.lane ?? 'recommended'} when
            available.
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, i) => {
              const badge = presetBadge(preset.label, preset.lane);
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
                  {preset.position && (
                    <span className="mt-0.5 block text-[10px] text-gray-500">
                      {preset.position}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <BuildItemGrid items={current.items} />
    </div>
  );
}
