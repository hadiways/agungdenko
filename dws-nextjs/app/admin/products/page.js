"use client";

import { useState, useEffect } from "react";
import { UploadCloud, Trash2, Pencil, X, CheckCircle2 } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "Forklifts",
    description: "",
    image: "",
    imageFile: null
  });

  // Dynamically derive registered categories from current products list
  const categoriesList = Array.from(new Set([
    "Forklifts",
    "Electric Stackers",
    "Hand Pallet Trucks",
    "Scissor Lifts & Aerial Work Platforms",
    ...products.map(p => p.category)
  ].filter(Boolean))).map((name, index) => ({ id: index + 1, name }));

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://agungdenko.asia/api";
      const response = await fetch(`${apiUrl}/products`, { cache: "no-store" });
      const result = await response.json();
      if (response.ok) {
        const list = result.data || result;
        if (Array.isArray(list)) {
          setProducts(list.map(p => {
            const catName = p.category ? (typeof p.category === "object" ? (p.category.name || "Forklifts") : p.category) : "Forklifts";
            return {
              id: p.id,
              name: p.name || "",
              category: catName,
              category_id: p.category_id || (p.category ? p.category.id : 1),
              image: p.thumbnail || p.image || "/images/products/forklift-electric.jpg",
              description: p.short_description || p.description || "",
              isCustom: true
            };
          }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch products for admin", err);
    }
  };

  useEffect(() => {
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
          imageFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category || "Forklifts",
      description: product.description,
      image: product.image,
      imageFile: null
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      category: "Forklifts",
      description: "",
      image: "",
      imageFile: null
    });
  };

  const sanitizeInput = (str) => {
    if (typeof str !== "string") return str;
    let cleaned = str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
    cleaned = cleaned.replace(/on\w+\s*=\s*(['"])[^\1]*?\1/gi, "");
    cleaned = cleaned.replace(/<[^>]*>/g, "");
    return cleaned.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("dws_admin_token");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://agungdenko.asia/api";

    const matchedCat = categoriesList.find(c => c.name.toLowerCase() === form.category.toLowerCase());
    const categoryId = matchedCat ? matchedCat.id : 1;

    const formData = new FormData();
    formData.append("name", sanitizeInput(form.name));
    formData.append("category_id", categoryId);
    formData.append("category_name", form.category);
    formData.append("description", sanitizeInput(form.description));
    formData.append("short_description", sanitizeInput(form.description).slice(0, 150));
    
    if (form.imageFile) {
      formData.append("thumbnail", form.imageFile);
    }

    try {
      let url = `${apiUrl}/products`;
      let headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      };

      if (editingProduct) {
        url = `${apiUrl}/products/${editingProduct.id}`;
        formData.append("_method", "PUT");
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await response.json();

      if (response.ok && (result.success || result.data || result.id)) {
        showToast(editingProduct ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!");
        handleCancelEdit();
        loadAllProducts();
      } else {
        const errorMsg = result.message || (editingProduct ? "Gagal memperbarui produk." : "Gagal menambahkan produk.");
        showToast(errorMsg, "error");
      }
    } catch (err) {
      console.error("Submit product error:", err);
      showToast("Terjadi kesalahan koneksi ke server.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      const token = localStorage.getItem("dws_admin_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://agungdenko.asia/api";

      try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          }
        });

        const result = await response.json();
        if (response.ok && result.success) {
          showToast("Produk berhasil dihapus!");
          if (editingProduct?.id === id) {
            handleCancelEdit();
          }
          loadAllProducts();
        } else {
          showToast(result.message || "Gagal menghapus produk.", "error");
        }
      } catch (err) {
        console.error("Delete product error:", err);
        showToast("Gagal terhubung ke API backend.", "error");
      }
    }
  };

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 ${
          toastMessage.type === "error" 
            ? "bg-red-50 text-red-700 border-red-200" 
            : "bg-green-50 text-green-700 border-green-200"
        }`}>
          <CheckCircle2 size={16} />
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="space-y-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Manajemen Produk</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola katalog forklift dan alat berat PT Denko Wahana Sakti secara dinamis via Laravel API.</p>
          </div>
        </div>

        {/* Main Layout: Form Left, Active Products Right */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form upload / edit produk */}
          <div className="space-y-6 h-fit">
            <div className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 space-y-6 h-fit ${
              editingProduct ? "border-brand-blue ring-2 ring-brand-blue/10" : "border-gray-100"
            }`}>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-brand-darkBg font-display font-bold text-lg">
                  {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                </h3>
                {editingProduct && (
                  <span className="text-[10px] bg-brand-blue/10 text-brand-blue border border-brand-blue/20 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Mode Edit
                  </span>
                )}
              </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-500 text-xs font-bold uppercase mb-2">
                  Gambar Produk {editingProduct && <span className="normal-case text-gray-400 font-normal">(Opsional jika tidak diganti)</span>}
                </label>
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-blue transition-colors cursor-pointer group relative overflow-hidden min-h-[140px]">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  {form.image ? (
                    <div className="w-full h-28 flex flex-col items-center justify-center gap-2">
                      <img src={form.image} alt="Preview" className="max-h-20 max-w-full object-contain" />
                      <span className="text-[10px] text-brand-blue font-bold group-hover:underline">Klik untuk mengganti gambar</span>
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

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150 ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {isSubmitting 
                    ? (editingProduct ? "Updating..." : "Menyimpan...") 
                    : (editingProduct ? "Update Produk" : "Simpan Produk Kustom")
                  }
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                    className="px-5 border border-gray-200 hover:bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
            </div>

            {/* Manage Categories Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 h-fit">
              <h3 className="text-brand-darkBg font-display font-bold text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Kategori Terdaftar (Laravel API)</span>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                  {categoriesList.length} Total
                </span>
              </h3>
              
              {/* List Categories */}
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {categoriesList.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <span className="text-xs text-gray-700 font-semibold">{cat.name}</span>
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
              {products.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12 text-sm bg-white rounded-2xl border border-gray-100">
                  Belum ada produk tersedia.
                </div>
              ) : (
                products.map((p) => {
                const isSelectedForEdit = editingProduct?.id === p.id;

                return (
                  <div 
                    key={p.id} 
                    className={`bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group ${
                      isSelectedForEdit 
                        ? "border-brand-blue ring-2 ring-brand-blue/20 bg-blue-50/30" 
                        : "border-gray-100"
                    }`}
                  >
                    <div className="w-20 h-20 rounded-xl bg-brand-lightBg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
                      <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-brand-blue font-bold text-[9px] uppercase tracking-wider bg-brand-blue/10 px-2 py-0.5 rounded">{p.category}</span>
                      </div>
                      <h4 className="text-brand-darkBg font-bold text-sm truncate mt-1.5">{p.name}</h4>
                      <p className="text-gray-400 text-xs truncate mt-0.5">{p.description}</p>
                    </div>

                    {/* Action buttons: Edit & Delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditClick(p)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          isSelectedForEdit 
                            ? "bg-brand-blue text-white" 
                            : "text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10"
                        }`}
                        title="Edit Produk"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }))}
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
