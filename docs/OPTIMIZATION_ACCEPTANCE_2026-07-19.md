# HOKMeta 优化验收清单 — 2026-07-19

> 目标：修复技术性能瓶颈、补全 i18n 缺口、强化 SEO 结构，为月访问 10W 打好基础。

---

## Phase 1：性能优化（P0 — 影响 Core Web Vitals & 排名）

### 1.1 拆分 heroes.json 按需加载

| 项目 | 说明 |
|------|------|
| 现状 | `data/heroes.json` 3.1 MB，构建时全量 import 进每个页面 bundle |
| 方案 | 构建时拆分为 `data/heroes-index.json`（轻量索引：slug/name/role/tier/avatar）+ `data/heroes/[slug].json`（完整数据）；页面 SSG 时按需读取 |
| 验收标准 | ① 首页 JS bundle 减少 ≥ 50%（对比 `next build` 输出）② 英雄详情页功能不变 ③ `npm run build` 无报错 |

### 1.2 图片优化

| 项目 | 说明 |
|------|------|
| 现状 | `images.unoptimized: true`，所有英雄头像/技能图标原图输出 |
| 方案 | ① 英雄头像统一压缩为 WebP（≤ 15KB/张）存入 `public/images/heroes/` ② 技能图标压缩为 WebP（≤ 8KB）③ 保留 CDN fallback ④ HeroAvatar 组件加 `width/height` 固定尺寸避免 CLS |
| 验收标准 | ① 首页 LCP 图片 ≤ 50KB ② 无 broken image ③ Lighthouse Performance ≥ 85 |

### 1.3 meta-trends.json 瘦身

| 项目 | 说明 |
|------|------|
| 现状 | 1.2 MB，含 30 天逐日历史 |
| 方案 | 历史数据保留 14 天；趋势页仅加载 top-30 英雄摘要；完整历史移至 `/api/trends-full.json` 按需 fetch |
| 验收标准 | ① `meta-trends.json` ≤ 400KB ② 趋势页展示正常 ③ 历史图表可展开加载完整数据 |

### 1.4 首屏 JS 精简

| 项目 | 说明 |
|------|------|
| 现状 | 55+ 组件无代码分割，GA/AdSense 阻塞渲染 |
| 方案 | ① GA 改为 `strategy="lazyOnload"` ② 首页 below-fold 组件 `dynamic(() => import(...))` ③ 工具页客户端组件 lazy 加载 |
| 验收标准 | ① 首页首屏 JS ≤ 120KB (gzipped) ② TTI ≤ 3s (Moto G4 throttle) |

---

## Phase 2：i18n 翻译补全（P0 — 东南亚市场核心）

### 2.1 FIL/ID 高曝光 key 补全

| 项目 | 说明 |
|------|------|
| 现状 | `fil.json` 16.8KB / `id.json` 16.4KB vs `en.json` 39.2KB（覆盖率 ~43%） |
| 方案 | 优先补全：`nav.*`、`home.*`、`hero.*`、`tools.*`、`learn.*`、`footer.*`、`climb.*`、`comps.*` |
| 验收标准 | ① FIL/ID 覆盖率 ≥ 85% ② `npm run qa-zh-locale` 扩展为 `qa-all-locales` 无 fallback 警告 ③ 页面导航/标题/CTA 无英文残留 |

### 2.2 zh-TW 剩余缺口

| 项目 | 说明 |
|------|------|
| 现状 | 36.6KB vs 39.2KB（~93%），少量新增 key 未翻译 |
| 验收标准 | ① 覆盖率 ≥ 98% ② 无 `common.contentEnglishNotice` 以外的英文 UI 文案 |

---

## Phase 3：SEO 结构强化（P1）

### 3.1 动态 OG 图片

| 项目 | 说明 |
|------|------|
| 现状 | 所有页面共用 `/og-default.svg` |
| 方案 | 构建时用 Satori/Sharp 为每个英雄生成 OG 卡片（头像 + 名字 + Tier + WR），存入 `public/og/heroes/[slug].png` |
| 验收标准 | ① 112 张 OG 图生成 ② 英雄页 `<meta property="og:image">` 指向对应图 ③ 图片尺寸 1200×630 |

### 3.2 Learn 文章 dateModified

| 项目 | 说明 |
|------|------|
| 现状 | sitemap 中所有 learn 文章用统一 `freshness` 日期 |
| 方案 | 每篇文章增加 `lastModified` 字段（从 git log 或手动标注），sitemap/JSON-LD 使用真实日期 |
| 验收标准 | ① sitemap.xml 中 learn 路由 `lastmod` 各不相同 ② 文章页 JSON-LD 含 `dateModified` |

### 3.3 Breadcrumb JSON-LD 扩展

| 项目 | 说明 |
|------|------|
| 现状 | 仅英雄详情页有 breadcrumb schema |
| 方案 | 为 `/items/[id]`、`/learn/[slug]`、`/tools/*`、`/best-heroes/[role]` 添加 BreadcrumbList |
| 验收标准 | ① GSC 结构化数据报告无错误 ② 搜索结果展示面包屑 |

### 3.4 内链锚文本优化

| 项目 | 说明 |
|------|------|
| 现状 | 大量 "View all"、纯英雄名锚文本 |
| 方案 | 改为描述性锚文本："{Hero} best build"、"How to counter {Hero}"、"{Role} tier list" |
| 验收标准 | ① 首页/英雄页/learn 页无裸 "View all" 锚文本 ② 每个内链含目标关键词 |

---

## Phase 4：内容扩张基础（P1）

### 4.1 英雄对比页（X vs Y）

| 项目 | 说明 |
|------|------|
| 方案 | 新增 `/compare/[slug-a]-vs-[slug-b]/` 路由，自动生成同角色热门对比（~200 对） |
| 验收标准 | ① 200+ 对比页可访问 ② 含结构化数据 ③ 已加入 sitemap |

### 4.2 阵容页扩展

| 项目 | 说明 |
|------|------|
| 现状 | `comps.json` 仅 4.2KB（~5 个阵容） |
| 方案 | 扩展至 30+ 阵容（按策略分类：poke、dive、split-push、teamfight、protect-carry） |
| 验收标准 | ① `/comps/` 展示 30+ 阵容 ② 每个阵容含英雄链接 ③ 页面有 FAQ schema |

### 4.3 工具页可索引化

| 项目 | 说明 |
|------|------|
| 方案 | 伤害计算器/出装对比的 query params 生成 canonical URL，支持分享 & 索引 |
| 验收标准 | ① 带参数 URL 可被 GSC 收录 ② 分享链接打开后状态还原 |

---

## Phase 5：运维 & 监控（P2）

### 5.1 CI 构建校验

| 方案 | PR 触发 `npm run build` + Lighthouse CI（性能/SEO/可访问性 ≥ 85） |
|------|------|
| 验收标准 | ① `.github/workflows/ci.yml` 存在 ② PR 状态检查生效 |

### 5.2 自动部署

| 方案 | main 分支 push 后触发 Hostinger deploy（或 Cloudflare Pages 迁移） |
|------|------|
| 验收标准 | ① 数据同步后 30min 内线上更新 ② 部署失败有告警 |

### 5.3 根目录清理

| 方案 | 将 `_*.js`、`_*.ts` 临时脚本移入 `scripts/_scratch/` 或删除 |
|------|------|
| 验收标准 | ① 根目录无 `_` 前缀文件 ② `npm run build` 不受影响 |

---

## 执行优先级 & 时间线

| 阶段 | 内容 | 预计工时 | 截止 |
|------|------|----------|------|
| Phase 1 | 性能优化 | 2-3 天 | 07-22 |
| Phase 2 | i18n 补全 | 2 天 | 07-24 |
| Phase 3 | SEO 结构 | 2 天 | 07-26 |
| Phase 4 | 内容扩张 | 3-4 天 | 07-30 |
| Phase 5 | 运维监控 | 1 天 | 07-31 |

---

## 验收总检

- [ ] `npm run build` 零错误零警告
- [ ] Lighthouse Performance ≥ 85 / SEO ≥ 95
- [ ] GSC 结构化数据零错误
- [ ] 4 语言页面导航/标题/CTA 无英文残留（除技能/装备名）
- [ ] sitemap.xml URL 总数 ≥ 3000
- [ ] 首页 LCP ≤ 2.5s（Moto G4, 4G throttle）
- [ ] 所有 OG 图正确渲染
- [ ] 根目录无临时脚本

---

*文档版本：v1.0 | 创建日期：2026-07-19 | 状态：待确认*
