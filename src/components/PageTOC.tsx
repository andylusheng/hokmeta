import { createT, type Locale } from '@/lib/i18n';

const SECTION_IDS = [
  'overview',
  'decision',
  'authority',
  'trend-history',
  'build',
  'build-variants',
  'arcana',
  'skills',
  'combos',
  'counters',
  'comparisons',
  'guide',
  'patch-history',
  'faq',
] as const;

const SECTION_KEYS: Record<(typeof SECTION_IDS)[number], string> = {
  overview: 'toc.summary',
  decision: 'hero.decision.label',
  authority: 'toc.authority',
  'trend-history': 'toc.trendHistory',
  build: 'toc.build',
  'build-variants': 'toc.buildVariants',
  arcana: 'toc.arcana',
  skills: 'toc.abilities',
  combos: 'toc.combos',
  counters: 'toc.counters',
  comparisons: 'toc.comparisons',
  guide: 'toc.playstyle',
  'patch-history': 'toc.patchHistory',
  faq: 'toc.faq',
};

export function PageTOC({
  locale = 'en',
  showFeaturedSections = false,
  showLongformSections = true,
}: {
  locale?: Locale;
  showFeaturedSections?: boolean;
  showLongformSections?: boolean;
}) {
  const t = createT(locale);
  const sectionIds = SECTION_IDS.filter((id) => {
    if (id === 'authority' && locale !== 'en') return false;
    if (!showLongformSections && ['skills', 'combos', 'comparisons', 'guide', 'patch-history'].includes(id)) {
      return false;
    }
    if ((id === 'build-variants' || id === 'patch-history') && !showFeaturedSections) {
      return false;
    }
    return true;
  });

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
