import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroCard } from "@/components/HeroCard";
import { getHeroesByRole, getHeroes, roles } from "@/lib/data";
import { BreadcrumbListSchema, ItemListSchema, ArticleSchema } from "@/lib/schema";
import { getLastUpdatedDate } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

interface Props {
  params: { role: string };
}

function slugToRole(slug: string): string {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const roleName = slugToRole(params.role);
  return {
    title: `Best ${roleName} Heroes | ${siteConfig.currentSeason}`,
    description: `Best ${roleName} heroes for ${siteConfig.currentSeason}`,
  };
}

export async function generateStaticParams() {
  return roles.map(role => ({ role: role.toLowerCase().replace(/ /g, "-") }));
}

export default function BestHeroesRolePage({ params }: Props) {
  const roleName = slugToRole(params.role);
  const heroes = getHeroesByRole(roleName);

  const sortedHeroes = [...heroes].sort((a, b) => {
    const tierOrder = { "S+": 0, "S": 1, "A": 2, "B": 3, "C": 4, "D": 5 };
    return tierOrder[a.tier as keyof typeof tierOrder] - tierOrder[b.tier as keyof typeof tierOrder];
  });

  const breadcrumbs = [
    { name: "Best Heroes", url: "/best-heroes" },
    { name: roleName, url: `/best-heroes/${params.role}` }
  ];
  const itemListItems = sortedHeroes.map(h => ({ name: h.name, url: `https://hokmeta.com/hero/${h.slug}` }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbListSchema breadcrumbs={breadcrumbs} />
      <ItemListSchema items={itemListItems} name={`Best ${roleName} Heroes`} />
      <ArticleSchema
        headline={`Best ${roleName} Heroes ${siteConfig.currentSeason}`}
        description={`Top ${roleName} heroes for ${siteConfig.currentSeason}`}
        dateModified={getLastUpdatedDate()}
      />

      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl font-bold mb-8">Best {roleName} Heroes | {siteConfig.currentSeason}</h1>

      {sortedHeroes.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Top 3 Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedHeroes.slice(0, 3).map(hero => (
              <div key={hero.slug} className="bg-surfaceHover p-4 rounded">
                <h3 className="font-bold text-primary">{hero.name}</h3>
                <p className="text-sm text-textSecondary mt-1">{hero.tier} Tier • {hero.winRate}% WR</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedHeroes.map(hero => (
          <HeroCard key={hero.slug} hero={hero} showTier />
        ))}
      </div>

      <InternalLinks pageType="best-heroes" />
    </div>
  );
}