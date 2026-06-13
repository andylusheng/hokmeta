/* Batch 1: 8 missing heroes with FULL overrides */

  'wang-zhaojun': {
    playstyle: {
      summary: {
        en: 'Wang Zhaojun is a zone-control Mage dealing **Magic Damage** with heavy slows and AoE freezing. Her entire kit revolves around her **Skill 2: Frigid Prison** — a delayed AoE freeze that sets up her entire combo. Once frozen, targets take bonus damage from her follow-up skills. Her Ultimate **Winter is Here** creates a massive snowstorm zone, dealing sustained AoE damage while slowing everyone inside. She is immobile — zero dashes, zero blinks — and relies entirely on positioning and her passive shield to survive.',
        'zh-TW': '王昭君是範圍控制型法師，傷害為**法術傷害**，主打大範圍減速和冰凍。核心機制圍繞**二技能禁錮寒霜**——延遲範圍冰凍，凍住後後續技能傷害增加。大招**凜冬已至**創造超大暴風雪區域，持續AOE傷害+減速圈內所有人。她零機動——無位移無閃爍——完全靠站位和被動護盾保命。',
      },
      points: [
        {
          en: '**Damage source:** Pure magic damage. Skill 2 freeze → Skill 1 + Ultimate combo. Enhanced auto attacks every 3rd hit deal bonus magic damage + slow.',
          'zh-TW': '**傷害來源：** 純法術傷害。二技能冰凍→一技能+大招連招。每第三次強化普攻附帶法傷+減速。',
        },
        {
          en: '**Power spike:** Frosty Revenge + Holy Grail (2 items) — enough CDR to spam Skill 1 poke and Skill 2 freeze attempts. Ultimate cooldown drops significantly.',
          'zh-TW': '**強勢期：** 冰霜法杖+聖杯（2件）——冷卻夠短能狂丟一技能消耗+二技能試凍。大招CD大幅縮短。',
        },
        {
          en: '**Key weakness:** Zero mobility. If you miss Skill 2 freeze, you have NO kill threat and NO escape for 9 seconds. Assassins can punish her hard during the Skill 2 cast delay.',
          'zh-TW': '**核心弱點：** 零位移。二技能沒凍到就完全沒擊殺威脅，也沒逃生，長達9秒空窗期。刺客在她二技能抬手延遲時就能秒她。',
        },
        {
          en: '**Laning phase:** Strong in lane via Skill 1 poke + passive shield trades. But extremely gankable — every jungle gank past level 4 is a kill if her freeze is on cooldown.',
          'zh-TW': '**對線期：** 靠一技能消耗+被動護盾換血在線上有優勢。但極怕抓——只要二技能在CD，4級後打野來一次死一次。',
        },
      ],
    },
    bestCounter: {
      hero: 'li-xin',
      advantage: 3.8,
      reasons: [
        {
          en: 'Dark Form Li Xin gap-closes through her slow zones with his dash — Wang Zhaojun\'s entire kit relies on kiting, and Li Xin denies her the range advantage.',
          'zh-TW': '暗形態李信突進穿越她的減速區——王昭君整套技能靠風箏，李信不給她拉開距離的機會。',
        },
        {
          en: 'Light Form Li Xin outranges her with charged Skill 2 — he can poke her to death from outside her freeze range while she can never walk up to trade.',
          'zh-TW': '光形態李信蓄力二技能手比她長——從她冰凍範圍外就能把她消耗到死，她根本走不上去換血。',
        },
        {
          en: 'Li Xin\'s sustain in both forms means Wang Zhaojun\'s poke is meaningless — he heals back every trade while she has zero sustain outside her passive shield.',
          'zh-TW': '兩種形態都有續航讓王昭君的消耗白打——每次換血他都能回滿，而她除了被動護盾外零回血。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'li-xin',
        reason: {
          en: 'Li Xin counters Wang Zhaojun from both forms. Light Form outranges her freeze setup entirely — he can poke safely with charged Skill 2 from beyond her Skill 2 range. Dark Form gap-closes through her slow zones and bursts her before freeze procs. WZJ relies on keeping enemies at mid-range; Li Xin controls the spacing at all distances.',
          'zh-TW': '李信雙形態克制王昭君。光形態手長完全不吃她冰凍——蓄力二技能從她二技能範圍外安全消耗。暗形態穿過減速區貼臉爆發，不等冰凍生效就秒。王昭君靠中距離拉扯，李信遠近都能控場。',
        },
        tags: [
          { en: 'Range Advantage', 'zh-TW': '手長壓制' },
          { en: 'Gap Close', 'zh-TW': '突進貼臉' },
          { en: 'Dual-Form Sustain', 'zh-TW': '雙形態續航' },
        ],
      },
      {
        hero: 'dharma',
        reason: {
          en: 'Dharma\'s Skill 2 dash + knockup cancels Winter is Here channel — Wang Zhaojun is immobile during her ultimate and Dharma\'s CC chain locks her in place. His Skill 1 shield absorbs her burst trade, and his ultimate kick can push her out of her own snowstorm zone, wasting the entire ultimate.',
          'zh-TW': '達摩二技能位移+擊飛打斷凜冬已至——王昭君大招讀條時無法移動，達摩連控直接罰站。一技能護盾吃爆發，大招踢把她踹出自己的暴風雪圈，大招全廢。',
        },
        tags: [
          { en: 'CC Chain', 'zh-TW': '連控打斷' },
          { en: 'Shield Absorb', 'zh-TW': '護盾吃傷' },
          { en: 'Displacement', 'zh-TW': '擊退' },
        ],
      },
      {
        hero: 'kaizer',
        reason: {
          en: 'Kaizer\'s ultimate grants massive armor and magic resist — Wang Zhaojun\'s entire magic damage combo becomes a tickle. He gap-closes with Skill 1, silences with enhanced auto, and bursts her before freeze procs. WZJ\'s AoE ultimate is useless when Kaizer is in her face with damage reduction.',
          'zh-TW': '鎧大招加雙抗——王昭君全套法術連招直接刮痧。一技能近身，強化普攻沉默，不等冰凍生效就秒。她大招AOE在鎧減傷貼臉時跟沒開一樣。',
        },
        tags: [
          { en: 'Dual Resist', 'zh-TW': '雙抗減傷' },
          { en: 'Gap Close', 'zh-TW': '近身突進' },
          { en: 'Silence Cancel', 'zh-TW': '沉默打斷' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Wang Zhaojun is a solid A-tier control mage at 51.2% win rate. She excels in coordinated teamfights where her AoE freeze and snowstorm zone control objectives. However, the current assassin-heavy jungle meta (Li Xin, Kaizer, Wukong everywhere) punishes her immobility hard. She\'s strong in low-mid elo where enemies walk into her freeze; falls off in Diamond+ where players sidestep and save dashes.',
        'zh-TW': '王昭君51.2%勝率，穩定的A級控制法師。在有配合的團戰中極強——AOE冰凍+暴風雪控龍控塔。但當前刺客打野版本（李信、鎧、悟空滿大街）專門針對她的零機動懲罰。中低分段敵人走路吃冰凍很強；鑽石以上會走位會留位移就廢了。',
      },
      reasons: [
        {
          en: 'High elo players sidestep her Skill 2 freeze consistently — the 0.5s delay is reactable. Low elo enemies walk straight and get frozen every time.',
          'zh-TW': '高分段走位躲二技能冰凍像喝水——0.5秒延遲完全夠反應。低分段直直走天天吃凍。',
        },
        {
          en: 'Assassin junglers are meta-defining right now (Wukong, Li Xin, Kaizer) — all punish her zero mobility. Her ban rate (0.61%) is low because no one fears her.',
          'zh-TW': '刺客打野定義版本（悟空、李信、鎧）——全部針對零位移。禁率0.61%極低因為沒人怕她。',
        },
        {
          en: 'Her zone control is still S-tier for objective fights (Dragon/Tyrant). Smart teams pick her as a counter-engage tool, not a primary carry.',
          'zh-TW': '打龍打主宰的區域控制還是S級。聰明的隊伍把她當反開工具人，不當主C用。',
        },
      ],
    },
    why: [
      {
        en: 'Zero mobility — no dash, no blink, no MS steroid. If her Skill 2 freeze misses, she\'s a sitting duck for 9 seconds. Every assassin in the game feasts on her.',
        'zh-TW': '零機動——無位移無加速無閃爍。二技能沒凍到就等死9秒。全遊戲刺客都能吃她。',
      },
      {
        en: 'Her entire kill threat depends on landing Skill 2 — a delayed AoE skillshot. Dodge it and Wang Zhaojun deals zero meaningful damage for the next 8-9 seconds.',
        'zh-TW': '擊殺威脅完全依賴二技能——一個延遲範圍技能。躲掉後接下來8-9秒王昭君零威脅。',
      },
      {
        en: 'Immobile during Winter is Here channel — any hard CC cancels her ultimate. She must stand still in a game where standing still = death.',
        'zh-TW': '凜冬已至讀條時無法移動——任何硬控都能打斷大招。在一個站樁=死的遊戲裡她必須站樁。',
      },
    ],
    mistakes: [
      {
        en: 'Clumping up when Wang Zhaojun has Skill 2 + Ultimate ready → one freeze = team wipe. Spread formation forces her to choose one target; she can\'t freeze everyone.',
        'zh-TW': '她有二三技能時扎堆 → 一凍全隊融化。分散站位逼她只能凍一個，凍不了所有人。',
      },
      {
        en: 'Diving her when she still has Skill 2 up → walk straight into freeze → she ults + escapes. Bait the freeze first, then engage while it\'s on 9s cooldown.',
        'zh-TW': '二技能還在就沖她臉 → 直直走進冰凍範圍 → 她放大跑路。先騙二技能，9秒CD時再上。',
      },
      {
        en: 'Building pure armor against her → she deals 100% magic damage. Stack magic resist (Sage\'s Sanctuary, Phoenix Tear). Her physical damage is zero — armor is wasted gold.',
        'zh-TW': '出純物防 → 她100%法傷。堆魔抗（賢者庇護、鳳凰淚）。零物理傷害，出物防是浪費錢。',
      },
    ],
    faqUltimate: {
      en: 'Walk out of the snowstorm zone immediately — do NOT fight inside it. The slow + sustained damage will win any extended trade. If she\'s channeling, dive her from behind and CC her to cancel the ultimate. Without her ultimate, Wang Zhaojun is just a slow mage with one skillshot.',
      'zh-TW': '立刻走出暴風雪圈——不要待裡面打。減速+持續傷害讓你換血穩輸。她在讀條就繞後貼臉控住打斷。大招沒了王昭君只是個有一發技能的法師。',
    },
    faqItems: {
      en: '**Tanks:** Magic resist (Sage\'s Sanctuary, Phoenix Tear). **Mages/MM:** Purify to cleanse freeze. **Assassins:** Dive boots + magic resist component to survive her burst rotation. **Key:** Magic resist >> armor — she is 100% magic damage.',
      'zh-TW': '**坦克：** 魔抗（賢者庇護、鳳凰淚）。**法師/射手：** 帶淨化解冰凍。**刺客：** 韌性鞋+小魔抗扛一套。**核心：** 魔抗遠大於物防——她100%法傷。',
    },
    faqWho: {
      en: 'Li Xin (#1 counter) — dual form hard counters her: Light outranges, Dark gap-closes. Dharma — kick cancels ult, CC chain kills. Kaizer — ultimate dual resist makes her damage a tickle, silence cancels her skills.',
      'zh-TW': '李信（頭號天敵）——雙形態完克：光形態手長，暗形態突臉。達摩——踢斷大，連控殺。鎧——大招雙抗讓傷害刮痧，沉默廢技能。',
    },
    faqHowToLane: {
      en: 'Poke with long-range mages (Xiao Qiao, Angela) — Wang Zhaojun must walk up to Skill 1 range. Call jungle ganks after level 4 when she has no escape. Bait her Skill 2 by pretending to engage, dodge it, then all-in while it\'s on cooldown. Never stand in her ultimate zone — instantly reposition.',
      'zh-TW': '用長手法師（小喬、安琪拉）消耗——王昭君必須走近才能一技能。4級後叫打野來抓（她沒位移）。假裝要上騙她二技能，走位躲開，CD時全壓。絕對不要站她大招圈裡——立刻換位。',
    },
    faqSeason: {
      en: 'Bronze–Platinum: Wang Zhaojun is free wins. Players walk straight into freeze, no one sidesteps. Diamond+: she drops to situational pick. Assassins dominate the meta and she\'s first to die in every teamfight. Only pick her if your team needs AoE zone control for objective fights and you have a peel support (Zhang Fei, Yaria).',
      'zh-TW': '青銅~白金：王昭君隨便上分。對面直直走吃冰凍，沒人會走位。鑽石以上：降級成有條件才選。刺客統治版本，會戰第一個死的永遠是她。只有團隊需要打龍佔點且輔助是張飛/瑤這種保人型才拿。',
    },
  },
  'lady-sun': {
    playstyle: {
      summary: {
        en: 'Lady Sun (Sun Shangxiang) is a burst-oriented Marksman dealing **Physical Damage** with enhanced auto attacks. Her entire kit revolves around **Skill 1: Rolling Raid** — a dash that empowers her next basic attack with bonus range and piercing damage. Her passive reduces Skill 1 cooldown with every basic attack, creating a rhythmic "roll → shoot → kite" loop. **Skill 2: Frag Grenade** marks targets with 10% armor reduction for follow-up burst. She is a late-game hypercarry: weak early, unstoppable after 3+ items.',
        'zh-TW': '孫尚香是爆發型射手，傷害為**物理傷害**，依賴強化普攻。核心機制圍繞**一技能翻滾突襲**——位移後強化普攻增加射程和穿透。被動讓每次普攻減一技能CD，形成「翻滾→射擊→拉扯」的節奏。**二技能紅蓮爆彈**標記減甲10%後爆發。後期大核：前期弱，三件裝後無解。',
      },
      points: [
        {
          en: '**Damage source:** Pure physical damage via enhanced auto attacks (Skill 1 + Skill 2 mark). Ultimate is a long-range finisher/execute. No magic damage, no true damage.',
          'zh-TW': '**傷害來源：** 純物理傷害，靠強化普攻（一技能+二技能標記）。大招是遠程收頭終結技。無法傷，無真傷。',
        },
        {
          en: '**Power spike:** Doomsday + Starbreaker (2 items) — enough damage to one-combo squishies. True spike at 3+ items with critical strike chance.',
          'zh-TW': '**強勢期：** 末世+破星錘（2件）——一套能秒脆皮。真正發力在三件以上有暴擊後。',
        },
        {
          en: '**Key weakness:** Rolls INTO danger — her dash is short and goes forward. If she uses Skill 1 aggressively and misses, she\'s stuck in melee range with no escape for 5s.',
          'zh-TW': '**核心弱點：** 翻滾往前衝——位移短且方向是進場。一技能打兇沒打死人就卡在近戰範圍，5秒沒逃生。',
        },
        {
          en: '**Laning phase:** Weak pre-level-4. Relies on Skill 1 poke but burns her escape to trade. Any marksman with sustain out-trades her. She needs gold and levels more than any other marksman.',
          'zh-TW': '**對線期：** 4級前弱。靠一技能消耗但同時交掉位移。任何有續航的射手換血都贏她。她比任何射手都更需要錢和等級。',
        },
      ],
    },
    bestCounter: {
      hero: 'kaizer',
      advantage: 3.5,
      reasons: [
        {
          en: 'Kaizer\'s ultimate grants massive armor — Lady Sun deals pure physical damage and has zero armor penetration built into her kit. She tickles him while his ult is active.',
          'zh-TW': '鎧大招巨量物防——孫尚香純物理傷害，技能不帶穿甲。他開大期間她打在身上跟刮痧一樣。',
        },
        {
          en: 'Kaizer gap-closes with Skill 1 through her Skill 1 roll — she burns her only escape to create distance, and he\'s already on top of her with silence.',
          'zh-TW': '鎧一技能穿過她翻滾——她唯一的位移交掉拉開距離，他已經貼臉沉默到她。',
        },
        {
          en: 'Lady Sun needs extended trades to stack passive CDR — Kaizer bursts her before she gets a second Skill 1 rotation. Her entire "kite loop" falls apart against instant gap-close + silence.',
          'zh-TW': '孫尚香需要持續換血來刷被動減CD——鎧在她第二個一技能轉好前就秒了。整套「風箏循環」在瞬間貼臉+沉默面前直接崩潰。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'kaizer',
        reason: {
          en: 'Kaizer hard counters Lady Sun\'s physical burst. Ultimate dual resist cuts her damage to negligible levels. Skill 1 gap-close invalidates her roll-dodge. Enhanced auto silence prevents her from using Skill 2 mark or Ultimate. Lady Sun relies on kiting; Kaizer denies her any space to operate.',
          'zh-TW': '鎧完克孫尚香的物理爆發。大招雙抗讓傷害歸零。一技能貼臉讓翻滾失效。強化普攻沉默不讓她放二技能標記和大招。孫尚香靠風箏，鎧不給她任何操作空間。',
        },
        tags: [
          { en: 'Armor Wall', 'zh-TW': '物防牆' },
          { en: 'Gap Close', 'zh-TW': '貼臉沉默' },
          { en: 'Burst Delete', 'zh-TW': '爆發秒殺' },
        ],
      },
      {
        hero: 'dun',
        reason: {
          en: 'Dun\'s passive grants massive HP regen — Lady Sun\'s poke is meaningless since he heals through every trade. His Skill 1 hook + knockup cancels her Skill 1 roll mid-animation. Skill 2 shield absorbs her enhanced auto burst. Lady Sun can never win an extended trade against Dun\'s sustain.',
          'zh-TW': '夏侯惇被動巨量回血——孫尚香的消耗白打，他換血全程回滿。一技能鉤+擊飛打斷她翻滾動畫。二技能護盾吃強化普攻爆發。孫尚香永遠換不贏夏侯惇的續航。',
        },
        tags: [
          { en: 'Passive Regen', 'zh-TW': '被動回血' },
          { en: 'CC Hook', 'zh-TW': '鉤子控制' },
          { en: 'Shield Absorb', 'zh-TW': '護盾吃傷' },
        ],
      },
      {
        hero: 'arthur',
        reason: {
          en: 'Arthur\'s Skill 1 enhanced auto is a targeted dash that silences — Lady Sun cannot roll away once silenced. His Skill 2 AoE damage zone sits on top of her after the silence, forcing her to eat sustained damage. Ultimate is a point-click execute that ignores her roll entirely. Arthur is the easiest counter to execute against Lady Sun.',
          'zh-TW': '亞瑟一技能強化普攻是指向性突進+沉默——被沉默後孫尚香翻不了。二技能AOE直接貼臉轉，強迫吃持續傷害。大招指向性斬殺無視翻滾。亞瑟是孫尚香最容易操作的克制。',
        },
        tags: [
          { en: 'Point-Click Silence', 'zh-TW': '指向沉默' },
          { en: 'Targeted Execute', 'zh-TW': '指向斬殺' },
          { en: 'Easy Counter', 'zh-TW': '新手剋星' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Lady Sun is struggling at 47.79% win rate despite high pick rate (1.94%). She\'s a classic "high elo trap" — everyone picks her because she scales hard, but tank/assassin meta (Kaizer, Dun, Arthur everywhere) prevents her from reaching late game. Her early game is too weak for the current fast-paced meta where games end before she hits 3 items.',
        'zh-TW': '孫尚香47.79%勝率，雖然選用率1.94%高但典型的「版本陷阱」——大家都選因為後期強，但坦克/刺客版本（鎧、夏侯惇、亞瑟滿大街）不讓她活到後期。前期太弱，當前快節奏版本還沒三件裝遊戲就結束了。',
      },
      reasons: [
        {
          en: 'Games end faster in the current meta — Lady Sun needs 12-15 minutes to hit 3+ items. Most games are decided by the 10-minute mark where she\'s still farming.',
          'zh-TW': '版本節奏快——孫尚香要12-15分鐘才三件裝。大部分對局10分鐘就定勝負，她還在農。',
        },
        {
          en: 'Tank/assassin junglers (Kaizer, Dun) are meta — both jump on her in teamfights and she has zero answer without flash. Her Skill 1 roll is not enough peel.',
          'zh-TW': '坦克/刺客打野（鎧、夏侯惇）是版本答案——兩個都會戰衝臉，她沒閃現就是死。一技能翻滾根本不夠保命。',
        },
        {
          en: 'She\'s a high-elo-only hero. Bronze–Diamond: her win rate is even lower because players misuse Skill 1 aggressively and die. Only Grandmaster+ players maximize her kiting potential.',
          'zh-TW': '她是高分段限定英雄。青銅~鑽石：勝率更低，因為玩家亂翻滾送頭。只有宗師以上才會最大化風箏價值。',
        },
      ],
    },
    why: [
      {
        en: 'Her only escape (Skill 1 roll) doubles as her main damage tool. She must choose: roll forward to deal damage (risky) or roll backward to survive (zero damage output). No other marksman has this dilemma.',
        'zh-TW': '唯一的逃生（一技能翻滾）同時是主要傷害來源。她必須選：往前翻打傷害（冒險）或往後翻保命（零輸出）。沒有其他射手有這個困境。',
      },
      {
        en: '100% physical damage with zero built-in penetration. Stacking armor completely neutralizes her. Tanks with 800+ armor turn her 3-item spike into a tickle.',
        'zh-TW': '100%物理傷害且技能不帶穿甲。堆物防直接廢掉她。800+物防的坦克讓三件裝爆發變刮痧。',
      },
      {
        en: 'Skill 1 roll has a fixed short distance — any gap-closer follows her easily. Unlike Marco Polo\'s blink or Arli\'s multiple dashes, Lady Sun has ONE short predictable dash on a 5s CD.',
        'zh-TW': '一技能翻滾距離短且固定——任何突進都能輕鬆跟上。不像馬可的瞬移或公孫離的多段位移，孫尚香只有一個短距離可預測的翻滾，5秒CD。',
      },
    ],
    mistakes: [
      {
        en: 'Fighting her 1v1 in the open late game → she kites infinitely with passive CDR. → Bring a gap-closer or don\'t fight her without CC. In a confined space, she dies instantly.',
        'zh-TW': '後期空曠處跟她1v1 → 被動減CD無限風箏到死。→ 帶突進或沒控別打。狹窄空間裡她秒死。',
      },
      {
        en: 'Building magic resist against her → she deals zero magic damage. Stack physical armor + HP. Her entire kit is physical.',
        'zh-TW': '出魔抗 → 她零法傷。堆物防+血量。整套技能全是物理。',
      },
      {
        en: 'Letting her free-farm for 15 minutes → she deletes your entire team in 3 shots. → Deny her farm, gank her lane pre-6, invade her jungle. A behind Lady Sun is a minion.',
        'zh-TW': '放任她農15分鐘 → 三槍秒全隊。→ 壓制發育，6級前抓爆發育路，反野。落後的孫尚香只是個小兵。',
      },
    ],
    faqUltimate: {
      en: 'Lady Sun\'s Ultimate is a long-range AoE finisher. Dodge sideways — it travels in a straight line. If you\'re low HP, do not walk in a straight line away from her. The shell also explodes at max range, so being "out of range" doesn\'t guarantee safety. Engage her when her ultimate is on cooldown (25s) — it\'s her only long-range execute tool.',
      'zh-TW': '孫尚香大招是遠程AOE終結技。橫向走位躲——直線飛行。殘血別直線後退。砲彈最大射程也會爆炸，所以「在範圍外」不保證安全。大招25秒CD時開她——這是她唯一的遠程斬殺手段。',
    },
    faqItems: {
      en: '**Tanks:** Stack armor (Frostscar\'s Embrace, Thornmail). She deals 100% physical — magic resist is wasted gold. **Assassins:** Dive boots + armor pen. **Supports:** Shield items to protect carries from her enhanced auto burst.',
      'zh-TW': '**坦克：** 堆物防（冰痕之握、反甲）。她100%物理——出魔抗浪費錢。**刺客：** 韌性鞋+物穿。**輔助：** 護盾裝保後排吃強化普攻爆發。',
    },
    faqWho: {
      en: 'Kaizer (#1 counter) — ultimate armor wall + silence kills her instantly. Dun — passive regen shrugs off her poke, hook catches her roll. Arthur — point-click silence + execute, easiest counter for beginners.',
      'zh-TW': '鎧（頭號天敵）——大招物防牆+沉默秒殺。夏侯惇——被動回血無視消耗，鉤子抓翻滾。亞瑟——指向沉默+斬殺，新手最好操作的克制。',
    },
    faqHowToLane: {
      en: 'Punish her EVERY time she uses Skill 1 to last-hit — she burns her escape for farm. Freeze the wave near your tower so she can\'t roll forward safely. Call jungle ganks pre-6 when she has no ultimate finisher. If she rolls forward aggressively, that\'s your kill window — she just used her only escape.',
      'zh-TW': '她每次用一技能補兵就懲罰——她用逃生換吃兵。兵線控在塔前讓她不敢往前翻。6級前叫打野來抓（她沒大招收頭）。她往前翻打兇表示逃生剛交——這就是你的擊殺窗口。',
    },
    faqSeason: {
      en: 'Lady Sun is a high-elo specialist pick. Bronze–Diamond: avoid her — she\'s too hard to play effectively and her 47.79% win rate reflects that. Grandmaster+: viable as a late-game insurance pick with a peel support (Zhang Fei, Yaria). In the current fast meta, only pick her if your team has early game strength to carry her through the first 10 minutes.',
      'zh-TW': '孫尚香是高分段專精角。青銅~鑽石：別選——太難發揮，47.79%勝率就是證明。宗師以上：作為後期保險可以拿，配保人輔助（張飛、瑤）。當前快節奏版本，只有隊友前期能扛住前十分鐘才考慮選。',
    },
  },
  'xiao-qiao': {
    playstyle: {
      summary: {
        en: 'Xiao Qiao is a burst Mage dealing **Magic Damage** with strong AoE poke and teamfight control. Her core mechanic is **Skill 1: Blooming Sakura** — a boomerang fan that deals damage both ways, her primary poke tool. **Skill 2: Sweet Scent** is an AoE knockup from the ground, a powerful setup and peel tool. Her **Ultimate: Sakura Storm** summons falling sakura petals that auto-target nearby enemies, dealing massive sustained AoE damage while she moves freely. She gains movement speed when her skills hit — making her one of the most mobile mages in the game during fights.',
        'zh-TW': '小喬是爆發型法師，傷害為**法術傷害**，主打AOE消耗和團戰控制。核心機制：**一技能綻放之舞**——迴旋扇往返兩段傷害，主要消耗手段。**二技能甜蜜戀風**是地面擊飛AOE，強力先手和保命。**大招星華繚亂**召喚花雨自動鎖敵，持續AOE傷害期間可自由移動。技能命中加速——團戰中最靈活的法師之一。',
      },
      points: [
        {
          en: '**Damage source:** Pure magic damage. Skill 1 boomerang → Skill 2 knockup → Ultimate auto-targeting. Her burst combo can one-shot squishies from 2+ items.',
          'zh-TW': '**傷害來源：** 純法術傷害。一技能迴旋扇→二技能擊飛→大招自動鎖敵。兩件裝後全套可秒脆皮。',
        },
        {
          en: '**Power spike:** Holy Grail + Frosty Revenge (2 items) — max CDR, infinite mana, and perma-slow on skills. She can spam Skill 1 every 3 seconds.',
          'zh-TW': '**強勢期：** 聖杯+冰霜法杖（2件）——滿冷卻、無限藍、技能帶緩。一技能3秒一發狂丟。',
        },
        {
          en: '**Key weakness:** Skill 1 is a linear boomerang — sidestep it and she deals zero damage for the next 5 seconds. No dash or blink until late game; relies entirely on the MS boost from landing skills.',
          'zh-TW': '**核心弱點：** 一技能是直線迴旋——走位躲開後5秒零傷害。前期無位移閃爍，完全依賴技能命中加速。',
        },
      ],
    },
    bestCounter: {
      hero: 'liu-bei',
      advantage: 3.2,
      reasons: [
        {
          en: 'Liu Bei gap-closes through Xiao Qiao\'s Skill 2 knockup — his dash is instant while her knockup has a 0.5s delay. He closes the gap before the knockup procs and kills her in melee range.',
          'zh-TW': '劉備位移穿越小喬二技能擊飛——他突進瞬發而她擊飛有0.5秒延遲。擊飛生效前他已貼臉近戰秒殺。',
        },
        {
          en: 'Liu Bei\'s ultimate grants attack speed + lifesteal + CC reduction — Xiao Qiao\'s burst combo cannot one-shot him through the lifesteal, and he heals back while auto-attacking her.',
          'zh-TW': '劉備大招攻速+吸血+韌性——小喬整套爆發秒不掉還被他吸回來，普攻回血中反殺。',
        },
        {
          en: 'Xiao Qiao\'s MS boost is meaningless against Liu Bei\'s Skill 1 charge — he has TWO gap-closers (Skill 1 + Skill 2 slow) while she has zero hard escape.',
          'zh-TW': '小喬加速在劉備一技能衝鋒面前沒用——他有兩個貼身手段（一技能突進+二技能減速），她零硬逃生。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'liu-bei',
        reason: {
          en: 'Liu Bei hard counters Xiao Qiao through sustain and gap-close. His Skill 1 charge closes the distance instantly while her Skill 2 knockup delay prevents peeling. Ultimate lifesteal + attack speed lets him heal through her entire burst combo. Xiao Qiao relies on keeping enemies at Skill 1 max range; Liu Bei denies her the spacing entirely by staying in her face.',
          'zh-TW': '劉備靠續航+突進完克小喬。一技能衝鋒瞬貼臉，而她二技能擊飛延遲來不及保命。大招吸血+攻速硬吃全套爆發回滿。小喬靠保持一技能最遠距離，劉備貼臉讓她完全拉不開。',
        },
        tags: [
          { en: 'Gap Close', 'zh-TW': '貼臉突進' },
          { en: 'Lifesteal Tank', 'zh-TW': '吸血扛傷' },
          { en: 'CC Resistance', 'zh-TW': '韌性免控' },
        ],
      },
      {
        hero: 'menki',
        reason: {
          en: 'Menki\'s stealth engage catches Xiao Qiao before she can react with Skill 2. His silence prevents her from casting any spells, and his burst deletes her before the silence ends. Xiao Qiao relies on landing skills to proc MS boost; Menki prevents her from casting at all.',
          'zh-TW': '阿軻隱身進場在小喬反應前就到臉上。沉默無法放技能，爆發在沉默結束前秒掉。小喬靠技能命中觸發加速，阿軻讓她根本放不出技能。',
        },
        tags: [
          { en: 'Stealth Engage', 'zh-TW': '隱身進場' },
          { en: 'Silence Lock', 'zh-TW': '沉默鎖技' },
          { en: 'Burst Delete', 'zh-TW': '爆發秒殺' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Xiao Qiao sits at 48.7% win rate with 1.85% pick rate — a solid A-tier mage that thrives in uncoordinated play. Her AoE damage in teamfights is devastating when enemies clump, but her linear kit makes her predictable in high elo. The current assassin jungle meta (Liu Bei, Menki) specifically punishes immobile mages like her.',
        'zh-TW': '小喬48.7%勝率1.85%選用率——穩定的A級法師，在缺乏配合的對局中很強。敵人扎堆時團戰AOE毀天滅地，但線性技能在高分段太好預判。當前刺客打野版本（劉備、阿軻）專門針對她這種沒位移的法師。',
      },
      reasons: [
        {
          en: 'Skill 1 boomerang is easy to dodge at high elo — players sidestep the return hit consistently. Low elo enemies walk into both hits every time.',
          'zh-TW': '一技能迴旋扇高分段太好躲——往返兩段都能走位閃。低分段走路吃兩段。',
        },
        {
          en: 'Assassin junglers are everywhere — Liu Bei, Menki, Wukong all delete her before Skill 2 cast delay finishes.',
          'zh-TW': '刺客打野滿大街——劉備、阿軻、悟空全都在二技能抬手延遲就秒她。',
        },
        {
          en: 'Her teamfight damage is still S-tier in uncoordinated solo queue. She\'s a top-10 mid lane pick purely because solo queue players love clumping.',
          'zh-TW': '在沒配合的單排中團戰傷害還是S級。純靠路人愛扎堆就穩居中路前十。',
        },
      ],
    },
    why: [
      {
        en: '100% skillshot-reliant — miss Skill 1 and you deal zero damage for 5 seconds. A sidestep completely negates her primary damage source. No other mage has this much downtime on missing one skill.',
        'zh-TW': '100%依賴技能命中——一技能沒中就5秒零傷害。走位躲開就廢了主要傷害。沒有其他法師因為一個技能沒中就空窗這麼久。',
      },
      {
        en: 'Skill 2 knockup has a visible 0.5s ground indicator — reactable by anyone with a dash. High-elo players dash out or use CC immunity frames every time.',
        'zh-TW': '二技能擊飛有0.5秒地面提示——有位移的人都能反應。高分段每次都用位移或免控幀躲。',
      },
      {
        en: 'Zero hard escape pre-late-game with flash only. Her MS boost from skill hits is her only mobility, which is useless if she\'s already CC\'d or misses her skills.',
        'zh-TW': '無硬逃生（只靠閃現）。技能命中加速是唯一機動——但被控或技能沒中時完全沒用。',
      },
    ],
    mistakes: [
      {
        en: 'Standing in her Ultimate AoE and trying to duel her → she deals sustained AoE damage to ALL targets inside. → Walk out of range immediately and re-engage after her ultimate ends (5s duration).',
        'zh-TW': '站在大招AOE裡跟她對拼 → 她對圈內所有目標持續傷害。→ 立刻走出範圍，大招5秒結束再打。',
      },
      {
        en: 'Fighting in narrow corridors against Xiao Qiao → her Skill 1 boomerang hits everything in the line, Skill 2 knockup blocks the entire path. → Fight her in open areas where you can sidestep.',
        'zh-TW': '狹窄通道跟她打 → 一技能迴旋扇打全線，二技能擊飛擋全路。→ 在開闊區跟她打才能走位。',
      },
      {
        en: 'All-inning when she has Skill 2 up → walk straight into knockup → she combos you to death. → Bait Skill 2, dodge it, then engage while it\'s on cooldown.',
        'zh-TW': '她二技能還在就全壓 → 直直走進擊飛 → 被她連招收掉。→ 騙二技能，走位躲開，CD時再上。',
      },
    ],
    faqUltimate: {
      en: 'Xiao Qiao\'s Ultimate auto-targets nearby enemies — the petals cannot be dodged. Your options: (1) Walk out of range immediately — the ultimate has a limited radius. (2) Stack magic resist and tank through it — each petal deals moderate damage, but 5+ petals add up. (3) Crowd control her — the ultimate continues while she\'s CC\'d but she can\'t reposition to keep you in range.',
      'zh-TW': '小喬大招自動鎖敵——花瓣無法走位躲。解法：(1) 立刻走出範圍——大招有限半徑。(2) 堆魔抗硬扛——每片花瓣傷害中等，但5+片疊加。(3) 控住她——被控期間大招繼續但無法追你。',
    },
    faqItems: {
      en: '**Tanks:** Magic resist (Sage\'s Sanctuary, Phoenix Tear). **Carries:** Purify or spell shield to survive the Skill 2 → Ultimate combo. **Key:** Movement speed items help dodge Skill 1 and walk out of Ultimate range.',
      'zh-TW': '**坦克：** 魔抗（賢者庇護、鳳凰淚）。**輸出位：** 淨化或法術盾扛二技能→大招連招。**關鍵：** 移速裝幫躲一技能和走出大招範圍。',
    },
    faqWho: {
      en: 'Liu Bei (#1 counter) — gap-close + lifesteal ignores her burst. Menki — stealth silence prevents all casting. Any assassin with instant gap-close (Wukong, Musashi) counters her.',
      'zh-TW': '劉備（頭號天敵）——貼臉+吸血無視爆發。阿軻——隱身沉默讓她放不出技能。任何瞬發突進刺客（悟空、宮本）都克制她。',
    },
    faqHowToLane: {
      en: 'Dodge her Skill 1 boomerang by sidestepping perpendicular to the fan path. Freeze the wave near your tower — she must walk up to farm and you can trade on her approach. Call jungle ganks after she uses Skill 2 (12s CD) — it\'s her only peel tool. Pre-6, she\'s extremely vulnerable to ganks since her only "escape" is the knockup.',
      'zh-TW': '垂直走位躲一技能迴旋扇。兵線控在塔前——她必須上前吃兵，上前就換血。她交二技能（12秒CD）後叫打野來抓——這是她唯一的保命。6級前極怕抓，「逃生」只有擊飛。',
    },
    faqSeason: {
      en: 'Bronze–Platinum: Xiao Qiao is a great pick — enemies don\'t dodge Skill 1, clump for Ultimate multikills. Diamond+: falls off as players sidestep and save CC for her. Still viable as a counter-engage mage with strong AoE, but don\'t first-pick her. Pair with a frontline tank that can CC enemies in place for guaranteed Skill 1 hits.',
      'zh-TW': '青銅~白金：小喬是上分好選擇——沒人躲一技能，扎堆吃大招多殺。鑽石以上：走位躲扇子+留控針對就弱了。作為AOE反開法師仍可用，但別首選。配個前排坦克控住敵人確保一技能必中。',
    },
  },
  'dolia': {
    playstyle: {
      summary: {
        en: 'Dolia is a utility Support focusing on **team buffs, zone healing, and anti-engage**. Her kit revolves around **Skill 2: Tidal Blessing** — a healing wave that bounces between allies and applies bonus movement speed. Her **Ultimate: Ocean\'s Embrace** creates a large water zone that heals allies and reduces enemy damage output within. She is a sustain-based enchanter with zero hard CC — she buffs her team to win extended fights rather than making picks. Extremely weak alone, extremely strong with a coordinated team.',
        'zh-TW': '朵莉亞是功能型輔助，主打**團隊增益、範圍治療和反開團**。核心機制圍繞**二技能潮汐祝福**——彈射治療波給隊友加移速。**大招海洋懷抱**創造大型水域，治療隊友並降低範圍內敵方傷害。她是純續航型賦能輔助，零硬控——靠增強隊友打持久戰而非單抓。獨自作戰極弱，配合作戰極強。',
      },
      points: [
        {
          en: '**Core mechanic:** Heal over time + damage reduction zone. Dolia wins fights by keeping her team alive, not by dealing damage. She has no CC in her entire kit.',
          'zh-TW': '**核心機制：** 持續治療+減傷區域。朵莉亞靠保隊友不死贏團戰，不靠打傷害。整套技能零硬控。',
        },
        {
          en: '**Power spike:** Holy Grail + Tidal Staff (2 items) — healing output doubles, cooldowns drop significantly, and her mana becomes infinite.',
          'zh-TW': '**強勢期：** 聖杯+潮汐法杖（2件）——治療量翻倍，冷卻大降，藍量無限。',
        },
        {
          en: '**Key weakness:** Zero hard CC, zero damage, zero self-peel. If you dive her, she can only run — no stun, no knockup, no silence. She is the most divable support in the game.',
          'zh-TW': '**核心弱點：** 零硬控、零傷害、零自保。貼臉只能跑——無暈眩無擊飛無沉默。全遊戲最怕衝臉的輔助。',
        },
      ],
    },
    bestCounter: {
      hero: 'sima-yi',
      advantage: 3.5,
      reasons: [
        {
          en: 'Sima Yi\'s grievous wounds (Passive) cuts Dolia\'s healing by 50% — her entire kit revolves around healing, and Sima Yi negates half of it just by existing.',
          'zh-TW': '司馬懿被動制裁減治療50%——朵莉亞整套技能靠治療，司馬懿光是存在就廢掉一半。',
        },
        {
          en: 'Sima Yi\'s blink + silence combo instantly kills Dolia before she can cast any heal. She has zero defense against a mage assassin that appears next to her.',
          'zh-TW': '司馬懿瞬移+沉默連招在她放出治療前秒掉。她對突然出現在身邊的法刺零防禦。',
        },
        {
          en: 'Dolia\'s sustain requires extended fights — Sima Yi ends fights in 2 seconds. Her healing is meaningless when her carries die before the first heal tick.',
          'zh-TW': '朵莉亞靠持久戰堆治療——司馬懿2秒結束戰鬥。後排在第一跳治療前就死了，治療再高都沒用。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'sima-yi',
        reason: {
          en: 'Sima Yi is Dolia\'s nightmare. His passive applies grievous wounds, cutting her healing by 50%. His blink + silence combo deletes her before she can react with Tidal Blessing. Dolia relies on keeping allies alive through sustained healing — Sima Yi bursts them faster than she can heal. The grievous wounds alone makes Dolia half a champion.',
          'zh-TW': '司馬懿是朵莉亞的噩夢。被動制裁減治療50%。瞬移+沉默在她反應放潮汐祝福前就秒掉。朵莉亞靠持續治療保人——司馬懿爆發速度遠超治療速度。光是制裁就讓朵莉亞只剩半個英雄。',
        },
        tags: [
          { en: 'Grievous Wounds', 'zh-TW': '制裁減療' },
          { en: 'Silence + Burst', 'zh-TW': '沉默爆發' },
          { en: 'Heal Counter', 'zh-TW': '治療剋星' },
        ],
      },
      {
        hero: 'guiguzi',
        reason: {
          en: 'Guiguzi\'s stealth engage catches Dolia\'s entire team off-guard. His AoE stun prevents her from casting heals during the engage window. Dolia\'s damage reduction zone is useless when her team is chain-CC\'d — they take reduced damage from zero damage sources because they\'re stunned.',
          'zh-TW': '鬼谷子隱身開團讓朵莉亞全隊猝不及防。AOE暈眩期間她放不出治療。減傷區域在隊友被連控時完全沒用——被暈住受到的傷害減少也沒意義，因為只能挨打。',
        },
        tags: [
          { en: 'Stealth Engage', 'zh-TW': '隱身開團' },
          { en: 'AoE CC', 'zh-TW': 'AOE控制' },
          { en: 'Catch Potential', 'zh-TW': '抓人能力' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Dolia has the lowest win rate in the top 30 at 46.04% — she\'s genuinely weak in solo queue. Her entire value comes from coordinated team healing, which doesn\'t exist in uncoordinated play. Burst/assassin meta (Sima Yi, Guiguzi) directly counters sustain-based supports. High ban rate (0.51%) shows teams fear a coordinated Dolia, but solo queue Dolia is free LP for the enemy team.',
        'zh-TW': '朵莉亞46.04%勝率是top30中最低——單排真的弱。全部價值來自團隊協同治療，單排根本不存在這個東西。爆發/刺客版本（司馬懿、鬼谷子）直接克制續航型輔助。禁率0.51%說明團隊怕配合好的朵莉亞，但單排朵莉亞是對面免費上分。',
      },
      reasons: [
        {
          en: 'Solo queue teams don\'t play around Dolia\'s healing zones — they run out of her Ultimate, split up, and die alone. Her healing potential is wasted 80% of the time.',
          'zh-TW': '單排隊友不配合朵莉亞的治療區域——跑出大招、分散站位、各自送。80%治療量白費。',
        },
        {
          en: 'Burst damage is meta-defining — assassins kill carries faster than Dolia\'s heal-over-time can tick. She needs 5+ seconds of sustained healing to make an impact.',
          'zh-TW': '爆發傷害定義版本——刺客秒後排速度遠超她的HOT治療。她需要5秒以上持續治療才有影響力。',
        },
        {
          en: 'No hard CC means she can\'t peel for her carry. When an assassin dives, Dolia can only watch — other supports (Cai Yan, Zhang Fei) provide stuns or shields.',
          'zh-TW': '零硬控意味著無法保後排。刺客進場時朵莉亞只能看——其他輔助（蔡文姬、張飛）能給暈或護盾。',
        },
      ],
    },
    why: [
      {
        en: 'Zero hard CC in her entire kit — the only support in the game with absolutely no stun, knockup, silence, or suppression. If an enemy dives your carry, you can do nothing but heal slowly.',
        'zh-TW': '整套技能零硬控——全遊戲唯一完全無暈眩/擊飛/沉默/壓制的輔助。敵人衝臉後排只能慢慢奶。',
      },
      {
        en: 'All of her power is in sustained healing — grievous wounds cuts it by 50%. A single item (Venomous Staff / Purify Blades) neutralizes half her kit.',
        'zh-TW': '全部能力在持續治療——制裁減半。一件裝備（制裁/夢魘）就廢掉她半套技能。',
      },
      {
        en: 'Extremely fragile as a support — builds full AP/heal items with zero defensive stats. Any assassin can one-shot her. She relies entirely on positioning, which is terrible in a dive meta.',
        'zh-TW': '身為輔助卻極脆——全出法強/治療裝零防禦。任何刺客都能秒她。完全依賴站位，在衝臉版本慘不忍睹。',
      },
    ],
    mistakes: [
      {
        en: 'Building armor instead of magic resist → Dolia deals zero physical damage. Her damage and healing both scale with AP. Magic resist reduces her poke damage (Skill 1).',
        'zh-TW': '出物防 → 朵莉亞零物理傷害。傷害和治療都吃法強。魔抗防一技能消耗。',
      },
      {
        en: 'Fighting inside her Ultimate zone for extended trades → she heals her team while reducing your damage. → Walk out of the water zone or burst targets before healing stacks.',
        'zh-TW': '在她大招水域內持久戰 → 她治療隊友還降你傷害。→ 走出水域或爆發秒人不等治療疊。',
      },
      {
        en: 'Not buying grievous wounds in a 15+ minute game against Dolia → she outheals all your damage in extended fights. → Venomous Staff / Purify Blades is mandatory against any Dolia comp.',
        'zh-TW': '對朵莉亞15分鐘還不出制裁/夢魘 → 持久戰她治療超過你所有傷害。→ 對朵莉亞陣容制裁/夢魘是強制裝備。',
      },
    ],
    faqUltimate: {
      en: 'Dolia\'s Ocean\'s Embrace creates a large water zone — allies inside heal and enemies deal reduced damage. NEVER fight inside this zone. Walk out immediately and bait her team to follow you. Without the zone, Dolia\'s healing output drops by 60%. Burst targets while they\'re outside her Ultimate range.',
      'zh-TW': '朵莉亞大招海洋懷抱創造大型水域——圈內隊友回血、敵人降傷害。絕對不要在圈內打架。立刻走出並騙她隊友追出來。沒有水域，朵莉亞治療量降60%。趁目標在圈外時爆發秒人。',
    },
    faqItems: {
      en: '**Everyone:** Grievous wounds (Venomous Staff for mages, Purify Blades for physical) is MANDATORY. **Assassins:** Burst her first — she dies in 1 combo. **Tanks:** Walk into her zone and push her out — she can\'t do anything if displaced.',
      'zh-TW': '**所有人：** 制裁/夢魘是強制裝備。**刺客：** 先秒朵莉亞——一套就死。**坦克：** 走進她水域把她推出去——被位移後什麼都做不了。',
    },
    faqWho: {
      en: 'Sima Yi (#1 counter) — passive grievous wounds + blink silence deletes her instantly. Guiguzi — stealth AoE CC ignores her healing entirely. Any burst assassin (Wukong, Musashi) one-shots her before healing matters.',
      'zh-TW': '司馬懿（頭號天敵）——被動制裁+瞬移沉默瞬秒。鬼谷子——隱身AOE控完全無視治療。任何爆發刺客（悟空、宮本）在治療生效前秒她。',
    },
    faqHowToLane: {
      en: 'Dolia is weak in lane — her healing is minimal pre-level-4. Poke her marksman constantly; Dolia can\'t heal fast enough to keep up. Call jungle ganks on the bot lane — Dolia has zero CC to stop a dive. If she uses Skill 2 on the wave instead of her carry, that\'s your kill window.',
      'zh-TW': '朵莉亞對線弱——4級前治療極少。一直消耗她的射手；朵莉亞治療速度跟不上。叫打野抓下路——朵莉亞零控無法阻止衝臉。她把二技能交給兵線而不是射手就是擊殺窗口。',
    },
    faqSeason: {
      en: 'Dolia is a team-play only champion. Solo queue Bronze–Diamond: avoid her completely — 46% win rate is not a fluke. 5-stack/Duo: viable with a hypercarry marksman (Hou Yi, Luban No.7) that can utilize her sustained healing. Her strength scales with team coordination — zero in solo queue, S-tier in pro play.',
      'zh-TW': '朵莉亞是團隊限定英雄。單排青銅~鑽石：完全別選——46%勝率不是偶然。五排/雙排：配大核射手（后羿、魯班）能吃滿持續治療可用。強度隨團隊配合度等比成長——單排零，職業S級。',
    },
  },
  'luara': {
    playstyle: {
      summary: {
        en: 'Luara is a high-mobility Marksman dealing **Physical Damage** with rapid-fire basic attacks. Her kit revolves around **Skill 1: Twin Shot** — fires two bolts that apply on-hit effects twice, doubling her item damage output. **Skill 2: Shadow Dash** is a blink that can be recast to return to the original position, giving her unmatched juking potential. Her **Ultimate: Death Bloom** is a rapid-fire channel that deals massive sustained damage to a single target. She is the most mechanically demanding marksman — high skill floor, higher skill ceiling.',
        'zh-TW': '盧雅那是高機動型射手，傷害為**物理傷害**，主打高速連射普攻。核心機制圍繞**一技能雙重射擊**——發射兩發子彈觸發兩次命中效果，裝備傷害翻倍。**二技能暗影位移**可瞬移並二段返回原位，風箏能力無與倫比。**大招死亡綻放**快速連射對單體造成巨額持續傷害。操作難度最高的射手——下限高、上限更高。',
      },
      points: [
        {
          en: '**Damage source:** Pure physical damage from basic attacks + on-hit effects. Skill 1 fires two projectiles (double on-hit), Skill 2 enhances the next auto. Ultimate rapid-fires at max attack speed.',
          'zh-TW': '**傷害來源：** 純物理普攻+命中效果。一技能兩發（命中效果雙倍），二技能強化普攻。大招以最高攻速連射。',
        },
        {
          en: '**Power spike:** Doomsday + Swiftboots (2 items) — enough attack speed and on-hit damage to dominate 1v1 trades. Her true spike is at 3 items when she can win teamfights solo.',
          'zh-TW': '**強勢期：** 末世+輕靈鞋（2件）——攻速和命中傷害夠打贏1v1。真正發力在三件裝能單人收割團戰。',
        },
        {
          en: '**Key weakness:** Skill 2 return position is predictable — smart enemies camp the return point. She has 525 attack range (one of the shortest among marksmen) and must play in dangerous mid-range.',
          'zh-TW': '**核心弱點：** 二技能返回位置可預測——會玩的蹲返回點。525攻擊距離（射手最短之一），必須在危險中距離作戰。',
        },
        {
          en: '**Laning phase:** Strong 1v1 due to on-hit doubling, but vulnerable to ganks. Skill 2 is her only escape and using it aggressively leaves her defenseless.',
          'zh-TW': '**對線期：** 命中雙倍讓1v1很強，但怕抓。二技能唯一逃生，打兇交掉就零保護。',
        },
      ],
    },
    bestCounter: {
      hero: 'lapulapu',
      advantage: 3.8,
      reasons: [
        {
          en: 'Lapulapu\'s CC chain (Skill 1 knockup → Skill 2 stun → Ultimate suppression) completely locks Luara. She cannot cast Skill 2 to escape while suppressed, and her short range means she\'s always in his engage zone.',
          'zh-TW': '拉普拉普連控（一技能擊飛→二技能暈眩→大招壓制）完全鎖死盧雅那。壓制期間無法放二技能逃生，短手讓她永遠在他的開團範圍內。',
        },
        {
          en: 'Lapulapu\'s damage reduction during Ultimate means Luara\'s on-hit burst deals negligible damage. The hero designed to melt single targets can\'t scratch him.',
          'zh-TW': '拉普拉普大招期間減傷讓盧雅那的命中爆發跟刮痧一樣。專為秒殺單體的英雄打不動他。',
        },
        {
          en: 'Luara needs to kite at max range to survive — Lapulapu\'s gap-closers (Skill 1, Ultimate dash) cover her entire attack range. She can never safely auto-attack.',
          'zh-TW': '盧雅那需要最遠距離風箏才能活——拉普拉普突進（一技能、大招位移）能覆蓋她全部攻擊範圍。她永遠無法安全普攻。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'lapulapu',
        reason: {
          en: 'Lapulapu is Luara\'s hardest counter. His CC chain prevents her from using Skill 2 (the cast gets locked by suppression/stun). His Ultimate damage reduction absorbs her on-hit burst entirely. Luara\'s 525 range forces her into his engage zone — she cannot outrange him. Every teamfight, he dives her first and she dies without doing damage.',
          'zh-TW': '拉普拉普是盧雅那最大天敵。連控讓她放不出二技能（壓制/暈眩鎖技）。大招減傷完全吸收命中爆發。525攻擊距離強迫她進入他開團範圍——無法手長優勢。每波團戰他都先衝她，她死前零輸出。',
        },
        tags: [
          { en: 'CC Chain Lock', 'zh-TW': '連控鎖技' },
          { en: 'Damage Reduction', 'zh-TW': '減傷坦克' },
          { en: 'Gap Close', 'zh-TW': '突進貼臉' },
        ],
      },
      {
        hero: 'ata',
        reason: {
          en: 'Ata\'s Ultimate taunt turns Luara against her own team — she has high DPS but no way to avoid being taunted at close range. Ata\'s passive shield + HP stacking means Luara\'s single-target burst tickles him. Ata dives into her face and she can either fight (and die) or run (and deal zero damage).',
          'zh-TW': '阿塔大招嘲諷讓盧雅那打自己人——她高DPS但近距離無法躲嘲諷。被動護盾+堆血讓單體爆發刮痧。阿塔衝臉她只能選：打（死）或跑（零輸出）。',
        },
        tags: [
          { en: 'Taunt CC', 'zh-TW': '嘲諷控制' },
          { en: 'HP Stack', 'zh-TW': '血量碾壓' },
          { en: 'Anti-Marksman', 'zh-TW': '射手剋星' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Luara has 52.66% win rate with 1.55% pick rate — she\'s a high-skill marksman that wins when mastered. Her pick rate is low because she\'s mechanically difficult; her win rate is high because only dedicated mains play her. The tank/CC meta (Lapulapu, Ata) is her biggest counter, but in games without hard CC divers, she\'s nearly unstoppable.',
        'zh-TW': '盧雅那52.66%勝率1.55%選用率——高操作難度射手，熟練就贏。選用率低因為操作太難；勝率高因為只有專精玩家選。坦克/控制版本（拉普拉普、阿塔）是最大剋星，但無硬控陣容中近乎無解。',
      },
      reasons: [
        {
          en: 'Low pick rate + high win rate = mains-only effect. Luara is not OP — she\'s just played exclusively by people who have 100+ games on her.',
          'zh-TW': '低選用率+高勝率=專精效應。盧雅那不是OP——只是玩她的人都100場以上。',
        },
        {
          en: 'Tanks with hard CC (Lapulapu, Ata) are popular right now — they specifically counter her short attack range and reliance on Skill 2 jukes.',
          'zh-TW': '硬控坦克（拉普拉普、阿塔）正流行——專門克制她的短攻擊距離和依賴二技能風箏的特點。',
        },
        {
          en: 'In games with weak frontline, Luara takes over completely. She\'s a ban-worthy threat in 5-stack play where teams draft around protecting her.',
          'zh-TW': '對面無前排時盧雅那完全接管比賽。五排隊友圍繞保護她選陣時是值得禁用的大威脅。',
        },
      ],
    },
    why: [
      {
        en: '525 attack range is the shortest among marksmen. She must play in the danger zone — within range of every tank\'s engage, every assassin\'s gap-close.',
        'zh-TW': '525攻擊距離是射手最短。必須在危險區作戰——在每個坦克開團/刺客突進範圍內。',
      },
      {
        en: 'Skill 2 return point is public information — the shadow left behind tells enemies exactly where she\'ll be if she recasts. Smart enemies camp the shadow.',
        'zh-TW': '二技能返回點是公開信息——留下的殘影告訴敵人她返回的確切位置。會玩的蹲殘影。',
      },
      {
        en: '100% physical basic attack damage — no magic, no true damage. Stacking armor directly counters her. Her damage is entirely auto-attack based, so blinds and attack speed slows cripple her.',
        'zh-TW': '100%物理普攻傷害——無法傷無真傷。堆物防直接克制。全靠普攻打傷害，致盲和減攻速廢掉她。',
      },
    ],
    mistakes: [
      {
        en: 'Chasing her when Skill 2 shadow is visible → she recasts and teleports behind you. → Don\'t chase Luara. Camp her shadow return point and kill her when she recasts.',
        'zh-TW': '看殘影還追她 → 她二段瞬回原位到你背後。→ 別追盧雅那。蹲殘影返回點等她回來殺。',
      },
      {
        en: '1v1 dueling her in the open late game → she double-procs on-hit effects and out-DPS everyone. → Bring CC or don\'t fight her alone. She wins every pure DPS race.',
        'zh-TW': '後期空曠處1v1跟她單挑 → 命中雙倍觸發DPS碾壓一切。→ 帶控或別單挑。純拼DPS她穩贏。',
      },
      {
        en: 'Not focusing her in teamfights → she free-fires from behind and melts your entire team. → Dive her first every time. A dead Luara deals zero damage.',
        'zh-TW': '團戰不針對她 → 她在後排無壓力輸出融化解體。→ 每波都先衝她。死掉的盧雅那零輸出。',
      },
    ],
    faqUltimate: {
      en: 'Luara\'s Death Bloom is a channeled single-target DPS machine. CC her immediately — any stun/silence/knockup cancels the channel. If she\'s targeting you, flash out of range or use a dash to break line of sight. Do NOT try to out-DPS her ultimate — you will lose. The channel lasts 3 seconds; if she\'s CC\'d within the first second, her ultimate deals almost nothing.',
      'zh-TW': '盧雅那大招死亡綻放是站樁單體DPS。立刻控她——任何暈眩/沉默/擊飛都能打斷讀條。被打的人閃現出範圍或位移斷視野。不要跟她拼DPS——穩輸。讀條3秒；第一秒內控到就幾乎沒傷害。',
    },
    faqItems: {
      en: '**Tanks:** Armor (Frostscar\'s Embrace, Thornmail) — she\'s 100% physical. **Assassins:** Dive her first, burst before she reacts. **Supports:** Point-click CC (stun items) to cancel her ultimate channel. **Key:** Attack speed reduction items (Frosty Revenge) cripple her entire kit.',
      'zh-TW': '**坦克：** 物防（冰痕之握、反甲）——她100%物理。**刺客：** 先手貼臉秒。**輔助：** 指向暈眩裝打斷大招讀條。**關鍵：** 減攻速裝（冰霜法杖效果）廢掉整套技能。',
    },
    faqWho: {
      en: 'Lapulapu (#1 counter) — CC chain locks her, damage reduction absorbs her burst. Ata — taunt turns her DPS against her team, massive HP tanks her damage.',
      'zh-TW': '拉普拉普（頭號天敵）——連控鎖技，減傷吃爆發。阿塔——嘲諷讓她打自己人，巨額血量扛傷。',
    },
    faqHowToLane: {
      en: 'Punish her every time she uses Skill 2 aggressively — she burns her only escape. Camp her return shadow when she recasts Skill 2. Freeze the wave near your tower — her short range means she must overextend to farm. Call jungle ganks when her Skill 2 is on cooldown (8s). Pre-6 ganks are especially lethal since she has no ultimate DPS yet.',
      'zh-TW': '她每次二技能往前打就懲罰——唯一逃生交掉。她二段返回時蹲殘影。兵線控在塔前——短手讓她必須站位過深才能補兵。二技能CD中（8秒）叫打野來抓。6級前抓最致命——還沒大招DPS。',
    },
    faqSeason: {
      en: 'Luara is a specialist pick for Diamond+. Her 52.66% win rate reflects mains-only statistics — she\'s not a free win for casual players. Bronze–Platinum: avoid her unless you have 50+ games of practice. Diamond+: strong pick against comps without hard CC divers. Ban Lapulapu/Ata and she becomes one of the best marksmen in the game.',
      'zh-TW': '盧雅那是鑽石以上的專精角。52.66%勝率反映專精數據——對休閒玩家不是免費贏。青銅~白金：沒練50+場別碰。鑽石以上：對無硬控陣容極強。禁用拉普拉普/阿塔後她變全遊戲最強射手之一。',
    },
  },
  'consort-yu': {
    playstyle: {
      summary: {
        en: 'Consort Yu (Yu Ji) is a defensive Marksman dealing **Physical Damage** with a unique 2-second **Physical Damage Immunity** on her **Skill 2: Protecting Winds**. This single ability makes her the hardest counter to physical damage marksmen and assassins. Her **Skill 1: Oak Bolt** is a charged skillshot that deals massive damage through minions — a powerful poke and wave clear tool. Her **Ultimate: Vaulting Shot** is a point-click stun that also boosts her attack and fire rate. She is the best beginner-friendly counter-pick, especially against Marco Polo and other physical damage heroes.',
        'zh-TW': '虞姬是防禦型射手，傷害為**物理傷害**，擁有獨特的**二技能大風來**——2秒**物理免疫**。光這個技能就讓她成為物理射手和刺客的最大天敵。**一技能楚歌起**是蓄力穿透箭，穿透小兵造成巨額傷害——強力消耗和清線。**大招陣前舞**是指向暈眩，同時提升攻擊和射速。她是最好的新手友善反制角，尤其克制馬可波羅等物理英雄。',
      },
      points: [
        {
          en: '**Damage source:** Pure physical damage — Skill 1 charged bolt (piercing), enhanced basic attacks after Skill 2/Ultimate. No magic damage, no true damage.',
          'zh-TW': '**傷害來源：** 純物理——一技能蓄力穿透箭，二技能/大招後強化普攻。無法傷，無真傷。',
        },
        {
          en: '**Power spike:** Starbreaker + Swiftboots (2 items) — enough damage and attack speed to dominate lane. Skill 2 guarantees winning any physical damage trade on 13s CD.',
          'zh-TW': '**強勢期：** 破星錘+輕靈鞋（2件）——傷害和攻速夠壓線。二技能13秒CD保證任何物理換血穩贏。',
        },
        {
          en: '**Key weakness:** 100% physical damage with zero magic resist in kit. AP assassins (Luna, Diaochan) ignore her physical immunity entirely and delete her. Skill 2 does NOTHING against magic damage.',
          'zh-TW': '**核心弱點：** 100%物理傷害，零魔抗。法術刺客（露娜、貂蟬）完全無視物理免疫秒她。二技能對法傷毫無作用。',
        },
        {
          en: '**Laning phase:** One of the strongest 1v1 marksmen. Skill 2 wins any physical trade. Skill 1 pokes through waves. Only loses to AP damage in lane.',
          'zh-TW': '**對線期：** 最強1v1射手之一。二技能讓任何物理換血穩贏。一技能穿兵消耗。只輸法傷對線。',
        },
      ],
    },
    bestCounter: {
      hero: 'luna',
      advantage: 4.0,
      reasons: [
        {
          en: 'Luna deals 100% magic damage — Consort Yu\'s Skill 2 physical immunity is useless. Luna dives in, combos, and kills Yu Ji in 2 seconds while the immunity does nothing.',
          'zh-TW': '露娜100%法術傷害——虞姬二技能物理免疫毫無用途。露娜衝臉連招2秒帶走，免疫形同虛設。',
        },
        {
          en: 'Luna\'s infinite dash resets let her dodge Yu Ji\'s Skill 1 charged shot and Ultimate stun effortlessly. Yu Ji\'s entire skillshot-based kit misses against Luna\'s mobility.',
          'zh-TW': '露娜無限刷新位移輕鬆躲楚歌起蓄力和大招暈眩。虞姬全技能命中型的機制打不到無限位移的露娜。',
        },
        {
          en: 'Yu Ji has zero magic resist in her kit — Luna\'s full combo one-shots her from 100 to 0 with zero counterplay. The best anti-physical marksman has no answer to pure magic damage.',
          'zh-TW': '虞姬零魔抗——露娜一套從滿血秒到零，完全無法反制。最強反物理射手對純法術毫無還手之力。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'luna',
        reason: {
          en: 'Luna is Consort Yu\'s hardest counter because she deals 100% magic damage. Skill 2 physical immunity does nothing — Luna dives through it with infinite dash resets. Yu Ji\'s Skill 1 and Ultimate are both skillshots that Luna dodges effortlessly. Luna\'s sustained magic damage + mobility makes her the single worst matchup for Yu Ji in the game.',
          'zh-TW': '露娜是虞姬最大天敵，因為100%法傷。二技能物理免疫完全無效——露娜無限位移穿越。一技能和大招都是指向技，露娜輕鬆躲。持續法傷+機動性是虞姬全遊戲最差對局。',
        },
        tags: [
          { en: 'Magic Damage', 'zh-TW': '法術傷害' },
          { en: 'Infinite Dashes', 'zh-TW': '無限位移' },
          { en: 'Immunity Bypass', 'zh-TW': '穿透免疫' },
        ],
      },
      {
        hero: 'diaochan',
        reason: {
          en: 'Diaochan\'s passive deals %HP true damage + magic damage — Yu Ji\'s physical immunity does nothing against either. Diaochan\'s Ultimate creates a zone of permanent blossoms; Yu Ji cannot escape without flash because her only mobility is the Skill 2 MS boost (which doesn\'t help against slows). Diaochan dances around Yu Ji and kills her in 2 blossom rotations.',
          'zh-TW': '貂蟬被動%HP真傷+法傷——虞姬物理免疫對這兩種都沒用。大招創造永久花瓣區域；虞姬沒閃現逃不了（唯一機動是二技能加速，被緩也沒用）。貂蟬跳舞繞虞姬，兩輪花瓣帶走。',
        },
        tags: [
          { en: 'True Damage', 'zh-TW': '真實傷害' },
          { en: '%HP Damage', 'zh-TW': '百分比傷害' },
          { en: 'Zone Control', 'zh-TW': '區域控場' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Consort Yu has a solid 51.9% win rate with 1.5% pick rate — she\'s a situational counter-pick rather than a blind-pick marksman. Her win rate is inflated because she\'s mostly picked INTO physical damage comps (Marco Polo, enemy AD junglers). When enemies pick AP assassins (Luna, Diaochan), Yu Ji becomes one of the worst marksmen in the game. She\'s a "counter pick" hero, not a "main" hero.',
        'zh-TW': '虞姬51.9%勝率1.5%選用率——她是情況反制角而非無腦盲選射手。勝率虛高因為多半針對物理陣容（馬可、敵方AD打野）才選。對面出法刺（露娜、貂蟬）時虞姬變最爛射手之一。她是「針對選角」，不是「本命角」。',
      },
      reasons: [
        {
          en: 'Her value is entirely in Skill 2 physical immunity — against physical damage comps, she\'s S-tier. Against magic damage comps, she\'s C-tier. A binary hero.',
          'zh-TW': '全部價值在二技能物理免疫——對物理陣容S級，對法術陣容C級。二元分化英雄。',
        },
        {
          en: 'AP junglers are rising in popularity (Luna, Diaochan seen more in mid-high elo) — this is bad for Yu Ji. Her win rate drops significantly when the enemy jungler is AP.',
          'zh-TW': '法傷打野上升中（露娜、貂蟬在中高分段常見）——對虞姬不利。敵方打野是法傷時勝率明顯下降。',
        },
        {
          en: 'She\'s the best beginner-friendly counter-pick against Marco Polo, Lady Sun, and other physical marksmen. Her Skill 2 makes laning braindead-easy against physical damage.',
          'zh-TW': '她是打馬可、孫尚香等物理射手最好的新手反制角。二技能讓對線變成無腦模式。',
        },
      ],
    },
    why: [
      {
        en: 'Zero magic resist built into her kit — unlike other marksmen who have some form of mixed defense, Yu Ji\'s ONLY defensive tool (Skill 2) works exclusively against physical damage.',
        'zh-TW': '零魔抗——其他射手多少有點混合防禦，虞姬唯一的防禦（二技能）只對物理有效。',
      },
      {
        en: '100% physical damage, all skillshot-based. If enemies dodge Skill 1 and Ult, she has no damage for the next 7-25 seconds. Her auto-attack DPS without skills is below average.',
        'zh-TW': '100%物理傷害，全技能命中型。敵人躲掉一技能和大招，接下來7-25秒零傷害。沒技能的普攻DPS低於平均。',
      },
      {
        en: 'Skill 2 has a 13s cooldown — a massive window. Bait it, disengage, then re-engage and she has zero defensive tools. The physical immunity lasts only 2 seconds.',
        'zh-TW': '二技能13秒CD——超長空窗。騙出來後拉開再進場，她零防禦。物理免疫只有2秒。',
      },
    ],
    mistakes: [
      {
        en: 'Trading into her when Skill 2 is active → you deal zero physical damage for 2 seconds while she free-fires. → Wait out the 2s immunity, then trade. Or use magic damage to bypass it.',
        'zh-TW': '她開二技能時對拼 → 2秒物理零輸出她白打你。→ 等2秒免疫結束再換血。或用魔法傷害穿透免疫。',
      },
      {
        en: 'Picking full AD team against Yu Ji → she presses Skill 2 and tanks your entire team for 2 seconds. → Draft at least one AP threat (mage jungler, AP mid) to ignore her immunity.',
        'zh-TW': '全AD陣容打虞姬 → 她按二技能扛全隊2秒。→ 選陣時至少一個AP威脅（法傷打野或中路法師）無視免疫。',
      },
      {
        en: 'Fighting her in narrow corridors → Skill 1 pierces through everything and hits your entire team. → Fight her in open areas where you can spread out and dodge the bolt.',
        'zh-TW': '狹窄通道打她 → 一技能穿透全隊。→ 開闊區分散站位躲箭。',
      },
    ],
    faqUltimate: {
      en: 'Consort Yu\'s Ultimate is a point-click stun + attack boost. She dashes to the target, stuns, then jumps back and fires. If she targets you: (1) Purify the stun immediately. (2) After she jumps back, chase her down — she\'s vulnerable during the bolt animation. (3) If playing a mage, the Ultimate deals physical damage — your magic resist doesn\'t help, but she\'s immobile after casting.',
      'zh-TW': '虞姬大招指向暈眩+攻擊強化。她突進到目標暈眩、跳回、射箭。被鎖定時：(1) 立刻淨化解暈。(2) 她跳回射箭動畫時追擊——這是最脆弱時刻。(3) 法師注意：大招是物理傷害——魔抗沒用，但施放後無法移動。',
    },
    faqItems: {
      en: '**AP Mages/Assassins:** Pick AP — ignore her Skill 2 entirely. **Physical champions:** Wait out the 2s immunity, then burst. **Tanks:** Stack magic resist if your team lacks AP, since you need magic damage to pressure her. **Key:** Grievous wounds don\'t help — she has no lifesteal in her kit.',
      'zh-TW': '**法師/法刺：** 選法傷——完全無視二技能。**物理英雄：** 等2秒免疫結束再打。**坦克：** 隊友缺法傷就自己出魔抗裝（因為要靠法傷給壓力）。**關鍵：** 制裁沒用——她技能不帶吸血。',
    },
    faqWho: {
      en: 'Luna (#1 counter) — 100% magic damage + infinite dashes ignores immunity. Diaochan — true damage + magic damage zone kills her through immunity. Any AP assassin (Sima Yi, Angela) counters her.',
      'zh-TW': '露娜（頭號天敵）——100%法傷+無限位移無視免疫。貂蟬——真傷+法傷區域穿透免疫。任何法刺（司馬懿、安琪拉）都克制她。',
    },
    faqHowToLane: {
      en: 'Bait her Skill 2 by pretending to engage — when the golden glow disappears, she has 13 seconds of zero defense. Use magic damage supports (Angela, Xiao Qiao as support) to bypass her immunity. Freeze wave near your tower — her Skill 1 has long range but she must step up to auto-attack. Call AP jungler ganks — physical ganks are useless against Skill 2.',
      'zh-TW': '假裝要上騙她二技能——金光消失後13秒零防禦。用法傷輔助（安琪拉、小喬輔助）穿透免疫。兵線控塔前——一技能手長但普攻必須上前。叫法傷打野來抓——物理打野來抓被二技能廢掉。',
    },
    faqSeason: {
      en: 'Bronze–Diamond: Consort Yu is a great pick, especially if you see Marco Polo, Lady Sun, or physical junglers on the enemy team. Most low-elo players don\'t draft AP threats. Diamond+: she\'s a situational last-pick counter. Never first-pick her — the enemy will lock Luna or Diaochan and you\'ll be useless. She\'s the perfect "enemy picked Marco Polo, time to punish" hero.',
      'zh-TW': '青銅~鑽石：虞姬是強力選擇，尤其看到對面馬可、孫尚香或物理打野。低分段不太會選AP威脅。鑽石以上：情況性最後一選反制。絕不首選——對面秒鎖露娜或貂蟬你直接廢。她是完美的「對面選馬可了，來懲罰他」英雄。',
    },
  },
  'chicha': {
    playstyle: {
      summary: {
        en: 'Chicha is a melee Fighter dealing **Physical Damage** with CC chains and sustained brawling power. Her kit revolves around **Skill 2: Earthshatter** — an AoE knockup that sets up her entire combo. Her **Ultimate: Colossal Might** transforms her, gaining bonus HP, damage, and enhanced abilities. She thrives in extended melee fights where she can chain CC and out-sustain opponents. One of the strongest 1v1 fighters in Clash Lane — if she lands her knockup, you die.',
        'zh-TW': '蚩奼是近戰戰士，傷害為**物理傷害**，主打連控和持續近身戰。核心機制圍繞**二技能震地擊**——AOE擊飛啟動整套連招。**大招巨人之力**變身，獲得額外血量、傷害和強化技能。擅長持久近戰，靠連控和續航碾壓對手。對抗路最強1v1戰士之一——中擊飛就死。',
      },
      points: [
        {
          en: '**Damage source:** Pure physical damage from melee combos. Skill 1 dash → Skill 2 knockup → enhanced auto → Ultimate transformation for extended brawl.',
          'zh-TW': '**傷害來源：** 純物理近戰連招。一技能突進→二技能擊飛→強化普攻→大招變身打持久戰。',
        },
        {
          en: '**Power spike:** Frostscar\'s Embrace + Steropes\'s Wrath (2 items) — tanky enough to commit to fights, enough damage to solo-kill squishies.',
          'zh-TW': '**強勢期：** 冰痕之握+破軍（2件）——夠坦敢進場，夠傷能單殺。',
        },
        {
          en: '**Key weakness:** Melee only — zero ranged poke. Kited easily by marksmen and mages. Knockup is telegraphed (ground indicator) and dash-able.',
          'zh-TW': '**核心弱點：** 純近戰——零遠程消耗。被射手和法師輕鬆風箏。擊飛有地面提示，可位移躲。',
        },
      ],
    },
    bestCounter: {
      hero: 'marco-polo',
      advantage: 3.8,
      reasons: [
        {
          en: 'Marco Polo kites Chicha infinitely — Skill 1 bullets apply passive stacks from range while Chicha can never close the gap. True damage at 10 stacks ignores her armor.',
          'zh-TW': '馬可波羅無限風箏蚩奼——一技能子彈遠程疊被動，蚩奼永遠追不上。10層真傷無視護甲。',
        },
        {
          en: 'Marco\'s Skill 2 blink dodges Chicha\'s telegraphed knockup every time. Her entire engage is denied by a single 5s cooldown dash.',
          'zh-TW': '馬可二技能瞬移每次都能躲地面提示的擊飛。她整套進場被一個5秒CD位移廢掉。',
        },
        {
          en: 'Chicha needs extended melee fights to win — Marco kites from range and never lets her engage. She either chases and dies or backs off and loses lane.',
          'zh-TW': '蚩奼需要持久近戰才能贏——馬可遠程風箏不讓進場。她要嘛追上去死，要嘛退後輸線。',
        },
      ],
    },
    counterDetails: [
      {
        hero: 'marco-polo',
        reason: {
          en: 'Marco Polo is Chicha\'s worst nightmare. Complete range advantage — Skill 1 bullets stack passive from safety. Skill 2 blink dodges her telegraphed knockup every time. True damage at 10 stacks melts her HP pool. Chicha is a melee brawler with zero gap-close beyond Skill 1 dash; Marco denies her any chance to fight.',
          'zh-TW': '馬可波羅是蚩奼最恐怖的天敵。完全手長壓制——一技能子彈安全疊被動。二技能瞬移每次躲掉有提示的擊飛。10層真傷融化血池。蚩奼是純近戰，除了一技能突進零貼臉手段；馬可不給她任何戰鬥機會。',
        },
        tags: [
          { en: 'Range Kiting', 'zh-TW': '手長風箏' },
          { en: 'True Damage', 'zh-TW': '真實傷害' },
          { en: 'Dash Dodge', 'zh-TW': '位移躲技' },
        ],
      },
      {
        hero: 'hou-yi',
        reason: {
          en: 'Hou Yi\'s sustained DPS shreds Chicha from range — she can never reach him. His Ultimate AoE slow zone forces her to walk through a sea of damage. Hou Yi\'s attack speed steroid means he stacks damage faster than Chicha can close the gap. In teamfights, Hou Yi melts Chicha before she reaches the backline.',
          'zh-TW': '后羿持續DPS從遠處蒸發蚩奼——她永遠摸不到他。大招AOE太陽圈逼她穿越傷害海。后羿攻速加成疊傷速度遠超她貼臉速度。團戰中后羿在蚩奼碰到後排前就熔化了。',
        },
        tags: [
          { en: 'Sustained DPS', 'zh-TW': '持續輸出' },
          { en: 'Zone Control', 'zh-TW': '區域控場' },
          { en: 'Kite God', 'zh-TW': '風箏之王' },
        ],
      },
      {
        hero: 'lady-sun',
        reason: {
          en: 'Lady Sun\'s Skill 1 roll + enhanced auto outranges and out-damages Chicha\'s engage range. Chicha dashes in → Lady Sun rolls away → shoots her in the face. Repeat until Chicha is dead or zoned off farm. Lady Sun\'s 10% armor shred on Skill 2 makes Chicha\'s tankiness meaningless.',
          'zh-TW': '孫尚香一技能翻滾+強化普攻手比蚩奼進場範圍遠。蚩奼衝進來→孫尚香翻走→貼臉射。重複到蚩奼死或被逼出兵線。二技能10%破甲讓蚩奼的坦度無意義。',
        },
        tags: [
          { en: 'Dash + Poke', 'zh-TW': '位移消耗' },
          { en: 'Armor Shred', 'zh-TW': '破甲打擊' },
          { en: 'Lane Bully', 'zh-TW': '對線碾壓' },
        ],
      },
    ],
    metaTrend: {
      summary: {
        en: 'Chicha has a 50.64% win rate with 1.5% pick rate — she\'s a solid clash lane fighter that wins extended 1v1 matchups. However, the current marksman-heavy meta (Hou Yi, Marco Polo, Lady Sun all top-tier) makes her life miserable. She dominates melee matchups but auto-loses to any ranged hero. Her ban rate (0.37%) is low because ranged counters are so common.',
        'zh-TW': '蚩奼50.64%勝率1.5%選用率——穩健的對抗路戰士，贏持久1v1。但當前射手版本（后羿、馬可、孫尚香全一線）讓她日子難過。近戰對局統治級，對任何遠程自動輸。禁率低（0.37%）因為遠程克制太普遍。',
      },
      reasons: [
        {
          en: 'Marksmen dominate the current meta — Chicha is a melee fighter who can\'t reach backlines. Every meta marksman kites her to death.',
          'zh-TW': '射手統治當前版本——蚩奼是碰不到後排的近戰。每個版本射手都能風箏死她。',
        },
        {
          en: 'Her knockup is telegraphed with a 0.5s ground indicator — any hero with a dash dodges it. In high elo, she never lands her engage.',
          'zh-TW': '擊飛有0.5秒地面提示——有位移的英雄都躲得掉。高分段從不讓她進場成功。',
        },
        {
          en: 'She thrives in 1v1 sidelane but teamfights are 5v5. Her single-target CC chain is great for picks but bad for front-to-back teamfights.',
          'zh-TW': '1v1邊帶很強但團戰是5v5。單體連控抓人強，正面團戰弱。',
        },
      ],
    },
    why: [
      {
        en: 'Pure melee with zero ranged poke. Any ranged hero can free-trade while she can only watch. Her only gap-close (Skill 1) has a short dash distance.',
        'zh-TW': '純近戰零遠程消耗。任何遠程都能白換血，她只能看。唯一貼臉（一技能）位移距離短。',
      },
      {
        en: 'Her entire combo relies on landing Skill 2 knockup — a telegraphed AoE with 0.5s delay. Dodge it and she has no kill threat for the next 8 seconds.',
        'zh-TW': '整套連招依賴二技能擊飛——有0.5秒延遲的地面提示AOE。躲掉後8秒零擊殺威脅。',
      },
      {
        en: 'No sustain in her base kit — relies entirely on items for lifesteal. Poke her in lane and she has to recall. Other fighters (Dun, Kaizer) have built-in sustain.',
        'zh-TW': '基礎技能不帶續航——完全依賴吸血裝。線上消耗她就得回家。其他戰士（夏侯惇、鎧）自帶續航。',
      },
    ],
    mistakes: [
      {
        en: 'Fighting her in melee range during her Ultimate transformation → she has bonus HP, damage, and CC. → Disengage when she transforms. Wait 8 seconds for the buff to expire, then re-engage.',
        'zh-TW': '大招變身期間近戰對拼 → 她有額外血量、傷害和控制。→ 變身時拉開，等8秒增益結束再打。',
      },
      {
        en: 'Standing on her knockup indicator → walk straight into CC → she full combos you to death. → Sidestep the indicator. It appears before the CC procs.',
        'zh-TW': '站在擊飛提示圈上 → 直走到控 → 她整套帶走。→ 走位躲圈。提示出現在控制之前。',
      },
      {
        en: 'Letting her freeze wave and zone you off farm in clash lane → she out-scales you. → Call jungle to break freeze. Don\'t let her dictate the lane tempo.',
        'zh-TW': '對抗路被她控線趕出經驗區 → 她發育碾壓你。→ 叫打野來破控線。別讓她主導對線節奏。',
      },
    ],
    faqUltimate: {
      en: 'Chicha\'s Ultimate transforms her for 8 seconds, granting bonus HP, attack damage, and enhanced skills. DO NOT fight her during this transformation — disengage immediately. Kite her until the transformation ends (she\'s melee-only). After the buff expires, she\'s significantly weaker. Engage while her ultimate is on cooldown (40s).',
      'zh-TW': '蚩奼大招變身8秒，獲得額外血量、攻擊力和強化技能。變身期間不要跟她打——立刻拉開。風箏到變身結束（她純近戰）。增益結束後明顯變弱。大招40秒CD時進場。',
    },
    faqItems: {
      en: '**Marksmen/Mages:** Kite items — Swiftboots, Frosty Revenge for slow. Keep max range at all times. **Tanks:** Physical armor to match her damage type. **Key:** She\'s 100% physical — magic resist is wasted. Movement speed items to dodge knockup.',
      'zh-TW': '**射手/法師：** 風箏裝——輕靈鞋、冰霜法杖減速。保持最遠距離。**坦克：** 物防對應傷害類型。**關鍵：** 她100%物理——魔抗浪費。移速裝提高躲擊飛能力。',
    },
    faqWho: {
      en: 'Marco Polo (#1 counter) — infinite kiting + true damage ignores armor. Hou Yi — sustained DPS shreds from range. Lady Sun — roll + poke, armor shred on Skill 2.',
      'zh-TW': '馬可波羅（頭號天敵）——無限風箏+真傷無視護甲。后羿——持續DPS遠程蒸發。孫尚香——翻滾消耗，二技能破甲。',
    },
    faqHowToLane: {
      en: 'Pick ranged heroes against her — any marksman or mage wins lane by default. Poke her constantly since she has zero sustain. Dodge the knockup indicator (ground circle) by walking sideways or dashing. Freeze wave near your tower — she must overextend to farm. Call jungle if she pushes up; she has no escape beyond a short dash.',
      'zh-TW': '選遠程英雄打她——任何射手或法師默認贏線。不停消耗（她零續航）。走位橫移或位移躲擊飛地面圈。兵線控塔前——她必須站位過深補兵。推線就叫打野來抓；短位移以外沒逃生。',
    },
    faqSeason: {
      en: 'Chicha is a situational counter-pick in clash lane. Pick her into melee fighters (Arthur, Lu Bu) and she dominates. Never pick her into ranged top laners or against kite-heavy team comps. Bronze–Platinum: strong because players don\'t kite. Diamond+: falls off hard — every meta ADC kites her to death.',
      'zh-TW': '蚩奼是對抗路情況性反制角。對近戰戰士（亞瑟、呂布）選她統治級。絕不選來打遠程上路或風箏陣容。青銅~白金：強（沒人會風箏）。鑽石以上：斷崖下跌——每個版本ADC都能風箏死她。',
    },
  },
