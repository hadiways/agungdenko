"use client";

import { useState, useEffect } from "react";

const industries = [
  "Warehouse",
  "Manufaktur",
  "Logistik",
  "Industri Makanan",
  "Cold Storage",
  "Pelabuhan",
  "Retail Distribution",
  "E-Commerce"
];

export default function HeroIndustryRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % industries.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1.15em] min-w-[180px] sm:min-w-[240px] md:min-w-[320px] overflow-hidden align-bottom">
      <span
        key={index}
        className="absolute left-0 bottom-0 text-brand-blueLight font-extrabold animate-keyword-slide-up whitespace-nowrap"
      >
        {industries[index]}
      </span>
      <style>{`
        @keyframes keywordSlideUp {
          0% {
            opacity: 0;
            transform: translateY(50%);
          }
          12% {
            opacity: 1;
            transform: translateY(0);
          }
          88% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-50%);
          }
        }
        .animate-keyword-slide-up {
          animation: keywordSlideUp 2.8s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-keyword-slide-up {
            animation: keywordFade 2.8s forwards ease-in-out;
          }
          @keyframes keywordFade {
            0% { opacity: 0; }
            12% { opacity: 1; }
            88% { opacity: 1; }
            100% { opacity: 0; }
          }
        }
      `}</style>
    </span>
  );
}
