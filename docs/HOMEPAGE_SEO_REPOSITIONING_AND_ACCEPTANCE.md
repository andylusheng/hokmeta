# 首页 SEO 定位与验收文档

最后更新：2026-07-17

## 一、结论

首页是 HOKMeta 的站点级入口页，目标是承接 `Honor of Kings Global` 的出装、克制、英雄数据和工具需求。

首页不应争取单个英雄词，例如 `hou yi`。该词本身还包含大量中国神话相关搜索意图，不能作为首页核心关键词。

`Hou Yi` 相关搜索应由以下落地页分别承接：

- `/hero/hou-yi/`：出装、铭文、装备、数据与常见问题
- `/hero/hou-yi/counters/`：克制与对局意图
- `/learn/hou-yi-guide/`：完整排位攻略意图
- `/tools/damage-calculator/hou-yi/`：伤害计算意图
- `/tools/build-compare/hou-yi/`：出装比较意图

## 二、搜索意图与落地页映射

| 搜索词族 | HOKMeta 应承接页面 | 不应承接页面 |
| --- | --- | --- |
| Honor of Kings Global builds、counters、hero stats | `/` | 单个英雄页 |
| Hou Yi build、arcana、items、stats | `/hero/hou-yi/` | 首页 |
| How to counter Hou Yi | `/hero/hou-yi/counters/` | 首页 |
| Hou Yi ranked guide | `/learn/hou-yi-guide/` | 首页 |
| Hou Yi damage、build damage | `/tools/damage-calculator/hou-yi/` | 首页 |
| Compare Hou Yi builds | `/tools/build-compare/hou-yi/` | 首页 |

## 三、首页内容规则

页面类型：站点入口页。

允许新增的内容：

- 清晰的站点级 H1。
- 对英雄出装、克制、工具、官方每日表现数据的简短说明。
- 指引玩家进入正确产品区域的短说明。
- 少量 FAQ，解释本站是什么、多久更新、去哪里找出装。

禁止新增的内容：

- 把英雄名称作为首页 H1。
- 把本应位于英雄页或攻略页的英雄分析复制到首页。
- 人为重复关键词。
- 只为了第三方体检分数，把首页机械扩写到 1200 字以上。
- 根据胜率自动生成因果解释或版本结论。

## 四、涉及路由与语言范围

本次改动只影响首页家族。四种语言必须同时完成 Title、Description、H1、段落、FAQ 和同语言内链。

| 路由 | 必须具备的状态 |
| --- | --- |
| `/` | 英文站点级 metadata、H1、正文、内链、FAQ |
| `/zh-TW/` | 繁体中文等价内容，不允许英文正文 fallback |
| `/id/` | 印尼语等价内容，不允许英文正文 fallback |
| `/fil/` | 菲律宾语/Taglish 等价内容，不允许英文正文 fallback |
| `/hero/hou-yi/` 及其语言镜像 | 保持为英雄词落地页，验证 metadata 与内链 |
| Hou Yi 的克制、攻略、计算器、比较页 | 保持为意图明确的深链，不在首页重复正文 |

本次不修改：

- sitemap 路径：相关 URL 已存在，canonical 不变。
- public API 数据。
- 每日 D1 同步。
- 英雄详情页的趋势解释。

## 五、实施内容

1. 首页 H1 改为站点级关键词，不再使用英雄名称。
2. Hou Yi 保留为精选英雄，但使用 H2，不占用首页 H1。
3. 首页增加两个面向玩家的短模块：
   - 出装、克制与工具
   - 官方每日表现趋势
4. 首页增加三个可见 FAQ。
5. 所有新增文案必须同时完成 `en`、`zh-TW`、`id`、`fil`。
6. 所有新增内链保持当前语言前缀。

## 六、本次文件范围

- `src/views/HomePageView.tsx`
- `src/components/home/HeroSplash.tsx`
- `messages/en.json`
- `messages/zh-TW.json`
- `messages/id.json`
- `messages/fil.json`
- `docs/HOMEPAGE_SEO_REPOSITIONING_AND_ACCEPTANCE.md`

## 七、验收清单

### 内容与 SEO

- [ ] 首页 Title 以 `Honor of Kings Global Builds, Counters & Hero Stats` 为核心。
- [ ] 首页只有一个 H1，且它是站点级标题，不是英雄名称。
- [ ] Hou Yi 明确标记为精选英雄，并使用 H2。
- [ ] 首页可见地链接至英雄出装、克制、工具和趋势页面。
- [ ] FAQ 回答玩家问题，不写无依据的结论。
- [ ] Hou Yi 的英雄、克制、攻略、伤害计算、出装比较仍保持为独立落地页。

### 多语言完整性

- [ ] `/`、`/zh-TW/`、`/id/`、`/fil/` 均有本地化 metadata 和可见正文。
- [ ] 新增标题、FAQ 问答、CTA 不存在非英语路由上的英文 fallback。
- [ ] 新增内链保留当前 locale 前缀。

### 技术验证

- [ ] `npm run build` 通过。
- [ ] 四种语言首页的静态导出文件存在。
- [ ] 英文首页导出产物包含新的站点级 Title 和 H1。
- [ ] 三个本地化首页包含对应语言的 H1 和 FAQ 标题。
- [ ] Hou Yi 页面族的静态导出路径存在。

## 八、完成口径

只有当首页与三个本地化镜像同时通过内容、多语言和静态导出检查时，本次工作才算完成。

这份文档不宣称域名已经获得权重、外链或排名。域名权威度、收录和搜索排名，仍需要持续更新、用户需求、内部链接和相关网站的自然引用共同积累。
