import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: "Tools | HOK Meta",
  description: "HOK tools",
};

export default function ToolsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ name: "Tools", url: "/tools" }]} />

      <h1 className="text-3xl font-bold mb-8">Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/tools/build-generator">
          <div className="bg-surface border border-border rounded-lg p-8 hover:bg-surfaceHover hover:border-primary transition cursor-pointer">
            <h2 className="text-2xl font-bold text-primary mb-2">Build Generator</h2>
            <p className="text-textSecondary">Generate builds for any hero</p>
          </div>
        </Link>
        <Link href="/tools/counter-picker">
          <div className="bg-surface border border-border rounded-lg p-8 hover:bg-surfaceHover hover:border-primary transition cursor-pointer">
            <h2 className="text-2xl font-bold text-primary mb-2">Counter Picker</h2>
            <p className="text-textSecondary">Pick the best counter heroes</p>
          </div>
        </Link>
      </div>
    </div>
  );
}