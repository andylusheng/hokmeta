'use client';

import { useEffect, useMemo, useState } from 'react';
import type { GameItem, Hero, HeroBuildPreset } from '@/types/hero';
import { HeroSelect } from '@/components/HeroSelect';
import { createT, type Locale } from '@/lib/i18n';
import {
  calculateDamage,
  defenseMultiplier,
  getBuildItemIds,
  getDamageProfile,
  targetPresets,
  type DamageResult,
} from '@/lib/damage';

const copy = {
  en: {
    hero: 'Hero',
    level: 'Hero level',
    skillLevel: 'Skill level',
    basicAttacks: 'Basic attacks',
    buildA: 'Build A',
    buildB: 'Build B',
    preset: 'Preset',
    custom: 'Custom',
    addItem: 'Add item',
    remove: 'Remove',
    search: 'Search equipment...',
    result: 'Comparison result',
    winner: 'Higher damage',
    tie: 'Similar output',
    damage: 'Actual damage',
    raw: 'Raw damage',
    delta: 'Difference',
    stats: 'Core stats',
    details: 'Damage sources',
    beta: 'Beta data: damage formulas use current item stats and the beta 602 defense formula. Hero scaling profiles are still being verified.',
    noItems: 'No item',
  },
  'zh-TW': {
    hero: '英雄',
    level: '英雄等級',
    skillLevel: '技能等級',
    basicAttacks: '普攻次數',
    buildA: '出裝 A',
    buildB: '出裝 B',
    preset: '預設',
    custom: '自訂',
    addItem: '新增裝備',
    remove: '移除',
    search: '搜尋裝備...',
    result: '對比結果',
    winner: '傷害較高',
    tie: '輸出接近',
    damage: '實際傷害',
    raw: '原始傷害',
    delta: '差距',
    stats: '核心屬性',
    details: '傷害來源',
    beta: 'Beta 數據：計算使用目前裝備屬性與 beta 602 防禦公式，英雄倍率仍在校準。',
    noItems: '空格',
  },
  id: null,
  fil: null,
} as const;

const buildCompareCopy = {
  ...copy,
  id: copy.en,
  fil: copy.en,
};

type Side = 'a' | 'b';

function fmt(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

function pct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function buildIdsFromPreset(preset?: HeroBuildPreset): string[] {
  return preset ? getBuildItemIds(preset.items).slice(0, 6) : [];
}

function defaultBuildIds(hero: Hero): string[] {
  return getBuildItemIds(hero.build).slice(0, 6);
}

function itemById(items: GameItem[], ids: string[]): GameItem[] {
  return ids
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is GameItem => Boolean(item));
}

function winnerLabel(resultA: DamageResult, resultB: DamageResult, labels: { a: string; b: string }, tie: string): string {
  const diff = Math.abs(resultA.totalDamage - resultB.totalDamage);
  if (diff < 50) return tie;
  return resultA.totalDamage > resultB.totalDamage ? labels.a : labels.b;
}

function survivalScore(result: DamageResult): number {
  const hp = Math.max(1, result.attackerStats.hp);
  const physicalEhp = hp / defenseMultiplier(result.attackerStats.physicalDefense);
  const magicalEhp = hp / defenseMultiplier(result.attackerStats.magicalDefense);
  return (physicalEhp + magicalEhp) / 2;
}

function compareNumber(a: number, b: number, labels: { a: string; b: string }, tie: string): string {
  if (Math.abs(a - b) < 50) return tie;
  return a > b ? labels.a : labels.b;
}

export function BuildCompareClient({
  heroes,
  items,
  locale = 'en',
  initialHeroSlug,
}: {
  heroes: Hero[];
  items: GameItem[];
  locale?: Locale;
  initialHeroSlug?: string;
}) {
  const t = createT(locale);
  const c = buildCompareCopy[locale];
  const [slug, setSlug] = useState(
    initialHeroSlug && heroes.some((hero) => hero.slug === initialHeroSlug)
      ? initialHeroSlug
      : heroes.some((hero) => hero.slug === 'hou-yi')
        ? 'hou-yi'
        : heroes[0]?.slug ?? ''
  );
  const [level, setLevel] = useState(15);
  const [skillLevel, setSkillLevel] = useState(6);
  const [basicAttackCount, setBasicAttackCount] = useState(3);
  const [query, setQuery] = useState('');
  const [presetA, setPresetA] = useState('recommended');
  const [presetB, setPresetB] = useState('alternate');
  const [idsA, setIdsA] = useState<string[]>([]);
  const [idsB, setIdsB] = useState<string[]>([]);

  const hero = useMemo(() => heroes.find((h) => h.slug === slug) ?? heroes[0], [heroes, slug]);
  const profile = useMemo(() => getDamageProfile(hero), [hero]);
  const presets = useMemo(() => hero.builds ?? [], [hero]);
  const selectedSkillIds = useMemo(() => profile.skills.map((skill) => skill.id), [profile]);

  useEffect(() => {
    const recommended = defaultBuildIds(hero);
    const alternate = buildIdsFromPreset(presets[1]) || [];
    setPresetA('recommended');
    setPresetB(presets[1]?.id ?? 'alternate');
    setIdsA(recommended);
    setIdsB(alternate.length ? alternate : recommended);
  }, [hero, presets]);

  function applyPreset(side: Side, value: string) {
    const setPreset = side === 'a' ? setPresetA : setPresetB;
    const setIds = side === 'a' ? setIdsA : setIdsB;
    setPreset(value);
    if (value === 'recommended') {
      setIds(defaultBuildIds(hero));
      return;
    }
    const preset = presets.find((p) => p.id === value);
    if (preset) setIds(buildIdsFromPreset(preset));
  }

  const selectedA = useMemo(() => itemById(items, idsA), [items, idsA]);
  const selectedB = useMemo(() => itemById(items, idsB), [items, idsB]);
  const target = targetPresets.find((preset) => preset.id === 'fighter')?.stats ?? targetPresets[0].stats;

  const resultA = calculateDamage({
    profile,
    level,
    skillLevel,
    selectedSkillIds,
    basicAttackCount,
    selectedItems: selectedA,
    target,
    heroRole: hero.role,
  });
  const resultB = calculateDamage({
    profile,
    level,
    skillLevel,
    selectedSkillIds,
    basicAttackCount,
    selectedItems: selectedB,
    target,
    heroRole: hero.role,
  });

  const templateResults = targetPresets.map((preset) => {
    const a = calculateDamage({
      profile,
      level,
      skillLevel,
      selectedSkillIds,
      basicAttackCount,
      selectedItems: selectedA,
      target: preset.stats,
      heroRole: hero.role,
    });
    const b = calculateDamage({
      profile,
      level,
      skillLevel,
      selectedSkillIds,
      basicAttackCount,
      selectedItems: selectedB,
      target: preset.stats,
      heroRole: hero.role,
    });
    return { preset, a, b, diff: b.totalDamage - a.totalDamage };
  });
  const tankTemplate = templateResults.find((entry) => entry.preset.id === 'tank') ?? templateResults[0]!;
  const marksmanTemplate = templateResults.find((entry) => entry.preset.id === 'marksman') ?? templateResults[0]!;
  const overallA = templateResults.reduce((sum, entry) => sum + entry.a.totalDamage, 0);
  const overallB = templateResults.reduce((sum, entry) => sum + entry.b.totalDamage, 0);
  const survivalA = survivalScore(resultA);
  const survivalB = survivalScore(resultB);

  const itemOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((item) => item.level === 3)
      .filter((item) => {
        if (!q) return true;
        return item.name.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q);
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, q ? 24 : 12);
  }, [items, query]);

  const diff = resultB.totalDamage - resultA.totalDamage;
  const diffPct = resultA.totalDamage ? (diff / resultA.totalDamage) * 100 : 0;

  function addItem(side: Side, id: string) {
    if (side === 'a') {
      setPresetA('custom');
      setIdsA((ids) => [...ids.slice(-5), id]);
    } else {
      setPresetB('custom');
      setIdsB((ids) => [...ids.slice(-5), id]);
    }
  }

  function removeItem(side: Side, id: string) {
    if (side === 'a') {
      setPresetA('custom');
      setIdsA((ids) => ids.filter((itemId) => itemId !== id));
    } else {
      setPresetB('custom');
      setIdsB((ids) => ids.filter((itemId) => itemId !== id));
    }
  }

  function buildPanel(side: Side, title: string, selected: GameItem[], selectedPreset: string) {
    return (
      <section className="card">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="section-title mb-0">{title}</h2>
          <select
            value={selectedPreset}
            onChange={(event) => applyPreset(side, event.target.value)}
            className="rounded border border-hok-border bg-hok-dark px-3 py-2 text-sm text-white"
            aria-label={`${title} ${c.preset}`}
          >
            <option value="recommended">{c.preset}: Recommended</option>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {c.preset}: {preset.label}
              </option>
            ))}
            <option value="custom">{c.custom}</option>
          </select>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => {
            const item = selected[idx];
            return item ? (
              <button
                key={`${side}-${idx}-${item.id}`}
                type="button"
                onClick={() => removeItem(side, item.id)}
                className="flex min-w-0 items-center gap-2 rounded border border-hok-border bg-hok-dark px-2 py-2 text-left text-sm text-white transition hover:border-red-300/70"
                title={c.remove}
              >
                {item.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.icon} alt="" width={34} height={34} className="shrink-0 rounded" />
                ) : (
                  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded bg-hok-border text-xs text-gray-500">
                    {item.name.slice(0, 1)}
                  </span>
                )}
                <span className="min-w-0 truncate">{item.name}</span>
              </button>
            ) : (
              <div
                key={`${side}-empty-${idx}`}
                className="flex min-h-[52px] items-center justify-center rounded border border-dashed border-hok-border bg-hok-dark/40 text-xs text-gray-500"
              >
                {c.noItems}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
        {c.beta}
      </div>

      <section className="card">
        <h2 className="section-title">{c.hero}</h2>
        <HeroSelect heroes={heroes} value={hero.slug} onChange={setSlug} />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm text-gray-400">{c.level}</span>
            <input type="range" min="1" max="15" value={level} onChange={(e) => setLevel(Number(e.target.value))} className="w-full" />
            <span className="text-sm font-semibold text-white">{level}</span>
          </label>
          <label>
            <span className="mb-2 block text-sm text-gray-400">{c.skillLevel}</span>
            <input type="range" min="1" max="6" value={skillLevel} onChange={(e) => setSkillLevel(Number(e.target.value))} className="w-full" />
            <span className="text-sm font-semibold text-white">{skillLevel}</span>
          </label>
          <label>
            <span className="mb-2 block text-sm text-gray-400">{c.basicAttacks}</span>
            <input type="range" min="0" max="10" value={basicAttackCount} onChange={(e) => setBasicAttackCount(Number(e.target.value))} className="w-full" />
            <span className="text-sm font-semibold text-white">{basicAttackCount}</span>
          </label>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {buildPanel('a', c.buildA, selectedA, presetA)}
        {buildPanel('b', c.buildB, selectedB, presetB)}
      </div>

      <section className="card">
        <h2 className="section-title">{c.addItem}</h2>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={c.search}
          className="mb-3 w-full rounded border border-hok-border bg-hok-dark px-3 py-2 text-sm text-white placeholder:text-gray-500"
        />
        <div className="grid max-h-64 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {itemOptions.map((item) => (
            <div key={item.id} className="flex items-center gap-2 rounded border border-hok-border bg-hok-dark px-2 py-2">
              {item.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.icon} alt="" width={34} height={34} className="shrink-0 rounded" />
              ) : (
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded bg-hok-border text-xs text-gray-500">
                  {item.name.slice(0, 1)}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-sm text-white">{item.name}</span>
              <button type="button" onClick={() => addItem('a', item.id)} className="rounded border border-hok-border px-2 py-1 text-xs text-gray-300 hover:border-hok-gold hover:text-hok-gold">
                A
              </button>
              <button type="button" onClick={() => addItem('b', item.id)} className="rounded border border-hok-border px-2 py-1 text-xs text-gray-300 hover:border-hok-gold hover:text-hok-gold">
                B
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">{c.result}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded border border-hok-border bg-hok-dark p-4">
            <p className="text-sm text-gray-400">{c.buildA}</p>
            <p className="text-2xl font-bold text-white">{fmt(resultA.totalDamage)}</p>
            <p className="text-xs text-gray-500">{c.raw}: {fmt(resultA.totalRaw)}</p>
          </div>
          <div className="rounded border border-hok-border bg-hok-dark p-4">
            <p className="text-sm text-gray-400">{c.buildB}</p>
            <p className="text-2xl font-bold text-white">{fmt(resultB.totalDamage)}</p>
            <p className="text-xs text-gray-500">{c.raw}: {fmt(resultB.totalRaw)}</p>
          </div>
          <div className="rounded border border-hok-gold/40 bg-hok-gold/10 p-4">
            <p className="text-sm text-gray-300">{c.winner}</p>
            <p className="text-2xl font-bold text-white">
              {winnerLabel(resultA, resultB, { a: c.buildA, b: c.buildB }, c.tie)}
            </p>
            <p className="text-xs text-gray-500">
              {c.delta}: {diff > 0 ? '+' : ''}{fmt(diff)} ({diffPct > 0 ? '+' : ''}{diffPct.toFixed(1)}%)
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Target templates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="py-2 pr-4">Target</th>
                <th className="py-2 pr-4">{c.buildA}</th>
                <th className="py-2 pr-4">{c.buildB}</th>
                <th className="py-2 pr-4">Winner</th>
                <th className="py-2 pr-4">Defense</th>
              </tr>
            </thead>
            <tbody>
              {templateResults.map((entry) => (
                <tr key={entry.preset.id} className="border-t border-hok-border">
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-white">{entry.preset.label}</p>
                    <p className="text-xs text-gray-500">{entry.preset.description}</p>
                  </td>
                  <td className="py-3 pr-4 text-gray-300">{fmt(entry.a.totalDamage)}</td>
                  <td className="py-3 pr-4 text-gray-300">{fmt(entry.b.totalDamage)}</td>
                  <td className="py-3 pr-4 font-semibold text-hok-gold">
                    {winnerLabel(entry.a, entry.b, { a: c.buildA, b: c.buildB }, c.tie)}
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-500">
                    HP {fmt(entry.preset.stats.hp)} / PDEF {fmt(entry.preset.stats.physicalDefense)} / MDEF{' '}
                    {fmt(entry.preset.stats.magicalDefense)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Auto conclusions</h2>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded border border-hok-border bg-hok-dark p-4">
            <p className="text-sm text-gray-400">Stronger into tanks</p>
            <p className="mt-1 text-xl font-bold text-white">
              {winnerLabel(tankTemplate.a, tankTemplate.b, { a: c.buildA, b: c.buildB }, c.tie)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Tank delta: {tankTemplate.diff > 0 ? '+' : ''}{fmt(tankTemplate.diff)}
            </p>
          </div>
          <div className="rounded border border-hok-border bg-hok-dark p-4">
            <p className="text-sm text-gray-400">Better survival</p>
            <p className="mt-1 text-xl font-bold text-white">
              {compareNumber(survivalA, survivalB, { a: c.buildA, b: c.buildB }, c.tie)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              EHP delta: {survivalB - survivalA > 0 ? '+' : ''}{fmt(survivalB - survivalA)}
            </p>
          </div>
          <div className="rounded border border-hok-border bg-hok-dark p-4">
            <p className="text-sm text-gray-400">Squishy burst</p>
            <p className="mt-1 text-xl font-bold text-white">
              {winnerLabel(marksmanTemplate.a, marksmanTemplate.b, { a: c.buildA, b: c.buildB }, c.tie)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Marksman delta: {marksmanTemplate.diff > 0 ? '+' : ''}{fmt(marksmanTemplate.diff)}
            </p>
          </div>
          <div className="rounded border border-hok-gold/40 bg-hok-gold/10 p-4">
            <p className="text-sm text-gray-300">Best overall damage</p>
            <p className="mt-1 text-xl font-bold text-white">
              {compareNumber(overallA, overallB, { a: c.buildA, b: c.buildB }, c.tie)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Four-template delta: {overallB - overallA > 0 ? '+' : ''}{fmt(overallB - overallA)}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Template targets represent common marksman, mage, fighter, and tank durability profiles. They use the same
          beta 602 defense formula as the calculator, so penetration and defensive items change the verdict immediately.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {[{ label: c.buildA, result: resultA }, { label: c.buildB, result: resultB }].map(({ label, result }) => (
          <section key={label} className="card">
            <h2 className="section-title">{label} {c.stats}</h2>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-gray-500">PATK</dt>
                <dd className="font-semibold text-white">{fmt(result.attackerStats.physicalAttack)}</dd>
              </div>
              <div>
                <dt className="text-gray-500">MATK</dt>
                <dd className="font-semibold text-white">{fmt(result.attackerStats.magicalAttack)}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Phys pierce</dt>
                <dd className="font-semibold text-white">{fmt(result.attackerStats.physicalPierceFlat)} / {pct(result.attackerStats.physicalPiercePercent)}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Magic pierce</dt>
                <dd className="font-semibold text-white">{fmt(result.attackerStats.magicalPierceFlat)} / {pct(result.attackerStats.magicalPiercePercent)}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>

      <section className="card">
        <h2 className="section-title">{c.details}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">{c.buildA}</th>
                <th className="py-2 pr-4">{c.buildB}</th>
              </tr>
            </thead>
            <tbody>
              {resultA.rows.map((rowA) => {
                const rowB = resultB.rows.find((row) => row.id === rowA.id);
                return (
                  <tr key={rowA.id} className="border-t border-hok-border">
                    <td className="py-3 pr-4 font-medium text-white">{rowA.label}</td>
                    <td className="py-3 pr-4 text-gray-300">{fmt(rowA.damage)}</td>
                    <td className="py-3 pr-4 text-gray-300">{rowB ? fmt(rowB.damage) : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          {t('tools.tierWr', { tier: hero.tier, wr: hero.winRate == null ? 'Data unavailable' : `${hero.winRate.toFixed(1)}%` })}
        </p>
      </section>
    </div>
  );
}
