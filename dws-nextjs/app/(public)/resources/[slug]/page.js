import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  BookOpen, 
  HelpCircle, 
  Video, 
  Download, 
  Info, 
  Newspaper,
  ArrowRight,
  FileCheck2,
  CheckCircle2
} from "lucide-react";

// Pre-defined B2B resources details
const RESOURCES_CONTENT = {
  "catalog": {
    title: "Katalog Produk Material Handling (Catalog)",
    subtitle: "Unduh Katalog Lengkap Unit Forklift, Stacker, & Pallet DWS Terbaru",
    desc: "Dapatkan spesifikasi teknis lengkap, dimensi ukuran unit, kapasitas angkat beban, serta opsi kustomisasi tiang mast dari seluruh unit material handling kami.",
    icon: <BookOpen className="w-12 h-12 text-brand-blue" />,
    features: [
      "Katalog Produk Forklift Diesel Komatsu & Heli Seri Terbaru.",
      "Katalog Unit Gudang Ringkas Electric Stacker & Reach Truck.",
      "Spesifikasi komparasi baterai Lead-Acid vs Lithium-Ion.",
      "Panduan dimensi kemudi radius putar terkecil unit."
    ],
    ctaText: "Unduh Katalog (PDF)"
  },
  "brochures": {
    title: "Brosur Spesifikasi Unit (Brochures)",
    subtitle: "Detail Lembar Data Teknis Unit Spesifik untuk Kebutuhan Anda",
    desc: "Unduh brosur digital tipe forklift tertentu secara langsung untuk mempelajari kurva kapasitas beban angkat dan detail diagram mekanis kelistrikan unit.",
    icon: <FileCheck2 className="w-12 h-12 text-brand-blue" />,
    features: [
      "Brosur Forklift Diesel Kapasitas 3-10 Ton Lengkap.",
      "Brosur Reach Truck & Order Picker Khusus High Rack.",
      "Brosur Alat Ketinggian Scissor Lift & Boom Lift Manlift.",
      "Brosur Towing Tractor Khusus Logistik Bandara."
    ],
    ctaText: "Unduh Brosur Lengkap"
  },
  "faq": {
    title: "Pertanyaan Umum (FAQ)",
    subtitle: "Jawaban Lengkap Mengenai Garansi, Skema Sewa, & Layanan Servis DWS",
    desc: "Kami mengumpulkan berbagai pertanyaan yang paling sering ditanyakan oleh pelanggan kami untuk mempercepat pencarian informasi Anda.",
    icon: <HelpCircle className="w-12 h-12 text-brand-blue" />,
    features: [
      "Bagaimana ketentuan garansi kelistrikan forklift elektrik baru? (Garansi 2 Tahun).",
      "Apakah ada minimal durasi kontrak untuk penyewaan forklift? (Minimal Sewa 1 Bulan).",
      "Berapa lama estimasi teknisi sampai ke gudang kami jika unit rusak? (Maksimal 4 Jam).",
      "Apakah suku cadang untuk forklift tipe lama masih tersedia? (Tersedia Lengkap OEM)."
    ],
    ctaText: "Hubungi Support Center"
  },
  "case-studies": {
    title: "Studi Kasus Efisiensi Industri (Case Studies)",
    subtitle: "Bagaimana DWS Membantu Ratusan Perusahaan Mengoptimalkan Logistik Gudang",
    desc: "Pelajari kisah sukses mitra industri kami dalam menekan biaya perawatan forklift hingga 30% dan meningkatkan produktivitas bongkar muat barang.",
    icon: <Info className="w-12 h-12 text-brand-blue" />,
    features: [
      "Studi Kasus Gudang Beku Farmasi: Penerapan Reach Truck Cold Cabin khusus.",
      "Studi Kasus Pabrik Otomotif: Penggunaan 10 Towing Tractor menekan downtime suku cadang.",
      "Studi Kasus Distribusi Retail Modern: Mengoptimalkan lebar gang lorong rak gudang.",
      "Studi Kasus Pelabuhan Kontainer: Operasional Forklift 20 Ton siklus kerja berat 24/7."
    ],
    ctaText: "Baca Semua Studi Kasus"
  },
  "news": {
    title: "Berita & Tren Industri (News)",
    subtitle: "Update Terkini Seputar Teknologi Logistik & Material Handling Global",
    desc: "Ikuti perkembangan terbaru mengenai teknologi baterai forklift ramah lingkungan, standar keamanan operasional gudang modern, dan berita internal PT Denko Wahana Sakti.",
    icon: <Newspaper className="w-12 h-12 text-brand-blue" />,
    features: [
      "Peluncuran tipe forklift elektrik hemat daya terbaru dengan baterai lithium.",
      "Tips mengemudi forklift aman di musim hujan untuk area outdoor proyek.",
      "Ekspansi cabang layanan service center baru DWS di Surabaya dan Medan.",
      "Partisipasi PT Denko Wahana Sakti di Pameran Logistik Nasional Terbesar."
    ],
    ctaText: "Buka Berita Terbaru"
  },
  "videos": {
    title: "Galeri Video Operasional (Videos)",
    subtitle: "Uji Coba Ketangguhan & Demo Cara Kerja Unit Forklift DWS",
    desc: "Tonton video demonstrasi langsung dari unit forklift diesel, reach truck, dan scissor lift kami saat beroperasi di berbagai medan proyek menantang.",
    icon: <Video className="w-12 h-12 text-brand-blue" />,
    features: [
      "Video Uji Coba Angkat Forklift Heavy Duty 15 Ton mengangkat kontainer.",
      "Video Manuver Lincah Reach Truck di lorong gang racking sempit gudang beku.",
      "Video Cara Kerja Sistem Hidrolik Boom Lift AWP mencapai ketinggian 20 meter.",
      "Video Panduan Inspeksi Harian forklift sebelum dijalankan operator."
    ],
    ctaText: "Tonton di YouTube Kami"
  },
  "downloads": {
    title: "Pusat Unduhan Berkas (Downloads)",
    subtitle: "Unduh Formulir Pengajuan Sewa, Sertifikat SIO, & Pedoman Keselamatan Kerja",
    desc: "Unduh file PDF dan dokumen administratif pendukung yang diperlukan untuk mempercepat proses kerjasama penyewaan maupun penjualan unit forklift.",
    icon: <Download className="w-12 h-12 text-brand-blue" />,
    features: [
      "Unduh Formulir Pengajuan Penyewaan Unit (Rental Agreement Form).",
      "Unduh Lembar Pedoman Checklist Keselamatan Kerja Operator (SOP Forklift).",
      "Unduh Company Profile PT Denko Wahana Sakti format PDF resolusi tinggi.",
      "Unduh Sertifikat Kelayakan Unit dan Kalibrasi Alat Angkat dari Depnaker."
    ],
    ctaText: "Unduh Berkas Lengkap"
  }
};

export async function generateStaticParams() {
  return Object.keys(RESOURCES_CONTENT).map((slug) => ({ slug }));
}

export default async function ResourcesDetailPage({ params }) {
  const { slug } = await params;
  const content = RESOURCES_CONTENT[slug];

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
              <span className="text-brand-blueLight text-xs font-bold uppercase tracking-widest block">RESOURCES</span>
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
            <h2 className="text-brand-darkBg font-display font-bold text-xl sm:text-2xl border-b border-gray-100 pb-3">Informasi Berkas & Materi</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {content.desc}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-brand-darkBg font-display font-bold text-lg sm:text-xl">Daftar Konten / Dokumen Terkait</h3>
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
              Akses Berkas
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Silakan klik tombol di bawah untuk mengunduh dokumen atau menghubungi tim representatif kami untuk mendapatkan materi lengkap.
            </p>
            
            <a
              href="https://wa.me/6285784380347?text=Halo%20Admin%20PT%20Denko%20Wahana%20Sakti,%20saya%20ingin%20meminta%20berkas%20mengenai%20katalog/brosur/faq."
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
              Tanya Form via Email
            </Link>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-[#0B1B2B] text-white border border-white/5 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-brand-blueLight font-bold text-xs">Pemberitahuan Hak Cipta</h4>
            <p className="text-gray-400 text-[10px] sm:text-[11px] leading-relaxed">
              Seluruh katalog, brosur, diagram, dan panduan keselamatan kerja bermerk Komatsu, Heli, dan Noblelift di portal ini dilindungi undang-undang hak cipta dan didistribusikan secara resmi oleh PT Denko Wahana Sakti.
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}
