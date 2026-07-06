import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex text-xs md:text-sm text-gray-500 mb-6 font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link href="/" className="hover:text-brand-blue transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <svg className="w-3.5 h-3.5 text-gray-400 mx-1 md:mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-blue transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400 truncate max-w-[150px] md:max-w-xs">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
