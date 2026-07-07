import type { Hero, HeroBuildItem } from '@/types/hero';
import { defaultBuildPresetIndex, getHeroBuildPresets } from '@/lib/data';
import { type Locale } from '@/lib/i18n';
import { translateItemName } from '@/lib/locale-names';
import { getHeroDisplayName } from '@/lib/locale-names';

function cleanItems(items: HeroBuildItem[], locale: Locale): string[] {
  return items
    .filter((item) => item.name && item.name !== 'Data unavailable')
    .slice(0, 6)
    .map((item) => translateItemName(item.name, locale, item.itemId));
}

function coreLine(items: string[], locale: Locale): string {
  const joiner = locale === 'zh-TW' ? ' -> ' : ' -> ';
  return items.length ? items.join(joiner) : locale === 'zh-TW' ? '沿用頁面推薦出裝' : 'Use the recommended build above';
}

function roleVariantText(hero: Hero, locale: Locale) {
  const isZh = locale === 'zh-TW';
  const role = hero.role;

  if (isZh) {
    if (role === 'Marksman') {
      return {
        antiTank: '前排很厚時，優先保留攻速與穿透核心；不要為了追後排放棄能穩定打坦的輸出窗口。',
        burst: '敵方後排缺保護時，可偏向暴擊與爆發節奏，但前提是隊友能先處理第一波開團。',
        survival: '雙刺客或強開陣容下，提前保留保命 / 復活槽位，比第六件純輸出更重要。',
      };
    }
    if (role === 'Mage') {
      return {
        antiTank: '敵方魔防成型時，優先比較法穿與持續消耗收益，不要只堆法強。',
        burst: '脆皮多且保護少時，保留一套能直接擊殺核心的爆發曲線。',
        survival: '被刺客盯防時，提前補防禦主動或保命裝，確保第二輪技能能放出來。',
      };
    }
    if (role === 'Tank' || role === 'Support') {
      return {
        antiTank: '敵方前排多時，重點不是自己打坦，而是活到第二輪控制，給隊友持續輸出時間。',
        burst: '隊伍缺開團時，出裝要支撐第一波進場，讓控制窗口足夠隊友跟傷害。',
        survival: '敵方爆發高時，優先按物理 / 法術傷害類型補抗性，不要固定照抄一套肉裝。',
      };
    }
    return {
      antiTank: '遇到高血量前排時，保留穿透、持續輸出或反坦裝備，不要只追求秒後排。',
      burst: '敵方後排缺位移時，可偏向爆發和進場節奏，打完第一套要能安全撤出。',
      survival: '控制鏈多時，提前補容錯裝，確保進場後不會被第一波集火秒掉。',
    };
  }

  if (role === 'Marksman') {
    return {
      antiTank: 'Keep attack-speed and penetration value when the enemy frontline is thick. Do not drop sustained damage just to chase backline burst.',
      burst: 'Lean into crit or burst tempo only when the enemy backline lacks peel and your team can absorb the first engage.',
      survival: 'Against double assassin or hard engage, an earlier defensive or revive slot is usually worth more than a sixth pure damage item.',
    };
  }
  if (role === 'Mage') {
    return {
      antiTank: 'When magic resistance appears, compare magic pierce and sustained poke instead of stacking raw ability power only.',
      burst: 'Against fragile carries with poor peel, keep a curve that lets one landed control spell become a kill.',
      survival: 'If assassins are marking you, buy safety early enough to cast the second rotation.',
    };
  }
  if (role === 'Tank' || role === 'Support') {
    return {
      antiTank: 'Into multiple frontliners, your job is usually to survive for the second control cycle and give carries enough time to shred tanks.',
      burst: 'If your team lacks engage, build so the first entry creates a real damage window for your carries.',
      survival: 'Against burst, match armor or magic resistance to the actual enemy carry instead of following one fixed tank path.',
    };
  }
  return {
    antiTank: 'Against high-HP frontliners, keep penetration, sustained damage, or anti-tank utility instead of chasing only backline burst.',
    burst: 'When enemy carries have poor mobility, lean into burst and entry tempo, but keep an exit plan after the first combo.',
    survival: 'Against heavy crowd control, add safety before forcing dives so the first lockdown does not end the fight.',
  };
}

export function HeroBuildVariants({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const isZh = locale === 'zh-TW';
  const name = getHeroDisplayName(hero, locale);
  const presets = getHeroBuildPresets(hero, locale);
  const active = presets[defaultBuildPresetIndex(hero, locale)] ?? presets[0];
  const items = cleanItems(active?.items ?? hero.build, locale);
  const core = items.slice(0, 3);
  const full = items.slice(0, 6);
  const text = roleVariantText(hero, locale);

  const variants = [
    {
      label: isZh ? '穩定預設' : 'Safe default',
      build: coreLine(full, locale),
      note: isZh
        ? `先照這套完成 ${name} 的主要輸出 / 生存曲線，再依敵方陣容換最後 1-2 格。`
        : `Start here for ${name}'s main damage or survival curve, then change the last 1-2 slots by draft.`,
    },
    {
      label: isZh ? '反坦 / 打前排' : 'Anti-tank',
      build: coreLine(core, locale),
      note: text.antiTank,
    },
    {
      label: isZh ? '爆發 / 抓後排' : 'Burst',
      build: coreLine(core, locale),
      note: text.burst,
    },
    {
      label: isZh ? '保命 / 防強開' : 'Survival',
      build: coreLine(core, locale),
      note: text.survival,
    },
  ];

  return (
    <section id="build-variants" className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
        {isZh ? '出裝變體' : 'Build variants'}
      </p>
      <h2 className="mt-1 text-xl font-bold text-white">
        {isZh ? `${name} 不同對局怎麼改裝` : `${name} build variants by matchup`}
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-400">
        {isZh
          ? '先用推薦六神裝建立核心曲線，再根據敵方前排、後排爆發與強開壓力調整最後幾個槽位。'
          : 'Use the recommended six-item build as the baseline, then adjust the last slots for frontline pressure, burst windows, or survival.'}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {variants.map((variant) => (
          <div key={variant.label} className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
            <h3 className="text-sm font-semibold text-white">{variant.label}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {isZh ? '核心路線' : 'Core path'}
            </p>
            <p className="mt-1 text-sm leading-6 text-hok-gold">{variant.build}</p>
            <p className="mt-2 text-sm leading-6 text-gray-300">{variant.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
