import type { Hero } from '@/types/hero';
import { getHeroPlaybook } from '@/lib/hero-playbook';
import type { Locale } from '@/lib/i18n';

export function SkillOrderBlock({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const { skillOrder } = getHeroPlaybook(hero, locale);

  return (
    <div className="rounded-lg border border-hok-border bg-hok-card/40 p-4">
      <p className="mb-2 font-mono text-base font-semibold text-white">
        {skillOrder.priority}
      </p>
      <p className="text-sm leading-relaxed text-gray-300">{skillOrder.reason}</p>
    </div>
  );
}
