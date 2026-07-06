import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Wrench, 
  HelpCircle, 
  Settings, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

// Pre-defined B2B services details
const SERVICES_CONTENT = {
  "sales": {
    title: "Layanan Penjualan Forklift (Sales)",
    subtitle: "Distributor Resmi Unit Baru & Bekas Bergaransi Pabrik",
    desc: "Kami menyediakan berbagai unit material handling orisinal dari merk-merk terpercaya di dunia, didukung garansi penuh, suku cadang asli, dan jaminan servis purna jual prima.",
    icon: <Briefcase className="w-12 h-12 text-brand-blue" />,
    features: [
      "Jaminan keaslian unit 100% langsung dari pabrikan utama.",
      "Garansi resmi kerusakan komponen elektrikal & hidrolik hingga 1-2 tahun.",
      "Skema pembiayaan (leasing) fleksibel dengan bunga rendah bekerjasama dengan bank ternama.",
      "Free servis berkala pertama dan gratis pengiriman untuk wilayah Jabodetabek."
    ],
    ctaText: "Minta Brosur Penjualan"
  },
  "rental": {
    title: "Layanan Penyewaan Forklift (Rental)",
    subtitle: "Skema Sewa Harian, Bulanan, & Kontrak Jangka Panjang Tanpa Ribet",
    desc: "Dukung produktivitas bisnis Anda tanpa perlu mengkhawatirkan biaya investasi aset tinggi. Kami menyediakan armada forklift sewa termuda dengan kondisi prima.",
    icon: <Layers className="w-12 h-12 text-brand-blue" />,
    features: [
      "Pilihan kapasitas angkat terlengkap mulai dari 1.5 Ton hingga 25 Ton.",
      "Bebas biaya perawatan dan perbaikan unit (semua ditanggung oleh teknisi DWS).",
      "Unit pengganti (back-up unit) siap kirim dalam 24 jam jika terjadi kendala operasional.",
      "Opsi sewa lengkap dengan operator bersertifikasi SIO resmi jika dibutuhkan."
    ],
    ctaText: "Minta Penawaran Sewa"
  },
  "maintenance": {
    title: "Service & Maintenance Forklift",
    subtitle: "Perbaikan Cepat & Akurat oleh Teknisi Bersertifikat",
    desc: "Mengalami kendala unit ngadat di tengah operasional gudang? Tim tanggap darurat DWS siap dikirim langsung ke lokasi Anda untuk meminimalkan downtime industri Anda.",
    icon: <Wrench className="w-12 h-12 text-brand-blue" />,
    features: [
      "Respons cepat kunjungan teknisi di lokasi dalam waktu maksimal 4 jam.",
      "Peralatan diagnostic digital modern untuk pendeteksian kerusakan kelistrikan.",
      "Garansi pekerjaan servis perbaikan dan garansi keaslian komponen pengganti.",
      "Bengkel pusat (workshop) terlengkap untuk pengerjaan overhaul mesin berat."
    ],
    ctaText: "Hubungi Teknisi Service"
  },
  "preventive": {
    title: "Preventive Maintenance Kontrak",
    subtitle: "Pemeliharaan Rutin Terjadwal demi Menjaga Usia Pakai Forklift",
    desc: "Cegah kerusakan fatal sebelum terjadi. Program preventive maintenance kami memastikan forklift Anda selalu bekerja pada efisiensi puncak setiap hari.",
    icon: <ShieldCheck className="w-12 h-12 text-brand-blue" />,
    features: [
      "Kunjungan pemeriksaan rutin terjadwal bulanan oleh teknisi ahli.",
      "Penggantian oli, filter udara, filter minyak, dan grease berkala secara tepat waktu.",
      "Laporan tertulis kondisi forklift lengkap dengan rekomendasi suku cadang aus.",
      "Diskon khusus untuk suku cadang pendukung selama masa kontrak aktif."
    ],
    ctaText: "Daftar Kontrak Servis"
  },
  "sparepart": {
    title: "Penyediaan Suku Cadang Orisinal (Sparepart)",
    subtitle: "Pusat Suku Cadang Forklift Terlengkap Bergaransi Resmi",
    desc: "Kami menjamin ketersediaan suku cadang (parts availability) di atas 90% untuk semua tipe forklift diesel dan electric guna menjaga kelancaran operasional Anda.",
    icon: <Settings className="w-12 h-12 text-brand-blue" />,
    features: [
      "Suku cadang orisinal kualitas OEM langsung dari pabrikan Jepang dan Eropa.",
      "Pengiriman suku cadang mendesak dalam 1 hari kerja (same-day delivery).",
      "Katalog suku cadang digital lengkap memudahkan penyesuaian nomor seri unit.",
      "Bantuan instalasi komponen oleh teknisi spesialis dengan biaya terjangkau."
    ],
    ctaText: "Tanya Stok Sparepart"
  },
  "training": {
    title: "Operator Training & Sertifikasi SIO",
    subtitle: "Pelatihan Keselamatan Kerja & Pengoperasian Forklift Profesional",
    desc: "Operator yang terlatih meminimalkan risiko kecelakaan kerja dan memperpanjang umur forklift. Kami menyelenggarakan pelatihan bersertifikasi Depnaker resmi.",
    icon: <GraduationCap className="w-12 h-12 text-brand-blue" />,
    features: [
      "Materi pelatihan teori keselamatan K3 dan praktik lapangan komprehensif.",
      "Instruktur bersertifikasi nasional dengan pengalaman industri puluhan tahun.",
      "Penerbitan Kartu Lisensi SIO resmi Kemenaker RI setelah kelulusan tes.",
      "Program in-house training langsung diselenggarakan di lokasi pabrik Anda."
    ],
    ctaText: "Daftar Pelatihan SIO"
  },
  "consultation": {
    title: "Konsultasi Layout & Material Handling",
    subtitle: "Rekomendasi Ahli untuk Efisiensi Aliran Barang Gudang",
    desc: "Ingin membangun gudang baru atau mengoptimalkan gudang lama? Tim konsultan kami siap menganalisis layout area kerja untuk menentukan tipe forklift terbaik.",
    icon: <HelpCircle className="w-12 h-12 text-brand-blue" />,
    features: [
      "Analisis spesifikasi beban muatan, dimensi palet, dan tinggi racking gudang.",
      "Rekomendasi radius putar forklift untuk penentuan lebar gang (aisle width).",
      "Perbandingan kalkulasi efisiensi biaya investasi beli vs sewa jangka panjang.",
      "Survei lokasi gudang gratis tanpa dipungut biaya apa pun."
    ],
    ctaText: "Konsultasi Gratis Sekarang"
  }
};

export async function generateStaticParams() {
  return Object.keys(SERVICES_CONTENT).map((slug) => ({ slug }));
}

export default async function ServicesDetailPage({ params }) {
  const { slug } = params;
  const content = SERVICES_CONTENT[slug];

  if (!content) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* Hero Header */}
      <section className="bg-[#0B1B2B] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="container mx-auto max-w-5xl relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
              {content.icon}
            </div>
            <div>
              <span className="text-brand-blueLight text-xs font-bold uppercase tracking-widest block">LAYANAN KAMI</span>
              <h1 className="text-white font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mt-0.5">{content.title}</h1>
            </div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto max-w-5xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        
        {/* Left Info Column */}
        <div className="lg:col-span-8 space-y-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-brand-darkBg font-display font-bold text-xl sm:text-2xl border-b border-gray-100 pb-3">Informasi Detail Layanan</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {content.desc}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-brand-darkBg font-display font-bold text-lg sm:text-xl">Kenapa Memilih Layanan Kami?</h3>
            <div className="grid grid-cols-1 gap-3">
              {content.features.map((feat, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Action Trigger Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 text-center">
            <h4 className="text-brand-darkBg font-display font-bold text-sm sm:text-base border-b border-gray-100 pb-2">
              Hubungi Kami
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Tekan tombol di bawah untuk langsung berdiskusi mengenai kebutuhan layanan ini dengan divisi terkait kami.
            </p>
            
            <a
              href={`https://wa.me/6285724380347?text=Halo%20Admin%20PT%20Denko%20Wahana%20Sakti,%20saya%20ingin%20bertanya%20mengenai%20${encodeURIComponent(content.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <span>{content.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/contact"
              className="w-full border border-gray-200 hover:border-gray-300 text-gray-600 font-semibold text-xs py-3 rounded-xl flex items-center justify-center transition-colors"
            >
              Hubungi via Email
            </Link>
          </div>

          {/* Quick Support Badge */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-brand-darkBg font-bold text-xs">Jaminan Layanan DWS</h4>
            <ul className="space-y-2 text-[11px] text-gray-500">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>Garansi suku cadang orisinal asli pabrik</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>Response-time kunjungan cepat di bawah 4 jam</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>Teknisi berpengalaman bersertifikasi internasional</span>
              </li>
            </ul>
          </div>

        </div>

      </section>
    </main>
  );
}
