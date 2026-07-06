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
    <div className="bg-brand-lightBg border border-blue-100 rounded-3xl p-6 space-y-4">
      <h4 className="text-brand-darkBg font-display font-bold text-sm uppercase tracking-wider border-b border-blue-200/50 pb-2">
        Daftar Isi
      </h4>
      <nav className="space-y-2 text-sm">
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
            className={`block transition-colors py-1 ${
              heading.level === "h3" ? "pl-4 text-xs" : "font-medium"
            } ${
              activeId === heading.id
                ? "text-brand-blue font-bold border-l-2 border-brand-blue pl-2"
                : "text-gray-500 hover:text-brand-blue"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
