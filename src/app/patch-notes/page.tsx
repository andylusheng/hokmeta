import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPatches } from "@/lib/data";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: "Patch Notes | HOK Meta",
  description: "All HOK patch notes",
};

export default function PatchNotesIndexPage() {
  const patches = getPatches();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ name: "Patch Notes", url: "/patch-notes" }]} />

      <h1 className="text-3xl font-bold mb-8">Patch Notes</h1>

      <div className="space-y-4">
        {patches.map((patch) => (
          <Link key={patch.season} href={`/patch-notes/season-${patch.season}`}>
            <div className="bg-surface border border-border rounded-lg p-6 hover:bg-surfaceHover hover:border-primary transition cursor-pointer">
              <h2 className="text-xl font-semibold text-primary">{patch.title}</h2>
              <p className="text-textSecondary mt-1">{patch.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}