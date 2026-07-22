import { heroes, formatRate, getMostBannedHeroes, getMostPickedHeroes } from '@/lib/data';
import { getFullHeroes } from '@/lib/heroes-server';
import {
  laneLabel,
  metaTrends,
  trendDelta,
  trendRate,
  type MetaTrendHero,
} from '@/lib/meta-trends';
import type { LearnArticle } from '@/lib/learn';
import type { Hero } from '@/types/hero';

type LocalLearnLocale = 'id' | 'fil';

const dataNote: Record<LocalLearnLocale, string> = {
  id:
    `Data berasal dari statistik resmi harian server internasional, terakhir disinkronkan ${metaTrends.latestDate}. ` +
    'Nama hero, item, dan arcana mengikuti client Honor of Kings Global agar mudah dicari di dalam game.',
  fil:
    `Batay ang data sa official daily stats ng international server, huling sync ${metaTrends.latestDate}. ` +
    'Pinananatili ang hero, item, at arcana names mula sa Honor of Kings Global client para madaling hanapin sa laro.',
};

export function getLearnDataNoteIdFil(locale: LocalLearnLocale): string {
  return dataNote[locale];
}

function join(items: string[], locale: LocalLearnLocale): string {
  const filtered = items.filter(Boolean);
  if (!filtered.length) return locale === 'id' ? 'belum tersedia' : 'wala pang data';
  return filtered.join(', ');
}

function statLine(hero: Pick<Hero, 'winRate' | 'pickRate' | 'banRate' | 'tier'>) {
  return `${formatRate(hero.winRate)} WR, ${formatRate(hero.pickRate)} pick, ${formatRate(hero.banRate)} ban, Tier ${hero.tier}`;
}

function listTrendHeroes(items: MetaTrendHero[], locale: LocalLearnLocale) {
  return items
    .map((hero, index) => {
      const lane = laneLabel(hero.lane, locale === 'id' ? 'id' : 'fil');
      if (locale === 'id') {
        return `${index + 1}. ${hero.name} (${lane}, ${hero.role}, Tier ${hero.tier}) - win rate ${trendRate(hero.winRate)}, pick ${trendRate(hero.pickRate)}, ban ${trendRate(hero.banRate)}, perubahan 7 hari ${trendDelta(hero.delta7d.winRate)}.`;
      }
      return `${index + 1}. ${hero.name} (${lane}, ${hero.role}, Tier ${hero.tier}) - win rate ${trendRate(hero.winRate)}, pick ${trendRate(hero.pickRate)}, ban ${trendRate(hero.banRate)}, 7-day change ${trendDelta(hero.delta7d.winRate)}.`;
    })
    .join('\n');
}

function topNames(items: MetaTrendHero[]) {
  return items.slice(0, 3).map((hero) => hero.name).join(', ');
}

function trendReason(hero: MetaTrendHero, locale: LocalLearnLocale) {
  const delta = hero.delta7d.winRate ?? 0;
  const pick = hero.pickRate ?? 0;
  const win = hero.winRate ?? 0;

  if (locale === 'id') {
    if (delta >= 1) {
      return `${hero.name} sedang naik tajam minggu ini (${trendDelta(delta)}). Cek ulang build, lane matchup, dan tempo teamfight sebelum dipakai di ranked.`;
    }
    if (delta <= -1) {
      return `${hero.name} sedang turun minggu ini (${trendDelta(delta)}). Ini biasanya tanda build lama, matchup populer, atau draft saat ini kurang cocok.`;
    }
    if (pick < 2 && win >= 51) {
      return `${hero.name} punya pick rate rendah tetapi win rate masih kuat, jadi cocok diuji sebagai pilihan spesialis atau sleeper pick.`;
    }
    return `${hero.name} relatif stabil. Nilainya tetap perlu dibaca bersama pick rate dan ban rate, bukan dari win rate saja.`;
  }

  if (delta >= 1) {
    return `Umakyat nang mabilis si ${hero.name} ngayong linggo (${trendDelta(delta)}). Tingnan muna ang build, lane matchup, at teamfight timing bago gamitin sa ranked.`;
  }
  if (delta <= -1) {
    return `Bumababa si ${hero.name} ngayong linggo (${trendDelta(delta)}). Madalas senyales ito na hindi na bagay ang lumang build, common counters, o current draft environment.`;
  }
  if (pick < 2 && win >= 51) {
    return `Mababa ang pick rate ni ${hero.name} pero malakas pa rin ang win rate, kaya puwede siyang sleeper pick para sa role specialists.`;
  }
  return `Stable ang data ni ${hero.name}. Basahin ito kasama ng pick rate at ban rate, hindi win rate lang.`;
}

function laneSummary(locale: LocalLearnLocale) {
  return metaTrends.laneLeaders
    .map((group) => {
      const leader = group.leaders[0];
      if (!leader) return null;
      const lane = laneLabel(group.lane, locale === 'id' ? 'id' : 'fil');
      if (locale === 'id') {
        return `${lane}: ${leader.name} memimpin dengan win rate ${trendRate(leader.winRate)} dan pick rate ${trendRate(leader.pickRate)}.`;
      }
      return `${lane}: nangunguna si ${leader.name} sa win rate ${trendRate(leader.winRate)} at pick rate ${trendRate(leader.pickRate)}.`;
    })
    .filter(Boolean)
    .join('\n');
}

const baseArticlesId: LearnArticle[] = [
  {
    slug: 'strongest-rank-climb-comps',
    title: 'Komposisi Ranked yang Paling Aman untuk Climb',
    badge: 'META',
    category: 'Team Comps',
    description:
      'Cara menyusun draft Honor of Kings Global dengan tank, roam, carry, jungler, dan mid yang punya tugas jelas.',
    sections: [
      {
        heading: 'Jawaban singkat',
        body:
          'Draft yang stabil biasanya punya satu frontline, satu roam dengan kontrol, satu sumber damage scaling, satu jungler tempo, dan satu mid yang bisa membersihkan wave. Jangan memilih lima hero favorit tanpa rencana damage dan engage.',
      },
      {
        heading: 'Cara membaca komposisi',
        body:
          'Jika marksman tim adalah win condition, support dan tank harus melindungi ruang tembaknya. Jika jungler adalah carry utama, lane lain perlu menjaga wave agar objektif tidak hilang. Komposisi yang bagus bukan selalu berisi hero terkuat, tetapi hero yang saling menutup kelemahan.',
      },
      {
        heading: 'Langkah berikutnya',
        body:
          'Buka halaman hero untuk melihat build inti, lalu cek counter page sebelum lock. Jika dua role sudah mengambil damage rendah, pick berikutnya sebaiknya menambah burst atau DPS, bukan menambah tank lagi.',
      },
    ],
  },
  {
    slug: 'best-jungle-heroes',
    title: 'Hero Jungle Terbaik untuk Ranked Minggu Ini',
    badge: 'JUNGLE',
    category: 'Jungle',
    description:
      'Panduan memilih jungler berdasarkan tempo clear, gank level 4, dan statistik win/pick/ban server global.',
    sections: [
      {
        heading: 'Prioritas jungle',
        body:
          'Jungler yang bagus bukan hanya cepat farming. Ia harus bisa mengamankan Tyrant, membaca lane priority, dan tidak memaksa invade tanpa bantuan lane. Pilih hero yang sesuai dengan kemampuan rotasi tim.',
      },
      {
        heading: 'Hero yang sering muncul',
        body: getMostPickedHeroes(6)
          .filter((hero) => hero.lane === 'Jungling')
          .map((hero) => `${hero.name} - ${statLine(hero)}`)
          .join('\n') || 'Cek halaman Trends untuk daftar jungle terbaru.',
      },
      {
        heading: 'Kesalahan umum',
        body:
          'Jangan contest buff musuh jika mid dan side lane sedang kalah wave. Lebih aman trade camp, ambil vision, lalu paksa objektif saat lane sudah crash.',
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: 'Hero Solo Queue yang Bisa Carry Tanpa Tim Sempurna',
    badge: 'SOLO',
    category: 'Laning',
    description:
      'Pilihan hero yang tetap berguna saat komunikasi tim minim dan draft tidak selalu ideal.',
    sections: [
      {
        heading: 'Apa yang dicari di solo queue',
        body:
          'Solo queue butuh hero yang bisa wave clear, bertahan dari tekanan, dan tetap punya dampak saat teamfight kacau. Hero yang terlalu bergantung pada setup teman biasanya lebih sulit dipakai untuk climb sendiri.',
      },
      {
        heading: 'Aturan praktis',
        body:
          'Mainkan pool kecil. Dua atau tiga hero di role utama lebih baik daripada mencoba semua hero meta. Cek win rate, pick rate, dan counter sebelum masuk ranked.',
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: 'Cara Melawan Assassin di Honor of Kings Global',
    badge: 'COUNTER',
    category: 'Counter',
    description:
      'Cara membaca timing assassin, memilih spell, dan menyiapkan posisi agar carry tidak langsung hilang.',
    sections: [
      {
        heading: 'Masalah utama',
        body:
          'Assassin menang saat carry berjalan sendiri, wave tidak dijaga, atau support memakai skill kontrol terlalu awal. Melawan assassin berarti menjaga jarak, vision, dan cooldown defensif.',
      },
      {
        heading: 'Cara counter',
        body:
          'Pilih hero dengan crowd control, simpan spell defensif untuk burst pertama, dan jangan memulai objektif saat posisi assassin tidak terlihat. Jika assassin gagal masuk pertama kali, biasanya ia kehilangan tempo fight.',
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: 'Cara Mengalahkan Draft Tebal dan Tanky',
    badge: 'COUNTER',
    category: 'Counter',
    description:
      'Panduan item, target priority, dan macro saat musuh punya frontline kuat.',
    sections: [
      {
        heading: 'Jangan fight sesuai keinginan tank',
        body:
          'Tank ingin memaksa fight sempit dan menyerap cooldown. Jawab dengan kite, split wave, dan damage berkelanjutan. Jangan buang burst ke tank jika carry musuh masih bebas menyerang.',
      },
      {
        heading: 'Yang harus dicek',
        body:
          'Lihat item penetration, anti-heal jika perlu, dan siapa yang bisa menjaga jarak. Jika draft sendiri tidak punya damage scaling, tank musuh akan terasa jauh lebih kuat setelah mid game.',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: 'Cara Naik Rank Lebih Stabil',
    badge: 'GUIDE',
    category: 'Beginner',
    description:
      'Rutinitas sederhana sebelum ranked: cek hero, build, counter, dan tren agar tidak bermain berdasarkan ingatan lama.',
    sections: [
      {
        heading: 'Checklist sebelum queue',
        body:
          'Cek apakah hero utama masih punya win rate stabil, apakah build sudah berubah, dan siapa counter paling umum. Jika dua game kalah berturut-turut, berhenti sebentar dan review replay atau build.',
      },
      {
        heading: 'Fokus utama',
        body:
          'Naik rank lebih sering datang dari keputusan kecil yang konsisten: wave sebelum objektif, tidak mati sebelum Tyrant, dan tidak first-pick hero yang mudah di-counter.',
      },
    ],
  },
  {
    slug: 'li-xin-build-and-counters',
    title: 'Li Xin: Warrior Paling Ditakuti di Ranked — Build, Arcana, dan Cara Counter',
    badge: 'META',
    category: 'Hero Guides',
    relatedHeroSlug: 'li-xin',
    description:
      'Li Xin punya win rate 53,6% dan ban rate tertinggi di antara warrior. Berikut build terkini, arcana, dan hero yang bisa mematikan dia — berdasarkan data ranked live.',
    sections: [
      {
        heading: 'Kenapa Li Xin mendominasi ranked',
        body:
          'Li Xin punya win rate 53,64% dengan ban rate 2,84% — warrior paling ditakuti di meta saat ini. Kit dual-form (swordsman untuk burst, spearman untuk DPS berkelanjutan) membuatnya adaptif di tengah fight, dan gap-closer-nya membuat akses ke backline sangat mudah.',
      },
      {
        heading: 'Build terbaik saat ini (Juli 2026)',
        body:
          'Item inti: Ominous Premonition → Demonsbane → Tempest → Sage\'s Sanctuary → Destiny → Boots of Resistance. Build ini menyeimbangkan burst penetration dan survivability. Ganti Destiny dengan item defense jika musuh punya 2+ burst mage.',
      },
      {
        heading: 'Cara counter Li Xin',
        body:
          'Hero yang efektif: Cai Yan (heal denial + CC), Da Qiao (silence memutus combo), Guiguzi (CC berkelanjutan mencegah form-switch). Simpan CC untuk dash spearman-nya, jangan 1v1 di gold setara, dan beli Dominance jika dia pakai arcana Reaver.',
      },
    ],
  },
];

const baseArticlesFil: LearnArticle[] = [
  {
    slug: 'strongest-rank-climb-comps',
    title: 'Matatag na Ranked Comps para Umakyat',
    badge: 'META',
    category: 'Team Comps',
    description:
      'Paano bumuo ng Honor of Kings Global draft na may malinaw na frontline, roam, carry, jungler, at mid plan.',
    sections: [
      {
        heading: 'Maikling sagot',
        body:
          'Mas stable ang draft kapag may frontline, roam na may control, scaling damage, tempo jungler, at mid na kayang mag-clear ng wave. Huwag pumili ng limang comfort heroes kung walang malinaw na engage at damage plan.',
      },
      {
        heading: 'Paano basahin ang comp',
        body:
          'Kung marksman ang win condition, kailangan ng support at tank na magbigay ng space. Kung jungler ang carry, dapat hawak ng lanes ang wave para hindi mawala ang objective. Hindi sapat na malakas ang bawat hero; kailangan nagtutulungan ang kits.',
      },
      {
        heading: 'Susunod na hakbang',
        body:
          'Buksan ang hero page para sa core build, tapos tingnan ang counter page bago mag-lock. Kung kulang na ang damage ng draft, huwag dagdagan ng isa pang tank.',
      },
    ],
  },
  {
    slug: 'best-jungle-heroes',
    title: 'Best Jungle Heroes para sa Ranked Ngayong Linggo',
    badge: 'JUNGLE',
    category: 'Jungle',
    description:
      'Pagpili ng jungler gamit ang clear speed, level 4 gank timing, at global server win/pick/ban stats.',
    sections: [
      {
        heading: 'Jungle priority',
        body:
          'Hindi lang bilis ng farming ang sukatan ng magandang jungler. Kailangan niyang kumuha ng Tyrant, magbasa ng lane priority, at umiwas sa invade kapag walang tulong ang lanes.',
      },
      {
        heading: 'Mga madalas makita',
        body: getMostPickedHeroes(6)
          .filter((hero) => hero.lane === 'Jungling')
          .map((hero) => `${hero.name} - ${statLine(hero)}`)
          .join('\n') || 'Tingnan ang Trends page para sa bagong jungle list.',
      },
      {
        heading: 'Karaniwang pagkakamali',
        body:
          'Huwag makipag-contest sa enemy buff kung talo ang mid at side lane sa wave. Mas mabuti ang camp trade, vision, at objective timing pagkatapos mag-crash ang lane.',
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: 'Solo Queue Heroes na Kayang Magdala Kahit Hindi Perfect ang Team',
    badge: 'SOLO',
    category: 'Laning',
    description:
      'Mga hero na may sariling wave clear, safety, at impact kapag magulo ang ranked draft.',
    sections: [
      {
        heading: 'Ano ang mahalaga sa solo queue',
        body:
          'Kailangan ng solo queue hero na kayang mag-clear, mabuhay sa pressure, at may silbi kahit hindi coordinated ang team. Mas mahirap umakyat gamit ang hero na sobrang kailangan ng perfect setup.',
      },
      {
        heading: 'Praktikal na rule',
        body:
          'Maliit na hero pool muna. Mas maganda ang dalawa o tatlong mastered heroes sa main role kaysa habulin lahat ng meta picks. Suriin ang win rate, pick rate, at counters bago mag-ranked.',
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: 'Paano Labanan ang Assassins sa Honor of Kings Global',
    badge: 'COUNTER',
    category: 'Counter',
    description:
      'Basahin ang assassin timing, defensive spell, at positioning para hindi agad mawala ang carry.',
    sections: [
      {
        heading: 'Pangunahing problema',
        body:
          'Nanalo ang assassin kapag mag-isa ang carry, walang vision, o naubos agad ang crowd control ng support. Ang sagot ay distance, vision, at pagtago ng defensive cooldown para sa unang burst.',
      },
      {
        heading: 'Counter plan',
        body:
          'Pumili ng hero na may crowd control, huwag magsimula ng objective kapag hindi kita ang assassin, at parusahan agad kapag nabigo ang unang engage niya.',
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: 'Paano Talunin ang Makapal na Tank Draft',
    badge: 'COUNTER',
    category: 'Counter',
    description:
      'Item choice, target priority, at macro plan kapag malakas ang frontline ng kalaban.',
    sections: [
      {
        heading: 'Huwag lumaban sa gusto ng tank',
        body:
          'Gusto ng tank ang dikit na fight at pagkuha ng cooldowns. Sagutin ito gamit ang kiting, side wave pressure, at sustained damage. Huwag ubusin ang burst sa tank kung libre pa ang enemy carry.',
      },
      {
        heading: 'Ano ang dapat tingnan',
        body:
          'Suriin ang penetration item, anti-heal kapag kailangan, at kung sino ang kayang tumira habang umaatras. Kung walang scaling damage ang draft mo, mas lalakas ang tank sa mid game.',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: 'Paano Umakyat sa Rank nang Mas Stable',
    badge: 'GUIDE',
    category: 'Beginner',
    description:
      'Simpleng pre-ranked routine: hero stats, build, counters, at trend check bago maglaro.',
    sections: [
      {
        heading: 'Checklist bago queue',
        body:
          'Tingnan kung stable pa ang win rate ng main hero, kung nagbago ang build, at sino ang common counters. Kapag dalawang talo sunod-sunod, huminto muna at balikan ang build o replay.',
      },
      {
        heading: 'Pinakamahalaga',
        body:
          'Mas madalas galing sa maliliit na tamang desisyon ang rank climb: wave bago objective, huwag mamatay bago Tyrant, at huwag first-pick ng hero na madaling i-counter.',
      },
    ],
  },
  {
    slug: 'li-xin-build-and-counters',
    title: 'Li Xin: Ang Pinakatakot na Warrior sa Ranked — Build, Arcana, at Paano I-counter',
    badge: 'META',
    category: 'Hero Guides',
    relatedHeroSlug: 'li-xin',
    description:
      'Si Li Xin ay may 53.6% win rate at pinakamataas na ban rate sa lahat ng warrior. Narito ang current build, arcana, at mga hero na pumapatay sa kanya — base sa live ranked data.',
    sections: [
      {
        heading: 'Bakit dominado ni Li Xin ang ranked',
        body:
          'Si Li Xin ay may 53.64% win rate at 2.84% ban rate — ang pinakatakot na warrior sa current meta. Ang dual-form kit niya (swordsman para burst, spearman para sustained DPS) ay nagpapahintulot sa kanya na mag-adapt sa gitna ng laban, at ang gap-closer niya ay ginagawang madali ang access sa backline.',
      },
      {
        heading: 'Current best build (Hulyo 2026)',
        body:
          'Core items: Ominous Premonition → Demonsbane → Tempest → Sage\'s Sanctuary → Destiny → Boots of Resistance. Palitan ang Destiny ng defense item kung ang kalaban ay may 2+ burst mage.',
      },
      {
        heading: 'Paano i-counter si Li Xin',
        body:
          'Mga effective na hero: Cai Yan (heal denial + CC), Da Qiao (silence na pumuputol ng combo), Guiguzi (sustained CC na pumipigil ng form-switch). Itago ang CC para sa spearman dash niya, huwag 1v1 sa equal gold, at bumili ng Dominance kung Reaver arcana ang gamit niya.',
      },
    ],
  },
];

function trendArticles(locale: LocalLearnLocale): LearnArticle[] {
  if (locale === 'id') {
    return [
      {
        slug: 'highest-win-rate-heroes-this-week',
        title: `Hero Win Rate Tertinggi Minggu Ini (${metaTrends.latestDate})`,
        badge: 'DATA',
        category: 'Meta & Data',
        description: 'Top 10 hero dengan sinyal win rate paling kuat, dibaca bersama pick rate dan ban rate.',
        sections: [
          { heading: 'Jawaban cepat', body: `${topNames(metaTrends.topWinRate)} adalah sinyal terkuat minggu ini.` },
          { heading: 'Top 10', body: listTrendHeroes(metaTrends.topWinRate, locale) },
          { heading: 'Alasan yang perlu dicek', body: metaTrends.topWinRate.slice(0, 5).map((hero) => `- ${trendReason(hero, locale)}`).join('\n') },
        ],
      },
      {
        slug: 'lowest-win-rate-heroes-this-week',
        title: `Hero Win Rate Terendah Minggu Ini (${metaTrends.latestDate})`,
        badge: 'RISK',
        category: 'Meta & Data',
        description: 'Daftar hero yang sedang paling berisiko dipakai tanpa build dan matchup yang rapi.',
        sections: [
          { heading: 'Daftar risiko', body: listTrendHeroes(metaTrends.lowestWinRate, locale) },
          { heading: 'Cara membaca', body: 'Win rate rendah tidak berarti hero tidak bisa dimainkan. Ini tanda untuk memeriksa build, matchup, dan apakah hero hanya cocok di draft tertentu.' },
        ],
      },
      {
        slug: 'best-heroes-by-lane-this-week',
        title: `Hero Terbaik per Lane Minggu Ini (${metaTrends.latestDate})`,
        badge: 'LANE',
        category: 'Meta & Data',
        description: 'Juara win rate untuk Clash, Jungle, Mid, Farm, dan Roam.',
        sections: [
          { heading: 'Ringkasan lane', body: laneSummary(locale) },
          { heading: 'Kenapa per-lane lebih berguna', body: 'Pemain biasanya memilih dari role utama, bukan dari seluruh hero. Karena itu ranking lane lebih praktis untuk ranked harian.' },
        ],
      },
      {
        slug: 'most-picked-heroes-this-week',
        title: `Hero Paling Sering Dipilih Minggu Ini (${metaTrends.latestDate})`,
        badge: 'POPULAR',
        category: 'Meta & Data',
        description: 'Hero yang paling sering muncul di ranked global minggu ini.',
        sections: [
          { heading: 'Popularitas saat ini', body: listTrendHeroes(metaTrends.mostPicked, locale) },
          { heading: 'Kenapa pick rate penting', body: 'Pick rate menunjukkan hero yang benar-benar akan sering kamu temui. Ini penting untuk menyiapkan counter dan build.' },
        ],
      },
      {
        slug: 'most-underrated-heroes-this-week',
        title: `Hero Paling Diremehkan Minggu Ini (${metaTrends.latestDate})`,
        badge: 'SLEEPER',
        category: 'Meta & Data',
        description: 'Hero pick rate rendah tetapi performanya layak diuji.',
        sections: [
          { heading: 'Sleeper picks', body: listTrendHeroes(metaTrends.sleeperPicks, locale) },
          { heading: 'Cara mengetes', body: 'Mulai dari match risiko rendah, cek core build, lalu lihat counter page. Jangan langsung spam ranked tanpa memahami kelemahannya.' },
        ],
      },
      {
        slug: 'most-banned-heroes-this-week',
        title: `Hero Paling Sering Di-ban Minggu Ini (${metaTrends.latestDate})`,
        badge: 'BAN',
        category: 'Counter',
        description: 'Hero dengan tekanan draft tertinggi minggu ini.',
        sections: [
          { heading: 'Ban pressure', body: listTrendHeroes(metaTrends.mostBanned, locale) },
          { heading: 'Kapan ban', body: 'Ban jika draft tim tidak punya kontrol, peel, atau damage untuk menghukum engage pertama hero tersebut.' },
        ],
      },
    ];
  }

  return [
    {
      slug: 'highest-win-rate-heroes-this-week',
      title: `Highest Win Rate Heroes Ngayong Linggo (${metaTrends.latestDate})`,
      badge: 'DATA',
      category: 'Meta & Data',
      description: 'Top 10 heroes na may pinakamalakas na win-rate signal, binabasa kasama ng pick at ban rate.',
      sections: [
        { heading: 'Mabilis na sagot', body: `${topNames(metaTrends.topWinRate)} ang pinakamalakas na signal ngayong linggo.` },
        { heading: 'Top 10', body: listTrendHeroes(metaTrends.topWinRate, locale) },
        { heading: 'Bakit sila gumagalaw', body: metaTrends.topWinRate.slice(0, 5).map((hero) => `- ${trendReason(hero, locale)}`).join('\n') },
      ],
    },
    {
      slug: 'lowest-win-rate-heroes-this-week',
      title: `Lowest Win Rate Heroes Ngayong Linggo (${metaTrends.latestDate})`,
      badge: 'RISK',
      category: 'Meta & Data',
      description: 'Mga hero na delikado gamitin nang walang malinaw na build at matchup plan.',
      sections: [
        { heading: 'Risk list', body: listTrendHeroes(metaTrends.lowestWinRate, locale) },
        { heading: 'Paano basahin', body: 'Hindi ibig sabihin ng mababang win rate ay bawal na ang hero. Senyales ito para suriin ang build, matchup, at draft fit.' },
      ],
    },
    {
      slug: 'best-heroes-by-lane-this-week',
      title: `Best Heroes per Lane Ngayong Linggo (${metaTrends.latestDate})`,
      badge: 'LANE',
      category: 'Meta & Data',
      description: 'Lane winners para sa Clash, Jungle, Mid, Farm, at Roam.',
      sections: [
        { heading: 'Lane summary', body: laneSummary(locale) },
        { heading: 'Bakit mas useful ang lane view', body: 'Karamihan ng players ay pumipili mula sa main role nila, hindi sa buong hero pool. Mas praktikal ang lane ranking para sa ranked.' },
      ],
    },
    {
      slug: 'most-picked-heroes-this-week',
      title: `Most Picked Heroes Ngayong Linggo (${metaTrends.latestDate})`,
      badge: 'POPULAR',
      category: 'Meta & Data',
      description: 'Heroes na pinakamadalas makita sa global ranked ngayong linggo.',
      sections: [
        { heading: 'Popularity board', body: listTrendHeroes(metaTrends.mostPicked, locale) },
        { heading: 'Bakit mahalaga ang pick rate', body: 'Pick rate ang nagsasabi kung sino ang madalas mong makakalaban. Dito nagsisimula ang counter prep at build testing.' },
      ],
    },
    {
      slug: 'most-underrated-heroes-this-week',
      title: `Most Underrated Heroes Ngayong Linggo (${metaTrends.latestDate})`,
      badge: 'SLEEPER',
      category: 'Meta & Data',
      description: 'Low-pick heroes na puwedeng subukan dahil maganda ang current performance.',
      sections: [
        { heading: 'Sleeper picks', body: listTrendHeroes(metaTrends.sleeperPicks, locale) },
        { heading: 'Paano i-test', body: 'Subukan muna sa low-risk matches, tingnan ang core build, at basahin ang counter page bago gamitin sa high-pressure ranked.' },
      ],
    },
    {
      slug: 'most-banned-heroes-this-week',
      title: `Most Banned Heroes Ngayong Linggo (${metaTrends.latestDate})`,
      badge: 'BAN',
      category: 'Counter',
      description: 'Heroes na may pinakamataas na draft pressure ngayong linggo.',
      sections: [
        { heading: 'Ban pressure', body: listTrendHeroes(metaTrends.mostBanned, locale) },
        { heading: 'Kailan i-ban', body: 'I-ban kapag walang control, peel, o damage ang draft para parusahan ang unang engage ng hero na iyon.' },
      ],
    },
  ];
}

function heroGuideArticles(hero: Hero, locale: LocalLearnLocale): LearnArticle[] {
  const build = join(hero.build.map((item) => item.name).slice(0, 6), locale);
  const arcana = join(hero.arcana.slice(0, 3), locale);
  const spells = join(hero.spells.slice(0, 2), locale);
  const counters = join(hero.counteredBy.filter((name) => name !== 'Data unavailable').slice(0, 4), locale);
  const strongInto = join(hero.counters.filter((name) => name !== 'Data unavailable').slice(0, 4), locale);
  const lane = hero.lane || hero.role;

  if (locale === 'id') {
    return [
      {
        slug: `${hero.slug}-guide`,
        title: `Panduan ${hero.name}: Build, Arcana, dan Cara Main`,
        badge: 'GUIDE',
        category: 'Hero Guides',
        relatedHeroSlug: hero.slug,
        description: `Panduan ${hero.name} untuk ${lane}: core build, arcana, spell, counter, dan cara membaca draft ranked.`,
        sections: [
          { heading: `${hero.name} dalam meta`, body: `${hero.name} adalah hero ${hero.role} untuk ${lane}. Data saat ini: ${statLine(hero)}. Gunakan angka ini sebagai konteks, bukan satu-satunya alasan pick.` },
          { heading: 'Build dan arcana', body: `Core build: ${build}.\nArcana: ${arcana}.\nBattle spell: ${spells}.\nNama item dan arcana mengikuti client global agar mudah dicari di game.` },
          { heading: 'Cara main praktis', body: `${hero.name} perlu dimainkan sesuai timing role. Amankan wave lebih dulu, jangan memaksa fight saat core item belum jadi, dan cek posisi counter sebelum masuk objektif.` },
          { heading: 'Kapan pick dan kapan hindari', body: `Lebih nyaman saat melawan ${strongInto}. Perlu hati-hati jika lawan punya ${counters}. Jika draft tim tidak bisa menutup kelemahan ini, pilih hero lain atau ubah build defensif.` },
        ],
      },
      {
        slug: `how-to-counter-${hero.slug}`,
        title: `Cara Counter ${hero.name}`,
        badge: 'COUNTER',
        category: 'Counter',
        relatedHeroSlug: hero.slug,
        description: `Cara melawan ${hero.name}: pilihan hero, timing skill, dan keputusan draft yang perlu diperhatikan.`,
        sections: [
          { heading: 'Counter utama', body: `Hero yang perlu dipertimbangkan: ${counters}. Jangan hanya melihat nama counter; cek juga apakah role dan lane timmu bisa mendukung pilihan itu.` },
          { heading: 'Rencana fight', body: `Lawan ${hero.name} dengan menjaga jarak dari timing power spike-nya. Paksa ia memakai skill penting lebih dulu, lalu masuk setelah cooldown utama habis.` },
          { heading: 'Kesalahan yang harus dihindari', body: `Jangan memberi ${hero.name} fight bersih di area sempit jika timmu belum siap. Jika ia unggul tempo, trade objektif atau wave dulu daripada memaksa 5v5.` },
        ],
      },
      {
        slug: `${hero.slug}-weaknesses`,
        title: `Kelemahan ${hero.name} yang Bisa Dimanfaatkan`,
        badge: 'WEAKNESS',
        category: 'Counter',
        relatedHeroSlug: hero.slug,
        description: `Kelemahan ${hero.name} dari sisi draft, lane, item timing, dan teamfight.`,
        sections: [
          { heading: 'Kelemahan draft', body: `${hero.name} lebih sulit dimainkan jika lawan punya kontrol, burst, atau poke yang memutus timing masuk. Counter yang sering relevan: ${counters}.` },
          { heading: 'Kelemahan tempo', body: `Jika ${hero.name} belum punya item inti, jangan beri fight gratis. Tekan wave, ambil vision, dan paksa ia memilih antara farming atau ikut fight terlalu cepat.` },
          { heading: 'Cara menghukum', body: `Gunakan stun, slow, atau zoning sebelum objektif. Jika ${hero.name} harus masuk tanpa backup, fokuskan damage setelah skill mobilitas atau defensifnya keluar.` },
        ],
      },
    ];
  }

  return [
    {
      slug: `${hero.slug}-guide`,
      title: `${hero.name} Guide: Build, Arcana, at Paano Laruin`,
      badge: 'GUIDE',
      category: 'Hero Guides',
      relatedHeroSlug: hero.slug,
      description: `Gabay para kay ${hero.name} sa ${lane}: core build, arcana, spell, counters, at ranked draft notes.`,
      sections: [
        { heading: `${hero.name} sa meta`, body: `${hero.name} ay ${hero.role} hero para sa ${lane}. Current data: ${statLine(hero)}. Gamitin ang stats bilang context, hindi bilang automatic lock.` },
        { heading: 'Build at arcana', body: `Core build: ${build}.\nArcana: ${arcana}.\nBattle spell: ${spells}.\nPinapanatili ang item at arcana names mula sa global client para madali silang hanapin sa laro.` },
        { heading: 'Praktikal na playstyle', body: `Laruin si ${hero.name} ayon sa role timing. Ayusin muna ang wave, huwag pilitin ang fight bago core item, at alamin kung nasaan ang counter bago lumapit sa objective.` },
        { heading: 'Kailan pick at kailan umiwas', body: `Mas komportable siya laban sa ${strongInto}. Mag-ingat kapag may ${counters} ang kalaban. Kung hindi matatakpan ng draft ang kahinaang ito, mag-adjust ng build o pumili ng ibang hero.` },
      ],
    },
    {
      slug: `how-to-counter-${hero.slug}`,
      title: `Paano I-counter si ${hero.name}`,
      badge: 'COUNTER',
      category: 'Counter',
      relatedHeroSlug: hero.slug,
      description: `Counter plan laban kay ${hero.name}: hero choices, timing, at draft decisions.`,
      sections: [
        { heading: 'Main counters', body: `Mga dapat tingnan: ${counters}. Huwag pangalan lang ang tingnan; siguraduhin na kaya ng lane at role setup ng team ang counter pick.` },
        { heading: 'Fight plan', body: `Labanan si ${hero.name} sa pamamagitan ng pag-iwas sa power spike timing niya. Pilitin muna niyang gamitin ang important skill, tapos pumasok kapag wala na ang key cooldown.` },
        { heading: 'Iwasang pagkakamali', body: `Huwag bigyan si ${hero.name} ng malinis na fight sa masikip na area. Kapag lamang siya sa tempo, mag-trade muna ng wave o objective kaysa pilitin ang 5v5.` },
      ],
    },
    {
      slug: `${hero.slug}-weaknesses`,
      title: `Mga Kahinaan ni ${hero.name}`,
      badge: 'WEAKNESS',
      category: 'Counter',
      relatedHeroSlug: hero.slug,
      description: `Draft, lane, item timing, at teamfight weaknesses ni ${hero.name}.`,
      sections: [
        { heading: 'Draft weakness', body: `Mas mahirap gamitin si ${hero.name} kapag may control, burst, o poke ang kalaban na sumisira sa timing niya. Common relevant counters: ${counters}.` },
        { heading: 'Tempo weakness', body: `Kapag wala pa ang core item ni ${hero.name}, huwag magbigay ng libreng fight. I-pressure ang wave, kumuha ng vision, at pilitin siyang pumili sa farming o maagang fight.` },
        { heading: 'Paano parusahan', body: `Gumamit ng stun, slow, o zoning bago objective. Kapag pumasok si ${hero.name} nang walang backup, focus damage pagkatapos lumabas ang mobility o defensive skill niya.` },
      ],
    },
  ];
}

export function getLearnArticlesId(): LearnArticle[] {
  return [...baseArticlesId, ...trendArticles('id'), ...getFullHeroes().flatMap((hero) => heroGuideArticles(hero, 'id'))];
}

export function getLearnArticlesFil(): LearnArticle[] {
  return [...baseArticlesFil, ...trendArticles('fil'), ...getFullHeroes().flatMap((hero) => heroGuideArticles(hero, 'fil'))];
}
