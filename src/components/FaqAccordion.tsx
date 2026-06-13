'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { HeroFaq } from '@/types/hero';

interface RelatedLink {
  title: string;
  url: string;
}

export function FaqAccordion({
  faqs,
  relatedLinks,
  maxVisible,
}: {
  faqs: HeroFaq[];
  relatedLinks?: Record<string, RelatedLink>;
  /** If set, only show this many FAQs initially with a "Show all" toggle */
  maxVisible?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = maxVisible && !showAll ? faqs.slice(0, maxVisible) : faqs;
  const hiddenCount = maxVisible ? faqs.length - maxVisible : 0;

  return (
    <div className="space-y-3">
      {visible.map((faq) => (
        <details
          key={faq.id}
          id={faq.id}
          className="group rounded-lg border border-hok-border bg-hok-card"
        >
          <summary className="cursor-pointer list-none px-4 py-3 font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
            {faq.question}
          </summary>
          <div className="border-t border-hok-border px-4 py-3 text-sm leading-relaxed text-gray-300">
            <p>{faq.answer}</p>
            {relatedLinks?.[faq.id] && (
              <Link
                href={relatedLinks[faq.id].url}
                className="mt-2 inline-flex items-center gap-1 text-hok-gold hover:underline text-xs font-medium"
              >
                {relatedLinks[faq.id].title} →
              </Link>
            )}
          </div>
        </details>
      ))}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full rounded-lg border border-dashed border-hok-border bg-hok-card/40 px-4 py-2.5 text-sm text-hok-gold hover:border-hok-gold/40 hover:bg-hok-card/60 transition"
        >
          Show all {hiddenCount} more FAQs ↓
        </button>
      )}
    </div>
  );
}
