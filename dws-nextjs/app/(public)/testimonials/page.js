"use client";

import { useState, useEffect } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { TESTIMONIALS_QUERY } from "@/lib/sanity/queries";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Testimoni Pelanggan | PT Denko Wahana Sakti";
    async function loadData() {
      try {
        const cmsTestimonials = await sanityFetch(TESTIMONIALS_QUERY);
        const baseTestimonials = cmsTestimonials || [];

        const saved = localStorage.getItem("custom_testimonials");
        if (saved) {
          try {
            setTestimonials([...JSON.parse(saved), ...baseTestimonials]);
          } catch (e) {
            console.error("Failed to load custom testimonials", e);
            setTestimonials(baseTestimonials);
          }
        } else {
          setTestimonials(baseTestimonials);
        }
      } catch (err) {
        console.error("Failed to load testimonials data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {/* Page Title Header */}
      <section className="relative bg-brand-darkBg pt-32 pb-16 px-6 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block mb-2">ULASAN & KEPUASAN</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Testimoni Pelanggan</h1>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((t, idx) => (
                <div key={t._id || idx} className="bg-brand-lightBg border border-blue-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex gap-1 text-brand-accent mb-4">
                      {Array(t.rating || 5).fill(0).map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current text-brand-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm italic mb-6 leading-relaxed">"{t.comment}"</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-brand-darkBg font-bold text-sm leading-tight">{t.company}</h4>
                    <p className="text-gray-400 text-[10px] mt-0.5">Verified Client</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 text-sm">
                Belum ada testimoni.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
