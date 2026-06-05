import Link from 'next/link';

export function RelatedSearchBox({ terms }: { terms: string[] }) {
  if (!terms.length) return null;
  return (
    <section id="related-searches" className="scroll-mt-20">
      <h2 className="section-title">Related Searches</h2>
      <ul className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <li key={term}>
            <Link
              href={`/search/?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-hok-border px-3 py-1 text-sm text-gray-300 hover:border-hok-gold hover:text-hok-gold"
            >
              {term}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
