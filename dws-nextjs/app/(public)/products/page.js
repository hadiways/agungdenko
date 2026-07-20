"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Grid } from "lucide-react";
import { fetchProducts } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const list = await fetchProducts();
        setProducts(list);
      } catch (err) {
        console.error("Failed to load products from API", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("cat");
      if (cat) {
        setSelectedCategory(cat);
      }
    }
  }, []);

  // Dynamically derive unique categories from API products data
  const categories = ["Semua", ...Array.from(new Set(products.map(p => p.category))).filter(Boolean)];

  return (
    <>
      {/* Page Title Header */}
      <section className="relative bg-brand-darkBg pt-32 pb-16 px-6 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block mb-2">KATALOG MATERIAL HANDLING</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Produk Kami</h1>
        </div>
      </section>

      {/* Category Filter Bar (Dynamic from Laravel API) */}
      <section className="py-8 bg-brand-lightBg px-6 border-b border-brand-blueLight/10">
        <div className="container mx-auto">
          <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-3 overflow-x-auto pb-3 md:pb-0 scrollbar-none snap-x">
            {categories.map((catName) => (
              <button
                key={catName}
                onClick={() => {
                  setSelectedCategory(catName);
                  if (typeof window !== "undefined") {
                    const newUrl = catName === "Semua" 
                      ? window.location.pathname 
                      : `${window.location.pathname}?cat=${encodeURIComponent(catName)}`;
                    window.history.pushState({ path: newUrl }, '', newUrl);
                  }
                }}
                className={`snap-align-start shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === catName
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105"
                    : "bg-white hover:bg-brand-lightBg text-brand-darkBg border border-brand-blueLight/10 hover:border-brand-blue/30 hover:text-brand-blue"
                }`}
              >
                <span className={selectedCategory === catName ? "text-white" : "text-brand-blue"}>
                  {catName === "Semua" ? <Grid size={16} /> : <Package size={16} />}
                </span>
                <span>{catName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              if (loading) {
                return Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="bg-brand-lightBg/50 border border-brand-blueLight/20 rounded-3xl p-5 shadow-sm animate-pulse space-y-4">
                    <div className="aspect-[4/3] bg-gray-200 rounded-2xl"></div>
                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                ));
              }

              const displayed = selectedCategory === "Semua"
                ? products
                : products.filter(p => p.category === selectedCategory);
              
              if (!displayed || displayed.length === 0) {
                return (
                  <div className="col-span-full text-center text-gray-500 py-12 text-sm">
                    Belum ada produk tersedia.
                  </div>
                );
              }

              return displayed.map((p) => (
                <div key={p.id} className="group bg-brand-lightBg/50 border border-brand-blueLight/20 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                  <Link 
                    href={`/products/${p.slug}`} 
                    className="cursor-pointer block relative overflow-hidden rounded-2xl bg-white mb-5 aspect-[4/3] flex items-center justify-center p-6 border border-brand-blueLight/10 shadow-inner"
                  >
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-brand-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-brand-blueLight/20">
                      {p.category}
                    </div>
                  </Link>
                  <div>
                    <h3 className="text-brand-darkBg font-display font-bold text-lg mb-1 group-hover:text-brand-blue transition-colors duration-200">
                      <Link href={`/products/${p.slug}`} className="hover:text-brand-blue transition-colors">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-xs mb-6 leading-relaxed line-clamp-3">{p.description}</p>
                  </div>
                  <Link href={`/products/${p.slug}`} className="text-brand-blue font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 group/btn hover:text-brand-accent transition-colors mt-auto self-start cursor-pointer">
                    Lihat Detail <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">&rarr;</span>
                  </Link>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
    </>
  );
}
