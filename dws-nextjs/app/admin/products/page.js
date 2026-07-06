"use client";

import { useState, useEffect } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { PRODUCTS_QUERY } from "@/lib/sanity/queries";
import { UploadCloud, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);

  const DEFAULT_CATEGORIES = [
    "Forklift Diesel",
    "Forklift Electric",
    "Reach Truck",
    "Stacker",
    "Hand Pallet",
    "Scissor Lift",
    "Wheel Loader"
  ];
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
  });

  // Load custom products, categories from localStorage and default products from Sanity CMS on mount
  useEffect(() => {
    async function loadAllProducts() {
      try {
        const cmsProducts = await sanityFetch(PRODUCTS_QUERY);
        const baseProducts = cmsProducts || [];

        const saved = localStorage.getItem("custom_products");
        if (saved) {
          try {
            const custom = JSON.parse(saved);
            setCustomProducts(custom);
            setProducts([...custom, ...baseProducts]);
          } catch (e) {
            console.error("Failed to parse custom products", e);
            setProducts(baseProducts);
          }
        } else {
          setProducts(baseProducts);
        }

        const savedCats = localStorage.getItem("product_categories");
        if (savedCats) {
          try {
            setCategories(JSON.parse(savedCats));
          } catch (e) {
            console.error("Failed to parse categories", e);
          }
        } else {
          localStorage.setItem("product_categories", JSON.stringify(DEFAULT_CATEGORIES));
        }
      } catch (err) {
        console.error("Failed to fetch products for admin", err);
      }
    }
    loadAllProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sanitizeInput = (str) => {
    if (typeof str !== "string") return str;
    let cleaned = str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
    cleaned = cleaned.replace(/on\w+\s*=\s*(['"])[^\1]*?\1/gi, "");
    cleaned = cleaned.replace(/<[^>]*>/g, "");
    return cleaned.trim();
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    const sanitized = sanitizeInput(newCategory.trim());
    if (categories.includes(sanitized)) {
      alert("Kategori sudah terdaftar.");
      return;
    }
    const updated = [...categories, sanitized];
    setCategories(updated);
    localStorage.setItem("product_categories", JSON.stringify(updated));
    setNewCategory("");
    alert("Kategori baru berhasil ditambahkan!");
  };

  const handleDeleteCategory = (catToDelete) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${catToDelete}"?`)) {
      const updated = categories.filter(c => c !== catToDelete);
      setCategories(updated);
      localStorage.setItem("product_categories", JSON.stringify(updated));
      alert("Kategori berhasil dihapus!");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const sanitizedName = sanitizeInput(form.name);
    const newProduct = {
      id: "custom-" + Date.now() + "-" + sanitizedName.toLowerCase().replace(/\s+/g, "-"),
      name: sanitizedName,
      image: form.image || "/images/products/forklift-electric.jpg", // default fallback thumbnail
      category: sanitizeInput(form.category),
      description: sanitizeInput(form.description),
      isCustom: true, // mark to identify custom items
    };

    const updatedCustom = [newProduct, ...customProducts];
    setCustomProducts(updatedCustom);
    const defaultProducts = products.filter(p => !p.isCustom);
    setProducts([...updatedCustom, ...defaultProducts]);
    localStorage.setItem("custom_products", JSON.stringify(updatedCustom));

    setForm({ name: "", category: "", description: "", image: "" });
    alert("Produk berhasil ditambahkan ke katalog dinamis!");
  };

  const handleDeleteProduct = (id) => {
    const targetProduct = products.find((p) => p.id === id);
    if (!targetProduct) return;

    if (!targetProduct.isCustom) {
      alert("Produk bawaan sistem (default) tidak dapat dihapus.");
      return;
    }

    if (confirm("Apakah Anda yakin ingin menghapus produk kustom ini?")) {
      const updatedCustom = customProducts.filter((p) => p.id !== id);
      setCustomProducts(updatedCustom);
      const defaultProducts = products.filter((p) => !p.isCustom);
      setProducts([...updatedCustom, ...defaultProducts]);
      localStorage.setItem("custom_products", JSON.stringify(updatedCustom));
      alert("Produk berhasil dihapus!");
    }
  };

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Manajemen Produk</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola katalog forklift dan alat berat PT Denko Wahana Sakti secara dinamis (tanpa database).</p>
          </div>
        </div>

        {/* Main Layout: Form Left, Active Products Right */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form upload produk */}
          <div className="space-y-6 h-fit">
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
                  placeholder="Contoh: Forklift Electric Noblelift 2 Ton"
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                />
              </div>
              
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Kategori</label>
                <select
                  id="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Upload Gambar Produk</label>
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-blue transition-colors cursor-pointer group relative overflow-hidden min-h-[140px]">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  {form.image ? (
                    <div className="w-full h-24 flex items-center justify-center">
                      <img src={form.image} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-brand-blue transition-colors mb-2" />
                      <span className="text-xs text-gray-500 font-semibold group-hover:text-brand-blue transition-colors">Pilih file gambar</span>
                      <span className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Deskripsi Produk</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tuliskan spesifikasi lengkap, keunggulan, dan detail lainnya..."
                  required
                  className="w-full bg-brand-lightBg border border-gray-200 rounded-xl p-4 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150"
              >
                Simpan Produk Kustom
              </button>
            </form>
            </div>

            {/* Manage Categories Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 h-fit">
              <h3 className="text-brand-darkBg font-display font-bold text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Kelola Kategori</span>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                  {categories.length} Total
                </span>
              </h3>
              
              {/* Form Add */}
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Kategori Baru..."
                  className="flex-1 bg-brand-lightBg border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                />
                <button type="submit" className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                  Tambah
                </button>
              </form>

              {/* List Categories */}
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <span className="text-xs text-gray-700 font-semibold">{cat}</span>
                    <button type="button" onClick={() => handleDeleteCategory(cat)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
                  <div className="w-20 h-20 rounded-xl bg-brand-lightBg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-brand-blue font-bold text-[9px] uppercase tracking-wider bg-brand-blue/10 px-2 py-0.5 rounded">{p.category}</span>
                      {p.isCustom && (
                        <span className="text-green-600 font-bold text-[9px] uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded">Kustom</span>
                      )}
                    </div>
                    <h4 className="text-brand-darkBg font-bold text-sm truncate mt-1.5">{p.name}</h4>
                    <p className="text-gray-400 text-xs truncate mt-0.5">{p.description}</p>
                  </div>
                  {p.isCustom ? (
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-300 font-semibold px-2 py-1 select-none">System</span>
                  )}
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
