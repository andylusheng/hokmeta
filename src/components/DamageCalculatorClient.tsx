'use client';

import { useEffect, useMemo, useState } from 'react';
import { HeroSelect } from '@/components/HeroSelect';
import { createT, type Locale } from '@/lib/i18n';
import { loadToolData, type ToolData, type ToolHero, type ToolItem } from '@/lib/tool-data';
import {
  calculateDamage,
  damageHeroProfiles,
  getBuildItemIds,
  getDamageProfile,
  type DamageType,
} from '@/lib/damage';

const text = {
  en: {
    hero: 'Hero',
    level: 'Hero level',
    skillLevel: 'Skill level',
    build: 'Equipment',
    addItem: 'Add item',
    remove: 'Remove',
    combo: 'Combo',
    basicAttacks: 'Basic attacks',
    result: 'Damage result',
    raw: 'Raw',
    actual: 'Actual',
    formula: 'Defense formula',
    formulaBody:
      'Physical and magical damage use effective defense = defense x (1 - percent pierce) - flat pierce, then damage = raw x 602 / (602 + effective defense). True damage skips defense.',
    beta:
      'Beta data: the calculator engine supports exact values, but hero scaling profiles are marked beta until verified against in-client values.',
    profile: 'Profile',
    supported: 'Hero-specific scaling profile',
    baseline: 'Role baseline profile',
    noItems: 'No equipment selected.',
    loading: 'Loading calculator data…',
    loadError: 'Calculator data could not be loaded. Refresh the page and try again.',
  },
  'zh-TW': {
    hero: '英雄',
    level: '英雄等級',
    skillLevel: '技能等級',
    build: '裝備',
    addItem: '新增裝備',
    remove: '移除',
    combo: '連招',
    basicAttacks: '普攻次數',
    result: '傷害結果',
    raw: '原始',
    actual: '實際',
    formula: '防禦公式',
    formulaBody:
      '物理與法術傷害使用：有效防禦 = 防禦 x (1 - 百分比穿透) - 固定穿透，實際傷害 = 原始傷害 x 602 / (602 + 有效防禦)。真實傷害不受防禦影響。',
    beta:
      'Beta 數據：計算器引擎支援精確值，但英雄倍率資料在完成遊戲內校驗前仍標記為 beta。',
    profile: '資料檔',
    supported: '英雄專用倍率',
    baseline: '職業基準倍率',
    noItems: '尚未選擇裝備。',
    loading: '正在載入計算器資料…',
    loadError: '無法載入計算器資料，請重新整理頁面後再試。',
  },
  id: null,
  fil: null,
} as const;

const damageCopy = {
  ...text,
  id: {
    hero: 'Hero', level: 'Level hero', skillLevel: 'Level skill', build: 'Equipment', addItem: 'Tambah item', remove: 'Hapus', combo: 'Combo', basicAttacks: 'Basic attack', result: 'Hasil damage', raw: 'Mentah', actual: 'Aktual', formula: 'Rumus defense', formulaBody: 'Damage fisik dan magic memakai defense efektif = defense x (1 - percent pierce) - flat pierce, lalu damage = raw x 602 / (602 + defense efektif). True damage melewati defense.', beta: 'Data beta: mesin kalkulator mendukung nilai presisi, tetapi scaling hero masih ditandai beta sampai diverifikasi di dalam game.', profile: 'Profil', supported: 'Profil scaling khusus hero', baseline: 'Profil dasar role', noItems: 'Belum ada equipment dipilih.', loading: 'Memuat data kalkulator…', loadError: 'Data kalkulator tidak dapat dimuat. Coba muat ulang halaman.',
  },
  fil: {
    hero: 'Hero', level: 'Hero level', skillLevel: 'Skill level', build: 'Equipment', addItem: 'Magdagdag ng item', remove: 'Alisin', combo: 'Combo', basicAttacks: 'Basic attacks', result: 'Damage result', raw: 'Raw', actual: 'Actual', formula: 'Defense formula', formulaBody: 'Para sa physical at magical damage: effective defense = defense x (1 - percent pierce) - flat pierce, at damage = raw x 602 / (602 + effective defense). Hindi naaapektuhan ng defense ang true damage.', beta: 'Beta data: may support ang calculator sa precise values, pero beta pa ang hero scaling profiles hanggang ma-verify sa game.', profile: 'Profile', supported: 'Hero-specific scaling profile', baseline: 'Role baseline profile', noItems: 'Walang napiling equipment.', loading: 'Naglo-load ng calculator data…', loadError: 'Hindi ma-load ang calculator data. I-refresh ang page.',
  },
};

function fmt(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

function fmtPct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function typeClass(type: DamageType): string {
  if (type === 'true') return 'text-hok-gold';
  if (type === 'magical') return 'text-sky-300';
  return 'text-red-300';
}

function itemTypeLabel(type: string | null, locale: Locale): string {
  if (!type) return locale === 'zh-TW' ? '裝備' : 'Equipment';
  if (locale !== 'zh-TW') return type;
  const labels: Record<string, string> = {
    All: '全部',
    Attack: '物理',
    Magic: '法術',
    Defense: '防禦',
    Movement: '移動',
    Jungle: '打野',
  };
  return labels[type] ?? type;
}

export function DamageCalculatorClient({
  locale = 'en',
  initialHeroSlug,
}: {
  locale?: Locale;
  initialHeroSlug?: string;
}) {
  const copy = damageCopy[locale];
  const [data, setData] = useState<ToolData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadToolData().then(setData).catch(() => setError(true));
  }, []);

  if (error) return <p className="card text-sm text-red-200">{copy.loadError}</p>;
  if (!data) return <p className="card text-sm text-gray-400">{copy.loading}</p>;

  return <DamageCalculatorWorkspace heroes={data.heroes} items={data.items} locale={locale} initialHeroSlug={initialHeroSlug} />;
}

function DamageCalculatorWorkspace({
  heroes,
  items,
  locale = 'en',
  initialHeroSlug,
}: {
  heroes: ToolHero[];
  items: ToolItem[];
  locale?: Locale;
  initialHeroSlug?: string;
}) {
  const t = createT(locale);
  const copy = damageCopy[locale];
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
  const [itemQuery, setItemQuery] = useState('');
  const [itemCategory, setItemCategory] = useState('All');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const hero = useMemo(
    () => heroes.find((h) => h.slug === slug) ?? heroes[0],
    [heroes, slug]
  );
  const profile = useMemo(() => getDamageProfile(hero), [hero]);
  const heroSkills = useMemo(
    () => (locale === 'zh-TW' && hero.skillsZh?.length ? hero.skillsZh : hero.skills),
    [hero, locale]
  );
  const skillIconBySlot = useMemo(
    () => new Map(heroSkills.map((skill) => [skill.slot, skill.icon])),
    [heroSkills]
  );
  const selectedSkills = useMemo(() => profile.skills.map((skill) => skill.id), [profile]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(selectedSkills);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('hero');
    if (param && heroes.some((h) => h.slug === param)) {
      setSlug(param);
    }
  }, [heroes, initialHeroSlug]);

  // Sync hero selection to URL for shareable/indexable links
  useEffect(() => {
    if (!slug) return;
    const url = new URL(window.location.href);
    url.searchParams.set('hero', slug);
    window.history.replaceState(null, '', url.toString());
  }, [slug]);

  useEffect(() => {
    const ids = getBuildItemIds(hero.build).slice(0, 6);
    setSelectedItemIds(ids);
    setSelectedSkillIds(getDamageProfile(hero).skills.map((skill) => skill.id));
  }, [hero]);

  const selectedItems = useMemo(
    () => selectedItemIds
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is ToolItem => Boolean(item)),
    [items, selectedItemIds]
  );

  const itemCategoryOptions = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          items
            .filter((item) => item.level === 3 && item.type)
            .map((item) => item.type as string)
        )
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [items]
  );

  const itemOptions = useMemo(
    () => {
      const query = itemQuery.trim().toLowerCase();
      return items
        .filter((item) => item.level === 3)
        .filter((item) => !selectedItemIds.includes(item.id))
        .filter((item) => itemCategory === 'All' || item.type === itemCategory)
        .filter((item) => {
          if (!query) return true;
          return (
            item.name.toLowerCase().includes(query) ||
            item.type?.toLowerCase().includes(query) ||
            item.slug.toLowerCase().includes(query)
          );
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, query ? 24 : 18);
    },
    [items, itemCategory, itemQuery, selectedItemIds]
  );

  const target = useMemo(
    () => ({
      hp: 6600 + level * 180,
      physicalDefense: 300 + level * 26,
      magicalDefense: 230 + level * 18,
    }),
    [level]
  );
  const result = calculateDamage({
    profile,
    level,
    skillLevel,
    selectedSkillIds,
    basicAttackCount,
    selectedItems,
    target,
    heroRole: hero.role,
  });
  const hasSpecificProfile = Boolean(damageHeroProfiles[hero.slug]);

  return (
    <div className="space-y-6">
      <div className="rounded border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
        {copy.beta}
      </div>

      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(window.location.href); }}
        className="inline-flex items-center gap-1.5 rounded border border-hok-border px-3 py-1.5 text-xs text-gray-400 transition hover:border-hok-gold/50 hover:text-hok-gold"
      >
        🔗 Copy share link
      </button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-5">
          <div className="card">
            <h2 className="section-title">{copy.hero}</h2>
        <HeroSelect heroes={heroes} value={hero.slug} onChange={setSlug} locale={locale} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-gray-400">{copy.level}</span>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-semibold text-white">{level}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-gray-400">{copy.skillLevel}</span>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-semibold text-white">{skillLevel}</span>
              </label>
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">{copy.build}</h2>
            <div className="mb-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, idx) => {
                const item = selectedItems[idx];
                return item ? (
                  <button
                    key={`${idx}-${item.id}`}
                    type="button"
                    onClick={() => setSelectedItemIds((ids) => ids.filter((id) => id !== item.id))}
                    className="group flex min-h-[104px] min-w-0 flex-col items-center justify-center gap-2 rounded border border-hok-border bg-hok-dark px-2 py-3 text-center text-sm text-white transition hover:border-red-300/70"
                    title={copy.remove}
                  >
                    {item.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.icon} alt="" width={42} height={42} className="rounded" />
                    ) : (
                      <span className="flex h-[42px] w-[42px] items-center justify-center rounded bg-hok-border text-xs text-gray-500">
                        {item.name.slice(0, 1)}
                      </span>
                    )}
                    <span className="w-full truncate font-medium">{item.name}</span>
                    <span className="text-[10px] uppercase tracking-wide text-gray-500 group-hover:text-red-200">
                      {copy.remove}
                    </span>
                  </button>
                ) : (
                  <div
                    key={`empty-${idx}`}
                    className="flex min-h-[104px] flex-col items-center justify-center rounded border border-dashed border-hok-border bg-hok-dark/40 px-2 py-3 text-center"
                  >
                    <span className="flex h-[42px] w-[42px] items-center justify-center rounded bg-hok-border/70 text-xs text-gray-500">
                      {idx + 1}
                    </span>
                    <span className="mt-2 text-xs text-gray-500">{copy.noItems}</span>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3">
              <input
                type="search"
                value={itemQuery}
                onChange={(e) => setItemQuery(e.target.value)}
                placeholder={locale === 'zh-TW' ? '搜尋裝備...' : 'Search equipment...'}
                className="w-full rounded border border-hok-border bg-hok-dark px-3 py-2 text-sm text-white placeholder:text-gray-500"
              />
              <div className="flex gap-2 overflow-x-auto pb-1">
                {itemCategoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setItemCategory(category)}
                    className={`shrink-0 rounded border px-3 py-1.5 text-xs transition ${
                      itemCategory === category
                        ? 'border-hok-gold bg-hok-gold/10 text-hok-gold'
                        : 'border-hok-border bg-hok-dark text-gray-400 hover:border-hok-gold/50 hover:text-white'
                    }`}
                  >
                    {itemTypeLabel(category, locale)}
                  </button>
                ))}
              </div>
              <div className="grid max-h-72 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
                {itemOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedItemIds((ids) => [...ids.slice(-5), item.id]);
                      }}
                      className="flex min-w-0 items-center gap-2 rounded border border-hok-border bg-hok-dark px-2 py-2 text-left text-sm text-white transition hover:border-hok-gold/60"
                    >
                      {item.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.icon} alt="" width={34} height={34} className="shrink-0 rounded" />
                      ) : (
                        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded bg-hok-border text-xs text-gray-500">
                          {item.name.slice(0, 1)}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{item.name}</span>
                        <span className="block truncate text-xs text-gray-500">
                          {itemTypeLabel(item.type, locale)}
                        </span>
                      </span>
                    </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">{copy.combo}</h2>
            <label className="mb-4 block">
              <span className="mb-2 block text-sm text-gray-400">{copy.basicAttacks}</span>
              <input
                type="range"
                min="0"
                max="10"
                value={basicAttackCount}
                onChange={(e) => setBasicAttackCount(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm font-semibold text-white">{basicAttackCount}</span>
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {profile.skills.map((skill) => (
                <label
                  key={skill.id}
                  className="flex cursor-pointer items-start gap-3 rounded border border-hok-border bg-hok-dark p-3 text-sm text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkillIds.includes(skill.id)}
                    onChange={(e) =>
                      setSelectedSkillIds((ids) =>
                        e.target.checked
                          ? [...ids, skill.id]
                          : ids.filter((id) => id !== skill.id)
                      )
                    }
                    className="mt-1"
                  />
                  {skillIconBySlot.get(skill.id as 'passive' | 'skill1' | 'skill2' | 'ultimate') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={skillIconBySlot.get(skill.id as 'passive' | 'skill1' | 'skill2' | 'ultimate')}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded bg-hok-border"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-hok-border text-xs text-gray-500">
                      {skill.id.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold">{skill.label}</span>
                    <span className={typeClass(skill.type)}>{skill.type}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="card">
            <h2 className="section-title">{copy.result}</h2>
            <div className="mb-4 rounded border border-hok-gold/40 bg-hok-gold/10 p-4">
              <p className="text-sm text-gray-300">{copy.actual}</p>
              <p className="text-3xl font-bold text-white">{fmt(result.totalDamage)}</p>
              <p className="text-xs text-gray-500">
                {copy.raw}: {fmt(result.totalRaw)}
              </p>
            </div>
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
                <dd className="font-semibold text-white">
                  {fmt(result.attackerStats.physicalPierceFlat)} / {fmtPct(result.attackerStats.physicalPiercePercent)}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Magic pierce</dt>
                <dd className="font-semibold text-white">
                  {fmt(result.attackerStats.magicalPierceFlat)} / {fmtPct(result.attackerStats.magicalPiercePercent)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <h2 className="section-title">{copy.profile}</h2>
            <p className="text-sm text-white">
              {hasSpecificProfile ? copy.supported : copy.baseline}
            </p>
            <p className="mt-2 text-xs text-gray-500">{profile.sourceNote}</p>
          </div>
        </aside>
      </div>

      <section className="card">
        <h2 className="section-title">{copy.result}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">{copy.raw}</th>
                <th className="py-2 pr-4">Effective DEF</th>
                <th className="py-2 pr-4">{copy.actual}</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row) => (
                <tr key={row.id} className="border-t border-hok-border">
                  <td className="py-3 pr-4 font-medium text-white">{row.label}</td>
                  <td className={`py-3 pr-4 ${typeClass(row.type)}`}>{row.type}</td>
                  <td className="py-3 pr-4 text-gray-300">{fmt(row.raw)}</td>
                  <td className="py-3 pr-4 text-gray-300">{fmt(row.effectiveDefense)}</td>
                  <td className="py-3 pr-4 font-semibold text-white">{fmt(row.damage)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">{copy.formula}</h2>
        <p className="text-sm text-gray-400">{copy.formulaBody}</p>
        <p className="mt-3 text-xs text-gray-500">
          {t('tools.tierWr', { tier: hero.tier, wr: hero.winRate == null ? 'Data unavailable' : `${hero.winRate.toFixed(1)}%` })}
        </p>
      </section>
    </div>
  );
}
