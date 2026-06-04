import Link from 'next/link';

export function LearnCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="card block transition hover:border-hok-gold/50">
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </Link>
  );
}
