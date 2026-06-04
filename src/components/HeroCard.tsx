import Link from "next/link";
import type { Hero } from "@/lib/data";
import HeroAvatar from "./HeroAvatar";

interface HeroCardProps {
  hero: Hero;
  showTier?: boolean;
}

export const HeroCard = ({ hero, showTier = false }: HeroCardProps) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "S+":
        return "bg-red-600";
      case "S":
        return "bg-orange-500";
      case "A":
        return "bg-yellow-500";
      case "B":
        return "bg-green-500";
      case "C":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Link href={`/hero/${hero.slug}`}>
      <div className="bg-surface border border-border rounded-lg p-4 hover:bg-surfaceHover hover:border-primary transition cursor-pointer">
        <div className="flex items-center gap-4">
          {hero.avatar ? (
            <HeroAvatar avatar={hero.avatar} name={hero.name} size="lg" />
          ) : (
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
              {hero.name.charAt(0)}
            </div>
          )}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-xl">{hero.name}</h3>
              {showTier && (
                <span className={`text-xs px-2 py-0.5 rounded-full text-white font-semibold ${getTierColor(hero.tier)}`}>
                  {hero.tier}
                </span>
              )}
            </div>
            <p className="text-sm text-textSecondary">{hero.role} • {hero.winRate}% WR</p>
          </div>
        </div>
      </div>
    </Link>
  );
};