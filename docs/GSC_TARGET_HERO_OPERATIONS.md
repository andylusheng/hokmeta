# GSC Target Hero Operations

Use this process when Google Search Console starts showing impressions for a hero query.

## Current Target List

The source file is:

```txt
data/gsc-target-heroes.json
```

Only add a hero after GSC shows real impressions or clicks. Do not add heroes just because they feel important.

The preferred path is not manual screenshot reading. Export the query table from GSC and import it:

```bash
npm run gsc:import-targets -- path/to/gsc-queries.csv
npm run qa:gsc-targets
```

Use dry-run first when checking a new export:

```bash
npm run gsc:import-targets -- path/to/gsc-queries.csv --dry-run
```

Current first target:

```txt
honor of kings kaizer -> kaizer
```

The 2026-07-14 screenshot also includes these actionable hero targets:

```txt
kaizer / kaiser -> kaizer
luban no.7 / luban no7 -> luban-no-7
honor of kings butterfly -> butterfly
lady sun -> lady-sun
annette build -> annette
garo hok -> garo
marco polo hok -> marco-polo
```

Non-hero or low-intent rows should not be forced into the hero list:

```txt
mage tier list -> page/content opportunity, not a hero
hok meta hero -> brand/navigation query
choose one -> unclear intent
smite 2 hou yi build -> wrong-game intent, ignore for HOK targeting
```

## Required Checks

For every target hero, confirm these URLs exist and are worth submitting in GSC:

```txt
/hero/{slug}/
/learn/{slug}-guide/
/hero/{slug}/counters/
/tools/build-compare/{slug}/
/tools/damage-calculator/{slug}/
```

The hero also needs:

- `data/heroes.json` entry
- `data/keywords.json` entry
- curated guide entry in `src/lib/learn-top-hero-guides.ts`
- internal links from hero page to guide, counters, and tools
- FAQ based on real search intent, not filler text

## Local QA

Run:

```bash
npm run qa:gsc-targets
npm run build
```

If the QA script fails, fix the target hero before requesting indexing.

## GSC Submit Order

Submit in this order:

1. Hero page
2. Guide page
3. Counter page
4. Build compare page
5. Damage calculator page

For Kaizer:

```txt
https://hokmeta.com/hero/kaizer/
https://hokmeta.com/learn/kaizer-guide/
https://hokmeta.com/hero/kaizer/counters/
https://hokmeta.com/tools/build-compare/kaizer/
https://hokmeta.com/tools/damage-calculator/kaizer/
```

## Content Rule

Do not generate loose "trend reasons" without a source.

Allowed:

- current win rate, pick rate, ban rate
- 7-day and 30-day changes
- build, counter, and lane advice based on existing hero data
- official patch note references when available

Not allowed:

- invented patch explanations
- generic "this hero is strong because of the meta" filler
- long text blocks that do not help players make a ranked decision
