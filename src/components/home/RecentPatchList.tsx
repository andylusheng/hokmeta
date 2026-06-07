import Link from 'next/link';
import { heroes } from '@/lib/data';
import { getLocalizedPatchHistory } from '@/lib/hero-locale-data';
import { HeroAvatar } from '@/components/HeroAvatar';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

function patchTag(change: string): 'buff' | 'nerf' | 'adjust' {
  const c = change.toLowerCase();
  if (/increas|boost|enhanc|buff|提升|增強|加强/.test(c)) return 'buff';
  if (/reduc|lower|decreas|nerf|削弱|降低/.test(c)) return 'nerf';
  return 'adjust';
}

export function RecentPatchList({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  let recent = [...heroes].filter((h) => {
    const patch = getLocalizedPatchHistory(h, locale)[0];
    return (
      patch?.change &&
      !patch.change.startsWith('Camp HOK') &&
      patch.change.length < 120
    );
  });
  if (!recent.length) {
    recent = heroes.filter((h) => getLocalizedPatchHistory(h, locale).length);
  }
  recent = recent.slice(0, 8);

  if (!recent.length) return null;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="section-title mb-0">{t('home.recentUpdates')}</h2>
        <Link
          href={localePath(locale, '/patches')}
          className="text-sm text-hok-gold hover:underline"
        >
          {t('home.allPatches')}
        </Link>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {recent.map((hero) => {
          const patch = getLocalizedPatchHistory(hero, locale)[0];
          const tag = patchTag(patch.change);
          const tagClass =
            tag === 'buff'
              ? 'patch-tag-buff'
              : tag === 'nerf'
                ? 'patch-tag-nerf'
                : 'patch-tag-adjust';
          const tagLabel =
            tag === 'buff'
              ? t('home.tagBuff')
              : tag === 'nerf'
                ? t('home.tagNerf')
                : t('home.tagAdjust');

          return (
            <li key={hero.slug}>
              <Link
                href={localePath(locale, `/hero/${hero.slug}`)}
                className="card-hover flex items-center gap-3"
              >
                <HeroAvatar hero={hero} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">
                      {getHeroDisplayName(hero, locale)}
                    </span>
                    <span className={tagClass}>{tagLabel}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-hok-muted">
                    {patch.change}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
