import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import siteConfig from "@/config/site.json";

export const metadata: Metadata = {
  title: {
    default: `#1 HOK Builds & Tier List | ${siteConfig.currentSeason} - HOK Meta`,
    template: `%s | ${siteConfig.currentSeason} - HOK Meta`,
  },
  description: `Updated ${siteConfig.lastUpdated}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-surface border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition">
                HOK Meta
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/tier-list" className="text-textSecondary hover:text-text transition">Tier List</Link>
                <Link href="/heroes" className="text-textSecondary hover:text-text transition">Heroes</Link>
                <Link href="/patch-notes/season-12" className="text-textSecondary hover:text-text transition">Patch Notes</Link>
                <Link href="/tools/build-generator" className="text-textSecondary hover:text-text transition">Build Generator</Link>
                <Link href="/tools/counter-picker" className="text-textSecondary hover:text-text transition">Counter Picker</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-textSecondary text-sm">
              <p>© 2026 HOK Meta. All rights reserved.</p>
              <p className="mt-2">Updated for {siteConfig.currentSeason}, {siteConfig.lastUpdated}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}