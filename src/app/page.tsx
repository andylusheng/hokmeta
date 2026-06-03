import Link from "next/link";
import siteConfig from "@/config/site.json";
import { getTopHeroesByPickRate, getTopTierHeroes } from "@/lib/data";
import { HeroCard } from "@/components/HeroCard";
import { getPatchBySeason } from "@/lib/data";
import { WebSiteSchema, BreadcrumbListSchema } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";

export default function Home() {
  const topHeroes = getTopHeroesByPickRate(10);
  const patch = getPatchBySeason(12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <WebSiteSchema />
      <BreadcrumbListSchema breadcrumbs={[{ name: "Home", url: "/" }]} />

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          #1 HOK Builds & Tier List | <span className="text-primary">{siteConfig.currentSeason}</span>
        </h1>
        <p className="text-xl text-textSecondary mb-8">
          Updated {siteConfig.lastUpdated}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tier-list" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition">
            Tier List
          </Link>
          <Link href="/tools/build-generator" className="bg-surface hover:bg-surfaceHover border border-border px-8 py-3 rounded-lg font-semibold transition">
            Build Generator
          </Link>
          <Link href="/tools/counter-picker" className="bg-surface hover:bg-surfaceHover border border-border px-8 py-3 rounded-lg font-semibold transition">
            Counter Picker
          </Link>
        </div>
      </section>

      {/* Popular Heroes */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Popular Heroes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topHeroes.map((hero) => (
            <HeroCard key={hero.slug} hero={hero} showTier />
          ))}
        </div>
      </section>

      {/* Latest Patch Notes */}
      {patch && (
        <section className="mb-16">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Latest Patch Notes</h2>
              <Link href="/patch-notes/season-12" className="text-primary hover:underline">
                View All
              </Link>
            </div>
            <ul className="space-y-2">
              {patch.metaChanges.slice(0, 3).map((change, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <InternalLinks pageType="home" />
    </div>
  );
}