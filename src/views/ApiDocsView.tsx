import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DataAttribution } from '@/components/DataAttribution';
import { heroes, items, getLatestHeroDataDate, site } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/lib/schema';

export function ApiDocsView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const path = '/docs/api';
  const latest = getLatestHeroDataDate();
  const copy = {
    'zh-TW': {
      title: 'HOKMeta API 與結構化資料',
      description: 'HOKMeta 提供王者榮耀國際服英雄、裝備、出裝、銘文、克制與工具資料的靜態 JSON 端點。',
      eyebrow: '資料入口',
      heroes: '英雄數量',
      items: '裝備數量',
      latest: '最近更新',
      endpoints: '靜態 JSON 端點',
      usefulFor: '適合引用的資料',
      uses: [
        '英雄出裝、銘文、召喚師技能與分路建議。',
        '英雄克制、被克制、梯度與當前版本指標。',
        '工具頁可用的裝備與英雄資料，例如傷害計算器與 Build Compare。',
      ],
      dataSource: '官方每日勝率統計、HOKMeta 裝備資料庫與靜態 JSON 匯出',
      endpointsList: [
        {
          path: '/api/heroes.json',
          label: '全部英雄',
          description: '英雄 slug、名稱、定位、分路、梯度、勝率、出裝、銘文、克制、技能與版本記錄。',
        },
        {
          path: '/api/heroes/hou-yi.json',
          label: '單一英雄範例',
          description: '單一英雄的出裝、銘文、克制、技能資料與更新欄位。',
        },
        {
          path: '/api/items.json',
          label: '全部裝備',
          description: '裝備 id、名稱、圖標、價格、屬性描述、分類與被動文字。',
        },
      ],
    },
    id: {
      title: 'HOKMeta API dan Data Terstruktur',
      description: 'HOKMeta menyediakan endpoint JSON statis untuk data hero, item, build, arcana, counter, dan tool Honor of Kings Global.',
      eyebrow: 'Sumber data',
      heroes: 'Hero',
      items: 'Item',
      latest: 'Update terbaru',
      endpoints: 'Endpoint JSON statis',
      usefulFor: 'Data ini berguna untuk',
      uses: [
        'Build hero, arcana, battle spell, dan rekomendasi lane.',
        'Counter hero, daftar countered-by, tier, dan metrik meta saat ini.',
        'Data hero dan item untuk tool seperti damage calculator dan build compare.',
      ],
      dataSource: 'Statistik win rate harian resmi, database item HOKMeta, dan ekspor JSON statis',
      endpointsList: [
        {
          path: '/api/heroes.json',
          label: 'Semua hero',
          description: 'Slug, nama, role, lane, tier, rate, build, arcana, counter, skill, dan riwayat patch hero.',
        },
        {
          path: '/api/heroes/hou-yi.json',
          label: 'Contoh satu hero',
          description: 'Payload satu hero untuk build, arcana, counter, skill, dan metadata freshness.',
        },
        {
          path: '/api/items.json',
          label: 'Semua item',
          description: 'ID item, nama, ikon, harga, deskripsi stat, tipe, dan teks passive.',
        },
      ],
    },
    fil: {
      title: 'HOKMeta API at Structured Data',
      description: 'Nagbibigay ang HOKMeta ng static JSON endpoints para sa Honor of Kings Global hero, item, build, arcana, counter, at tool data.',
      eyebrow: 'Data source',
      heroes: 'Heroes',
      items: 'Items',
      latest: 'Latest update',
      endpoints: 'Static JSON endpoints',
      usefulFor: 'Useful ang data na ito para sa',
      uses: [
        'Hero builds, arcana, battle spells, at lane recommendations.',
        'Hero counters, countered-by lists, tier status, at current meta metrics.',
        'Hero at item data para sa damage calculator at build compare tools.',
      ],
      dataSource: 'Official daily win-rate stats, HOKMeta item database, and static export JSON',
      endpointsList: [
        {
          path: '/api/heroes.json',
          label: 'All heroes',
          description: 'Hero slugs, names, roles, lanes, tiers, rates, builds, arcana, counters, skills, at patch history.',
        },
        {
          path: '/api/heroes/hou-yi.json',
          label: 'Single hero example',
          description: 'One hero payload para sa build, arcana, counters, skill data, at freshness metadata.',
        },
        {
          path: '/api/items.json',
          label: 'All items',
          description: 'Item ids, names, icons, costs, stat descriptions, types, at passive text.',
        },
      ],
    },
    en: {
      title: 'HOKMeta API and Structured Data',
      description: 'HOKMeta provides static JSON endpoints for Honor of Kings Global hero, item, build, arcana, counter, and tool data.',
      eyebrow: 'Data source',
      heroes: 'Heroes',
      items: 'Items',
      latest: 'Latest update',
      endpoints: 'Static JSON endpoints',
      usefulFor: 'What this data is useful for',
      uses: [
        'Hero builds, arcana, battle spells, and lane recommendations.',
        'Hero counters, countered-by lists, tier status, and current meta metrics.',
        'Tool-ready hero and item data for the damage calculator and build compare pages.',
      ],
      dataSource: 'Official daily win-rate stats, HOKMeta item database, and static export JSON',
      endpointsList: [
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
      ],
    },
  }[locale];
  const title = copy.title;
  const description = copy.description;

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
          {copy.eyebrow}
        </p>
        <h1 className="mb-4 text-3xl font-bold text-white">{title}</h1>
        <p className="text-base leading-8 text-gray-300">{description}</p>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-hok-border bg-hok-card/70 p-4">
          <p className="text-sm text-gray-500">{copy.heroes}</p>
          <p className="mt-1 text-2xl font-bold text-white">{heroes.length}</p>
        </div>
        <div className="rounded-xl border border-hok-border bg-hok-card/70 p-4">
          <p className="text-sm text-gray-500">{copy.items}</p>
          <p className="mt-1 text-2xl font-bold text-white">{items.length}</p>
        </div>
        <div className="rounded-xl border border-hok-border bg-hok-card/70 p-4">
          <p className="text-sm text-gray-500">{copy.latest}</p>
          <p className="mt-1 text-2xl font-bold text-white">{latest}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="section-title">{copy.endpoints}</h2>
        <div className="grid gap-3">
          {copy.endpointsList.map((endpoint) => (
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
        <h2 className="section-title">{copy.usefulFor}</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-7 text-gray-300">
          {copy.uses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <DataAttribution
        subject="HOKMeta API"
        dataSource={copy.dataSource}
        dataUpdated={latest}
        locale={locale}
      />
    </div>
  );
}
