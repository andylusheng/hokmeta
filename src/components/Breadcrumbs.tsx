import Link from "next/link";

interface BreadcrumbsProps {
  items: { name: string; url: string }[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-textSecondary">
        <li>
          <Link href="/" className="hover:text-primary transition">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            <span className="mx-2">/</span>
            {i === items.length - 1 ? (
              <span className="text-text">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-primary transition">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};