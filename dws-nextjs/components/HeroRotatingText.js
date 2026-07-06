"use client";

import { useState, useEffect } from "react";

const items = [
  { name: "Forklift", subtitle: "Distributor resmi forklift diesel & electric", emoji: "🚜" },
  { name: "Reach Truck", subtitle: "Ideal untuk warehouse high rack", emoji: "⚡" },
  { name: "Stacker", subtitle: "Efisien untuk operasional gudang", emoji: "📦" },
  { name: "Scissor Lift", subtitle: "Solusi pekerjaan di ketinggian", emoji: "🪜" },
  { name: "Aerial Work Platform", subtitle: "Keamanan maksimal untuk maintenance", emoji: "🔧" },
  { name: "Hand Pallet", subtitle: "Solusi material handling ekonomis", emoji: "🛒" },
  { name: "Wheel Loader", subtitle: "Performa tinggi untuk industri berat", emoji: "🏗️" },
  { name: "Tow Tractor", subtitle: "Menarik beban dengan efisien", emoji: "🚛" },
];

export default function HeroRotatingText() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2800); // Rotate every 2.8 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeItem = items[index];

  return (
    <div 
      className="border-l-4 border-brand-blue bg-white/5 rounded-r-2xl py-3 px-5 sm:py-4 sm:px-6 my-6 max-w-xl cursor-default hover:bg-white/10 transition-all duration-300 select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest block mb-1">
        Kami Menyediakan
      </span>
      <div className="overflow-hidden relative h-12 sm:h-14 flex flex-col justify-center">
        {/* Key={index} forces React to remount the element and rerun the CSS slide-up-fade-in animation */}
        <div 
          key={index}
          className="animate-slide-up-fade-in flex flex-col justify-center"
        >
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-display font-extrabold text-white flex items-center gap-2">
              <span className="text-lg sm:text-xl transform group-hover:scale-110 transition-transform duration-300 inline-block">{activeItem.emoji}</span>
              <span>{activeItem.name}</span>
            </span>
          </div>
          <p className="text-brand-blueLight font-medium text-[11px] sm:text-xs mt-0.5 leading-relaxed truncate">
            {activeItem.subtitle}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUpFadeIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up-fade-in {
          animation: slideUpFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
