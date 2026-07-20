"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/fetch";
import { 
  SERVICES_QUERY, 
  TESTIMONIALS_QUERY, 
  PARTNERS_QUERY,
  FEATURES_QUERY,
  GALLERY_QUERY
} from "@/lib/sanity/queries";
import { fetchProducts } from "@/lib/api";
import HeroIndustryRotator from "@/components/HeroIndustryRotator";
import ProductCarousel from "@/components/ProductCarousel";
import { ShieldCheck, Tag, Zap, Package, FileText, ArrowRight, MessageSquare, Wrench, Disc, Wind, Grid, Search } from "lucide-react";

// Category details for descriptions and quick links
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

// Helper function to extract brand from name or description
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

export default function Home() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [salesProfile, setSalesProfile] = useState({
    name: "Agung Ramdhani",
    role: "Sales Consultant",
    phone: "6285784380347",
    status: "Online sekarang",
    avatar: ""
  });
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [features, setFeatures] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Semua Merek");
  const [selectedSort, setSelectedSort] = useState("default");

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(tempSearchQuery);
  };

  const handleTagClick = (tagText) => {
    setTempSearchQuery(tagText);
    setSearchQuery(tagText);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll(".fade-in-on-scroll").forEach((el) => {
      el.classList.add("transition-all", "duration-700", "transform", "opacity-0", "translate-y-4");
      observer.observe(el);
    });

    // Load dynamic sales profile
    const savedProfile = localStorage.getItem("sales_profile");
    if (savedProfile) {
      try {
        setSalesProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to load sales profile", e);
      }
    }

    // Load dynamic CMS and local custom data
    async function fetchCMSData() {
      try {
        const [cmsServices, cmsTestimonials, cmsPartners, cmsFeatures, cmsGallery, apiProducts] = await Promise.all([
          sanityFetch(SERVICES_QUERY).catch((err) => { console.warn("Failed to fetch CMS services", err); return []; }),
          sanityFetch(TESTIMONIALS_QUERY).catch((err) => { console.warn("Failed to fetch CMS testimonials", err); return []; }),
          sanityFetch(PARTNERS_QUERY).catch((err) => { console.warn("Failed to fetch CMS partners", err); return []; }),
          sanityFetch(FEATURES_QUERY).catch((err) => { console.warn("Failed to fetch CMS features", err); return []; }),
          sanityFetch(GALLERY_QUERY).catch((err) => { console.warn("Failed to fetch CMS gallery", err); return []; }),
          fetchProducts().catch((err) => { console.warn("Failed to fetch API products", err); return []; })
        ]);

        const baseServices = cmsServices || [];
        const baseTestimonials = cmsTestimonials || [];
        const basePartners = cmsPartners || [];
        const baseFeatures = cmsFeatures || [];
        const baseGallery = cmsGallery || [];

        // 1. Services
        const savedServices = localStorage.getItem("custom_services");
        if (savedServices) {
          try { setServices([...JSON.parse(savedServices), ...baseServices]); }
          catch (e) { setServices(baseServices); }
        } else { setServices(baseServices); }

        // 2. Testimonials
        const savedTestimonials = localStorage.getItem("custom_testimonials");
        if (savedTestimonials) {
          try { setTestimonials([...JSON.parse(savedTestimonials), ...baseTestimonials]); }
          catch (e) { setTestimonials(baseTestimonials); }
        } else { setTestimonials(baseTestimonials); }

        // 3. Partners
        const savedPartners = localStorage.getItem("custom_partners");
        if (savedPartners) {
          try { setPartners([...JSON.parse(savedPartners), ...basePartners]); }
          catch (e) { setPartners(basePartners); }
        } else { setPartners(basePartners); }

        // 4. Features
        const savedFeatures = localStorage.getItem("custom_features");
        if (savedFeatures) {
          try { setFeatures([...JSON.parse(savedFeatures), ...baseFeatures]); }
          catch (e) { setFeatures(baseFeatures); }
        } else { setFeatures(baseFeatures); }

        // 5. Gallery
        const savedGallery = localStorage.getItem("custom_gallery");
        if (savedGallery) {
          try { setGalleryItems([...JSON.parse(savedGallery), ...baseGallery]); }
          catch (e) { setGalleryItems(baseGallery); }
        } else { setGalleryItems(baseGallery); }

        // 6. Products from Laravel API
        setProducts(apiProducts || []);
      } catch (err) {
        console.error("Failed to fetch CMS content", err);
      }
    }
    fetchCMSData();

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const card = scrollRef.current.querySelector(".flex-shrink-0");
      const cardWidth = card ? card.clientWidth : clientWidth;
      const index = Math.round(scrollLeft / (cardWidth + 24));
      setActiveIndex(index);
    }
  };

  const scrollToIdx = (index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(".flex-shrink-0");
      const cardWidth = card ? card.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + 24),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(".flex-shrink-0");
      const cardWidth = card ? card.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(".flex-shrink-0");
      const cardWidth = card ? card.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  const triggerSelectProduct = (productId) => {
    window.dispatchEvent(new CustomEvent("select-product", { detail: productId }));
  };

  return (
    <>
      {/* 2. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-brand-darkBg">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darkBg via-brand-darkBg/90 to-brand-darkBg/40 lg:block hidden"></div>
          <div className="absolute inset-0 bg-brand-darkBg/85 lg:hidden"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-full min-h-[70vh]">
          <div className="max-w-3xl my-auto space-y-6">
            {/* Badge */}
            <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest bg-brand-blue/20 border border-brand-blueLight/30 px-3.5 py-1.5 rounded-full inline-block">
              ✓ Distributor Resmi Material Handling
            </span>
            
            {/* Heading with integrated Industry Rotator */}
            <h1 className="text-white font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Solusi Material Handling <br />
              <span className="text-white">untuk </span>
              <HeroIndustryRotator />
            </h1>
            
            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Kami menyediakan penjualan, service, dan sparepart forklift dengan kualitas terbaik dan layanan profesional.
            </p>

            {/* Trust Indicators (One horizontal row, compact badges with small Lucide icons) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-brand-blueLight shrink-0" />
                <span>Produk Original</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={16} className="text-brand-blueLight shrink-0" />
                <span>Harga Kompetitif</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={16} className="text-brand-blueLight shrink-0" />
                <span>Support Cepat</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Package size={16} className="text-brand-blueLight shrink-0" />
                <span>Sparepart Ready</span>
              </span>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact?subject=penawaran"
                className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blueDark text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150 group text-sm uppercase tracking-wider"
              >
                <FileText size={16} className="shrink-0" />
                <span>Minta Penawaran</span>
              </Link>
              
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold px-8 py-4 rounded-xl active:scale-95 transition-all duration-150 text-sm uppercase tracking-wider group"
              >
                <span>Lihat Produk</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Floating Sales Consultant Card */}
          <div className="mt-12 lg:self-end lg:mt-0 bg-[#0E1F30] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 max-w-xs shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-brand-blue/20 border-2 border-brand-blueLight/60 overflow-hidden flex items-center justify-center">
                  {salesProfile.avatar ? (
                    <img src={salesProfile.avatar} alt={salesProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-display font-extrabold text-base">
                      {salesProfile.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                {/* Active Status Dot */}
                <span className="absolute bottom-0 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#0E1F30] rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide leading-tight">{salesProfile.name}</h4>
                <p className="text-gray-400 text-[10px] sm:text-xs">{salesProfile.role}</p>
                <span className="text-[9px] text-green-400 font-semibold flex items-center gap-1 mt-0.5">
                  {salesProfile.status}
                </span>
              </div>
            </div>
            
            {/* CTA Chat Whatsapp button (with premium outline outline message icon and brand colors) */}
            <a 
              href={`https://wa.me/${salesProfile.phone}?text=Halo%20Pak%20${encodeURIComponent(salesProfile.name)},%20saya%20tertarik%20dengan%20produk%20material%20handling%20dari%20PT%20Denko%20Wahana%20Sakti.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-brand-blue hover:bg-brand-blue/10 text-brand-blueLight font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageSquare size={16} className="text-brand-blueLight shrink-0" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Produk Kami (with overlapping Search & Filter Widget) */}
      <section id="produk" className="py-24 bg-brand-lightBg px-6 md:px-12 fade-in-on-scroll relative z-20">
        <div className="container mx-auto">
          
          {/* Product Search & Filter Widget (Hunivest UX) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-blue-100/50 max-w-5xl mx-auto flex flex-col gap-6 -mt-36 md:-mt-44 mb-16 relative z-30">
            
            {/* Tabs at the top */}
            <div className="flex gap-6 border-b border-gray-100 pb-3 overflow-x-auto scrollbar-none">
              {[
                { name: "Semua", icon: <Grid size={16} /> },
                { name: "Material Handling", icon: <Package size={16} /> },
                { name: "Dalton Hardware Tools", icon: <Wrench size={16} /> },
                { name: "Castor Wheel Division", icon: <Disc size={16} /> },
                { name: "Turbin Ventilator", icon: <Wind size={16} /> }
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 pb-3 -mb-[13px] px-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border-b-2 ${
                    selectedCategory === cat.name
                      ? "border-brand-blue text-brand-blue"
                      : "border-transparent text-gray-400 hover:text-brand-blue"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Main search & filter form */}
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-4 bg-gray-50/50 p-2 rounded-2xl border border-gray-100/50">
              {/* Text Search Input */}
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3.5 flex-1 w-full shadow-sm">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={tempSearchQuery}
                  onChange={(e) => setTempSearchQuery(e.target.value)}
                  placeholder="Cari nama atau deskripsi produk..."
                  className="bg-transparent text-xs text-brand-darkBg placeholder-gray-400 w-full focus:outline-none"
                />
              </div>

              {/* Brand Select Dropdown */}
              <div className="flex flex-col bg-white border border-gray-100 rounded-xl px-4 py-2 w-full lg:w-48 shrink-0 shadow-sm">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Merek</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-transparent text-xs font-bold text-brand-darkBg focus:outline-none w-full cursor-pointer mt-0.5"
                >
                  <option value="Semua Merek">Semua Merek</option>
                  <option value="Dalton">Dalton</option>
                  <option value="Noblelift">Noblelift</option>
                  <option value="Nansin">Nansin</option>
                  <option value="VMAX">VMAX</option>
                  <option value="Nippon">Nippon</option>
                  <option value="Triple S">Triple S</option>
                </select>
              </div>

              {/* Sorting Select Dropdown */}
              <div className="flex flex-col bg-white border border-gray-100 rounded-xl px-4 py-2 w-full lg:w-44 shrink-0 shadow-sm">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Urutkan</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent text-xs font-bold text-brand-darkBg focus:outline-none w-full cursor-pointer mt-0.5"
                >
                  <option value="default">Default</option>
                  <option value="asc">Nama A-Z</option>
                  <option value="desc">Nama Z-A</option>
                </select>
              </div>

              {/* Cyan Search Button */}
              <button
                type="submit"
                className="w-full lg:w-auto bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/30 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <Search size={14} />
                <span>Cari</span>
              </button>
            </form>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
              <span className="text-gray-400 font-bold uppercase tracking-wider">Pencarian Populer:</span>
              {[
                "Forklift Diesel",
                "Scissor Lift",
                "Roda Kastor",
                "Hand Pallet Dalton",
                "Turbin Ventilator"
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="bg-brand-lightBg hover:bg-brand-blue/10 text-brand-darkBg hover:text-brand-blue border border-gray-100 rounded-lg px-3 py-1 font-bold transition-all duration-200 cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block mb-2">Pilihan Terbaik</span>
              <h2 className="text-brand-darkBg font-display font-extrabold text-3xl md:text-4xl">Produk Kami</h2>
              <p className="text-gray-500 mt-2 max-w-2xl text-sm sm:text-base">
                Jelajahi produk kami berdasarkan kategori divisi divisi di bawah ini untuk kebutuhan bisnis dan industri Anda.
              </p>
            </div>
          </div>

          <div className="space-y-16">
            {(() => {
              const categoriesList = [
                "Material Handling",
                "Dalton Hardware Tools",
                "Castor Wheel Division",
                "Turbin Ventilator"
              ];

              const filteredProducts = products
                .filter((p) => {
                  // Category Tab Filter
                  if (selectedCategory !== "Semua" && p.category !== selectedCategory) {
                    return false;
                  }
                  // Search Input Filter
                  if (searchQuery) {
                    const term = searchQuery.toLowerCase();
                    const nameMatch = p.name && p.name.toLowerCase().includes(term);
                    const descMatch = p.description && p.description.toLowerCase().includes(term);
                    if (!nameMatch && !descMatch) return false;
                  }
                  // Brand Filter
                  if (selectedBrand !== "Semua Merek") {
                    const brandTerm = selectedBrand.toLowerCase();
                    const nameMatch = p.name && p.name.toLowerCase().includes(brandTerm);
                    const descMatch = p.description && p.description.toLowerCase().includes(brandTerm);
                    if (!nameMatch && !descMatch) return false;
                  }
                  return true;
                })
                .sort((a, b) => {
                  if (selectedSort === "asc") {
                    return a.name.localeCompare(b.name);
                  }
                  if (selectedSort === "desc") {
                    return b.name.localeCompare(a.name);
                  }
                  return 0; // default
                });

              const groupedProducts = {};
              categoriesList.forEach((cat) => {
                groupedProducts[cat] = filteredProducts.filter((p) => p.category === cat);
              });

              const activeCategories = categoriesList.filter(
                (cat) => groupedProducts[cat] && groupedProducts[cat].length > 0
              );

              if (activeCategories.length === 0) {
                return (
                  <div className="text-center text-gray-500 py-12 text-sm bg-white rounded-3xl p-8 border border-blue-100/50 shadow-sm">
                    Belum ada produk tersedia.
                  </div>
                );
              }

              return activeCategories.map((cat) => {
                const catProducts = groupedProducts[cat];
                const displayProducts = catProducts.slice(0, 8); // Display first 8 products in carousel
                const details = CATEGORY_DETAILS[cat] || { desc: "", href: "/products" };

                return (
                  <div key={cat} className="space-y-6">
                    {/* Category Title Header Block */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-blueLight/10 pb-4">
                      <div className="space-y-1 max-w-2xl">
                        <h3 className="text-brand-darkBg font-display font-extrabold text-xl sm:text-2xl flex items-center gap-2">
                          <span>{cat}</span>
                          <span className="bg-brand-blue/10 text-brand-blue text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                            {catProducts.length} Produk
                          </span>
                        </h3>
                        {details.desc && (
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                            {details.desc}
                          </p>
                        )}
                      </div>
                      <Link
                        href={details.href}
                        className="text-brand-blue hover:text-brand-blueDark font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors mt-3 md:mt-0 cursor-pointer"
                      >
                        <span>Lihat Semua</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Horizontal Carousel */}
                    <ProductCarousel
                      products={displayProducts}
                      triggerSelectProduct={triggerSelectProduct}
                      getProductBrand={getProductBrand}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* 5. Tentang Kami + Layanan Kami */}
      <section id="tentang" className="py-24 bg-white px-6 md:px-12 border-t border-gray-100 fade-in-on-scroll">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Tentang Kami */}
          <div className="bg-brand-lightBg rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100/50 flex flex-col justify-between">
            <div>
              <div className="overflow-hidden rounded-2xl mb-8 aspect-video relative group shadow-sm">
                <img src="/images/office-dws.jpg" alt="Office PT Denko Wahana Sakti" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute bottom-4 left-4 text-white font-bold text-sm tracking-wide bg-brand-blue px-3 py-1 rounded">HEADQUARTERS</span>
              </div>
              
              <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block mb-2">Tentang Kami</span>
              <h2 className="text-brand-darkBg font-display font-extrabold text-3xl mb-6">PT Denko Wahana Sakti</h2>
              
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  PT Denko Wahana Sakti adalah distributor material handling yang menyediakan berbagai kebutuhan industri seperti Forklift Electric, Forklift Diesel, Reach Truck, Electric Stacker, Hand Pallet, Scissor Lift, Boom Lift, hingga Aerial Work Platform.
                </p>
              </div>
            </div>
            <Link href="/about" className="mt-8 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg hover:shadow-brand-blue/20 active:scale-95 transition-all duration-150 self-start">
              Selengkapnya
            </Link>
          </div>

          {/* Right Column: Layanan Kami */}
          <div id="layanan" className="bg-brand-darkCard rounded-3xl p-6 sm:p-8 shadow-xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-brand-blueLight font-bold text-sm uppercase tracking-wider block mb-2">Layanan Kami</span>
              <h2 className="text-white font-display font-extrabold text-3xl mb-4">Solusi Terbaik</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Kami berkomitmen memberikan pelayanan menyeluruh dan dukungan purna jual terbaik demi menunjang produktivitas operasional bisnis Anda.
              </p>
              <div id="services-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services && services.length > 0 ? (
                  services.map((s, idx) => (
                    <div key={s._id || idx} className="flex items-center gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5 hover:border-brand-blueLight/20 hover:bg-white/10 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                        {s.icon && s.icon.startsWith("<svg") ? (
                          <span className="group-hover:text-white transition-colors duration-200" dangerouslySetInnerHTML={{ __html: s.icon }} />
                        ) : s.icon ? (
                          <img src={s.icon} alt={s.title} className="w-5 h-5 object-contain" />
                        ) : (
                          <span className="text-white text-xs font-bold">🛠</span>
                        )}
                      </div>
                      <span className="text-gray-200 group-hover:text-white font-medium text-xs sm:text-sm transition-colors">{s.title}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-6 text-xs">
                    No services available.
                  </div>
                )}
              </div>
            </div>
            <div className="mt-12 bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blueLight">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Butuh Bantuan Cepat?</h4>
                  <p className="text-gray-400 text-xs">Konsultasikan kebutuhan unit Anda sekarang.</p>
                </div>
              </div>
              <a href="https://wa.me/6285784380347?text=Halo%20Pak%20Agung%20Ramdhani,%20saya%20ingin%20berkonsultasi%20terkait%20kebutuhan%20material%20handling." target="_blank" rel="noopener noreferrer" className="bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                Tanya Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mengapa Memilih Kami + Testimoni */}
      <section className="py-24 bg-white px-6 md:px-12 fade-in-on-scroll">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Mengapa Memilih Kami? */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block mb-2">Keunggulan Utama</span>
              <h2 className="text-brand-darkBg font-display font-extrabold text-3xl mb-8">Mengapa Memilih Kami?</h2>
              <ul id="why-us-list" className="space-y-4">
                {[
                  "Produk Original & Bergaransi",
                  "Harga Kompetitif",
                  "Teknisi Berpengalaman",
                  "After Sales Terbaik",
                  "Sparepart Ready Stock",
                  "Pengiriman Cepat",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-lightBg flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5 border border-brand-blueLight/20">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 bg-brand-lightBg rounded-2xl p-6 border border-blue-100 flex items-center justify-between overflow-hidden relative min-h-[160px]">
              <div className="max-w-[60%]">
                <h4 className="text-brand-darkBg font-bold text-base leading-snug">Jaminan Kualitas Unit PT Denko Wahana Sakti</h4>
                <p className="text-gray-500 text-xs mt-2">Dapatkan garansi resmi distributor hingga 2 tahun beserta servis berkala.</p>
              </div>
              <img src="/images/products/forklift-diesel.jpg" alt="Diesel Forklift" className="w-40 h-40 object-contain absolute -right-4 -bottom-4 filter drop-shadow-xl animate-float" loading="lazy" />
            </div>
          </div>

          {/* Right Column: Testimoni */}
          <div id="testimoni" className="bg-brand-lightBg rounded-3xl p-6 sm:p-8 border border-blue-100 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block mb-2">Testimoni Pelanggan</span>
                  <h2 className="text-brand-darkBg font-display font-extrabold text-3xl">Apa Kata Mereka?</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-gray-300 hover:border-brand-blue bg-white flex items-center justify-center text-gray-600 hover:text-brand-blue transition-colors focus:outline-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-gray-300 hover:border-brand-blue bg-white flex items-center justify-center text-gray-600 hover:text-brand-blue transition-colors focus:outline-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
              {testimonials && testimonials.length > 0 ? (
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6"
                >
                  {testimonials.map((t, idx) => (
                    <div key={t._id || idx} className="w-full md:w-[calc(33.333%-16px)] flex-shrink-0 snap-center bg-white border border-blue-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[180px]">
                      <div>
                        <div className="flex gap-1 text-brand-accent mb-4">
                          {Array(t.rating || 5).fill(0).map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current text-brand-accent" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          ))}
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm italic mb-6 leading-relaxed">"{t.comment}"</p>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-brand-darkBg font-bold text-sm leading-tight">{t.company}</h4>
                        <p className="text-gray-400 text-[10px] mt-0.5">Verified Client</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12 text-xs">
                  No testimonials yet.
                </div>
              )}
            </div>
            {testimonials && testimonials.length > 0 && (
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-brand-blue w-5' : 'bg-gray-300'}`}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Galeri Kegiatan */}
      <section id="galeri" className="py-24 bg-brand-lightBg px-6 md:px-12 border-t border-b border-gray-100 fade-in-on-scroll">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-brand-blue font-bold text-sm uppercase tracking-wider block mb-2">Dokumentasi</span>
              <h2 className="text-brand-darkBg font-display font-extrabold text-3xl md:text-4xl">Galeri Kegiatan</h2>
            </div>
            <Link href="/gallery" className="mt-4 md:mt-0 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg active:scale-95 transition-all duration-150 self-start md:self-auto">
              Lihat Semua Galeri
            </Link>
          </div>
          <div id="gallery-grid" className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryItems && galleryItems.length > 0 ? (
              galleryItems.map((g, idx) => (
                <div key={g._id || idx} className="relative overflow-hidden rounded-2xl group aspect-[4/3] bg-brand-darkBg cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
                  <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-95 group-hover:brightness-100" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkBg/90 via-brand-darkBg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold text-xs sm:text-sm">{g.title}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 text-sm">
                Tidak ada foto galeri kegiatan yang tersedia.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. Partner Kami */}
      <section className="py-16 bg-white px-6 md:px-12 border-b border-gray-100">
        <div className="container mx-auto">
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest text-center block mb-8">PARTNER RESMI & DISTRIBUSI KAMI</span>
          <div id="partners-list" className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {partners && partners.length > 0 ? (
              partners.map((p, idx) => (
                <div key={p._id || idx} className="flex items-center justify-center px-4 py-3 bg-brand-lightBg/50 border border-brand-blueLight/10 rounded-xl hover:border-brand-blueLight/30 hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="h-6 object-contain group-hover:scale-105 transition-transform" />
                  ) : (
                    <span className="text-gray-400 font-display font-extrabold text-xs sm:text-sm tracking-widest group-hover:text-brand-blue transition-colors uppercase italic">{p.name}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-6 text-xs">
                No partner logos available.
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
}
