import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DataAttribution } from '@/components/DataAttribution';
import { heroes, items, getLatestHeroDataDate, site } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/lib/schema';

const endpoints = [
  {
    path: '/api/heroes.json',
    label: 'All heroes',
    description: 'Hero slugs, names, roles, lanes, tiers, rates, builds, arcana, counters, skills, and patch history.',
  },
  {
    path: '/api/heroes/hou-yi.json',
    label: 'Single hero example',
    description: 'One hero payload for build, arcana, counters, skill data, and freshness metadata.',
  },
  {
    path: '/api/items.json',
    label: 'All items',
    description: 'Item ids, names, icons, costs, stat descriptions, types, and passive text.',
  },
];

export function ApiDocsView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const isZh = locale === 'zh-TW';
  const path = '/docs/api';
  const title = isZh
    ? 'HOKMeta API 與結構化資料'
    : 'HOKMeta API and Structured Data';
  const description = isZh
    ? 'HOKMeta 提供王者榮耀國際服英雄、裝備、出裝、銘文、克制與工具資料的靜態 JSON 端點。'
    : 'HOKMeta provides static JSON endpoints for Honor of Kings Global hero, item, build, arcana, counter, and tool data.';
  const latest = getLatestHeroDataDate();

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: title, path: localePath(locale, path) },
        ])}
      />
      <JsonLd data={articleSchema(title, localePath(locale, path), description)} />

      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: title },
        ]}
      />

      <section className="mb-8 max-w-4xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-hok-gold">
          {isZh ? '資料入口' : 'Data source'}
        </p>
        <h1 className="mb-4 text-3xl font-bold text-white">{title}</h1>
        <p className="text-base leading-8 text-gray-300">{description}</p>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-hok-border bg-hok-card/70 p-4">
          <p className="text-sm text-gray-500">{isZh ? '英雄數量' : 'Heroes'}</p>
          <p className="mt-1 text-2xl font-bold text-white">{heroes.length}</p>
        </div>
        <div className="rounded-xl border border-hok-border bg-hok-card/70 p-4">
          <p className="text-sm text-gray-500">{isZh ? '裝備數量' : 'Items'}</p>
          <p className="mt-1 text-2xl font-bold text-white">{items.length}</p>
        </div>
        <div className="rounded-xl border border-hok-border bg-hok-card/70 p-4">
          <p className="text-sm text-gray-500">{isZh ? '最近更新' : 'Latest update'}</p>
          <p className="mt-1 text-2xl font-bold text-white">{latest}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="section-title">{isZh ? '靜態 JSON 端點' : 'Static JSON endpoints'}</h2>
        <div className="grid gap-3">
          {endpoints.map((endpoint) => (
            <Link
              key={endpoint.path}
              href={endpoint.path}
              className="rounded-xl border border-hok-border bg-hok-card/70 p-4 transition hover:border-hok-gold/70 hover:bg-hok-card"
            >
              <p className="font-semibold text-white">{endpoint.label}</p>
              <code className="mt-2 block text-sm text-hok-gold">{site.domain.replace(/\/$/, '')}{endpoint.path}</code>
              <p className="mt-2 text-sm leading-6 text-gray-400">{endpoint.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-hok-border bg-hok-card/70 p-5">
        <h2 className="section-title">{isZh ? '適合引用的資料' : 'What this data is useful for'}</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-7 text-gray-300">
          <li>{isZh ? '英雄出裝、銘文、召喚師技能與分路建議。' : 'Hero builds, arcana, battle spells, and lane recommendations.'}</li>
          <li>{isZh ? '英雄克制、被克制、梯度與當前版本指標。' : 'Hero counters, countered-by lists, tier status, and current meta metrics.'}</li>
          <li>{isZh ? '工具頁可用的裝備與英雄資料，例如傷害計算器與 Build Compare。' : 'Tool-ready hero and item data for the damage calculator and build compare pages.'}</li>
        </ul>
      </section>

      <DataAttribution
        subject="HOKMeta API"
        dataSource="Camp HOK ranked data, HOKMeta item database, and static export JSON"
        dataUpdated={latest}
        locale={locale}
      />
    </div>
  );
}
