"use client";

import { useEffect, useState } from "react";

export default function TOC({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!content) return;

    const rawHeadings = content
      .filter((block) => block._type === "block" && ["h2", "h3"].includes(block.style))
      .map((block) => {
        const text = block.children ? block.children.map((c) => c.text).join("") : "";
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return {
          id,
          text,
          level: block.style,
        };
      });

    setHeadings(rawHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-brand-blue/5 border border-blue-100/50 rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center gap-2 border-b border-blue-100 pb-2">
        <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h4 className="text-brand-darkBg font-display font-bold text-sm tracking-wide">
          Daftar Isi
        </h4>
      </div>
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm">
        {headings.map((heading, idx) => (
          <a
            key={idx}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={`block transition-colors py-1 hover:text-brand-blue ${
              heading.level === "h3" ? "pl-4 text-xs" : "font-semibold"
            } ${
              activeId === heading.id
                ? "text-brand-blue font-bold border-l-2 border-brand-blue pl-2"
                : "text-gray-600"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
