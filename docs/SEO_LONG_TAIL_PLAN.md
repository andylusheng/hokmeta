# HOKMeta Long-tail SEO Plan

Updated: 2026-06-30

## 1. Current Inventory

This plan uses the current local project data as the first priority model. It does not replace Google Search Console data. After GSC has impressions and clicks, replace the estimated priority with real search metrics.

Current content/data snapshot:

| Asset | Count | Notes |
|---|---:|---|
| Heroes with keyword sets | 116 | `data/keywords.json` has 348 total hero keyword variants |
| English/root markdown guides | 41 | Includes hero guides, counter guides, role guides, and strategy guides |
| zh-Hant markdown guides | 38 | Existing Traditional Chinese coverage |
| Root guide files with `guide` in name | 21 | Main long-tail guide pool |
| Root `counter-*` guides | 9 | Good start, needs expansion for S+/S heroes |
| Root `best-*` guides | 6 | Role and beginner acquisition pages |
| Heroes missing usable build data | 0 | Annette and Lorion were patched on 2026-06-24 |

## 2. Priority Scoring

Until GSC data is available, prioritize by search intent and in-game demand.

Estimated score:

```txt
priority = intent weight + tier weight + pick pressure + ban pressure + content gap
```

Intent weights:

| Intent | Weight | Reason |
|---|---:|---|
| `best build for {hero}` | 5 | Highest conversion to hero pages and tools |
| `how to counter {hero}` | 5 | High pain intent, strong page engagement |
| `{hero} build and counters` | 4 | Good combined long-tail intent |
| `best {role} HOK` | 4 | Good hub traffic and internal linking |
| `HOK tier list {month year}` | 5 | Recurring high-intent search |
| `HOK arcana guide` | 3 | Evergreen support traffic |

## 3. Top Hero Targets

First 30 targets by local meta priority:

| Rank | Hero | Slug | Tier | Role | Lane | Primary Query |
|---:|---|---|---|---|---|---|
| 1 | Ao'yin | `aoyin` | S+ | Marksman | Farm Lane | `aoyin build honor of kings` |
| 2 | Augran | `augran` | S+ | Warrior | Jungling | `augran build honor of kings` |
| 3 | Daji | `daji` | S+ | Mage | Mid Lane | `daji build honor of kings` |
| 4 | Liang | `liang` | S+ | Mage | Mid Lane | `liang build honor of kings` |
| 5 | Angela | `angela` | S+ | Mage | Mid Lane | `how to counter angela honor of kings` |
| 6 | Li Xin | `li-xin` | S+ | Warrior | Clash Lane | `li xin build honor of kings` |
| 7 | Milady | `milady` | S+ | Mage | Mid Lane | `milady build honor of kings` |
| 8 | Hou Yi | `hou-yi` | S+ | Marksman | Farm Lane | `best build for hou yi` |
| 9 | Wang Zhaojun | `wang-zhaojun` | S+ | Mage | Mid Lane | `wang zhaojun build honor of kings` |
| 10 | Devara | `devara` | S+ | Mage | Clash Lane | `devara build honor of kings` |
| 11 | Luban No.7 | `luban-no-7` | S+ | Marksman | Farm Lane | `luban no 7 build honor of kings` |
| 12 | Haya | `haya` | S | Mage | Mid Lane | `haya build honor of kings` |
| 13 | Donghuang | `donghuang` | S | Tank | Roaming | `how to counter donghuang` |
| 14 | Florentino | `florentino` | S | Warrior | Clash Lane | `florentino build honor of kings` |
| 15 | Cai Yan | `cai-yan` | S | Support | Roaming | `cai yan build honor of kings` |
| 16 | Marco Polo | `marco-polo` | S | Marksman | Farm Lane | `marco polo build and counters` |
| 17 | Dun | `dun` | S | Tank | Clash Lane | `dun build honor of kings` |
| 18 | Dolia | `dolia` | S | Support | Roaming | `dolia build honor of kings` |
| 19 | Lorion | `lorion` | S | Mage | Mid Lane | `lorion build honor of kings` |
| 20 | Annette | `annette` | S | Support | Roaming | `annette build honor of kings` |
| 21 | Wukong | `wukong` | S | Assassin | Jungling | `wukong jungle build honor of kings` |
| 22 | Yaria | `yaria` | S | Support | Roaming | `yaria build honor of kings` |
| 23 | Mozi | `mozi` | S | Mage | Mid Lane | `mozi build honor of kings` |
| 24 | Lady Sun | `lady-sun` | S | Marksman | Farm Lane | `lady sun build honor of kings` |
| 25 | Dyadia | `dyadia` | S | Support | Roaming | `dyadia build honor of kings` |
| 26 | Xiao Qiao | `xiao-qiao` | S | Mage | Mid Lane | `xiao qiao build honor of kings` |
| 27 | Chicha | `chicha` | S | Warrior | Clash Lane | `chicha build honor of kings` |
| 28 | Consort Yu | `consort-yu` | S | Marksman | Farm Lane | `consort yu build honor of kings` |
| 29 | Erin | `erin` | S | Marksman | Farm Lane | `erin build honor of kings` |
| 30 | Luara | `luara` | S | Marksman | Farm Lane | `luara build honor of kings` |

## 4. Query Clusters

### Build Queries

Target URL pattern:

```txt
/hero/{slug}/
```

Examples:

- `best build for Hou Yi`
- `Aoyin build Honor of Kings`
- `Marco Polo build HOK`
- `Wukong jungle build`
- `Annette support build`

Required page updates:

- Add direct TLDR above build section.
- Put "core 3 items" before full table.
- Add matchup item swaps.
- Link to counter page and role hub.

### Counter Queries

Target URL pattern:

```txt
/hero/{slug}/counters/
```

Examples:

- `how to counter Angela`
- `how to counter Marco Polo`
- `best counters to Donghuang`
- `who counters Wukong HOK`

Required page updates:

- Add "Best counter" above the fold.
- Add lane-specific counters first.
- Add common mistakes.
- Add item counter section.
- Add FAQ answer under 60 words for snippet eligibility.

### Tier and Role Queries

Target URL patterns:

```txt
/tier-list/
/best-heroes/
/best-heroes/{role}/
```

Examples:

- `Honor of Kings tier list June 2026`
- `best marksman HOK`
- `best jungler Honor of Kings`
- `best support Honor of Kings`

Required page updates:

- Update month in title and intro every patch/month.
- Add role-specific "best 3 picks" blocks.
- Add "when to pick" and "when to avoid" notes.

### Evergreen Guide Queries

Target URL patterns:

```txt
/learn/{slug}/
/arcana/
/items/
```

Examples:

- `HOK arcana guide`
- `Honor of Kings items guide`
- `Honor of Kings beginner guide`
- `HOK jungle pathing guide`

Required page updates:

- Add short definitions near top.
- Add tables for quick scanning.
- Link every guide to relevant hero/build/counter pages.

## 5. Six-week Publishing Plan

See `docs/seo-long-tail-calendar.csv` for execution rows.

Weekly baseline:

| Week | Output | Goal |
|---|---|---|
| Week 1 | Fix content holes, refresh top 10 hero pages, refresh tier/month pages | Improve trust and crawl quality |
| Week 2 | Publish or refresh 8 counter pages for S+/S heroes | Capture pain-intent searches |
| Week 3 | Refresh role hubs and top marksman/mage/support pages | Build hub authority |
| Week 4 | Publish 8 hero guide refreshes and 4 video scripts | Support social distribution |
| Week 5 | Expand zh-Hant versions for top traffic pages | Capture multilingual long-tail |
| Week 6 | Use GSC export to prune, merge, and re-prioritize | Replace estimates with real data |

## 6. Weekly Measurement

Every Monday, fill these columns in the calendar:

- GSC impressions
- GSC clicks
- CTR
- Average position
- GA4 landing sessions
- Internal clicks to build/counter tools
- AdSense page RPM after ads are active

Decision rules:

- High impressions, low CTR: rewrite title/meta description.
- Position 8-20: add internal links and refresh answer blocks.
- Position 20-50: expand content and add supporting guide links.
- Low impressions after 21 days: check index status and query fit.
- High traffic, low engagement: improve above-the-fold answer and CTA.

## 7. Update Cadence

| Page Type | Cadence | Trigger |
|---|---|---|
| `/tier-list/` | Weekly | Every data sync or patch |
| `/hero/{slug}/` top 30 | Weekly | Tier/build/stat changes |
| `/hero/{slug}/counters/` top 30 | Weekly | Counter data or meta shift |
| `/best-heroes/{role}/` | Biweekly | Role meta movement |
| `/arcana/` | Monthly | Arcana data or guide refresh |
| `/learn/*` hero guides | Monthly | Prioritize pages with GSC impressions |

## 8. Next Actions

1. Deploy the current build and submit sitemap.
2. Request indexing for the top 20 rows from `seo-long-tail-calendar.csv`.
3. Refresh top hero pages in this order: Ao'yin, Augran, Daji, Liang, Angela, Li Xin, Milady, Hou Yi, Wang Zhaojun, Devara.
4. Refresh counter pages in this order: Angela, Daji, Liang, Ao'yin, Augran, Marco Polo, Donghuang, Wukong.
5. Export GSC data after 14 days and replace estimated scores.

## 9. Backlink and GEO Publishing Assets

Operational files added on 2026-06-30:

- `docs/GSC_INDEXING_PRIORITY_2026-06-30.md` - manual GSC/Bing indexing queue for hubs, tools, top hero pages, top counter pages, and top guide pages.
- `docs/BACKLINK_PUBLISHING_KIT_2026-06-30.md` - publish-ready external posts for Medium, GitHub, V2EX/Indie Hackers style communities, X, and Reddit.
- `docs/backlink-tracker.csv` - backlink publication log.
- `docs/SEO_WEEKLY_MEASUREMENT_TEMPLATE.csv` - weekly GSC/GA4 measurement template.

Backlink positioning rule: share real build and product data, not inflated claims. Current truthful proof points are 116 hero pages, 116 counter pages, 105 item pages, public JSON endpoints, tool pages, and the 1,985-page static build generated on 2026-06-30.
