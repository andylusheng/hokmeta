'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { HeroSelect } from '@/components/HeroSelect';
import { HeroLinkRow } from '@/components/HeroLinkRow';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateLane, translateRole } from '@/lib/locale-labels';
import { loadToolData, type ToolData, type ToolHero, type ToolItem } from '@/lib/tool-data';

type DraftAdvice = {
  hero: ToolHero;
  score: number;
  matchedEnemies: ToolHero[];
  reasons: string[];
};

const tierScore: Record<string, number> = {
  'S+': 16,
  S: 12,
  A: 7,
  B: 3,
  C: 0,
};

function norm(value: string): string {
  return value.trim().toLowerCase();
}

function namesMatch(a: string, b: string): boolean {
  return norm(a) === norm(b);
}

function formatRate(value: number | null | undefined): string {
  return value == null ? 'n/a' : `${value.toFixed(1)}%`;
}

function counterNamesFor(enemy: ToolHero, heroes: ToolHero[]): string[] {
  const direct = (enemy.counteredBy || []).filter((name) => name && name !== 'Data unavailable');
  const reverse = heroes
    .filter((candidate) => (candidate.counters || []).some((name) => namesMatch(name, enemy.name)))
    .map((hero) => hero.name);
  return Array.from(new Set([...direct, ...reverse]));
}

function countersEnemy(candidate: ToolHero, enemy: ToolHero, heroes: ToolHero[]): boolean {
  return (
    counterNamesFor(enemy, heroes).some((name) => namesMatch(name, candidate.name)) ||
    (candidate.counters || []).some((name) => namesMatch(name, enemy.name))
  );
}

function roleCounterBonus(candidate: ToolHero, enemy: ToolHero): number {
  if (enemy.role === 'Marksman' || enemy.role === 'Mage') {
    return candidate.role === 'Assassin' || candidate.role === 'Warrior' ? 8 : 0;
  }
  if (enemy.role === 'Assassin') {
    return candidate.role === 'Tank' || candidate.role === 'Support' ? 10 : 0;
  }
  if (enemy.role === 'Tank' || enemy.role === 'Warrior') {
    return candidate.role === 'Marksman' || candidate.role === 'Mage' ? 8 : 0;
  }
  if (enemy.role === 'Support') {
    return candidate.role === 'Mage' || candidate.role === 'Assassin' ? 6 : 0;
  }
  return 0;
}

function buildDraftAdvice(heroes: ToolHero[], enemies: ToolHero[]): DraftAdvice[] {
  const enemySlugs = new Set(enemies.map((hero) => hero.slug));

  return heroes
    .filter((candidate) => !enemySlugs.has(candidate.slug))
    .map((candidate) => {
      const matchedEnemies: ToolHero[] = [];
      const reasons: string[] = [];
      let score = tierScore[candidate.tier] ?? 0;
      score += Math.max(0, (candidate.winRate ?? 49) - 49) * 2;
      score += Math.min(candidate.pickRate ?? 0, 5);

      for (const enemy of enemies) {
        if (countersEnemy(candidate, enemy, heroes)) {
          matchedEnemies.push(enemy);
          score += 34;
          if (candidate.lane && enemy.lane && candidate.lane === enemy.lane) score += 8;
        }
        score += roleCounterBonus(candidate, enemy);
      }

      if (matchedEnemies.length) {
        reasons.push(
          `Direct answer into ${matchedEnemies.map((hero) => hero.name).slice(0, 3).join(', ')}.`
        );
      }
      const enemyRoles = new Set(enemies.map((hero) => hero.role));
      if (candidate.role === 'Tank' || candidate.role === 'Support') {
        if (enemyRoles.has('Assassin')) reasons.push('Adds peel against assassin dive.');
        if (enemyRoles.has('Marksman')) reasons.push('Creates engage pressure on the enemy carry.');
      }
      if (candidate.role === 'Marksman' && (enemyRoles.has('Tank') || enemyRoles.has('Warrior'))) {
        reasons.push('Gives sustained DPS into frontline-heavy drafts.');
      }
      if (candidate.role === 'Mage' && enemies.some((hero) => hero.role !== 'Assassin')) {
        reasons.push('Adds wave control and objective poke before fights.');
      }
      if (candidate.tier === 'S+' || candidate.tier === 'S') {
        reasons.push(`Current ${candidate.tier} tier pick with ${formatRate(candidate.winRate)} WR.`);
      }

      return {
        hero: candidate,
        score,
        matchedEnemies,
        reasons: reasons.slice(0, 3),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function buildBanList(enemies: ToolHero[]): ToolHero[] {
  return [...enemies].sort((a, b) => {
    const scoreA =
      (tierScore[a.tier] ?? 0) * 3 +
      (a.banRate ?? 0) * 2 +
      (a.pickRate ?? 0) +
      Math.max(0, (a.winRate ?? 49) - 49) * 2;
    const scoreB =
      (tierScore[b.tier] ?? 0) * 3 +
      (b.banRate ?? 0) * 2 +
      (b.pickRate ?? 0) +
      Math.max(0, (b.winRate ?? 49) - 49) * 2;
    return scoreB - scoreA;
  });
}

function itemByName(items: ToolItem[], names: string[]): ToolItem[] {
  return names
    .map((name) => items.find((item) => namesMatch(item.name, name)))
    .filter((item): item is ToolItem => Boolean(item));
}

function recommendedItems(items: ToolItem[], enemies: ToolHero[]): { title: string; items: ToolItem[]; note: string }[] {
  const physicalPressure = enemies.filter((hero) =>
    ['Marksman', 'Assassin', 'Warrior'].includes(hero.role)
  ).length;
  const magicPressure = enemies.filter((hero) => hero.role === 'Mage').length;
  const frontlinePressure = enemies.filter((hero) =>
    ['Tank', 'Warrior', 'Support'].includes(hero.role)
  ).length;

  const groups: { title: string; items: ToolItem[]; note: string }[] = [];
  if (physicalPressure >= 2 || enemies.some((hero) => hero.role === 'Marksman')) {
    groups.push({
      title: 'Physical pressure',
      items: itemByName(items, ['Cuirass of Savagery', 'Ominous Premonition', 'Dawnlight']),
      note: 'Use armor, shields, and anti-basic-attack tools when the enemy draft has marksman or physical dive pressure.',
    });
  }
  if (magicPressure >= 1) {
    groups.push({
      title: 'Magic burst',
      items: itemByName(items, ['Succubus Cloak', 'Longnight Guardian', 'Eye of the Phoenix']),
      note: 'Prioritize magic defense and burst recovery when mid-lane damage decides the first objective fight.',
    });
  }
  if (frontlinePressure >= 2) {
    groups.push({
      title: 'Tank shred',
      items: itemByName(items, ['Starbreaker', "Daybreaker's Virtue", 'Void Staff', 'Doomsday']),
      note: 'Bring percent pierce or HP-based damage when the enemy can stand front-to-back for long fights.',
    });
  }
  if (!groups.length) {
    groups.push({
      title: 'Default safety',
      items: itemByName(items, ["Sage's Sanctuary", 'Amble - Winter', 'Blazing Cape']),
      note: 'When the enemy comp is balanced, keep one defensive slot for revive, control resistance, or mixed defense.',
    });
  }
  return groups;
}

function fightPlan(enemies: ToolHero[]): string[] {
  const roles = new Set(enemies.map((hero) => hero.role));
  const plan: string[] = [];
  if (roles.has('Marksman')) {
    plan.push('Do not hit the frontline forever; force flank vision and spend engage tools on the enemy carry.');
  }
  if (roles.has('Mage')) {
    plan.push('Spread before objectives, bait the first control spell, then fight while the mage cooldown is down.');
  }
  if (roles.has('Assassin')) {
    plan.push('Keep one hard CC or support skill for the assassin commit. Carries should not face-check river brush.');
  }
  if (roles.has('Tank') || roles.has('Warrior')) {
    plan.push('Buy penetration before forcing 5v5s. If damage is not ready, trade towers instead of starting Tyrant.');
  }
  return plan.slice(0, 4);
}

export function CounterPickerClient({
  locale = 'en',
}: {
  locale?: Locale;
}) {
  const [data, setData] = useState<ToolData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadToolData().then(setData).catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="card text-sm text-red-200">Counter data could not be loaded. Refresh the page and try again.</p>;
  }

  if (!data) {
    return <p className="card text-sm text-gray-400">Loading counter data...</p>;
  }

  return <CounterPickerWorkspace heroes={data.heroes} items={data.items} locale={locale} />;
}

function CounterPickerWorkspace({
  heroes,
  items,
  locale = 'en',
}: {
  heroes: ToolHero[];
  items: ToolItem[];
  locale?: Locale;
}) {
  const t = createT(locale);
  const [draftSlug, setDraftSlug] = useState(heroes[0]?.slug ?? '');
  const [enemySlugs, setEnemySlugs] = useState<string[]>([]);

  const selectedEnemies = useMemo(
    () =>
      enemySlugs
        .map((slug) => heroes.find((hero) => hero.slug === slug))
        .filter((hero): hero is ToolHero => Boolean(hero)),
    [heroes, enemySlugs]
  );
  const draftHero = heroes.find((hero) => hero.slug === draftSlug);

  const advice = useMemo(() => buildDraftAdvice(heroes, selectedEnemies), [heroes, selectedEnemies]);
  const bans = useMemo(() => buildBanList(selectedEnemies).slice(0, 3), [selectedEnemies]);
  const itemGroups = useMemo(() => recommendedItems(items, selectedEnemies), [items, selectedEnemies]);
  const plan = useMemo(() => fightPlan(selectedEnemies), [selectedEnemies]);

  function addEnemy() {
    if (!draftHero || enemySlugs.includes(draftHero.slug) || enemySlugs.length >= 5) return;
    setEnemySlugs((slugs) => [...slugs, draftHero.slug]);
    const next = heroes.find((hero) => hero.slug !== draftHero.slug && !enemySlugs.includes(hero.slug));
    if (next) setDraftSlug(next.slug);
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title mb-1">Enemy draft</h2>
            <p className="text-sm text-gray-400">
              Add 1-5 enemy heroes to get counter picks, ban priority, item answers, and a fight plan.
            </p>
          </div>
          <button
            type="button"
            onClick={addEnemy}
            disabled={!draftHero || enemySlugs.length >= 5 || enemySlugs.includes(draftHero.slug)}
            className="rounded border border-hok-gold px-4 py-2 text-sm font-semibold text-hok-gold transition hover:bg-hok-gold/10 disabled:cursor-not-allowed disabled:border-hok-border disabled:text-gray-600"
          >
            Add enemy
          </button>
        </div>
        <HeroSelect heroes={heroes} value={draftSlug} onChange={setDraftSlug} />

        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => {
            const hero = selectedEnemies[idx];
            return hero ? (
              <div key={hero.slug} className="rounded border border-hok-border bg-hok-dark p-3">
                <HeroLinkRow
                  hero={hero}
                  locale={locale}
                  avatarSize={36}
                  subtitle={`${translateRole(hero.role, locale)} / ${translateLane(hero.lane, locale)}`}
                  trailing={`T${hero.tier}`}
                />
                <button
                  type="button"
                  onClick={() => setEnemySlugs((slugs) => slugs.filter((slug) => slug !== hero.slug))}
                  className="mt-3 text-xs text-gray-500 transition hover:text-red-200"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                key={`empty-${idx}`}
                className="flex min-h-[82px] items-center justify-center rounded border border-dashed border-hok-border bg-hok-dark/40 text-xs text-gray-600"
              >
                Empty slot {idx + 1}
              </div>
            );
          })}
        </div>
      </section>

      {!selectedEnemies.length ? (
        <section className="card">
          <h2 className="section-title">Start with one enemy hero</h2>
          <p className="text-sm text-gray-400">
            Pick the enemy first pick or the hero your team struggles against most. The tool updates once at least one
            enemy is added.
          </p>
        </section>
      ) : (
        <>
          <section className="card">
            <h2 className="section-title">Recommended picks</h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {advice.map((entry, idx) => (
                <div key={entry.hero.slug} className="rounded border border-hok-border bg-hok-dark p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <HeroLinkRow
                      hero={entry.hero}
                      locale={locale}
                      avatarSize={42}
                      subtitle={`${translateRole(entry.hero.role, locale)} / ${translateLane(entry.hero.lane, locale)}`}
                      trailing={`#${idx + 1}`}
                    />
                    <span className="rounded border border-hok-gold/40 bg-hok-gold/10 px-2 py-1 text-xs font-semibold text-hok-gold">
                      {Math.round(entry.score)}
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {entry.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                  {entry.matchedEnemies.length > 0 && (
                    <p className="mt-3 text-xs text-gray-500">
                      Targets:{' '}
                      {entry.matchedEnemies.map((enemy) => getHeroDisplayName(enemy, locale)).join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="card">
              <h2 className="section-title">Ban priority</h2>
              <div className="space-y-3">
                {bans.map((hero, idx) => (
                  <div key={hero.slug} className="rounded border border-hok-border bg-hok-dark p-3">
                    <HeroLinkRow
                      hero={hero}
                      locale={locale}
                      avatarSize={38}
                      subtitle={`${translateRole(hero.role, locale)} / ${translateLane(hero.lane, locale)}`}
                      trailing={`Ban ${idx + 1}`}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Tier {hero.tier} / WR {formatRate(hero.winRate)} / Pick {formatRate(hero.pickRate)} / Ban{' '}
                      {formatRate(hero.banRate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h2 className="section-title">Fight plan</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                {plan.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Link
                  href={localePath(locale, '/heroes')}
                  className="rounded border border-hok-border px-3 py-1.5 text-gray-300 hover:border-hok-gold hover:text-hok-gold"
                >
                  {t('tools.relatedHeroBuilds')}
                </Link>
                <Link
                  href={localePath(locale, '/items')}
                  className="rounded border border-hok-border px-3 py-1.5 text-gray-300 hover:border-hok-gold hover:text-hok-gold"
                >
                  {t('tools.relatedItemDb')}
                </Link>
              </div>
            </section>
          </div>

          <section className="card">
            <h2 className="section-title">Recommended equipment answers</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              {itemGroups.map((group) => (
                <div key={group.title} className="rounded border border-hok-border bg-hok-dark p-4">
                  <h3 className="mb-2 font-semibold text-white">{group.title}</h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        href={localePath(locale, `/items/${item.id}`)}
                        className="flex min-w-0 items-center gap-2 rounded border border-hok-border bg-black/20 px-2 py-2 text-sm text-white hover:border-hok-gold"
                      >
                        {item.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.icon} alt="" width={32} height={32} className="rounded" />
                        ) : (
                          <span className="flex h-8 w-8 items-center justify-center rounded bg-hok-border text-xs text-gray-500">
                            {item.name.slice(0, 1)}
                          </span>
                        )}
                        <span className="max-w-[140px] truncate">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">{group.note}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <p className="text-xs text-gray-600">
        {t('tools.tierWr', {
          tier: selectedEnemies[0]?.tier ?? '-',
          wr: selectedEnemies[0]?.winRate == null ? 'Data unavailable' : `${selectedEnemies[0].winRate.toFixed(1)}%`,
        })}
      </p>
    </div>
  );
}
