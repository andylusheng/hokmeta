'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Hero } from '@/types/hero';

export function HeroAvatar({
  hero,
  size = 48,
}: {
  hero: Pick<Hero, 'name' | 'avatar' | 'slug' | 'avatarFallback'>;
  size?: number;
}) {
  const alt = `${hero.name} HOK Build & Guide`;
  const [fallbackSlug, setFallbackSlug] = useState<string | null>(null);
  const src =
    fallbackSlug === hero.slug && hero.avatarFallback
      ? hero.avatarFallback
      : hero.avatar;

  return (
    <Image
      key={hero.slug}
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full bg-hok-border object-cover"
      unoptimized
      onError={() => {
        if (hero.avatarFallback) {
          setFallbackSlug(hero.slug);
        }
      }}
    />
  );
}
