'use client';

import type { Hero } from '@/types/hero';
import { createT, type Locale } from '@/lib/i18n';

const SLOT_KEYS: Record<string, string> = {
  passive: 'skills.passive',
  skill1: 'skills.skill1',
  skill2: 'skills.skill2',
  ultimate: 'skills.ultimate',
};

const SLOT_SHORT: Record<string, string> = {
  passive: 'P',
  skill1: '1',
  skill2: '2',
  ultimate: 'U',
};

export function SkillBlock({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);

  if (!hero.skills?.length) {
    return <p className="text-sm text-gray-400">{t('skills.unavailable')}</p>;
  }

  const icons = hero.skills.map((s) => s.icon);
  const sharedIcon =
    icons.length > 1 && icons.every((url) => url === icons[0]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {hero.skills.map((skill) => (
        <div
          key={skill.slot}
          className="flex gap-3 rounded border border-hok-border bg-hok-dark/40 p-3"
        >
          <div className="relative h-12 w-12 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.icon}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
              const el = e.currentTarget;
              const fallbacks = [
                hero.avatar,
                hero.avatarFallback,
                `https://hokstats.gg/heroes-icons/${hero.slug}.png`,
              ].filter((url): url is string => Boolean(url));
              const next = fallbacks.find((url) => el.src !== url);
              if (next) el.src = next;
            }}
            />
            {sharedIcon && (
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded bg-hok-gold text-[10px] font-bold text-hok-dark">
                {SLOT_SHORT[skill.slot] ?? '?'}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-hok-gold">
              {SLOT_KEYS[skill.slot] ? t(SLOT_KEYS[skill.slot]) : skill.slot}
            </p>
            <p className="text-sm font-semibold text-white">{skill.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-400">
              {skill.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
