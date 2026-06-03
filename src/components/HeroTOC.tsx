import type { Hero } from "@/lib/data";

interface HeroTOCProps {
  hero: Hero;
}

export const HeroTOC = ({ hero }: HeroTOCProps) => {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "best-build", label: "Best Build" },
    { id: "best-arcana", label: "Best Arcana" },
    { id: "counters", label: "Counters" },
    { id: "tips", label: "Tips" },
    { id: "patch-history", label: "Patch History" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
      <ol className="space-y-2 text-textSecondary">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="hover:text-primary transition">
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};