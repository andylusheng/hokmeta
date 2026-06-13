  'daji': {
    playstyle: {
      summary: {
        en: 'Daji is a burst Mage dealing **pure Magic damage** with **point-click one-combo deletion**. Her Skill 1 (Soul Impact) fires 5 homing waves that deal AoE magic damage. Skill 2 (Strike a Pose) is a **point-click single-target stun** — her signature ability that cannot be dodged. Her Ultimate (Heartbreaker) fires 5 homing fireballs that auto-target enemies, with damage reduced per hit on the same target. Her passive (Captivate) reduces enemy magic resist with every ability hit. Her full combo is the simplest in the game: Skill 2 (stun) → Skill 3 (Ult) → Skill 1 → target dies with zero counterplay. She is the ultimate "no-mechanics" champion — zero dashes, zero skill shots, pure stat-check. If her combo kills you, she wins. If it doesn\'t, she has nothing for 8+ seconds.',
        'zh-TW': '妲己是爆發法師，造成**純法術傷害**，核心是**指向一套秒殺**。一技能靈魂衝擊發射5道追蹤波造成範圍法傷。二技能偶像魅力是**指向單體暈眩**——招牌技能無法閃避。大招女王崇拜發射5顆追蹤火球自動攻擊敵人，對同一目標傷害遞減。被動失心每次技能命中降敵方魔抗。全套連招全遊戲最簡單：二技能（暈）→大招→一技能→目標零反制直接死。她是終極"零操作"英雄——零位移、零指向技要求、純數值檢測。一套秒了就贏，秒不了8秒+零作用。',
      },
      points: [
        { en: '**Damage source:** Pure magic burst. Point-click Skill 2 stun guarantees full combo. Passive shreds magic resist, making her burst hard to itemize against. Zero physical damage, zero true damage.', 'zh-TW': '**傷害來源：** 純法術爆發。指向二技能暈保證全套命中。被動降魔抗讓爆發難以防裝對抗。零物理、零真傷。' },
        { en: '**Power spike:** Scepter of Reverberation + Void Staff (2 items). Full combo deletes any squishy without magic resist. Level 4 is first solo-kill window.', 'zh-TW': '**強勢期：** 迴響之杖+虛無法杖（2件）。全套連招秒任何沒魔抗的脆皮。4級是第一個單殺窗口。' },
        { en: '**Key weakness:** Single-target only — zero AoE outside Skill 1. Full combo has long CD — after using it, she\'s a walking minion for 8+ seconds. Zero mobility — no dashes, no speed boost. Extremely vulnerable between cooldowns.', 'zh-TW': '**核心弱點：** 純單體——除一技能外零AOE。全套CD長——用完了8秒+是走路小兵。零機動——沒位移、沒加速。CD期間極端脆弱。' },
        { en: '**Laning phase:** Weak early — her wave clear is mediocre and she has zero kill pressure without Ultimate. Survives by staying under tower and waiting for Level 4. Excels at roaming post-6: walk to side lane, press Skill 2 → 3 → 1, walk back.', 'zh-TW': '**對線期：** 前期弱——清線一般、沒大招零擊殺威脅。龜塔等4級。6級後遊走強：走去邊線→二技能→大招→一技能→走回中路。' },
      ],
    },
    bestCounter: {
      hero: 'gao-changgong',
      advantage: 5.0,
      reasons: [
        { en: "Gao Changgong's stealth initiation kills Daji before she can press any button. She never sees him coming, never gets to cast Skill 2. Zero counterplay.", 'zh-TW': '高長恭隱身先手在妲己按任何按鍵前就秒了她。她永遠看不到他來，永遠放不出二技能。零反制。' },
        { en: "Daji's entire defense is point-click Skill 2 stun — if she can't see her target, she can't cast it. Stealth = Daji's hard counter.", 'zh-TW': '妲己所有防禦是指向二技能暈——看不到目標就放不出。隱身=妲己的機制天敵。' },
        { en: "Gao Changgong's burst is instant — Daji's combo requires ~1.5s to fully execute. He kills her in 0.5s.", 'zh-TW': '高長恭爆發是瞬間的——妲己連招需要~1.5秒完成。他0.5秒就殺了她。' },
      ],
    },
    counterDetails: [
      { hero: 'gao-changgong', reason: { en: 'Stealth initiation — Daji never sees him. Dies before casting Skill 2. Instant burst beats 1.5s combo windup.', 'zh-TW': '隱身先手——妲己看不到。二技能放不出就死。瞬間爆發比1.5秒連招快。' }, tags: [{ en: 'Stealth Delete', 'zh-TW': '隱身秒殺' }, { en: 'Pre-Cast Kill', 'zh-TW': '施法前殺' }] },
      { hero: 'mulan', reason: { en: 'Silence from Skill 1 prevents Daji from casting anything. Heavy sword form burst kills before silence ends.', 'zh-TW': '一技能沉默讓妲己什麼都放不出。重劍形態爆發在沉默結束前秒殺。' }, tags: [{ en: 'Silence Lock', 'zh-TW': '沉默鎖' }, { en: 'Combo Deny', 'zh-TW': '禁連招' }] },
    ],
    metaTrend: {
      summary: {
        en: 'Daji has 51.3% WR with 2.28% pick rate — surprisingly strong for a "no-skill" champion. She is the quintessential low-elo pubstomper: enemies face-check bushes, don\'t build magic resist, and walk alone. Diamond+: falls off a cliff — enemies ward, group, build Succubus Cloak, and save CC for her post-combo vulnerability window.',
        'zh-TW': '妲己51.3%勝率+2.28%選取率——對"無技能"英雄來說意外地強。典型低分段虐菜神器：敵人不探草、不出魔抗、單走。鑽石以上：斷崖下滑——敵人插眼、抱團、出不死鳥之眼、留控針對她CD真空期。',
      },
      reasons: [
        { en: 'Her win rate is inflated by low-elo games where she dominates. Gold/Platinum: Daji is practically a guaranteed win if you know how to bush camp. Diamond+: liability pick.', 'zh-TW': '勝率被低分段遊戲拉高。黃金/白金：會蹲草的妲己幾乎必贏。鑽石以上：拖後腿選擇。' },
        { en: 'Zero skill expression — Daji\'s ceiling is entirely determined by enemy mistakes, not her own play. If enemies play correctly (ward, MR, group), she contributes nothing.', 'zh-TW': '零操作上限——妲己的天花板完全由敵方失誤決定，不是自己操作。敵人正確應對（插眼、魔抗、抱團）她就零貢獻。' },
        { en: 'Assassin meta punishes immobile Mages. Gao Changgong, Han Xin, Musashi all one-shot her before combo finishes.', 'zh-TW': '刺客版本懲罰無位移法師。高長恭、韓信、宮本都在她連招完成前秒她。' },
      ],
    },
    why: [
      { en: "Single-target only — zero teamfight damage after using combo on one target. If that target survives (MR/shield), Daji does nothing for the rest of the fight.", 'zh-TW': '純單體——一套打完就零團戰輸出。目標活下來（魔抗/護盾）就整波團零作用。' },
      { en: '8+ second cooldown window after combo — she has no auto-attack damage, no sustained threat. Collapse on her during this window.', 'zh-TW': '全套打完8秒+CD窗——她沒普攻傷害、沒持續威脅。在這段時間集火她。' },
      { en: "Zero mobility + zero defensive tools beyond Skill 2. If you survive or avoid the stun, she's the easiest kill in the game.", 'zh-TW': '零機動+除二技能外零防禦。活過或躲掉暈眩，她就是全遊戲最簡單的人頭。' },
    ],
    mistakes: [
      { en: "Face-checking bushes solo → Daji is ALWAYS there. She can't kill groups — only solo targets. Stay with your team.", 'zh-TW': '單人探草 → 妲己永遠在裡面。她不能殺群體——只能殺落單。跟團隊走。' },
      { en: 'Building zero magic resist → her passive shreds MR, so you need MORE than usual. Succubus Cloak is mandatory for squishies.', 'zh-TW': '零魔抗 → 被動降魔抗，所以要出更多魔抗才夠。脆皮必出不死鳥之眼。' },
      { en: "Using Purify/Ward during her Ult → the homing missiles have already locked on. Use Purify the moment Skill 2 stun lands to Flash away before Ult fires.", 'zh-TW': '在大招期間交淨化 → 追蹤彈已經鎖定了。中二技能暈那瞬間立刻交淨化+閃現跑，在大招發射前脫離。' },
    ],
    faqUltimate: { en: "Daji's Ultimate fires 5 homing fireballs — each hit on the same target deals reduced damage. Spread the fireballs: stand near allies/minions so the 5 hits split across multiple targets. Cleanse the Skill 2 stun BEFORE the Ultimate animation starts — once homing projectiles launch, they follow.", 'zh-TW': '妲己大招發射5顆追蹤火球——對同一目標傷害遞減。分散子彈：站隊友/小兵旁邊讓5顆分散。在二技能暈時的瞬間交淨化——一旦追蹤彈發射就躲不掉。' },
    faqItems: { en: "Magic resist stacking is mandatory. Succubus Cloak for carries, Sage's Sanctuary for tanks. Purify summoner specifically for her Skill 2 stun. Splendor (Zhonyas) to immune her full combo.", 'zh-TW': '堆魔抗必備。後排出不死鳥之眼，坦克出賢者的庇護。淨化專門解二技能暈。輝月免疫全套連招。' },
    faqWho: { en: 'Gao Changgong (#1) — stealth kills before combo. Mulan — silence prevents casting.', 'zh-TW': '高長恭（頭號天敵）——隱身秒殺在連招前。花木蘭——沉默禁止施法。' },
    faqHowToLane: { en: "Do NOT 1v1 her post-6 unless you have MR + Purify. She will 100-0 you from a bush. Ward mid bushes always. If she's missing from map, she's hiding in a bush near you.", 'zh-TW': '6級後別單挑除非有魔抗+淨化。她會從草叢100-0秒你。中路草叢永遠插眼。小地圖看不到她=她在你附近的草裡。' },
    faqSeason: { en: "Gold/Platinum: banned or picked every game, free LP. Diamond+: situational counter-pick into all-physical comps. Not recommended for climbing — you'll hit a wall at Diamond where enemies buy MR and group.", 'zh-TW': '黃金/白金：每場都Ban或選，免費上分。鑽石以上：針對選打全物理陣。不推薦用她爬分——到鑽石會撞牆，那時敵人都會出魔抗和抱團。' },
  },

  'milady': {
    playstyle: {
      summary: {
        en: 'Milady is a siege/push Mage dealing **pure Magic damage** with **minion-summoning tower pressure**. Her entire identity is her Skill 2 (Forced Invasion): she summons robotic minions that auto-attack enemies and towers. Her passive (Mechanical Minions) spawns additional minions whenever enemies die near her — snowballing her push after kills. Skill 1 (Air Superiority) sends out an aircraft that drops bombs in a line. Her Ultimate (Chaos Field) marks a target, causing all her minions to frenzy and rush that target with bonus attack speed. She is the #1 tower destroyer in the game — leave her alone in a lane for 10 seconds and she takes your inhibitor. Zero mobility, zero CC besides her Ult\'s slow, zero burst — her damage is sustained through minion swarm.',
        'zh-TW': '米萊狄是推進型法師，造成**純法術傷害**，核心是**召喚機器人推塔**。整套英雄身份在二技能強制入侵：召喚機器人普攻敵人和防禦塔。被動機械僕從在附近敵方死亡時生成額外機器人——擊殺後滾雪球推進。一技能空中支援派飛機沿線投彈。大招混沌磁場標記目標，讓所有機器人狂暴衝向目標加攻速。她是全遊戲第一拆塔王——放她單人帶線10秒她能拆到高地。零位移、除大招減速外零控制、零爆發——傷害靠機器人海持續輸出。',
      },
      points: [
        { en: '**Damage source:** Pure magic sustained via minion swarm. Skill 2 minions deal the majority of her damage — she is useless without them. Ultimate marks targets for focused minion aggro. Zero physical, zero true damage.', 'zh-TW': '**傷害來源：** 純法術透過機器人海持續輸出。二技能機器人是主要傷害——沒機器人她就沒用。大招標記讓機器人集火。零物理、零真傷。' },
        { en: '**Power spike:** Level 4 — Ultimate turns minion swarm into a killing machine. Sage\'s Tome + Venomous Staff (2 items) gives her enough AP to make minions threatening.', 'zh-TW': '**強勢期：** 4級——大招讓機器人海變殺人機器。賢者之書+夢魘之牙（2件）給足法強讓機器人有威脅。' },
        { en: '**Key weakness:** Without minions, she is the weakest champion in the game — only basic attacks and weak Skill 1. Minions die to AoE instantly. Zero mobility, zero self-peel. Any assassin or diver kills her for free.', 'zh-TW': '**核心弱點：** 沒機器人她就是全遊戲最弱——只有普攻和廢一技能。機器人被AOE秒清。零位移、零自保。任何刺客或衝臉都免費殺。' },
        { en: '**Laning phase:** Strong push pressure from level 2 — summons minions, shoves wave, pressures tower. Weak against AoE mages who clear her minions instantly. Cannot roam — she must stay in lane to maintain minion count.', 'zh-TW': '**對線期：** 2級開始推線壓力——召機器人、推線、壓塔。怕AOE法師秒清機器人。無法遊走——必須待線上維持機器人數量。' },
      ],
    },
    bestCounter: {
      hero: 'allain',
      advantage: 5.0,
      reasons: [
        { en: "Allain dives Milady directly — her minions can't body-block a gap-closer. He kills her in one rotation before her minions deal any meaningful damage.", 'zh-TW': '亞連直接衝米萊狄——機器人卡不住位移英雄。一套連招在她機器人打出有意義傷害前就殺了她。' },
        { en: "Allain's AoE abilities clear Milady's minion swarm instantly — her entire damage source disappears in one ability cycle.", 'zh-TW': '亞連範圍技能秒清米萊狄機器人海——她的全部傷害來源一個技能循環就沒了。' },
        { en: "Milady has zero mobility and zero self-peel — Allain lands every ability for free. She can't escape his engage.", 'zh-TW': '米萊狄零位移零自保——亞連所有技能全中。她跑不掉他的進場。' },
      ],
    },
    counterDetails: [
      { hero: 'allain', reason: { en: 'Dive ignores minion wall. AoE clears swarm instantly. Milady has zero response to gap-close.', 'zh-TW': '衝臉無視機器人牆。範圍技能秒清海。米萊狄對位移零反制。' }, tags: [{ en: 'Dive Bypass', 'zh-TW': '衝臉穿過' }, { en: 'AoE Clear', 'zh-TW': 'AOE清場' }] },
      { hero: 'fuzi', reason: { en: "Ultimate tethers Milady in place — she can't kite or escape. Minions can't save her. Single-target lockdown = guaranteed death.", 'zh-TW': '大招束縛米萊狄原地——不能風箏不能逃。機器人救不了。單體鎖定=必死。' }, tags: [{ en: 'Tether Lock', 'zh-TW': '束縛鎖' }, { en: 'Single-Target Kill', 'zh-TW': '單體必殺' }] },
      { hero: 'haya', reason: { en: 'Stealth + blink into backline — Milady dies before she can summon minions. Her slow summon animation is her death sentence.', 'zh-TW': '隱身+瞬移進後排——米萊狄在召喚機器人前就死。召喚動畫慢=死刑。' }, tags: [{ en: 'Stealth Assassin', 'zh-TW': '隱身刺客' }, { en: 'Pre-Summon Kill', 'zh-TW': '召喚前殺' }] },
    ],
    metaTrend: {
      summary: {
        en: "Milady has a concerning 49.09% WR with 1.97% pick rate — below the 50% threshold for a specialist. She is a 'win-more' champion: thrives when her team is ahead (more kills = more passive minions = more towers) but is completely useless from behind. AoE mage meta (Xiao Qiao, Angela, Wang Zhaojun) hard counters her minion-dependent playstyle.",
        'zh-TW': '米萊狄49.09%勝率+1.97%選取率——低於50%門檻。她是"順風更順"英雄：隊伍領先時起飛（更多擊殺=更多被動機器人=更多塔），逆風時完全沒用。AOE法師版本（小喬、安琪拉、王昭君）硬康她的機器人依賴。',
      },
      reasons: [
        { en: 'Popular AoE mages (Angela, Xiao Qiao, Wang Zhaojun) clear her minion swarm with one ability — her entire kit is neutralized by meta mid-laners.', 'zh-TW': '熱門AOE法師（安琪拉、小喬、王昭君）一個技能清光機器人海——整套技能被版本中路廢掉。' },
        { en: "She cannot contribute from behind. Her minion damage scales with AP — if she's behind, minions deal negligible damage and die to tower shots.", 'zh-TW': '逆風零貢獻。機器人傷害吃法強——落後時機器人打人跟刮痧一樣，被塔秒殺。' },
        { en: 'Excellent split-pusher but terrible teamfighter. In a meta that favors 5v5 dragon fights, a split-push specialist is a liability.', 'zh-TW': '極強分推但極差團戰。在偏愛5v5龍團的版本，分推專家是拖累。' },
      ],
    },
    why: [
      { en: 'Minion-dependent — AoE clears her entire damage source instantly. Fight her after she summons minions (they die to AoE), not before.', 'zh-TW': '依賴機器人——AOE瞬間清光全部傷害來源。等她召機器人後打（機器人會被AOE秒），別在她召之前打。' },
      { en: 'Zero mobility — the easiest gank target in mid lane. Any jungler with a gap-closer kills her if she ever leaves tower range.', 'zh-TW': '零位移——中路最好抓的目標。任何有位移的打野在她出塔範圍就能殺。' },
      { en: 'Ultimate marks a target for minion focus — if you kill the minions or move out of range, her Ult does nothing.', 'zh-TW': '大招標記目標讓機器人集火——殺掉機器人或走出範圍，她大招就廢了。' },
    ],
    mistakes: [
      { en: 'Ignoring her in a side lane → in 10 seconds, she takes your tower. Always match her split push — send one person to clear her wave.', 'zh-TW': '放任她邊線帶線 → 10秒拆你塔。永遠要有人對位——派一個人去清她兵線。' },
      { en: "Trying to out-push her with a non-AoE champion → her minions outnumber you. Pick AoE or you'll lose every trade.", 'zh-TW': '用非AOE英雄跟她比推線 → 機器人數量碾壓。不出AOE就每次都輸線。' },
      { en: 'Diving her tower without clearing minions first → her minion swarm + tower shots melt you. Clear minions → dive.', 'zh-TW': '不清機器人就衝塔 → 機器人海+塔傷融化你。先清機器人→再衝。' },
    ],
    faqUltimate: { en: "Milady's Ultimate marks a target — all minions frenzy towards them with bonus AS. Kill her minions (they're fragile) immediately after Ult cast. Walk out of her minion range — they don't chase beyond ~800 units. If you're the target, your team should AoE clear the swarm.", 'zh-TW': '米萊狄大招標記目標——所有機器人狂暴衝向目標加攻速。大招生效後立刻清機器人（很脆）。走出機器人追擊範圍（~800碼）。如果你是目標，隊友該AOE清海。' },
    faqItems: { en: 'AoE damage items are key. Tanks: Blazing Cape passive kills minions passively. Mages: any AoE ability clears swarm. Anti-heal not needed — she has no sustain.', 'zh-TW': 'AOE傷害裝是關鍵。坦克：紅蓮斗篷被動被動殺機器人。法師：任何AOE技能清海。重傷不需要——她沒續航。' },
    faqWho: { en: 'Allain (#1) — dive + AoE clear. Fuzi — tether lock. Haya — stealth backline delete.', 'zh-TW': '亞連（頭號天敵）——衝臉+AOE清。老夫子——束縛鎖。颯——隱身切後秒。' },
    faqHowToLane: { en: 'Pick AoE mage (Angela, Xiao Qiao) — clear her minions + wave simultaneously. Freeze wave near your tower to deny her siege. Call jungle ganks: she has zero escape. Kill her minions before trading.', 'zh-TW': '選AOE法師（安琪拉、小喬）——同時清機器人和兵線。控線在塔前阻止她推塔。叫打野抓：她零逃生。換血前先殺機器人。' },
    faqSeason: { en: "Niche pick only. Viable as counter to non-AoE mid-laners. Low elo: nobody matches her split push, free towers. Diamond+: opponents pick AoE, clear minions, and she's useless. Only pick if your team needs siege pressure and enemy mid has no wave clear.", 'zh-TW': '特殊場合才能出。非AOE中路的counter。低分段：沒人對位分推，免費拆塔。鑽石以上：對手選AOE、清機器人，她就廢了。只有團隊需要推塔壓力和敵方中路沒清線能力才選。' },
  },

  'aoyin': {
    playstyle: {
      summary: {
        en: "Ao'yin is a critical-strike Marksman dealing **Physical crit damage** with **dragon-form transformation**. His passive (Hidden Dragon) grants bonus damage when attacking from stealth or after using abilities. Skill 1 (Flaming Palm) is an AoE wave of fire. Skill 2 (Downpour) fires a rain of arrows in an area. His Ultimate (Infinite Vastness) transforms him into a dragon, granting massive range increase, AoE auto-attacks, and bonus crit damage for a duration. He is a late-game hypercarry — weak early, unstoppable at 4+ items. Zero mobility outside Ultimate movespeed, zero CC, zero sustain. Entirely dependent on crit items and protection from his team.",
        'zh-TW': '敖隱是暴擊型射手，造成**物理暴擊傷害**，核心是**龍形態變身**。被動潛龍在淵隱身或放技能後攻擊有額外傷害。一技能烈焰掌是火焰波AOE。二技能暴雨射箭雨。大招無垠浩瀚化身為龍——大幅加射程、AOE普攻、額外暴擊傷害。他是大後期超級Carry——前期弱、4件裝後無敵。除大招加速外零機動、零控制、零續航。完全依賴暴擊裝和隊友保護。',
      },
      points: [
        { en: '**Damage source:** Physical crit burst. Auto-attack based hypercarry — all damage comes from crit-enhanced basic attacks. Ultimate dragon form amplifies range and AoE.', 'zh-TW': '**傷害來源：** 物理暴擊爆發。普攻型超級Carry——所有傷害來自暴擊強化普攻。大招龍形態加射程和AOE。' },
        { en: '**Power spike:** Eternity Blade + Master Sword + Overlord\'s Might (3 crit items). Crit chance caps out, auto-attacks delete squishies in 2-3 hits. Late-game insurance policy.', 'zh-TW': '**強勢期：** 無盡戰刃+宗師之力+霸王之力（3件暴擊）。暴擊率滿、普攻2-3下秒脆皮。後期保險單。' },
        { en: '**Key weakness:** Extremely weak early — loses lane to every meta marksman. Zero mobility — Flash is only escape. Total team-dependence — without peel, any assassin kills him for free. Long ramp-up time to relevance.', 'zh-TW': '**核心弱點：** 前期極弱——對線輸給所有版本射手。零機動——閃現是唯一逃生。完全依賴團隊——沒人保護任何刺客都免費殺。發育期極長。' },
        { en: '**Laning phase:** Worst early game among all marksmen. Just survive and farm — don\'t trade, don\'t fight. Your win condition is reaching 3 items without dying more than twice.', 'zh-TW': '**對線期：** 所有射手中前期最弱。活下來發育——別換血、別打架。贏的條件是3件裝前死亡不超過2次。' },
      ],
    },
    bestCounter: {
      hero: 'kaizer',
      advantage: 4.5,
      reasons: [
        { en: "Kaizer dives Ao'yin with Ultimate transformation — one-shots him before he can auto-attack twice. Ao'yin's zero mobility means Kaizer never misses.", 'zh-TW': '鎧開大變身衝敖隱——敖隱普攻不到兩下就被秒。敖隱零機動意味著鎧永遠不miss。' },
        { en: "Ao'yin needs 3+ items to deal damage — Kaizer's early-mid pressure ends the game before Ao'yin comes online.", 'zh-TW': '敖隱需要3件裝才有傷害——鎧前中期壓力在敖隱上線前就結束遊戲。' },
        { en: "Kaizer's damage reduction during Ultimate completely negates Ao'yin's crit burst. Ao'yin cannot kill Kaizer even with full build.", 'zh-TW': '鎧大招減傷完全廢掉敖隱暴擊爆發。敖隱六神裝也殺不了鎧。' },
      ],
    },
    counterDetails: [
      { hero: 'kaizer', reason: { en: "Ult dive + damage reduction negates Ao'yin's crit. Early pressure ends game before Ao'yin scales. Zero escape = guaranteed kill.", 'zh-TW': '大招衝臉+減傷廢掉暴擊。前期壓力在敖隱發育前結束遊戲。零逃生=必殺。' }, tags: [{ en: 'Dive Threat', 'zh-TW': '衝臉威脅' }, { en: 'Early End', 'zh-TW': '前期終結' }] },
      { hero: 'dun', reason: { en: "Sustain + shield outlasts Ao'yin's entire damage window. Ultimate charge closes gap instantly. Ao'yin can't escape.", 'zh-TW': '續航+護盾拖過敖隱全部傷害窗口。大招衝鋒瞬間貼臉。敖隱跑不掉。' }, tags: [{ en: 'Out-Sustain', 'zh-TW': '續航碾壓' }, { en: 'Gap Close', 'zh-TW': '貼臉' }] },
      { hero: 'arthur', reason: { en: "Ultimate jump + silence prevents Ao'yin from using abilities or Flash. Delete combo kills before silence ends.", 'zh-TW': '大招跳+沉默讓敖隱放不出技能和閃現。整套在沉默結束前秒殺。' }, tags: [{ en: 'Silence Lock', 'zh-TW': '沉默鎖' }, { en: 'Jump Engage', 'zh-TW': '跳躍進場' }] },
    ],
    metaTrend: {
      summary: {
        en: "Ao'yin has 48.56% WR with 1.47% pick rate — underperforming even for a hypercarry. He is the ultimate 'protect the president' champion but current dive-heavy meta (Kaizer, Dun, Arthur everywhere) makes his life miserable. Late-game insurance is less valuable when games end faster.",
        'zh-TW': '敖隱48.56%勝率+1.47%選取率——對超級Carry來說也偏弱。他是終極"保總裁"英雄但當前衝臉版本（鎧、夏侯惇、亞瑟滿街跑）讓他生不如死。遊戲結束更快時後期保障價值降低。',
      },
      reasons: [
        { en: "Tank/dive meta directly counters his hypercarry playstyle. Kaizer, Dun, and Arthur all jump on Ao'yin and he can't escape or out-trade them.", 'zh-TW': '坦克/衝臉版本直接克制超級Carry打法。鎧、夏侯惇、亞瑟都跳敖隱的臉，他跑不掉也換不贏。' },
        { en: "48.56% WR reflects his feast-or-famine nature. If his team wins early 4v5 (while he farms), he carries late. If they lose early, he's dead weight.", 'zh-TW': '48.56%勝率反映極端性。隊友前期4v5打贏（他發育）他後期Carry。前期輸了他就是負重。' },
        { en: 'Other hypercarries (Garo, Hou Yi) offer more utility (AoE slow, global Ult) while scaling similarly. Ao\'yin offers only damage.', 'zh-TW': '其他超級Carry（伽羅、后羿）提供更多功能（AOE減速、全圖大）同時發育曲線類似。敖隱只提供傷害。' },
      ],
    },
    why: [
      { en: 'Worst early game of any marksman — every meta ADC bullies him in lane. Falls 20-30 CS behind by 10 minutes if jungler doesn\'t camp.', 'zh-TW': '所有射手中前期最弱——每個版本ADC都能線上霸凌他。打野不蹲的話10分鐘落後20-30兵。' },
      { en: 'Zero self-peel — no dash, no CC, no slow. 100% team-dependent. If your support roams, you die under tower.', 'zh-TW': '零自保——沒位移、沒控制、沒減速。100%依賴團隊。輔助遊走你就塔下死。' },
      { en: 'Needs 3+ items to deal meaningful damage. Games in current meta are often decided by 15 minutes — before his power spike.', 'zh-TW': '需要3件裝才有有意義傷害。當前版本遊戲常在15分鐘前就決定——在他強勢期之前。' },
    ],
    mistakes: [
      { en: "Letting him free-farm → Ao'yin's win condition is reaching 3 items without dying. Deny his farm, camp his lane, end early.", 'zh-TW': '放任自由發育 → 敖隱的勝利條件是3件裝前不死。壓制發育、蹲他線、前期結束。' },
      { en: "Not diving him in teamfights → Ao'yin in dragon form with full build melts your entire team in 5 seconds. He is priority #1 target.", 'zh-TW': '團戰不衝他 → 龍形態滿裝敖隱5秒融化你全隊。他是第一優先目標。' },
      { en: "Picking a scaling comp against Ao'yin → he outscales everyone. Pick early-game comps and end before 20 minutes.", 'zh-TW': '選發育陣容打敖隱 → 他發育比誰都強。選前中期陣容20分鐘前結束。' },
    ],
    faqUltimate: { en: "Ao'yin's dragon form gives massive range + AoE autos. He is immobile during transformation — dive him immediately. DO NOT group together — his AoE autos shred clumped teams. Spread formation, flank him, delete him before transformation ends.", 'zh-TW': '敖隱龍形態大幅加射程+AOE普攻。變身時無法移動——立刻衝他。別抱團——AOE普攻拆密集站位。散開陣型、繞後、在變身結束前秒他。' },
    faqItems: { en: "Armor stacking (Ominous Premonition, Sage's Sanctuary) over HP — he builds crit + armor pen. Frozen Heart / Frigid Charge attack-speed slow cripples his DPS. GA/Resurrection revives after he commits Ultimate.", 'zh-TW': '堆物防優先血量（不祥徵兆、賢者的庇護）——他出暴擊+物穿。冰心/冰霜衝擊減攻速砍他DPS。復活甲在他交大招後復活。' },
    faqWho: { en: 'Kaizer (#1) — Ult dive + damage reduction negates crit. Dun — sustain outlasts + charge gap-close. Arthur — jump + silence = dead.', 'zh-TW': '鎧（頭號天敵）——大招衝+減傷廢暴擊。夏侯惇——續航拖+衝鋒貼臉。亞瑟——跳+沉默=死。' },
    faqHowToLane: { en: "Bully him from level 1 — he has the weakest level 1 of any marksman. Freeze wave, deny every CS. Call jungle to dive him pre-6. If you can't kill him, make sure he leaves lane 30 CS behind.", 'zh-TW': '1級就霸凌——他是所有射手中1級最弱。控線、不讓他補兵。叫打野6級前衝塔。殺不了也要讓他落後30兵離開線上。' },
    faqSeason: { en: "Not recommended for solo queue — too team-dependent. Only pick with a dedicated peel support (Zhang Fei, Dyadia) and when enemy lacks dive. Low elo: nobody ends games early, so you'll eventually scale. High elo: enemy closes game at 15 min while you're still on 2 items.", 'zh-TW': '不推薦單排——太依賴團隊。只有專屬保排輔助（張飛、少司緣）和對面缺乏衝臉才選。低分段：沒人前期結束，你最終能發育起來。高分段：敵方15分鐘結束遊戲時你才2件裝。' },
  },

  'augran': {
    playstyle: {
      summary: {
        en: 'Augran is a Fighter jungler dealing **Physical damage** with **soul-harvesting sustain**. His passive (Soul Resonance) collects souls from dead enemies (minions, monsters, champions) to enhance his abilities. Skill 1 (Path of Passing) is a dash that leaves a trail — enemies on the trail are slowed and take damage over time. Skill 2 (Death\'s Precipice) is an AoE slash around him. His Ultimate (Conductor of Souls) is a massive AoE explosion that deals damage based on collected souls and heals him. He is a scaling jungler — starts weak but becomes a sustain monster in the mid-late game with enough souls. Hybrid damage build potential (physical + on-hit magic). Zero hard CC outside minor slows, no true damage.',
        'zh-TW': '大司命是戰士打野，造成**物理傷害**，核心是**靈魂收集續航**。被動魂之共鳴收集死亡敵方靈魂（小兵、野怪、英雄）強化技能。一技能通幽之徑衝刺留下軌跡——軌跡上敵方減速+持續傷害。二技能魂斷之崖範圍斬擊。大招絕斷之魂巨大AOE爆炸傷——傷害按收集靈魂量計算並治療自己。他是成長型打野——前期弱、中後期靈魂夠了變續航怪物。可走混傷路線（物理+命中法傷）。除輕微減速外零硬控、零真傷。',
      },
      points: [
        { en: '**Damage source:** Physical + on-hit magic (hybrid build). Soul collection enhances all abilities. Extended fights favor him — more dead units = more souls = more damage/healing.', 'zh-TW': '**傷害來源：** 物理+命中法傷（混傷路線）。收集靈魂強化所有技能。持久戰利於他——更多死亡單位=更多靈魂=更多傷害/治療。' },
        { en: '**Power spike:** Doomsday + Succubus Cloak (2 items) — hybrid on-hit damage comes online plus sustain. Mid-game skirmish monster with enough souls.', 'zh-TW': '**強勢期：** 末世+不死鳥之眼（2件）——混傷命中上線+續航。靈魂夠了就是中期混戰怪物。' },
        { en: '**Key weakness:** Weak early clear and dueling. Needs souls to function — fighting him away from minions/monsters denies his sustain. Low base damage without soul stacks. No hard CC — can\'t lock down mobile targets.', 'zh-TW': '**核心弱點：** 前期清野和單挑弱。需要靈魂運作——在沒小兵/野怪的地方打他斷續航。沒靈魂堆疊傷害低。零硬控——鎖不住機動性目標。' },
        { en: '**Jungle phase:** Slow first clear — vulnerable to invades. Power farms to Level 6 for Ultimate spike. Avoids early skirmishes until 2+ items.', 'zh-TW': '**打野期：** 第一輪清野慢——怕入侵。刷到6級等大招進化。2件裝前避免早期混戰。' },
      ],
    },
    bestCounter: {
      hero: 'liu-bei',
      advantage: 4.8,
      reasons: [
        { en: "Liu Bei's burst damage kills Augran before his soul-healing can ramp up. Augran needs time to collect souls and sustain — Liu Bei doesn't give him time.", 'zh-TW': '劉備爆發傷害在大司命靈魂回血疊起來前就殺了他。大司命需要時間收集靈魂續航——劉備不給時間。' },
        { en: "Liu Bei's Ultimate shield absorbs Augran's initial burst — the fight is over before Augran's sustain kicks in.", 'zh-TW': '劉備大招護盾吃掉大司命第一波爆發——在續航生效前戰鬥就結束了。' },
        { en: 'Liu Bei fights Augran in his own jungle early — Augran has the weakest early clear among junglers and cannot defend invades.', 'zh-TW': '劉備前期入侵大司命野區——大司命是所有打野中前期清野最慢的，無法防入侵。' },
      ],
    },
    counterDetails: [
      { hero: 'liu-bei', reason: { en: 'Burst outpaces soul-sustain. Ultimate shield negates initial damage. Early invade crushes Augran\'s weakest phase.', 'zh-TW': '爆發在靈魂續航前殺人。大招護盾廢掉第一波傷害。前期入侵碾壓最弱時期。' }, tags: [{ en: 'Pre-Sustain Burst', 'zh-TW': '續航前爆發' }, { en: 'Early Invade', 'zh-TW': '前期入侵' }] },
    ],
    metaTrend: {
      summary: {
        en: "Augran has the lowest WR among top30 at 46.95% — deeply struggling in the current meta. His soul-collection mechanic is too slow for fast-paced games. By the time he has enough souls to be relevant, enemy junglers (Gao Changgong, Han Xin) have already snowballed the game. He's a 'win-more' jungler — great when ahead, useless from behind.",
        'zh-TW': '大司命46.95%勝率是top30中最低——當前版本嚴重掙扎。靈魂收集機制對快節奏遊戲太慢。等他靈魂夠了，敵方打野（高長恭、韓信）已經滾雪球了。他是"順風更順"型打野——領先時強、落後廢。',
      },
      reasons: [
        { en: 'Fast-paced meta punishes his slow scaling. Enemy junglers gank lanes at Level 3 while Augran is still clearing his second camp.', 'zh-TW': '快節奏版本懲罰他慢發育。敵方打野3級抓人時大司命還在打第二攤野。' },
        { en: "46.95% WR reflects his feast-or-famine jungle path. Without early kills or successful invades, he's 1-2 levels behind the enemy jungler permanently.", 'zh-TW': '46.95%勝率反映極端性。沒前期頭或入侵成功，永遠落後敵方打野1-2級。' },
        { en: 'Soul mechanic is interesting but impractical — you need units dying near you constantly, which only happens in winning teamfights.', 'zh-TW': '靈魂機制有趣但不實用——需要單位一直在身邊死，這只在打贏團戰時發生。' },
      ],
    },
    why: [
      { en: 'Slowest early clear among meta junglers — vulnerable to invades. If enemy jungler steals his blue buff at Level 1, Augran is useless for 5 minutes.', 'zh-TW': '版本打野中前期清野最慢——怕入侵。敵方打野1級偷藍，大司命就廢5分鐘。' },
      { en: 'Soul-dependent — forced to fight around minion waves and monster camps. Cannot skirmish in river or jungle corridors without soul sources.', 'zh-TW': '依賴靈魂——被迫圍繞小兵線和野怪營地打架。沒靈魂來源無法在河道或野區走廊打。' },
      { en: 'Zero hard CC, zero burst — cannot gank effectively. Compare to Gao Changgong (stealth + stun) or Han Xin (multi-dash + knockup).', 'zh-TW': '零硬控、零爆發——無法有效抓人。對比高長恭（隱身+暈）或韓信（多段位移+擊飛）。' },
    ],
    mistakes: [
      { en: "Not invading his jungle early → Augran's first clear is painfully slow and low HP. Any early invade steals his camps and sets him permanently behind.", 'zh-TW': '前期不入他野區 → 大司命第一輪清野極慢+低血量。任何早期入侵偷野讓他永久落後。' },
      { en: 'Fighting him in a minion wave → every minion death gives him souls (heal + damage). Pull him away from minions before fighting.', 'zh-TW': '在小兵堆裡跟他打 → 每個小兵死都給他靈魂（回血+傷害）。把他拉出小兵堆再打。' },
      { en: 'Letting him scale to 3+ items → he becomes a sustain monster. Close the game before 20 minutes or he\'ll outlast your entire team.', 'zh-TW': '讓他發育到3件裝+ → 他變續航怪物。20分鐘前結束遊戲，否則他拖死你全隊。' },
    ],
    faqUltimate: { en: "Augran's Ultimate is a massive AoE explosion with healing. Spread formation — the AoE radius is large. Grievous Wounds cuts the heal by half. He can cast it while moving — don't think you can outrun it. Flashing out of the AoE circle is better than trying to tank through it.", 'zh-TW': '大司命大招是巨大AOE爆炸+治療。散開站位——AOE半徑很大。重傷減治療一半。他邊走邊放——別想跑掉。閃現出圈比扛過去好。' },
    faqItems: { en: 'Grievous wounds mandatory — Venomous Staff, Succubus Cloak. HP stacking over resistances — his damage is mixed. Slow items prevent him from chasing down kills.', 'zh-TW': '重傷必備——夢魘之牙、制裁之刃。堆血量優先抗性——他混傷。減速裝阻止他追殺。' },
    faqWho: { en: 'Liu Bei (#1) — early invade + burst before sustain.', 'zh-TW': '劉備（頭號天敵）——前期入侵+續航前爆發。' },
    faqHowToLane: { en: "Aggressively invade his jungle pre-6. Ward his camps. Ping your jungler to counter-jungle him. If you're the jungler, start at his blue buff — he can't contest.", 'zh-TW': '6級前積極入侵他野區。插眼他營地。叫打野反野。如果你是打野，從他藍BUFF開始——他搶不了。' },
    faqSeason: { en: "Not recommended in current meta. 46.95% WR speaks for itself. Only play in normals or if you're significantly better than your rank. Requires team coordination for invades and peel — terrible in solo queue.", 'zh-TW': '當前版本不推薦。46.95%勝率說明一切。只有匹配或技術明顯高於段位才玩。需要團隊配合入侵和保護——單排災難。' },
  },

  'yaria': {
    playstyle: {
      summary: {
        en: 'Yaria is an enchanter Support with **attach-and-buff mechanics**, dealing **Magic damage** but serving primarily as a buff multiplier. Her passive (Deer Spirit) grants bonus movespeed. Skill 1 (Wandering Beam) fires a bouncing energy orb that damages and slows enemies. Skill 2 (Accelerating Blitz) grants AoE movespeed + attack speed to nearby allies. Her Ultimate (Verdant Protector) is her signature: she **attaches to an ally**, becoming untargetable while granting them a massive shield and bonus stats. While attached, her Skill 1 and 2 still fire from the host. She is the "ride or die" support — if her host dies, she falls off and is instantly vulnerable. Zero damage output on her own, zero wave clear, zero hard CC besides a minor slow.',
        'zh-TW': '瑤是附身型輔助，造成**法術傷害**但主要功能是增益乘數。被動鹿靈加移速。一技能若有人兮發射彈跳能量球造成傷害+減速。二技能風颯木蕭給周圍隊友AoE移速+攻速。大招獨立兮山之上是招牌：**附身隊友**，自身無法被選中同時給隊友巨額護盾+額外屬性。附身時一、二技能仍從宿主身上施放。她是"共生"型輔助——宿主死了她就掉下來立刻脆弱。零獨立輸出、零清線能力、除輕微減速外零硬控。',
      },
      points: [
        { en: '**Core mechanic:** Ultimate attaches to an ally — becomes untargetable, grants shield + stats. Abilities cast from host position. Detaches if host dies or shield breaks.', 'zh-TW': '**核心機制：** 大招附身隊友——自身無法被選中，給護盾+屬性。技能從宿主位置施放。宿主死亡或護盾破了就脫離。' },
        { en: '**Power spike:** Level 4 — attachment transforms any diver into an unkillable raid boss. Dawnlight + Overlord\'s Platemail (2 items) gives enough durability to survive if detached.', 'zh-TW': '**強勢期：** 4級——附身讓任何衝臉變成打不死的Boss。旭日初光+霸主鎧甲（2件）給脫離時足夠存活。' },
        { en: '**Key weakness:** Completely useless without a host — no damage, no tankiness, no wave clear. If her attached ally dies, she\'s a free kill. Hard countered by AoE burst that kills both her and the host simultaneously.', 'zh-TW': '**核心弱點：** 沒宿主完全沒用——零傷害、零坦度、零清線。附身對象死了就是免費人頭。被同時殺兩人的AoE爆發硬克。' },
        { en: '**Roaming phase:** Weak pre-4 — only minor slow and speed boost. Post-4 transforms any fed ally into a hypercarry. Best paired with aggressive divers (Wukong, Musashi, Kaizer).', 'zh-TW': '**遊走期：** 4級前弱——只有小減速和加速。4級後把任何肥的隊友變超級Carry。最佳搭檔是激進衝臉（悟空、宮本、鎧）。' },
      ],
    },
    bestCounter: {
      hero: 'dolia',
      advantage: 3.5,
      reasons: [
        { en: "Dolia's Ultimate resets her ally's cooldowns — effectively doubling their damage output. Yaria's shield can't absorb two Ult rotations.", 'zh-TW': '朵莉亞大招重置隊友CD——實質雙倍輸出。瑤的護盾扛不住兩套大招。' },
        { en: 'Dolia in water form has AoE autos + regen — out-sustains Yaria\'s minor poke. Yaria cannot pressure Dolia in lane.', 'zh-TW': '朵莉亞人魚形態AOE普攻+回血——續航碾壓瑤的小消耗。瑤無法線上施壓。' },
        { en: 'Dolia amplifies her team\'s power more than Yaria does — double Ult outvalues the shield from Yaria\'s attachment.', 'zh-TW': '朵莉亞放大團隊力量超過瑤——雙大招價值超過附身護盾。' },
      ],
    },
    counterDetails: [
      { hero: 'dolia', reason: { en: 'Double Ult outvalues shield. Water form out-sustains poke. Team multiplier > single-target buffer.', 'zh-TW': '雙大招價值超過護盾。人魚形態續航碾壓消耗。團隊乘數>單體增益。' }, tags: [{ en: 'Out-Value', 'zh-TW': '價值碾壓' }, { en: 'Sustain Win', 'zh-TW': '續航贏' }] },
      { hero: 'wukong', reason: { en: "Burst kills Yaria and her host simultaneously — AoE Ultimate stun catches both. Skill 1 invincibility blocks her Skill 1 slow.", 'zh-TW': '爆發同時秒瑤和宿主——大招範圍暈抓到兩個。一技能無敵擋她減速。' }, tags: [{ en: 'Double Kill', 'zh-TW': '雙殺' }, { en: 'AoE Lockdown', 'zh-TW': '範圍鎖' }] },
      { hero: 'musashi', reason: { en: 'Point-click Ult locks Yaria or her host — forces her to detach or die together. Single-target burst overwhelms her shield.', 'zh-TW': '指向大招鎖定瑤或宿主——逼她脫離或一起死。單體爆發淹沒護盾。' }, tags: [{ en: 'Point-Click Lock', 'zh-TW': '指向鎖定' }, { en: 'Shield Break', 'zh-TW': '破盾' }] },
    ],
    metaTrend: {
      summary: {
        en: 'Yaria has 48.48% WR with 1.15% pick rate — below average for a support. She is entirely dependent on having at least one fed teammate to attach to. In solo queue, this is unreliable. She is a "win-more" support: if your team is ahead, she makes the carry unkillable. If behind, she provides nothing. Burst meta (Wukong, Musashi) kills her and her host together.',
        'zh-TW': '瑤48.48%勝率+1.15%選取率——輔助中偏低。完全依賴至少一個肥的隊友附身。單排不可靠。"順風更順"型輔助：隊伍領先時讓Carry打不死。落後時零貢獻。爆發版本（悟空、宮本）同時殺她和宿主。',
      },
      reasons: [
        { en: 'Her win rate is dragged down by solo queue inconsistency. Yaria is a duo-queue champion — her effectiveness depends entirely on her partner.', 'zh-TW': '勝率被單排不穩定拖累。瑤是雙排英雄——效率完全取決於搭檔。' },
        { en: 'Burst assassins (Wukong, Musashi, Gao Changgong) kill both Yaria and her host in one rotation — her shield absorbs only one ability, not the full combo.', 'zh-TW': '爆發刺客（悟空、宮本、高長恭）一套同時殺瑤和宿主——護盾只扛一個技能，不是整套連招。' },
        { en: 'Better enchanter supports exist. Dyadia provides team-wide shield + mobility. Dolia resets Ultimate cooldowns. Yaria only buffs one person.', 'zh-TW': '有更好的附身輔助存在。少司緣給全隊護盾+機動。朵莉亞重置大招CD。瑤只增益一個人。' },
      ],
    },
    why: [
      { en: "Completely dependent on host — if her team has no fed carry, Yaria has nobody useful to attach to. She can't create leads, only amplify existing ones.", 'zh-TW': '完全依賴宿主——隊伍沒肥的Carry，瑤就沒人可附身。她不能創造優勢，只能放大既有優勢。' },
      { en: 'Falls off instantly when host dies — becomes the squishiest champion in the game with zero escape tools.', 'zh-TW': '宿主死就立刻廢掉——變成全遊戲最脆英雄且零逃生。' },
      { en: 'Zero independent playmaking — no engage, no pick potential, no split push. Can only follow her team and hope they carry.', 'zh-TW': '零獨立戰術——沒開戰、沒抓人、沒分推。只能跟團隊祈禱他們Carry。' },
    ],
    mistakes: [
      { en: "Focusing Yaria instead of her host → she's untargetable while attached. Kill the host first — she falls off and dies for free.", 'zh-TW': '打瑤不打宿主 → 她附身時無法選中。先殺宿主——她掉下來免費死。' },
      { en: "Letting her re-attach after being knocked off → her Ultimate has a cooldown after detachment. Collapse on her during this window before she finds a new host.", 'zh-TW': '讓她脫離後重新附身 → 大招脫離後有CD。在這段窗口集火她，在她找到新宿主前殺掉。' },
      { en: "Picking single-target damage into Yaria → her shield blocks the initial hit. Pick AoE or DPS champions that overwhelm the shield through sustained damage.", 'zh-TW': '選單體傷害打瑤 → 護盾擋住第一下。選AOE或持續傷害英雄用DPS淹沒護盾。' },
    ],
    faqUltimate: { en: "Yaria's attachment makes her untargetable — you CANNOT hit her. Attack the host only. When the shield breaks or host dies, she detaches and is vulnerable. Save your burst combo for the moment she detaches — she has zero escape tools when not attached.", 'zh-TW': '瑤附身時無法被選中——完全打不到她。只打宿主。護盾破了或宿主死了她脫離變脆弱。留爆發連招等她脫離瞬間——不附身時零逃生。' },
    faqItems: { en: 'AoE damage items to hit both Yaria and host. Burst items (Eternity Blade, Master Sword) to overwhelm her shield in one rotation. No specific anti-Yaria items needed — just kill her host.', 'zh-TW': 'AOE傷害裝同時打瑤和宿主。暴發裝（無盡戰刃、宗師之力）一波淹沒護盾。不需要專門反瑤裝——殺宿主就完事。' },
    faqWho: { en: 'Dolia (#1) — double Ult outvalues shield. Wukong — AoE burst kills both. Musashi — point-click Ult lock.', 'zh-TW': '朵莉亞（頭號天敵）——雙大招價值碾壓護盾。悟空——AOE爆發雙殺。宮本——指向大招鎖定。' },
    faqHowToLane: { en: "Poke her pre-4 — she has the weakest trading among supports. Don't let her safely reach Level 4. If she attaches to an ADC in lane, switch focus to killing the ADC — Yaria can't save them alone.", 'zh-TW': '4級前消耗她——所有輔助中換血最弱。別讓她安全到4級。線上她附身ADC就轉打ADC——瑤一個人救不了。' },
    faqSeason: { en: "Duo queue only. Never pick Yaria in solo queue — you're gambling on random teammates. Low elo: nobody focuses the host, so she feels broken. High elo: host gets deleted, Yaria dies instantly after. Pair with Wukong/Kaizer/Musashi duo for best results.", 'zh-TW': '只雙排。絕不單排選瑤——在賭隨機隊友。低分段：沒人打宿主，她感覺無解。高分段：宿主被秒，瑤也秒死。雙排搭悟空/鎧/宮本最佳。' },
  },
