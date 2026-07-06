import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Building2, 
  Warehouse, 
  Truck, 
  HardHat, 
  ThermometerSnowflake, 
  ShoppingBag, 
  Anchor, 
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

// Pre-defined B2B industry details
const SOLUTIONS_CONTENT = {
  "warehouse": {
    title: "Solusi Material Handling Gudang (Warehouse)",
    subtitle: "Optimalkan Kapasitas & Efisiensi Penyimpanan Rak Tinggi",
    desc: "Untuk area pergudangan modern dengan sistem racking yang tinggi, mobilitas vertikal dan horizontal yang presisi adalah kunci utama untuk meningkatkan volume throughput barang.",
    icon: <Warehouse className="w-12 h-12 text-brand-blue" />,
    features: [
      "Penyusunan barang pada koridor sempit dengan Reach Truck presisi tinggi.",
      "Pemindahan beban palet secara cepat di area gudang menggunakan Electric Stacker.",
      "Fleksibilitas manuver optimal di lantai epoxy tanpa meninggalkan jejak ban.",
      "Sistem pemantauan baterai cerdas untuk operasional shift berkelanjutan."
    ],
    recommendedProducts: ["Reach Truck", "Electric Stacker", "Hand Pallet Electric"]
  },
  "manufacturing": {
    title: "Solusi Material Handling Pabrik (Manufacturing)",
    subtitle: "Mendukung Kelancaran Rantai Pasokan Lini Produksi",
    desc: "Lini manufaktur membutuhkan pasokan material yang konisten dan terjadwal. Unit forklift kami dirancang untuk siklus kerja berat 24/7 dengan keandalan maksimal.",
    icon: <Building2 className="w-12 h-12 text-brand-blue" />,
    features: [
      "Pengangkutan bahan baku curah menuju mesin produksi dengan Forklift Diesel tangguh.",
      "Pemindahan komponen sensitif bebas polusi gas menggunakan Forklift Electric.",
      "Traction power tinggi untuk menarik gerbong trailer suku cadang di pabrik otomotif.",
      "Durabilitas sasis dan mast forklift yang tahan terhadap getaran mesin industri."
    ],
    recommendedProducts: ["Forklift Diesel 3 Ton", "Forklift Electric", "Towing Tractor"]
  },
  "logistics": {
    title: "Solusi Logistik & Pusat Distribusi (Logistics)",
    subtitle: "Kecepatan Loading & Unloading Barang di Loading Dock",
    desc: "Kecepatan adalah segalanya dalam bisnis logistik. Forklift dan stacker kami meminimalkan waktu tunggu truk logistik dengan efisiensi siklus muat barang yang tinggi.",
    icon: <Truck className="w-12 h-12 text-brand-blue" />,
    features: [
      "Kecepatan jelajah tinggi untuk operasional loading dock yang sibuk.",
      "Desain kabin operator ergonomis untuk visibilitas muatan garpu maksimal.",
      "Sistem pengereman regeneratif elektrik untuk penghematan konsumsi energi.",
      "Layanan servis berkala on-site garansi respons cepat di bawah 4 jam."
    ],
    recommendedProducts: ["Forklift Diesel 5 Ton", "Reach Truck", "Electric Hand Pallet"]
  },
  "construction": {
    title: "Solusi Konstruksi & Proyek Infrastruktur (Construction)",
    subtitle: "Material Handling Tangguh untuk Medan Proyek Terjal",
    desc: "Kondisi outdoor proyek yang berdebu, berlumpur, dan tidak rata membutuhkan alat berat dengan torsi tinggi dan traksi roda yang superior.",
    icon: <HardHat className="w-12 h-12 text-brand-blue" />,
    features: [
      "Kemampuan memindahkan agregat tanah, pasir, dan batu menggunakan Wheel Loader.",
      "Akses pekerja instalasi di ketinggian gedung dengan Scissor Lift outdoor.",
      "Stabilitas kabin operator tinggi dilengkapi pelindung jatuh benda keras (FOPS/ROPS).",
      "Mesin diesel standar emisi EURO rendah konsumsi solar dengan torsi puncak besar."
    ],
    recommendedProducts: ["Wheel Loader", "Scissor Lift Diesel", "Forklift Heavy Duty 10 Ton"]
  },
  "cold-storage": {
    title: "Solusi Gudang Beku & Farmasi (Cold Storage)",
    subtitle: "Forklift Khusus Suhu Dingin Ekstrim hingga -30°C",
    desc: "Suhu beku dapat merusak komponen elektronik dan hidrolik forklift standar. Kami menyediakan unit dengan sertifikasi cold cabin terisolasi penuh.",
    icon: <ThermometerSnowflake className="w-12 h-12 text-brand-blue" />,
    features: [
      "Oli hidrolik bersuhu rendah antianku dan kabel kelistrikan berlapis karet silikon.",
      "Kabin operator tertutup dilengkapi sistem pemanas udara (heater) internal.",
      "Perlindungan karat ganda pada sasis dari kondensasi uap air udara gudang.",
      "Ban non-marking berpola grip khusus anti slip di lantai beku licin."
    ],
    recommendedProducts: ["Reach Truck Cold Storage", "Electric Stacker Khusus", "Hand Pallet Stainless"]
  },
  "retail": {
    title: "Solusi Retail & Distribusi Toko (Retail)",
    subtitle: "Manuver Lincah Koridor Sempit Minimarket & Hypermarket",
    desc: "Area belanja minimarket dan toko grosir membutuhkan alat pemindah yang senyap, kompak, bebas polusi emisi, dan aman bagi pengunjung sekitar.",
    icon: <ShoppingBag className="w-12 h-12 text-brand-blue" />,
    features: [
      "Dimensi body unit ekstra ringkas untuk berputar di gang belanja yang sempit.",
      "Kemudi presisi dengan radius putar sangat kecil bebas hambatan.",
      "Operasional baterai lithium bebas perawatan dengan pengisian daya cepat.",
      "Desain tiang mast pandangan luas (clear view) demi keamanan pejalan kaki."
    ],
    recommendedProducts: ["Compact Stacker", "Hand Pallet Manual", "Order Picker"]
  },
  "ports": {
    title: "Solusi Pelabuhan & Terminal Kontainer (Ports)",
    subtitle: "Pemindahan Kargo Peti Kemas Kapasitas Raksasa",
    desc: "Terminal peti kemas pelabuhan membutuhkan kecepatan bongkar muat kapal yang optimal. Kami menyediakan forklift berkapasitas ekstra besar untuk kontainer.",
    icon: <Anchor className="w-12 h-12 text-brand-blue" />,
    features: [
      "Kapasitas angkat forklift tugas berat mulai dari 10 Ton hingga 25 Ton.",
      "Sistem pemantau beban digital (load sensor) cegah kelebihan muatan.",
      "Konektivitas attachment spreader container yang presisi dan cepat.",
      "Mesin diesel komersial tugas berat daya tahan tinggi operasional laut korosif."
    ],
    recommendedProducts: ["Forklift Diesel 15 Ton", "Forklift Diesel 25 Ton", "Container Handler Attachment"]
  },
  "food-beverage": {
    title: "Solusi Industri Makanan & Minuman (Food & Beverage)",
    subtitle: "Higienitas Tinggi Bebas Polusi Asap Emisi Gas Buang",
    desc: "Pabrik makanan memiliki standar kebersihan sanitasi yang sangat ketat. Forklift listrik kami menjamin udara ruangan pabrik bersih dari residu karbon.",
    icon: <UtensilsCrossed className="w-12 h-12 text-brand-blue" />,
    features: [
      "Penggerak motor listrik AC 100% bebas emisi karbon dan jelaga pembakaran.",
      "Penggunaan pelumas hidrolik food-grade aman dari kontaminasi produk makanan.",
      "Baterai bebas emisi asam timbal (Li-Ion) aman dicas langsung di area pabrik.",
      "Pengoperasian super senyap mendukung ketenangan kerja karyawan lini kemas."
    ],
    recommendedProducts: ["Forklift Electric 3-Wheel", "Electric Reach Stacker", "Hand Pallet Manual"]
  }
};

export async function generateStaticParams() {
  return Object.keys(SOLUTIONS_CONTENT).map((slug) => ({ slug }));
}

export default async function IndustrySolutionPage({ params }) {
  const { slug } = await params;
  const content = SOLUTIONS_CONTENT[slug];

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
              <span className="text-brand-blueLight text-xs font-bold uppercase tracking-widest block">SOLUSI INDUSTRI</span>
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
            <h2 className="text-brand-darkBg font-display font-bold text-xl sm:text-2xl border-b border-gray-100 pb-3">Tantangan & Kebutuhan Operasional</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {content.desc}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-brand-darkBg font-display font-bold text-lg sm:text-xl">Keunggulan Solusi Kami</h3>
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
          
          {/* Recommended Products Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-brand-darkBg font-display font-bold text-sm sm:text-base border-b border-gray-100 pb-2">
              Unit Rekomendasi
            </h4>
            <div className="flex flex-col gap-2">
              {content.recommendedProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-blue/5 text-brand-blue text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                  <span>{prod}</span>
                </div>
              ))}
            </div>
            <Link 
              href="/products"
              className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors mt-2"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Call Sales Card */}
          <div className="bg-[#0B1B2B] text-white border border-white/5 rounded-3xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="space-y-3 relative z-10">
              <h4 className="font-display font-extrabold text-sm sm:text-base leading-snug">
                Diskusikan Kebutuhan Gudang Anda
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Konsultasikan layout area kerja Anda bersama tim ahli material handling kami untuk rekomendasi unit yang paling optimal.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <a
                href={`https://wa.me/6285724380347?text=Halo%20Pak%20Agung%20Ramdhani,%20saya%20tertarik%20dengan%20solusi%20${encodeURIComponent(content.title)}%20untuk%20perusahaan%20saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-gray-100 text-brand-darkBg font-bold text-xs py-3 rounded-xl flex items-center justify-center transition-all shadow-md"
              >
                Konsultasi Sekarang
              </a>
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}
