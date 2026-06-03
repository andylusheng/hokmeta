import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import CounterPickerClient from "@/components/CounterPickerClient";
import { InternalLinks } from "@/lib/internalLinks";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: `Counter Picker | ${siteConfig.currentSeason}`,
  description: `Pick counter heroes`,
};

export default function CounterPickerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[
        { name: "Tools", url: "/tools" },
        { name: "Counter Picker", url: "/tools/counter-picker" }
      ]} />

      <h1 className="text-3xl font-bold mb-8">Counter Picker</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <CounterPickerClient />
      </Suspense>

      <InternalLinks pageType="tools" />
    </div>
  );
}