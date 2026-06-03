import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroCard } from "@/components/HeroCard";
import { getHeroesByRole, roles } from "@/lib/data";
import { BreadcrumbListSchema, ItemListSchema, ArticleSchema } from "@/lib/schema";
import { getLastUpdatedDate } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

export default function BestHeroesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ name: "Best Heroes", url: "/best-heroes" }]} />

      <h1 className="text-3xl font-bold mb-8">Best Heroes by Role</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => {
          const roleSlug = role.toLowerCase().replace(/ /g, "-");
          return (
            <Link key={roleSlug} href={`/best-heroes/${roleSlug}`}>
              <div className="bg-surface border border-border rounded-lg p-6 hover:bg-surfaceHover hover:border-primary transition cursor-pointer">
                <h3 className="text-xl font-semibold text-primary">{role}</h3>
                <p className="text-textSecondary mt-2">View best heroes</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}