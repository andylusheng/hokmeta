# HOKMeta Project Index

## Project

HOKMeta is a Next.js 14 static export site for Honor of Kings Global:

- Live domain: `https://hokmeta.com`
- Local dev: `npm run dev` then open `http://localhost:3001`
- Production build: `npm run build`
- Static output: `out/`
- Main branch: `main`

The site is content plus tools: hero pages, counters, tier lists, item database, arcana, learn hub, damage calculator, build compare, and counter picker.

## Important Directories

- `src/app/`: Next app routes, including English and `zh-TW` mirrors.
- `src/views/`: page-level view components.
- `src/components/`: reusable UI and client tools.
- `src/lib/`: data loading, SEO, i18n, damage formulas, guides, counter logic.
- `data/`: source JSON used by the site.
- `public/api/`: static API JSON copied/generated for public endpoints.
- `docs/`: SEO guide articles and long-tail planning docs.
- `messages/`: i18n dictionaries.
- `scripts/`: sync, repair, QA, enrichment, and utility scripts.
- `config/site.json`: domain, analytics, verification, and site config.
- `hokmeta-public/`: public API/docs repo staging folder. Keep it out of the main site repo unless explicitly requested.

## Core Pages And Tools

- Hero page: `/hero/[slug]/`
- Counter page: `/hero/[slug]/counters/`
- Tools index: `/tools/`
- Damage calculator: `/tools/damage-calculator/` and `/tools/damage-calculator/[slug]/`
- Build compare: `/tools/build-compare/` and `/tools/build-compare/[slug]/`
- Counter picker: `/tools/counter-picker/`
- Items: `/items/` and `/items/[id]/`
- Learn hub: `/learn/`
- Tier list: `/tier-list/`

Both English root routes and `/zh-TW/` localized routes usually need to stay aligned.

## Data And Sync

Main data files:

- `data/heroes.json`
- `data/items.json`
- `data/arcana.json`
- `data/patches.json`
- `data/keywords.json`
- `data/hero-names-zh.json`
- `data/item-names-zh.json`
- `data/arcana-names-zh.json`

Public API files are generated/copied under `public/api/`.

Useful commands:

```bash
npm run sync-camp -- --skip-counters
node scripts/snapshot-to-d1.js
cmd /c sync-camp-d1.bat
npm run build
npm run qa-zh-locale
npm run gsc-priority-urls
```

`sync-camp-d1.bat` runs Camp sync first, then writes the hero metrics snapshot to Cloudflare D1. Expected generated data churn under `data/` and `public/api/` is normal after a sync.

## Build And Deploy Notes

- `next.config.mjs` uses `output: 'export'`.
- Do not set `distDir` to `out`; `out/` is static export output, not the Next cache dir.
- `prebuild` and `postbuild` run `scripts/copy-api.js`.
- Hostinger deployment should use build command `npm run build` and output directory `out`.

## Git Rules For This Repo

- Do not run broad `git add .` unless the user explicitly wants everything.
- `hokmeta-public/` should normally stay untracked in this main repo.
- Generated sync files can be large; check the staged file list before committing.
- If committing tool/site work, avoid mixing it with unrelated data sync churn unless requested.
- If committing data sync work, stage `data/` and `public/api/` intentionally.

## Current Product Direction

Priority is content plus tools for SEO growth:

- High-quality hero guide and counter content for long-tail searches.
- Practical tools that create repeat visits: damage calculator, build compare, counter picker, item database.
- Internal links between hero guide, counter page, tools, and items.
- Keep pages mobile-first and static-export friendly.

## Mandatory Development Guardrails

Before changing HOKMeta features, pages, SEO content, or localization, follow these docs:

- `docs/HOKMETA_TASK_EXECUTION_SOP.md`
- `docs/HOKMETA_CONTENT_AND_PAGE_GUARDRAILS.md`
- `docs/I18N_ROLLOUT_PLAN.md` for any locale or language-switcher work

Important working rules:

- Do not call a feature complete just because a nav item, language button, or route exists.
- For every change, identify the affected route family before editing: homepage, list page, detail page, dynamic slug page, tools, learn pages, sitemap, GSC list, and localized mirrors.
- For localization, a route is not live unless the user-facing body copy is localized. English fallback is only an internal preview state.
- For Learn pages, article title, intro, headings, body, FAQ, CTA, and internal-link anchor text must be checked before exposing a locale in the switcher.
- Final reports must distinguish between complete, technically connected, fallback-only, generated but hidden, and still requiring manual translation.

## Known Local Context

- `hokmeta-public/` is intended for a separate public GitHub repository containing API docs, examples, attribution, disclaimer, and sample data.
- Some old scratch files may exist at repo root. Do not remove them unless the user asks or they are clearly part of the current task.
