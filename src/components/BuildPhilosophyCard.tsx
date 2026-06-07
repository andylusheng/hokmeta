import type { Hero } from '@/types/hero';
import { getBuildPhilosophy, type StatPriority } from '@/lib/build-rationale';
import { createT, type Locale } from '@/lib/i18n';

const STAT_CLASS: Record<StatPriority, string> = {
  aspd: 'bg-rose-500/20 text-rose-300',
  patk: 'bg-orange-500/20 text-orange-300',
  crit: 'bg-yellow-500/20 text-yellow-300',
  lifesteal: 'bg-red-500/20 text-red-300',
  onhit: 'bg-purple-500/20 text-purple-300',
  cdr: 'bg-blue-500/20 text-blue-300',
  matk: 'bg-violet-500/20 text-violet-300',
  pen: 'bg-cyan-500/20 text-cyan-300',
  tank: 'bg-emerald-500/20 text-emerald-300',
  ms: 'bg-sky-500/20 text-sky-300',
};

export function BuildPhilosophyCard({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const t = createT(locale);
  const philosophy = getBuildPhilosophy(hero, locale);

  return (
    <section className="mb-6 rounded-xl border border-hok-gold/35 bg-gradient-to-br from-hok-card/90 to-hok-dark/60 p-4 sm:p-5">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-hok-gold">
        {t('rationale.title')}
      </h3>
      <p className="text-sm leading-relaxed text-gray-200">{philosophy.summary}</p>

      {philosophy.passiveQuote && (
        <blockquote className="mt-3 border-l-2 border-hok-gold/50 pl-3 text-xs italic leading-relaxed text-gray-400">
          <span className="not-italic font-semibold text-gray-500">
            {t('rationale.passiveRef')}{' '}
          </span>
          {philosophy.passiveQuote}
        </blockquote>
      )}

      {philosophy.statPriority.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {philosophy.statPriority.map((stat) => (
            <span
              key={stat}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STAT_CLASS[stat]}`}
            >
              {t(`rationale.stat.${stat}`)}
            </span>
          ))}
        </div>
      )}

      {philosophy.arcanaSummary && (
        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          <span className="font-semibold text-hok-gold">{t('rationale.arcanaHint')}</span>{' '}
          {philosophy.arcanaSummary}
        </p>
      )}
    </section>
  );
}
