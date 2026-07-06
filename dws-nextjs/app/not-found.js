import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-darkBg text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 bg-brand-blue/15 text-brand-blueLight rounded-3xl flex items-center justify-center shadow-xl border border-white/5">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-5xl font-display font-extrabold text-white">404</h1>
        <h2 className="text-xl font-bold text-gray-300">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
      </div>

      <Link
        href="/"
        className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-colors inline-block"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
