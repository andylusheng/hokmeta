import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPatchBySeason, getPatches, getHeroBySlug } from "@/lib/data";
import { BreadcrumbListSchema, NewsArticleSchema } from "@/lib/schema";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

interface Props {
  params: { season: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Season 12 Patch Notes | Buffs & Nerfs`,
    description: `HOK Season 12 patch notes`,
  };
}

export async function generateStaticParams() {
  const patches = getPatches();
  return patches.map(p => ({ season: `season-${p.season}` }));
}

export default function PatchNotesPage({ params }: Props) {
  const patch = getPatchBySeason(12);

  const breadcrumbs = [
    { name: "Patch Notes", url: "/patch-notes" },
    { name: "Season 12", url: "/patch-notes/season-12" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {patch && (
        <>
          <BreadcrumbListSchema breadcrumbs={breadcrumbs} />
          <NewsArticleSchema
            headline={`HOK Season 12 Patch Notes`}
            description={`Season 12 patch notes with buffs and nerfs`}
            date={patch.date}
          />
        </>
      )}

      <Breadcrumbs items={breadcrumbs} />

      {!patch ? (
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Patch Notes Not Found</h1>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">{patch.title}</h1>
          <p className="text-textSecondary mb-8">{patch.date}</p>

          {/* Meta Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Meta Changes</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <ul className="space-y-2">
                {patch.metaChanges.map((change, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Buffs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Buffs</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <ul className="space-y-2">
                {patch.buffs.map((buff, i) => {
                  const hero = getHeroBySlug(buff.hero.toLowerCase().replace(/ /g, "-"));
                  return (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-400 font-semibold">+</span>
                      {hero ? (
                        <Link href={`/hero/${hero.slug}`} className="text-primary hover:underline">
                          {buff.hero}
                        </Link>
                      ) : (
                        <span>{buff.hero}</span>
                      )}
                      <span className="text-textSecondary">- {buff.change}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Nerfs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Nerfs</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <ul className="space-y-2">
                {patch.nerfs.map((nerf, i) => {
                  const hero = getHeroBySlug(nerf.hero.toLowerCase().replace(/ /g, "-"));
                  return (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-red-400 font-semibold">-</span>
                      {hero ? (
                        <Link href={`/hero/${hero.slug}`} className="text-primary hover:underline">
                          {nerf.hero}
                        </Link>
                      ) : (
                        <span>{nerf.hero}</span>
                      )}
                      <span className="text-textSecondary">- {nerf.change}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </>
      )}

      <InternalLinks pageType="patch-notes" />
    </div>
  );
}