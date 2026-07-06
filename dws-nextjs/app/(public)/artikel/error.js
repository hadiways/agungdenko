"use client";

import { useEffect } from "react";

export default function ArtikelError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-6 py-32 text-center max-w-md space-y-6">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="text-brand-darkBg font-display font-extrabold text-2xl">Terjadi Kesalahan</h2>
        <p className="text-gray-500 text-sm">Gagal memuat artikel dari Sanity CMS. Pastikan koneksi atau konfigurasi project ID benar.</p>
      </div>
      <button
        onClick={() => reset()}
        className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
