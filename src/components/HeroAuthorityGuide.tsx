import type { Hero } from '@/types/hero';
import { getHeroAuthorityNotes } from '@/lib/hero-authority-notes';
import { type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';

export function HeroAuthorityGuide({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  if (locale !== 'en') return null;

  const name = getHeroDisplayName(hero, locale);
  const notes = getHeroAuthorityNotes(hero);

  return (
    <section
      id="authority"
      className="scroll-mt-20 mb-6 rounded-xl border border-hok-border bg-hok-card/75 p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-hok-gold">
        Current patch decision guide
      </p>
      <h2 className="mt-1 text-xl font-bold text-white">
        How to decide if {name} is the right pick
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-500/25 bg-emerald-950/15 p-4">
          <h3 className="text-sm font-semibold text-emerald-300">Pick {name} if</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">{notes.pick}</p>
        </div>
        <div className="rounded-lg border border-red-500/25 bg-red-950/15 p-4">
          <h3 className="text-sm font-semibold text-red-300">Avoid {name} if</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">{notes.avoid}</p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
          <h3 className="text-sm font-semibold text-white">Power spikes</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
            {notes.powerSpikes.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hok-gold" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
            <h3 className="text-sm font-semibold text-white">Build decision</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">{notes.buildDecision}</p>
          </div>
          <div className="rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
            <h3 className="text-sm font-semibold text-white">Matchup logic</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">{notes.matchupLogic}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-hok-border/70 bg-hok-dark/35 p-4">
        <h3 className="text-sm font-semibold text-white">Common mistakes</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {notes.commonMistakes.map((mistake) => (
            <p
              key={mistake}
              className="rounded border border-hok-border/70 bg-hok-card/45 p-3 text-sm leading-6 text-gray-300"
            >
              {mistake}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
