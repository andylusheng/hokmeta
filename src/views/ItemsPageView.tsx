'use client';



import { useMemo, useState } from 'react';

import Link from 'next/link';

import { items } from '@/lib/data';

import {

  getLocalizedItemDescription,

  getLocalizedItemLabel,

  getLocalizedItemName,

  getLocalizedItemPassives,

} from '@/lib/item-locale';

import { createT, localePath, type Locale } from '@/lib/i18n';

import { Breadcrumb } from '@/components/Breadcrumb';



const TYPE_FILTERS = ['all', 'attack', 'magic', 'defense', 'movement', 'jungle', 'support'] as const;



function itemType(item: (typeof items)[0]): string {

  const t = (item.type || '').toLowerCase();

  if (t.includes('attack') || t.includes('physical')) return 'attack';

  if (t.includes('magic') || t.includes('spell')) return 'magic';

  if (t.includes('defense') || t.includes('armor')) return 'defense';

  if (t.includes('boot') || t.includes('move')) return 'movement';

  if (t.includes('jungle')) return 'jungle';

  if (t.includes('support')) return 'support';

  return 'attack';

}



export function ItemsPageView({ locale = 'en' }: { locale?: Locale }) {

  const t = createT(locale);

  const [filter, setFilter] = useState<(typeof TYPE_FILTERS)[number]>('all');



  const sorted = useMemo(

    () => [...items].sort((a, b) => getLocalizedItemName(a, locale).localeCompare(getLocalizedItemName(b, locale))),

    [locale]

  );



  const filtered = useMemo(() => {

    if (filter === 'all') return sorted;

    return sorted.filter((i) => itemType(i) === filter);

  }, [sorted, filter]);



  return (

    <div className="container-wide">

      <Breadcrumb

        items={[

          { label: t('common.home'), href: localePath(locale, '/') },

          { label: t('nav.items') },

        ]}

      />

      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">

        {t('items.title')}

      </h1>

      <p className="mb-2 text-gray-400">{t('items.subtitle', { count: sorted.length })}</p>

      <p className="mb-6 text-xs text-gray-500">{t('items.campSource')}</p>



      <div className="mb-6 flex flex-wrap gap-2">

        {TYPE_FILTERS.map((f) => (

          <button

            key={f}

            type="button"

            onClick={() => setFilter(f)}

            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${

              filter === f

                ? 'bg-hok-gold text-hok-dark'

                : 'border border-hok-border text-gray-400 hover:border-hok-gold/40 hover:text-white'

            }`}

          >

            {t(`items.filter.${f}`)}

          </button>

        ))}

      </div>



      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {filtered.map((item) => {

          const label = getLocalizedItemLabel(item, locale);

          const desc = getLocalizedItemDescription(item, locale);

          const passiveSnippet = getLocalizedItemPassives(item, locale)[0]?.split('\n')[0];

          return (

            <Link

              key={item.id}

              href={localePath(locale, `/items/${item.id}`)}

              className="card-hover flex gap-3"

            >

              {item.icon && (

                // eslint-disable-next-line @next/next/no-img-element

                <img

                  src={item.icon}

                  alt=""

                  width={52}

                  height={52}

                  className="h-[52px] w-[52px] shrink-0 rounded-lg ring-1 ring-hok-border"

                  loading="lazy"

                />

              )}

              <div className="min-w-0">

                <h2 className="font-bold text-white">{getLocalizedItemName(item, locale)}</h2>

                {item.gold != null && (

                  <p className="text-xs font-semibold text-hok-gold">{item.gold} gold</p>

                )}

                {label && (

                  <p className="mt-0.5 text-xs font-medium text-hok-gold/90">{label}</p>

                )}

                <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm text-hok-muted">

                  {desc}

                </p>

                {passiveSnippet && (

                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">

                    {passiveSnippet}

                  </p>

                )}

              </div>

            </Link>

          );

        })}

      </div>



      <p className="mt-8 text-sm text-hok-muted">

        {t('items.hint')}{' '}

        <Link href={localePath(locale, '/heroes')} className="text-hok-gold hover:underline">

          {t('nav.heroBuilds')}

        </Link>

      </p>

    </div>

  );

}

