"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function ProductCarousel({ products, triggerSelectProduct, getProductBrand }) {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Update arrow states based on scroll position
  const updateArrows = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [products]);

  // Scroll manually via buttons
  const scroll = (direction) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const offset = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed factor
    if (Math.abs(walk) > 3) {
      setHasMoved(true);
    }
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Left Navigation Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          type="button"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-brand-blue text-brand-darkBg hover:text-white p-3 rounded-full shadow-2xl border border-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 hidden md:flex items-center justify-center cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Navigation Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          type="button"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-brand-blue text-brand-darkBg hover:text-white p-3 rounded-full shadow-2xl border border-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 hidden md:flex items-center justify-center cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={updateArrows}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-6 px-1 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {products.map((p) => {
          const brandName = getProductBrand(p);
          return (
            <div
              key={p.id}
              className="w-[78vw] sm:w-[45vw] md:w-[28vw] lg:w-[22%] shrink-0 snap-start bg-white border border-brand-blueLight/10 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Wrapper */}
              <Link 
                href={`/products/${p.slug}`} 
                className="cursor-pointer block relative overflow-hidden rounded-xl bg-gray-50/50 mb-4 aspect-[4/3] flex items-center justify-center p-4 border border-brand-blueLight/5"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  draggable="false"
                />
                <div className="absolute top-2.5 left-2.5 bg-brand-blue/10 text-brand-blue text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {p.category}
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {brandName && (
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {brandName}
                    </span>
                  )}
                  <h4 className="text-brand-darkBg font-display font-bold text-sm sm:text-base leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
                    <Link href={`/products/${p.slug}`} className="hover:text-brand-blue transition-colors">
                      {p.name}
                    </Link>
                  </h4>
                </div>

                {/* Offer CTA Link */}
                <Link
                  href={`/products/${p.slug}`}
                  className="text-brand-blue font-bold text-xs uppercase tracking-wider flex items-center gap-1 mt-4 group/btn hover:text-brand-accent transition-colors self-start cursor-pointer"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight size={12} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
