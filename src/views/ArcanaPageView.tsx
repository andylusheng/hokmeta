import Image from 'next/image';
import Link from 'next/link';
import {
  arcanaCatalog,
  getLocalizedRuneDescription,
  getLocalizedRuneName,
} from '@/lib/arcana-catalog';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';

export function ArcanaPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const runes = [...arcanaCatalog].sort(
    (a, b) => (b.usedByCount ?? 0) - (a.usedByCount ?? 0)
  );

  return (
    <div className="container-wide">
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.arcana') },
        ]}
      />

      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
        {t('arcana.title')}
      </h1>
      <p className="mb-2 text-gray-400">
        {t('arcana.subtitle', { count: runes.length })}
      </p>
      <p className="mb-8 text-xs text-gray-500">{t('arcana.campSource')}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {runes.map((rune) => (
          <div key={rune.id} className="card-hover flex gap-3">
            {rune.icon && (
              <Image
                src={rune.icon}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-lg ring-1 ring-hok-border"
                loading="lazy"
              />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-white">
                {getLocalizedRuneName(rune, locale)}
              </h2>
              {rune.level != null && (
                <p className="text-xs text-hok-gold">Lv.{rune.level}</p>
              )}
              <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-hok-muted">
                {getLocalizedRuneDescription(rune, locale)}
              </p>
              {(rune.usedByCount ?? 0) > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  {t('arcana.usedBy')}:{' '}
                  <span className="font-semibold text-hok-gold">
                    {rune.usedByCount}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-hok-muted">
        {t('arcana.hint')}{' '}
        <Link
          href={localePath(locale, '/heroes')}
          className="text-hok-gold hover:underline"
        >
          {t('nav.heroBuilds')}
        </Link>
      </p>
    </div>
  );
}
