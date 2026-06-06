'use client';

import { useMemo, useState } from 'react';
import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';
import { BuildBlock } from '@/components/BuildBlock';
import { HeroSelect } from '@/components/HeroSelect';
import { createT, type Locale } from '@/lib/i18n';

export function BuildGeneratorClient({
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
        <span className="mb-2 block text-sm text-gray-400">{t('tools.selectHero')}</span>
        <HeroSelect heroes={heroes} value={slug} onChange={setSlug} />
      </div>
      {hero ? (
        <div className="card">
          <h2 className="section-title">{t('tools.buildPath', { name: hero.name })}</h2>
          <BuildBlock hero={hero} locale={locale} />
          <p className="mt-4 text-sm text-gray-400">
            {t('tools.tierWr', {
              tier: hero.tier,
              wr: formatRate(hero.winRate),
            })}
          </p>
        </div>
      ) : null}
    </div>
  );
}
