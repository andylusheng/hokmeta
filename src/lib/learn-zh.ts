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
    title: '上分最強陣容：這些英雄才是國際服真答案',
    badge: '熱門',
    description:
      '五排選人基於 Camp HOK 國際服勝率、選取率與職業搭配，不是照搬其他 MOBA 老梗。',
    sections: [
      {
        heading: '數據快照（國際服）',
        body: GLOBAL_VS_CN_ZH,
      },
      {
        heading: '當前高勝率核心',
        body: `Camp 匯出勝率前列：${statListZh(topWR.slice(0, 6))}。五排請從中選一個勝利條件，其餘四人圍繞保核／開團配置——五人各玩各的舒適位，即使單英雄勝率不差也會掉分。`,
      },
      {
        heading: '國際服通用陣型模板',
        body: `坦克開團（${statListZh(tanks.slice(0, 2))}）→ 遊走輔助（${statListZh(supports.slice(0, 2))}）保核抓人 → 發育射手（${statListZh(marksmen.slice(0, 2))}）後期輸出 → 打野刺客（${statListZh(jungleAssassins.slice(0, 2))}）帶節奏 → 中路法師補爆發或封路。國服常雙遊走或雙戰士，國際服可行但需全隊配合視野與暴君時機。`,
      },
      {
        heading: '選人鐵律',
        body: `本輪同步選取最高：${statListZh(mostPicked.slice(0, 5))}。若已鎖兩個清線慢的坦克，請換法師或射手。Camp 數據顯示：12 分鐘後沒有持續輸出源的陣容，即使前期領先也容易翻車。`,
      },
    ],
  },
  {
    slug: 'fast-push-5-stack',
    title: '五排速推：15 分鐘前結束對局',
    badge: '五排',
    description:
      '國際服前期壓制陣容——搶一塔、反野、暴君團，依打野與遊走即時選取率選人。',
    sections: [
      {
        heading: '王者榮耀「速推」是什麼',
        body:
          '拿外塔 → 立刻反野 → 暴君人數優勢團。靠餓死對面打野、用線權滾下一個目標贏，而不是拖到風暴龍王。概念類似國服速推／四一分推，但國際服前期視野爭奪較鬆，速推懲罰更狠。',
      },
      {
        heading: '適合的英雄（打野＋遊走數據）',
        body: `節奏打野（選取率）：${statListZh(jungleAssassins)}。可靠控場遊走：${statListZh(roamSupports)}。對抗路前期強勢：${statListZh(clashWarriors)}。除非 8 分鐘已大優，否則別用純養豬射手陣容。`,
      },
      {
        heading: '指揮檢查清單',
        body:
          '1）暴君刷新前先推線，絕不在慢推時開龍。2）3:30 判斷敵方打野紅藍開， ping 對側野區。3）遊走硬控就位且敵打野在遠側才越塔。4）兩塔＋4000 金以上優勢就收，別五人蹲中線放邊線堆兵。',
      },
      { heading: '國際服 vs 國服', body: GLOBAL_VS_CN_ZH },
    ],
  },
  {
    slug: 'piggyback-strategy-guide',
    title: '養豬流：讓核心快速起飛上分',
    badge: 'META',
    description:
      '四人讓經濟給發育路射手——哪些射手在國際服數據上真能轉化經濟，何時該放棄。',
    sections: [
      {
        heading: '養豬流概念',
        body:
          '四人交換空間、視野與野怪，讓發育路射手比對面早兩件核心裝。與國服養豬流相同，但國際服單排很少全隊配合——建議五排語音或快速 ping。',
      },
      {
        heading: '最佳核心（發育路數據）',
        body: `發育路射手選取＋勝率：${statListZh(farmMarksmen)}。搭配 ${namesZh(supports)} 等保核輔助，打野以搶視野為主而非追人頭。國服 VOD 常見後羿、妲己變體，國際服請以上表選取率為準。`,
      },
      {
        heading: '快速成型步驟',
        body:
          '1）安全時射手首輪跟打野拿紅。2）輔助 2 級幫推下路後再遊走。3）打野用上路野換下路壓力與暴君視野。4）下路有推線才開暴君。5）輔助／坦克先出保核裝再出傷害。',
      },
      {
        heading: '何時放棄養豬',
        body: `敵方刺客強開（${namesZh(assassins.slice(0, 3))}）或 14 分鐘核心落後兩件裝，改為邊路分帶。各射手出裝與技能請查 hokmeta 英雄頁（HoKStats 同步）。`,
      },
    ],
  },
  {
    slug: 'best-jungle-heroes',
    title: '打野梯度：2026 國際服誰能帶飛排位',
    badge: '打野',
    description: 'Camp HOK 國際服打野位勝率、選取率與禁用率排行。',
    sections: [
      {
        heading: '打野熱門（Camp 打野標籤）',
        body: `刺客打野：${statListZh(jungleAssassins)}。戰士打野：${statListZh(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 4))}。線上有推線選節奏型（影、趙雲、韓信）；敵方打野前期壓制則選成長型（劉備、奧格蘭）。`,
      },
      {
        heading: '禁用優先級',
        body:
          mostBanned.length > 0
            ? `數據集禁用壓力最高：${statListZh(mostBanned)}。國服 VOD 常禁鏡、藍，國際服禁用率不同——請以上表為準。`
            : '每次 sync-global 後請查各英雄頁即時禁用率。',
      },
      {
        heading: '刷野提醒',
        body: '預設刷滿四級；僅在下路或中路有硬控可三級抓。有線權才反野，否則換野區、拆塔鍍金與暴君視野。',
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: '單排能 C 的英雄：不靠完美隊友',
    badge: '單排',
    description: '無法語音、無國服式配合時，國際服仍能獨立帶節奏的選人。',
    sections: [
      {
        heading: 'S+ / S 梯度異常值',
        body:
          heroes
            .filter((h) => h.tier === 'S+' || h.tier === 'S')
            .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
            .slice(0, 12)
            .map((h) => statHeroZh(h))
            .join('。') || '數據不可用',
      },
      {
        heading: '選人邏輯',
        body: `單排適合能單獨拿目標標的英雄：分帶（李信、呂布）、刺殺（${namesZh(assassins.slice(0, 3))}）、自保射手（${namesZh(marksmen.slice(0, 3))}）。主玩位先單練 52%+ 勝率英雄再擴池。${GLOBAL_VS_CN_ZH}`,
      },
    ],
  },
  {
    slug: 'best-beginner-heroes',
    title: '新手也能上分的簡單英雄',
    badge: '新手',
    description: '國際服簡單難度、Meta 友善勝率英雄推薦。',
    sections: [
      {
        heading: '入門首選（簡單＋正勝率）',
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
        heading: '為何不用國服新手清單',
        body:
          '國服推薦的英雄可能在國際服不存在或已重做。以上皆在 Camp 匯出中，附英文技能與出裝。建議亞瑟或魯班七號練基本功，再轉一個 S 梯度主玩位英雄。',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: '別再掉分：5 個符合當前 Meta 的排位習慣',
    badge: '指南',
    description: '國際服上分——選人、數據與紀律，對齊 Camp HOK 即時統計。',
    sections: [
      {
        heading: '用數據選人，不靠記憶',
        body: `主玩位優先 S+ / S：${formatHeroNameList(heroes.filter((h) => h.tier === 'S+' || h.tier === 'S').slice(0, 10).map((h) => h.name), 'zh-TW')}。單英雄勝率 52%+ 再擴池。每次 sync-global 後重查——國服 patch VOD 常落後國際服數週。`,
      },
      {
        heading: '五個習慣',
        body:
          '1）硬克制位別盲選舒適英雄。2）每次同步後看主玩英雄頁 patch。3）暴君前插敵野入口眼。4）關閉聊天，只 ping 目標。5）連輸兩把就停——國際服 LP 比硬排划算。',
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: '刺客一直切你？這些英雄真的能反制',
    badge: '克制',
    description: '坦克與輔助如何拆解刺客勝利條件——來自 hokmeta 克制矩陣。',
    sections: [
      {
        heading: '威脅名單（高選取打野）',
        body: `Meta 刺客選取率：${statListZh(assassins)}。`,
      },
      {
        heading: '數據克制位',
        body: assassins.slice(0, 5).map(counterLineZh).join('。'),
      },
      {
        heading: '裝備與技能',
        body:
          '輔助：先出防爆裝再出傷害。射手：敵方刺客多時帶淨化。坦克：大招窗口擋在核心前面——與國服保 C 相同，但國際服刺客（影、韓信）四級就強，尊重三級後 gank。',
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: '坦克太肉？這些射手法師能磨死前排',
    badge: '克制',
    description: '百分比傷害、制裁與風箏——應對國際服坦克陣容。',
    sections: [
      {
        heading: '反坦克核心（射手＋法師勝率）',
        body: `${statListZh(topByRole('Marksman', 5))}。持續poke法師：${statListZh(topByRole('Mage', 4))}。`,
      },
      {
        heading: '坦克弱點（數據）',
        body: tanks.slice(0, 5).map(counterLineZh).join('。'),
      },
      {
        heading: '宏觀解法',
        body:
          '別在盾山或拉普朗普大招期硬團——換邊路目標。國服常雙坦，國際服多一坦一遊走，先風箏開團坦，核心安全前別追遊走。',
      },
    ],
  },
  {
    slug: 'how-to-jungle',
    title: '國際服打野入門：路線、抓人與選人',
    badge: '打野',
    description: '清野路線、gank 時機與當前打野 Meta 對齊。',
    sections: [
      {
        heading: '英雄池（Camp 打野標籤）',
        body: `${statListZh(jungleAssassins)}；${statListZh(sortByPickRate(byLane('Jungling', 'Warrior')).slice(0, 3))}。`,
      },
      {
        heading: '首輪清野',
        body: '預設刷滿四級；僅下路／中路有硬控才三級抓。有線權才反野，否則換野、拆塔與暴君視野。',
      },
      {
        heading: '目標節奏',
        body:
          '首暴君 5:00——下路有推線就往下路靠。主宰 10:00 用於終結，別在優勢時硬送 5v5。節奏類似國服，但國際服暴君爭奪較少，人數夠就白拿。',
      },
    ],
  },
  {
    slug: 'how-to-roam',
    title: '遊走時機：怎麼遊走才不坑射手',
    badge: '輔助',
    description: '何時離開發育路、哪些遊走選取率高、如何不拖累核心。',
    sections: [
      {
        heading: '遊走 Meta（Camp 遊走標籤）',
        body: statListZh(roamSupports),
      },
      {
        heading: '遊走窗口',
        body:
          '幫射手推完線再遊走——劣勢凍結線別走。核心無位移時暴君前要回線。國服 VOD 常見東皇、孫臏；國際服薩科爾、鬼谷子選取領先——請先在英雄頁學會控場連招再抄時機。',
      },
    ],
  },
  {
    slug: 'how-tier-list-works',
    title: '我們怎麼做 HOK 梯度榜（不靠猜）',
    badge: '數據',
    description: 'S+ 至 B：Camp HOK 國際服勝率、選取、禁用與排名指數。',
    sections: [
      {
        heading: '梯度分級',
        body:
          'S+：綜合指標與禁用壓力頂尖。S：Meta 常規強勢。A/B：有勝利條件但較窄。每個英雄頁有完整數據表，來源 Camp HOK + HoKStats.gg。',
      },
      {
        heading: '職業分組',
        body:
          '梯度榜與英雄索引按坦克、戰士、刺客、法師、射手、輔助分組，對應 Camp 職業標籤。分路（打野、遊走、發育、對抗、中路）用於選人參考。',
      },
      { heading: '不是國服梯度榜', body: GLOBAL_VS_CN_ZH },
    ],
  },
  {
    slug: 'best-heroes-after-patch',
    title: 'Patch 贏家：最新同步誰被加強了',
    badge: 'PATCH',
    description: 'Camp HOK 最新拉取中有 patchHistory 的英雄。',
    sections: [
      {
        heading: '近期調整',
        body:
          recentPatches.length > 0
            ? recentPatches
                .map(({ hero, patch }) => {
                  const name = getHeroDisplayName(hero, 'zh-TW');
                  return `${name}：${patch}`;
                })
                .join(' | ')
            : '請執行 npm run sync-global 取得最新 patch 說明。',
      },
      {
        heading: '如何使用 patch 說明',
        body:
          '國服 patch 直播常比國際服早數週。Buff 上國際服後，請先查梯度榜勝率再連勝——選取率通常會晚幾天才跟上。',
      },
    ],
  },
];
