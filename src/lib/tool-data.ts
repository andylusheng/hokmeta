import type { GameItem, Hero, HeroBuildItem, HeroBuildPreset, HeroSkill } from '@/types/hero';

export type ToolSkill = Pick<HeroSkill, 'slot' | 'icon'>;
export type ToolBuildItem = Pick<HeroBuildItem, 'itemId'>;
export type ToolBuildPreset = Pick<HeroBuildPreset, 'id' | 'label' | 'items'> & {
  items: ToolBuildItem[];
};

export type ToolHero = Pick<
  Hero,
  'slug' | 'name' | 'role' | 'tier' | 'winRate' | 'pickRate' | 'banRate' | 'avatar' | 'avatarFallback' | 'lane'
> & {
  nameZh?: string | null;
  counters: string[];
  counteredBy: string[];
  skills: ToolSkill[];
  skillsZh?: ToolSkill[];
  build: ToolBuildItem[];
  buildZh?: ToolBuildItem[];
  builds?: ToolBuildPreset[];
  buildsZh?: ToolBuildPreset[];
};

export type ToolItem = Pick<
  GameItem,
  'id' | 'slug' | 'name' | 'nameZh' | 'description' | 'descriptionZh' | 'icon' | 'type' | 'level' | 'passiveSkills' | 'passiveSkillsZh'
>;

export type ToolData = {
  heroes: ToolHero[];
  items: ToolItem[];
};

let request: Promise<ToolData> | undefined;

export function loadToolData(): Promise<ToolData> {
  if (!request) {
    request = fetch('/api/tools.json').then(async (response) => {
      if (!response.ok) throw new Error(`Tool data request failed: ${response.status}`);
      return response.json() as Promise<ToolData>;
    });
  }
  return request;
}
