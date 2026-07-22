import type { LearnArticle } from '@/lib/learn';
import {
  assassins,
  byLane,
  clashWarriors,
  farmMarksmen,
  GLOBAL_VS_CN_ZH,
  heroes,
  jungleAssassins,
  marksmen,
  mostBanned,
  mostPicked,
  recentPatches,
  roamSupports,
  sortByPickRate,
  sortByWinRate,
  supports,
  tanks,
  topByRole,
  topWR,
} from '@/lib/learn-stats';
import { formatRate } from '@/lib/data';
import type { Hero } from '@/types/hero';
import {
  formatHeroNameList,
  getHeroDisplayName,
} from '@/lib/locale-names';
import { featuredArticlesZh } from '@/lib/learn-featured-zh';

function statHeroZh(h: Hero): string {
  const name = getHeroDisplayName(h, 'zh-TW');
  return `${name} — 勝率 ${formatRate(h.winRate)}，選取 ${formatRate(h.pickRate)}，梯度 ${h.tier}`;
}

function statListZh(list: Hero[]): string {
  return list.map(statHeroZh).join('；');
}

function namesZh(list: Hero[]): string {
  return formatHeroNameList(
    list.map((h) => h.name),
    'zh-TW'
  );
}

function counterLineZh(h: Hero): string {
  const name = getHeroDisplayName(h, 'zh-TW');
  const into = h.counteredBy.filter((c) => c !== 'Data unavailable');
  return into.length
    ? `${name} → 可用 ${formatHeroNameList(into.slice(0, 3), 'zh-TW')} 應對`
    : `${name} → 詳見 /zh-TW/hero/${h.slug}/ 克制說明`;
}

export const learnDataNoteZh = GLOBAL_VS_CN_ZH;

export const learnArticlesZh: LearnArticle[] = [
  {
    slug: 'strongest-rank-climb-comps',
    title: '五排必勝陣容：國際服數據驗證過的選人模板',
    badge: '熱門',
    category: 'Team Comps',
    description:
      '別再憑感覺選角了。這套角色模板與英雄池來自 Camp HOK 國際服即時數據——不是照搬國服梯度榜，而是真正能在全球伺服器贏的組合。',
    sections: [
      {
        heading: '為什麼國服陣容在國際服不管用',
        body: GLOBAL_VS_CN_ZH,
      },
      {
        heading: '高勝率核心——先鎖這幾隻',
        body: `Camp 匯出當前勝率最高英雄：${statListZh(topWR.slice(0, 6))}。從中選一個作為隊伍的勝利條件，剩下四個位置圍繞它配置保核與開團。五人各玩各的舒適角——就算單隻勝率不差——也會因為沒協同、沒成長曲線、沒保排鏈而穩定掉分。`,
      },
      {
        heading: '國際服實戰驗證的角色模板',
        body: `坦克前排（${statListZh(tanks.slice(0, 2))}）——開團、吃技能。遊走輔助（${statListZh(supports.slice(0, 2))}）——抓人、保排、控視野。發育射手（${statListZh(marksmen.slice(0, 2))}）——後期保險。打野刺客（${statListZh(jungleAssassins.slice(0, 2))}）——帶節奏、控目標。中路法師——視陣容補爆發或封路。國服職業常雙遊走或法師換戰士，這些變體在國際服可行，但前提是全隊願意配合視野與暴君時機。否則，照模板選最穩。`,
      },
      {
        heading: '選人鐵律：絕不能缺持續輸出',
        body: `本輪同步選取率最高：${statListZh(mostPicked.slice(0, 5))}。如果陣容已有兩隻清線慢的坦克，立刻換法師或射手。Camp 數據非常清楚：12 分鐘後沒有持續傷害源的陣容，即使前期領先也會被翻盤。遊戲不是贏一塔就結束——是當你打不動對面前排時才結束。`,
      },
    ],
  },
  {
    slug: 'fast-push-5-stack',
    title: '五排速推流：15 分鐘前結束遊戲的完整打法',
    badge: '五排',
    category: 'Team Comps',
    description:
      '前期壓制陣容完整教學——搶一塔、反野、暴君團戰，依據國際服打野與遊走即時選取率選人，附帶指揮檢查清單。',
    sections: [
      {
        heading: '王者榮耀「速推」到底是什麼',
        body:
          '概念簡單，執行決勝：拿第一座外塔 → 立刻入侵敵方野區 → 人數優勢開暴君。靠餓死對面打野、用線權滾雪球贏，不是拖到風暴龍王。' +
          '概念類似國服速推／四一分推，但國際服前期視野爭奪較鬆散，速推懲罰更狠——幾乎每場都能抓到對手反應慢一拍。',
      },
      {
        heading: '適合速推的英雄（打野＋遊走數據）',
        body: `節奏型打野（國際服選取率）：${statListZh(jungleAssassins)}。可靠控場遊走：${statListZh(roamSupports)}。對抗路前期強勢換血角：${statListZh(clashWarriors)}。別用純養豬射手陣——成型太慢。除非 8 分鐘已領先 3000+ 金幣只需要後期保險，否則不考慮。`,
      },
      {
        heading: '指揮檢查清單（背下來）',
        body:
          '1）暴君刷新前先推線——絕不在慢推時開龍。對手會轉線，你會送。' +
          '2）3:30 判斷敵方打野紅藍開，ping 對側野區讓隊友知道 gank 方向。' +
          '3）越塔條件：遊走硬控就位「且」敵方打野在地圖遠側。缺一不可。' +
          '4）兩塔＋4000 金優勢就收遊戲。別五人蹲中路放邊線堆兵——翻盤就是這樣來的。',
      },
      { heading: '國際服 vs 國服', body: GLOBAL_VS_CN_ZH },
    ],
  },
  {
    slug: 'piggyback-strategy-guide',
    title: '養豬流完整教學：讓核心起飛、碾壓排位的經濟漏斗打法',
    badge: 'META',
    category: 'Team Comps',
    description:
      '四人讓經濟給發育路射手的完整執行手冊——哪些射手在國際服數據上真能轉化經濟、五步驟執行流程、以及何時該果斷放棄。',
    sections: [
      {
        heading: '養豬流（養豬流）到底是什麼',
        body:
          '四人交換空間、視野與野怪，讓發育路射手比對面早兩件核心裝。核心概念與國服養豬流完全相同，但國際服單排幾乎不會全隊配合——需要五排語音或至少快速 ping 才能穩定執行。',
      },
      {
        heading: '最佳養豬核心（發育路數據說話）',
        body: `發育路射手綜合選取率＋勝率：${statListZh(farmMarksmen)}。搭配 ${namesZh(supports)} 等保排輔助，打野以搶視野為主而非追人頭。國服 VOD 常秀后羿、妲己變體養豬——但那些英雄在國際服表現不同。抄 CN 精華片段之前，先看上表國際服數據。`,
      },
      {
        heading: '五步驟執行——經濟漏斗流程',
        body:
          '1）射手在打野首輪清完後拿紅——但僅限地圖安全時。別把自己送進三人反野陷阱。' +
          '2）輔助 2 級幫推下路後才遊走——核心沒線權時離開等於害他。劣勢凍結線別走。' +
          '3）打野用上路野換下路壓力與暴君視野。你的任務不是拿頭——是確保敵方打野碰不到你家核心。' +
          '4）暴君「只」在下路有推線時開。凍結線或劣勢線開龍＝被對手集結一波帶走。' +
          '5）輔助／坦克先出保排裝（寒冰甲、護盾裝），再考慮任何傷害裝。你家核心就是全隊的傷害。',
      },
      {
        heading: '何時該放棄養豬',
        body: `敵方選出強開刺客（${namesZh(assassins.slice(0, 3))}）或 14 分鐘核心落後兩件裝，立刻轉邊路分帶。用邊線壓力逼對手多線防守，而非繼續四保一送頭。各射手正確奧義與召喚師技能請查 hokmeta 英雄頁——數據來自 HoKStats 同步。`,
      },
    ],
  },
  {
    slug: 'best-jungle-heroes',
    title: '打野梯度榜：國際服當前誰能真正帶飛排位',
    badge: '打野',
    category: 'Jungle',
    description: 'Camp HOK 國際服打野位勝率、選取率與禁用率完整排行——附禁用優先級、刷野路線與節奏型 vs 成長型選擇指南。',
    sections: [
      {
        heading: '打野熱門英雄——數據怎麼說',
        body: `刺客打野（Camp 打野標籤）：${statListZh(jungleAssassins)}。戰士打野崛起中：${statListZh(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 4))}。選角法則：線上有推線權選節奏型（影、趙雲、韓信）；敵方打野前期壓制則選成長型（劉備、奧格蘭）來匹配中期的強勢期。`,
      },
      {
        heading: '禁用優先級——把誰從選角中移除',
        body:
          mostBanned.length > 0
            ? `當前數據集禁用壓力最高：${statListZh(mostBanned)}。國服幾乎每場禁鏡、藍——國際服禁用率完全不同。請以上表為國際服選角依據，別浪費 ban 位在沒人選的英雄上。`
            : '每次數據同步後請查各英雄頁即時禁用率。禁用率每次 patch 都會變——別靠上個月的記憶選 ban。',
      },
      {
        heading: '刷野基礎——決定勝負的法則',
        body:
          '預設刷滿四級。唯一例外：下路或中路有硬控已就位「且」對手壓過河道時可三級抓。有線權才反野——沒線權就換對側野區、拆塔鍍層、搶暴君視野。沒隊友支援硬反野死掉，是國際服打野最常見的送頭方式。',
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: '單排上分英雄：不靠隊友也能 Carry 的選角指南',
    badge: '單排',
    category: 'Laning',
    description: '無法語音、無國服式配合時，國際服仍能獨立帶節奏的英雄——附帶 S+ / S 梯度數據與選角邏輯。',
    sections: [
      {
        heading: 'S+ 與 S 梯度——獨立 Carry 英雄',
        body:
          heroes
            .filter((h) => h.tier === 'S+' || h.tier === 'S')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 12)
            .map((h) => statHeroZh(h))
            .join('。') || '數據不可用',
      },
      {
        heading: '什麼樣的英雄適合單排',
        body: `單排獎勵能獨自拿目標的英雄：分帶單挑（李信、呂布）、刺殺收割（${namesZh(assassins.slice(0, 3))}）、自保型射手不需要專職保鑣（${namesZh(marksmen.slice(0, 3))}）。主玩位先單練一隻 52%+ 勝率英雄再擴池——單排環境下，專精度永遠比靈活度更值錢。${GLOBAL_VS_CN_ZH}`,
      },
    ],
  },
  {
    slug: 'best-beginner-heroes',
    title: '新手最佳英雄：簡單好上手、排位也能贏（不是只打電腦）',
    badge: '新手',
    category: 'Beginner',
    description: '簡單難度＋Meta 友善勝率的入門英雄推薦——先練基本功，再往上爬。',
    sections: [
      {
        heading: '入門首選（簡單難度＋正勝率）',
        body:
          heroes
            .filter((h) => h.difficulty === 'Easy')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 10)
            .map((h) => {
              const name = getHeroDisplayName(h, 'zh-TW');
              return `${name} — ${h.role}，${h.lane ?? '彈性'}，勝率 ${formatRate(h.winRate)}，梯度 ${h.tier}`;
            })
            .join(' · ') || '數據不可用',
      },
      {
        heading: '為什麼這份清單比國服新手推薦好用',
        body:
          '國服新手推薦的英雄經常在國際服不存在或已被重做。以上每隻都在 Camp 匯出中，附完整英文技能說明、出裝與奧義。建議先用亞瑟練坦克／戰士基本功，或魯班七號練射手站位——累積 20 場以上再轉主玩位的 S 梯度英雄。',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: '別再掉分了：5 個真正符合當前 Meta 的排位習慣',
    badge: '指南',
    category: 'Laning',
    description: '國際服上分不是靠操作——是靠選角紀律、數據意識與心態管理。這是一套系統。',
    sections: [
      {
        heading: '規則零：用數據選角，不靠記憶',
        body: `主玩位只選 S+ / S 梯度英雄：${formatHeroNameList(heroes.filter((h) => h.tier === 'S+' || h.tier === 'S').slice(0, 10).map((h) => h.name), 'zh-TW')}。單英雄勝率 52%+ 再考慮擴池。每次數據同步後重查你的英雄狀態——國服 patch 影片常落後國際服好幾週，上個月 S+ 的英雄今天可能已經掉到 B。`,
      },
      {
        heading: '五個區分爬分玩家與卡分玩家的習慣',
        body:
          '1）舒適角只在彈性位盲選——絕不選進硬克制。首選一隻對上最差對局只有 45% 勝率的英雄，等於開局就劣勢。' +
          '2）每次同步後看主玩英雄頁的 patch 說明。一個數字改動就能讓對局從優勢變劣勢。' +
          '3）暴君前在敵方野區入口插眼。視野贏目標——目標贏遊戲。' +
          '4）關聊天，只 ping 目標。排位聊天室從來沒有提升過任何人的勝率。' +
          '5）連輸兩場就停排。心態崩了繼續排是掉一整段位最快的方法。國際服 LP 留著比硬打回來划算。',
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: '刺客一直秒你？這些英雄跟出裝真的能反制',
    badge: '克制',
    category: 'Counter',
    description: '坦克與輔助如何拆解每個 Meta 刺客的勝利條件——來自 hokmeta 克制矩陣與 HoKStats 對局數據，不是紙上談兵。',
    sections: [
      {
        heading: '威脅名單——你一直在被誰秒',
        body: `Meta 刺客國際服選取率排行：${statListZh(assassins)}。這些是每場載入畫面都會看到的名字。記住他們的四級爆發時間點——那就是他們會來找你的時候。`,
      },
      {
        heading: '克制位——誰能打贏他們（數據背書）',
        body: assassins.slice(0, 5).map(counterLineZh).join('。'),
      },
      {
        heading: '出裝與召喚師技能——真正的解法',
        body:
          '輔助：先出防爆裝「再」考慮任何傷害裝。你的工作是讓核心在刺客連招中活下來——只要核心沒被秒，刺客技能冷卻中就死了。' +
          '射手：敵方有兩隻以上進場威脅時帶淨化或等效解控。光靠閃現擋不住知道時機的影或韓信。' +
          '坦克：刺客大招窗口期擋在核心前面。跟國服「保 C」原理相同，但國際服刺客四級就強勢——尊重三級後 gank 時間點，站位提前調整。',
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: '對面太肉打不動？這些射手法師能拆任何前排',
    badge: '克制',
    category: 'Counter',
    description: '百分比傷害、降治療與風箏選角——破解國際服坦克陣容的完整方案，附帶宏觀打法。',
    sections: [
      {
        heading: '反坦克核心——誰真的拆得動',
        body: `${statListZh(topByRole('Marksman', 5))}。持續傷害法師：${statListZh(topByRole('Mage', 4))}。這些不只是高傷害——他們有射程與自保能力，能在坦克陣中活得夠久把輸出打完。`,
      },
      {
        heading: '坦克弱點——數據怎麼說',
        body: tanks.slice(0, 5).map(counterLineZh).join('。'),
      },
      {
        heading: '宏觀解法——別打他們的局',
        body:
          '別在盾山或拉普朗普大招期間硬打團——換對側目標。對手五人抱團雙坦時，分推地圖逼他們多線防守。' +
          '國服前排陣常雙坦加一戰士；國際服更常見一坦一遊走。集中風箏開團坦克，核心安全前別追遊走。如果你把技能全交在輔助身上、讓坦克直接走到後排臉上——那波團已經輸了。',
      },
    ],
  },
  {
    slug: 'how-to-jungle',
    title: '打野入門完整教學：刷野路線、Gank 時機與目標控制',
    badge: '打野',
    category: 'Jungle',
    description: '國際服新手到中階打野完整指南——英雄池、首輪清野路線與目標宏觀，全部對齊當前 Meta。',
    sections: [
      {
        heading: '英雄池——打野該玩誰',
        body: `${statListZh(jungleAssassins)}；${statListZh(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 3))}。新手建議從戰士打野開始——容錯率較高。熟練清野時間與 gank 角度後再轉刺客。`,
      },
      {
        heading: '首輪清野——遊戲最重要的兩分鐘',
        body:
          '預設刷滿四級。唯一例外：下路或中路有硬控已就位「且」對手壓過河道時可三級抓。' +
          '有線權才反野。沒線權就換對側野區、拆塔鍍層、搶暴君視野。沒隊友支援硬反野死掉的打野，就是那個 5 分鐘前送掉整場遊戲的人。',
      },
      {
        heading: '目標宏觀——暴君、主宰與何時開',
        body:
          '首暴君 5:00 刷新——下路有推線就往下靠。慢推時開暴君是擲硬幣；有推線時開是白拿。' +
          '主宰 10:00 是用來終結優勢局的，不是用來強開爛 5v5 送回去的。領先時拿主宰統一堆塔；落後時換對側目標拖時間。' +
          '節奏跟國服宏觀一致，但國際服暴君爭奪較少——人數優勢時直接拿，不用猶豫。',
      },
    ],
  },
  {
    slug: 'how-to-roam',
    title: '遊走時機完整教學：何時離開線上才能真正創造擊殺',
    badge: '輔助',
    category: 'Laning',
    description: '國際服輔助遊走完整指南——何時離開發育路、哪些遊走角選取率最高、以及如何不坑你家射手。',
    sections: [
      {
        heading: '遊走 Meta——誰真的在被選',
        body: statListZh(roamSupports),
      },
      {
        heading: '遊走窗口——何時該走、何時該留',
        body:
          '黃金法則：幫射手推完線「才」遊走。劣勢凍結線絕不離開——你回來時會發現核心已死或落後兩級，那是你的責任。' +
          '核心無位移時暴君前要回線。國服 VOD 常見東皇、孫臏遊走；國際服薩科爾、鬼谷子選取領先——先在英雄頁學好控場連招再抄國服時機。英雄不同，原理相通。',
      },
    ],
  },
  {
    slug: 'how-tier-list-works',
    title: '我們怎麼做 HOK 梯度榜——零猜測，純數據',
    badge: '數據',
    category: 'Meta & Data',
    description: 'S+ 到 B 完整說明：排名方法論、各梯度在選角中的意義、以及為什麼這不是國服梯度榜。',
    sections: [
      {
        heading: '梯度定義——每個級別到底代表什麼',
        body:
          'S+：勝率、選取率、禁用率綜合指標頂尖——這些英雄定義 Meta，應優先首搶或首 ban。' +
          'S：Meta 常規強勢，多數對局可安全盲選。' +
          'A：有勝利條件但較窄——正確陣容中很強，錯誤陣容中容易被懲罰。' +
          'B：情境型選角。能用，但需要特定陣容或對局才能合理化，不應在 S 級可選時硬拿。' +
          '每個英雄頁都有完整數據表，來源 Camp HOK 並與 HoKStats.gg 交叉比對。沒有主觀意見、沒有「感覺很強」——只有數字。',
      },
      {
        heading: '職業與分路分組',
        body:
          '梯度榜與英雄索引按坦克、戰士、刺客、法師、射手、輔助分組，對應 Camp HOK 官方職業標籤。每隻英雄同時顯示分路（打野、遊走、發育、對抗、中路）供選角參考。一個英雄在某路 S+ 不等於每路都 S+。',
      },
      { heading: '這不是國服梯度榜——差別很重要', body: GLOBAL_VS_CN_ZH },
    ],
  },
  {
    slug: 'best-heroes-after-patch',
    title: 'Patch 贏家：最新同步中哪些英雄被加強了',
    badge: 'PATCH',
    category: 'Meta & Data',
    description: 'Camp HOK 最新拉取中有實質改動的英雄——以及如何利用 patch 資訊在 Meta 跟上之前先爬分。',
    sections: [
      {
        heading: '近期平衡調整',
        body:
          recentPatches.length > 0
            ? recentPatches
                .map(({ hero, patch }) => {
                  const name = getHeroDisplayName(hero, 'zh-TW');
                  return `${name}：${patch}`;
                })
                .join(' | ')
            : '請執行數據同步取得最新 patch 說明。Buff 與 Nerf 每次循環都會改變 Meta——別靠過時資訊選角。',
      },
      {
        heading: '如何利用 patch 資訊免費上分',
        body:
          '國服 patch 直播常比國際服早好幾週預覽改動。當 Buff 終於上國際服時，會發生兩件事：英雄勝率幾乎立刻變動，但選取率會落後好幾天。' +
          '這就是你的窗口期。每次同步後重查梯度榜，找出新 Buff 的英雄，在大多數玩家反應過來之前先鎖。等到大家都在搶 Buff 英雄時——你已經爬上去了。',
      },
    ],
  },
  {
    slug: 'li-xin-build-and-counters',
    title: '李信：排位禁用率最高的戰士——出裝、銘文與克制方法',
    badge: '版本',
    category: 'Hero Guides',
    relatedHeroSlug: 'li-xin',
    description:
      '李信勝率 53.6%、禁用率位居戰士第一。本文從實戰數據出發，解析當前出裝、銘文配置以及能有效克制他的英雄。',
    sections: [
      {
        heading: '為什麼李信統治排位',
        body:
          '李信目前勝率 53.64%，禁用率 2.84%——當前版本最被忌憚的戰士。他的雙形態機制（劍士爆發、槍士持續輸出）讓他在團戰中靈活切換，加上突進技能輕鬆切入後排。如果對方缺乏硬控或反突進手段，李信能在carry反應之前直接秒殺。',
      },
      {
        heading: '當前最強出裝（2026年7月）',
        body:
          '核心裝備：不祥徵兆 → 破魔刀 → 暴風 → 聖者庇護 → 天命 → 抵抗之靴。這套出裝兼顧爆發穿透與生存。不祥徵兆提供護盾+冷卻縮減讓你扛住第一輪集火，破魔刀和暴風疊加穿透配合槍士收割。對面有兩個以上爆發法師時，把天命換成防禦裝。',
      },
      {
        heading: '銘文配置',
        body:
          '帶命運（攻擊+穿透）、狩獵（攻速+移速）、奪萃（吸血+攻擊）。這套銘文最大化前期對拼能力——李信的勝利條件是前4分鐘贏下1v1，然後滾雪球帶動地圖節奏。不要帶坦克銘文，他的技能加成獎勵全輸出。',
      },
      {
        heading: '如何克制李信',
        body:
          '能有效壓制他的英雄：蔡文姬（禁療+控制鏈）、大喬（沉默打斷連招）、鬼谷子（持續控制阻止形態切換）。通用原則：把硬控留給他的槍士突進，同等經濟不要和他1v1，如果他帶奪萃就出制裁之刃。如果選人階段看到李信且你隊沒有硬控，考慮Ban掉——2.84%的禁用率不是沒有原因的。',
      },
      {
        heading: '什麼時候不該選李信',
        body:
          '對面多硬控陣容（多眩暈、壓制、拉回）時避免選李信。他也怕出了制裁的萬血坦克——如果目標撐過第一輪爆發，他的傷害就斷檔了。如果你隊已經有刺客打野，再選李信當第二突進會導致陣容零保護，射手完全暴露。',
      },
    ],
  },
];
