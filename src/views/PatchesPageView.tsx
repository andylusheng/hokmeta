import Link from 'next/link';
import patchesMeta from '../../data/patches.json';
import { createT, localePath, type Locale } from '@/lib/i18n';
import {
  getCurrentSeason,
  getSeasonPatches,
  localizedChange,
  localizedHeroName,
} from '@/lib/patches';
import { Breadcrumb } from '@/components/Breadcrumb';

function tagClass(tag: string | null | undefined): string {
  if (!tag) return 'patch-tag-adjust';
  if (/增強|增强|buff/i.test(tag)) return 'patch-tag-buff';
  if (/削弱|nerf/i.test(tag)) return 'patch-tag-nerf';
  return 'patch-tag-adjust';
}

export function PatchesPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const updated =
    'updated' in patchesMeta && patchesMeta.updated ? patchesMeta.updated : null;
  const seasons = getSeasonPatches();
  const currentSeason = getCurrentSeason();

  return (
    <div className="container-wide">
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.patches') },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{t('patches.title')}</h1>
      <p className="mb-4 text-gray-400">{t('patches.subtitle')}</p>

      <div className="mb-8 rounded-lg border border-hok-border bg-hok-card px-4 py-3 text-sm text-gray-300">
        <p>
          <span className="text-hok-gold">{t('patches.source')}:</span>{' '}
          {'source' in patchesMeta ? String(patchesMeta.source) : 'Camp HOK'}
        </p>
        {updated && (
          <p className="mt-1">
            {t('metaBanner.updated')} {updated}
            {'heroCount' in patchesMeta && patchesMeta.heroCount
              ? ` · ${patchesMeta.heroCount} heroes`
              : ''}
            {currentSeason ? ` · ${t('patches.currentSeason', { season: currentSeason })}` : ''}
          </p>
        )}
        {'notes' in patchesMeta && patchesMeta.notes && (
          <p className="mt-2 text-gray-500">{String(patchesMeta.notes)}</p>
        )}
      </div>

      {seasons.length === 0 ? (
        <p className="text-sm text-gray-500">{t('patches.noData')}</p>
      ) : (
        <div className="space-y-10">
          {seasons.map((season) => (
            <section key={season.seasonName} id={`season-${season.seasonName}`}>
              <h2 className="section-title">
                {season.seasonName}
                {season.seasonName === currentSeason && (
                  <span className="ml-2 text-xs font-normal text-hok-gold">
                    ({t('patches.current')})
                  </span>
                )}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {season.changes.length} {t('patches.changeCount')}
                </span>
              </h2>
              <ul className="space-y-2">
                {season.changes.map((row) => (
                  <li key={`${row.heroSlug}-${row.versionName}-${row.change}`} className="card">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={localePath(locale, `/hero/${row.heroSlug}`)}
                        className="font-semibold text-white hover:text-hok-gold"
                      >
                        {localizedHeroName(row, locale)}
                      </Link>
                      {row.tag && (
                        <span className={tagClass(row.tag)}>{row.tag}</span>
                      )}
                      {row.versionName && (
                        <span className="text-xs text-gray-500">{row.versionName}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-300">
                      {localizedChange(row, locale)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
