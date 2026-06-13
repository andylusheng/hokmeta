/**
 * Patches counter-rationale-overrides.ts: adds counterDetails + bestCounter
 * to all Top 30 heroes that are missing them, using real matchup data.
 * 
 * Run: node scripts/patch-overrides.js
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'counter-rationale-overrides.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// ─── COUNTER DATA FOR ALL TOP 30 HEROES ───
// Format: [slug, bestHero, advantage, bestEn, bestZh, [[cSlug, cEn, cZh, [[tEn, tZh]]]...]]

const entries = [
  // Already has counterDetails: marco-polo (updated), li-bai (has data)
  
  // ── WITH existing why/faq, NO counterDetails ──
  ['luban-no-7', 'lian-po', 4.5,
    "Lian Po walks through all of Luban's damage with CC immunity + damage reduction, chain-knockups him to death. Luban has zero mobility.",
    '廉頗霸體+減傷無視魯班全部輸出，連環擊飛控到死。魯班零位移跑不掉。',
    [['lian-po','CC immune ignores all damage; chain-knockup = guaranteed death.','霸體無視輸出；連環擊飛=必死。',[['CC Immune','霸體'],['Chain CC','連控']]],
     ['gao-changgong','Stealth + stun from invisibility before Luban can react. Zero counterplay.','隱身貼臉暈——魯班看不到人就死了。',[['Stealth Delete','隱身秒殺'],['Undodgeable','無法反應']]],
     ['li-bai','Double dash over front line + untargetable Ultimate dodge all retaliation. One rotation kills.','兩段位移越前排+無法選中大招躲一切反擊。一套帶走。',[['Untargetable','無法選中'],['Backline Delete','秒後排']]]]],
  
  ['hou-yi', 'agudo', 4.2,
    "Agudo dives Hou Yi — pets block his auto-attacks, dash closes gap instantly. Hou Yi has zero mobility to escape.",
    '阿古朵衝后羿——寵物擋普攻，位移瞬間貼臉。后羿零位移跑不掉。',
    [['agudo','Pets block autos; dash closes gap instantly. Zero escape for immobile marksman.','寵物擋普攻；位移貼臉。零位移射手無路可逃。',[['Dive','衝臉'],['Pet Block','寵物格擋']]],
     ['daji','Point-click charm + full combo kills before second auto-attack. Bushes = instant death.','指向魅惑接全套——A兩下就死。草叢=即死。',[['Point-Click Burst','指向秒殺'],['Bush Threat','草叢威脅']]],
     ['li-bai','Double dash + untargetable Ultimate bypass all peel. Hou Yi dies instantly once dove.','兩段位移+無法選中大招穿過所有保護。被貼臉就瞬間蒸發。',[['Untargetable','無法選中'],['Backline Dive','切後排']]]]],
  
  ['angela', 'han-xin', 4.0,
    "Han Xin multi-dash dodges all of Angela's Skill 2 fireballs. Flanks during immobile Ult channel for free kill.",
    '韓信多段位移永遠躲掉安琪拉二技能火球。大招站樁期間繞後白撿人頭。',
    [['han-xin','Multi-dash dodges Skill 2 every time. Flank during Ult channel = guaranteed kill.','多段位移永遠躲二技能。大招讀條繞後=穩殺。',[['Multi-Dash','多段位移'],['Flank Kill','繞後斬殺']]],
     ['gao-changgong','Stealth approach ignores her zoning. Invis stun + combo kills before reaction.','隱身無視區域控制。隱身暈+連招——來不及反應就死。',[['Stealth Burst','隱身秒殺'],['Pre-Reaction Kill','反應前斬殺']]]]],
  
  ['daji', 'gao-changgong', 4.3,
    "Gao Changgong stealths past all vision; stuns from invisibility and deletes Daji before charm finishes casting.",
    '蘭陵王隱身繞過所有視野；隱身暈秒殺——妲己魅惑還沒讀完就沒了。',
    [['gao-changgong','Stealth + stun deletes before charm completes. Zero counterplay for immobile mage.','隱身暈秒殺——魅惑還沒讀完。零位移法師零反制。',[['Stealth Delete','隱身秒殺'],['Pre-Cast Kill','讀條前斬殺']]],
     ['mulan','Silence opener prevents all casts. Heavy-form burst kills through any HP items.','沉默開局不給放任何技能。重劍爆發無視血量。',[['Silence','沉默'],['Burst Combo','爆發連招']]]]],
  
  ['dun', 'han-xin', 3.8,
    "Han Xin multi-dash kites Dun's short range endlessly. Early invade denies farm. Dun can never catch Han Xin solo.",
    '韓信多段位移無限風箏夏侯惇短手。前期入侵不給發育。夏侯單挑永遠摸不到韓信。',
    [['han-xin','Multi-dash kite — Dun\'s short range never lands a hit. Early invade shuts down farm.','多段位移風箏——短手永遠A不到。前期入侵壓發育。',[['Kite King','風箏之王'],['Early Invade','前期反野']]],
     ['li-bai','Untargetable frames dodge hook and burst. Hit-and-run with afterimage before Dun can trade back.','無法選中躲鉤和爆發。殘影打完就跑——夏侯來不及反打。',[['Untargetable','無法選中'],['Hit & Run','打完就跑']]],
     ['wukong','Stealth bypasses frontline. Clone confuses. Burst kills through passive shield.','隱身無視前排。分身迷惑。爆發穿被動護盾強殺。',[['Stealth','隱身'],['Shield Pierce','穿盾爆發']]]]],
  
  ['wang-zhaojun', 'han-xin', 4.4,
    "Han Xin never gets frozen — multi-dash mobility dodges every freeze. Dives during immobile Ult channel for kill.",
    '韓信永遠不吃冰凍——多段位移躲所有凍。大招站樁期間衝臉穩殺。',
    [['han-xin','Multi-dash dodges every freeze attempt. Dive during Ult channel = free kill.','多段位移躲所有冰凍。大招期間衝臉=免費人頭。',[['Freeze Immune','凍不住'],['Channel Kill','讀條斬殺']]],
     ['gao-changgong','Stealth ignores all zone control. Stun from invisibility before freeze cast time ends.','隱身無視所有區域控制。冰凍讀條沒結束就被隱身暈秒。',[['Stealth','隱身'],['Pre-Freeze Kill','凍前秒殺']]]]],
  
  ['lady-sun', 'gao-changgong', 4.6,
    "Gao Changgong stealths past range — stuns from invisibility before dodge-roll. One combo kills, Purify too late.",
    '蘭陵王隱身繞過手長——隱身暈不給翻滾。一套秒，淨化來不及。',
    [['gao-changgong','Stealth negates range advantage. Stun from invisibility — cannot dodge what you cannot see.','隱身廢手長。隱身暈——看不到就躲不掉。',[['Stealth Delete','隱身秒殺'],['Undodgeable','無法躲避']]],
     ['mulan','Silence prevents dodge-roll. Heavy burst kills through any items. Dash useless while silenced.','沉默不給翻滾。重劍爆發無視裝備。沉默時位移是廢的。',[['Silence','沉默'],['Dash Nullify','位移報廢']]]]],
  
  ['li-xin', 'cai-yan', 4.1,
    "Cai Yan AoE heal out-sustains poke. Stun + silence chain prevents form swap. Constant healing = never reach kill threshold.",
    '蔡文姬範圍奶續航碾壓消耗。暈+沉默不給切形態。持續奶量=永遠打不出斬殺線。',
    [['cai-yan','AoE heal out-sustains all poke. Stun + silence chain locks Dark Form.','範圍奶續航碾壓消耗。暈+沉默鎖住暗形態。',[['AoE Heal','範圍奶'],['Silence Lock','沉默鎖死']]],
     ['da-qiao','Global teleport rotates to punish split push. Silence + knockup cancel form swap mid-animation.','全圖傳送抓分帶。沉默+擊飛打斷切形態動畫。',[['Global Rotation','全圖抓邊'],['Cancel','動畫打斷']]],
     ['guiguzi','Stealth AoE pull catches Light Form before transformation. Team deletes instantly.','隱身範圍拉——光形態來不及切就被拉進人群蒸發。',[['Stealth Engage','隱身開團'],['AoE Pull','範圍拉人']]]]],
  
  ['mi-yue', 'donghuang', 4.2,
    "Donghuang point-click suppression ignores Mi Yue's untargetable. %HP passive melts her HP. She dies in suppression.",
    '東皇指向壓制無視羋月無法選中。被動%HP融血量。壓制期間直接死亡。',
    [['donghuang','Point-click suppression ignores untargetable. %HP passive melts HP stacking.','指向壓制無視無法選中。%HP被動融血量。',[['Suppression','壓制'],['%HP Damage','%HP傷害']]],
     ['allain','Shield absorbs lifesteal sustain. Dash closes through shadow. Wins extended trades.','護盾吃吸血續航。位移穿影子貼臉。持久戰必贏。',[['Shield','護盾'],['Gap Close','貼臉']]]]],
  
  ['wukong', 'agudo', 3.9,
    "Agudo pets block Wukong's critical strikes. Dash + CC prevents stealth engage. Tankiness neutralizes burst window.",
    '阿古朵寵物擋暴擊。位移+控不給隱身進場。坦度讓爆發窗口失效。',
    [['agudo','Pets block all crits. Dash + CC prevents stealth engage. Tank build neutralizes burst.','寵物擋暴擊。位移+控封隱身進場。肉裝廢爆發窗口。',[['Pet Block','寵物格擋'],['Tank','坦克克制']]],
     ['gao','Shield absorbs burst combo. CC prevents clone confusion. Sustained damage wins.','護盾吃爆發。控不給分身迷惑。持續傷害贏。',[['Shield','護盾'],['Sustained','持續輸出']]],
     ['heino','Damage immunity frames dodge crits. Counter-burst kills in cooldown window.','免傷幀躲暴擊。反手爆發在CD期間斬殺。',[['Immunity','免傷'],['Counter-Burst','反手爆發']]]]],
  
  ['augran', 'liu-bei', 3.9,
    "Liu Bei shield prevents dropping below execute threshold. Sustained DPS wins. Never in kill range for god-form execute.",
    '劉備護盾不給掉到斬殺線以下。持續DPS贏換血。永不在神巫斬殺範圍內。',
    [['liu-bei','Shield prevents dropping to execute range. Sustained DPS out-trades. Never in kill threshold.','護盾不給掉到斬殺線。持續DPS贏換血。永不進斬殺範圍。',[['Shield','護盾'],['Execute Immune','免疫斬殺']]]]],
  
  ['kaizer', 'donghuang', 4.5,
    "Donghuang point-click suppression ignores damage reduction. %HP passive melts HP stacking. Tank build is nullified.",
    '東皇指向壓制無視減傷。%HP融血量。肉裝直接報廢。',
    [['donghuang','Point-click suppression ignores damage reduction. %HP passive melts HP stacking.','指向壓制無視減傷。%HP被動融血量。',[['Suppression','壓制'],['%HP Damage','%HP傷害']]],
     ['kui','Hook pulls before Ult activates. %HP damage shreds armor stacking.','鉤子在大招前拉走。%HP傷害粉碎護甲堆疊。',[['Hook','鉤子'],['Armor Shred','破甲']]],
     ['sun-bin','Silence prevents Ult activation. Speed boost + slow kites infinitely. Never reaches target.','沉默不給開大。加速+減速無限風箏。永遠摸不到人。',[['Silence','沉默'],['Infinite Kite','無限風箏']]]]],
  
  ['zhang-fei', 'mulan', 4.2,
    "Mulan silence prevents Ult + shield casts. Heavy-form burst through massive HP. Without Ult, Zhang Fei is half a hero.",
    '花木蘭沉默不給開大+套盾。重劍爆發穿血量。沒大招的張飛是半個英雄。',
    [['mulan','Silence prevents Ult and shield. Heavy-form burst through HP pool.','沉默不給開大和套盾。重劍爆發穿血量。',[['Silence','沉默'],['HP Shred','穿血爆發']]],
     ['zhuangzi','Team-wide cleanse removes Ult knockback entirely. One skill deletes entire engage value.','團隊淨化化解大招擊退。一個技能廢整次開團。',[['Cleanse','淨化'],['Engage Nullify','開團報廢']]]]],
  
  ['musashi', 'dyadia', 4.0,
    "Dyadia peel + CC prevents Musashi reaching targets. Sustain keeps dive victims alive. Ult cleansed and shielded.",
    '少司緣保護+控不給摸到人。續航讓被衝目標活下來。大招被淨化+護盾化解。',
    [['dyadia','Peel + CC prevents reaching any target. Sustain survives burst. Ult gets cleansed.','保護+控不給摸人。續航扛過爆發。大招被淨化。',[['Peel','保護'],['Ult Nullify','大招化解']]],
     ['sun-bin','Silence prevents Ult. Speed boost kites infinitely. Can never close gap.','沉默不給開大。加速無限風箏。永遠近不了身。',[['Silence','沉默'],['Kite','風箏']]]]],
  
  ['yaria', 'gan-mo', 4.3,
    "Gan & Mo long-range snipes hit Yaria + host simultaneously. AoE burst through shared shield. Attached state = double kill.",
    '干將莫邪長程狙擊同時命中瑤+宿主。AOE爆發穿共享護盾。附身=雙殺。',
    [['gan-mo','Long-range AoE hits both targets. Shared shield cannot block dual-target burst.','長程AOE打雙目標。共享護盾擋不住雙人爆發。',[['AoE Double Hit','AOE雙打'],['Shield Pierce','穿盾']]],
     ['garo','Extreme range + silence on crit stops shield recast. AoE arrows hit both.','極限手長+暴擊沉默不給補盾。AOE箭打雙目標。',[['Outrange','手長碾壓'],['Silence','暴擊沉默']]]]],
  
  ['liu-bei', 'han-xin', 3.6,
    "Han Xin multi-dash kites Liu Bei's short range. Early invade before jungle item spike. Never lets him stack passive.",
    '韓信多段位移風箏劉備短手。前期入侵不給大件成型。永遠不給疊被動。',
    [['han-xin','Multi-dash kite denies passive stacks. Early invade before item spike.','多段位移不給疊被動。前期入侵斷節奏。',[['Kite','風箏'],['Early Invade','前期入侵']]],
     ['daji','Point-click charm + burst kills before sustain kicks in. Zero counterplay for short-range fighter.','指向魅惑+爆發在續航生效前秒殺。短手戰士零反制。',[['Point-Click Burst','指向秒殺'],['Pre-Sustain Kill','續航前斬殺']]]]],
  
  ['huang-zhong', 'gao-changgong', 4.1,
    "Gao Changgong stealths past team during Huang Zhong's immobile Ult. Stun from invisibility — he cannot reposition while channeling.",
    '蘭陵王隱身繞過隊伍，黃忠大招站樁時隱身暈——讀條期間無法移動。',
    [['gao-changgong','Stealth dive during immobile Ult channel. Pre-position stun — cannot dodge while channeling.','隱身衝大招站樁。提前隱身暈——讀條期間無法躲避。',[['Stealth Dive','隱身衝臉'],['Channel Cancel','打斷讀條']]],
     ['li-bai','Untargetable Ultimate + double dash bypass all peel. Huang Zhong dies before turret fires.','無法選中大招+兩段位移無視保護。黃忠砲台還沒開火就死。',[['Untargetable','無法選中'],['Backline Delete','秒後排']]]]],
  
  ['milady', 'allain', 4.0,
    "Allain dash + shield absorbs robot wave damage. Dives through minion army onto immobile Milady. Zero mobility = dead.",
    '亞連位移+護盾吃機器人傷害。穿過僕從海貼臉零位移法師。貼臉=死。',
    [['allain','Dash + shield absorbs robots. Dives through minion army. Immobile mage dies instantly.','位移+護盾吃機器人。穿僕從海貼臉。零位移法師即死。',[['Shield','護盾'],['Dive','衝臉']]],
     ['fuzi','Ult cage traps with zero escape. True damage ignores HP items. Dies in cage or burns flash.','大招牢籠困住無路可逃。真傷無視血量。牢裡死或交閃。',[['Cage Trap','牢籠困殺'],['True Damage','真傷']]],
     ['haya','Ult pulls into 1v1 Mirage. Without robot army = zero damage. Death every time.','大招拖進1v1幻境。沒有機器人大軍=零傷害。每次都死。',[['1v1 Isolation','1v1隔離'],['No Minion=Zero','無僕從=零']]]]],
  
  ['donghuang', 'garo', 4.0,
    "Garo outranges Donghuang completely — silence on crit prevents him from casting or rotating orbs. He dies before entering range.",
    '伽羅手長完全壓制東皇——暴擊沉默不給放技能轉球。進射程前就死。',
    [['garo','Extreme range + crit silence prevents casting. Dies before entering engagement range.','極限手長+暴擊沉默不給放技能。進場範圍前就死。',[['Outrange','手長碾壓'],['Silence Lock','沉默鎖死']]],
     ['marco-polo','True damage ignores HP stacking. High mobility kites Donghuang endlessly.','真傷無視血量堆疊。高機動無限風箏。',[['True Damage','真傷'],['Kite','風箏']]]]],
  
  ['gao-changgong', 'li-bai', 3.8,
    "Li Bai untargetable frames dodge Gao's stealth stun. Skill 1 afterimage escapes ganks. Reveals stealth with AoE skills.",
    '李白無法選中躲隱身暈。一技能殘影逃脫抓人。AOE技能照出隱身。',
    [['li-bai','Untargetable frames dodge stealth stun. Afterimage escape negates gank. AoE reveals stealth.','無法選中躲隱身暈。殘影逃脫廢抓人。AOE照隱身。',[['Untargetable','無法選中'],['Stealth Reveal','照隱身']]],
     ['mozi','Long-range stun catches invis approach. Shield absorbs burst. Semi-tank survives combo.','遠程暈抓隱身靠近。護盾吃爆發。半肉扛全套。',[['Long-Range CC','遠程控制'],['Semi-Tank','半肉']]]]],
  
  ['haya', 'mi-yue', 4.2,
    "Mi Yue untargetable dodges Haya's link. Lifesteal out-sustains Mirage 1v1. Haya cannot burst through constant healing.",
    '羋月無法選中躲海月鏈接。吸血續航碾壓幻境1v1。海月爆發打不動持續回血。',
    [['mi-yue','Untargetable dodges link. Lifesteal wins Mirage 1v1. Never reaches kill threshold.','無法選中躲鏈接。吸血贏幻境1v1。永遠達不到斬殺線。',[['Untargetable','無法選中'],['Sustain Win','續航碾壓']]],
     ['diaochan','True damage + lifesteal out-trades in Mirage. Multi-dash dodges link cast.','真傷+吸血幻境內贏換血。多段位移躲鏈接。',[['True Damage','真傷'],['Lifesteal','吸血']]]]],
  
  ['garuda', 'musashi', 3.5,
    "Musashi point-click Ult locks Garuda mid-flight. Skill 1 destroys her projectiles. Burst kills before lifesteal activates.",
    '宮本指向大招鎖定飛行中的迦樓羅。一技能摧毀飛行物。爆發在吸血生效前斬殺。',
    [['musashi','Point-click Ult locks mid-flight. Skill 1 destroys projectiles. Burst pre-lifesteal.','指向大招鎖定飛行。一技能摧毀飛行物。吸血前爆發秒。',[['Point-Click Lock','指向鎖定'],['Projectile Destroy','摧毀飛行物']]]]],
  
  ['aoyin', 'garo', 4.0,
    "Garo outranges Ao'yin completely. Silence on crit blocks dragon-form casts. Dies before entering his own attack range.",
    '伽羅手長完全碾壓敖隱。暴擊沉默不給放龍形態技能。進自己射程前就死。',
    [['garo','Outranges entirely — dies before entering own range. Silence blocks all skill casts.','手長完全碾壓——進自己射程前就死。暴擊沉默封技能。',[['Outrange','手長碾壓'],['Silence','暴擊沉默']]],
     ['mulan','Silence + heavy-form burst kills before dragon transformation. CC chain zero counterplay.','沉默+重劍爆發不給切龍形態。連控零反制。',[['Silence','沉默'],['Burst','爆發']]]]],
  
  // ── NEW heroes not in overrides ──
  ['xiao-qiao', 'liu-bei', 3.8,
    "Liu Bei dash + shield absorbs burst. Closes through tornado. Kills before cooldowns refresh.",
    '劉備位移+護盾吃爆發。穿龍捲風貼臉。CD轉好前打死。',
    [['liu-bei','Dash + shield absorbs burst. Closes through tornado. Kills before CDs refresh.','位移+護盾吃爆發。穿龍捲風貼臉。CD前斬殺。',[['Shield','護盾'],['Gap Close','貼臉']]],
     ['menki','Hook + stun catches mid-cast. Long-range engage outside tornado range.','鉤子+暈抓站樁施法。龍捲風範圍外長距進場。',[['Hook','鉤子'],['Long-Range','長距開團']]]]],
  
  ['dolia', 'sima-yi', 4.0,
    "Sima Yi silence prevents all support casts. Burst through shield. Spell-reliant Dolia removed from fight.",
    '司馬懿沉默不給放任何輔助技能。爆發穿盾。靠技能吃飯的朵莉亞直接消失。',
    [['sima-yi','Silence prevents all casts. Burst through shield. Removed from fight entirely.','沉默不給放技能。爆發穿盾。直接從團戰消失。',[['Silence','沉默'],['Shield Pierce','穿盾爆發']]],
     ['guiguzi','Stealth AoE pull catches mispositioned Dolia. Team follows for instant deletion.','隱身範圍拉抓站位失誤。隊友跟進秒殺。',[['AoE Pull','範圍拉人'],['Stealth Initiate','隱身先手']]]]],
  
  ['luara', 'lapulapu', 3.5,
    "Lapulapu dive + CC chain prevents kiting. Closes through range. No hard CC for self-peel.",
    '拉普拉普衝臉+連控不給風箏。穿過手長貼臉。零硬控自保。',
    [['lapulapu','Dive + CC chain prevents kiting. Closes through range advantage.','衝臉+連控不給風箏。穿手長貼臉。',[['Dive','衝臉'],['CC Chain','連控']]],
     ['ata','Hook + displacement pulls from safe position. Tank absorbs all poke.','鉤子+位移從安全位置拉出。坦克吃全部消耗。',[['Hook','鉤子'],['Tank','坦克']]]]],
  
  ['consort-yu', 'luna', 4.0,
    "Luna magic damage bypasses physical immunity. Infinite dashes out-trade Skill 2 window. Pure AP vs full physical defense.",
    '露娜法傷無視物理免疫。無限位移碾壓二技能窗口。純AP vs 全物防。',
    [['luna','Magic damage bypasses physical immunity. Infinite dashes deny Skill 2 trades.','法傷無視物理免疫。無限位移不給二技能換血。',[['Magic Damage','法傷'],['Infinite Dash','無限位移']]],
     ['diaochan','True damage ignores physical defense. Multi-dash dodges Ult stun. Lifesteal wins trades.','真傷無視物防。多段位移躲大招暈。吸血贏換血。',[['True Damage','真傷'],['Lifesteal','吸血續航']]]]],
  
  ['chicha', 'hou-yi', 3.6,
    "Hou Yi range + perma-slow prevents approach. Rapid-fire deletes before passive stacks.",
    '后羿手長+永久減速不給近身。快速普攻在被動疊滿前秒殺。',
    [['hou-yi','Range + perma-slow prevents approach. Rapid-fire deletes before passive.','手長+永久減速不給近身。快速普攻被動前秒。',[['Range','手長'],['Perma-Slow','永久減速']]],
     ['marco-polo','High mobility kites endlessly. True damage bypasses defense.','高機動無限風箏。真傷無視防禦。',[['Mobility','機動性'],['True Damage','真傷']]],
     ['lady-sun','Dodge-roll + burst out-trades. One rotation kills before return damage.','翻滾+爆發換血碾壓。一套打完沒還手就死。',[['Burst','爆發'],['Mobility','位移']]]]],
  
  ['erin', 'dun', 4.3,
    "Dun hook + dive ignores kiting. Passive shield absorbs mixed damage. Zero escape after hook.",
    '夏侯惇鉤子+衝臉無視風箏。被動護盾吃混傷。鉤到零逃生。',
    [['dun','Hook + dive ignores kiting. Passive shield absorbs mixed damage.','鉤子+衝臉無視風箏。被動護盾吃混合傷害。',[['Hook','鉤子'],['Shield','護盾']]],
     ['garo','Outranges entirely. Crit silence prevents casting. Dies before auto range.','手長完全碾壓。暴擊沉默不給放技能。普攻範圍外死亡。',[['Outrange','手長碾壓'],['Silence','暴擊沉默']]],
     ['hou-yi','Rapid-fire + slow prevents kiting. Sustained DPS exceeds burst window.','快速普攻+減速不給風箏。持續DPS超爆發窗口。',[['Sustained DPS','持續輸出'],['Slow','減速']]]]],
  
  ['arthur', 'xiang-yu', 3.7,
    "Xiang Yu %HP damage shreds tank build. Displacement prevents backline access.",
    '項羽%HP傷害粉碎肉裝。位移不給切後排。',
    [['xiang-yu','%HP damage shreds tank build. Displacement prevents backline access.','%HP粉碎肉裝。位移不給切後排。',[['%HP Damage','%HP傷害'],['Displacement','位移']]],
     ['lady-sun','Dodge-roll evades engage. Burst penetrates armor. Never in silence range.','翻滾躲進場。爆發穿護甲。永不在沉默範圍。',[['Mobility','位移'],['Armor Pen','破甲']]]]],
  
  ['kongming', 'allain', 4.2,
    "Allain shield absorbs full burst combo. Dash closes through portals. Kongming dies during cooldowns.",
    '亞連護盾吃全套爆發。位移穿傳送門貼臉。諸葛CD期間等死。',
    [['allain','Shield absorbs burst. Dash closes through portals. Dies during CD window.','護盾吃爆發。位移穿門貼臉。CD期間死亡。',[['Shield','護盾'],['Gap Close','貼臉']]],
     ['biron','Tank + %HP out-sustains. Survives burst, kills during cooldowns.','肉裝+%HP續航碾壓。扛過爆發，CD期間反殺。',[['Tank','坦克'],['Sustain','續航']]],
     ['wuyan','Shield + magic resist neutralizes burst. Stun prevents Ult channel.','護盾+魔抗廢爆發。暈不給大招讀條。',[['Magic Resist','魔抗'],['Stun Cancel','暈斷大']]]]],
  
  ['cai-yan', 'gao-changgong', 4.4,
    "Gao Changgong stealths past team, deletes healer first. Stun from invis — heals activate too late.",
    '蘭陵王隱身繞過隊友先秒奶媽。隱身暈——奶還沒開出來人就沒了。',
    [['gao-changgong','Stealth past team deletes healer first. Undodgeable stun from invisibility.','隱身繞過隊友先秒奶。隱身暈無法躲避。',[['Stealth Delete','隱身秒奶'],['Healer Priority','優先殺奶']]],
     ['mulan','Silence prevents all healing casts. Heavy-form burst kills through HP.','沉默不給放奶。重劍爆發無視血量強殺。',[['Silence','沉默'],['Anti-Heal','禁療']]]]],
  
  ['mozi', 'dolia', 4.1,
    "Dolia cleanse removes CC chain. Sustain out-heals poke. Mozi's CC-reliant kit nullified.",
    '朵莉亞淨化解連控。續航奶過消耗。墨子靠CC的技能組直接報廢。',
    [['dolia','Cleanse removes CC chain. Sustain out-heals all poke. CC kit nullified.','淨化解連控。續航奶過消耗。CC技能組報廢。',[['Cleanse','淨化'],['Sustain','續航']]],
     ['guiguzi','Stealth AoE pull catches during Ult channel. Team collapses instantly.','隱身範圍拉抓大招讀條。隊友跟進瞬秒。',[['AoE Pull','範圍拉人'],['Channel Cancel','打斷讀條']]],
     ['nezha','CC-immune dash ignores stuns. Dives through control into melee range.','霸體衝鋒無視暈眩。穿過控制直衝臉上。',[['CC Immune','霸體'],['Dive','衝臉']]]]],
  
  ['garo', 'gao-changgong', 4.8,
    "Gao Changgong stealth negates Garo's entire range advantage. Invis stun — cannot auto what you cannot see.",
    '蘭陵王隱身廢掉伽羅全部手長優勢。隱身暈——看不到就打不到。',
    [['gao-changgong','Stealth negates range entirely. Invis stun = death. Cannot hit what you cannot see.','隱身廢手長。隱身暈=死。看不到打不到。',[['Stealth','隱身克制'],['Range Nullify','手長報廢']]],
     ['arke','Stealth backstab bypasses range. One crit deletion. Zero defense vs invis.','隱身背刺無視手長。一發暴擊秒殺。對隱身零防禦。',[['Stealth Crit','隱身暴擊'],['One-Shot','一擊秒殺']]]]],
  
  ['lu-bu', 'han-xin', 4.0,
    "Han Xin multi-dash kite — slow autos never land. Early invade before true damage spike.",
    '韓信多段位移風箏——慢攻速永遠A不到。前期入侵不給真傷成型。',
    [['han-xin','Multi-dash kite — slow autos never hit. Early invade denies power spike.','多段位移風箏——慢攻速永遠A不到。前期入侵斷節奏。',[['Multi-Dash','多段位移'],['Early Invade','前期入侵']]],
     ['lam','Dash + burst kills before attack animation finishes. Penetration shreds armor.','位移+爆發在普攻動畫完成前斬。穿透粉碎護甲。',[['Burst','爆發'],['Penetration','穿透']]],
     ['pei','High mobility + sustained DPS out-trades. Never stays in true damage range.','高機動+持續DPS換血碾壓。永不在真傷範圍。',[['Mobility','機動性'],['Sustained DPS','持續輸出']]]]],
  
  ['dyadia', 'cai-yan', 3.8,
    "Cai Yan AoE heal out-sustains all poke. Stun interrupts channels. Wins sustain war every time.",
    '蔡文姬範圍奶續航碾壓消耗。暈打斷讀條。奶量戰爭永遠贏。',
    [['cai-yan','AoE heal out-sustains poke. Stun interrupts channels. Sustain war = win.','範圍奶續航碾壓消耗。暈打斷讀條。奶量戰=必贏。',[['AoE Heal','範圍奶'],['Stun Interrupt','暈打斷']]],
     ['musashi','Point-click Ult locks. Burst kills before healing. Zero self-peel.','指向大招鎖定。爆發在奶前秒殺。零自保。',[['Point-Click Lock','指向鎖定'],['Pre-Heal Kill','奶前秒殺']]]]],
];

// ─── PATCH EACH HERO ───
let insertions = 0;

entries.forEach(([slug, bestHero, adv, bestEn, bestZh, counters]) => {
  // Find the hero's entry in the OVERRIDES object
  // Pattern: 'slug': {
  const heroPattern = new RegExp(`('${slug}':\\s*\\{)`, 'm');
  const match = heroPattern.exec(content);
  
  if (!match) {
    console.log(`  SKIP ${slug}: not found in overrides`);
    return;
  }
  
  const insertPos = match.index + match[0].length;
  
  // Build the counterDetails block
  let block = '\n    bestCounter: {\n';
  block += `      hero: '${bestHero}',\n`;
  block += `      advantage: ${adv},\n`;
  block += `      reasons: [\n`;
  block += `        { en: \`${bestEn}\`, 'zh-TW': \`${bestZh}\` },\n`;
  block += `      ],\n`;
  block += `    },\n`;
  block += `    counterDetails: [\n`;
  
  counters.forEach(([cSlug, cEn, cZh, tags]) => {
    const tagStr = tags.map(([tEn, tZh]) => `{ en: '${tEn}', 'zh-TW': '${tZh}' }`).join(', ');
    block += `      { hero: '${cSlug}', reason: { en: \`${cEn}\`, 'zh-TW': \`${cZh}\` }, tags: [${tagStr}] },\n`;
  });
  
  block += `    ],`;
  
  // Insert the block
  content = content.slice(0, insertPos) + block + content.slice(insertPos);
  insertions++;
  console.log(`  OK  ${slug} (${counters.length} counters, best: ${bestHero})`);
});

// ─── ADD NEW HEROES NOT IN OVERRIDES ───
// Find the closing of OVERRIDES: "};" at end of file
const overrideEndMatch = content.match(/\n\};\s*$/);
if (overrideEndMatch) {
  const insertPos = overrideEndMatch.index;
  
  // Check which new heroes to add (those not already in overrides)
  const existingSlugs = new Set();
  const slugPattern = /'([a-z0-9-]+)':\s*\{/g;
  let m;
  while ((m = slugPattern.exec(content)) !== null) {
    existingSlugs.add(m[1]);
  }
  
  let newBlock = '';
  entries.forEach(([slug, bestHero, adv, bestEn, bestZh, counters]) => {
    if (!existingSlugs.has(slug)) {
      newBlock += `\n  '${slug}': {\n`;
      newBlock += `    bestCounter: {\n`;
      newBlock += `      hero: '${bestHero}',\n`;
      newBlock += `      advantage: ${adv},\n`;
      newBlock += `      reasons: [\n`;
      newBlock += `        { en: \`${bestEn}\`, 'zh-TW': \`${bestZh}\` },\n`;
      newBlock += `      ],\n`;
      newBlock += `    },\n`;
      newBlock += `    counterDetails: [\n`;
      counters.forEach(([cSlug, cEn, cZh, tags]) => {
        const tagStr = tags.map(([tEn, tZh]) => `{ en: '${tEn}', 'zh-TW': '${tZh}' }`).join(', ');
        newBlock += `      { hero: '${cSlug}', reason: { en: \`${cEn}\`, 'zh-TW': \`${cZh}\` }, tags: [${tagStr}] },\n`;
      });
      newBlock += `    ],\n`;
      newBlock += `  },`;
      insertions++;
      console.log(`  NEW ${slug} (${counters.length} counters, best: ${bestHero})`);
    }
  });
  
  if (newBlock) {
    content = content.slice(0, insertPos) + newBlock + '\n' + content.slice(insertPos);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nDone! ${insertions} heroes updated.`);
