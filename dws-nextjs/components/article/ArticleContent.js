import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8 space-y-2">
          <img
            src={urlFor(value).width(800).fit("max").auto("format").url()}
            alt={value.alt || "Gambar Artikel"}
            loading="lazy"
            className="rounded-2xl max-w-full mx-auto border border-gray-100 shadow-sm"
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-gray-400 font-medium">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-display font-extrabold text-brand-darkBg mt-12 mb-4 leading-tight">{children}</h1>,
    h2: ({ children }) => {
      const text = Array.isArray(children) ? children.join("") : children;
      const id = typeof text === "string" ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "";
      return <h2 id={id} className="text-2xl md:text-3xl font-display font-bold text-brand-darkBg mt-10 mb-4 leading-tight border-b border-gray-100 pb-2 scroll-mt-24">{children}</h2>;
    },
    h3: ({ children }) => {
      const text = Array.isArray(children) ? children.join("") : children;
      const id = typeof text === "string" ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "";
      return <h3 id={id} className="text-xl md:text-2xl font-display font-bold text-brand-darkBg mt-8 mb-4 leading-tight scroll-mt-24">{children}</h3>;
    },
    h4: ({ children }) => <h4 className="text-lg md:text-xl font-display font-bold text-brand-darkBg mt-6 mb-3 leading-tight">{children}</h4>,
    normal: ({ children }) => <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-blue bg-brand-lightBg py-4 pl-6 pr-4 rounded-r-2xl italic text-gray-700 my-8 text-sm sm:text-base">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600 text-sm sm:text-base pl-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-600 text-sm sm:text-base pl-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a href={value.href} target={target} rel={rel} className="text-brand-blue hover:text-brand-blueDark font-semibold underline transition-colors">
          {children}
        </a>
      );
    },
  },
};

export default function ArticleContent({ content }) {
  if (!content) return null;
  return (
    <div className="prose prose-blue max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
