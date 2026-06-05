const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'build', label: 'Build' },
  { id: 'arcana', label: 'Arcana' },
  { id: 'guide', label: 'Guide' },
  { id: 'counters', label: 'Counters' },
  { id: 'high-rank', label: 'High Rank' },
  { id: 'comparisons', label: 'Comparisons' },
  { id: 'faq', label: 'FAQ' },
  { id: 'meta-analysis', label: 'Meta Analysis' },
] as const;

export function PageTOC() {
  return (
    <nav
      aria-label="Table of contents"
      className="card sticky top-4 hidden lg:block"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        On this page
      </p>
      <ul className="space-y-1 text-sm">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-gray-400 transition hover:text-hok-gold"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
