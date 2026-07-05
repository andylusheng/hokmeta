import { createT, type Locale } from '@/lib/i18n';

const SECTION_IDS = [
  'overview',
  'decision',
  'authority',
  'build',
  'arcana',
  'skills',
  'combos',
  'counters',
  'comparisons',
  'guide',
  'faq',
] as const;

const SECTION_KEYS: Record<(typeof SECTION_IDS)[number], string> = {
  overview: 'toc.summary',
  decision: 'hero.decision.label',
  authority: 'toc.authority',
  build: 'toc.build',
  arcana: 'toc.arcana',
  skills: 'toc.abilities',
  combos: 'toc.combos',
  counters: 'toc.counters',
  comparisons: 'toc.comparisons',
  guide: 'toc.playstyle',
  faq: 'toc.faq',
};

export function PageTOC({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const sectionIds = SECTION_IDS.filter(
    (id) => id !== 'authority' || locale === 'en',
  );

  return (
    <nav
      aria-label="Table of contents"
      className="card sticky top-4 hidden lg:block"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {t('toc.onPage')}
      </p>
      <ul className="space-y-1 text-sm">
        {sectionIds.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-gray-400 transition hover:text-hok-gold"
            >
              {t(SECTION_KEYS[id])}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
