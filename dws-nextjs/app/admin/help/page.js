"use client";

import { useEffect } from "react";
import { 
  HelpCircle, 
  Info, 
  LayoutDashboard, 
  Package, 
  Sliders, 
  Users, 
  HelpCircle as QuestionIcon
} from "lucide-react";

export default function AdminHelpPage() {
  useEffect(() => {
    document.title = "DWS Admin | Panduan Pengguna";
  }, []);

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh] font-sans text-gray-700">
      <div className="space-y-8">
        {/* Header section */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-brand-blue" />
            <span>Gung, Nih Cara Pakainya Biar Nggak Bingung</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Petunjuk lengkap cara mengelola website PT Denko Wahana Sakti.</p>
        </div>

        {/* Sebelum Mulai Alert */}
        <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
          <Info className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
          <div className="text-xs text-brand-darkBg leading-relaxed space-y-1">
            <strong className="font-bold text-sm block">Sebelum Mulai:</strong>
            <p>
              Semua data yang lu masukin, mulai dari produk, profil sales, kategori, sampai testimoni, disimpen aman di browser yang lagi lu pakai. Jadi datanya nggak bakal hilang atau diutak-atik orang lain. Tapi kalau lu ngehapus data browser atau <em>clear cache</em>, ya datanya ikut kehapus juga.
            </p>
          </div>
        </div>

        {/* Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Dashboard */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className="text-brand-darkBg font-display font-bold text-base">1. Dashboard (Beranda)</h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Pas pertama kali login, yang muncul ya halaman Dashboard. Di sini lu bisa lihat:
            </p>
            <ul className="space-y-2 text-xs text-gray-600 pl-4 list-disc">
              <li>Total semua produk yang aktif.</li>
              <li>Total orang yang ngisi form permintaan penawaran.</li>
              <li>Tiga leads terbaru yang baru masuk.</li>
              <li>Profil sales yang tampil di website.</li>
            </ul>
            <p className="text-gray-500 text-xs leading-relaxed pt-2 border-t border-gray-50">
              Kalau mau ganti nama, jabatan, nomor WhatsApp, atau foto, tinggal edit aja di bagian bawah lalu klik simpan. Perubahannya langsung muncul di website.
            </p>
          </div>

          {/* Card 2: Produk & Kategori */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-brand-darkBg font-display font-bold text-base">2. Produk & Kategori</h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Di menu ini semua urusan produk ada di sini.
            </p>
            <div className="space-y-3">
              <div>
                <strong className="text-brand-darkBg font-bold text-xs block">Tambah Produk:</strong>
                <span className="text-gray-500 text-[11px] leading-relaxed">
                  Kalau mau nambah produk baru, tinggal isi: Nama produk, Kategori, Upload gambar, Deskripsi atau spesifikasi. Kalau udah lengkap, tinggal klik <strong>Simpan Produk</strong>.
                </span>
              </div>
              <div>
                <strong className="text-brand-darkBg font-bold text-xs block">Tambah Kategori:</strong>
                <span className="text-gray-500 text-[11px] leading-relaxed">
                  Kalau butuh kategori baru, misalnya "Towing Tractor", tinggal ketik nama kategorinya lalu klik <strong>Tambah</strong>. Nanti kategorinya langsung bisa dipilih pas bikin produk baru.
                </span>
              </div>
              <div>
                <strong className="text-brand-darkBg font-bold text-xs block">Hapus Produk atau Kategori:</strong>
                <span className="text-gray-500 text-[11px] leading-relaxed">
                  Kalau ada yang udah nggak kepake, tinggal klik tombol tong sampah di samping produk atau kategori yang mau dihapus.
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Kelola Konten */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-brand-darkBg font-display font-bold text-base">3. Kelola Konten Website</h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Di menu ini lu bisa ngatur isi website biar tampilannya makin lengkap:
            </p>
            <div className="space-y-2 text-xs text-gray-600 pl-4 list-disc">
              <div>
                <strong>Layanan:</strong> Tambah layanan baru, misalnya Rental Bulanan, Servis Rutin, atau Sparepart. Tinggal upload gambar ikon atau fotonya, nggak perlu ribet ngoding.
              </div>
              <div>
                <strong>Testimoni:</strong> Masukin ulasan dari customer lengkap sama nama perusahaan dan rating bintangnya supaya calon pembeli makin percaya.
              </div>
              <div>
                <strong>Galeri:</strong> Upload foto-foto kegiatan perusahaan, misalnya serah terima unit, pengiriman forklift, atau dokumentasi servis di lapangan.
              </div>
              <div>
                <strong>Partner:</strong> Upload logo partner yang kerja sama sama perusahaan, misalnya Toyota, Noblelift, atau Heli.
              </div>
              <div>
                <strong>Keunggulan:</strong> Tambahin kelebihan perusahaan, misalnya Garansi 2 Tahun, Teknisi Siaga, atau Sparepart Lengkap, terus kasih penjelasan singkat.
              </div>
            </div>
          </div>

          {/* Card 4: Customer Leads */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-brand-darkBg font-display font-bold text-base">4. Customer Leads</h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Semua orang yang ngisi form di website bakal masuk ke menu ini.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              <li>
                <strong className="text-brand-darkBg font-bold">Hubungi WhatsApp:</strong> Klik tombol <strong>Hubungi WA</strong>, nanti langsung kebuka WhatsApp dengan pesan penawaran yang udah otomatis dibuat.
              </li>
              <li>
                <strong className="text-brand-darkBg font-bold">Export Data:</strong> Kalau mau simpan semua data customer ke Excel, tinggal klik <strong>Export CSV</strong>.
              </li>
              <li>
                <strong className="text-brand-darkBg font-bold">Hapus Leads:</strong> Kalau datanya udah selesai diproses atau cuma data percobaan, tinggal hapus aja pakai tombol tong sampah.
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-brand-darkBg font-display font-bold text-base sm:text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
            <QuestionIcon className="w-5 h-5 text-brand-blue" />
            <span>Tanya Jawab (FAQ)</span>
          </h3>
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <h4 className="font-bold text-brand-darkBg">Q: Kenapa produk bawaan nggak bisa dihapus?</h4>
              <p className="text-gray-500 leading-relaxed">A: Karena produk itu berasal dari database utama perusahaan, jadi memang dikunci supaya katalog tetap sinkron. Yang bisa dihapus cuma produk yang lu tambahin sendiri.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-brand-darkBg">Q: Gung, kok foto galeri yang gue upload nggak muncul?</h4>
              <p className="text-gray-500 leading-relaxed">
                A: Biasanya uploadnya belum berhasil atau belum disimpan. Pastikan dulu: Preview fotonya udah muncul, setelah itu baru klik <strong>Simpan</strong>. Saran gue, pakai file JPG atau PNG dengan ukuran di bawah 1 MB biar upload lebih lancar dan browser nggak berat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-16 border-t border-gray-200 pt-6">
        &copy; 2026 PT Denko Wahana Sakti. Administrator Dashboard Panel.
      </footer>
    </div>
  );
}
