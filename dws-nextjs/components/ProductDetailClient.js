"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  Package, 
  ArrowRight, 
  MessageSquare, 
  Download,
  FileText
} from "lucide-react";
import ProductCarousel from "@/components/ProductCarousel";

// Category details configuration
const CATEGORY_DETAILS = {
  "Material Handling": {
    desc: "Peralatan pemindahan beban berat industri dan pergudangan berkualitas tinggi dengan standar hidrolik presisi.",
    href: "/products?cat=Material%20Handling"
  },
  "Dalton Hardware Tools": {
    desc: "Perkakas kerja, tangga lipat aluminium premium, mesin las, serta tong sampah industri bermutu tinggi.",
    href: "/products?cat=Dalton%20Hardware%20Tools"
  },
  "Castor Wheel Division": {
    desc: "Berbagai macam roda kastor trolley untuk kebutuhan beban ringan, sedang, hingga heavy-duty industrial.",
    href: "/products?cat=Castor%20Wheel%20Division"
  },
  "Turbin Ventilator": {
    desc: "Sistem sirkulasi udara tangguh berbahan stainless steel untuk pabrik, gudang, dan gedung industri.",
    href: "/products?cat=Turbin%20Ventilator"
  }
};

// Brand extraction helper
const getProductBrand = (product) => {
  const name = (product.name || "").toLowerCase();
  const desc = (product.description || "").toLowerCase();
  if (name.includes("dalton") || desc.includes("dalton")) return "Dalton";
  if (name.includes("noblelift") || desc.includes("noblelift")) return "Noblelift";
  if (name.includes("nansin") || desc.includes("nansin")) return "Nansin";
  if (name.includes("vmax") || desc.includes("vmax")) return "VMAX";
  if (name.includes("nippon") || desc.includes("nippon")) return "Nippon";
  if (name.includes("star rollen") || desc.includes("star rollen")) return "Star Rollen";
  if (name.includes("sumo") || desc.includes("sumo")) return "Sumo Caster";
  if (name.includes("stg") || desc.includes("stg")) return "STG";
  if (name.includes("triple s") || desc.includes("triple s")) return "Triple S";
  return null;
};

export default function ProductDetailClient({ initialProduct, relatedProducts }) {
  const [product, setProduct] = useState(initialProduct);
  const [activeImg, setActiveImg] = useState(initialProduct?.image || "");
  const [activeTab, setActiveTab] = useState("deskripsi");

  useEffect(() => {
    async function loadFreshProduct() {
      if (!initialProduct) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const response = await fetch(`${apiUrl}/products/${initialProduct.slug}`);
        const result = await response.json();
        if (response.ok && result.success) {
          const p = result.data;
          const mapped = {
            id: p.id,
            name: p.name,
            slug: p.slug,
            category: p.category ? p.category.name : "Forklifts",
            image: p.thumbnail || "/images/products/forklift-electric.jpg",
            description: p.description,
            specification: p.specification,
            isCustom: true
          };
          setProduct(mapped);
          setActiveImg(mapped.image);
        }
      } catch (err) {
        console.error("Failed to load fresh product details on client", err);
      }
    }
    loadFreshProduct();
  }, [initialProduct]);

  if (!product) return null;

  const brandName = getProductBrand(product);
  const getProductTagline = (p) => {
    if (p.category === "Material Handling") return `${brandName || "Premium"} Equipment`;
    if (p.category === "Dalton Hardware Tools") return `Industrial Hardware by Dalton`;
    if (p.category === "Castor Wheel Division") return `Premium Castor Wheels`;
    return `Industrial System`;
  };

  const getQuickSpecs = (p) => {
    const desc = (p.description || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    const specs = {};

    const capRegex = /(\d+(?:\.\d+)?\s*(?:ton|kg))/i;
    const capMatch = desc.match(capRegex) || name.match(capRegex);
    specs["Kapasitas Angkat"] = capMatch ? capMatch[0] : "Standar Industrial";

    const heightRegex = /(\d+(?:\.\d+)?\s*(?:meter|m))/i;
    const heightMatch = desc.match(heightRegex);
    specs["Tinggi Angkat Maks."] = heightMatch ? heightMatch[0] : "Disesuaikan";

    if (desc.includes("diesel") || name.includes("diesel")) {
      specs["Tipe Penggerak"] = "Engine Diesel";
    } else if (desc.includes("electric") || name.includes("electric") || desc.includes("elektrik") || name.includes("elektrik")) {
      specs["Tipe Penggerak"] = "Full Electric / Baterai";
    } else if (desc.includes("manual") || name.includes("manual")) {
      specs["Tipe Penggerak"] = "Manual / Hidrolik";
    } else {
      specs["Tipe Penggerak"] = "Mekanis / Rotasi";
    }

    specs["Merek"] = brandName || "Dalton / Noblelift / VMAX";

    if (desc.includes("duduk") || desc.includes("ride-on")) {
      specs["Tipe Operator"] = "Duduk (Ride-on)";
    } else if (desc.includes("stand-on") || desc.includes("berdiri")) {
      specs["Tipe Operator"] = "Berdiri (Stand-on)";
    } else {
      specs["Tipe Operator"] = "Pedestrian / Dorong";
    }

    return specs;
  };

  const quickSpecs = getQuickSpecs(product);

  const triggerSelectProduct = (productName) => {
    window.dispatchEvent(new CustomEvent("select-product", { detail: productName }));
  };

  const galleryImages = [product.image];
  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      if (!galleryImages.includes(img)) {
        galleryImages.push(img);
      }
    });
  }

  const handleBrochureClick = () => {
    alert("Brosur spesifikasi lengkap dapat diunduh dengan menghubungi Sales kami melalui WhatsApp.");
    triggerSelectProduct(product.name);
  };

  return (
    <div className="bg-brand-lightBg min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 overflow-x-auto scrollbar-none py-1">
          <Link href="/" className="hover:text-brand-blue transition-colors shrink-0">Beranda</Link>
          <span className="shrink-0">&rsaquo;</span>
          <Link href="/products" className="hover:text-brand-blue transition-colors shrink-0">Produk</Link>
          <span className="shrink-0">&rsaquo;</span>
          <Link 
            href={`/products?cat=${encodeURIComponent(product.category)}`} 
            className="hover:text-brand-blue transition-colors shrink-0"
          >
            {product.category}
          </Link>
          <span className="shrink-0">&rsaquo;</span>
          <span className="text-gray-900 font-medium truncate shrink-0 max-w-[200px] md:max-w-none">{product.name}</span>
        </div>

        {/* Top Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-white border border-brand-blueLight/10 shadow-sm flex items-center justify-center p-8 overflow-hidden group">
              <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Terlaris
              </span>
              <img 
                src={activeImg} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-20 rounded-xl bg-white border flex items-center justify-center p-2 shadow-sm shrink-0 transition-all snap-start cursor-pointer ${
                      activeImg === img 
                        ? "border-brand-blue scale-105 shadow-md ring-2 ring-brand-blue/10" 
                        : "border-gray-100 hover:border-brand-blue/30"
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx}`} className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Details & CTAs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block mb-2">{product.category}</span>
              <h1 className="text-brand-darkBg font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                {getProductTagline(product)}
              </p>
            </div>

            {/* Quality Seals */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs px-3.5 py-1.5 rounded-full font-bold">
                <ShieldCheck size={14} />
                <span>Produk Original</span>
              </span>
              <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-brand-blue text-xs px-3.5 py-1.5 rounded-full font-bold">
                <Award size={14} />
                <span>Garansi Resmi</span>
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs px-3.5 py-1.5 rounded-full font-bold">
                <Package size={14} />
                <span>Suku Cadang Ready</span>
              </span>
            </div>

            {/* Quick Specs Table */}
            <div className="bg-white rounded-2xl border border-brand-blueLight/10 p-5 shadow-sm">
              <h3 className="text-brand-darkBg font-bold text-sm mb-4 border-b border-gray-100 pb-2">Spesifikasi Singkat</h3>
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(quickSpecs).map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 text-gray-500 font-medium w-1/2">{key}</td>
                      <td className="py-3 text-brand-darkBg font-bold w-1/2">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3.5 pt-2">
              <button
                onClick={() => triggerSelectProduct(product.name)}
                type="button"
                className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/10 hover:shadow-brand-blue/20 active:scale-95 transition-all cursor-pointer"
              >
                <FileText size={16} />
                <span>Minta Penawaran</span>
              </button>

              <div className="grid grid-cols-2 gap-3.5">
                <a
                  href={`https://wa.me/6285784380347?text=Halo%20Sales%20PT%20Denko%20Semarang,%20saya%20tertarik%20dengan%20produk%20*${encodeURIComponent(product.name)}*`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-gray-200 hover:border-brand-blue hover:bg-brand-blue/5 text-brand-darkBg font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare size={14} className="text-brand-blue" />
                  <span>Hubungi Sales</span>
                </a>

                <button
                  onClick={handleBrochureClick}
                  type="button"
                  className="w-full border border-gray-200 hover:border-brand-blue hover:bg-brand-blue/5 text-brand-darkBg font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download size={14} className="text-brand-blue" />
                  <span>Unduh Brosur</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tabs Section */}
        <div className="bg-white rounded-3xl border border-brand-blueLight/10 p-6 md:p-8 shadow-sm mb-16">
          <div className="flex gap-6 border-b border-gray-100 pb-3 overflow-x-auto scrollbar-none mb-8">
            {[
              { id: "deskripsi", label: "Deskripsi" },
              { id: "spesifikasi", label: "Spesifikasi" },
              { id: "fitur", label: "Fitur & Keunggulan" },
              { id: "dokumen", label: "Dokumen" },
              { id: "garansi", label: "Pengiriman & Garansi" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`pb-3 -mb-[13px] px-1 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-gray-400 hover:text-brand-blue"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="text-sm sm:text-base text-gray-600 leading-relaxed min-h-[160px]">
            {activeTab === "deskripsi" && (
              <div className="space-y-4">
                <h4 className="text-brand-darkBg font-bold text-lg">Deskripsi Produk</h4>
                <p className="whitespace-pre-line text-sm sm:text-base">
                  {product.description || `Toyota 8FD30 merupakan forklift diesel berkualitas tinggi yang dirancang untuk memberikan performa maksimal, efisiensi bahan bakar, dan daya tahan luar biasa dalam berbagai kondisi kerja.`}
                </p>
              </div>
            )}

            {activeTab === "spesifikasi" && (
              <div className="space-y-6">
                <h4 className="text-brand-darkBg font-bold text-lg">Detail Spesifikasi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(quickSpecs).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-gray-50 pb-2 text-sm text-brand-darkBg">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="font-bold">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-b border-gray-50 pb-2 text-sm text-brand-darkBg">
                    <span className="text-gray-500 font-medium">Asal Unit</span>
                    <span className="font-bold">Import / Baru</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2 text-sm text-brand-darkBg">
                    <span className="text-gray-500 font-medium">Sertifikasi</span>
                    <span className="font-bold">CE & ISO Standar</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fitur" && (
              <div className="space-y-4">
                <h4 className="text-brand-darkBg font-bold text-lg">Fitur Utama & Keunggulan</h4>
                <ul className="list-inside list-disc space-y-2 text-sm sm:text-base">
                  <li>Konstruksi besi baja tebal berkualitas tinggi menjamin stabilitas beban maksimal.</li>
                  <li>Sistem pengaman hidrolik presisi mencegah kebocoran oli dan jatuhnya beban tiba-tiba.</li>
                  <li>Desain kemudi ergonomis yang nyaman dioperasikan untuk durasi kerja yang lama.</li>
                  <li>Roda berkualitas tinggi (polyurethane/nylon/solid rubber) tahan gesekan tinggi.</li>
                  <li>Tersertifikasi standar keselamatan kerja internasional.</li>
                </ul>
              </div>
            )}

            {activeTab === "dokumen" && (
              <div className="space-y-4">
                <h4 className="text-brand-darkBg font-bold text-lg">Dokumen & Brosur</h4>
                <p className="text-sm">Dokumen penunjang teknis untuk tipe {product.name} tersedia gratis:</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button 
                    onClick={handleBrochureClick}
                    type="button"
                    className="flex items-center gap-2 border border-brand-blueLight text-brand-blue hover:bg-brand-blue hover:text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Katalog PDF</span>
                  </button>
                  <button 
                    onClick={() => triggerSelectProduct(product.name)}
                    type="button"
                    className="flex items-center gap-2 border border-gray-200 hover:border-brand-blue text-brand-darkBg hover:bg-brand-blue hover:text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <FileText size={14} />
                    <span>Minta Manual Book</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "garansi" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-brand-darkBg font-bold text-lg mb-2">Pengiriman & Logistik</h4>
                  <p className="text-sm">
                    Kami melayani pengiriman unit langsung ke lokasi Anda di seluruh wilayah **Semarang, Kendal, Demak, Kudus, Pati, Solo, Yogyakarta**, serta area Jawa Tengah lainnya. 
                    *Gratis biaya kirim untuk wilayah Semarang Kota (syarat dan ketentuan berlaku).*
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-darkBg font-bold text-lg mb-2">Garansi & Purna Jual (After-Sales)</h4>
                  <p className="text-sm">
                    Setiap pembelian unit material handling tipe {product.name} dilengkapi dengan **Garansi Resmi 12 Bulan** untuk sistem hidrolik dan kelistrikan. 
                    Pusat layanan service center dan penyediaan suku cadang resmi kami tersedia langsung di kota Semarang untuk penanganan cepat.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-brand-blueLight/10 pb-4">
              <h3 className="text-brand-darkBg font-display font-extrabold text-2xl">
                Produk Terkait
              </h3>
              <Link 
                href={`/products?cat=${encodeURIComponent(product.category)}`}
                className="text-brand-blue hover:text-brand-blueDark font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <ProductCarousel 
              products={relatedProducts}
              triggerSelectProduct={triggerSelectProduct}
              getProductBrand={getProductBrand}
            />
          </div>
        )}
      </div>
    </div>
  );
}
