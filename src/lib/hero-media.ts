import type { Hero } from '@/types/hero';

const localHeroCoverBySlug: Record<string, string> = {
  'hou-yi': '/images/home/hou-yi-splash.webp',
};

/** Camp hero splash / cover (wide art). Falls back to avatar. */
export function getHeroCoverUrl(hero: Hero): string {
  const localCover = localHeroCoverBySlug[hero.slug];
  if (localCover) return localCover;
  if (hero.heroCover) return hero.heroCover;
  return hero.avatar || hero.avatarFallback || '';
}

export function getHeroSplashMeta(hero: Hero): string {
  const wr = hero.winRate != null ? `${hero.winRate.toFixed(1)}% WR` : '';
  const tier = hero.tier;
  const lane = hero.lane || hero.role;
  const build = hero.build?.find((b) => b.name && b.name !== 'Data unavailable')?.name;
  const parts = [
    `${hero.name} is a ${tier}-tier ${lane} pick`,
    wr ? `(${wr})` : '',
    build ? `— core item ${build}` : '',
  ].filter(Boolean);
  return parts.join(' ').trim();
}
