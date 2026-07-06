"use client";

import { PRODUCTS_DATA } from "@/data/products";

export default function ProductsPage() {
  const triggerSelectProduct = (productName) => {
    window.dispatchEvent(new CustomEvent("select-product", { detail: productName }));
  };

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

      {/* Products Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS_DATA.map((p) => (
              <div key={p.id} className="group bg-brand-lightBg/50 border border-brand-blueLight/20 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div className="relative overflow-hidden rounded-2xl bg-white mb-5 aspect-[4/3] flex items-center justify-center p-6 border border-brand-blueLight/10 shadow-inner">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute top-3 left-3 bg-brand-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-brand-blueLight/20">
                    {p.category}
                  </div>
                </div>
                <div>
                  <h3 className="text-brand-darkBg font-display font-bold text-lg mb-1 group-hover:text-brand-blue transition-colors duration-200">{p.name}</h3>
                  <p className="text-gray-600 text-xs mb-6 leading-relaxed">{p.description}</p>
                </div>
                <button onClick={() => triggerSelectProduct(p.name)} className="text-brand-blue font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 group/btn hover:text-brand-accent transition-colors mt-auto self-start">
                  Minta Penawaran <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">&rarr;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
