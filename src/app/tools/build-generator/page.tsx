import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import BuildGeneratorClient from "@/components/BuildGeneratorClient";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: `Build Generator | ${siteConfig.currentSeason}`,
  description: `Generate HOK builds`,
};

export default function BuildGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { name: "Tools", url: "/tools" },
        { name: "Build Generator", url: "/tools/build-generator" }
      ]} />

      <h1 className="text-3xl font-bold mb-8">Build Generator</h1>

      <BuildGeneratorClient />

      <InternalLinks pageType="tools" />
    </div>
  );
}