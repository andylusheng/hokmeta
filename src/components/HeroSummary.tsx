import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';
import { getHeroPlaybook, formatHeroSubtitle } from '@/lib/hero-playbook';
import { HeroAvatar } from '@/components/HeroAvatar';

export function HeroSummary({ hero }: { hero: Hero }) {
  const playbook = getHeroPlaybook(hero);

  return (
    <section
      id="overview"
      className="scroll-mt-20 mb-8 rounded-xl border border-hok-gold/30 bg-gradient-to-br from-hok-card to-hok-dark/80 p-5 sm:p-6"
    >
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <HeroAvatar hero={hero} size={88} priority />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {hero.name}
          </h1>
          <p className="mt-1 text-sm text-hok-gold">{formatHeroSubtitle(hero)}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {playbook.hook}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
              Tier {hero.tier}
            </span>
            <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
              {formatRate(hero.winRate)} WR
            </span>
            <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
              {hero.lane ?? hero.role}
            </span>
            <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
              {hero.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-hok-border/60 pt-4 sm:grid-cols-3">
        <div className="rounded-lg bg-hok-dark/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hok-gold">
            Build core
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {playbook.tldr.build}
          </p>
        </div>
        <div className="rounded-lg bg-hok-dark/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hok-gold">
            Combo
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {playbook.tldr.combo}
          </p>
        </div>
        <div className="rounded-lg bg-hok-dark/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hok-gold">
            Draft
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {playbook.tldr.counters}
          </p>
        </div>
      </div>
    </section>
  );
}
