"use client";

import { useEffect } from "react";
import { 
  HelpCircle, 
  BookOpen, 
  Package, 
  Sliders, 
  Users, 
  Info, 
  CheckCircle,
  FileText
} from "lucide-react";

export default function AdminHelpPage() {
  useEffect(() => {
    document.title = "DWS Admin | Panduan Pengguna";
  }, []);

  const sections = [
    {
      title: "1. Ringkasan Dashboard (Beranda)",
      icon: BookOpen,
      desc: "Halaman pertama yang Anda lihat saat masuk. Di sini menampilkan data real-time bisnis Anda:",
      points: [
        "Total Produk: Jumlah total produk aktif (gabungan dari CMS Sanity + produk lokal yang Anda tambahkan).",
        "Total Leads: Jumlah total formulir permintaan penawaran harga yang dikirim oleh calon pembeli melalui website.",
        "Aktivitas Leads Terbaru: Daftar 3 calon pembeli terbaru yang meminta penawaran harga.",
        "Profil Sales: Formulir di bagian bawah untuk mengganti Nama, Jabatan, Nomor WhatsApp, dan Foto Anda secara instan di website."
      ]
    },
    {
      title: "2. Manajemen Produk & Kategori",
      icon: Package,
      desc: "Menu untuk mengelola forklift dan alat berat yang tampil di halaman Katalog Produk:",
      points: [
        "Tambah Produk Baru: Isi Nama Produk, pilih Kategori, unggah Gambar Produk, isi deskripsi spesifikasi, lalu klik 'Simpan Produk'.",
        "Kelola Kategori: Terdapat di bawah formulir produk. Anda dapat mengetik kategori baru (misal: Towing Tractor) lalu klik 'Tambah'. Kategori ini akan langsung muncul sebagai opsi saat menambah produk baru.",
        "Menghapus Produk/Kategori: Klik tombol tempat sampah (merah) di samping produk kustom atau kategori untuk menghapusnya secara instan."
      ]
    },
    {
      title: "3. Kelola Konten Tambahan",
      icon: Sliders,
      desc: "Menu utama untuk menyesuaikan elemen-elemen informasi pendukung di halaman depan website:",
      points: [
        "Layanan: Tambahkan layanan baru seperti 'Rental Bulanan' atau 'Servis Rutin' dengan mengunggah gambar icon (SVG, PNG, atau JPG) tanpa perlu mengetik kode HTML/SVG secara manual.",
        "Testimoni: Masukkan ulasan kepuasan pelanggan, nama perusahaan, serta rating bintang (1-5) untuk membangun kepercayaan pembeli.",
        "Galeri Kegiatan: Unggah foto-foto serah terima unit, pengiriman forklift, atau kegiatan servis di lapangan sebagai dokumentasi resmi.",
        "Partner Resmi: Unggah logo-logo merk partner (seperti Toyota, Noblelift, Heli) yang bekerjasama dengan PT Denko Wahana Sakti.",
        "Keunggulan Utama: Tambahkan nilai tambah perusahaan Anda (misal: Garansi 2 Tahun, Teknisi Siaga) beserta gambaran penjelasannya."
      ]
    },
    {
      title: "4. Customer Leads (Daftar Permintaan)",
      icon: Users,
      desc: "Menu untuk melihat, mengelola, dan memproses calon pembeli yang mengirimkan pesan dari form website:",
      points: [
        "Hubungi WA: Klik tombol hijau 'Hubungi WA' untuk langsung membuka WhatsApp chat ke nomor handphone calon pembeli dengan teks penawaran yang sudah terisi otomatis.",
        "Ekspor CSV: Klik tombol 'Ekspor CSV' di kanan atas untuk mengunduh semua data pembeli ke dalam file Excel/CSV untuk keperluan arsip kantor.",
        "Hapus Leads: Anda dapat menghapus log leads yang sudah selesai diproses atau log tes menggunakan tombol tempat sampah merah."
      ]
    }
  ];

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-brand-blue" />
            <span>Panduan Penggunaan Admin Panel</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Petunjuk operasional admin panel PT Denko Wahana Sakti dalam bahasa sederhana non-teknis.</p>
        </div>

        {/* Tip Alert */}
        <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-4 flex gap-3 items-start">
          <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
          <div className="text-xs text-brand-darkBg leading-relaxed">
            <strong className="font-bold">Tips Penyimpanan Kunci:</strong> Seluruh data produk lokal, profil sales, kategori kustom, dan ulasan disimpan secara aman di memori lokal peramban (*browser local storage*). Data Anda aman dari hacker luar dan tidak akan hilang kecuali Anda membersihkan data cache browser (*clear browser data*).
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-brand-darkBg font-display font-bold text-sm sm:text-base">{section.title}</h3>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{section.desc}</p>
                <ul className="space-y-2.5">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-2.5 items-start text-xs text-gray-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-brand-darkBg font-display font-bold text-base sm:text-lg border-b border-gray-100 pb-3">Tanya Jawab Umum (FAQ)</h3>
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-brand-darkBg">Q: Mengapa produk default dari pusat tidak bisa dihapus?</h4>
              <p className="text-gray-500 leading-relaxed">A: Produk bawaan pusat bersumber dari server database Sanity CMS utama PT Denko Wahana Sakti agar menjamin katalog dasar Anda selalu sinkron dengan pusat. Anda hanya bisa menambah produk kustom Anda sendiri atau menghapus produk kustom buatan Anda.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-brand-darkBg">Q: Saya menambahkan foto galeri baru, tapi kenapa tidak muncul?</h4>
              <p className="text-gray-500 leading-relaxed">A: Pastikan foto berhasil terunggah dan muncul pratampilnya (*preview*) di form admin sebelum menekan tombol simpan. Dianjurkan menggunakan file gambar (.jpg / .png / .svg) dengan resolusi sedang (di bawah 1MB) agar tidak membebani memori peramban.</p>
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
