import Link from 'next/link';
import type { Hero } from '@/types/hero';
import {
  getTrendHero,
  trendDelta,
  trendDirection,
  trendRate,
  type MetaTrendHistoryPoint,
} from '@/lib/meta-trends';
import { getLearnArticle } from '@/lib/learn';
import { formatCurrentSeasonPatch } from '@/lib/current-season-patches';
import { localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { isFeaturedHero } from '@/lib/featured-heroes';
import { isLocaleReadyForPath } from '@/lib/locale-readiness';

function sectionCopy(locale: Locale) {
  if (locale === 'zh-TW') {
    return {
      label: '30 天數據趨勢',
      title: '最近 30 天勝率、出場率與禁用率',
      desc: '用每日同步快照看這個英雄最近一個月是升溫、降溫，還是只是在高熱度下被高估。',
      noData: '目前缺少足夠的 30 天歷史快照，等下一輪同步後再顯示。',
      winRate: '勝率',
      pickRate: '出場率',
      banRate: '禁用率',
      current: '目前',
      delta7d: '7 日變化',
      delta30d: '30 日變化',
      why: '趨勢判讀',
      patch: '版本原因',
      nextSteps: '下一步直接看',
      guide: '完整攻略',
      counters: '克制頁',
      stable: '數據大致持平，這個英雄目前沒有明顯結構性變化。',
      noPatch:
        '目前賽季最近 45 天內沒有可直接引用的官方平衡改動，這段變化先按出裝、對局環境與熟練度波動理解。',
    };
  }

  return {
    label: '30-day trend',
    title: 'Last 30 days of win rate, pick rate, and ban rate',
    desc: 'Use daily snapshots to see whether this hero is heating up, cooling down, or simply staying popular without converting that attention into wins.',
    noData: 'Not enough 30-day snapshot history yet. This panel will fill in after more syncs.',
    winRate: 'Win rate',
    pickRate: 'Pick rate',
    banRate: 'Ban rate',
    current: 'Current',
    delta7d: '7d change',
    delta30d: '30d change',
    why: 'Trend read',
    patch: 'Patch reason',
    nextSteps: 'Read next',
    guide: 'Full guide',
    counters: 'Counters',
    stable: 'The numbers are mostly flat right now, so there is no strong structural shift to react to.',
    noPatch:
      'There is no current-season official balance entry to cite in the last 45 days, so read this move as a mix of build adaptation, draft pressure, and player execution.',
  };
}

function metricColor(metric: 'winRate' | 'pickRate' | 'banRate') {
  if (metric === 'winRate') return '#f2c14e';
  if (metric === 'pickRate') return '#55c2ff';
  return '#f97878';
}

function linePath(points: number[]) {
  if (!points.length) return '';
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(max - min, 0.5);
  return points
    .map((value, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function TrendSparkline({
  history,
  metric,
}: {
  history: MetaTrendHistoryPoint[];
  metric: 'winRate' | 'pickRate' | 'banRate';
}) {
  const points = history
    .map((entry) => entry[metric])
    .filter((value): value is number => typeof value === 'number');

  if (points.length < 2) {
    return <div className="h-20 rounded-lg border border-hok-border/70 bg-hok-dark/25" />;
  }

  const path = linePath(points);

  return (
    <div className="rounded-lg border border-hok-border/70 bg-hok-dark/25 p-2">
      <svg viewBox="0 0 100 100" className="h-20 w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} fill="none" stroke={metricColor(metric)} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function directionCopy(locale: Locale, value: number | null, label: string) {
  if (value == null) return null;
  const direction = trendDirection(value);
  if (locale === 'zh-TW') {
    if (direction === 'up') return `${label} 正在上升，變化 ${trendDelta(value)}。`;
    if (direction === 'down') return `${label} 正在下滑，變化 ${trendDelta(value)}。`;
    return `${label} 基本持平。`;
  }
  if (direction === 'up') return `${label} is climbing by ${trendDelta(value)}.`;
  if (direction === 'down') return `${label} is falling by ${trendDelta(value)}.`;
  return `${label} is mostly flat.`;
}

function buildReasonNotes(
  locale: Locale,
  heroName: string,
  values: {
    win30: number | null;
    pick30: number | null;
    ban30: number | null;
    win7: number | null;
  }
) {
  const winDirection = trendDirection(values.win30);
  const pickDirection = trendDirection(values.pick30);
  const banDirection = trendDirection(values.ban30);

  if (locale === 'zh-TW') {
    const notes: string[] = [];
    if (winDirection === 'up' && pickDirection !== 'down') {
      notes.push(`${heroName} 的勝率和出場率一起往上，通常代表當前出裝或版本節奏更適合這個英雄。`);
    } else if (winDirection === 'up' && pickDirection === 'down') {
      notes.push(`${heroName} 的勝率在升，但出場率沒有跟上，這更像熟練玩家在更乾淨的對局裡把勝率拉高。`);
    } else if (winDirection === 'down' && pickDirection === 'up') {
      notes.push(`${heroName} 仍然常被拿出來，但轉化成勝場的能力在下降，常見原因是被過度搶、沿用舊版出裝，或現在的對局環境不再友好。`);
    } else if (winDirection === 'down') {
      notes.push(`${heroName} 的勝率走低，代表這個英雄更吃對面陣容、進場時機和隊友配合，不能再當萬用先手。`);
    }

    if (banDirection === 'up') {
      notes.push(`禁用率還在抬升，說明玩家對這個英雄的壓力感沒有消失，排位裡要同時看數據和 BP 環境。`);
    } else if (values.win7 != null && Math.abs(values.win7) >= 0.35) {
      notes.push(`最近 7 天變化已經超過 ${trendDelta(values.win7)}，代表這不是一天的噪音，值得直接回頭檢查裝備、對線和團戰節奏。`);
    }

    return notes;
  }

  const notes: string[] = [];
  if (winDirection === 'up' && pickDirection !== 'down') {
    notes.push(`${heroName} is converting better while usage stays healthy, which usually points to cleaner build fit or a patch pace that now favors the kit.`);
  } else if (winDirection === 'up' && pickDirection === 'down') {
    notes.push(`${heroName} is winning more without becoming more popular, which often means experienced players are getting cleaner value in narrower drafts.`);
  } else if (winDirection === 'down' && pickDirection === 'up') {
    notes.push(`${heroName} is still getting picked, but the conversion into wins is slipping. That usually means the old build path is being overused or the patch is less forgiving now.`);
  } else if (winDirection === 'down') {
    notes.push(`${heroName} is trending down, so matchup quality, engage timing, and team support matter more than they did a few weeks ago.`);
  }

  if (banDirection === 'up') {
    notes.push(`Ban pressure is still climbing, so draft respect remains higher than the raw win rate alone suggests.`);
  } else if (values.win7 != null && Math.abs(values.win7) >= 0.35) {
    notes.push(`The last 7 days already moved by ${trendDelta(values.win7)}, so this is not just one-day noise. Recheck build order, lane handling, and fight timing.`);
  }

  return notes;
}

export function HeroTrendHistory({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const copy = sectionCopy(locale);
  const trendHero = getTrendHero(hero.slug);
  const heroName = getHeroDisplayName(hero, locale);
  const guideArticle = isLocaleReadyForPath(locale, '/learn')
    ? getLearnArticle(`${hero.slug}-guide`, locale)
    : undefined;
  const showFeaturedLinks = isFeaturedHero(hero.slug);

  if (!trendHero || trendHero.history30d.length < 2) {
    return (
      <section id="trend-history" className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">{copy.label}</p>
        <h2 className="mt-1 text-xl font-bold text-white">{copy.title}</h2>
        <p className="mt-3 text-sm leading-6 text-gray-300">{copy.noData}</p>
      </section>
    );
  }

  const patch = formatCurrentSeasonPatch(hero.slug, locale);
  const trendNotes = [
    directionCopy(locale, trendHero.delta30d.winRate, copy.winRate),
    directionCopy(locale, trendHero.delta30d.pickRate, copy.pickRate),
    directionCopy(locale, trendHero.delta30d.banRate, copy.banRate),
  ].filter(Boolean) as string[];
  const reasonNotes = buildReasonNotes(locale, heroName, {
    win30: trendHero.delta30d.winRate,
    pick30: trendHero.delta30d.pickRate,
    ban30: trendHero.delta30d.banRate,
    win7: trendHero.delta7d.winRate,
  });

  const summaryLine =
    locale === 'zh-TW'
      ? `${heroName} 目前勝率 ${trendRate(trendHero.winRate)}，30 日變化 ${trendDelta(trendHero.delta30d.winRate)}，7 日變化 ${trendDelta(trendHero.delta7d.winRate)}。`
      : `${heroName} currently sits at ${trendRate(trendHero.winRate)} win rate, with a 30-day move of ${trendDelta(trendHero.delta30d.winRate)} and a 7-day move of ${trendDelta(trendHero.delta7d.winRate)}.`;

  return (
    <section id="trend-history" className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">{copy.label}</p>
      <h2 className="mt-1 text-xl font-bold text-white">{copy.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">{copy.desc}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {[
          ['winRate', copy.winRate],
          ['pickRate', copy.pickRate],
          ['banRate', copy.banRate],
        ].map(([metric, label]) => (
          <div key={metric} className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {copy.current} {trendRate(trendHero[metric as 'winRate' | 'pickRate' | 'banRate'])}
                </p>
              </div>
              <div className="text-right text-xs text-gray-400">
                <div>{copy.delta7d} {trendDelta(trendHero.delta7d[metric as 'winRate' | 'pickRate' | 'banRate'])}</div>
                <div className="mt-1">{copy.delta30d} {trendDelta(trendHero.delta30d[metric as 'winRate' | 'pickRate' | 'banRate'])}</div>
              </div>
            </div>
            <div className="mt-3">
              <TrendSparkline
                history={trendHero.history30d}
                metric={metric as 'winRate' | 'pickRate' | 'banRate'}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
          <h3 className="text-sm font-semibold text-white">{copy.why}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">{summaryLine}</p>
          <div className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
            {trendNotes.length > 0 ? (
              trendNotes.map((note) => (
                <p key={note} className="rounded border border-hok-border/70 bg-hok-card/45 px-3 py-2">
                  {note}
                </p>
              ))
            ) : (
              <p className="rounded border border-hok-border/70 bg-hok-card/45 px-3 py-2">{copy.stable}</p>
            )}
            {reasonNotes.map((note) => (
              <p key={note} className="rounded border border-hok-border/70 bg-hok-card/45 px-3 py-2">
                {note}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
          <h3 className="text-sm font-semibold text-white">{copy.patch}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            {patch || copy.noPatch}
          </p>

          {showFeaturedLinks ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
                {copy.nextSteps}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {guideArticle ? (
                  <Link
                    href={localePath(locale, `/learn/${guideArticle.slug}`)}
                    className="rounded border border-hok-border px-3 py-2 text-sm font-semibold text-hok-gold transition hover:border-hok-gold"
                  >
                    {heroName} {copy.guide}
                  </Link>
                ) : null}
                <Link
                  href={localePath(locale, `/hero/${hero.slug}/counters`)}
                  className="rounded border border-hok-border px-3 py-2 text-sm font-semibold text-hok-gold transition hover:border-hok-gold"
                >
                  {heroName} {copy.counters}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
