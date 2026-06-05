'use client';

import type { Hero } from '@/types/hero';

export function BuildBlock({ hero }: { hero: Hero }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {hero.build.map((item) => (
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
