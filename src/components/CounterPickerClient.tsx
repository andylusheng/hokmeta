'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import { HeroSelect } from '@/components/HeroSelect';
import { HeroLinkRow, HeroUnknownRow } from '@/components/HeroLinkRow';
import { createT, type Locale } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';

export function CounterPickerClient({
  heroes,
  locale = 'en',
}: {
  heroes: Hero[];
  locale?: Locale;
}) {
  const t = createT(locale);
  const [slug, setSlug] = useState(heroes[0]?.slug ?? '');

  const hero = useMemo(
    () => heroes.find((h) => h.slug === slug),
    [heroes, slug]
  );

  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block text-sm text-gray-400">{t('tools.enemyHero')}</span>
        <HeroSelect heroes={heroes} value={slug} onChange={setSlug} />
      </div>
      {hero ? (
        <div className="card">
          <h2 className="section-title">{t('tools.countersFor', { name: hero.name })}</h2>
          <ul className="space-y-2">
            {hero.counters.map((name) => {
              const match = heroes.find(
                (h) => h.name.toLowerCase() === name.toLowerCase()
              );
              return (
                <li key={name}>
                  {match ? (
                    <HeroLinkRow hero={match} locale={locale} avatarSize={32} />
                  ) : (
                    <HeroUnknownRow name={name} avatarSize={32} />
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            {t('tools.banRate')}{' '}
            {hero.banRate != null ? `${hero.banRate}%` : t('counters.unavailable')} ·{' '}
            {t('tools.role')} {translateRole(hero.role, locale)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
