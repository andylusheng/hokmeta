import type { Hero } from '@/types/hero';
import { getTrendHero, trendDelta, trendDirection, trendRate, type MetaTrendHistoryPoint } from '@/lib/meta-trends';
import { type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

function sectionCopy(locale: Locale) {
  if (locale === 'zh-TW') {
    return {
      label: '30 天數據趨勢',
      title: '近 30 天勝率、出場率與禁用率',
      desc: '用每日同步快照看這個英雄最近一個月是升溫、降溫，還是只是在高熱度下被高估。',
      noData: '目前缺少足夠的 30 天歷史快照，等下一輪同步後再顯示。',
      winRate: '勝率',
      pickRate: '出場率',
      banRate: '禁用率',
      current: '目前',
      delta7d: '7 日變化',
      delta30d: '30 日變化',
      why: '趨勢判讀',
      patch: '最近平衡記錄',
      stable: '數據大致持平，這個英雄目前沒有明顯結構性變化。',
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
    patch: 'Recent balance note',
    stable: 'The numbers are mostly flat right now, so there is no strong structural shift to react to.',
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

function recentPatch(hero: Hero) {
  return hero.patchHistory.find((entry) => entry.change && entry.change !== 'Data unavailable');
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

  if (!trendHero || trendHero.history30d.length < 2) {
    return (
      <section id="trend-history" className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">{copy.label}</p>
        <h2 className="mt-1 text-xl font-bold text-white">{copy.title}</h2>
        <p className="mt-3 text-sm leading-6 text-gray-300">{copy.noData}</p>
      </section>
    );
  }

  const patch = recentPatch(hero);
  const trendNotes = [
    directionCopy(locale, trendHero.delta30d.winRate, copy.winRate),
    directionCopy(locale, trendHero.delta30d.pickRate, copy.pickRate),
    directionCopy(locale, trendHero.delta30d.banRate, copy.banRate),
  ].filter(Boolean) as string[];

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
          </div>
        </div>

        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
          <h3 className="text-sm font-semibold text-white">{copy.patch}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            {patch
              ? `${patch.version}: ${patch.change}`
              : locale === 'zh-TW'
                ? '最近 30 天內沒有明確的平衡條目可直接引用，暫時以勝率、出場率與禁用率變化為主。'
                : 'There is no clear recent balance entry to cite here, so treat the trend as a live read from win rate, pick rate, and ban rate movement first.'}
          </p>
        </div>
      </div>
    </section>
  );
}
