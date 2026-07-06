import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import { FileText } from "lucide-react";

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
    normal: ({ children }) => <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 font-normal">{children}</p>,
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

function groupContentIntoSections(content) {
  if (!content) return [];
  const sections = [];
  let currentSection = { heading: null, body: [], image: null };

  for (const block of content) {
    if (block._type === "block" && ["h2", "h3"].includes(block.style)) {
      if (currentSection.heading || currentSection.body.length > 0 || currentSection.image) {
        sections.push(currentSection);
      }
      currentSection = { heading: block, body: [], image: null };
    } else if (block._type === "image") {
      if (!currentSection.image) {
        currentSection.image = block;
      } else {
        currentSection.body.push(block);
      }
    } else {
      currentSection.body.push(block);
    }
  }
  if (currentSection.heading || currentSection.body.length > 0 || currentSection.image) {
    sections.push(currentSection);
  }
  return sections;
}

export default function ArticleContent({ content }) {
  if (!content) return null;
  
  const sections = groupContentIntoSections(content);
  
  return (
    <div className="prose prose-blue max-w-none space-y-8">
      {sections.map((section, index) => {
        const headingText = section.heading?.children
          ? section.heading.children.map((c) => c.text).join("")
          : "";
        const isKesimpulan = headingText.toLowerCase().includes("kesimpulan");

        if (isKesimpulan) {
          return (
            <div key={index} className="bg-brand-blue/5 border border-blue-100 rounded-2xl p-5 sm:p-6 flex gap-4 my-8 scroll-mt-24 animate-fade-in" id="kesimpulan">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 shadow-inner">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-grow">
                <h3 className="text-brand-darkBg font-display font-bold text-base mt-0 mb-2">Kesimpulan</h3>
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  <PortableText value={section.body} components={components} />
                </div>
              </div>
            </div>
          );
        }

        if (section.image) {
          const coverUrl = urlFor(section.image).width(400).height(250).url();
          return (
            <div key={index} className="space-y-4">
              {section.heading && (
                <PortableText value={[section.heading]} components={components} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8 space-y-4">
                  <PortableText value={section.body} components={components} />
                </div>
                <div className="md:col-span-4 pt-2">
                  <figure className="m-0">
                    <img
                      src={coverUrl}
                      alt={section.image.alt || "Section image"}
                      loading="lazy"
                      className="rounded-xl w-full border border-gray-100 shadow-sm object-cover aspect-[16/10]"
                    />
                    {section.image.caption && (
                      <figcaption className="text-center text-[10px] text-gray-400 font-medium mt-1.5">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="space-y-4">
            {section.heading && (
              <PortableText value={[section.heading]} components={components} />
            )}
            <PortableText value={section.body} components={components} />
          </div>
        );
      })}
    </div>
  );
}
