import Image from 'next/image';
import type { Hero } from '@/types/hero';

export function HeroAvatar({
  hero,
  size = 48,
}: {
  hero: Pick<Hero, 'name' | 'avatar' | 'slug'>;
  size?: number;
}) {
  const alt = `${hero.name} HOK Build & Guide`;
  return (
    <Image
      src={hero.avatar}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full bg-hok-border object-cover"
      unoptimized
    />
  );
}
