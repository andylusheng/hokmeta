# HOK Meta (https://hokmeta.com)

Production **Next.js 14** static site for Honor of Kings meta: 30 heroes, tier list, builds, counters, trends, and learn hub.

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
3. Output directory: **`out`** — keep `distDir: 'out'` in `next.config.mjs` (required for Hostinger)
4. `config/site.json` → `domain` must match live URL

## Data

- `data/heroes.json` — hero meta (builds, counters, FAQs + live stats)
- `data/keywords.json` — related search terms
- `data/hero-id-map.json` — slug → Tencent hero ID / Camp name
- Regenerate skeleton: `node scripts/generate-data.js`
- **Refresh win/pick/ban + avatars** (Camp HOK metrics):

```bash
npm run sync-meta
```

Sources: [Tencent Camp HOK](https://camp.honorofkings.com/) metrics via [hok-meta-analyzer](https://github.com/lnsdeep/hok-meta-analyzer) export; portraits from `game.gtimg.cn` CDN (fallback).

## API (static JSON)

- `/api/heroes.json`
- `/api/heroes/{slug}.json`

## SEO

- `src/lib/seo.ts` — metadata & canonical URLs
- `src/lib/schema.tsx` — JSON-LD
- `public/robots.txt` via `src/app/robots.ts`
- Search: `/search/` is `noindex`
