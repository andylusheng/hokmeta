/**
 * patch-locales-phase2b.js
 * Adds the remaining 38 missing keys for FIL and ID.
 * Run: node scripts/patch-locales-phase2b.js
 */
const fs = require('fs');
const path = require('path');

function deepMerge(target, source) {
  for (const [key, val] of Object.entries(source)) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], val);
    } else {
      target[key] = val;
    }
  }
  return target;
}

const filPatch = {
  faq: {
    highRankBan: "Ban rate {ban} — asahan na aalisin si {name} sa tryhard lobbies; maghanda ng backup sa parehong role.",
    highRankPick: "Pick rate {pick} — madalas makita sa ranked; aralin ang matchup kahit hindi mo main si {name}.",
    highRankLowPick: "Mababang pick rate {pick} — niche sa high rank; surprise value kung ma-perfect mo ang kit.",
    highRankAboveAvg: "Ipinapakita ng Camp data ang above-average win rate — i-prioritize kapag hindi hard-countered sa draft.",
    highRankBelowAvg: "Mas mababa sa 49% global WR — karaniwang iniiwasan ng high-rank players maliban kung binabawi ang team comp.",
    peerWrWin: "Si {name} ay may +{diff}% WR vs {peer} sa Camp data.",
    peerWrLose: "Si {peer} ay nananalo ng {diff}% mas madalas globally.",
    peerCompare: "{name} vs {peer} ({peerRole}, Tier {peerTier}): si {peer} ay {peerPick} pick / {peerWr} WR. {wrNote} Piliin si {name} kapag kailangan mo ng {lane} identity; piliin si {peer} para sa {peerLane} comfort.",
    q: {
      goodSeason: "Maganda ba si {name} sa current meta?",
      bestBuild: "Ano ang pinakamagaling na {name} build?",
      counter: "Paano mag-counter kay {name}?",
      strongInto: "Sino ang na-co-counter ni {name}?",
      highRank: "Maganda ba si {name} sa high rank / Diamond+?",
      lane: "Anong lane ang dapat laruin ni {name}?",
      arcana: "Pinakamagaling na arcana at spells para kay {name}?",
      vsPeer: "{name} o {peer} — alin ang mas magaling?",
      ban: "Dapat ko bang i-ban si {name}?"
    },
    a: {
      goodSeason: "Si {name} ay Tier {tier} {role} na may {wr} win rate, {pick} pick rate, at {ban} ban rate sa Honor of Kings Global (Camp HOK, {date}). {tierNote}",
      bestBuild: "Core item path: {build}. Gumamit ng {arcana} arcana kasama ang {spells}. Lumipat sa alternate build presets sa page na ito para sa jungle, clash, o late-game setups.",
      counter: "Piliin si {weak} laban kay {name}. I-deny ang {lane} resources nang maaga at pilitin ang fights bago makumpleto ni {name} ang core items. Nahihirapan si {name} kapag kaya ng enemy na {struggle} siya.",
      strongInto: "Si {name} ay malakas laban sa {into} ayon sa HoKStats matchup data at role matchups sa global server. I-draft si {name} kapag ang enemy ay umaasa sa mga heroes na ito sa {lane} lane.",
      lane: "Si {name} ay tagged {lane} sa Camp export ({roles}). {tip}",
      arcana: "Recommended: {arcana} arcana. Battle spell: {spells}. I-adjust ang Purify/Execute batay sa enemy dive at jungle need.",
      banYes: "Oo sa tryhard queues — {ban} ban rate. I-deny kapag nag-first-pick ang enemy ng {role}.",
      banOptional: "Optional ban kapag nag-sspam ang enemy ng {role}; {pick} pick rate pero {ban} lang ang ban rate.",
      banLow: "Mababang priority ban ({ban}). I-focus ang bans sa mas mataas na tier na {role} picks maliban kung nag-ta-target ng one-trick."
    }
  },
  bestHeroes: {
    title: "Pinakamagagaling na Heroes ayon sa Role",
    subtitle: "Mabilis na ranked picks bawat role — naka-sort ayon sa tier, pick rate, at ban pressure (hindi raw win rate lang). Para sa buong S+ / S / A / B bands gamitin ang",
    tierListLink: "Tier List",
    midLink: "; para sa lahat ng hero gamitin ang",
    allHeroesLink: "Lahat ng Heroes",
    disclaimer: "International Camp data — maaaring mas mababa ang rank ng heroes kung mahina ang global win rate. Maaaring iba ang CN meta favorites sa mga numerong ito.",
    bestRole: "Pinakamagaling na {role}",
    viewAllRole: "Tingnan lahat ng {role} →",
    roleTitle: "Pinakamagagaling na {role} Heroes",
    roleSubtitle: "{count} {role} heroes · meta score (tier + pick + ban) ·",
    tierBands: "Tier bands"
  },
  learn: {
    categories: {
      "Laning": "Laning & Solo"
    }
  }
};

const idPatch = {
  faq: {
    highRankBan: "Ban rate {ban} — perkirakan {name} akan dihapus di lobby tryhard; siapkan backup di role yang sama.",
    highRankPick: "Pick rate {pick} — sering terlihat di ranked; pelajari matchup meskipun kamu tidak main {name}.",
    highRankLowPick: "Pick rate rendah {pick} — niche di high rank; nilai kejutan jika kamu menyempurnakan kit-nya.",
    highRankAboveAvg: "Data Camp menunjukkan win rate di atas rata-rata — prioritaskan saat tidak di-hard-counter di draft.",
    highRankBelowAvg: "Di bawah 49% WR global — pemain high-rank sering menghindari kecuali mengkompensasi team comp.",
    peerWrWin: "{name} memiliki +{diff}% WR vs {peer} di data Camp.",
    peerWrLose: "{peer} menang {diff}% lebih sering secara global.",
    peerCompare: "{name} vs {peer} ({peerRole}, Tier {peerTier}): {peer} memiliki {peerPick} pick / {peerWr} WR. {wrNote} Pilih {name} saat butuh identitas {lane}; pilih {peer} untuk kenyamanan {peerLane}.",
    q: {
      goodSeason: "Apakah {name} bagus di meta saat ini?",
      bestBuild: "Apa build {name} terbaik?",
      counter: "Cara counter {name}?",
      strongInto: "Siapa yang di-counter {name}?",
      highRank: "Apakah {name} bagus di high rank / Diamond+?",
      lane: "Lane apa yang harus dimainkan {name}?",
      arcana: "Arcana dan spell terbaik untuk {name}?",
      vsPeer: "{name} atau {peer} — mana yang lebih baik?",
      ban: "Haruskah saya ban {name}?"
    },
    a: {
      goodSeason: "{name} adalah {role} Tier {tier} dengan {wr} win rate, {pick} pick rate, dan {ban} ban rate di Honor of Kings Global (Camp HOK, {date}). {tierNote}",
      bestBuild: "Path item core: {build}. Gunakan arcana {arcana} dengan {spells}. Beralih ke preset build alternatif di halaman ini untuk setup jungle, clash, atau late-game.",
      counter: "Pilih {weak} melawan {name}. Deny resource {lane} sejak awal dan paksa fight sebelum {name} menyelesaikan item core. {name} kesulitan saat musuh bisa {struggle} mereka.",
      strongInto: "{name} kuat melawan {into} menurut data matchup HoKStats dan matchup role di server global. Draft {name} saat musuh mengandalkan hero-hero ini di lane {lane}.",
      lane: "{name} ditandai {lane} di ekspor Camp ({roles}). {tip}",
      arcana: "Direkomendasikan: arcana {arcana}. Battle spell: {spells}. Sesuaikan Purify/Execute berdasarkan dive musuh dan kebutuhan jungle.",
      banYes: "Ya di antrean tryhard — {ban} ban rate. Deny jika musuh first-pick {role}.",
      banOptional: "Ban opsional saat musuh spam {role}; {pick} pick rate tapi hanya {ban} ban rate.",
      banLow: "Prioritas ban rendah ({ban}). Fokuskan ban pada pick {role} tier lebih tinggi kecuali menargetkan one-trick."
    }
  },
  bestHeroes: {
    title: "Hero Terbaik Berdasarkan Role",
    subtitle: "Pick ranked cepat per role — diurutkan berdasarkan tier, pick rate, dan tekanan ban (bukan hanya raw win rate). Untuk band S+ / S / A / B lengkap gunakan",
    tierListLink: "Tier List",
    midLink: "; untuk semua hero gunakan",
    allHeroesLink: "Semua Hero",
    disclaimer: "Data Camp internasional — hero bisa berperingkat lebih rendah jika win rate global lemah. Favorit meta CN bisa berbeda dari angka-angka ini.",
    bestRole: "{role} Terbaik",
    viewAllRole: "Lihat semua {role} →",
    roleTitle: "Hero {role} Terbaik",
    roleSubtitle: "{count} hero {role} · meta score (tier + pick + ban) ·",
    tierBands: "Band tier"
  },
  learn: {
    categories: {
      "Laning": "Laning & Solo"
    }
  }
};

const messagesDir = path.join(__dirname, '..', 'messages');

for (const [locale, patch] of [['fil', filPatch], ['id', idPatch]]) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  deepMerge(existing, patch);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
  console.log(`✓ ${locale}.json patched`);
}

// Verify
const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf-8'));
function flatKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) keys = keys.concat(flatKeys(v, key));
    else keys.push(key);
  }
  return keys;
}
const enKeys = flatKeys(en);
for (const locale of ['fil', 'id']) {
  const data = JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf-8'));
  const localeKeys = new Set(flatKeys(data));
  const missing = enKeys.filter((k) => !localeKeys.has(k));
  const coverage = ((enKeys.length - missing.length) / enKeys.length * 100).toFixed(1);
  console.log(`${locale}: ${coverage}% coverage (${missing.length} missing)`);
  if (missing.length) console.log('  remaining:', missing.join(', '));
}
