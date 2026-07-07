export const FEATURED_HERO_SLUGS = [
  'hou-yi',
  'aoyin',
  'augran',
  'daji',
  'liang',
  'angela',
  'li-xin',
  'milady',
  'wang-zhaojun',
  'devara',
  'marco-polo',
  'luban-no-7',
  'garo',
  'li-bai',
  'wukong',
  'dolia',
  'lady-sun',
  'kaizer',
  'dun',
  'mai-shiranui',
] as const;

export function isFeaturedHero(slug: string): boolean {
  return (FEATURED_HERO_SLUGS as readonly string[]).includes(slug);
}
