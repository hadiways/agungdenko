"use client";

import { useState, useEffect } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SERVICES_QUERY } from "@/lib/sanity/queries";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Layanan Kami | PT Denko Wahana Sakti";
    async function loadData() {
      try {
        const cmsServices = await sanityFetch(SERVICES_QUERY);
        const baseServices = cmsServices || [];

        const saved = localStorage.getItem("custom_services");
        if (saved) {
          try {
            setServices([...JSON.parse(saved), ...baseServices]);
          } catch (e) {
            console.error("Failed to load custom services", e);
            setServices(baseServices);
          }
        } else {
          setServices(baseServices);
        }
      } catch (err) {
        console.error("Failed to load services data", err);
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
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block mb-2">LAYANAN & PERBAIKAN</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Layanan Kami</h1>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div id="services-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services && services.length > 0 ? (
              services.map((s, idx) => (
                <div key={s._id || idx} className="bg-brand-lightBg rounded-3xl p-6 border border-blue-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-brand-blueLight/20 flex items-center justify-center mb-6 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                      {s.icon && s.icon.startsWith("<svg") ? (
                        <div dangerouslySetInnerHTML={{ __html: s.icon }} />
                      ) : (
                        <span className="text-brand-blue font-bold text-xs">🛠</span>
                      )}
                    </div>
                    <h3 className="text-brand-darkBg font-display font-bold text-lg mb-2 group-hover:text-brand-blue transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Layanan prima dari PT Denko Wahana Sakti untuk menjamin efisiensi dan keamanan operasional pergudangan Anda.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 text-sm">
                Tidak ada layanan saat ini.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
