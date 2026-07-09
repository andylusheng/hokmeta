import Link from 'next/link';
import {
  laneLabel,
  metaTrends,
  trendDelta,
  trendDirection,
  trendRate,
  type MetaTrendHero,
} from '@/lib/meta-trends';
import { getHeroBySlug } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroAvatar } from '@/components/HeroAvatar';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

function sectionCopy(locale: Locale) {
  if (locale === 'zh-TW') {
    return {
      subtitle:
        '基於 Cloudflare D1 中的 Camp HOK 每日快照，整理本週最值得關注的高勝率、低勝率與分路冠軍，避免看一堆重複榜單。',
      updated: '最新同步',
      coverage: '覆蓋',
      days: '有效快照天數',
      heroes: '英雄',
      topWinRate: '本週可信最高勝率 Top 10',
      lowestWinRate: '本週最低勝率 Top 10',
      laneLeaders: '各分路勝率前 5',
      delta7d: '7 日變化',
      explanationTitle: '這頁怎麼看',
      explanation:
        '高勝率榜告訴你哪些英雄現在真的穩，低勝率榜告訴你哪些英雄容易拖累排位。分路前 5 比整站大榜更實用，因為大部分玩家只關心自己那一路。',
      dataNote:
        'HOKMeta 不把低樣本尖峰直接當成答案。這裡會先看勝率，再交叉參考出場率、禁用率與最近 7 天變化。',
      up: '上升',
      down: '下降',
      flat: '持平',
    };
  }

  return {
    subtitle:
      'Camp HOK daily snapshots from Cloudflare D1, trimmed into the three views that matter most right now: highest win rate, lowest win rate, and lane-by-lane leaders.',
    updated: 'Latest sync',
    coverage: 'Coverage',
    days: 'tracked days',
    heroes: 'heroes',
    topWinRate: 'Top 10 highest trusted win rate heroes',
    lowestWinRate: 'Top 10 lowest win rate heroes',
    laneLeaders: 'Top 5 by lane',
    delta7d: '7d change',
    explanationTitle: 'How to read this page',
    explanation:
      'The high-win board shows who is converting games right now. The low-win board highlights risky picks that may need cleaner builds, clearer matchups, or a better patch fit. Lane leaders matter because most ranked decisions are role-specific, not global.',
    dataNote:
      'HOKMeta does not treat low-sample spikes as truth. Win rate is shown together with pick rate, ban pressure, and 7-day movement so the board stays usable.',
    up: 'Up',
    down: 'Down',
    flat: 'Flat',
  };
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-hok-border bg-hok-dark/50 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function TrendHeroRow({
  rank,
  item,
  locale,
}: {
  rank?: number;
  item: MetaTrendHero;
  locale: Locale;
}) {
  const hero = getHeroBySlug(item.slug);
  const avatarHero = hero
    ? {
        name: hero.name,
        slug: hero.slug,
        avatar: hero.avatar,
        avatarFallback: hero.avatarFallback,
      }
    : null;
  const direction = trendDirection(item.delta7d.winRate);
  const copy = sectionCopy(locale);
  const directionLabel =
    direction === 'up' ? copy.up : direction === 'down' ? copy.down : copy.flat;

  return (
    <Link
      href={localePath(locale, `/hero/${item.slug}`)}
      className="group flex items-center justify-between gap-3 rounded-lg border border-hok-border bg-hok-dark/40 p-3 hover:border-hok-gold/50"
    >
      <div className="flex min-w-0 items-center gap-3">
        {typeof rank === 'number' ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hok-gold/40 bg-hok-gold/10 text-xs font-bold text-hok-gold">
            {rank}
          </div>
        ) : null}
        {avatarHero ? <HeroAvatar hero={avatarHero} size={42} /> : null}
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white group-hover:text-hok-gold">
            {item.name}
          </div>
          <div className="text-xs text-gray-500">
            {laneLabel(item.lane, locale)} · {item.role} · Tier {item.tier}
          </div>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-semibold text-white">{trendRate(item.winRate)}</div>
        <div
          className={`mt-1 text-xs ${
            direction === 'up'
              ? 'text-emerald-300'
              : direction === 'down'
                ? 'text-red-300'
                : 'text-hok-gold'
          }`}
        >
          {copy.delta7d} {trendDelta(item.delta7d.winRate)} · {directionLabel}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Pick {trendRate(item.pickRate)} · Ban {trendRate(item.banRate)}
        </div>
      </div>
    </Link>
  );
}

function TrendPanel({
  title,
  items,
  locale,
}: {
  title: string;
  items: MetaTrendHero[];
  locale: Locale;
}) {
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <TrendHeroRow key={item.slug} rank={index + 1} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}

export function HeroTrendsPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const copy = sectionCopy(locale);

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('trends.title'), path: localePath(locale, '/hero-trends') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('trends.title') },
        ]}
      />

      <div className="mb-8 max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-hok-gold">
          HOKMeta D1 Meta Intelligence
        </p>
        <h1 className="mb-3 text-4xl font-black text-white">{t('trends.title')}</h1>
        <p className="text-base leading-relaxed text-gray-400">{copy.subtitle}</p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatPill label={copy.updated} value={metaTrends.latestDate} />
        <StatPill
          label={copy.coverage}
          value={`${metaTrends.coverage.latestHeroCount} ${copy.heroes}`}
        />
        <StatPill label="7d compare" value={metaTrends.comparisonDates.sevenDay} />
        <StatPill
          label="30d compare"
          value={`${metaTrends.coverage.trackedDays} ${copy.days}`}
        />
      </div>

      <div className="mb-8 rounded-lg border border-hok-border bg-hok-card/50 p-4 text-sm leading-relaxed text-gray-300">
        <p className="font-semibold text-white">{copy.explanationTitle}</p>
        <p className="mt-2">{copy.explanation}</p>
        <p className="mt-3 text-gray-400">{copy.dataNote}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <TrendPanel title={copy.topWinRate} items={metaTrends.topWinRate} locale={locale} />
        <TrendPanel
          title={copy.lowestWinRate}
          items={metaTrends.lowestWinRate}
          locale={locale}
        />

        <section className="card lg:col-span-2">
          <h2 className="section-title">{copy.laneLeaders}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metaTrends.laneLeaders.map((laneGroup) => (
              <div
                key={laneGroup.lane}
                className="rounded-lg border border-hok-border bg-hok-dark/35 p-4"
              >
                <h3 className="mb-3 text-lg font-bold text-white">
                  {laneLabel(laneGroup.lane, locale)}
                </h3>
                <div className="space-y-2">
                  {laneGroup.leaders.map((item, index) => (
                    <TrendHeroRow
                      key={`${laneGroup.lane}-${item.slug}`}
                      rank={index + 1}
                      item={item}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
