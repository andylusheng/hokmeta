'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Hero } from '@/types/hero';

export function HeroAvatar({
  hero,
  size = 48,
  priority = false,
  className = 'rounded-full bg-hok-border object-cover',
}: {
  hero: Pick<Hero, 'name' | 'avatar' | 'slug' | 'avatarFallback'>;
  size?: number;
  /** Set on above-the-fold LCP images (hero page header). */
  priority?: boolean;
  className?: string;
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
      sizes={`${size}px`}
      className={className}
      unoptimized
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => {
        if (hero.avatarFallback) {
          setFallbackSlug(hero.slug);
        }
      }}
    />
  );
}
