# 工具页静态导出体积优化与验收文档

更新日期：2026-07-17

## 一、目标

降低 HOKMeta 工具页的静态导出体积和 Cloudflare Pages 上传时间，同时保留每个英雄工具深链的独立 SEO 页面。

本次不改变伤害公式、出装比较结果、英雄 URL、页面标题、结构化数据或现有的英雄/攻略/克制内链。

## 二、现状与根因

构建产物 `out/` 当前约为：

- 8,102 个文件
- 5.26 GB
- `damage-calculator` 约 2.32 GB
- `build-compare` 约 2.32 GB
- `public/api/` 原始数据仅约 7.5 MB

根因不是 API 文件本身过大，而是每一个工具深链页面都将完整的 `heroes` 和 `items` 数组传入客户端组件。Next.js 静态导出时会把这些 props 序列化进每个页面。116 位英雄、两个工具、四个 locale 形成了大量重复数据。

## 三、页面范围

### 工具页

- `/tools/damage-calculator/`
- `/tools/damage-calculator/[slug]/`
- `/tools/build-compare/`
- `/tools/build-compare/[slug]/`

### Locale

- `en`
- `zh-TW`
- `id`
- `fil`

### 不在本次范围

- 英雄数据同步规则
- 伤害公式与英雄倍率
- 装备属性数据
- 其它工具和攻略页面
- sitemap / GSC URL 策略

## 四、实施方案

### 1. 工具专用精简数据文件

构建前由 `scripts/copy-api.js` 从英雄和装备源数据生成：

`/api/tools.json`

文件只包含计算器和下拉选择真正需要的字段：

- 英雄：slug、名称、角色、分路、Tier、胜率、头像、推荐出装、可选出装、技能图标
- 装备：ID、名称、图标、分类、等级、属性描述、被动描述

不复制英雄封面、攻略、FAQ、克制关系、补丁历史等工具不使用的大字段。

### 2. 静态页面只保留 SEO 壳

每个 `[slug]` 页面在构建时只输出：

- 页面标题和 meta description
- H1 与一句用途说明
- Breadcrumb 和 WebApplication schema
- 英雄页、克制页、装备页等可见内链

不再把全量英雄与装备数据作为客户端 props 写入 HTML。

### 3. 浏览器按需加载

工具客户端在打开后请求一次 `/api/tools.json`，拿到精简数据后初始化计算器。

这会把重复的部署数据变成一个可缓存的静态请求；同一用户进入另一个工具页时，浏览器和 CDN 可以复用该文件。

### 4. 多语言规则

工具可见的加载、输入、结果、提示和短说明必须与当前 locale 一致。

本次不新增工具页 SEO 长文。原先的三段英文说明删除，改为短用途说明与现有深链，符合 B 类工具页约束。

## 五、预计修改文件

- `scripts/copy-api.js`
- `src/lib/tool-data.ts`
- `src/components/DamageCalculatorClient.tsx`
- `src/components/BuildCompareClient.tsx`
- `src/components/HeroSelect.tsx`
- `src/views/DamageCalculatorView.tsx`
- `src/views/BuildCompareView.tsx`
- 8 个工具 route 文件（2 个工具 x 4 个 locale）
- `messages/en.json`
- `messages/zh-TW.json`
- `messages/id.json`
- `messages/fil.json`

## 六、验收标准

### 构建与数据

- `npm run build` 通过，确保执行 `prebuild` 与 `postbuild`
- `public/api/tools.json` 生成且 JSON 可解析
- `out/api/tools.json` 存在

### 页面与 SEO

- 四种 locale 的两类工具深链都存在
- 静态 HTML 保留对应英雄的 title、H1、description、schema 和内链
- 静态 HTML 不再包含完整英雄数组和完整装备数组

### 功能

- 工具客户端可以加载精简数据
- 英雄选择、推荐出装、装备搜索、伤害计算、出装对比维持可用
- 四个 locale 的加载与工具说明不出现静默英文 fallback

### 性能

- 比较改造前后 `out/` 总体积、文件数和代表性工具深链 HTML 大小
- 两个工具页的总静态产物应不再占 GB 级体积

## 七、部署配置复核

Cloudflare Pages 应使用：

- Build command：`npm run build`
- Output directory：`out`
- Node.js：22

当前使用 `npx next build` 会跳过 `prebuild`/`postbuild`，无法保证 API 生成和 locale 后处理完整执行；这项需要在 Cloudflare Pages 控制台人工调整。

## 八、实际验收结果

2026-07-17 本地验证结果：

- `npm run build`：通过，生成 3,923 个静态页面，并完成 API 与 locale 后处理
- `npm run qa-zh-locale`：通过，116 位英雄 FAQ/克制一致性检查正常
- `/api/tools.json`：已生成，116 位英雄、109 件装备，约 368 KB
- `out/`：8,103 个文件，约 648.6 MB；改造前约 5.26 GB，减少约 87.7%
- 英语 `damage-calculator` 目录：约 4.9 MB；改造前约 2.32 GB
- 英语 `build-compare` 目录：约 4.9 MB；改造前约 2.32 GB
- Hou Yi 两类工具深链的英语、繁中、印尼语、菲律宾语静态 HTML 均存在，单页约 29-31 KB
- 工具 API 已检查 Hou Yi 的技能、推荐出装和对应装备属性字段，满足计算器初始化所需数据

未在本地进行浏览器手工交互录制；但 TypeScript 构建、导出 HTML、工具 API 数据结构和客户端加载路径均已校验。上线后应在生产域名抽查一次英雄选择、装备添加和计算结果。
