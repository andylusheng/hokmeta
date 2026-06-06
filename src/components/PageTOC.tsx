import { createT, type Locale } from '@/lib/i18n';

const SECTION_IDS = [
  'overview',
  'build',
  'arcana',
  'skill-order',
  'combos',
  'skills',
  'counters',
  'guide',
  'faq',
] as const;

const SECTION_KEYS: Record<(typeof SECTION_IDS)[number], string> = {
  overview: 'toc.summary',
  build: 'toc.build',
  arcana: 'toc.arcana',
  'skill-order': 'toc.skillOrder',
  combos: 'toc.combos',
  skills: 'toc.abilities',
  counters: 'toc.counters',
  guide: 'toc.playstyle',
  faq: 'toc.faq',
};

export function PageTOC({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  return (
    <nav
      aria-label="Table of contents"
      className="card sticky top-4 hidden lg:block"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {t('toc.onPage')}
      </p>
      <ul className="space-y-1 text-sm">
        {SECTION_IDS.map((id) => (
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
