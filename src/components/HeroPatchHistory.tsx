import type { Hero, PatchEntry } from '@/types/hero';
import { type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { META_SEASON_LABEL } from '@/lib/meta-season';

function patchTagClass(tag?: string | null) {
  if (!tag) return 'border-hok-border bg-hok-dark/40 text-gray-300';
  if (/buff|增強|增强/i.test(tag)) return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300';
  if (/nerf|削弱/i.test(tag)) return 'border-red-500/30 bg-red-950/20 text-red-300';
  return 'border-hok-gold/30 bg-hok-gold/10 text-hok-gold';
}

function getPatches(hero: Hero, locale: Locale): PatchEntry[] {
  const patches = locale === 'zh-TW' && hero.patchHistoryZh?.length
    ? hero.patchHistoryZh
    : hero.patchHistory;

  return (patches || [])
    .filter((patch) => patch.change && patch.change !== 'Data unavailable')
    .slice(0, 3);
}

export function HeroPatchHistory({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const name = getHeroDisplayName(hero, locale);
  const patches = getPatches(hero, locale);
  const copy = {
    'zh-TW': {
      eyebrow: '版本記錄',
      title: `${name} 近期版本變動`,
      description: `依官方每日勝率統計與 HOKMeta 同步資料整理；目前頁面按 ${META_SEASON_LABEL} 與最新英雄快照解讀。`,
      currentPatch: '當前版本',
      empty: `目前 HOKMeta 同步資料中沒有 ${name} 的重大可驗證平衡改動。請以本頁最新勝率、出裝與克制資料為準。`,
    },
    id: {
      eyebrow: 'Riwayat patch',
      title: `Perubahan patch terbaru ${name}`,
      description: `Disusun dari statistik win rate harian resmi dan data sinkron HOKMeta; halaman ini dibaca untuk ${META_SEASON_LABEL} dan snapshot hero terbaru.`,
      currentPatch: 'Patch saat ini',
      empty: `Belum ada perubahan balance besar yang terverifikasi untuk ${name} di snapshot HOKMeta saat ini. Gunakan win rate, build, dan catatan counter terbaru di halaman ini.`,
    },
    fil: {
      eyebrow: 'Patch history',
      title: `Recent patch changes ni ${name}`,
      description: `Batay sa official daily win-rate stats at HOKMeta sync data; binabasa ang page na ito para sa ${META_SEASON_LABEL} at latest hero snapshot.`,
      currentPatch: 'Current patch',
      empty: `Walang major verified balance change para kay ${name} sa current HOKMeta snapshot. Gamitin ang latest rates, build, at counter notes sa page na ito.`,
    },
    en: {
      eyebrow: 'Patch history',
      title: `${name} recent patch history`,
      description: `Based on official daily win-rate stats and HOKMeta sync data; this page is interpreted for ${META_SEASON_LABEL} and the latest hero snapshot.`,
      currentPatch: 'Current patch',
      empty: `No major verified balance change for ${name} is available in the current HOKMeta data snapshot. Use the latest rates, build, and counter notes on this page.`,
    },
  }[locale];

  return (
    <section id="patch-history" className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
        {copy.eyebrow}
      </p>
      <h2 className="mt-1 text-xl font-bold text-white">
        {copy.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-400">
        {copy.description}
      </p>

      {patches.length ? (
        <div className="mt-4 space-y-3">
          {patches.map((patch, index) => (
            <div
              key={`${patch.version}-${patch.change}-${index}`}
              className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {patch.versionName || patch.version || copy.currentPatch}
                </span>
                {patch.tag ? (
                  <span className={`rounded border px-2 py-0.5 text-[11px] font-semibold uppercase ${patchTagClass(patch.tag)}`}>
                    {patch.tag}
                  </span>
                ) : null}
                {patch.publishedAt ? (
                  <span className="text-xs text-gray-500">{patch.publishedAt}</span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-300">{patch.change}</p>
              {patch.detail ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">{patch.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4 text-sm leading-6 text-gray-300">
          {copy.empty}
        </div>
      )}
    </section>
  );
}
