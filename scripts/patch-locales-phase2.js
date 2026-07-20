/**
 * patch-locales-phase2.js
 * Adds missing FIL and ID translations to reach ≥85% coverage.
 * Run: node scripts/patch-locales-phase2.js
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

// ─── Filipino (fil) translations ───────────────────────────────────────────────
const filPatch = {
  tierList: {
    title: "Honor of Kings Tier List",
    subtitle: "Lahat ng hero ranked S / A / B / C / D sa Clash, Jungle, Mid, Farm, at Roam — Camp HOK live stats.",
    roleHint: "Naka-sort ayon sa meta score sa bawat tier band",
    jumpLanes: "Pumunta sa lane"
  },
  metaBanner: {
    label: "Live meta data",
    from: "Win / pick / ban mula sa",
    updated: "Na-update"
  },
  hero: {
    wr: "WR",
    tier: "Tier",
    climbBadge: "Climb pick",
    climbLaneRank: "#{rank} sa {lane}",
    climbIntro: "Si {name} ay recommended climb pick sa patch na ito:",
    climbDataNote: "Batay sa Camp HOK tier, win/pick/ban rates — hindi garantiya sa bawat draft.",
    climbViewAll: "Tingnan lahat ng lane climb picks",
    decision: {
      coreFallback: "Tingnan ang buong build table para sa current item order.",
      counterCtaHint: "Matchup notes, strong targets, at mga hero na nagpaparusa kay {name}.",
      pick: {
        highTier: "Kailangan mo ng current high-priority {lane} pick at ang draft mo ay maaaring mag-play around sa timing nito.",
        marksman: "Kaya ng team mo na protektahan ang backline at bigyan ka ng oras para mag-scale sa item spikes.",
        mage: "Kailangan ng draft mo ng mid wave clear, objective poke, o reliable control bago ang mga fight.",
        assassin: "Walang reliable peel ang enemy carries, at ang side lanes mo ay makakatulong mag-secure ng early jungle tempo.",
        support: "Kailangan ng carry mo ng peel o engage setup, at kaya ng team mo na sumunod sa first CC window mo.",
        tank: "Kulang ang draft mo sa frontline at kailangan ng mag-start ng fights around objectives.",
        warrior: "Kailangan mo ng side-lane pressure, durable skirmishing, o flank threat sa enemy backline.",
        default: "Kailangan ng team mo ng stable {role} pick at ang enemy draft ay walang hard counters."
      },
      avoid: {
        marksman: "May maraming hard-diving assassins ang enemy o kulang ang team mo sa reliable peel.",
        mage: "Kaya ng enemy na i-dodge o i-interrupt ang key control mo, o kulang na ang team mo sa sustained damage.",
        assassin: "May strong peel ang enemy draft, tanky frontliners, at kaunting isolated carry targets.",
        support: "Hindi kaya ng team mo na sumunod sa engage, o kaya ng enemy na parusahan ang carry mo bago ka mag-stabilize.",
        tank: "Kulang ang team mo sa damage sa likod mo, o kaya ng enemy na i-kite ang mahabang front-to-back fights.",
        warrior: "Kaya ng enemy na i-kite ang side lane pressure at mag-collapse nang mas mabilis kaysa makapag-trade ang team mo.",
        default: "Inaalis ng enemy draft ang main timing mo o pinipilit ka sa unfavorable lane pressure."
      }
    }
  },
  climb: {
    title: "Climb Picks — Pinakamagagaling na Hero sa Patch na Ito",
    subtitle: "Top 5 heroes bawat lane ranked ayon sa meta score (tier + pick/ban pressure + win rate). Camp HOK international data.",
    dataDisclaimer: "Gumagamit ng Camp HOK live stats ang mga rekomendasyon. I-pair sa bans at role pool mo — hindi official pro tier lists.",
    reasonTier: "Tier {tier} sa current meta",
    reasonWr: "{wr} win rate — above average",
    reasonPick: "{pick} pick rate — popular sa ranked",
    reasonBan: "{ban} ban rate — draft priority",
    reasonStable: "Tier {tier} na may {wr} WR — stable lane pick"
  },
  comps: {
    title: "Team Comps & Duos",
    subtitle: "Curated duo synergies at fast-push templates para sa ranked. Honest data sourcing — walang fake duo win rates.",
    sourceNote: "{source} · Na-update {updated}",
    duosTitle: "Featured duos",
    templatesTitle: "Fast-push templates"
  },
  guide: {
    teamfight: {
      tank: "Mag-engage sa enemy carry kapag kaya ng team mo na sumunod. Mag-body-block ng skillshots para sa marksman mo.",
      warrior: "Mag-flank o mag-dive ng backline pagkatapos mag-commit ang tanks. Huwag mag-start walang vision sa enemy jungler.",
      assassin: "Maghintay ng team CC, pagkatapos i-burst ang carry gamit ang buong combo. Lumabas gamit ang flash o resets kung na-focus.",
      mage: "Mag-poke sa max range bago ang objectives. Itabi ang hard CC para sa enemy dive o peel windows.",
      marksman: "Manatili sa likod ng frontline; tirahin ang pinakamalapit na safe target. Sumali lang pagkatapos maubos ang enemy dive cooldowns.",
      support: "I-peel muna ang carry mo, pagkatapos humanap ng picks. Mag-ward ng Tyrant ~30s bago mag-spawn.",
      default: "Manatili sa team mo, mag-play around objectives, at mag-commit kapag may numbers advantage."
    }
  },
  trends: {
    patchStrongest: "Pinakamalakas sa Patch",
    patchStrongestHint: "Tier S+ / S heroes na may pinakamataas na win rate sa sync na ito",
    soloQueue: "Solo Queue Kings",
    soloQueueHint: "Meta score na may 51%+ win rate — malakas na picks kahit walang premade",
    proPressure: "Pro Draft Pressure",
    proPressureHint: "Ban + pick weight sa global Camp (walang live KPL API)",
    bestDuos: "Pinakamagagaling na Duos",
    bestDuosHint: "Isang pair bawat lane strategy — roam/bot, mid/jungle, side gank, engage/pick",
    metaComps: "Meta Comps",
    metaCompsHint: "Five-hero templates: balanced, fast push, protect carry, ban core"
  },
  playbook: {
    flex: "flex",
    repositionAa: "mag-reposition gamit ang basic attacks",
    safeTrade: "Mag-trade gamit ang pinaka-safe na skill, kumpirmahin ang cooldowns, pagkatapos mag-commit ng ultimate.",
    comboStandard: "Standard trade",
    comboStandardWhen: "{lane} skirmish o objective setup",
    comboAllIn: "All-in",
    comboAllInSteps: "{ult} pagkatapos ng buong rotation kapag wala nang escape ang enemy",
    comboAllInWhen: "River gank o backline dive na may team CC",
    itemCore: "Core item #{slot} sa recommended {lane} path.",
    arcanaPrimary: "Primary",
    arcanaRune: "Rune {n}",
    arcanaSpell: "Spell",
    arcanaEffect: "Recommended para sa {role} {lane}",
    arcanaSpellHint: "Tingnan ang matchup section para sa mga swap.",
    seeBuildTable: "tingnan ang build table",
    tldrBuild: "Core: {items}",
    tldrCombo: "I-weave ang skills sa basic attacks.",
    tldrCounters: "Malakas laban sa {names}",
    tldrCountersDefault: "Malakas laban sa favorable drafts",
    passiveHookNoDesc: "Si {name} ay {lane} {role} na may {difficulty} difficulty sa Honor of Kings Global.",
    passiveHookWithDesc: "{name}: {desc}.",
    passiveHookNamed: "{name} — {role} ({lane}) na binuo around {passive}.",
    skillOrder: {
      junglePriority: "Skill 2 → Skill 1 → {ult} (i-max muna ang Skill 2)",
      jungleReason: "Ang {s2} ay karaniwang nagbibigay ng mobility o stick — i-max muna para sa ganks. {s1} pangalawa para sa damage. {ult} sa bawat level available.",
      magePriority: "Skill 2 → Skill 1 → {ult} (i-max muna ang Skill 2)",
      mageReason: "Wave clear at poke mula sa {s2} muna. {s1} para sa trade patterns. {ult} kapag na-unlock para sa fight swing.",
      adcPriority: "Skill 1 → Skill 2 → {ult} (i-max muna ang Skill 1)",
      adcReason: "Ang {s1} ay lane trade tool mo — i-max para sa farm lane pressure. {s2} pangalawa para sa peel o burst. {ult} sa cooldown.",
      defaultPriority: "Skill 1 → Skill 2 → {ult}",
      defaultReason: "I-max muna ang primary trade skill mo, pagkatapos {s2} para sa utility, at {ult} sa bawat level."
    }
  },
  faq: {
    seeBuild: "tingnan ang build section",
    flexCc: "flex picks na may CC",
    diveComp: "assassins at dive comps",
    tierNoteStrong: "Malakas na meta pick para sa ranked.",
    tierNoteSolid: "Solid situational pick.",
    tierNoteNiche: "Niche — mag-draft nang maingat.",
    struggleDive: "dive at burst",
    strugglePeel: "peel at group",
    struggleRange: "out-range o out-sustain",
    laning: {
      jungling: "Mag-clear hanggang level four, pagkatapos i-gank ang lane na may pinakakaunting escape. I-secure ang Tyrant kapag may crash wave ang bot o mid mo.",
      mid: "Kontrolin ang first wave nang hindi tumatanggap ng libreng poke. Mag-roam pagkatapos i-push ang wave 2+ sa side lanes kasama ang jungler mo.",
      farm: "Mag-last-hit nang ligtas hanggang sa first core item. Mag-ping ng jungler para sa river vision; huwag mag-face-check ng brush nang walang minion cover.",
      clash: "Mag-trade sa power spike levels mo (2/4). Tumawag ng jungler para sa dive kapag wala nang flash ang enemy.",
      roam: "Tulungan ang marksman na mag-crash ng wave, pagkatapos mag-rotate mid para sa picks. Bumalik bago ang Tyrant kapag walang escape ang carry mo."
    },
    laningDefault: "Maglaro si {name} sa {lane} role: mag-farm hanggang first core, pagkatapos lumaban sa ultimate timer mo.",
    highRankStaple: "Si {name} ay Tier {tier} staple sa high-elo (Diamond+) sa international server — worth mastering para sa climb.",
    highRankViable: "Si {name} ay viable Tier A pick sa high rank na may {wr} win rate — malakas sa one-trick hands o bilang counter-pick.",
    highRankNiche: "Si {name} ay Tier {tier} globally ({wr} WR). Sa high rank, piliin lang sa favorable matchups o kapag may dedicated pocket pick ka."
  },
  bestHeroes: {
    onTierList: "sa Tier List"
  },
  learn: {
    title: "Learning Hub",
    metaTitle: "Honor of Kings Guides, Builds, Counters & Tier Lists",
    metaDesc: "Honor of Kings Global guides para sa hero builds, counters, tier lists, jungle routes, team comps, at ranked climb strategy na backed by Camp HOK data.",
    subtitle: "Honor of Kings Global guides para sa builds, counters, tier lists, jungle routes, team comps, at ranked climb decisions.",
    byAuthor: "Ni {author} · Na-publish {published} · Na-update {updated}",
    dataNote: "Data note",
    searchPlaceholder: "Maghanap ng guides...",
    allCategories: "Lahat",
    intentLabel: "Magsimula sa search intent",
    intentTitle: "Hanapin ang eksaktong guide para sa susunod na ranked decision mo",
    intentDesc: "Gamitin ang mga routes na ito para sa mga searches na ginagawa ng mga manlalaro: best heroes para mag-climb, paano mag-counter ng assassins, jungle tier lists, at team comp templates.",
    counterToolCta: "Counter picker tool",
    findByRoleTitle: "Mag-browse ayon sa role",
    findByRoleDesc: "Pumunta diretso sa role-based hero pools bago pumili ng guide.",
    allBestHeroes: "Lahat ng best heroes",
    bestRoleGuide: "Pinakamagagaling na {role} heroes",
    heroLookupTitle: "Humanap ng hero guide",
    heroLookupDesc: "Maghanap ng kahit anong hero para buksan ang build, counter, at weakness articles mula sa isang row.",
    heroGuides: "Hero Guides",
    heroGuidesDesc: "Indibidwal na hero build, counter, at playstyle guides — {count} articles sa {heroCount} heroes.",
    heroSearchPlaceholder: "Maghanap ayon sa hero name...",
    noResults: "Walang guides na tumugma sa search mo.",
    intent: {
      climb: { label: "Climb", title: "Pinakamagagaling na heroes para sa solo queue", desc: "Magsimula sa pinaka-safe na current ranked picks bago matuto ng mas malalim na matchups." },
      counter: { label: "Counter", title: "Pigilan ang assassin one-shots", desc: "Mag-draft ng peel, control, at item answers laban sa common dive heroes." },
      jungle: { label: "Jungle", title: "Jungle tier list at pathing", desc: "Pumili ng tempo junglers, planuhin ang first clear, at i-convert ang ganks sa objectives." },
      teamComps: { label: "Team comps", title: "Draft templates na nananalo", desc: "Gumamit ng proven 5-stack structures sa halip na random comfort picks." }
    },
    categories: {
      "Hero Guides": "Hero Guides",
      "Team Comps": "Team Comps",
      "Jungle": "Jungle",
      "Laning & Solo": "Laning & Solo",
      "Counter": "Counter",
      "Teamfight": "Teamfight",
      "Beginner": "Beginner",
      "Meta & Data": "Meta & Data"
    }
  },
  counterPage: {
    breadcrumb: "Counters",
    title: "Paano Mag-Counter kay {name}",
    subtitle: "Pinakamagagaling na counters sa Honor of Kings {season}",
    dataNote: "Huling na-update: {date} · {source}",
    source: "Counter list mula sa Camp HOK reference — walang official matchup win rates",
    snapshotTier: "Tier {tier}",
    bestCounters: "Pinakamagagaling na Counters kay {name}",
    whyTitle: "Bakit Gumagana ang Mga Counters na Ito",
    mistakesTitle: "Mga Karaniwang Pagkakamali",
    faqTitle: "FAQ",
    campDataSource: "🏛️ Camp HOK Official Counter List",
    hokmetaAnalysisTitle: "📊 hokmeta Deep Analysis",
    bestCounterSourceLabel: "hokmeta Best Counter Analysis",
    bestCounterBaseData: "Base counter data mula sa Camp HOK rank statistics",
    sameLaneCounters: "🎯 Same-Lane Counters",
    sameLaneHint: "Direktang lane matchup — pinaka-impactful na counter picks.",
    otherLaneCounters: "🛡️ Other-Lane Counters",
    otherLaneHint: "Cross-lane / teamfight counter threats.",
    relatedTitle: "Kaugnay",
    overviewLink: "{name} overview",
    counterPickerLink: "Counter picker",
    relatedCounters: "Kaugnay na counter guides",
    viewCounterGuide: "Paano mag-counter kay {name}",
    playstyleTitle: "Paano Naglalaro si {name} & Damage Source",
    bestCounterTitle: "⭐ Pinakamagaling na Counter",
    bestCounterAdvantage: "Win rate advantage +{advantage}%",
    bestCounterReasons: "Bakit gumagana si {name}:",
    counterAdvantage: "+{advantage}% WR",
    counterDetailTitle: "Bakit nag-co-counter si {counter} kay {name}",
    metaTrendTitle: "Bakit Mas Mahina si {name} sa Meta na Ito",
    metaTrendNoData: "Meta trend data para kay {name} ay available sa susunod na data sync.",
    relatedCounterTitle: "Kaugnay na Counter Guides",
    quickLabel: "Counter quick plan",
    quickTitle: "I-counter si {name} gamit si {counters}",
    quickTitleFallback: "Paano parusahan si {name}",
    quickMeta: "Si {name} ay {role} sa {lane}. Talunin siya sa pamamagitan ng pag-draft ng direct answers, pag-deny ng first power spike, at pag-save ng control para sa commit window niya.",
    quickTopPicks: "Pinakamagagaling na picks",
    quickFallbackPick: "Counter candidate",
    quickSameLane: "lane answer",
    quickTeamfight: "teamfight answer",
    quickVs: "vs {name}",
    quickNoCounters: "Wala pang reliable counter list para kay {name}. Gamitin ang plan sa kanan at tingnan muli pagkatapos ng susunod na sync.",
    quickHeroCta: "Tingnan ang {name} build page",
    quickToolCta: "Buksan ang counter picker tool",
    quickPlan: {
      laneTitle: "Lane plan",
      teamfightTitle: "Teamfight plan",
      draftTitle: "Draft rule",
      lane: {
        marksman: "I-pressure ang unang dalawang waves, i-contest ang river vision, at pilitin si {name} na mag-last-hit sa ilalim ng threat bago ang core items.",
        mage: "Mag-push lang kapag kaya mong i-track ang jungle. I-bait ang key control spell, pagkatapos parusahan ang cooldown window gamit ang roam o gank.",
        assassin: "Protektahan ang early jungle entrances, mag-ping ng missing routes, at mag-collapse gamit ang numbers sa halip na tumanggap ng isolated duels.",
        support: "Sirain ang first roam timing niya sa pamamagitan ng mas mabilis na pag-clear ng mid at pag-match ng first river move kasama ang jungler mo.",
        tank: "Huwag mag-trade sa buong cooldowns. Payatin ang wave, panatilihin ang distansya, at tumawag ng jungle kapag nag-overextend si {name}.",
        warrior: "Hawakan ang wave malapit sa tower mo at parusahan ang mga nabigong engages; mas mahalaga ang side-lane counters kaysa sa blind all-ins.",
        default: "I-respect ang first power spike, mag-trade lang pagkatapos gamitin ang key cooldowns, at iwasan ang pakikipaglaban sa fog."
      },
      teamfight: {
        marksman: "Magtabi ng isang hard CC o dive threat para kay {name}. Huwag habulin ang tanks habang libreng nag-hihit siya mula sa backline.",
        mage: "Kumalat bago ang objectives at itabi ang interrupt tools para sa main damage/control cast.",
        assassin: "Mag-group gamit ang peel, kontrolin ang flank bushes, at maghintay na mag-reveal si {name} bago mag-commit ang carries mo.",
        support: "I-track ang engage cooldowns at parusahan ang mga missed crowd control; huwag hayaan si {name} na mag-start ng fights mula sa fog.",
        tank: "Mag-kite muna, pagkatapos mag-re-engage pagkatapos gastusin ni {name} ang mobility o ultimate niya.",
        warrior: "Pilitin ang front-to-back fights at i-deny ang flank angles; mag-collapse lang kapag wala nang escape route si {name}.",
        default: "Lumaban around vision, itabi ang control para sa commit window, at i-convert ang first pick sa objective."
      },
      draft: {
        marksman: "Pumili ng hard engage, long-range poke, o assassins na kaya ng maabot ang backline bago makumpleto ni {name} ang damage items.",
        mage: "Mag-draft ng displacement, mobility, o long-range poke para hindi makontrol ni {name} ang first objective setup.",
        assassin: "Mag-draft ng peel, point-and-click control, at tanky frontliners; iwasan ang double squishy backlines.",
        support: "Mag-draft ng wave clear at disengage para hindi makapag-snowball si {name} ng early roam windows.",
        tank: "Mag-draft ng sustained DPS at penetration. Ang burst-only comps ay nagsasayang ng damage kay {name}.",
        warrior: "Mag-draft ng kite, anti-heal kung kailangan, at side-lane heroes na hindi mawawalan ng wave control.",
        default: "Kung kulang ang comp mo sa control, peel, o lane answer, i-ban si {name} sa halip na umasa na ma-outplay siya."
      }
    },
    faqWho: "Sino ang nag-co-counter kay {name}?",
    faqWhoAnswer: "Si {list} ay malakas na picks laban kay {name} sa international server.",
    faqWhoNone: "Wala pang reliable counter list para kay {name} — tingnan muli pagkatapos ng susunod na data sync.",
    faqHowToLane: "Paano maglaro laban kay {name}?",
    faqHowToLaneAnswer: "Ang kahinaan ni {name} ay {weakness}. I-deny ang {lane} resources nang maaga, huwag hayaan na mag-farm nang libre. Itabi ang hard CC sa teamfights para i-interrupt ang key ability niya.",
    faqWeakness: "Ano ang kahinaan ni {name}?",
    faqWeaknessAnswer: "Pangunahing kahinaan ni {name}: {weakness}. I-exploit ang mga windows na ito para talunin siya.",
    faqUltimate: "Paano i-dodge ang ultimate ni {name}?",
    faqItems: "Anong items ang nag-co-counter kay {name}?",
    faqSeason: "Malakas ba si {name} sa {season}?",
    faqSeasonAnswer: "Si {name} ay Tier {tier} na may {wr} win rate, {pick} pick rate, at {ban} ban rate (Camp HOK, {date}).",
    faqUltimateGeneric: "Itabi ang hard CC para kapag nag-commit si {name} gamit ang ultimate; kumalat ang formation at mag-disengage sa power window.",
    faqItemsGeneric: "Mag-build ng resist at HP laban sa damage profile ni {name} ({role}); Purify o grievous wounds kapag ang kit niya ay umaasa sa CC o sustain.",
    whyGenericPeel: "Ang tanks at supports ay nag-peel at nag-lo-lock kay {name} bago siya makarating sa carry-killing range.",
    whyGenericAssassin: "Ang assassins ay nagpaparusa kay {name} kapag wala nang key defensive cooldowns.",
    whyGenericMage: "Ang mages ay nag-outrange kay {name} sa lane at nagpapilit ng skill trades sa terms nila.",
    whyGenericDraft: "Si {list} ay angkop sa current international counter list para sa matchup na ito.",
    whyGenericPassive: "Ang kit niya ay umiikot sa: {hook} — ang mga counters na nag-i-interrupt o nag-o-outscale ng win condition na ito ang pinakamagaling.",
    whyGenericEarly: "Early pressure bago makumpleto ni {name} ang core items at ma-hit ang power spikes.",
    mistakeMarksmanPeel: "Hayaan si {name} na libreng mag-hit ng backline mo — mag-draft ng peel o hard engage kapag tumalon siya.",
    mistakeMarksmanPosition: "Tumayo sa skill hitboxes nang hindi nag-sidestep — ituring ang bawat trade bilang skill-dodge practice.",
    mistakeMarksmanItems: "Mag-build ng isang resist type lang kapag si {name} ay nag-deal ng mixed o true damage.",
    mistakeAssassinVision: "Mag-face-check ng fog nang hindi alam ang posisyon ni {name} sa mapa.",
    mistakeAssassinDive: "Mag-engage ng 5v5 habang may buong combo at escape tools pa si {name}.",
    mistakeAssassinReset: "Habolin ang mababang {name} sa enemy jungle nang walang collapse.",
    mistakeMagePosition: "Tumayo sa wave line para makapag-land si {name} ng skill combos nang libre.",
    mistakeMageCooldown: "Mag-hard engage habang may crowd-control abilities pa si {name}.",
    mistakeMageWave: "Mag-roam nang hindi nagpaparusa kay {name} pagkatapos niyang gastusin ang skills sa minion wave.",
    mistakeTankIsolate: "Mag-isolate nang walang team follow-up — nag-ki-kite o nag-peel si {name} laban sa solo targets.",
    mistakeTankKite: "Habulin ang mobile carries sa halip na i-zone si {name} mula sa objectives.",
    mistakeTankItems: "Laktawan ang grievous wounds o penetration kapag nag-stack si {name} ng sustain o armor.",
    mistakeDefaultTrade: "Mag-trade sa even cooldowns kapag nananalo si {name} sa extended fights.",
    mistakeDefaultObjective: "Mag-start ng dragons o Tyrant habang may ultimate pa si {name}.",
    mistakeDefaultDraft: "Mag-blind-pick nang hindi nag-ba-ban o nag-co-counter-pick sa comfort matchups ni {name}."
  },
  notFound: {
    title: "404",
    message: "Hindi mahanap ang page na ito.",
    home: "Home",
    allHeroes: "Lahat ng Heroes"
  }
};

// ─── Indonesian (id) translations ──────────────────────────────────────────────
const idPatch = {
  tierList: {
    title: "Honor of Kings Tier List",
    subtitle: "Semua hero di-ranking S / A / B / C / D di Clash, Jungle, Mid, Farm, dan Roam — Camp HOK live stats.",
    roleHint: "Diurutkan berdasarkan meta score di setiap tier band",
    jumpLanes: "Lompat ke lane"
  },
  metaBanner: {
    label: "Live meta data",
    from: "Win / pick / ban dari",
    updated: "Diperbarui"
  },
  hero: {
    wr: "WR",
    tier: "Tier",
    climbBadge: "Climb pick",
    climbLaneRank: "#{rank} di {lane}",
    climbIntro: "{name} adalah recommended climb pick di patch ini:",
    climbDataNote: "Berdasarkan Camp HOK tier, win/pick/ban rates — bukan jaminan di setiap draft.",
    climbViewAll: "Lihat semua lane climb picks",
    decision: {
      coreFallback: "Lihat tabel build lengkap untuk urutan item saat ini.",
      counterCtaHint: "Catatan matchup, target kuat, dan hero yang menghukum {name}.",
      pick: {
        highTier: "Kamu butuh pick {lane} prioritas tinggi saat ini dan draft kamu bisa bermain di sekitar timing utamanya.",
        marksman: "Tim kamu bisa melindungi backline dan memberi waktu untuk scale ke item spikes.",
        mage: "Draft kamu butuh mid wave clear, objective poke, atau control yang reliable sebelum fight.",
        assassin: "Carry musuh tidak punya peel yang reliable, dan side lane kamu bisa membantu mengamankan early jungle tempo.",
        support: "Carry kamu butuh peel atau engage setup, dan tim bisa mengikuti first CC window kamu.",
        tank: "Draft kamu kekurangan frontline dan butuh seseorang untuk memulai fight di sekitar objectives.",
        warrior: "Kamu butuh side-lane pressure, skirmishing yang tahan lama, atau ancaman flank ke backline musuh.",
        default: "Tim kamu butuh pick {role} yang stabil dan draft musuh belum menunjukkan hard counters."
      },
      avoid: {
        marksman: "Musuh punya banyak hard-diving assassins atau tim kamu kekurangan peel yang reliable.",
        mage: "Musuh bisa dodge atau interrupt control utama kamu, atau tim sudah kekurangan sustained damage.",
        assassin: "Draft musuh punya strong peel, frontliners tanky, dan sedikit target carry yang terisolasi.",
        support: "Tim tidak bisa mengikuti engage, atau musuh bisa menghukum carry kamu sebelum stabil di lane.",
        tank: "Tim kekurangan damage di belakang kamu, atau musuh bisa kite fight front-to-back yang panjang.",
        warrior: "Musuh bisa kite tekanan side lane dan collapse lebih cepat dari tim kamu bisa trade objectives.",
        default: "Draft musuh menghilangkan timing utama kamu atau memaksa kamu ke tekanan lane yang tidak menguntungkan."
      }
    }
  },
  climb: {
    title: "Climb Picks — Hero Terbaik di Patch Ini",
    subtitle: "Top 5 hero per lane di-ranking berdasarkan meta score (tier + pick/ban pressure + win rate). Data internasional Camp HOK.",
    dataDisclaimer: "Rekomendasi menggunakan live stats Camp HOK. Padukan dengan bans dan role pool kamu — bukan tier list pro resmi.",
    reasonTier: "Tier {tier} di meta saat ini",
    reasonWr: "{wr} win rate — di atas rata-rata",
    reasonPick: "{pick} pick rate — populer di ranked",
    reasonBan: "{ban} ban rate — prioritas draft",
    reasonStable: "Tier {tier} dengan {wr} WR — pick lane yang stabil"
  },
  comps: {
    title: "Team Comps & Duos",
    subtitle: "Sinergi duo dan template fast-push yang dikurasi untuk ranked. Sumber data jujur — tanpa duo win rate palsu.",
    sourceNote: "{source} · Diperbarui {updated}",
    duosTitle: "Duo unggulan",
    templatesTitle: "Template fast-push"
  },
  guide: {
    teamfight: {
      tank: "Engage carry musuh saat tim bisa mengikuti. Body-block skillshots untuk marksman kamu.",
      warrior: "Flank atau dive backline setelah tank commit. Jangan mulai tanpa vision pada jungler musuh.",
      assassin: "Tunggu CC tim, lalu burst carry dengan combo penuh. Keluar dengan flash atau reset jika di-focus.",
      mage: "Poke di jarak maksimal sebelum objectives. Simpan hard CC untuk dive musuh atau window peel.",
      marksman: "Tetap di belakang frontline; serang target aman terdekat. Bergabung hanya setelah cooldown dive musuh habis.",
      support: "Peel carry kamu dulu, lalu cari picks. Ward Tyrant ~30s sebelum spawn.",
      default: "Tetap bersama tim, bermain di sekitar objectives, dan commit saat punya keunggulan jumlah."
    }
  },
  trends: {
    patchStrongest: "Terkuat di Patch",
    patchStrongestHint: "Hero Tier S+ / S dengan win rate tertinggi di sync ini",
    soloQueue: "Raja Solo Queue",
    soloQueueHint: "Meta score dengan 51%+ win rate — pick kuat tanpa premade",
    proPressure: "Tekanan Draft Pro",
    proPressureHint: "Bobot ban + pick di Camp global (tanpa API KPL live)",
    bestDuos: "Duo Terbaik",
    bestDuosHint: "Satu pasangan per strategi lane — roam/bot, mid/jungle, side gank, engage/pick",
    metaComps: "Meta Comps",
    metaCompsHint: "Template lima hero: balanced, fast push, protect carry, ban core"
  },
  playbook: {
    flex: "flex",
    repositionAa: "reposisi dengan basic attack",
    safeTrade: "Trade dengan skill paling aman, konfirmasi cooldown, lalu commit ultimate.",
    comboStandard: "Trade standar",
    comboStandardWhen: "Skirmish {lane} atau setup objective",
    comboAllIn: "All-in",
    comboAllInSteps: "{ult} setelah rotasi penuh saat escape musuh sudah habis",
    comboAllInWhen: "Gank river atau dive backline dengan CC tim",
    itemCore: "Item core #{slot} di path {lane} yang direkomendasikan.",
    arcanaPrimary: "Utama",
    arcanaRune: "Rune {n}",
    arcanaSpell: "Spell",
    arcanaEffect: "Direkomendasikan untuk {role} {lane}",
    arcanaSpellHint: "Lihat bagian matchup untuk pertukaran.",
    seeBuildTable: "lihat tabel build",
    tldrBuild: "Core: {items}",
    tldrCombo: "Selipkan skill di antara basic attack.",
    tldrCounters: "Kuat melawan {names}",
    tldrCountersDefault: "Kuat melawan draft yang menguntungkan",
    passiveHookNoDesc: "{name} adalah {role} {lane} dengan kesulitan {difficulty} di Honor of Kings Global.",
    passiveHookWithDesc: "{name}: {desc}.",
    passiveHookNamed: "{name} — {role} ({lane}) yang dibangun di sekitar {passive}.",
    skillOrder: {
      junglePriority: "Skill 2 → Skill 1 → {ult} (maksimalkan Skill 2 dulu)",
      jungleReason: "{s2} biasanya memberikan mobilitas atau stick — maksimalkan dulu untuk gank. {s1} kedua untuk damage. {ult} di setiap level tersedia.",
      magePriority: "Skill 2 → Skill 1 → {ult} (maksimalkan Skill 2 dulu)",
      mageReason: "Wave clear dan poke dari {s2} dulu. {s1} untuk pola trade. {ult} setiap kali terbuka untuk swing fight.",
      adcPriority: "Skill 1 → Skill 2 → {ult} (maksimalkan Skill 1 dulu)",
      adcReason: "{s1} adalah alat trade lane kamu — maksimalkan untuk tekanan farm lane. {s2} kedua untuk peel atau burst. {ult} sesuai cooldown.",
      defaultPriority: "Skill 1 → Skill 2 → {ult}",
      defaultReason: "Maksimalkan skill trade utama dulu, lalu {s2} untuk utilitas, dan {ult} di setiap level."
    }
  },
  faq: {
    seeBuild: "lihat bagian build",
    flexCc: "pick flex dengan CC",
    diveComp: "assassin dan dive comp",
    tierNoteStrong: "Pick meta yang kuat untuk ranked.",
    tierNoteSolid: "Pick situasional yang solid.",
    tierNoteNiche: "Niche — draft dengan hati-hati.",
    struggleDive: "dive dan burst",
    strugglePeel: "peel dan group",
    struggleRange: "out-range atau out-sustain",
    laning: {
      jungling: "Clear sampai level empat, lalu gank lane dengan escape paling sedikit. Amankan Tyrant saat bot atau mid kamu punya crash wave.",
      mid: "Kontrol wave pertama tanpa menerima poke gratis. Roam setelah push wave 2+ ke side lane bersama jungler kamu.",
      farm: "Last-hit dengan aman sampai item core pertama. Ping jungler untuk vision river; jangan face-check brush tanpa cover minion.",
      clash: "Trade di level power spike kamu (2/4). Panggil jungler untuk dive hanya saat flash musuh sudah habis.",
      roam: "Bantu marksman crash wave, lalu rotasi mid untuk picks. Kembali sebelum Tyrant jika carry kamu tidak punya escape."
    },
    laningDefault: "Mainkan {name} di role {lane}: farm sampai core pertama, lalu fight di timer ultimate kamu.",
    highRankStaple: "{name} adalah staple Tier {tier} di high-elo (Diamond+) di server internasional — layak dikuasai untuk climb.",
    highRankViable: "{name} adalah pick Tier A yang viable di high rank dengan {wr} win rate — kuat di tangan one-trick atau sebagai counter-pick.",
    highRankNiche: "{name} berada di Tier {tier} secara global ({wr} WR). Di high rank, pilih hanya di matchup yang menguntungkan atau saat punya pocket pick khusus."
  },
  bestHeroes: {
    onTierList: "di Tier List"
  },
  learn: {
    title: "Pusat Belajar",
    metaTitle: "Honor of Kings Guides, Builds, Counters & Tier Lists",
    metaDesc: "Guide Honor of Kings Global untuk build hero, counter, tier list, rute jungle, team comp, dan strategi climb ranked yang didukung data Camp HOK.",
    subtitle: "Guide Honor of Kings Global untuk build, counter, tier list, rute jungle, team comp, dan keputusan climb ranked.",
    byAuthor: "Oleh {author} · Diterbitkan {published} · Diperbarui {updated}",
    dataNote: "Catatan data",
    searchPlaceholder: "Cari guide...",
    allCategories: "Semua",
    intentLabel: "Mulai dari niat pencarian",
    intentTitle: "Temukan guide yang tepat untuk keputusan ranked berikutnya",
    intentDesc: "Gunakan rute ini untuk pencarian yang sering dilakukan pemain: hero terbaik untuk climb, cara counter assassin, tier list jungle, dan template team comp.",
    counterToolCta: "Alat counter picker",
    findByRoleTitle: "Jelajahi berdasarkan role",
    findByRoleDesc: "Langsung ke pool hero berbasis role sebelum memilih guide.",
    allBestHeroes: "Semua hero terbaik",
    bestRoleGuide: "Hero {role} terbaik",
    heroLookupTitle: "Cari guide hero",
    heroLookupDesc: "Cari hero apa pun untuk membuka artikel build, counter, dan kelemahan dari satu baris.",
    heroGuides: "Guide Hero",
    heroGuidesDesc: "Guide build, counter, dan playstyle hero individual — {count} artikel di {heroCount} hero.",
    heroSearchPlaceholder: "Cari berdasarkan nama hero...",
    noResults: "Tidak ada guide yang cocok dengan pencarian kamu.",
    intent: {
      climb: { label: "Climb", title: "Hero terbaik untuk solo queue", desc: "Mulai dengan pick ranked paling aman saat ini sebelum mempelajari matchup yang lebih dalam." },
      counter: { label: "Counter", title: "Hentikan one-shot assassin", desc: "Draft peel, control, dan jawaban item melawan hero dive umum." },
      jungle: { label: "Jungle", title: "Tier list dan pathing jungle", desc: "Pilih jungler tempo, rencanakan clear pertama, dan konversi gank menjadi objectives." },
      teamComps: { label: "Team comp", title: "Template draft yang menang", desc: "Gunakan struktur 5-stack yang terbukti alih-alih pick comfort acak." }
    },
    categories: {
      "Hero Guides": "Guide Hero",
      "Team Comps": "Team Comp",
      "Jungle": "Jungle",
      "Laning & Solo": "Laning & Solo",
      "Counter": "Counter",
      "Teamfight": "Teamfight",
      "Beginner": "Pemula",
      "Meta & Data": "Meta & Data"
    }
  },
  counterPage: {
    breadcrumb: "Counter",
    title: "Cara Counter {name}",
    subtitle: "Counter terbaik di Honor of Kings {season}",
    dataNote: "Terakhir diperbarui: {date} · {source}",
    source: "Daftar counter dari referensi Camp HOK — tanpa win rate matchup resmi",
    snapshotTier: "Tier {tier}",
    bestCounters: "Counter Terbaik untuk {name}",
    whyTitle: "Mengapa Counter Ini Efektif",
    mistakesTitle: "Kesalahan Umum",
    faqTitle: "FAQ",
    campDataSource: "🏛️ Daftar Counter Resmi Camp HOK",
    hokmetaAnalysisTitle: "📊 Analisis Mendalam hokmeta",
    bestCounterSourceLabel: "Analisis Counter Terbaik hokmeta",
    bestCounterBaseData: "Data counter dasar dari statistik rank Camp HOK",
    sameLaneCounters: "🎯 Counter Satu Lane",
    sameLaneHint: "Matchup lane langsung — pick counter paling berdampak.",
    otherLaneCounters: "🛡️ Counter Lintas Lane",
    otherLaneHint: "Ancaman counter lintas lane / teamfight.",
    relatedTitle: "Terkait",
    overviewLink: "Ikhtisar {name}",
    counterPickerLink: "Counter picker",
    relatedCounters: "Guide counter terkait",
    viewCounterGuide: "Cara counter {name}",
    playstyleTitle: "Cara Bermain {name} & Sumber Damage",
    bestCounterTitle: "⭐ Counter Terbaik",
    bestCounterAdvantage: "Keunggulan win rate +{advantage}%",
    bestCounterReasons: "Mengapa {name} efektif:",
    counterAdvantage: "+{advantage}% WR",
    counterDetailTitle: "Mengapa {counter} meng-counter {name}",
    metaTrendTitle: "Mengapa {name} Lebih Lemah di Meta Ini",
    metaTrendNoData: "Data tren meta untuk {name} akan tersedia di sync data berikutnya.",
    relatedCounterTitle: "Guide Counter Terkait",
    quickLabel: "Rencana cepat counter",
    quickTitle: "Counter {name} dengan {counters}",
    quickTitleFallback: "Cara menghukum {name}",
    quickMeta: "{name} adalah {role} di {lane}. Kalahkan dengan draft jawaban langsung, deny power spike pertama, dan simpan control untuk window commit-nya.",
    quickTopPicks: "Pick terbaik",
    quickFallbackPick: "Kandidat counter",
    quickSameLane: "jawaban lane",
    quickTeamfight: "jawaban teamfight",
    quickVs: "vs {name}",
    quickNoCounters: "Belum ada daftar counter yang reliable untuk {name}. Gunakan rencana di kanan dan periksa lagi setelah sync berikutnya.",
    quickHeroCta: "Lihat halaman build {name}",
    quickToolCta: "Buka alat counter picker",
    quickPlan: {
      laneTitle: "Rencana lane",
      teamfightTitle: "Rencana teamfight",
      draftTitle: "Aturan draft",
      lane: {
        marksman: "Tekan dua wave pertama, rebut vision river, dan paksa {name} last-hit di bawah ancaman sebelum item core.",
        mage: "Push hanya saat bisa melacak jungle. Pancing spell control utama, lalu hukum window cooldown dengan roam atau gank.",
        assassin: "Lindungi entrance jungle awal, ping rute yang hilang, dan collapse dengan keunggulan jumlah alih-alih menerima duel terisolasi.",
        support: "Patahkan timing roam pertamanya dengan clear mid lebih cepat dan cocokkan gerakan river pertama bersama jungler kamu.",
        tank: "Jangan trade ke cooldown penuh. Tipiskan wave, jaga jarak, dan panggil jungle saat {name} overextend.",
        warrior: "Tahan wave dekat tower kamu dan hukum engage yang gagal; counter side-lane lebih penting dari all-in buta.",
        default: "Hormati power spike pertama, trade hanya setelah cooldown utama habis, dan hindari fight di fog."
      },
      teamfight: {
        marksman: "Simpan satu hard CC atau ancaman dive untuk {name}. Jangan kejar tank sementara dia free-hit dari backline.",
        mage: "Menyebar sebelum objectives dan simpan alat interrupt untuk cast damage/control utama.",
        assassin: "Group dengan peel, kontrol bush flank, dan tunggu {name} terungkap sebelum commit carry kamu.",
        support: "Lacak cooldown engage dan hukum crowd control yang meleset; jangan biarkan {name} memulai fight dari fog.",
        tank: "Kite dulu, lalu re-engage setelah {name} menghabiskan mobilitas atau ultimate-nya.",
        warrior: "Paksa fight front-to-back dan tolak sudut flank; collapse hanya saat {name} tidak punya jalur kabur.",
        default: "Fight di sekitar vision, simpan control untuk window commit, dan konversi pick pertama menjadi objective."
      },
      draft: {
        marksman: "Pilih hard engage, poke jarak jauh, atau assassin yang bisa mencapai backline sebelum {name} menyelesaikan item damage.",
        mage: "Draft displacement, mobilitas, atau poke jarak jauh agar {name} tidak bisa mengontrol setup objective pertama.",
        assassin: "Draft peel, control point-and-click, dan frontliner tanky; hindari double backline squishy.",
        support: "Draft wave clear dan disengage agar {name} tidak bisa snowball window roam awal.",
        tank: "Draft sustained DPS dan penetrasi. Comp burst-only membuang damage ke {name}.",
        warrior: "Draft kite, anti-heal jika perlu, dan hero side-lane yang tidak kehilangan kontrol wave.",
        default: "Jika comp kamu kekurangan control, peel, atau jawaban lane, ban {name} alih-alih berharap bisa outplay."
      }
    },
    faqWho: "Siapa yang meng-counter {name}?",
    faqWhoAnswer: "{list} adalah pick kuat melawan {name} di server internasional.",
    faqWhoNone: "Belum ada daftar counter yang reliable untuk {name} — periksa lagi setelah sync data berikutnya.",
    faqHowToLane: "Cara bermain melawan {name}?",
    faqHowToLaneAnswer: "Kelemahan {name} adalah {weakness}. Deny resource {lane} sejak awal, jangan biarkan farm gratis. Simpan hard CC di teamfight untuk interrupt ability utamanya.",
    faqWeakness: "Apa kelemahan {name}?",
    faqWeaknessAnswer: "Kelemahan utama {name}: {weakness}. Eksploitasi window ini untuk mengalahkannya.",
    faqUltimate: "Cara dodge ultimate {name}?",
    faqItems: "Item apa yang meng-counter {name}?",
    faqSeason: "Apakah {name} kuat di {season}?",
    faqSeasonAnswer: "{name} adalah Tier {tier} dengan {wr} win rate, {pick} pick rate, dan {ban} ban rate (Camp HOK, {date}).",
    faqUltimateGeneric: "Simpan hard CC untuk saat {name} commit dengan ultimate; sebarkan formasi dan disengage selama window power.",
    faqItemsGeneric: "Build resist dan HP melawan profil damage {name} ({role}); Purify atau grievous wounds saat kit-nya mengandalkan CC atau sustain.",
    whyGenericPeel: "Tank dan support peel dan mengunci {name} sebelum mencapai jarak kill carry.",
    whyGenericAssassin: "Assassin menghukum {name} saat cooldown defensif utama habis.",
    whyGenericMage: "Mage meng-out-range {name} di lane dan memaksa trade skill di syarat mereka.",
    whyGenericDraft: "{list} cocok dengan daftar counter internasional saat ini untuk matchup ini.",
    whyGenericPassive: "Kit-nya berpusat pada: {hook} — counter yang menginterrupt atau outscale win condition ini paling efektif.",
    whyGenericEarly: "Tekanan awal sebelum {name} menyelesaikan item core dan mencapai power spike.",
    mistakeMarksmanPeel: "Membiarkan {name} free-hit backline kamu — draft peel atau hard engage saat dia melompat.",
    mistakeMarksmanPosition: "Berdiri di hitbox skill tanpa sidestep — anggap setiap trade sebagai latihan dodge skill.",
    mistakeMarksmanItems: "Build hanya satu tipe resist saat {name} menghasilkan mixed atau true damage.",
    mistakeAssassinVision: "Face-check fog tanpa mengetahui posisi {name} di peta.",
    mistakeAssassinDive: "Engage 5v5 saat {name} masih punya combo penuh dan alat escape siap.",
    mistakeAssassinReset: "Mengejar {name} yang low HP melalui jungle musuh tanpa collapse.",
    mistakeMagePosition: "Berdiri di garis wave agar {name} bisa mendaratkan combo skill gratis.",
    mistakeMageCooldown: "Hard engage saat {name} masih punya ability crowd control.",
    mistakeMageWave: "Roam tanpa menghukum {name} setelah dia menghabiskan skill ke minion wave.",
    mistakeTankIsolate: "Mengisolasi tanpa follow-up tim — {name} kite atau peel melawan target solo.",
    mistakeTankKite: "Mengejar carry mobile alih-alih zone {name} dari objectives.",
    mistakeTankItems: "Melewati grievous wounds atau penetrasi saat {name} menumpuk sustain atau armor.",
    mistakeDefaultTrade: "Trade di cooldown seimbang saat {name} menang di fight panjang.",
    mistakeDefaultObjective: "Memulai dragon atau Tyrant saat {name} masih punya ultimate.",
    mistakeDefaultDraft: "Blind-pick tanpa ban atau counter-pick ke matchup nyaman {name}."
  },
  notFound: {
    title: "404",
    message: "Halaman ini tidak dapat ditemukan.",
    home: "Beranda",
    allHeroes: "Semua Hero"
  }
};

// ─── Apply patches ─────────────────────────────────────────────────────────────
const messagesDir = path.join(__dirname, '..', 'messages');

for (const [locale, patch] of [['fil', filPatch], ['id', idPatch]]) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  deepMerge(existing, patch);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
  console.log(`✓ ${locale}.json patched`);
}

// Verify coverage
const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf-8'));
function flatKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(flatKeys(v, key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}
const enKeys = flatKeys(en);
for (const locale of ['fil', 'id', 'zh-TW']) {
  const data = JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf-8'));
  const localeKeys = new Set(flatKeys(data));
  const missing = enKeys.filter((k) => !localeKeys.has(k));
  const coverage = ((enKeys.length - missing.length) / enKeys.length * 100).toFixed(1);
  console.log(`${locale}: ${coverage}% coverage (${missing.length} missing)`);
}
