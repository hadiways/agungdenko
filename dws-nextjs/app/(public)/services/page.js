import { sanityFetch } from "@/lib/sanity/fetch";
import { SERVICES_QUERY } from "@/lib/sanity/queries";

export const metadata = {
  title: "Layanan Kami | PT Denko Wahana Sakti",
  description: "Layanan Penjualan, Rental, Servis, Sparepart Forklift & Material Handling PT Denko Wahana Sakti.",
};

export default async function ServicesPage() {
  let services = [];
  try {
    services = await sanityFetch(SERVICES_QUERY);
  } catch (err) {
    console.error("Failed to load services in server side component", err);
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
