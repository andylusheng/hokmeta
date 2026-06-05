import Link from 'next/link';

export function LearnCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link href={href} className="card block transition hover:border-hok-gold/50">
      {badge && (
        <span className="mb-2 inline-block rounded bg-hok-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-hok-gold">
          {badge}
        </span>
      )}
      <h3 className="mb-2 font-semibold leading-snug text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </Link>
  );
}
