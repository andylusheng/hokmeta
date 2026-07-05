import Link from 'next/link';
import {
  getTopRisingHeroes,
  getMostPickedHeroes,
  getMostBannedHeroes,
  getRecentMetaChanges,
  site,
} from '@/lib/data';
import {
  getPatchStrongest,
  getSoloQueueKings,
  getProScenePressure,
  getBestDuos,
  getBestComps,
} from '@/lib/trends';
import patchesMeta from '../../data/patches.json';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { TrendList } from '@/components/TrendList';
import { HeroLinkRow } from '@/components/HeroLinkRow';
import { TrendDuoList } from '@/components/TrendDuoList';
import { TrendCompList } from '@/components/TrendCompList';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function HeroTrendsPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const rising = getTopRisingHeroes(10);
  const picked = getMostPickedHeroes(10);
  const banned = getMostBannedHeroes(10);
  const changes = getRecentMetaChanges(10);
  const patchStrong = getPatchStrongest(10);
  const soloKings = getSoloQueueKings(10);
  const proPressure = getProScenePressure(10);
  const duos = getBestDuos(6);
  const comps = getBestComps(4);

  const syncDate =
    'updated' in patchesMeta ? patchesMeta.updated : site.dateModified;

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
      <h1 className="mb-2 text-3xl font-bold text-white">{t('trends.title')}</h1>
      <p className="mb-4 text-gray-400">{t('trends.subtitle')}</p>
      <p className="mb-8 text-sm text-gray-500">
        {t('trends.syncNote', { date: syncDate })}{' '}
        <Link
          href={localePath(locale, '/heroes')}
          className="text-hok-gold hover:underline"
        >
          {t('nav.heroBuilds')}
        </Link>{' '}
        {t('trends.andHeroPages')}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="card">
          <h2 className="section-title">{t('trends.patchStrongest')}</h2>
          <p className="mb-3 text-xs text-gray-500">{t('trends.patchStrongestHint')}</p>
          <TrendList heroes={patchStrong} metric="winRate" locale={locale} />
        </section>

        <section className="card">
          <h2 className="section-title">{t('trends.soloQueue')}</h2>
          <p className="mb-3 text-xs text-gray-500">{t('trends.soloQueueHint')}</p>
          <TrendList heroes={soloKings} metric="winRate" locale={locale} />
        </section>

        <section className="card">
          <h2 className="section-title">{t('trends.highestWr')}</h2>
          <TrendList heroes={rising} metric="winRate" locale={locale} />
        </section>

        <section className="card">
          <h2 className="section-title">{t('trends.mostPicked')}</h2>
          <TrendList heroes={picked} metric="pickRate" locale={locale} />
        </section>

        <section className="card">
          <h2 className="section-title">{t('trends.mostBanned')}</h2>
          <TrendList heroes={banned} metric="banRate" locale={locale} />
        </section>

        <section className="card">
          <h2 className="section-title">{t('trends.proPressure')}</h2>
          <p className="mb-3 text-xs text-gray-500">{t('trends.proPressureHint')}</p>
          <TrendList heroes={proPressure} metric="banRate" locale={locale} />
        </section>

        <section className="card lg:col-span-2">
          <h2 className="section-title">{t('trends.bestDuos')}</h2>
          <p className="mb-3 text-xs text-gray-500">{t('trends.bestDuosHint')}</p>
          <TrendDuoList duos={duos} locale={locale} />
        </section>

        <section className="card lg:col-span-2">
          <h2 className="section-title">{t('trends.metaComps')}</h2>
          <p className="mb-3 text-xs text-gray-500">{t('trends.metaCompsHint')}</p>
          <TrendCompList comps={comps} locale={locale} />
        </section>

        <section className="card lg:col-span-2">
          <h2 className="section-title">{t('trends.recentChanges')}</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {changes.map(({ hero, patch }) => (
              <li
                key={`${hero.slug}-${patch}`}
                className="flex flex-wrap items-center gap-x-2 gap-y-0.5"
              >
                <HeroLinkRow
                  hero={hero}
                  locale={locale}
                  avatarSize={28}
                  className="inline-flex max-w-full"
                  nameClassName="truncate text-sm font-medium text-hok-gold group-hover:text-white"
                />
                <span className="text-gray-400">: {patch}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
