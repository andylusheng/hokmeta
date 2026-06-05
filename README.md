# HOK Meta (https://hokmeta.com)

Production **Next.js 14** static site for **Honor of Kings Global**: full hero roster (~112), tier list, skills, item builds, counters, trends, and learn hub.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3001

## Production build

```bash
npm run build
```

- Static site: `out/` (includes `index.html` at root)

## Deploy (Hostinger Node.js + GitHub)

1. Connect repo `hokmeta`, branch `main`
2. Build: `npm run build`
3. Output directory: **`out`** (from `npm run build` — Hostinger panel only; do not set `distDir` to `out`)
4. `config/site.json` → `domain` must match live URL

## Data

- `data/heroes.json` — global heroes (skills, builds, counters, Camp stats)
- `data/items.json` — item icons + English descriptions
- `data/keywords.json` — related search terms
- `data/hero-id-map.json` — slug → Tencent hero ID / Camp name
- **Full global sync** (112 heroes + ~107 items):

```bash
npm run sync-global
```

Options: `--skip-items` (heroes only), `--skip-enrich` (Camp stats only, no HoKStats scrape).

Sources: [Camp HOK](https://camp.honorofkings.com/) via [hok-meta-analyzer](https://github.com/lnsdeep/hok-meta-analyzer); English skills/builds/items from [HoKStats.gg](https://hokstats.gg/) (intl); icons `game.gtimg.cn`.

Legacy 30-hero patch sync: `npm run sync-meta` (deprecated for counters — use `sync-global`).

## API (static JSON)

- `/api/heroes.json`
- `/api/heroes/{slug}.json`

## SEO & analytics

- `src/lib/seo.ts` — metadata, canonical URLs, GSC/Bing verification tags
- `src/lib/schema.tsx` — JSON-LD (FAQ, Article, ItemList, VideoGame)
- `src/app/sitemap.ts` — auto-generated sitemap
- `src/app/robots.ts` — robots + sitemap URL
- Search: `/search/` is `noindex`

**Before launch tracking:** fill `config/site.json` → `googleSiteVerification`, `bingSiteVerification`, `ga4MeasurementId`, then `npm run build` and deploy. See [docs/SETUP_ANALYTICS.md](docs/SETUP_ANALYTICS.md).

```bash
npm run gsc-priority-urls   # URLs to request indexing in GSC/Bing
npm run qa-priority-builds  # Re-sync builds for top meta heroes
```
