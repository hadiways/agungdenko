"use client";

import { useState } from "react";
import { PRODUCTS_DATA } from "@/data/products";
import { UploadCloud, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: form.name.toLowerCase().replace(/\s+/g, "-"),
      name: form.name,
      image: "/images/products/forklift-electric.jpg", // default thumbnail
      category: form.category,
      description: form.description,
    };
    setProducts([newProduct, ...products]);
    setForm({ name: "", category: "", description: "" });
    alert("Produk berhasil ditambahkan ke katalog session!");
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Manajemen Produk</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola katalog forklift dan alat berat PT Denko Wahana Sakti.</p>
          </div>
        </div>

        {/* Main Layout: Form Left, Active Products Right */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form upload produk */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6 h-fit">
            <h3 className="text-brand-darkBg font-display font-bold text-lg border-b border-gray-100 pb-4">Tambah Produk Baru</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Nama Produk</label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Contoh: Forklift Electric Noblelift"
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                />
              </div>
              
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Kategori</label>
                <select
                  id="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="Forklift">Forklift</option>
                  <option value="Reach Truck">Reach Truck</option>
                  <option value="Stacker">Stacker</option>
                  <option value="Pallet">Pallet</option>
                  <option value="Aerial Work Platform">Aerial Work Platform</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Upload Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-blue transition-colors cursor-pointer group">
                  <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-brand-blue transition-colors mb-2" />
                  <span className="text-xs text-gray-500 font-semibold group-hover:text-brand-blue transition-colors">Pilih file gambar</span>
                  <span className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Deskripsi Produk</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tuliskan spesifikasi, keunggulan, dan deskripsi produk..."
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150"
              >
                Simpan Produk
              </button>
            </form>
          </div>

          {/* Active products grid */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-brand-darkBg font-display font-bold text-lg">Katalog Saat Ini</h3>
              <span className="text-xs font-semibold bg-brand-blue/15 text-brand-blue px-3 py-1 rounded-full">
                {products.length} Produk Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group">
                  <div className="w-20 h-20 rounded-xl bg-brand-lightBg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-brand-blue font-bold text-[9px] uppercase tracking-wider bg-brand-blue/10 px-2 py-0.5 rounded">{p.category}</span>
                    <h4 className="text-brand-darkBg font-bold text-sm truncate mt-1.5">{p.name}</h4>
                    <p className="text-gray-400 text-xs truncate mt-0.5">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
