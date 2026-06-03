import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import TierListClient from "@/components/TierListClient";
import { getHeroes } from "@/lib/data";
import { BreadcrumbListSchema, ItemListSchema, ArticleSchema } from "@/lib/schema";
import { getLastUpdatedDate } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: `Tier List | ${siteConfig.currentSeason}`,
  description: `HOK Tier List for ${siteConfig.currentSeason}`,
};

export default function TierListPage() {
  const heroes = getHeroes();
  const itemListItems = heroes.map(h => ({ name: h.name, url: `https://hokmeta.com/hero/${h.slug}` }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbListSchema breadcrumbs={[{ name: "Tier List", url: "/tier-list" }]} />
      <ItemListSchema items={itemListItems} name="HOK Tier List" />
      <ArticleSchema
        headline={`HOK Tier List ${siteConfig.currentSeason}`}
        description={`Complete tier list for ${siteConfig.currentSeason}`}
        dateModified={getLastUpdatedDate()}
      />

      <Breadcrumbs items={[{ name: "Tier List", url: "/tier-list" }]} />

      <h1 className="text-3xl font-bold mb-8">Tier List | {siteConfig.currentSeason}</h1>

      <TierListClient />

      <InternalLinks pageType="tier-list" />
    </div>
  );
}