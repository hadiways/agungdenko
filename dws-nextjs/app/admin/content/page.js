"use client";

import { useState, useEffect } from "react";
import { Sliders, Wrench, MessageSquare, Image as ImageIcon, Users2, ShieldCheck, Trash2, PlusCircle, UploadCloud } from "lucide-react";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("services");

  // Local Storage states
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [partners, setPartners] = useState([]);
  const [features, setFeatures] = useState([]);

  // Form states
  const [serviceForm, setServiceForm] = useState({ title: "", icon: "" });
  const [testimonialForm, setTestimonialForm] = useState({ company: "", rating: 5, comment: "" });
  const [galleryForm, setGalleryForm] = useState({ title: "", image: "" });
  const [partnerForm, setPartnerForm] = useState({ name: "", logo: "" });
  const [featureForm, setFeatureForm] = useState({ title: "", icon: "", description: "" });

  // Load from local storage on mount
  useEffect(() => {
    setServices(JSON.parse(localStorage.getItem("custom_services") || "[]"));
    setTestimonials(JSON.parse(localStorage.getItem("custom_testimonials") || "[]"));
    setGallery(JSON.parse(localStorage.getItem("custom_gallery") || "[]"));
    setPartners(JSON.parse(localStorage.getItem("custom_partners") || "[]"));
    setFeatures(JSON.parse(localStorage.getItem("custom_features") || "[]"));
  }, []);

  // Sanitizer helper
  const sanitizeInput = (str) => {
    if (typeof str !== "string") return str;
    let cleaned = str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
    cleaned = cleaned.replace(/on\w+\s*=\s*(['"])[^\1]*?\1/gi, "");
    cleaned = cleaned.replace(/<[^>]*>/g, "");
    return cleaned.trim();
  };

  // Add handlers
  const handleAddService = (e) => {
    e.preventDefault();
    const newService = {
      _id: "custom-service-" + Date.now(),
      title: sanitizeInput(serviceForm.title),
      icon: serviceForm.icon.trim(), // Keep raw SVG structure but sanitize inside if needed
      isCustom: true
    };
    const updated = [newService, ...services];
    setServices(updated);
    localStorage.setItem("custom_services", JSON.stringify(updated));
    setServiceForm({ title: "", icon: "" });
    alert("Layanan berhasil ditambahkan!");
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    const newTestimonial = {
      _id: "custom-testimonial-" + Date.now(),
      company: sanitizeInput(testimonialForm.company),
      rating: parseInt(testimonialForm.rating) || 5,
      comment: sanitizeInput(testimonialForm.comment),
      isCustom: true
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem("custom_testimonials", JSON.stringify(updated));
    setTestimonialForm({ company: "", rating: 5, comment: "" });
    alert("Testimoni berhasil ditambahkan!");
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    if (!galleryForm.image) {
      alert("Silakan unggah foto terlebih dahulu.");
      return;
    }
    const newItem = {
      _id: "custom-gallery-" + Date.now(),
      title: sanitizeInput(galleryForm.title),
      image: galleryForm.image,
      isCustom: true
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    localStorage.setItem("custom_gallery", JSON.stringify(updated));
    setGalleryForm({ title: "", image: "" });
    alert("Foto galeri berhasil ditambahkan!");
  };

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (!partnerForm.logo) {
      alert("Silakan unggah logo brand terlebih dahulu.");
      return;
    }
    const newPartner = {
      _id: "custom-partner-" + Date.now(),
      name: sanitizeInput(partnerForm.name),
      logo: partnerForm.logo,
      isCustom: true
    };
    const updated = [newPartner, ...partners];
    setPartners(updated);
    localStorage.setItem("custom_partners", JSON.stringify(updated));
    setPartnerForm({ name: "", logo: "" });
    alert("Partner berhasil ditambahkan!");
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    const newFeature = {
      _id: "custom-feature-" + Date.now(),
      title: sanitizeInput(featureForm.title),
      icon: featureForm.icon.trim(),
      description: sanitizeInput(featureForm.description),
      isCustom: true
    };
    const updated = [newFeature, ...features];
    setFeatures(updated);
    localStorage.setItem("custom_features", JSON.stringify(updated));
    setFeatureForm({ title: "", icon: "", description: "" });
    alert("Keunggulan berhasil ditambahkan!");
  };

  // Image uploads to Base64 helpers
  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePartnerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPartnerForm(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete handlers
  const handleDelete = (type, id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konten ini?")) return;

    if (type === "services") {
      const updated = services.filter(item => item._id !== id);
      setServices(updated);
      localStorage.setItem("custom_services", JSON.stringify(updated));
    } else if (type === "testimonials") {
      const updated = testimonials.filter(item => item._id !== id);
      setTestimonials(updated);
      localStorage.setItem("custom_testimonials", JSON.stringify(updated));
    } else if (type === "gallery") {
      const updated = gallery.filter(item => item._id !== id);
      setGallery(updated);
      localStorage.setItem("custom_gallery", JSON.stringify(updated));
    } else if (type === "partners") {
      const updated = partners.filter(item => item._id !== id);
      setPartners(updated);
      localStorage.setItem("custom_partners", JSON.stringify(updated));
    } else if (type === "features") {
      const updated = features.filter(item => item._id !== id);
      setFeatures(updated);
      localStorage.setItem("custom_features", JSON.stringify(updated));
    }
    alert("Konten berhasil dihapus!");
  };

  // Tab definitions
  const tabs = [
    { id: "services", label: "Layanan", icon: Wrench },
    { id: "testimonials", label: "Testimoni", icon: MessageSquare },
    { id: "gallery", label: "Galeri Kegiatan", icon: ImageIcon },
    { id: "partners", label: "Partner Resmi", icon: Users2 },
    { id: "features", label: "Keunggulan Utama", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8 flex flex-col justify-between min-h-[80vh]">
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-brand-darkBg font-display font-extrabold text-2xl md:text-3xl">Kelola Konten Website</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola konten tambahan, layanan, ulasan pelanggan, galeri, dan logo partner resmi secara mandiri.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          
          {/* TAB 1: SERVICES */}
          {activeTab === "services" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Add */}
              <div className="space-y-4">
                <h3 className="text-brand-darkBg font-display font-bold text-base flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-brand-blue" />
                  <span>Tambah Layanan</span>
                </h3>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Nama Layanan</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="Contoh: Sewa Harian Forklift"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Struktur SVG Icon (HTML)</label>
                    <textarea
                      required
                      rows="4"
                      value={serviceForm.icon}
                      onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                      placeholder="Masukkan tag <svg>...</svg>"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[10px] font-mono focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase py-2.5 rounded-lg">
                    Tambah Layanan
                  </button>
                </form>
              </div>

              {/* List View */}
              <div className="lg:col-span-2 space-y-4 border-l border-gray-100 pl-0 lg:pl-8">
                <h3 className="text-brand-darkBg font-display font-bold text-base">Daftar Layanan Kustom</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {services.length > 0 ? (
                    services.map((item) => (
                      <div key={item._id} className="p-4 border border-gray-150 rounded-2xl flex items-center justify-between gap-3 bg-gray-50/50">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                          <span className="text-xs font-bold text-brand-darkBg">{item.title}</span>
                        </div>
                        <button onClick={() => handleDelete("services", item._id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs col-span-full">Belum ada layanan kustom yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Add */}
              <div className="space-y-4">
                <h3 className="text-brand-darkBg font-display font-bold text-base flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-brand-blue" />
                  <span>Tambah Testimoni</span>
                </h3>
                <form onSubmit={handleAddTestimonial} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Nama Perusahaan / Client</label>
                    <input
                      type="text"
                      required
                      value={testimonialForm.company}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                      placeholder="Contoh: PT Semen Indonesia"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Rating Bintang (1-5)</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                    >
                      <option value="5">5 Bintang (Sangat Puas)</option>
                      <option value="4">4 Bintang</option>
                      <option value="3">3 Bintang</option>
                      <option value="2">2 Bintang</option>
                      <option value="1">1 Bintang</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Ulasan / Review</label>
                    <textarea
                      required
                      rows="3"
                      value={testimonialForm.comment}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })}
                      placeholder="Masukkan ulasan ulasan positif klien..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase py-2.5 rounded-lg">
                    Tambah Testimoni
                  </button>
                </form>
              </div>

              {/* List View */}
              <div className="lg:col-span-2 space-y-4 border-l border-gray-100 pl-0 lg:pl-8">
                <h3 className="text-brand-darkBg font-display font-bold text-base">Daftar Testimoni Kustom</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {testimonials.length > 0 ? (
                    testimonials.map((item) => (
                      <div key={item._id} className="p-4 border border-gray-150 rounded-2xl flex items-start justify-between gap-4 bg-gray-50/50">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-yellow-500">★ {item.rating} Bintang</span>
                          <h4 className="text-xs font-bold text-brand-darkBg">{item.company}</h4>
                          <p className="text-gray-500 text-xs italic">"{item.comment}"</p>
                        </div>
                        <button onClick={() => handleDelete("testimonials", item._id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">Belum ada testimoni kustom yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Add */}
              <div className="space-y-4">
                <h3 className="text-brand-darkBg font-display font-bold text-base flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-brand-blue" />
                  <span>Tambah Foto Kegiatan</span>
                </h3>
                <form onSubmit={handleAddGallery} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Judul / Keterangan Foto</label>
                    <input
                      type="text"
                      required
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      placeholder="Contoh: Pengiriman Forklift ke Cikarang"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Pilih Foto (Maks 1MB)</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500 block">Pilih berkas dari komputer</span>
                    </div>
                    {galleryForm.image && (
                      <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                        <img src={galleryForm.image} alt="Upload preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase py-2.5 rounded-lg">
                    Simpan Foto Galeri
                  </button>
                </form>
              </div>

              {/* List View */}
              <div className="lg:col-span-2 space-y-4 border-l border-gray-100 pl-0 lg:pl-8">
                <h3 className="text-brand-darkBg font-display font-bold text-base">Daftar Foto Galeri Kustom</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {gallery.length > 0 ? (
                    gallery.map((item) => (
                      <div key={item._id} className="relative rounded-xl overflow-hidden aspect-[4/3] border border-gray-200 group bg-black">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDelete("gallery", item._id)} className="self-end bg-red-500 hover:bg-red-700 text-white p-1.5 rounded-lg transition-colors shadow">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] text-white font-semibold truncate">{item.title}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs col-span-full">Belum ada foto galeri yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PARTNERS */}
          {activeTab === "partners" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Add */}
              <div className="space-y-4">
                <h3 className="text-brand-darkBg font-display font-bold text-base flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-brand-blue" />
                  <span>Tambah Partner Brand</span>
                </h3>
                <form onSubmit={handleAddPartner} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Nama Brand / Partner</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      placeholder="Contoh: TOYOTA"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Unggah Logo Brand (Maks 500KB)</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePartnerUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500 block">Pilih berkas logo</span>
                    </div>
                    {partnerForm.logo && (
                      <div className="mt-3 relative w-full h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 p-2 flex items-center justify-center">
                        <img src={partnerForm.logo} alt="Upload preview" className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                  </div>
                  <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase py-2.5 rounded-lg">
                    Tambah Partner
                  </button>
                </form>
              </div>

              {/* List View */}
              <div className="lg:col-span-2 space-y-4 border-l border-gray-100 pl-0 lg:pl-8">
                <h3 className="text-brand-darkBg font-display font-bold text-base">Daftar Partner Resmi</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {partners.length > 0 ? (
                    partners.map((item) => (
                      <div key={item._id} className="p-3 border border-gray-150 rounded-2xl flex items-center justify-between gap-3 bg-gray-55/30 hover:shadow-sm transition-shadow">
                        <div className="h-10 w-24 flex items-center justify-center overflow-hidden">
                          <img src={item.logo} alt={item.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <button onClick={() => handleDelete("partners", item._id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs col-span-full">Belum ada partner resmi kustom yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FEATURES */}
          {activeTab === "features" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Add */}
              <div className="space-y-4">
                <h3 className="text-brand-darkBg font-display font-bold text-base flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-brand-blue" />
                  <span>Tambah Keunggulan</span>
                </h3>
                <form onSubmit={handleAddFeature} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Judul Keunggulan</label>
                    <input
                      type="text"
                      required
                      value={featureForm.title}
                      onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                      placeholder="Contoh: Jaminan Kualitas"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Struktur SVG Icon (HTML)</label>
                    <textarea
                      required
                      rows="3"
                      value={featureForm.icon}
                      onChange={(e) => setFeatureForm({ ...featureForm, icon: e.target.value })}
                      placeholder="Masukkan tag <svg>...</svg>"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[10px] font-mono focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Deskripsi Singkat</label>
                    <textarea
                      required
                      rows="2"
                      value={featureForm.description}
                      onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                      placeholder="Contoh: Unit bergaransi resmi langsung distributor."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs focus:outline-none focus:border-brand-blue"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase py-2.5 rounded-lg">
                    Tambah Keunggulan
                  </button>
                </form>
              </div>

              {/* List View */}
              <div className="lg:col-span-2 space-y-4 border-l border-gray-100 pl-0 lg:pl-8">
                <h3 className="text-brand-darkBg font-display font-bold text-base">Daftar Keunggulan Kustom</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {features.length > 0 ? (
                    features.map((item) => (
                      <div key={item._id} className="p-4 border border-gray-150 rounded-2xl flex items-start justify-between gap-4 bg-gray-55/30">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                          <div>
                            <h4 className="text-xs font-bold text-brand-darkBg">{item.title}</h4>
                            <p className="text-gray-500 text-[11px] leading-relaxed mt-0.5">{item.description}</p>
                          </div>
                        </div>
                        <button onClick={() => handleDelete("features", item._id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">Belum ada keunggulan kustom yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
