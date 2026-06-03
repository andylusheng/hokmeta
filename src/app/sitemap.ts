import { getHeroes, getPatches, roles } from "@/lib/data";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hokmeta.com";
  const heroes = getHeroes();
  const patches = getPatches();

  const heroUrls: MetadataRoute.Sitemap = heroes.map((hero) => ({
    url: `${baseUrl}/hero/${hero.slug}`,
    lastModified: new Date(),
  }));

  const roleUrls: MetadataRoute.Sitemap = roles.map((role) => ({
    url: `${baseUrl}/best-heroes/${role.toLowerCase().replace(/ /g, "-")}`,
    lastModified: new Date(),
  }));

  const patchUrls: MetadataRoute.Sitemap = patches.map((patch) => ({
    url: `${baseUrl}/patch-notes/season-${patch.season}`,
    lastModified: new Date(),
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/tier-list`, lastModified: new Date() },
    { url: `${baseUrl}/heroes`, lastModified: new Date() },
    { url: `${baseUrl}/best-heroes`, lastModified: new Date() },
    { url: `${baseUrl}/patch-notes`, lastModified: new Date() },
    { url: `${baseUrl}/tools`, lastModified: new Date() },
    { url: `${baseUrl}/tools/build-generator`, lastModified: new Date() },
    { url: `${baseUrl}/tools/counter-picker`, lastModified: new Date() },
  ];

  return [...staticUrls, ...heroUrls, ...roleUrls, ...patchUrls];
}