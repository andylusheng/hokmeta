/**
 * Generate counterDetails + bestCounter for Top 30 heroes.
 * Data sourced from hokstats.gg + community cross-reference (2026-06).
 * Run: node scripts/generate-counter-details.js
 * Output: prints TypeScript code blocks for manual insertion.
 */
const heroes = require('../public/api/heroes.json');

function findHero(query) {
  return heroes.find(h => h.slug === query || h.name === query);
}

// Each entry: { slug, bestCounterSlug, advantage, bestReason-en, bestReason-zh, counters: [{slug, en, zh, tags}...] }
const data = [
  {
    slug: 'marco-polo',
    best: 'arli', adv: 5.5,
    bestEn: "Arli is Marco's hardest counter. Skill 2 (Frost) deflects ALL of Marco's Skill 1 bullets — his entire poke and passive-stacking tool is deleted. More dashes than Marco, and her Ultimate knocks him back mid-Fevered Barrage to cancel it completely. In lane, Arli bullies Marco from level 1.",
    bestZh: '公孫離是馬可的頭號機制天敵。二技能霜葉舞格擋所有飛行物——馬可一技能子彈全部吃掉，被動疊不起來=零傷害。位移比馬可還多，大招擊退直接斷狂熱彈幕。對線從1級碾壓到18級。',
    counters: [
      { slug: 'arli',
        en: "Arli's Skill 2 deflects projectiles — Marco's Skill 1 bullets vanish, zero passive stacks. She has 3 dashes vs his 1 blink, so he can never escape her. Her Ultimate knocks him out of Fevered Barrage channel. Mechanically perfect counter.",
        zh: '公孫離二技能格擋飛行物——馬可一技能全被吃掉，被動零層。她3段位移vs馬可1段閃爍，永遠跑不掉。大招擊退直接打斷狂熱彈幕。機制完美克制。',
        tags: [{en:'Projectile Block',zh:'格擋飛行物'},{en:'3 Dashes',zh:'三段位移'},{en:'Knockback',zh:'擊退打斷'}] },
      { slug: 'musashi',
        en: "Musashi's Skill 1 (Illuminating Slash) knocks down projectiles — Marco's entire Skill 1 is negated. Ultimate (Duel to the Death) point-click locks Marco in place; he cannot blink out. Musashi's burst kills Marco before passive stacks reach 10.",
        zh: '宮本一技能空明斬擊落飛行物——馬可一技能全廢。大招一決生死指向鎖定，馬可交閃也跑不掉。爆發傷害在被動疊滿前就能秒殺。',
        tags: [{en:'Projectile Block',zh:'擊落飛行物'},{en:'Point-Click Lock',zh:'指向鎖定'},{en:'Burst Kill',zh:'爆發秒殺'}] },
      { slug: 'lian-po',
        en: 'Lian Po has CC immunity during skill casts — walks through Skill 1 unharmed. Ultimate chain-knockup cancels Fevered Barrage. Passive damage reduction + shield neutralizes true damage burst.',
        zh: '廉頗技能自帶霸體——無視一技能走臉上。大招連環擊飛斷大。被動減傷+護盾硬吃真傷爆發。',
        tags: [{en:'CC Immune',zh:'霸體'},{en:'Chain Knockup',zh:'連環擊飛'},{en:'Damage Reduction',zh:'減傷護盾'}] },
      { slug: 'zhang-fei', en:'Ultimate pushes Marco out of effective range. Team-wide shield negates lane poke. In beast form, too tanky to burst before team collapses.', zh:'大招推出輸出範圍。全隊護盾廢掉對線消耗。變身狀態坦度爆表，馬可一套打不死就被反打。', tags:[{en:'Displacement',zh:'擊退'},{en:'Team Shield',zh:'團隊護盾'}] },
      { slug: 'consort-yu', en:'Skill 2 grants 2s physical immunity — Marco deals zero damage. Point-click stun from Ultimate cannot be dodged. Bullies Marco in lane every time Skill 2 is up.', zh:'二技能物理免疫2秒——馬可零輸出。大招指向暈眩躲不掉。每次二技能轉好就能壓馬可出經驗區。', tags:[{en:'Physical Immune',zh:'物理免疫'},{en:'Point-Click CC',zh:'指向硬控'}] },
    ]
  },
  {
    slug: 'hou-yi',
    best: 'agudo', adv: 4.2,
    bestEn: 'Agudo jungler dives Hou Yi with zero counterplay — his pets block Hou Yi\'s auto-attacks and his dash closes the gap instantly. Hou Yi has no mobility to escape once dove.',
    bestZh: '阿古朵打野無腦衝后羿——寵物擋普攻，位移瞬間貼臉。后羿零位移，被衝就死。',
    counters: [
      { slug: 'agudo', en:'Jungle dive with pets blocks Hou Yi autos; dash closes gap. Hou Yi has zero escape tools.', zh:'打野衝臉+寵物擋普攻，位移貼臉。后羿零逃生。', tags:[{en:'Dive',zh:'衝臉'},{en:'Pet Block',zh:'寵物格擋'}] },
      { slug: 'master-luban', en:'Skill 2 pulls Hou Yi out of position. His shield and CC chain deny any return damage window.', zh:'二技能拉走位。護盾+連控讓后羿無法還手。', tags:[{en:'Pull',zh:'強制位移'},{en:'CC Chain',zh:'連控'}] },
      { slug: 'daji', en:'Point-click charm into full combo deletes Hou Yi before he auto-attacks twice. Bushes = death zone.', zh:'指向魅惑接全套秒殺——后羿A兩下就死。草叢=死亡區。', tags:[{en:'Point-Click Burst',zh:'指向秒殺'},{en:'Bush Ambush',zh:'草叢埋伏'}] },
      { slug: 'li-bai', en:'Double dash into untargetable Ultimate bypasses front line. Hou Yi cannot kite or escape once Li Bai closes.', zh:'兩段位移+無法選中大招無視前排。李白近身後后羿跑不掉也風箏不了。', tags:[{en:'Untargetable',zh:'無法選中'},{en:'Backline Dive',zh:'切後排'}] },
    ]
  },
  {
    slug: 'luban-no-7',
    best: 'lian-po', adv: 4.5,
    bestEn: 'Lian Po walks through all of Luban\'s damage with CC immunity + damage reduction, then chain-knockups him to death. Luban has zero mobility and cannot escape once dove.',
    bestZh: '廉頗霸體+減傷無視魯班所有輸出，連環擊飛控到死。魯班零位移，被貼臉就跑不掉。',
    counters: [
      { slug: 'lian-po', en:'CC immunity + damage reduction ignores all of Luban\'s output. Chain-knockup = death.', zh:'霸體+減傷無視魯班全部輸出。連環擊飛=必死。', tags:[{en:'CC Immune',zh:'霸體'},{en:'Chain CC',zh:'連控'}] },
      { slug: 'gao-changgong', en:'Stealth into point-blank stun from invisibility. Luban cannot react — dead before stealth breaks.', zh:'隱身貼臉暈眩。魯班看不到人就死了——隱身破開時畫面已黑白。', tags:[{en:'Stealth Gank',zh:'隱身抓人'},{en:'Point-Blank Stun',zh:'貼臉暈眩'}] },
      { slug: 'li-bai', en:'Double dash over front line, Skill 2 and Ultimate untargetable frames dodge all of Luban\'s retaliation. One rotation kills.', zh:'兩段位移越過前排，二技能+大招無法選中躲全部反擊。一套帶走。', tags:[{en:'Untargetable',zh:'無法選中'},{en:'Backline Delete',zh:'秒後排'}] },
    ]
  },
  {
    slug: 'angela',
    best: 'han-xin', adv: 4.0,
    bestEn: 'Han Xin\'s multi-dash mobility dodges Angela\'s slow Skill 2 fireball every time. He flanks during her immobile Ultimate channel and kills her before the beam turns.',
    bestZh: '韓信多段位移每次都能躲安琪拉二技能火球。大招收束期間繞後斬殺——光束還沒轉過來人就沒了。',
    counters: [
      { slug: 'han-xin', en:'Multi-dash dodges Skill 2 fireball. Flanks during immobile Ultimate channel for free kill.', zh:'多段位移躲二技能。大招站樁期間繞後白撿人頭。', tags:[{en:'Multi-Dash',zh:'多段位移'},{en:'Flank Kill',zh:'繞後斬殺'}] },
      { slug: 'gao-changgong', en:'Stealth approach bypasses Angela\'s zoning. Stun from invisibility into full combo kills before she can react.', zh:'隱身無視安琪拉區域控制。隱身暈接全套秒殺——來不及反應。', tags:[{en:'Stealth Engage',zh:'隱身進場'},{en:'Burst',zh:'爆發秒殺'}] },
    ]
  },
  {
    slug: 'daji',
    best: 'gao-changgong', adv: 4.3,
    bestEn: 'Gao Changgong stealths past all of Daji\'s vision, stuns her from invisibility, and deletes her before charm finishes casting. Zero counterplay.',
    bestZh: '蘭陵王隱身無視妲己視野，隱身暈接一套秒——魅惑還沒讀完人就沒了。零反製手段。',
    counters: [
      { slug: 'gao-changgong', en:'Stealth into stun deletes Daji before charm casting completes. She can never react in time.', zh:'隱身貼臉暈接秒殺——魅惑讀條還沒結束。永遠來不及反應。', tags:[{en:'Stealth Burst',zh:'隱身秒殺'},{en:'Pre-Cast Kill',zh:'讀條前斬殺'}] },
      { slug: 'mulan', en:'Silence from light-form opener prevents Daji from casting anything. Heavy-form burst kills through any HP.', zh:'輕劍沉默不給妲己放任何技能。重劍爆發無視血量直接帶走。', tags:[{en:'Silence',zh:'沉默'},{en:'Burst Combo',zh:'爆發連招'}] },
    ]
  },
  {
    slug: 'dun',
    best: 'han-xin', adv: 3.8,
    bestEn: 'Han Xin\'s multi-dash kiting outmaneuvers Dun\'s short-range engage. Han Xin invades early to deny jungle farm, and Dun cannot catch him without allied CC setup.',
    bestZh: '韓信多段位移風箏夏侯惇短手。前期入侵野區不給發育，夏侯惇沒有隊友幫控根本摸不到韓信。',
    counters: [
      { slug: 'han-xin', en:'Multi-dash kites Dun\'s short range. Early invade denies farm. Dun can never catch him solo.', zh:'多段位移風箏短手夏侯。前期反野壓制發育。單挑永遠摸不到。', tags:[{en:'Kite King',zh:'風箏之王'},{en:'Early Invade',zh:'前期反野'}] },
      { slug: 'li-bai', en:'Untargetable frames dodge Dun\'s hook and burst. Skill 1 afterimage lets him trade then disappear before Dun retaliates.', zh:'無法選中躲鉤子和爆發。一技能殘影打完就跑，夏侯來不及還手。', tags:[{en:'Untargetable',zh:'無法選中'},{en:'Hit & Run',zh:'打完就跑'}] },
      { slug: 'wukong', en:'Stealth approach bypasses Dun\'s front line. Clone confuses targeting, burst kills through passive shield.', zh:'隱身無視前排。分身迷惑目標，爆發穿被動護盾強殺。', tags:[{en:'Stealth',zh:'隱身'},{en:'Shield Pierce',zh:'穿盾爆發'}] },
    ]
  },
  {
    slug: 'milady',
    best: 'allain', adv: 4.0,
    bestEn: 'Allain\'s dash + shield absorbs Milady\'s robot wave damage. He dives onto her through the minion army — she has zero mobility and dies instantly once gap is closed.',
    bestZh: '亞連位移+護盾吃機器人傷害。穿過僕從大軍貼臉——米萊狄零位移，被近身就死。',
    counters: [
      { slug: 'allain', en:'Dash + shield absorbs robot damage. Dives through minion army onto immobile Milady.', zh:'位移+護盾硬吃機器人。穿過僕從海貼臉零位移法師。', tags:[{en:'Shield',zh:'護盾'},{en:'Dive',zh:'衝臉'}] },
      { slug: 'fuzi', en:'Ultimate cage traps Milady with no escape. Passive true damage ignores her HP items. She dies in the cage or burns flash.', zh:'大招牢籠困住米萊狄無路可逃。被動真傷無視血量裝。牢裡等死或交閃。', tags:[{en:'Cage Trap',zh:'牢籠困殺'},{en:'True Damage',zh:'真傷'}] },
      { slug: 'haya', en:'Ultimate pulls Milady into Mirage 1v1 — without her robot army, she deals zero damage and dies every time.', zh:'大招拖進幻境1v1——沒有機器人大軍，米萊狄零傷害必死。', tags:[{en:'1v1 Isolation',zh:'1v1隔離'},{en:'No Minion = No Damage',zh:'無僕從=零傷害'}] },
    ]
  },
  {
    slug: 'wang-zhaojun',
    best: 'han-xin', adv: 4.4,
    bestEn: 'Han Xin dodges her freeze with multi-dash mobility. He dives during her immobile Ultimate channel and kills before she can reposition. Wang Zhaojun relies entirely on landing Skill 2 freeze.',
    bestZh: '韓信多段位移永遠不吃冰凍。大招站樁期間衝臉秒殺。王昭君全靠二技能冰凍，凍不住就是廢人。',
    counters: [
      { slug: 'han-xin', en:'Multi-dash never gets frozen. Dives during immobile Ultimate channel for guaranteed kill.', zh:'多段位移永遠不吃冰凍。大招站樁期間衝臉穩殺。', tags:[{en:'Multi-Dash',zh:'多段位移'},{en:'CC Immune Dive',zh:'免控衝臉'}] },
      { slug: 'gao-changgong', en:'Stealth bypasses her zone control entirely. Stuns from invisibility before freeze cast time completes.', zh:'隱身完全繞過區域控制。冰凍讀條還沒結束就被隱身暈秒殺。', tags:[{en:'Stealth',zh:'隱身'},{en:'Pre-Cast Kill',zh:'讀條前秒殺'}] },
    ]
  },
  {
    slug: 'lady-sun',
    best: 'gao-changgong', adv: 4.6,
    bestEn: 'Gao Changgong stealths past Lady Sun\'s range advantage. Stuns from invisibility — she cannot dodge-roll what she cannot see. One full combo kills before she can Purify.',
    bestZh: '蘭陵王隱身無視孫尚香手長優勢。隱身暈——她看不到就翻滾不了。全套爆發秒殺，淨化都來不及按。',
    counters: [
      { slug: 'gao-changgong', en:'Stealth bypasses range advantage. Stun from invisibility — she cannot dodge what she cannot see.', zh:'隱身無視手長。隱身暈——看不到就躲不掉。', tags:[{en:'Stealth Delete',zh:'隱身秒殺'},{en:'Undodgeable',zh:'無法躲避'}] },
      { slug: 'mulan', en:'Silence opener prevents dodge-roll. Heavy-form burst kills Lady Sun through any items. Her dash is useless while silenced.', zh:'沉默開局不給翻滾。重劍爆發無視裝備硬殺。被沉默時位移是廢的。', tags:[{en:'Silence',zh:'沉默'},{en:'True Burst',zh:'真實爆發'}] },
    ]
  },
  {
    slug: 'li-xin',
    best: 'cai-yan', adv: 4.1,
    bestEn: 'Cai Yan\'s AoE heal negates Li Xin\'s poke. Her stun + ultimate silence chain prevents him from swapping forms mid-fight. Li Xin cannot burst through constant healing.',
    bestZh: '蔡文姬範圍奶廢掉李信消耗。暈眩+大招沉默連鎖不給切形態。持續奶量讓李信爆發永遠打不死人。',
    counters: [
      { slug: 'cai-yan', en:'AoE heal negates poke. Stun + silence chain prevents form swap. Constant healing out-sustains his burst.', zh:'範圍奶廢消耗。暈+沉默不給切形態。持續奶讓爆發打不出斬殺線。', tags:[{en:'AoE Heal',zh:'範圍奶'},{en:'Silence Chain',zh:'沉默連鎖'}] },
      { slug: 'da-qiao', en:'Global teleport rotates team to punish Li Xin\'s split push. Silence + knockup cancel his Dark Form combo mid-animation.', zh:'全圖傳送輪轉抓李信分帶。沉默+擊飛打斷暗形態連招動畫。', tags:[{en:'Global Rotation',zh:'全圖輪轉'},{en:'Silence Cancel',zh:'沉默打斷'}] },
      { slug: 'guiguzi', en:'Stealth engage into AoE pull catches Light Form Li Xin before he can transform. Team follows up for instant deletion.', zh:'隱身開團接範圍拉——光形態李信來不及切換就被拉到人群中蒸發。', tags:[{en:'Stealth Engage',zh:'隱身開團'},{en:'AoE Pull',zh:'範圍拉人'}] },
    ]
  },
  {
    slug: 'xiao-qiao',
    best: 'liu-bei', adv: 3.8,
    bestEn: 'Liu Bei\'s dash + shield absorbs Xiao Qiao\'s burst. He closes the gap through her Skill 2 tornado and kills her before cooldowns refresh. She has zero escape after missing tornado.',
    bestZh: '劉備位移+護盾吃小喬爆發。穿過二技能龍捲風貼臉，技能CD轉好前就死。龍捲風沒中=必死。',
    counters: [
      { slug: 'liu-bei', en:'Dash + shield absorbs burst. Closes through tornado, kills before CDs refresh.', zh:'位移+護盾吃爆發。穿龍捲風貼臉，CD轉好前秒殺。', tags:[{en:'Shield',zh:'護盾'},{en:'Gap Close',zh:'貼臉'}] },
      { slug: 'menki', en:'Hook + stun catches Xiao Qiao during her immobile Skill 1 cast. Long-range engage from outside her tornado range.', zh:'鉤子+暈抓住小喬一技能站樁瞬間。龍捲風範圍外長距開團。', tags:[{en:'Hook',zh:'鉤子'},{en:'Long-Range Engage',zh:'長距開團'}] },
    ]
  },
  {
    slug: 'dolia',
    best: 'sima-yi', adv: 4.0,
    bestEn: 'Sima Yi\'s silence prevents Dolia from casting any support spells. His burst kills through her shield. Dolia relies entirely on spell timing — silence removes her from the fight.',
    bestZh: '司馬懿沉默不給朵莉亞放任何輔助技能。爆發穿護盾強殺。朵莉亞全靠技能時機——沉默直接讓她從團戰消失。',
    counters: [
      { slug: 'sima-yi', en:'Silence prevents all support casts. Burst kills through shield. Spell-reliant Dolia removed from fight.', zh:'沉默不給放技能。爆發穿盾強殺。靠技能吃飯的朵莉亞直接廢掉。', tags:[{en:'Silence',zh:'沉默'},{en:'Shield Pierce',zh:'穿盾爆發'}] },
      { slug: 'guiguzi', en:'Stealth AoE pull catches Dolia before she can position. Team follows up for instant kill on immobile support.', zh:'隱身範圍拉抓站位失誤。隊友跟進秒殺零位移輔助。', tags:[{en:'AoE Pull',zh:'範圍拉人'},{en:'Stealth Initiate',zh:'隱身先手'}] },
    ]
  },
  {
    slug: 'kaizer',
    best: 'donghuang', adv: 4.5,
    bestEn: 'Donghuang\'s point-click suppression ignores Kaizer\'s damage reduction ultimate. %HP damage from passive melts Kaizer\'s HP stacking. Kaizer\'s entire tank build is nullified.',
    bestZh: '東皇指向壓制無視鎧大招減傷。被動%HP傷害融掉鎧的血量堆疊。鎧全肉出裝直接報廢。',
    counters: [
      { slug: 'donghuang', en:'Point-click suppression bypasses damage reduction. %HP passive melts HP stacking. Tank build nullified.', zh:'指向壓制無視減傷。被動%HP融血量。肉裝報廢。', tags:[{en:'Suppression',zh:'壓制'},{en:'%HP Damage',zh:'%HP傷害'}] },
      { slug: 'kui', en:'Hook pulls Kaizer out of position before ultimate activates. %HP damage from passive shreds his armor stacking.', zh:'鉤子在大招開出來前拉走位。被動%HP傷害穿護甲堆疊。', tags:[{en:'Hook',zh:'鉤子'},{en:'Armor Shred',zh:'破甲'}] },
      { slug: 'sun-bin', en:'Silence prevents Ultimate activation. Speed boost + slow kites Kaizer infinitely. He can never reach a target.', zh:'沉默不給開大招。加速+減速無限風箏。鎧永遠摸不到人。', tags:[{en:'Silence',zh:'沉默'},{en:'Infinite Kite',zh:'無限風箏'}] },
    ]
  },
  {
    slug: 'luara',
    best: 'lapulapu', adv: 3.5,
    bestEn: 'Lapulapu dives Luara through her range advantage. His CC chain prevents any kiting. Luara has no hard CC to peel for herself.',
    bestZh: '拉普拉普穿過手長優勢衝臉。連控不給風箏機會。盧雅那沒硬控自保。',
    counters: [
      { slug: 'lapulapu', en:'Dive + CC chain prevents kiting. Closes gap through range advantage. No hard CC to peel.', zh:'衝臉+連控不給風箏。穿手長貼臉。零硬控自保。', tags:[{en:'Dive',zh:'衝臉'},{en:'CC Chain',zh:'連控'}] },
      { slug: 'ata', en:'Hook + displacement pulls Luara from safe position. Tank build absorbs all her poke damage.', zh:'鉤子+位移把盧雅那從安全位置拉出來。坦克出裝吃全部消耗。', tags:[{en:'Hook',zh:'鉤子'},{en:'Tank',zh:'坦克'}] },
    ]
  },
  {
    slug: 'consort-yu',
    best: 'luna', adv: 4.0,
    bestEn: "Luna's magic damage completely bypasses Yu Ji's physical immunity. Infinite dash resets mean Yu Ji can never land Skill 2 window for trade. Pure magic burst kills through any physical defense.",
    bestZh: '露娜法傷完全無視虞姬物理免疫。無限連刷新位移讓虞姬永遠抓不到二技能換血窗口。純法爆發穿任何物防。',
    counters: [
      { slug: 'luna', en:'Magic damage bypasses physical immunity. Infinite dashes out-trade Skill 2 window. Pure AP burst.', zh:'法傷無視物理免疫。無限位移碾壓二技能窗口。純AP爆發。', tags:[{en:'Magic Damage',zh:'法傷'},{en:'Infinite Dash',zh:'無限位移'}] },
      { slug: 'diaochan', en:'True damage ignores Yu Ji\'s physical defense. Multiple dashes dodge her Ultimate stun. Lifesteal out-sustains her poke.', zh:'真傷無視物防。多段位移躲大招暈。吸血續航碾壓消耗。', tags:[{en:'True Damage',zh:'真傷'},{en:'Lifesteal',zh:'吸血續航'}] },
    ]
  },
  {
    slug: 'chicha',
    best: 'hou-yi', adv: 3.6,
    bestEn: 'Hou Yi outranges Chicha and punishes her approach with rapid-fire autos. His slow prevents her from entering effective range. Late-game Hou Yi melts Chicha before she stacks her passive.',
    bestZh: '后羿手長壓制，快速普攻懲罰每次上前。減速不給進有效範圍。後期后羿在被動疊滿前就能融掉蚩奼。',
    counters: [
      { slug: 'hou-yi', en:'Range advantage + perma-slow prevents approach. Rapid autos delete before passive stacks.', zh:'手長+永久減速不給近身。快速普攻在被動疊滿前秒殺。', tags:[{en:'Range',zh:'手長'},{en:'Perma-Slow',zh:'永久減速'}] },
      { slug: 'marco-polo', en:'High mobility kites Chicha endlessly. True damage bypasses any defense stacking. Chicha cannot land hits on a dashing target.', zh:'高機動無限風箏。真傷無視防禦堆疊。蚩奼打不中一直在位移的目標。', tags:[{en:'Mobility',zh:'機動性'},{en:'True Damage',zh:'真傷'}] },
      { slug: 'lady-sun', en:'Dodge-roll + burst combo out-trades Chicha. One full rotation kills before Chicha can return damage.', zh:'翻滾+爆發連招換血碾壓。一套打完蚩奼還沒來得及還手就死。', tags:[{en:'Burst',zh:'爆發'},{en:'Mobility',zh:'位移'}] },
    ]
  },
  {
    slug: 'erin',
    best: 'dun', adv: 4.3,
    bestEn: "Dun's hook + dive ignores Erin's kiting. His passive shield absorbs her mixed damage. Once hooked, Erin has zero escape and dies before the CC chain ends.",
    bestZh: '夏侯惇鉤子+衝臉無視艾琳風箏。被動護盾吃混合傷害。被鉤到就零逃生，連控結束前人已蒸發。',
    counters: [
      { slug: 'dun', en:'Hook + dive ignores kiting. Passive shield absorbs mixed damage. Zero escape after hook lands.', zh:'鉤子+衝臉無視風箏。被動護盾吃混傷。鉤到就零逃生。', tags:[{en:'Hook',zh:'鉤子'},{en:'Shield',zh:'護盾'}] },
      { slug: 'garo', en:'Extreme range + silence on crit prevents Erin from casting spells. Outranges her entirely — she dies before entering auto range.', zh:'極限手長+暴擊沉默不給放技能。完全超出手長——進普攻範圍前就死。', tags:[{en:'Outrange',zh:'手長碾壓'},{en:'Silence',zh:'暴擊沉默'}] },
      { slug: 'hou-yi', en:'Rapid-fire autos + slow prevents Erin from kiting. Sustained DPS exceeds her burst window.', zh:'快速普攻+減速不給風箏。持續DPS超過爆發窗口。', tags:[{en:'Sustained DPS',zh:'持續輸出'},{en:'Slow',zh:'減速'}] },
    ]
  },
  {
    slug: 'aoyin',
    best: 'garo', adv: 4.0,
    bestEn: "Garo outranges Ao'yin completely — her silence on crit prevents his dragon-form skill casts. Ao'yin must walk into Garo's range to deal damage and dies before reaching her.",
    bestZh: '伽羅手長完全壓制敖隱——暴擊沉默不給放龍形態技能。敖隱必須走進伽羅射程才能輸出，還沒走到就死。',
    counters: [
      { slug: 'garo', en:'Outranges completely — Ao\'yin dies before entering his own range. Silence on crit blocks skill casts.', zh:'手長完全碾壓——敖隱進自己射程前就死。暴擊沉默封技能。', tags:[{en:'Outrange',zh:'手長碾壓'},{en:'Silence',zh:'暴擊沉默'}] },
      { slug: 'mulan', en:'Silence + heavy-form burst kills Ao\'yin before he can transform. CC chain prevents any counterplay.', zh:'沉默+重劍爆發不給切形態。連控零反製。', tags:[{en:'Silence',zh:'沉默'},{en:'Burst',zh:'爆發'}] },
    ]
  },
  {
    slug: 'wukong',
    best: 'agudo', adv: 3.9,
    bestEn: "Agudo's pets block Wukong's critical strikes. Her dash + CC prevents his stealth engage. Wukong relies on crit RNG — Agudo's tankiness neutralizes his burst window.",
    bestZh: '阿古朵寵物擋暴擊。位移+控不給隱身進場。悟空靠暴擊運氣——阿古朵坦度讓爆發窗口失效。',
    counters: [
      { slug: 'agudo', en:'Pets block crits. Dash + CC prevents stealth engage. Tankiness neutralizes burst window.', zh:'寵物擋暴擊。位移+控封隱身進場。坦度廢爆發窗口。', tags:[{en:'Pet Block',zh:'寵物格擋'},{en:'Tank',zh:'坦度'}] },
      { slug: 'gao', en:'Shield absorbs Wukong\'s burst. CC prevents clone confusion. Sustained damage wins extended trades.', zh:'護盾吃爆發。控不給分身迷惑。持續傷害贏持久戰。', tags:[{en:'Shield',zh:'護盾'},{en:'Sustained',zh:'持續輸出'}] },
      { slug: 'heino', en:'Damage immunity frames dodge critical strikes. Counter-burst kills Wukong during his cooldown window.', zh:'免傷幀躲暴擊。反手爆發在悟空CD期間斬殺。', tags:[{en:'Immunity',zh:'免傷'},{en:'Counter-Burst',zh:'反手爆發'}] },
    ]
  },
  {
    slug: 'arthur',
    best: 'xiang-yu', adv: 3.7,
    bestEn: "Xiang Yu's %HP damage shreds Arthur's tank build. His displacement prevents Arthur from reaching the backline. Arthur cannot trade into %HP true damage.",
    bestZh: '項羽%HP傷害粉碎亞瑟肉裝。位移不給切後排。亞瑟換血換不過%HP真傷。',
    counters: [
      { slug: 'xiang-yu', en:'%HP damage shreds tank build. Displacement prevents backline access.', zh:'%HP粉碎肉裝。位移不給切後排。', tags:[{en:'%HP Damage',zh:'%HP傷害'},{en:'Displacement',zh:'位移'}] },
      { slug: 'lady-sun', en:'Dodge-roll evades Arthur\'s engage. Burst combo penetrates his armor. Never in range for his silence.', zh:'翻滾躲亞瑟進場。爆發穿護甲。永遠不在沉默範圍內。', tags:[{en:'Mobility',zh:'位移'},{en:'Armor Pen',zh:'破甲'}] },
    ]
  },
  {
    slug: 'kongming',
    best: 'allain', adv: 4.2,
    bestEn: "Allain's shield absorbs Kongming's full burst combo. His dash closes the gap through Kongming's Skill 2 portals. Kongming cannot one-shot a shielded target — and dies during cooldowns.",
    bestZh: '亞連護盾吃諸葛亮全套爆發。位移穿二技能傳送門貼臉。諸葛秒不掉帶盾目標——CD期間自己死。',
    counters: [
      { slug: 'allain', en:'Shield absorbs full burst combo. Dash closes through portals. Dies during cooldown window.', zh:'護盾吃全套爆發。位移穿傳送門貼臉。CD期間等死。', tags:[{en:'Shield',zh:'護盾'},{en:'Gap Close',zh:'貼臉'}] },
      { slug: 'biron', en:'Tank build + %HP damage out-sustains Kongming. Survives burst, then kills during cooldowns.', zh:'肉裝+%HP續航碾壓諸葛。扛過爆發，CD期間反殺。', tags:[{en:'Tank',zh:'坦克'},{en:'Sustain',zh:'續航'}] },
      { slug: 'wuyan', en:'Shield + magic resist neutralizes burst. Stun prevents Ultimate channel. Kongming cannot reset off a tank.', zh:'護盾+魔抗廢爆發。暈不給開大。諸葛亮打坦無法刷新。', tags:[{en:'Magic Resist',zh:'魔抗'},{en:'Stun',zh:'暈眩'}] },
    ]
  },
  {
    slug: 'cai-yan',
    best: 'gao-changgong', adv: 4.4,
    bestEn: "Gao Changgong stealths past Cai Yan's team and deletes her before she can heal. Stun from invisibility into full combo — Cai Yan's healing is useless if she dies first.",
    bestZh: '蘭陵王隱身繞過隊友秒蔡文姬。隱身暈接全套——奶媽先死，奶量等於零。',
    counters: [
      { slug: 'gao-changgong', en:'Stealth past team, deletes healer first. Stun from invisibility — she dies before healing activates.', zh:'隱身繞過隊友先秒奶媽。隱身暈——奶還沒開出來人就沒了。', tags:[{en:'Stealth Delete',zh:'隱身秒殺'},{en:'Healer Priority',zh:'優先殺奶'}] },
      { slug: 'mulan', en:'Silence prevents healing casts. Heavy-form burst kills through any HP. Zero healing = dead team.', zh:'沉默不給放奶。重劍爆發無視血量。零奶量=團滅。', tags:[{en:'Silence',zh:'沉默'},{en:'Burst',zh:'爆發'}] },
    ]
  },
  {
    slug: 'augran',
    best: 'liu-bei', adv: 3.9,
    bestEn: "Liu Bei's dash + shield survives Augran's execute threshold. His sustained damage wins extended trades. Augran relies on execute — Liu Bei never drops below 30% HP.",
    bestZh: '劉備位移+護盾扛過大司命斬殺線。持續傷害贏持久戰。大司命靠斬殺——劉備血量永遠不低於30%。',
    counters: [
      { slug: 'liu-bei', en:'Shield prevents dropping below execute threshold. Sustained DPS wins trades. Never in kill range.', zh:'護盾不給掉到斬殺線以下。持續DPS贏換血。永遠不在斬殺範圍。', tags:[{en:'Shield',zh:'護盾'},{en:'Sustain',zh:'續航'}] },
    ]
  },
  {
    slug: 'mozi',
    best: 'dolia', adv: 4.1,
    bestEn: "Dolia's cleanse removes Mozi's CC chain. Her sustain out-heals his poke. Mozi relies entirely on landing stuns — Dolia's team-wide cleanse nullifies his entire kit.",
    bestZh: '朵莉亞淨化解墨子連控。續航奶超過消耗。墨子全靠暈人——朵莉亞團隊淨化讓整套技能報廢。',
    counters: [
      { slug: 'dolia', en:'Team-wide cleanse removes CC chain. Sustain out-heals poke. His stun-reliant kit is nullified.', zh:'團隊淨化解連控。續航奶過消耗。靠暈吃飯的墨子直接報廢。', tags:[{en:'Cleanse',zh:'淨化'},{en:'Sustain',zh:'續航'}] },
      { slug: 'guiguzi', en:'Stealth AoE pull catches Mozi during his immobile Ultimate channel. Team collapses for instant deletion.', zh:'隱身範圍拉抓墨子大招站樁。隊友跟進瞬秒。', tags:[{en:'AoE Pull',zh:'範圍拉人'},{en:'Channel Cancel',zh:'打斷讀條'}] },
      { slug: 'nezha', en:'Unstoppable dash ignores Mozi\'s CC. Dives through stun into Mozi\'s face. CC immunity means Mozi\'s kit does nothing.', zh:'霸體衝鋒無視墨子控制。穿過暈眩直衝臉上。免控讓墨子技能全廢。', tags:[{en:'CC Immune',zh:'霸體'},{en:'Dive',zh:'衝臉'}] },
    ]
  },
  {
    slug: 'garo',
    best: 'gao-changgong', adv: 4.8,
    bestEn: "Gao Changgong stealths past Garo's extreme range. Stuns from invisibility — Garo cannot auto what she cannot see. One combo kills before she can reposition. Garo's entire strength is range; stealth negates it completely.",
    bestZh: '蘭陵王隱身繞過伽羅極限手長。隱身暈——看不到就打不到。一套秒殺不給換位。伽羅全靠手長，隱身直接廢掉。',
    counters: [
      { slug: 'gao-changgong', en:'Stealth negates range advantage. Stun from invisibility = death. Garo cannot auto what she cannot see.', zh:'隱身廢手長。隱身暈=死亡。看不到就打不到。', tags:[{en:'Stealth Counter',zh:'隱身克制'},{en:'Range Nullify',zh:'手長報廢'}] },
      { slug: 'arke', en:'Stealth backstab bypasses all of Garo\'s range. One crit deletes her. Garo has zero defensive tools vs stealth.', zh:'隱身背刺無視手長。一發暴擊秒殺。伽羅對隱身零防禦。', tags:[{en:'Stealth Crit',zh:'隱身暴擊'},{en:'One-Shot',zh:'一擊秒殺'}] },
    ]
  },
  {
    slug: 'lu-bu',
    best: 'han-xin', adv: 4.0,
    bestEn: "Han Xin's multi-dash kites Lu Bu endlessly. Lu Bu's slow attack speed means he can never land a hit on a dashing Han Xin. Han Xin invades early before Lu Bu's true damage spike.",
    bestZh: '韓信多段位移無限風箏呂布。呂布攻速慢永遠打不中位移中的韓信。前期入侵不給真傷成型。',
    counters: [
      { slug: 'han-xin', en:'Multi-dash kite — Lu Bu\'s slow autos never land. Early invade denies true damage spike.', zh:'多段位移風箏——呂布攻速慢永遠A不到。前期入侵不給真傷成型。', tags:[{en:'Multi-Dash',zh:'多段位移'},{en:'Early Invade',zh:'前期入侵'}] },
      { slug: 'lam', en:'Dash + burst kills Lu Bu before his attack animation completes. Penetration shreds armor stacking.', zh:'位移+爆發在呂布普攻動畫完成前秒殺。穿透粉碎護甲堆疊。', tags:[{en:'Burst',zh:'爆發'},{en:'Penetration',zh:'穿透'}] },
      { slug: 'pei', en:'High mobility + sustained DPS out-trades Lu Bu. Never stays in his true damage range for more than one hit.', zh:'高機動+持續DPS換血碾壓呂布。永遠不在真傷範圍內停留超過一擊。', tags:[{en:'Mobility',zh:'機動性'},{en:'Sustained DPS',zh:'持續輸出'}] },
    ]
  },
  {
    slug: 'yaria',
    best: 'gan-mo', adv: 4.3,
    bestEn: "Gan & Mo's long-range snipes hit both Yaria AND her attached ally simultaneously. Yaria cannot shield through burst that hits two targets. Her attached state becomes a liability.",
    bestZh: '干將莫邪長程狙擊同時打到瑤和附身目標。同時打兩個人的爆發盾擋不住。附身狀態變成雙殺。',
    counters: [
      { slug: 'gan-mo', en:'Long-range snipes hit Yaria + host simultaneously. AoE burst punches through shared shield.', zh:'長程狙擊同時命中瑤+宿主。AOE爆發穿共享護盾。', tags:[{en:'AoE Snipe',zh:'AOE狙擊'},{en:'Double Hit',zh:'雙目標打擊'}] },
      { slug: 'garo', en:'Extreme range + AoE arrows hit both targets. Silence on crit prevents Yaria from recasting shield.', zh:'極限手長+AOE箭打雙目標。暴擊沉默不給補盾。', tags:[{en:'AoE Autos',zh:'AOE普攻'},{en:'Silence',zh:'暴擊沉默'}] },
    ]
  },
  {
    slug: 'zhang-fei',
    best: 'mulan', adv: 4.2,
    bestEn: "Mulan's silence prevents Zhang Fei from casting Ultimate or shield. Heavy-form burst kills through his massive HP pool. Zhang Fei without his Ultimate is half a hero.",
    bestZh: '花木蘭沉默不給張飛開大或套盾。重劍爆發穿巨額血量強殺。張飛沒大招就是半個英雄。',
    counters: [
      { slug: 'mulan', en:'Silence prevents Ultimate + shield casts. Heavy-form burst through massive HP. Half a hero without Ultimate.', zh:'沉默不給開大+套盾。重劍爆發穿血量。沒大招=半個英雄。', tags:[{en:'Silence',zh:'沉默'},{en:'HP Shred',zh:'穿血爆發'}] },
      { slug: 'zhuangzi', en:'Team-wide cleanse removes Zhang Fei\'s Ultimate knockback entirely. His entire engage value is deleted by one skill.', zh:'團隊淨化完全化解張飛大招擊退。一個技能廢掉整次開團。', tags:[{en:'Cleanse',zh:'淨化'},{en:'Engage Nullify',zh:'開團報廢'}] },
    ]
  },
  {
    slug: 'dyadia',
    best: 'cai-yan', adv: 3.8,
    bestEn: "Cai Yan's AoE heal out-sustains Dyadia's poke. Her stun interrupts Dyadia's channeled abilities. Support vs support — Cai Yan wins the sustain war every time.",
    bestZh: '蔡文姬範圍奶續航碾壓少司緣消耗。暈眩打斷讀條技能。輔助對輔助——蔡文姬的奶量戰爭永遠贏。',
    counters: [
      { slug: 'cai-yan', en:'AoE heal out-sustains poke. Stun interrupts channels. Wins the support sustain war every time.', zh:'範圍奶續航碾壓消耗。暈打斷讀條。輔助奶量戰爭永遠贏。', tags:[{en:'Sustain',zh:'續航'},{en:'Stun Interrupt',zh:'暈眩打斷'}] },
      { slug: 'musashi', en:'Point-click Ultimate locks Dyadia in place. Burst kills before any healing activates. She cannot peel herself.', zh:'指向大招鎖定少司緣。爆發在奶量生效前秒殺。無法自保。', tags:[{en:'Point-Click Lock',zh:'指向鎖定'},{en:'Pre-Heal Kill',zh:'奶前秒殺'}] },
    ]
  },
  {
    slug: 'musashi',
    best: 'dyadia', adv: 4.0,
    bestEn: "Dyadia's CC and peel prevents Musashi from reaching any target. Her sustain keeps his dive targets alive through his burst. Musashi commits his Ultimate — Dyadia cleanses and shields the target.",
    bestZh: '少司緣控制和保護不給宮本摸到任何目標。續航讓被衝的目標活過爆發。宮本開大——少司緣淨化+護盾直接化解。',
    counters: [
      { slug: 'dyadia', en:'Peel + CC prevents reaching any target. Sustain keeps dive targets alive. Ult gets cleansed + shielded.', zh:'保護+控不給摸到人。續航讓目標活下來。大招被淨化+護盾化解。', tags:[{en:'Peel',zh:'保護'},{en:'Ult Nullify',zh:'大招化解'}] },
      { slug: 'sun-bin', en:'Silence prevents Ultimate activation. Speed boost kites Musashi infinitely. He can never close the gap.', zh:'沉默不給開大。加速無限風箏。宮本永遠近不了身。', tags:[{en:'Silence',zh:'沉默'},{en:'Kite',zh:'風箏'}] },
    ]
  },
];

// Helper: resolve slugs to verify they exist
const missing = [];
data.forEach(entry => {
  entry.counters.forEach(c => {
    if (!findHero(c.slug)) missing.push(entry.slug + ' -> ' + c.slug);
  });
  if (entry.best && !findHero(entry.best)) missing.push(entry.slug + ' -> best: ' + entry.best);
});

if (missing.length) {
  console.log('=== MISSING HERO SLUGS (fix before using) ===');
  missing.forEach(m => console.log('  ' + m));
  console.log('');
}

// Generate TypeScript
console.log('=== GENERATED TYPESCRIPT ===\n');
data.forEach(entry => {
  console.log(`  '${entry.slug}': {`);
  
  // bestCounter
  if (entry.best) {
    console.log(`    bestCounter: {`);
    console.log(`      hero: '${entry.best}',`);
    console.log(`      advantage: ${entry.adv},`);
    console.log(`      reasons: [`);
    console.log(`        { en: '${entry.bestEn}', 'zh-TW': '${entry.bestZh}' },`);
    console.log(`      ],`);
    console.log(`    },`);
  }
  
  // counterDetails
  console.log(`    counterDetails: [`);
  entry.counters.forEach((c, i) => {
    const tags = c.tags ? c.tags.map(t => `{ en: '${t.en}', 'zh-TW': '${t.zh}' }`).join(', ') : '';
    console.log(`      { hero: '${c.slug}', reason: { en: '${c.en}', 'zh-TW': '${c.zh}' }, tags: [${tags}] },`);
  });
  console.log(`    ],`);
  
  console.log(`  },`);
  console.log('');
});

console.log('=== DONE ===');
