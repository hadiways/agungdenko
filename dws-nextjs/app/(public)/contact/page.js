import { User, Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Kontak Kami | PT Denko Wahana Sakti",
  description: "Hubungi PT Denko Wahana Sakti - Sales Executive Agung Ramdhani untuk pemesanan forklift & material handling.",
};

export default function ContactPage() {
  const waNumber = "6285724380347";
  const displayPhone = "0857-2438-0347";

  return (
    <>
      {/* Page Title Header */}
      <section className="relative bg-brand-darkBg pt-32 pb-16 px-6 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block mb-2">HUBUNGI SALES EXECUTIVE KAMI</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Hubungi Kami</h1>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info Left */}
            <div className="space-y-8">
              <div>
                <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block mb-2">Hubungi Langsung</span>
                <h2 className="text-brand-darkBg font-display font-extrabold text-3xl mb-4">Layanan Siaga B2B</h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Butuh penawaran resmi, spesifikasi lengkap, atau demo unit? Hubungi Sales Representative kami untuk bantuan respons cepat.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lightBg flex items-center justify-center text-brand-blue flex-shrink-0 border border-brand-blueLight/20 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-brand-darkBg font-bold text-sm">Sales Executive</h4>
                    <p className="text-gray-600 text-xs">Agung Ramdhani</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lightBg flex items-center justify-center text-brand-blue flex-shrink-0 border border-brand-blueLight/20 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-brand-darkBg font-bold text-sm">WhatsApp / Telepon</h4>
                    <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-xs hover:text-brand-blue transition-colors">{displayPhone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lightBg flex items-center justify-center text-brand-blue flex-shrink-0 border border-brand-blueLight/20 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-brand-darkBg font-bold text-sm">Email</h4>
                    <a href="mailto:agung.ramdhani@denkowahanasakti.co.id" className="text-gray-600 text-xs hover:text-brand-blue transition-colors">agung.ramdhani@denkowahanasakti.co.id</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lightBg flex items-center justify-center text-brand-blue flex-shrink-0 border border-brand-blueLight/20 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-brand-darkBg font-bold text-sm">Kantor Cabang</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Jl. Soekarno Hatta No. 645, Bandung, Jawa Barat 40286, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Iframe Map Right */}
            <div className="w-full h-80 md:h-auto rounded-3xl overflow-hidden border border-blue-100 shadow-xl relative min-h-[300px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.575971439228!2d107.64969247484725!3d-6.941178693059082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e80be4bfd48b%3A0xe54e2fe7f4abdc4c!2sPT%20Denko%20Wahana%20Sakti%20Bandung!5e0!3m2!1sid!2sid!4v1719999999999!5m2!1sid!2sid" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
