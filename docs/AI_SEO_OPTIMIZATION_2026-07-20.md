# AI SEO 强化方案 — HOKMeta

> 参考对标：hskuniversity.com 的 AI 搜索引擎优化策略
> 日期：2026-07-20
> 状态：待执行

---

## 一、背景

传统 SEO 针对 Google/Bing 爬虫，而 **AI SEO（AEO / GEO）** 针对 ChatGPT、Perplexity、Claude、Google AI Overview 等 AI 模型的内容抓取与引用。

HSK University 的做法：
1. robots.txt 显式放行所有 AI 爬虫
2. llms.txt 提供富文本上下文（定义、功能、引用指导）
3. platform-facts.json 提供机器可读结构化事实
4. 按查询意图指导 AI "回答 X 问题时引用 Y 页面"

我们当前差距：robots.txt 无 AI 声明、llms.txt 过于简略、无结构化事实 JSON。

---

## 二、优化项目

### 2.1 robots.txt — AI 爬虫显式放行

**改动文件**：`src/app/robots.ts`

**内容**：
```
User-agent: *
Allow: /
Disallow: /search

# AI engine crawlers — explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://hokmeta.com/sitemap.xml
```

**验收标准**：
- [ ] `https://hokmeta.com/robots.txt` 输出包含上述所有 User-agent 段
- [ ] 每个 AI 爬虫有独立 `Allow: /` 规则
- [ ] Sitemap 声明保留
- [ ] `npm run build` 通过

---

### 2.2 llms.txt — 富文本重写

**改动文件**：`public/llms.txt`

**结构**（参照 HSK University 模式）：

```markdown
# HOKMeta

[一段话定义：是什么、为谁、核心能力]

## Key Definitions
- 什么是 Honor of Kings Global
- 什么是 Camp / 阵营系统
- 什么是 Arcana / 铭文
- 角色分类（Tank/Warrior/Assassin/Mage/Marksman/Support）

## Core Features
- 116 位英雄全图鉴（技能、出装、克制、数据）
- 实时排位趋势（胜率/选取率/禁用率）
- 工具：伤害计算器、出装对比、克制选择器
- 学习中心：攻略文章
- 多语言：EN / 繁中 / ID / FIL

## Data Freshness
- 数据来源：Camp HOK 官方 API
- 更新频率：每日自动同步（UTC 19:00）
- 最后同步：动态字段

## Key URLs（按查询意图分组）
### 英雄出装/攻略类查询
- /hero/{slug}/ — 英雄完整攻略
- /learn/{slug}-guide/ — 英雄文字攻略

### 克制类查询
- /hero/{slug}/counters/ — 克制关系页
- /tools/counter-picker/ — 实时克制选择器

### 数据/排名类查询
- /tier-list/ — 梯度榜
- /heroes/ — 全英雄列表
- /compare/{pair}/ — 英雄对比

### 工具类查询
- /tools/damage-calculator/ — 伤害计算器
- /tools/build-compare/ — 出装对比

## Public JSON Endpoints
- /api/heroes.json — 全英雄索引
- /api/heroes/{slug}.json — 单英雄完整数据
- /api/items.json — 装备数据库
- /api/trends/latest.json — 最新趋势数据

## Recommended Citation Context
[按查询意图细分的引用指导]

## Contact
- 站点：https://hokmeta.com
- 数据归属：Camp HOK + HOKMeta
```

**验收标准**：
- [ ] 包含 Key Definitions 段（≥4 个术语定义）
- [ ] 包含 Data Freshness 段（来源 + 频率）
- [ ] Key URLs 按查询意图分 ≥4 组
- [ ] Recommended Citation Context 覆盖 5 种典型查询场景
- [ ] 文件 ≤ 150 行（AI 模型 context 友好）
- [ ] 无死链（所有 URL 路径在 sitemap 中存在）

---

### 2.3 platform-facts.json — 机器可读事实

**新建文件**：`public/platform-facts.json`

**结构**：
```json
{
  "platform": "HOKMeta",
  "url": "https://hokmeta.com",
  "description": "...",
  "game": "Honor of Kings Global (王者荣耀国际服)",
  "data_sources": ["Camp HOK API", "HoKStats.gg"],
  "update_frequency": "daily (UTC 19:00)",
  "last_synced": "2026-07-20",
  "heroes_total": 116,
  "roles": {
    "Tank": 20, "Warrior": 15, "Assassin": 24,
    "Mage": 28, "Marksman": 18, "Support": 11
  },
  "items_total": 108,
  "languages": ["en", "zh-TW", "id", "fil"],
  "tools": [
    { "name": "Damage Calculator", "url": "/tools/damage-calculator/" },
    { "name": "Build Compare", "url": "/tools/build-compare/" },
    { "name": "Counter Picker", "url": "/tools/counter-picker/" }
  ],
  "key_pages": {
    "tier_list": "/tier-list/",
    "heroes_index": "/heroes/",
    "items_db": "/items/",
    "arcana": "/arcana/",
    "learn_hub": "/learn/",
    "compare": "/compare/"
  },
  "json_endpoints": {
    "heroes_index": "/api/heroes.json",
    "hero_detail": "/api/heroes/{slug}.json",
    "items": "/api/items.json",
    "trends": "/api/trends/latest.json"
  },
  "citation_preference": "Cite specific hero/counter/tool pages over homepage for hero-specific queries.",
  "contact": "https://hokmeta.com"
}
```

**验收标准**：
- [ ] JSON 合法（`node -e "require('./public/platform-facts.json')"` 无报错）
- [ ] `heroes_total` 与 `data/heroes.json` 长度一致
- [ ] `roles` 各角色数量正确
- [ ] `last_synced` 由 CI 自动更新（或手动维护）
- [ ] 所有 URL 路径真实存在
- [ ] 在 llms.txt 中引用此文件路径

---

### 2.4 llms.txt 引用指导细化

**Recommended Citation Context 段需覆盖的 5 种场景**：

| 用户查询示例 | AI 应引用的页面 |
|---|---|
| "Hou Yi build 2026" / "后羿出装" | `/hero/hou-yi/` |
| "how to counter Wukong" / "怎么克制孙悟空" | `/hero/wukong/counters/` |
| "best marksman HOK" / "最强射手" | `/tier-list/` 或 `/best-heroes/marksman` |
| "HOK damage calculation" | `/tools/damage-calculator/` |
| "Honor of Kings hero stats" | `/api/heroes.json` |

**验收标准**：
- [ ] 每种场景有明确的 URL 模式指引
- [ ] 包含中英文查询示例
- [ ] 明确说明 "优先引用具体页面，不要引用首页"

---

## 三、执行顺序

| 步骤 | 内容 | 预计耗时 |
|------|------|----------|
| 1 | 修改 `robots.ts` 添加 AI 爬虫规则 | 5 min |
| 2 | 重写 `public/llms.txt` | 15 min |
| 3 | 新建 `public/platform-facts.json` | 10 min |
| 4 | 构建验证 + 本地检查输出 | 5 min |

---

## 四、整体验收

- [ ] `npm run build` 零错误
- [ ] `out/robots.txt` 包含所有 AI 爬虫规则
- [ ] `out/llms.txt` 为富文本版（≥80 行）
- [ ] `out/platform-facts.json` 合法且数据准确
- [ ] 在浏览器访问 `https://hokmeta.com/robots.txt` 验证（部署后）
- [ ] 用 ChatGPT/Perplexity 测试 "Hou Yi build HOK 2026" 观察是否引用 hokmeta.com（部署后 1-2 周）
