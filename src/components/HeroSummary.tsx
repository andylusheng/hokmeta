import type { Hero } from '@/types/hero';
import { formatRate } from '@/lib/data';
import { getHeroPlaybook, formatHeroSubtitle } from '@/lib/hero-playbook';
import { HeroAvatar } from '@/components/HeroAvatar';
import { createT, type Locale } from '@/lib/i18n';
import { translateDifficulty, translateLane, translateRole } from '@/lib/locale-labels';
import { formatHeroBilingualTitle } from '@/lib/locale-names';

export function HeroSummary({
  hero,
  locale = 'en',
  compact = false,
}: {
  hero: Hero;
  locale?: Locale;
  compact?: boolean;
}) {
  const t = createT(locale);
  const playbook = getHeroPlaybook(hero, locale);

  return (
    <section
      id="overview"
      className="scroll-mt-20 mb-8 rounded-xl border border-hok-gold/30 bg-gradient-to-br from-hok-card to-hok-dark/80 p-5 sm:p-6"
    >
      {!compact && (
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          <HeroAvatar hero={hero} size={88} priority />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {formatHeroBilingualTitle(hero, locale)}
            </h1>
            <p className="mt-1 text-sm text-hok-gold">{formatHeroSubtitle(hero, locale)}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              {playbook.hook}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
                {t('hero.tier')} {hero.tier}
              </span>
              <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
                {formatRate(hero.winRate)} {t('hero.wr')}
              </span>
              <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
                {translateLane(hero.lane, locale) || translateRole(hero.role, locale)}
              </span>
              <span className="rounded-full border border-hok-border bg-hok-dark/60 px-2.5 py-0.5 text-xs text-gray-300">
                {translateDifficulty(hero.difficulty, locale)}
              </span>
            </div>
          </div>
        </div>
      )}
      {compact && (
        <p className="mb-4 text-sm leading-relaxed text-gray-300">{playbook.hook}</p>
      )}

      <div className={`grid gap-3 sm:grid-cols-3 ${compact ? '' : 'border-t border-hok-border/60 pt-4'}`}>
        <div className="rounded-lg bg-hok-dark/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hok-gold">
            {t('hero.summaryBuild')}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {playbook.tldr.build}
          </p>
        </div>
        <div className="rounded-lg bg-hok-dark/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hok-gold">
            {t('hero.summaryCombo')}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {playbook.tldr.combo}
          </p>
        </div>
        <div className="rounded-lg bg-hok-dark/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-hok-gold">
            {t('hero.summaryDraft')}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            {playbook.tldr.counters}
          </p>
        </div>
      </div>
    </section>
  );
}
