import type { HeroFaq } from '@/types/hero';

export function FaqAccordion({ faqs }: { faqs: HeroFaq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.id}
          id={faq.id}
          className="group rounded-lg border border-hok-border bg-hok-card"
        >
          <summary className="cursor-pointer list-none px-4 py-3 font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
            {faq.question}
          </summary>
          <p className="border-t border-hok-border px-4 py-3 text-sm leading-relaxed text-gray-300">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
