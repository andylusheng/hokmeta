import Link from 'next/link';
import {
  laneLabel,
  metaTrends,
  trendDelta,
  trendRate,
  type MetaTrendHero,
} from '@/lib/meta-trends';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { isLocaleReadyForPath } from '@/lib/locale-readiness';
import { translateRole } from '@/lib/locale-labels';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

function copy(locale: Locale) {
  if (locale === 'zh-TW') {
    return {
      title: '王者榮耀 Global 本週 Meta 報告',
      subtitle:
        '把本週最重要的三種決策整理成一頁：哪些英雄最穩、哪些英雄最危險、每個分路誰最值得優先練。',
      topWin: '本週勝率最高 Top 10',
      lowWin: '本週勝率最低 Top 10',
      laneLeaders: '各分路前 5',
      why: '為什麼值得看',
      source: '基於官方每日勝率統計。',
      updated: '最新同步',
      compared: '對比日期',
      and: '與',
      openDashboard: '查看完整趨勢儀表盤',
      relatedReports: '相關週報',
      actions: '可操作連結',
      hero: '英雄',
      lane: '分路',
      heroPage: '英雄頁',
      counters: '克制',
      buildCompare: '出裝比較',
      damage: '傷害計算',
      topWinGuide: '高勝率英雄',
      lowWinGuide: '低勝率英雄',
      laneGuide: '分路勝率冠軍',
      pickedGuide: '高出場英雄',
      sleeperGuide: '被低估英雄',
      summaryTitle: '本週結論',
      summary:
        '如果你只看一件事，先看高勝率榜找穩定答案；如果你最近一直掉分，再看低勝率榜檢查自己是不是在硬玩版本不合適的英雄。',
    };
  }

  if (locale === 'id') {
    return {
      title: 'Laporan Meta Mingguan Honor of Kings Global',
      subtitle:
        'Ringkasan mingguan untuk tiga keputusan ranked: hero mana yang paling stabil, hero mana yang sedang berisiko, dan siapa pemimpin tiap lane saat ini.',
      topWin: 'Top 10 hero win rate tertinggi minggu ini',
      lowWin: 'Top 10 hero win rate terendah minggu ini',
      laneLeaders: 'Top 5 per lane',
      why: 'Kenapa penting',
      source: 'Berdasarkan statistik win rate harian resmi.',
      updated: 'Sync terbaru',
      compared: 'Dibandingkan dengan',
      and: 'dan',
      openDashboard: 'Buka dashboard tren lengkap',
      relatedReports: 'Laporan terkait',
      actions: 'Link aksi',
      hero: 'Hero',
      lane: 'Lane',
      heroPage: 'Hero',
      counters: 'Counter',
      buildCompare: 'Bandingkan build',
      damage: 'Kalkulator damage',
      topWinGuide: 'Hero win rate tinggi',
      lowWinGuide: 'Hero win rate rendah',
      laneGuide: 'Pemimpin lane',
      pickedGuide: 'Hero paling sering dipilih',
      sleeperGuide: 'Hero underrated',
      summaryTitle: 'Kesimpulan minggu ini',
      summary:
        'Gunakan tabel win rate tinggi untuk mencari pick stabil. Gunakan tabel win rate rendah sebagai daftar peringatan sebelum memaksakan hero yang sedang kurang cocok dengan patch atau matchup.',
    };
  }

  if (locale === 'fil') {
    return {
      title: 'Honor of Kings Global Weekly Meta Report',
      subtitle:
        'Isang weekly summary para sa ranked decisions: aling heroes ang pinaka-stable, alin ang delikado ngayon, at sino ang nangunguna sa bawat lane.',
      topWin: 'Top 10 highest win-rate heroes this week',
      lowWin: 'Top 10 lowest win-rate heroes this week',
      laneLeaders: 'Top 5 per lane',
      why: 'Bakit mahalaga',
      source: 'Based on official daily win-rate stats.',
      updated: 'Latest sync',
      compared: 'Compared with',
      and: 'and',
      openDashboard: 'Open full trend dashboard',
      relatedReports: 'Related reports',
      actions: 'Action links',
      hero: 'Hero',
      lane: 'Lane',
      heroPage: 'Hero',
      counters: 'Counters',
      buildCompare: 'Build compare',
      damage: 'Damage calc',
      topWinGuide: 'High win-rate heroes',
      lowWinGuide: 'Low win-rate heroes',
      laneGuide: 'Lane leaders',
      pickedGuide: 'Most picked',
      sleeperGuide: 'Underrated',
      summaryTitle: 'This week in one read',
      summary:
        'Use the high-win table para sa stable ranked picks. Use the low-win table bilang warning list bago pilitin ang hero na hindi fit sa patch o matchup.',
    };
  }

  return {
    title: 'Honor of Kings Global Weekly Meta Report',
    subtitle:
      'A weekly report trimmed down to the three decisions that matter most: which heroes are safest, which heroes are dragging games down, and who leads each lane right now.',
    topWin: 'Top 10 highest win-rate heroes this week',
    lowWin: 'Top 10 lowest win-rate heroes this week',
    laneLeaders: 'Top 5 by lane',
    why: 'Why it matters',
    source: 'Built from official daily win-rate stats.',
    updated: 'Latest sync',
    compared: 'Compared with',
    and: 'and',
    openDashboard: 'Open full trend dashboard',
    relatedReports: 'Related reports',
    actions: 'Action links',
    hero: 'Hero',
    lane: 'Lane',
    heroPage: 'Hero',
    counters: 'Counters',
    buildCompare: 'Build compare',
    damage: 'Damage calc',
    topWinGuide: 'Highest win rate',
    lowWinGuide: 'Lowest win rate',
    laneGuide: 'Lane leaders',
    pickedGuide: 'Most picked',
    sleeperGuide: 'Underrated',
    summaryTitle: 'This week in one read',
    summary:
      'Use the top-win table for stable ranked answers. Use the low-win table as a warning list for heroes that may need a better build, a better patch fit, or stricter matchup discipline.',
  };
}

function insightNote(locale: Locale, type: 'win' | 'low', hero: MetaTrendHero) {
  if (locale === 'zh-TW') {
    if (type === 'win') {
      return `${hero.name} 目前勝率 ${trendRate(hero.winRate)}，同時有 ${trendRate(hero.pickRate)} 出場率。這代表它不只是低樣本尖峰，而是真的在排位裡穩定轉化勝場。`;
    }
    return `${hero.name} 目前勝率只有 ${trendRate(hero.winRate)}。如果你最近常輸在這個英雄上，應該先檢查版本適配、核心裝順序與對線是否本來就吃虧。`;
  }

  if (locale === 'id') {
    if (type === 'win') {
      return `${hero.name} punya win rate ${trendRate(hero.winRate)} dan pick rate ${trendRate(hero.pickRate)}. Ini lebih kuat daripada spike kecil karena tetap muncul di ranked.`;
    }
    return `${hero.name} hanya berada di ${trendRate(hero.winRate)} win rate. Cek ulang urutan item, matchup, dan apakah patch saat ini memang kurang mendukung hero ini.`;
  }

  if (locale === 'fil') {
    if (type === 'win') {
      return `${hero.name} has ${trendRate(hero.winRate)} win rate with ${trendRate(hero.pickRate)} pick rate, kaya mas reliable ito kaysa one-day spike lang.`;
    }
    return `${hero.name} is only at ${trendRate(hero.winRate)} win rate. Treat it as a warning to review build order, matchup fit, and patch comfort.`;
  }

  if (type === 'win') {
    return `${hero.name} combines ${trendRate(hero.winRate)} win rate with ${trendRate(hero.pickRate)} pick rate, which makes this a more trustworthy signal than a tiny-sample spike.`;
  }
  return `${hero.name} is sitting at only ${trendRate(hero.winRate)} win rate. Treat that as a warning to review build order, matchup fit, and whether the current patch is simply hostile to the pick.`;
}

function ReportTable({
  title,
  items,
  locale,
  note,
}: {
  title: string;
  items: MetaTrendHero[];
  locale: Locale;
  note: (hero: MetaTrendHero) => string;
}) {
  const c = copy(locale);
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-3 py-2">{c.hero}</th>
              <th className="px-3 py-2">{c.lane}</th>
              <th className="px-3 py-2">WR</th>
              <th className="px-3 py-2">Pick</th>
              <th className="px-3 py-2">Ban</th>
              <th className="px-3 py-2">7d WR</th>
              <th className="px-3 py-2">{c.why}</th>
              <th className="px-3 py-2">{c.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hok-border/70">
            {items.map((hero) => (
              <tr key={hero.slug} className="align-top">
                <td className="px-3 py-3">
                  <Link
                    href={localePath(locale, `/hero/${hero.slug}`)}
                    className="font-semibold text-hok-gold hover:underline"
                  >
                    {hero.name}
                  </Link>
                  <div className="text-xs text-gray-500">
                    {translateRole(hero.role, locale)} · Tier {hero.tier}
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-300">{laneLabel(hero.lane, locale)}</td>
                <td className="px-3 py-3 text-white">{trendRate(hero.winRate)}</td>
                <td className="px-3 py-3 text-white">{trendRate(hero.pickRate)}</td>
                <td className="px-3 py-3 text-white">{trendRate(hero.banRate)}</td>
                <td className="px-3 py-3 text-white">{trendDelta(hero.delta7d.winRate)}</td>
                <td className="max-w-md px-3 py-3 text-gray-400">{note(hero)}</td>
                <td className="px-3 py-3">
                  <div className="flex min-w-[180px] flex-wrap gap-2 text-xs">
                    <Link
                      href={localePath(locale, `/hero/${hero.slug}`)}
                      className="rounded border border-hok-border px-2 py-1 text-hok-gold hover:border-hok-gold"
                    >
                      {c.heroPage}
                    </Link>
                    <Link
                      href={localePath(locale, `/hero/${hero.slug}/counters`)}
                      className="rounded border border-hok-border px-2 py-1 text-hok-gold hover:border-hok-gold"
                    >
                      {c.counters}
                    </Link>
                    <Link
                      href={localePath(locale, `/tools/build-compare/${hero.slug}`)}
                      className="rounded border border-hok-border px-2 py-1 text-hok-gold hover:border-hok-gold"
                    >
                      {c.buildCompare}
                    </Link>
                    <Link
                      href={localePath(locale, `/tools/damage-calculator/${hero.slug}`)}
                      className="rounded border border-hok-border px-2 py-1 text-hok-gold hover:border-hok-gold"
                    >
                      {c.damage}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LaneLeaderCards({ locale }: { locale: Locale }) {
  const c = copy(locale);
  return (
    <section className="card">
      <h2 className="section-title">{c.laneLeaders}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metaTrends.laneLeaders.map((laneGroup) => (
          <div key={laneGroup.lane} className="rounded-lg border border-hok-border bg-hok-dark/35 p-4">
            <h3 className="mb-3 text-lg font-bold text-white">{laneLabel(laneGroup.lane, locale)}</h3>
            <div className="space-y-3">
              {laneGroup.leaders.map((hero, index) => (
                <div
                  key={`${laneGroup.lane}-${hero.slug}`}
                  className="rounded-lg border border-hok-border/70 bg-hok-card/40 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
                        #{index + 1}
                      </div>
                      <Link
                        href={localePath(locale, `/hero/${hero.slug}`)}
                        className="mt-1 block text-sm font-semibold text-white hover:text-hok-gold"
                      >
                        {hero.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-500">
                        {translateRole(hero.role, locale)} · Tier {hero.tier}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{trendRate(hero.winRate)}</div>
                      <div className="mt-1 text-xs text-gray-500">Pick {trendRate(hero.pickRate)}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Link
                      href={localePath(locale, `/hero/${hero.slug}`)}
                      className="rounded border border-hok-border px-2 py-1 text-hok-gold hover:border-hok-gold"
                    >
                      {c.heroPage}
                    </Link>
                    <Link
                      href={localePath(locale, `/hero/${hero.slug}/counters`)}
                      className="rounded border border-hok-border px-2 py-1 text-hok-gold hover:border-hok-gold"
                    >
                      {c.counters}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MetaReportPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const c = copy(locale);
  const learnReady = isLocaleReadyForPath(locale, '/learn');

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: c.title, path: localePath(locale, '/meta-report') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: c.title },
        ]}
      />

      <div className="mb-8 max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-hok-gold">
          {c.updated} {metaTrends.latestDate}
        </p>
        <h1 className="mb-3 text-4xl font-black text-white">{c.title}</h1>
        <p className="text-base leading-relaxed text-gray-400">{c.subtitle}</p>
      </div>

      <div className="mb-8 rounded-lg border border-hok-border bg-hok-card/50 p-4 text-sm text-gray-300">
        {c.source} {c.compared} {metaTrends.comparisonDates.sevenDay} {c.and}{' '}
        {metaTrends.comparisonDates.thirtyDay}.{' '}
        <Link href={localePath(locale, '/hero-trends')} className="text-hok-gold hover:underline">
          {c.openDashboard}
        </Link>
      </div>

      <div className="mb-8 rounded-lg border border-hok-border bg-hok-dark/35 p-4">
        <h2 className="text-lg font-bold text-white">{c.summaryTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-300">{c.summary}</p>
      </div>

      {learnReady ? (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-white">{c.relatedReports}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['highest-win-rate-heroes-this-week', c.topWinGuide],
              ['lowest-win-rate-heroes-this-week', c.lowWinGuide],
              ['best-heroes-by-lane-this-week', c.laneGuide],
              ['most-picked-heroes-this-week', c.pickedGuide],
              ['most-underrated-heroes-this-week', c.sleeperGuide],
            ].map(([slug, label]) => (
              <Link
                key={slug}
                href={localePath(locale, `/learn/${slug}`)}
                className="rounded-lg border border-hok-border bg-hok-card/40 px-4 py-3 text-sm font-semibold text-hok-gold hover:border-hok-gold"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="space-y-8">
        <ReportTable
          title={c.topWin}
          items={metaTrends.topWinRate}
          locale={locale}
          note={(hero) => insightNote(locale, 'win', hero)}
        />
        <ReportTable
          title={c.lowWin}
          items={metaTrends.lowestWinRate}
          locale={locale}
          note={(hero) => insightNote(locale, 'low', hero)}
        />
        <LaneLeaderCards locale={locale} />
      </div>
    </div>
  );
}
