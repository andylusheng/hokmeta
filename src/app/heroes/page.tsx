import type { Metadata } from "next";
import { HeroCard } from "@/components/HeroCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getHeroes } from "@/lib/data";
import { BreadcrumbListSchema, ItemListSchema } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: `All Heroes | ${siteConfig.currentSeason}`,
  description: `All HOK heroes for ${siteConfig.currentSeason}`,
};

export default function HeroesPage() {
  const heroes = getHeroes();
  const sortedHeroes = [...heroes].sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumbs = [{ name: "Heroes", url: "/heroes" }];
  const itemListItems = sortedHeroes.map(h => ({ name: h.name, url: `https://hokmeta.com/hero/${h.slug}` }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbListSchema breadcrumbs={breadcrumbs} />
      <ItemListSchema items={itemListItems} name="All HOK Heroes" />

      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl font-bold mb-8">All Heroes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedHeroes.map(hero => (
          <HeroCard key={hero.slug} hero={hero} showTier />
        ))}
      </div>

      <InternalLinks pageType="heroes" />
    </div>
  );
}