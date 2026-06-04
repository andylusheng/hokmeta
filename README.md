# HOK Meta (hokmeta.com)

Production-ready **Next.js 14** static site for Honor of Kings meta: 30 top heroes, tier list, builds, counters, trends, learn hub, and JSON API for AI crawlers.

## Quick start

```bash
npm install
node scripts/generate-data.js   # optional: regenerate data
node scripts/copy-api.js        # copies /public/api/*.json
npm run dev
```

Build static export:

```bash
npm run build
```

Output: `out/` directory ready for CDN/hosting.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/heroes/` | All heroes |
| `/tier-list/` | Tier S+–C by role |
| `/hero/[slug]/` | Hero guide + meta analysis |
| `/best-heroes/[role]/` | Role meta pages |
| `/tools/build-generator/` | Build tool |
| `/tools/counter-picker/` | Counter tool |
| `/hero-trends/` | Rising / picked / banned / patches |
| `/learn/` + 10 articles | Topic cluster |
| `/search/?q=` | **noindex** search results |

## API (static JSON)

- `/api/heroes.json`
- `/api/heroes/{slug}.json`

## Data

- `data/heroes.json` — 30 heroes (run `scripts/generate-data.js` to regenerate)
- `data/keywords.json` — long-tail keywords per hero

## SEO

Central metadata: `src/lib/seo.ts`  
JSON-LD: `src/lib/schema.tsx`  
Author: **HOK Meta Team**

## License

Private — hokmeta.com
