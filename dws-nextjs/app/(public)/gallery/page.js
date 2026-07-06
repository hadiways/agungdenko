export const metadata = {
  title: "Galeri Kegiatan | PT Denko Wahana Sakti",
  description: "Galeri Dokumentasi Unit & Kegiatan Layanan Lapangan PT Denko Wahana Sakti.",
};

export default function GalleryPage() {
  const galleryList = [
    { title: "Forklift Warehouse", image: "/images/gallery/gallery-1.jpg" },
    { title: "Scissor Lift", image: "/images/gallery/gallery-2.jpg" },
    { title: "Maintenance", image: "/images/gallery/gallery-3.jpg" },
    { title: "Delivery Truck", image: "/images/gallery/gallery-4.jpg" },
    { title: "Service Technician", image: "/images/gallery/gallery-5.jpg" },
    { title: "Team Photo", image: "/images/gallery/gallery-6.jpg" }
  ];

  return (
    <>
      {/* Page Title Header */}
      <section className="relative bg-brand-darkBg pt-32 pb-16 px-6 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block mb-2">DOKUMENTASI OPERASIONAL</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Galeri Kegiatan</h1>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryList.map((g, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl group aspect-[4/3] bg-brand-darkBg cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
                <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-95 group-hover:brightness-100" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darkBg/90 via-brand-darkBg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-xs sm:text-sm">{g.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
