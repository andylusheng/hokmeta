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
import { translateRole } from '@/lib/locale-labels';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroAvatar } from '@/components/HeroAvatar';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

function sectionCopy(locale: Locale) {
  if (locale === 'zh-TW') {
    return {
      subtitle: '基於官方每日勝率統計。',
      updated: '最新同步',
      coverage: '覆蓋',
      days: '有效快照天數',
      heroes: '英雄',
      topWinRate: '本週可信最高勝率 Top 10',
      lowestWinRate: '本週最低勝率 Top 10',
      laneLeaders: '各分路勝率前 5',
      delta7d: '7 日變化',
      explanationTitle: '玩家怎麼用',
      explanation:
        '先看你主玩的那一路。高勝率榜用來找穩定答案，低勝率榜用來避坑，分路前 5 比整站總榜更實用。',
      dataNote:
        '同一個英雄要一起看勝率、出場率和最近 7 天變化，不要只看單天尖峰。',
      up: '上升',
      down: '下降',
      flat: '持平',
    };
  }

  if (locale === 'id') {
    return {
      subtitle: 'Berdasarkan statistik win rate harian resmi.',
      updated: 'Sync terbaru',
      coverage: 'Cakupan',
      days: 'hari snapshot',
      heroes: 'hero',
      topWinRate: 'Top 10 win rate terpercaya minggu ini',
      lowestWinRate: 'Top 10 win rate terendah minggu ini',
      laneLeaders: 'Top 5 per lane',
      delta7d: 'Perubahan 7 hari',
      explanationTitle: 'Cara memakai halaman ini',
      explanation:
        'Mulai dari lane utama kamu. Board win rate tinggi membantu mencari pick stabil, board win rate rendah membantu menghindari pick berisiko, dan top 5 per lane lebih praktis daripada daftar global.',
      dataNote:
        'Baca win rate bersama pick rate dan perubahan 7 hari. Jangan percaya lonjakan satu hari saja.',
      up: 'Naik',
      down: 'Turun',
      flat: 'Datar',
    };
  }

  if (locale === 'fil') {
    return {
      subtitle: 'Batay sa opisyal na daily win-rate stats.',
      updated: 'Latest sync',
      coverage: 'Coverage',
      days: 'tracked days',
      heroes: 'heroes',
      topWinRate: 'Top 10 trusted win rate heroes this week',
      lowestWinRate: 'Top 10 lowest win rate heroes this week',
      laneLeaders: 'Top 5 per lane',
      delta7d: '7-day change',
      explanationTitle: 'Paano gamitin ng players',
      explanation:
        'Magsimula sa main lane mo. Gamitin ang high-win board para sa stable ranked picks, low-win board para umiwas sa risky picks, at lane leaders para sa mas praktikal na shortlist.',
      dataNote:
        'Basahin ang win rate kasama ng pick rate at 7-day movement. Huwag umasa sa one-day spike lang.',
      up: 'Up',
      down: 'Down',
      flat: 'Flat',
    };
  }

  return {
    subtitle: 'Built from official daily win-rate stats.',
    updated: 'Latest sync',
    coverage: 'Coverage',
    days: 'tracked days',
    heroes: 'heroes',
    topWinRate: 'Top 10 highest trusted win rate heroes',
    lowestWinRate: 'Top 10 lowest win rate heroes',
    laneLeaders: 'Top 5 by lane',
    delta7d: '7d change',
    explanationTitle: 'How players should use this',
    explanation:
      'Start with your main lane. Use the high-win board for stable ranked answers, the low-win board to avoid traps, and the lane leaders for the most practical shortlist.',
    dataNote:
      'Read win rate together with pick rate and 7-day movement instead of trusting one-day spikes.',
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
            {laneLabel(item.lane, locale)} · {translateRole(item.role, locale)} · Tier {item.tier}
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
