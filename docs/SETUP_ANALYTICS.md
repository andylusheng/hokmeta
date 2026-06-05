# Analytics & Search Console Setup (hokmeta.com)

Fill `config/site.json`, rebuild, and redeploy `out/` to Hostinger.

## 1. Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property: **URL prefix** → `https://hokmeta.com`
3. Choose **HTML tag** verification
4. Copy the `content="..."` value into `config/site.json`:

```json
"googleSiteVerification": "YOUR_GOOGLE_VERIFICATION_CODE"
```

5. Run `npm run build` and deploy `out/`
6. Click **Verify** in GSC
7. **Sitemaps** → submit: `https://hokmeta.com/sitemap.xml`
8. Priority URLs for manual indexing:

```bash
npm run gsc-priority-urls
```

Paste high-priority hero URLs into **URL Inspection → Request indexing** (batch over a few days).

## 2. Bing Webmaster Tools

1. Open [Bing Webmaster](https://www.bing.com/webmasters)
2. Add site `https://hokmeta.com`
3. Choose **Meta tag** verification (`msvalidate.01`)
4. Copy into `config/site.json`:

```json
"bingSiteVerification": "YOUR_BING_VERIFICATION_CODE"
```

5. Rebuild, deploy, verify
6. Submit sitemap: `https://hokmeta.com/sitemap.xml`

## 3. Google Analytics 4

1. Create a GA4 property for `hokmeta.com`
2. Copy **Measurement ID** (format `G-XXXXXXXXXX`) into:

```json
"ga4MeasurementId": "G-XXXXXXXXXX"
```

3. Rebuild and deploy — `GoogleAnalytics` loads automatically from `src/components/GoogleAnalytics.tsx`

## 4. KPI pages to watch

| Page | Why |
|------|-----|
| `/tier-list/` | Highest search intent |
| `/hero-trends/` | Returning users |
| `/best-heroes/` | Role-specific traffic |
| `/hero/{slug}/` | Long-tail builds |
| `/learn/*` | Guide traffic |

## 5. After each data sync

```bash
npm run repair-builds
npm run build
```

Upload `out/` to Hostinger so GSC sees fresh `lastModified` dates on hero URLs.
