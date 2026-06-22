import Link from 'next/link';

export function LearnCard({
  title,
  description,
  href,
  badge,
  category,
}: {
  title: string;
  description: string;
  href: string;
  badge?: string;
  category?: string;
}) {
  return (
    <Link href={href} className="card block transition hover:border-hok-gold/50">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {badge && (
          <span className="inline-block rounded bg-hok-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-hok-gold">
            {badge}
          </span>
        )}
        {category && (
          <span className="inline-block rounded border border-hok-border px-2 py-0.5 text-[10px] text-gray-500">
            {category}
          </span>
        )}
      </div>
      <h3 className="mb-2 font-semibold leading-snug text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </Link>
  );
}
