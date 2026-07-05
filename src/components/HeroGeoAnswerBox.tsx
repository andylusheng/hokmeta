import Image from 'next/image';
import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';
import { getHeroGeoAnswer } from '@/lib/hero-geo';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { formatHeroNameList } from '@/lib/locale-names';

function join(values: string[], locale: Locale): string {
  return values.join(locale === 'zh-TW' ? '、' : ', ');
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
  const isZh = locale === 'zh-TW';
  const strongText = formatHeroNameList(answer.strongInto, locale) || (isZh ? '脆皮後排與缺少位移的陣容' : 'low-mobility carries and fragile backlines');
  const weakText = formatHeroNameList(answer.weakInto, locale) || (isZh ? '強開、突進與控制陣容' : 'hard engage, dive, and crowd control drafts');
  const source = hero.dataSource?.trim() || (isZh ? 'Camp HOK 國際服資料 + HOKMeta 編輯校對' : 'Camp HOK international server data + HOKMeta editorial review');
  const coreItems = answer.itemNames.slice(0, 3);

  return (
    <section
      id="overview"
      className="scroll-mt-20 mb-6 rounded-xl border border-hok-gold/35 bg-hok-card/85 p-5 shadow-lg shadow-black/20"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-hok-gold">
            {isZh ? '直接答案' : 'Build answer'}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            {isZh
              ? `${answer.name} ${answer.season} 最佳出裝一覽`
              : `${answer.name} best build for ${answer.season}`}
          </h2>
        </div>
        <div className="text-xs text-gray-500 sm:text-right">
          <p>{isZh ? '國際服' : 'International server'}</p>
          <p>{isZh ? '更新' : 'Updated'}: {answer.updated}</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '定位與難度' : 'Role, lane, difficulty'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {answer.lane} · {answer.role} · Tier {hero.tier} · {hero.difficulty}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '目前數據' : 'Current patch rates'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {formatRate(hero.winRate)} WR · {formatRate(hero.pickRate)} Pick · {formatRate(hero.banRate)} Ban
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '核心三件' : 'Core 3 items'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {coreItems.length ? join(coreItems, locale) : (isZh ? '查看出裝區' : 'See build section')}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '最佳銘文' : 'Best arcana'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {join(answer.arcanaNames, locale) || (isZh ? '查看銘文區' : 'See arcana section')}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '召喚師技能' : 'Battle spell'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {join(answer.spellNames, locale) || 'Flash'}
          </p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '強勢對局' : 'Best into'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{strongText}</p>
        </div>
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '克制風險' : 'Watch out for'}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{weakText}</p>
        </div>
      </div>

      {answer.items.length ? (
        <div className="mt-4 rounded-lg border border-hok-border/70 bg-hok-dark/45 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isZh ? '推薦六神裝' : 'Recommended item build'}
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
                    {isZh ? `第 ${index + 1} 件` : `Slot ${index + 1}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {isZh ? '資料可信度' : 'Data trust'}
        </p>
        <div className="mt-2 grid gap-2 text-sm text-gray-300 md:grid-cols-3">
          <p>
            <span className="text-gray-500">{isZh ? '來源' : 'Source'}:</span> {source}
          </p>
          <p>
            <span className="text-gray-500">{isZh ? '同步' : 'Last synced'}:</span> {answer.updated}
          </p>
          <p>
            <span className="text-gray-500">{isZh ? '公開資料' : 'Public data'}:</span>{' '}
            <Link href={localePath(locale, '/docs/api')} className="text-hok-gold hover:underline">
              {isZh ? 'API 文件' : 'API docs'}
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-gray-300">
        {isZh
          ? `${answer.name} 在 ${answer.year} 版本的核心思路是用這套出裝和銘文穩定打出 ${answer.lane} 節奏；面對 ${strongText} 時更容易發揮，遇到 ${weakText} 時要優先考慮走位、保命裝與隊友保護。`
          : `${answer.name}'s ${answer.year} build is designed to make the hero reliable in ${answer.lane}. It performs best into ${strongText}, but you should respect ${weakText} and adjust defensive or penetration items when the draft demands it.`}
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
          {isZh ? '查看克制' : 'Counter page'}
        </Link>
      </div>
    </section>
  );
}
