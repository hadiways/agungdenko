export const metadata = {
  title: "Tentang Kami | PT Denko Wahana Sakti",
  description: "Tentang PT Denko Wahana Sakti - Distributor resmi forklift electric, diesel, reach truck, stacker, hand pallet, scissor lift.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Title Header */}
      <section className="relative bg-brand-darkBg pt-32 pb-16 px-6 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block mb-2">PROFIL PERUSAHAAN</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Tentang Kami</h1>
        </div>
      </section>

      {/* Content Split Section */}
      <section className="py-24 bg-white px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl aspect-[4/3] shadow-xl border border-gray-100 relative group">
              <img src="/images/office.jpg" alt="Office building" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-darkBg/10"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white p-6 rounded-2xl shadow-xl max-w-xs border border-brand-blueLight/20 hidden sm:block">
              <span className="font-display font-bold text-2xl block">Distributor Resmi</span>
              <span className="text-xs text-gray-200 mt-1 block">Jaringan servis & sparepart di seluruh Indonesia.</span>
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-6">
            <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block">Kredibilitas Tinggi</span>
            <h2 className="text-brand-darkBg font-display font-extrabold text-3xl">PT Denko Wahana Sakti</h2>
            <div className="h-1 w-20 bg-brand-blue rounded"></div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                PT Denko Wahana Sakti adalah distributor terkemuka di Indonesia yang memfokuskan diri pada penyediaan solusi material handling terlengkap, berkualitas, dan profesional.
              </p>
              <p>
                Kami bangga menjadi mitra tepercaya bagi ratusan sektor pergudangan, manufaktur, konstruksi, dan logistik berat di tanah air dengan menyediakan unit orisinal langsung dari pabrikan kelas dunia.
              </p>
              <p>
                Dengan dukungan tim mekanik bersertifikasi dan suku cadang asli yang lengkap, kami menjamin kelancaran operasional bisnis Anda dengan layanan purna jual (after sales) terbaik di kelasnya.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
