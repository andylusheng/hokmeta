import { defaultBuildPresetIndex, formatRate, getHeroBuildPresets } from '@/lib/data';
import { getLocalizedArcana, getLocalizedSpells } from '@/lib/hero-locale-data';
import { translateLane, translateRole } from '@/lib/locale-labels';
import {
  formatHeroNameList,
  getHeroDisplayName,
  translateArcanaName,
  translateItemName,
} from '@/lib/locale-names';
import { GEO_BUILD_YEAR, META_SEASON_LABEL } from '@/lib/meta-season';
import type { Locale } from '@/lib/i18n';
import type { Hero, HeroBuildItem } from '@/types/hero';

export interface HeroGeoAnswer {
  year: string;
  season: string;
  name: string;
  lane: string;
  role: string;
  items: HeroBuildItem[];
  itemNames: string[];
  arcanaNames: string[];
  spellNames: string[];
  strongInto: string[];
  weakInto: string[];
  updated: string;
}

function cleanNames(values: string[]): string[] {
  return values.filter((value) => value && value !== 'Data unavailable');
}

function listJoin(values: string[], locale: Locale): string {
  if (locale === 'zh-TW') return values.join('、');
  if (locale === 'fil') return values.join(', ');
  return values.join(', ');
}

function geoFaqCopy(locale: Locale) {
  const copy = {
    'zh-TW': {
      itemsFallback: '查看頁面內推薦出裝',
      arcanaFallback: '查看頁面內銘文配置',
      firstItemFallback: '推薦出裝第一件核心裝',
      weakFallback: '強突進與控制陣容',
      tierLine: (name: string, tier: string, winRate: string, pickRate: string) =>
        `目前資料顯示 ${name} 是 Tier ${tier}，勝率 ${winRate}，選取率 ${pickRate}。`,
    },
    id: {
      itemsFallback: 'lihat rekomendasi build item di halaman ini',
      arcanaFallback: 'lihat rekomendasi arcana di halaman ini',
      firstItemFallback: 'item core pertama yang direkomendasikan',
      weakFallback: 'komposisi hard engage dan crowd control',
      tierLine: (name: string, tier: string, winRate: string, pickRate: string) =>
        `Data HOKMeta saat ini menempatkan ${name} di Tier ${tier}, dengan win rate ${winRate} dan pick rate ${pickRate}.`,
    },
    fil: {
      itemsFallback: 'tingnan ang recommended item build sa page na ito',
      arcanaFallback: 'tingnan ang recommended arcana setup sa page na ito',
      firstItemFallback: 'unang recommended core item',
      weakFallback: 'hard engage at crowd control drafts',
      tierLine: (name: string, tier: string, winRate: string, pickRate: string) =>
        `Sa current HOKMeta data, si ${name} ay Tier ${tier}, may ${winRate} win rate at ${pickRate} pick rate.`,
    },
    en: {
      itemsFallback: 'see the recommended item build',
      arcanaFallback: 'see the recommended arcana setup',
      firstItemFallback: 'the first recommended core item',
      weakFallback: 'hard engage and crowd control drafts',
      tierLine: (name: string, tier: string, winRate: string, pickRate: string) =>
        `Current HOKMeta data lists ${name} as Tier ${tier}, with ${winRate} win rate and ${pickRate} pick rate.`,
    },
  } satisfies Record<Locale, {
    itemsFallback: string;
    arcanaFallback: string;
    firstItemFallback: string;
    weakFallback: string;
    tierLine: (name: string, tier: string, winRate: string, pickRate: string) => string;
  }>;

  return copy[locale];
}

export function getHeroGeoAnswer(hero: Hero, locale: Locale): HeroGeoAnswer {
  const presets = getHeroBuildPresets(hero, locale);
  const preset = presets[defaultBuildPresetIndex(hero, locale)];
  const items = (preset?.items ?? []).filter(
    (item) => item.name && item.name !== 'Data unavailable'
  );
  const itemNames = items.map((item) =>
    translateItemName(item.name, locale, item.itemId)
  );
  const arcanaNames = cleanNames(getLocalizedArcana(hero, locale)).map((name) =>
    translateArcanaName(name, locale)
  );

  return {
    year: GEO_BUILD_YEAR,
    season: META_SEASON_LABEL,
    name: getHeroDisplayName(hero, locale),
    lane: translateLane(hero.lane, locale) || translateRole(hero.role, locale),
    role: translateRole(hero.role, locale),
    items,
    itemNames,
    arcanaNames,
    spellNames: cleanNames(getLocalizedSpells(hero, locale)),
    strongInto: cleanNames(hero.counters).slice(0, 4),
    weakInto: cleanNames(hero.counteredBy).slice(0, 4),
    updated: hero.dataUpdated ?? 'current meta',
  };
}

export function heroGeoFaqs(hero: Hero, locale: Locale) {
  const answer = getHeroGeoAnswer(hero, locale);
  const copy = geoFaqCopy(locale);
  const items =
    listJoin(answer.itemNames, locale) || copy.itemsFallback;
  const arcana =
    listJoin(answer.arcanaNames, locale) || copy.arcanaFallback;
  const spells =
    answer.spellNames.join(locale === 'zh-TW' ? ' / ' : ', ') || 'Flash';
  const firstItem =
    answer.itemNames[0] || copy.firstItemFallback;
  const weak =
    formatHeroNameList(answer.weakInto, locale) ||
    copy.weakFallback;
  const tierLine = copy.tierLine(
    answer.name,
    hero.tier,
    formatRate(hero.winRate),
    formatRate(hero.pickRate)
  );

  if (locale === 'zh-TW') {
    return [
      {
        id: 'geo-best-build-2026',
        question: `${answer.name} ${answer.year} 最佳出裝是什麼？`,
        answer: `${answer.name} ${answer.year} 推薦走 ${answer.lane}，核心出裝是 ${items}。銘文優先 ${arcana}，召喚師技能通常選 ${spells}。這套配置依據 ${answer.season} 與 ${answer.updated} 數據整理。`,
      },
      {
        id: 'geo-best-arcana',
        question: `${answer.name} 最強銘文怎麼帶？`,
        answer: `${answer.name} 推薦銘文是 ${arcana}。如果你在排位裡需要更穩的容錯，可以先保留核心輸出銘文，再依照對線壓力調整移速、穿透或續航。`,
      },
      {
        id: 'geo-first-item',
        question: `${answer.name} 第一件裝備應該出什麼？`,
        answer: `${answer.name} 通常優先做 ${firstItem}，因為第一件裝備要先支撐 ${answer.lane} 的清線、換血或節奏能力。若前期被強壓，可以先補小防裝或鞋子，但不要拖太久核心輸出。`,
      },
      {
        id: 'geo-counter-build',
        question: `${answer.name} 遇到坦克或高防禦陣容要怎麼調整？`,
        answer: `先用 HOKMeta 傷害計算器或 Build Compare 檢查穿透、續航與保命裝的實際收益。如果敵方前排很厚，優先比較反坦、穿透與能持續輸出的裝備，不要只看面板攻擊。`,
      },
      {
        id: 'geo-countered-by',
        question: `${answer.name} 最怕哪些英雄或陣容？`,
        answer: `${answer.name} 較怕 ${weak}。選角時要注意進場距離、控制鏈與隊友保護，必要時調整裝備保命。`,
      },
      {
        id: 'geo-best-lane',
        question: `${answer.name} 應該走哪一路？`,
        answer: `${answer.name} 主要定位是 ${answer.role}，推薦分路是 ${answer.lane}。如果隊伍缺少穩定輸出，應優先確保發育節奏，而不是過早跟團掉經濟。`,
      },
      {
        id: 'geo-good-pick',
        question: `${answer.name} 現在值得練嗎？`,
        answer: `${tierLine} 如果你需要一個能在 ${answer.lane} 穩定提供輸出的英雄，${answer.name} 值得練；但遇到 ${weak} 時，需要更依賴站位與隊友保護。`,
      },
      {
        id: 'geo-teamfight',
        question: `${answer.name} 團戰應該怎麼打？`,
        answer: `${answer.name} 團戰要先確認敵方強開與控制技能位置，再根據 ${answer.role} 的定位輸出、保護或進場。順風時圍繞核心裝備壓節奏，逆風時優先保命和清線，不要孤身進入草叢。`,
      },
    ];
  }

  if (locale === 'id') {
    return [
      {
        id: 'geo-best-build-2026',
        question: `Apa build ${answer.name} terbaik di ${answer.year}?`,
        answer: `Build ${answer.name} terbaik di ${answer.year} memakai ${items}. Mainkan ${answer.name} di ${answer.lane}, gunakan arcana ${arcana}, dan biasanya ambil ${spells}. Rekomendasi ini mengikuti ${answer.season} dan snapshot data HOKMeta ${answer.updated}.`,
      },
      {
        id: 'geo-best-arcana',
        question: `Apa arcana terbaik untuk ${answer.name}?`,
        answer: `Arcana terbaik untuk ${answer.name} adalah ${arcana}. Pertahankan arcana damage utama terlebih dahulu, lalu sesuaikan movement speed, pierce, atau sustain jika matchup lane terlalu berisiko.`,
      },
      {
        id: 'geo-first-item',
        question: `${answer.name} sebaiknya membeli item pertama apa?`,
        answer: `${answer.name} biasanya memprioritaskan ${firstItem} karena item pertama harus membantu clear wave, trading, atau tempo di ${answer.lane}. Jika lane tidak aman, boleh sesuaikan boots atau komponen defensif kecil, tetapi jangan terlalu lama menunda core damage.`,
      },
      {
        id: 'geo-counter-build',
        question: `Apa build ${answer.name} melawan tank?`,
        answer: `Gunakan damage calculator atau build compare HOKMeta untuk membandingkan penetration, sustained damage, dan survivability. Pilihan anti-tank terbaik bergantung pada apakah ${answer.name} bisa terus menyerang dengan aman atau perlu item defensif untuk bertahan dari engage pertama.`,
      },
      {
        id: 'geo-countered-by',
        question: `Siapa yang counter ${answer.name}?`,
        answer: `${answer.name} paling rentan terhadap ${weak}. Saat draft, perhatikan jarak engage, chain control, dan perlindungan tim sebelum memilih build yang terlalu agresif.`,
      },
      {
        id: 'geo-best-lane',
        question: `${answer.name} main di lane apa?`,
        answer: `${answer.name} biasanya dimainkan sebagai ${answer.role} di ${answer.lane}. Di ranked, utamakan pola farming yang stabil dan rotasi hanya ketika wave sudah aman.`,
      },
      {
        id: 'geo-good-pick',
        question: `Apakah ${answer.name} masih bagus di Honor of Kings?`,
        answer: `${tierLine} ${answer.name} layak dipakai jika tim membutuhkan tekanan stabil di ${answer.lane}, tetapi hindari blind pick ke ${weak} tanpa peel atau rencana item defensif.`,
      },
      {
        id: 'geo-teamfight',
        question: `Bagaimana cara memainkan ${answer.name} saat teamfight?`,
        answer: `Saat teamfight, ${answer.name} harus menghormati jarak engage musuh terlebih dahulu, lalu menjalankan tugas ${answer.role}: memberi damage, melindungi carry, atau masuk setelah skill control penting terpakai.`,
      },
    ];
  }

  if (locale === 'fil') {
    return [
      {
        id: 'geo-best-build-2026',
        question: `Ano ang best ${answer.name} build sa ${answer.year}?`,
        answer: `Ang best ${answer.name} build sa ${answer.year} ay gumagamit ng ${items}. I-play si ${answer.name} sa ${answer.lane}, kunin ang ${arcana} arcana, at kadalasang gamitin ang ${spells}. Naka-align ito sa ${answer.season} at sa HOKMeta data snapshot noong ${answer.updated}.`,
      },
      {
        id: 'geo-best-arcana',
        question: `Ano ang best arcana para kay ${answer.name}?`,
        answer: `Ang best arcana setup ni ${answer.name} ay ${arcana}. Unahin ang core damage arcana, tapos mag-adjust ng movement speed, pierce, o sustain kung delikado ang lane matchup.`,
      },
      {
        id: 'geo-first-item',
        question: `Ano ang unang item na dapat bilhin ni ${answer.name}?`,
        answer: `Karaniwang inuuna ni ${answer.name} ang ${firstItem} dahil dapat tulungan ng unang item ang clear speed, trading power, o tempo sa ${answer.lane}. Kung unsafe ang lane, puwedeng mag-adjust muna sa boots o maliit na defensive component.`,
      },
      {
        id: 'geo-counter-build',
        question: `Ano ang build ni ${answer.name} laban sa tanks?`,
        answer: `Gamitin ang HOKMeta damage calculator o build compare tool para i-test ang penetration, sustained damage, at survivability. Depende ang anti-tank choice sa kung makaka-hit nang safe si ${answer.name} o kailangan muna ng defensive item.`,
      },
      {
        id: 'geo-countered-by',
        question: `Sino ang counter kay ${answer.name}?`,
        answer: `Mas delikado si ${answer.name} laban sa ${weak}. Sa draft, bantayan ang engage range, chain control, at kung may sapat na peel bago pumili ng sobrang agresibong build.`,
      },
      {
        id: 'geo-best-lane',
        question: `Anong lane nilalaro si ${answer.name}?`,
        answer: `Si ${answer.name} ay pangunahing ${answer.role} sa ${answer.lane}. Sa ranked, unahin ang stable farm pattern at mag-rotate lang kapag safe ang wave state.`,
      },
      {
        id: 'geo-good-pick',
        question: `Maganda pa bang gamitin si ${answer.name} sa Honor of Kings?`,
        answer: `${tierLine} Sulit gamitin si ${answer.name} kung kailangan ng team ng stable pressure sa ${answer.lane}, pero iwasan ang blind pick laban sa ${weak} kung walang peel o defensive item plan.`,
      },
      {
        id: 'geo-teamfight',
        question: `Paano laruin si ${answer.name} sa teamfight?`,
        answer: `Sa teamfight, unahin muna ni ${answer.name} ang respeto sa engage range ng kalaban, tapos gawin ang trabaho ng ${answer.role}: damage, protection, o pagpasok pagkatapos magamit ang key control skills.`,
      },
    ];
  }

  return [
    {
      id: 'geo-best-build-2026',
      question: `What is the best ${answer.name} build in ${answer.year}?`,
      answer: `The best ${answer.name} build in ${answer.year} uses ${items}. Play ${answer.name} in ${answer.lane}, take ${arcana} arcana, and usually run ${spells}. This recommendation is aligned with ${answer.season} and the ${answer.updated} HOKMeta data snapshot.`,
    },
    {
      id: 'geo-best-arcana',
      question: `What is the best arcana for ${answer.name}?`,
      answer: `The best ${answer.name} arcana setup is ${arcana}. Keep the core damage arcana first, then adjust movement speed, pierce, or sustain only when the matchup makes your lane unsafe.`,
    },
    {
      id: 'geo-first-item',
      question: `What should ${answer.name} build first?`,
      answer: `${answer.name} usually wants ${firstItem} first because the first item should stabilize ${answer.lane} clear speed, trading power, or tempo. If the lane is unsafe, adjust boots or a small defensive component first, but do not delay the core damage curve too long.`,
    },
    {
      id: 'geo-counter-build',
      question: `What should ${answer.name} build against tanks?`,
      answer: `Use the HOKMeta damage calculator or build compare tool to test penetration, sustained damage, and survivability against tank templates. The best anti-tank item choice depends on whether ${answer.name} can keep attacking safely or needs a defensive item to survive the first engage.`,
    },
    {
      id: 'geo-countered-by',
      question: `Who counters ${answer.name}?`,
      answer: `${answer.name} is most vulnerable to ${weak}. Draft peel, respect engage range, and adjust items when the enemy lineup can dive or chain crowd control.`,
    },
    {
      id: 'geo-best-lane',
      question: `What lane does ${answer.name} play?`,
      answer: `${answer.name} is mainly played as a ${answer.role} in ${answer.lane}. In ranked games, prioritize a stable farm pattern and only rotate early when the wave state keeps your economy safe.`,
    },
    {
      id: 'geo-good-pick',
      question: `Is ${answer.name} good in Honor of Kings?`,
      answer: `${tierLine} ${answer.name} is worth playing if your team needs reliable ${answer.lane} pressure, but you should avoid blind-picking into ${weak} without peel or defensive item planning.`,
    },
    {
      id: 'geo-teamfight',
      question: `How do you play ${answer.name} in teamfights?`,
      answer: `In teamfights, ${answer.name} should respect enemy engage range first, then play around the hero's ${answer.role} job: dealing damage, protecting carries, or entering after key control is used. When behind, clear waves and preserve cooldowns instead of face-checking fog.`,
    },
  ];
}
