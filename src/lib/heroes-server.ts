/**
 * heroes-server.ts
 * Server-only module that provides FULL hero data (including skills, builds,
 * guide, faqs, patchHistory, etc.) read from the filesystem at build time.
 *
 * This file must NEVER be imported from 'use client' components.
 * Use '@/lib/data' (heroes-index) for client-safe lightweight data.
 */
import fs from 'fs';
import path from 'path';
import type { Hero } from '@/types/hero';

let _fullHeroes: Hero[] | null = null;

/** Read the full heroes.json at build time (server-only). */
export function getFullHeroes(): Hero[] {
  if (!_fullHeroes) {
    const filePath = path.join(process.cwd(), 'data', 'heroes.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    _fullHeroes = JSON.parse(raw) as Hero[];
  }
  return _fullHeroes;
}

/** Get a single hero with full data (skills, builds, guide, faqs, etc.). */
export function getFullHeroBySlug(slug: string): Hero | undefined {
  return getFullHeroes().find((h) => h.slug === slug);
}

/** Get a single hero by name (case-insensitive) with full data. */
export function getFullHeroByName(name: string): Hero | undefined {
  const key = name.trim().toLowerCase();
  if (!key || key === 'data unavailable') return undefined;
  return (
    getFullHeroes().find((h) => h.name.toLowerCase() === key) ||
    getFullHeroes().find((h) => h.slug.toLowerCase() === key)
  );
}
