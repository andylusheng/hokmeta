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
  const fallback = {
    'zh-TW': '沿用頁面推薦出裝',
    id: 'Gunakan build rekomendasi di atas',
    fil: 'Gamitin ang recommended build sa itaas',
    en: 'Use the recommended build above',
  }[locale];
  return items.length ? items.join(joiner) : fallback;
}

function roleVariantText(hero: Hero, locale: Locale) {
  const role = hero.role;

  if (locale === 'zh-TW') {
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

  if (locale === 'id') {
    if (role === 'Marksman') {
      return {
        antiTank: 'Saat frontline musuh tebal, pertahankan attack speed dan penetration. Jangan melepas sustained damage hanya demi burst ke backline.',
        burst: 'Masuk ke crit atau burst tempo hanya ketika backline musuh minim peel dan tim kamu bisa menahan engage pertama.',
        survival: 'Melawan double assassin atau hard engage, slot defensif atau revive lebih bernilai daripada item damage murni keenam.',
      };
    }
    if (role === 'Mage') {
      return {
        antiTank: 'Saat magic resistance musuh sudah jadi, bandingkan magic pierce dan poke berkelanjutan, bukan hanya menumpuk ability power.',
        burst: 'Melawan carry rapuh dengan peel lemah, pakai curve yang membuat satu kontrol berhasil langsung jadi kill.',
        survival: 'Jika assassin terus mengincar, beli safety lebih awal agar rotasi skill kedua masih bisa keluar.',
      };
    }
    if (role === 'Tank' || role === 'Support') {
      return {
        antiTank: 'Melawan banyak frontliner, tugas utama biasanya bertahan sampai siklus kontrol kedua agar carry punya waktu menembus tank.',
        burst: 'Jika tim kurang engage, build harus membuat entry pertama membuka window damage yang nyata.',
        survival: 'Melawan burst, cocokkan armor atau magic resistance dengan carry musuh yang benar-benar paling berbahaya.',
      };
    }
    return {
      antiTank: 'Melawan frontliner HP tinggi, pertahankan penetration, sustained damage, atau utility anti-tank, bukan hanya mengejar burst backline.',
      burst: 'Jika carry musuh minim mobilitas, boleh condong ke burst dan tempo masuk, tetapi tetap siapkan jalur keluar setelah combo pertama.',
      survival: 'Melawan crowd control berat, tambah safety sebelum memaksa dive agar lockdown pertama tidak langsung mengakhiri fight.',
    };
  }

  if (locale === 'fil') {
    if (role === 'Marksman') {
      return {
        antiTank: 'Kapag makapal ang frontline ng kalaban, panatilihin ang attack speed at penetration value. Huwag isakripisyo ang sustained damage para lang habulin ang backline burst.',
        burst: 'Mag-crit o burst tempo lang kapag kulang ang peel ng enemy backline at kaya ng team mo saluhin ang unang engage.',
        survival: 'Laban sa double assassin o hard engage, mas mahalaga ang maagang defensive o revive slot kaysa sixth pure damage item.',
      };
    }
    if (role === 'Mage') {
      return {
        antiTank: 'Kapag may magic resistance na ang kalaban, ikumpara ang magic pierce at sustained poke imbes na raw ability power lang.',
        burst: 'Laban sa fragile carries na mahina ang peel, panatilihin ang curve na kayang gawing kill ang isang landed control spell.',
        survival: 'Kung tinututukan ka ng assassins, bumili ng safety nang maaga para mailabas pa ang second rotation.',
      };
    }
    if (role === 'Tank' || role === 'Support') {
      return {
        antiTank: 'Laban sa maraming frontliners, kadalasan ang trabaho mo ay mabuhay hanggang second control cycle para may oras ang carries mag-shred ng tanks.',
        burst: 'Kung kulang ang engage ng team, mag-build para ang unang pasok ay gumawa ng totoong damage window.',
        survival: 'Laban sa burst, itapat ang armor o magic resistance sa tunay na carry threat ng kalaban.',
      };
    }
    return {
      antiTank: 'Laban sa high-HP frontliners, panatilihin ang penetration, sustained damage, o anti-tank utility imbes na backline burst lang.',
      burst: 'Kapag mahina ang mobility ng enemy carries, puwedeng mag-burst at entry tempo, pero dapat may exit plan pagkatapos ng unang combo.',
      survival: 'Laban sa maraming crowd control, magdagdag muna ng safety bago mag-dive para hindi matapos agad ang fight sa unang lockdown.',
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
  const name = getHeroDisplayName(hero, locale);
  const presets = getHeroBuildPresets(hero, locale);
  const active = presets[defaultBuildPresetIndex(hero, locale)] ?? presets[0];
  const items = cleanItems(active?.items ?? hero.build, locale);
  const core = items.slice(0, 3);
  const full = items.slice(0, 6);
  const text = roleVariantText(hero, locale);
  const copy = {
    'zh-TW': {
      safeDefault: '穩定預設',
      safeNote: `先照這套完成 ${name} 的主要輸出 / 生存曲線，再依敵方陣容換最後 1-2 格。`,
      antiTank: '反坦 / 打前排',
      burst: '爆發 / 抓後排',
      survival: '保命 / 防強開',
      eyebrow: '出裝變體',
      title: `${name} 不同對局怎麼改裝`,
      description: '先用推薦六神裝建立核心曲線，再根據敵方前排、後排爆發與強開壓力調整最後幾個槽位。',
      corePath: '核心路線',
    },
    id: {
      safeDefault: 'Default aman',
      safeNote: `Mulai dari build ini untuk curve damage atau survival utama ${name}, lalu ubah 1-2 slot terakhir sesuai draft musuh.`,
      antiTank: 'Anti-tank / lawan frontline',
      burst: 'Burst / incar backline',
      survival: 'Survival / anti hard engage',
      eyebrow: 'Varian build',
      title: `Cara menyesuaikan build ${name} per matchup`,
      description: 'Gunakan build enam item rekomendasi sebagai baseline, lalu sesuaikan slot akhir untuk tekanan frontline, burst window, atau survival.',
      corePath: 'Rute core',
    },
    fil: {
      safeDefault: 'Safe default',
      safeNote: `Dito magsimula para sa main damage o survival curve ni ${name}, tapos palitan ang huling 1-2 slots depende sa draft.`,
      antiTank: 'Anti-tank / frontline',
      burst: 'Burst / backline pick',
      survival: 'Survival / anti hard engage',
      eyebrow: 'Build variants',
      title: `${name} build variants by matchup`,
      description: 'Gamitin ang recommended six-item build bilang baseline, tapos i-adjust ang huling slots para sa frontline pressure, burst windows, o survival.',
      corePath: 'Core path',
    },
    en: {
      safeDefault: 'Safe default',
      safeNote: `Start here for ${name}'s main damage or survival curve, then change the last 1-2 slots by draft.`,
      antiTank: 'Anti-tank',
      burst: 'Burst',
      survival: 'Survival',
      eyebrow: 'Build variants',
      title: `${name} build variants by matchup`,
      description: 'Use the recommended six-item build as the baseline, then adjust the last slots for frontline pressure, burst windows, or survival.',
      corePath: 'Core path',
    },
  }[locale];

  const variants = [
    {
      label: copy.safeDefault,
      build: coreLine(full, locale),
      note: copy.safeNote,
    },
    {
      label: copy.antiTank,
      build: coreLine(core, locale),
      note: text.antiTank,
    },
    {
      label: copy.burst,
      build: coreLine(core, locale),
      note: text.burst,
    },
    {
      label: copy.survival,
      build: coreLine(core, locale),
      note: text.survival,
    },
  ];

  return (
    <section id="build-variants" className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
        {copy.eyebrow}
      </p>
      <h2 className="mt-1 text-xl font-bold text-white">
        {copy.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-400">
        {copy.description}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {variants.map((variant) => (
          <div key={variant.label} className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
            <h3 className="text-sm font-semibold text-white">{variant.label}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {copy.corePath}
            </p>
            <p className="mt-1 text-sm leading-6 text-hok-gold">{variant.build}</p>
            <p className="mt-2 text-sm leading-6 text-gray-300">{variant.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
