import Image from 'next/image';
import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { formatRate, site } from '@/lib/data';
import { getHeroGeoAnswer } from '@/lib/hero-geo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { formatHeroNameList } from '@/lib/locale-names';
import { META_SEASON_LABEL } from '@/lib/meta-season';

function join(values: string[], locale: Locale): string {
  return values.join(locale === 'zh-TW' ? '、' : ', ');
}

function geoAnswerCopy(locale: Locale) {
  const copy = {
    'zh-TW': {
      eyebrow: '直接答案',
      title: (name: string, season: string) => `${name} ${season} 最佳出裝一覽`,
      server: '國際服',
      updated: '更新',
      reviewedBy: '編輯校對',
      roleLaneDifficulty: '定位與難度',
      currentRates: '目前數據',
      coreItems: '核心三件',
      seeBuild: '查看出裝區',
      bestArcana: '最佳銘文',
      seeArcana: '查看銘文區',
      battleSpell: '召喚師技能',
      bestInto: '強勢對局',
      watchOutFor: '克制風險',
      recommendedBuild: '推薦六神裝',
      slot: (index: number) => `第 ${index + 1} 件`,
      dataTrust: '資料可信度',
      source: '來源',
      lastVerified: '最後驗證',
      publicData: '公開資料',
      apiDocs: 'API 文件',
      updatedFor: '版本',
      reviewed: '編輯',
      status: '狀態',
      reviewedStatus: '國際服資料校對',
      strongFallback: '脆皮後排與缺少位移的陣容',
      weakFallback: '強開、突進與控制陣容',
      sourceFallback: '官方每日勝率統計 + HOKMeta 編輯校對',
      summary: (name: string, year: string, lane: string, strong: string, weak: string) =>
        `${name} 在 ${year} 版本的核心思路是用這套出裝和銘文穩定打出 ${lane} 節奏；面對 ${strong} 時更容易發揮，遇到 ${weak} 時要優先考慮走位、保命裝與隊友保護。`,
      counterPage: '查看克制',
    },
    id: {
      eyebrow: 'Jawaban cepat',
      title: (name: string, season: string) => `${name} build terbaik untuk ${season}`,
      server: 'Server internasional',
      updated: 'Update',
      reviewedBy: 'Ditinjau oleh',
      roleLaneDifficulty: 'Role, lane, dan tingkat sulit',
      currentRates: 'Stat patch saat ini',
      coreItems: '3 item core',
      seeBuild: 'Lihat bagian build',
      bestArcana: 'Arcana terbaik',
      seeArcana: 'Lihat bagian arcana',
      battleSpell: 'Battle spell',
      bestInto: 'Kuat melawan',
      watchOutFor: 'Perlu diwaspadai',
      recommendedBuild: 'Rekomendasi build item',
      slot: (index: number) => `Slot ${index + 1}`,
      dataTrust: 'Kepercayaan data',
      source: 'Sumber',
      lastVerified: 'Terakhir dicek',
      publicData: 'Data publik',
      apiDocs: 'Dokumen API',
      updatedFor: 'Versi',
      reviewed: 'Editor',
      status: 'Status',
      reviewedStatus: 'Data server internasional ditinjau',
      strongFallback: 'carry tanpa mobilitas dan backline rapuh',
      weakFallback: 'komposisi hard engage, dive, dan crowd control',
      sourceFallback: 'Statistik win rate harian resmi + review editorial HOKMeta',
      summary: (name: string, year: string, lane: string, strong: string, weak: string) =>
        `Build ${name} ${year} ini dipakai untuk menjaga tempo ${lane} tetap stabil. Build ini lebih nyaman melawan ${strong}, tetapi saat menghadapi ${weak}, prioritaskan posisi aman, item defensif, atau perlindungan tim.`,
      counterPage: 'Halaman counter',
    },
    fil: {
      eyebrow: 'Quick answer',
      title: (name: string, season: string) => `${name} best build para sa ${season}`,
      server: 'International server',
      updated: 'Updated',
      reviewedBy: 'Reviewed by',
      roleLaneDifficulty: 'Role, lane, at difficulty',
      currentRates: 'Current patch rates',
      coreItems: 'Core 3 items',
      seeBuild: 'Tingnan ang build section',
      bestArcana: 'Best arcana',
      seeArcana: 'Tingnan ang arcana section',
      battleSpell: 'Battle spell',
      bestInto: 'Malakas laban sa',
      watchOutFor: 'Bantayan kapag laban sa',
      recommendedBuild: 'Recommended item build',
      slot: (index: number) => `Slot ${index + 1}`,
      dataTrust: 'Data trust',
      source: 'Source',
      lastVerified: 'Last verified',
      publicData: 'Public data',
      apiDocs: 'API docs',
      updatedFor: 'Updated for',
      reviewed: 'Reviewed by',
      status: 'Status',
      reviewedStatus: 'International data reviewed',
      strongFallback: 'low-mobility carries at fragile backlines',
      weakFallback: 'hard engage, dive, at crowd control drafts',
      sourceFallback: 'Official daily win-rate stats + HOKMeta editorial review',
      summary: (name: string, year: string, lane: string, strong: string, weak: string) =>
        `Ang ${name} ${year} build na ito ay para gawing stable ang tempo sa ${lane}. Mas maganda ito laban sa ${strong}, pero kung kalaban ang ${weak}, unahin ang safe positioning, defensive item, o peel mula sa team.`,
      counterPage: 'Counter page',
    },
    en: {
      eyebrow: 'Build answer',
      title: (name: string, season: string) => `${name} best build for ${season}`,
      server: 'International server',
      updated: 'Updated',
      reviewedBy: 'Reviewed by',
      roleLaneDifficulty: 'Role, lane, difficulty',
      currentRates: 'Current patch rates',
      coreItems: 'Core 3 items',
      seeBuild: 'See build section',
      bestArcana: 'Best arcana',
      seeArcana: 'See arcana section',
      battleSpell: 'Battle spell',
      bestInto: 'Best into',
      watchOutFor: 'Watch out for',
      recommendedBuild: 'Recommended item build',
      slot: (index: number) => `Slot ${index + 1}`,
      dataTrust: 'Data trust',
      source: 'Source',
      lastVerified: 'Last verified',
      publicData: 'Public data',
      apiDocs: 'API docs',
      updatedFor: 'Updated for',
      reviewed: 'Reviewed by',
      status: 'Status',
      reviewedStatus: 'International data reviewed',
      strongFallback: 'low-mobility carries and fragile backlines',
      weakFallback: 'hard engage, dive, and crowd control drafts',
      sourceFallback: 'Official daily win-rate stats + HOKMeta editorial review',
      summary: (name: string, year: string, lane: string, strong: string, weak: string) =>
        `${name}'s ${year} build is designed to make the hero reliable in ${lane}. It performs best into ${strong}, but you should respect ${weak} and adjust defensive or penetration items when the draft demands it.`,
      counterPage: 'Counter page',
    },
  } satisfies Record<Locale, {
    eyebrow: string;
    title: (name: string, season: string) => string;
    server: string;
    updated: string;
    reviewedBy: string;
    roleLaneDifficulty: string;
    currentRates: string;
    coreItems: string;
    seeBuild: string;
    bestArcana: string;
    seeArcana: string;
    battleSpell: string;
    bestInto: string;
    watchOutFor: string;
    recommendedBuild: string;
    slot: (index: number) => string;
    dataTrust: string;
    source: string;
    lastVerified: string;
    publicData: string;
    apiDocs: string;
    updatedFor: string;
    reviewed: string;
    status: string;
    reviewedStatus: string;
    strongFallback: string;
    weakFallback: string;
    sourceFallback: string;
    summary: (name: string, year: string, lane: string, strong: string, weak: string) => string;
    counterPage: string;
  }>;

  return copy[locale];
}

export function HeroGeoAnswerBox({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const answer = getHeroGeoAnswer(hero, locale);
  const copy = geoAnswerCopy(locale);
  const strongText = formatHeroNameList(answer.strongInto, locale) || copy.strongFallback;
  const weakText = formatHeroNameList(answer.weakInto, locale) || copy.weakFallback;
  const rawSource = hero.dataSource?.trim();
  const source =
    rawSource && !/Camp HOK/i.test(rawSource)
      ? rawSource
      : copy.sourceFallback;
  const coreItems = answer.itemNames.slice(0, 3);

  return (
    <section
      id="overview"
      className="scroll-mt-20 mb-6 rounded-xl border border-hok-gold/35 bg-hok-card/85 p-5 shadow-lg shadow-black/20"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {copy.eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            {copy.title(answer.name, answer.season)}
          </h2>
        </div>
        <div className="text-xs text-gray-500 sm:text-right">
          <p>{copy.server}</p>
          <p>{copy.updated}: {answer.updated}</p>
          <p>{copy.reviewedBy}: {site.author}</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.roleLaneDifficulty}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {answer.lane} · {answer.role} · Tier {hero.tier} · {hero.difficulty}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.currentRates}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {formatRate(hero.winRate)} WR · {formatRate(hero.pickRate)} Pick · {formatRate(hero.banRate)} Ban
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.coreItems}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {coreItems.length ? join(coreItems, locale) : copy.seeBuild}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.bestArcana}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {join(answer.arcanaNames, locale) || copy.seeArcana}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.battleSpell}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {join(answer.spellNames, locale) || 'Flash'}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.bestInto}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{strongText}</p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.watchOutFor}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{weakText}</p>
        </div>
      </div>

      {answer.items.length ? (
        <div className="mt-4 rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {copy.recommendedBuild}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {answer.items.map((item, index) => (
              <Link
                key={`${item.slot}-${item.itemId || item.name}`}
                href={item.itemId ? localePath(locale, `/items/${item.itemId}`) : localePath(locale, `/hero/${hero.slug}#build`)}
                className="flex min-w-0 items-center gap-3 rounded-lg border border-hok-border/70 bg-hok-card/60 p-2"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-hok-dark">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">{index + 1}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {answer.itemNames[index]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {copy.slot(index)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {copy.dataTrust}
        </p>
        <div className="mt-2 grid gap-2 text-sm text-gray-300 md:grid-cols-3">
          <p>
            <span className="text-gray-500">{copy.source}:</span> {source}
          </p>
          <p>
            <span className="text-gray-500">{copy.lastVerified}:</span> {answer.updated}
          </p>
          <p>
            <span className="text-gray-500">{copy.publicData}:</span>{' '}
            <Link href={localePath(locale, '/docs/api')} className="text-hok-gold hover:underline">
              {copy.apiDocs}
            </Link>
          </p>
          <p>
            <span className="text-gray-500">{copy.updatedFor}:</span> {META_SEASON_LABEL}
          </p>
          <p>
            <span className="text-gray-500">{copy.reviewed}:</span>{' '}
            <Link href={localePath(locale, '/about')} className="text-hok-gold hover:underline">
              {site.author}
            </Link>
          </p>
          <p>
            <span className="text-gray-500">{copy.status}:</span>{' '}
            {copy.reviewedStatus}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-gray-300">
        {copy.summary(answer.name, answer.year, answer.lane, strongText, weakText)}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={localePath(locale, `/tools/damage-calculator/${hero.slug}`)}
          className="rounded bg-hok-gold px-3 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          {t('hero.buildCompareTool.damageCta')}
        </Link>
        <Link
          href={localePath(locale, `/tools/build-compare/${hero.slug}`)}
          className="rounded border border-hok-gold/60 px-3 py-2 text-sm font-semibold text-hok-gold transition hover:bg-hok-gold/10"
        >
          {t('hero.buildCompareTool.compareCta')}
        </Link>
        <Link
          href={localePath(locale, `/hero/${hero.slug}/counters`)}
          className="rounded border border-hok-border px-3 py-2 text-sm font-semibold text-gray-200 transition hover:border-hok-gold hover:text-hok-gold"
        >
          {copy.counterPage}
        </Link>
      </div>
    </section>
  );
}
