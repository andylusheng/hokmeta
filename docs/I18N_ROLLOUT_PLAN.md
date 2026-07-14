# HOKMeta Multi-language Rollout Plan

Last updated: 2026-07-14

## Goal

HOKMeta should not show a locale path unless the page body is actually localized.

The next rollout should prioritize:

1. `id` for Indonesia
2. `fil` for the Philippines

These two are the highest-leverage small-language additions for the current HOKMeta direction because:

- both markets are mobile-MOBA heavy
- both have active Honor of Kings competitive and creator ecosystems
- both are more underserved in structured build/counter/tool content than English

## Market Priority

### Phase 1

- `en`
- `zh-TW`
- `id`
- `fil`

### Phase 2

- `ms`
- `pt-BR`

### Watchlist

- `hi`
- `th`
- `ar`

## Product Rule

Language quality rule:

- UI translated
- article body translated
- FAQ translated
- trend explanations translated
- hero/item/arcana names may remain English if that matches player search behavior

If a page fails any of the first four checks, the locale switcher should not expose that locale for that page.

## Current Problems

1. Some localized pages still have English body content.
2. Locale availability is route-level, not content-level.
3. Learn articles are added faster than localized copy.
4. The switcher has no per-page readiness contract.

## Required Architecture

### 1. Per-page locale readiness manifest

Add a manifest layer that answers:

- does `/learn/[slug]` exist in `id`?
- does `/hero/[slug]` have localized body sections in `fil`?
- does `/hero-trends` have localized explanation blocks in `id`?

Suggested shape:

```ts
type LocaleCode = 'en' | 'zh-TW' | 'id' | 'fil';

type LocaleReadiness = {
  route: string;
  locales: Partial<Record<LocaleCode, boolean>>;
};
```

This should drive:

- language switcher visibility
- sitemap generation by locale
- GSC submission lists

### 2. Content segmentation

Split localizable content into:

- UI labels
- article intro / summary
- article sections
- FAQ answers
- trend interpretation text

Do not bury long-form article paragraphs inside mixed logic files without a locale readiness check.

### 3. Translation workflow

For `id` and `fil`, translate in this order:

1. homepage and nav
2. tools index
3. hero page answer block
4. hero FAQ
5. trend pages
6. top learn articles

This keeps the highest-intent SEO pages moving first.

## Route Rollout Order

### Wave 1: High-intent pages

- `/`
- `/tools/`
- `/hero/[slug]/`
- `/hero/[slug]/counters/`
- `/tools/build-compare/[slug]/`
- `/tools/damage-calculator/[slug]/`

### Wave 2: Meta pages

- `/hero-trends/`
- `/meta-report/`
- `/learn/highest-win-rate-heroes-this-week/`
- `/learn/lowest-win-rate-heroes-this-week/`
- `/learn/best-heroes-by-lane-this-week/`

### Wave 3: Long-tail library

- top hero guides
- matchup pages
- patch explainers

## Translation Rules

### Keep in English

- hero names
- item names
- arcana names
- patch version labels

Reason: these are often searched in English even inside Southeast Asian markets.

### Must localize

- page title suffixes
- hero answer blocks
- trend interpretation paragraphs
- FAQ questions and answers
- CTA labels
- internal link anchor text

## Switcher Rules

### Current recommended behavior

If the target locale is not ready for the current route:

1. keep the switcher visible
2. disable the unavailable locale option for that route
3. show only supported locales for that page

Do not switch a user into a locale route that still renders English body copy.

## SEO Rules

For each locale:

- use locale-specific sitemap entries only when content is ready
- submit locale-ready URLs separately in GSC
- keep internal links inside the same locale where possible
- avoid indexing thin locale variants

## Immediate Build Tasks

### Priority A

1. Add per-route locale readiness manifest
2. Use manifest in the language switcher
3. Start `id` and `fil` on:
   - homepage
   - tools index
   - hero page answer block
   - trend pages

### Priority B

1. Translate the new trend articles:
   - highest win rate
   - lowest win rate
   - best by lane
2. Add localized meta descriptions and titles
3. Generate locale-specific GSC URL lists

## Acceptance Standard

A locale rollout is acceptable only if:

- the route renders fully localized body copy
- internal links remain in the same locale
- the page exports correctly in `next build`
- GSC-ready URLs can be listed cleanly

If any of these fail, do not expose the locale in the switcher yet.

## Completion Levels

Do not use the word "complete" without naming the level.

### L0: Technical Route Only

Meaning:

- route files exist
- build can generate localized paths
- the language switcher may technically link to the route

This is not a public release.

Allowed status wording:

- `route added`
- `technical entry connected`
- `fallback preview`

Forbidden status wording:

- `locale is live`
- `language is complete`
- `ready for GSC`

### L1: UI Shell Localized

Meaning:

- nav, buttons, breadcrumbs, footer, search placeholder are localized
- page data tables and labels are localized
- long-form article body may still be unavailable

This can be used for internal QA only unless unsupported routes are hidden from the switcher.

### L2: Core Product Locale

Meaning:

- homepage is localized
- hero pages are localized
- counter pages are localized
- tools pages are localized
- hero trends and meta report are localized
- language switcher only shows routes that pass readiness checks
- no user-facing route contains silent English fallback

This is the first level that can be called "ID/FIL live" for product pages.

### L3: SEO Content Locale

Meaning:

- top GSC hero guide pages are translated
- top 20 hero guides are translated
- highest win rate / lowest win rate / lane leader learn articles are translated
- localized sitemap and GSC lists are generated
- internal links stay inside the same locale

This is the first level that can be promoted for SEO.

### L4: Full Library Locale

Meaning:

- all learn articles are translated
- all hero-specific guide/counter content is localized
- all FAQ blocks are localized
- all generated trend text follows locale rules
- no silent fallback remains in public routes

This is the only level that can be called "fully complete".

## Timeline Rule

For ID and FIL, the realistic rollout order is:

1. L1 shell and route cleanup: same day if scope is limited.
2. L2 core product locale: 1-2 focused development days.
3. L3 SEO content locale for current priority heroes and trend articles: 3-5 focused development days.
4. L4 full library locale: 1-2 weeks, depending on article count and manual review.

If only L1 or L2 is done, do not claim full localization.

## Required Report Format

Every i18n task must report:

- current completion level
- routes completed
- routes hidden or fallback-only
- locales exposed in the switcher
- pages verified in `out/`
- pages still requiring manual translation
