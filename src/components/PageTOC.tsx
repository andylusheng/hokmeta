const SECTIONS = [
  { id: 'overview', label: 'Summary' },
  { id: 'build', label: 'Build' },
  { id: 'arcana', label: 'Arcana' },
  { id: 'skill-order', label: 'Skill Order' },
  { id: 'combos', label: 'Combos' },
  { id: 'skills', label: 'Abilities' },
  { id: 'counters', label: 'Counters' },
  { id: 'guide', label: 'Playstyle' },
  { id: 'faq', label: 'FAQ' },
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
