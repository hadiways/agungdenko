"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/fetch";
import { 
  ChevronDown, 
  Phone, 
  Headphones, 
  FileText, 
  Menu, 
  X,
  Truck,
  Wrench,
  Settings,
  Layers,
  ArrowRight,
  ShieldAlert,
  HardHat,
  Anchor,
  Compass,
  Cpu,
  BookOpen,
  HelpCircle,
  Video,
  Download,
  Info,
  ImageIcon,
  MessageSquare,
  Briefcase,
  Layers3,
  Flame,
  FileCheck2,
  Newspaper,
  Award,
  Disc,
  Wind
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'produk' | 'layanan' | 'solusi' | 'resources' | 'perusahaan' | null
  const [mobileExpanded, setMobileExpanded] = useState({}); // { [key]: boolean }
  
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const [salesProfile, setSalesProfile] = useState({
    name: "Agung Ramdhani",
    phone: "6285784380347"
  });

  useEffect(() => {
    const saved = localStorage.getItem("sales_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSalesProfile({
          name: parsed.name,
          phone: parsed.phone
        });
      } catch (e) {
        console.error("Failed to load navbar sales profile", e);
      }
    }
  }, []);

  const [contentAvailability, setContentAvailability] = useState({
    hasArticles: false,
    hasGallery: false,
    hasDownloads: false,
    hasCaseStudies: false,
    hasCareers: false,
    hasNews: false,
    hasFaq: false
  });

  useEffect(() => {
    async function checkAvailability() {
      try {
        const query = `{
          "hasArticles": count(*[_type == "article" && status == "published"]) > 0,
          "hasGallery": count(*[_type == "gallery"]) > 0,
          "hasDownloads": count(*[_type == "download"]) > 0,
          "hasCaseStudies": count(*[_type == "caseStudy" || _type == "case-study"]) > 0,
          "hasCareers": count(*[_type == "career" || _type == "job" || _type == "lowongan"]) > 0,
          "hasNews": count(*[_type == "news" || _type == "article" && category->slug.current == "berita"]) > 0,
          "hasFaq": count(*[_type == "faq"]) > 0
        }`;
        const data = await sanityFetch(query);
        if (data) {
          setContentAvailability({
            hasArticles: !!data.hasArticles,
            hasGallery: !!data.hasGallery,
            hasDownloads: !!data.hasDownloads,
            hasCaseStudies: !!data.hasCaseStudies,
            hasCareers: !!data.hasCareers,
            hasNews: !!data.hasNews,
            hasFaq: !!data.hasFaq
          });
        }
      } catch (err) {
        console.error("Failed to check content availability", err);
      }
    }
    checkAvailability();
  }, []);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileExpanded = (key) => {
    setMobileExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // Dropdown Content Data
  const produkMaterialHandling = [
    { name: "Forklift & Stacker", href: "/products?cat=Material%20Handling", desc: "Diesel, Electric, Manual & Semi Electric", icon: <Truck className="w-4 h-4 text-brand-blue" /> },
    { name: "Hand Pallet & Truck", href: "/products?cat=Material%20Handling", desc: "Hand Pallet Dalton, Noblelift, Nansin, Trolly", icon: <Layers className="w-4 h-4 text-brand-blue" /> },
    { name: "Lift Equipment / Tangga", href: "/products?cat=Material%20Handling", desc: "Scissor Lift, Boom Lift, AWP, Order Picker", icon: <Layers3 className="w-4 h-4 text-brand-blue" /> },
    { name: "Drum Handler & Mesh", href: "/products?cat=Material%20Handling", desc: "Drum Gripper, Tipper, Stacker, Pallet Mesh", icon: <Settings className="w-4 h-4 text-brand-blue" /> },
  ];

  const produkLainnya = [
    { name: "Dalton Hardware Tools", href: "/products?cat=Dalton%20Hardware%20Tools", desc: "Dustbin (Tong Sampah), Tangga (Ladder)", icon: <HardHat className="w-4 h-4 text-brand-blue" /> },
    { name: "Castor Wheel Division", href: "/products?cat=Castor%20Wheel%20Division", desc: "Roda Kastor Nansin, Nippon, Triple S, Sumo", icon: <Disc className="w-4 h-4 text-brand-blue" /> },
    { name: "Turbin Ventilator", href: "/products?cat=Turbin%20Ventilator", desc: "Turbine Ventilator industri stainless", icon: <Wind className="w-4 h-4 text-brand-blue" /> },
    { name: "Layanan & Sparepart", href: "/services/maintenance", desc: "Perbaikan & suku cadang orisinal", icon: <Settings className="w-4 h-4 text-brand-blue" /> },
  ];

  const layananLinks = [
    { name: "Sales (Penjualan)", href: "/services/sales", desc: "Forklift baru & bekas garansi resmi" },
    { name: "Service & Maintenance", href: "/services/maintenance", desc: "Perbaikan kerusakan unit cepat & presisi" },
    { name: "Preventive Maintenance", href: "/services/preventive", desc: "Servis berkala cegah downtime forklift" },
    { name: "Sparepart", href: "/services/sparepart", desc: "Penyediaan komponen orisinal lengkap" },
    { name: "Operator Training", href: "/services/training", desc: "Sertifikasi SIO operator forklift handal" },
    { name: "Consultation", href: "/services/consultation", desc: "Konsultasi layout gudang & pemilihan unit" },
  ];

  const solusiLinks = [
    { name: "Warehouse (Gudang)", href: "/solutions/warehouse", desc: "Optimalkan kapasitas penyimpanan rak tinggi" },
    { name: "Manufacturing (Pabrik)", href: "/solutions/manufacturing", desc: "Mendukung rantai pasokan lini produksi lancar" },
    { name: "Logistics (Distribusi)", href: "/solutions/logistics", desc: "Kecepatan loading barang di dermaga muat" },
    { name: "Construction (Konstruksi)", href: "/solutions/construction", desc: "Material handling tangguh medan terjal" },
    { name: "Cold Storage (Gudang Beku)", href: "/solutions/cold-storage", desc: "Unit forklift khusus suhu sub-nol derajat" },
    { name: "Retail Distribution", href: "/solutions/retail", desc: "Manuver lincah koridor sempit pasar modern" },
    { name: "Ports (Pelabuhan)", href: "/solutions/ports", desc: "Pemindahan kargo peti kemas kapasitas raksasa" },
    { name: "Food & Beverage", href: "/solutions/food-beverage", desc: "Higienitas tinggi bebas polusi asap emisi" },
  ];

  const resourcesLinks = [
    { name: "Articles (Artikel)", href: "/artikel", icon: <FileText className="w-4 h-4" />, show: contentAvailability.hasArticles },
    { name: "Product Catalog", href: "/resources/catalog", icon: <BookOpen className="w-4 h-4" />, show: true },
    { name: "Brochures", href: "/resources/brochures", icon: <FileCheck2 className="w-4 h-4" />, show: true },
    { name: "FAQ", href: "/resources/faq", icon: <HelpCircle className="w-4 h-4" />, show: contentAvailability.hasFaq },
    { name: "Case Studies", href: "/resources/case-studies", icon: <Info className="w-4 h-4" />, show: contentAvailability.hasCaseStudies },
    { name: "News (Berita)", href: "/resources/news", icon: <Newspaper className="w-4 h-4" />, show: contentAvailability.hasNews },
    { name: "Videos", href: "/resources/videos", icon: <Video className="w-4 h-4" />, show: true },
    { name: "Downloads", href: "/resources/downloads", icon: <Download className="w-4 h-4" />, show: contentAvailability.hasDownloads },
  ].filter(link => link.show);

  const companyLinks = [
    { name: "About Us (Tentang Kami)", href: "/about", icon: <Info className="w-4 h-4" />, show: true },
    { name: "Our Brands", href: "/about#brands", icon: <Award className="w-4 h-4" />, show: true },
    { name: "Gallery", href: "/gallery", icon: <ImageIcon className="w-4 h-4" />, show: contentAvailability.hasGallery },
    { name: "Testimonials", href: "/testimonials", icon: <MessageSquare className="w-4 h-4" />, show: true },
    { name: "Careers (Karir)", href: "/about#careers", icon: <Briefcase className="w-4 h-4" />, show: contentAvailability.hasCareers },
    { name: "Contact (Kontak)", href: "/contact", icon: <Phone className="w-4 h-4" />, show: true },
  ].filter(link => link.show);

  const shouldUseDarkText = false; // Always use light text on solid dark blue header

  return (
    <header
      id="main-header"
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4 px-6 md:px-14 lg:px-16 flex items-center justify-between border-b bg-[#0B1B2B]/95 backdrop-blur-md shadow-lg border-white/5"
      ref={dropdownRef}
    >
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 shrink-0 group">
        <div className="flex items-center justify-center bg-brand-blue text-white font-display font-extrabold text-lg sm:text-xl px-3 py-1 rounded-md skew-x-12 transform transition-transform group-hover:scale-105 duration-300 shadow-md">
          <span className="-skew-x-12">DWS</span>
        </div>
        <div className="flex flex-col hidden sm:flex">
          <span className={`font-display font-bold text-xs tracking-wide leading-none transition-colors ${
            shouldUseDarkText ? "text-brand-darkBg group-hover:text-brand-blue" : "text-white group-hover:text-brand-blueLight"
          }`}>
            PT DENKO WAHANA SAKTI
          </span>
          <span className={`text-[10px] tracking-wider font-light mt-0.5 transition-colors ${
            shouldUseDarkText ? "text-gray-500" : "text-gray-400"
          }`}>
            Material Handling Solution
          </span>
        </div>
      </Link>

      {/* Center Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center gap-9">
        
        {/* Dropdown 1: Produk (Mega Menu) */}
        <div 
          className="relative"
          onMouseEnter={() => setActiveDropdown('produk')}
        >
          <button 
            className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeDropdown === 'produk' || pathname.startsWith("/products") 
                ? "text-brand-blueLight" 
                : (shouldUseDarkText ? "text-gray-700 hover:text-brand-blue" : "text-white hover:text-brand-blueLight")
            }`}
          >
            <span>Produk</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'produk' ? 'rotate-180' : ''}`} />
          </button>

          {activeDropdown === 'produk' && (
            <div 
              className="absolute left-1/2 -translate-x-[40%] top-full mt-4 w-[850px] bg-[#0E1F30] border border-white/5 rounded-2xl p-6 shadow-2xl z-50 grid grid-cols-12 gap-6 animate-fade-in"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* Col 1: Material Handling */}
              <div className="col-span-4 space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-white/5 pb-2">
                  MATERIAL HANDLING
                </span>
                <div className="flex flex-col gap-3">
                  {produkMaterialHandling.map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={handleLinkClick}
                      className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-white/5 transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-blue/25 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block group-hover/item:text-brand-blueLight transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-400 block mt-0.5 leading-tight">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Col 2: Other Equipment */}
              <div className="col-span-4 space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-white/5 pb-2">
                  DIVISI LAINNYA
                </span>
                <div className="flex flex-col gap-3">
                  {produkLainnya.map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={handleLinkClick}
                      className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-white/5 transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-blue/25 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block group-hover/item:text-brand-blueLight transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-400 block mt-0.5 leading-tight">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Col 3: Promotional Banner */}
              <div className="col-span-4 bg-[#081522] rounded-xl p-5 border border-white/5 flex flex-col justify-between overflow-hidden relative">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
                <div className="space-y-2 relative z-10">
                  <span className="inline-block bg-brand-blue/20 text-brand-blue text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md mb-2">
                    REKOMENDASI
                  </span>
                  <h5 className="text-white font-bold text-xs sm:text-sm leading-snug">
                    Butuh bantuan memilih produk?
                  </h5>
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                    Tim kami siap membantu menemukan solusi terbaik untuk bisnis Anda.
                  </p>
                </div>
                <div className="pt-6 relative z-10">
                  <a
                    href="https://wa.me/6285784380347?text=Halo%20Pak%20Agung%20Ramdhani,%20saya%20tertarik%20dengan%20produk%20material%20handling%20dari%20PT%20Denko%20Wahana%20Sakti." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Konsultasi Gratis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 2: Layanan */}
        <div 
          className="relative"
          onMouseEnter={() => setActiveDropdown('layanan')}
        >
          <button 
            className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeDropdown === 'layanan' || pathname.startsWith("/services") 
                ? "text-brand-blueLight" 
                : (shouldUseDarkText ? "text-gray-700 hover:text-brand-blue" : "text-white hover:text-brand-blueLight")
            }`}
          >
            <span>Layanan</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`} />
          </button>

          {activeDropdown === 'layanan' && (
            <div 
              className="absolute left-0 top-full mt-4 w-72 bg-[#0E1F30] border border-white/5 rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-1.5 animate-fade-in"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {layananLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex flex-col p-2 rounded-xl hover:bg-white/5 transition-colors group/item"
                >
                  <span className="text-xs font-bold text-white group-hover/item:text-brand-blueLight transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-gray-400 mt-0.5 leading-tight">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown 3: Solusi Industri */}
        <div 
          className="relative"
          onMouseEnter={() => setActiveDropdown('solusi')}
        >
          <button 
            className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeDropdown === 'solusi' || pathname.startsWith("/solutions") 
                ? "text-brand-blueLight" 
                : (shouldUseDarkText ? "text-gray-700 hover:text-brand-blue" : "text-white hover:text-brand-blueLight")
            }`}
          >
            <span>Solusi Industri</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solusi' ? 'rotate-180' : ''}`} />
          </button>

          {activeDropdown === 'solusi' && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[500px] bg-[#0E1F30] border border-white/5 rounded-2xl p-5 shadow-2xl z-50 grid grid-cols-2 gap-x-6 gap-y-1.5 animate-fade-in"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {solusiLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex flex-col p-2 rounded-xl hover:bg-white/5 transition-colors group/item"
                >
                  <span className="text-xs font-bold text-white group-hover/item:text-brand-blueLight transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-gray-400 mt-0.5 leading-tight">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown 4: Resources */}
        <div 
          className="relative"
          onMouseEnter={() => setActiveDropdown('resources')}
        >
          <button 
            className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeDropdown === 'resources' || pathname.startsWith("/resources") || pathname.startsWith("/artikel") 
                ? "text-brand-blueLight" 
                : (shouldUseDarkText ? "text-gray-700 hover:text-brand-blue" : "text-white hover:text-brand-blueLight")
            }`}
          >
            <span>Resources</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
          </button>

          {activeDropdown === 'resources' && (
            <div 
              className="absolute left-0 top-full mt-4 w-56 bg-[#0E1F30] border border-white/5 rounded-2xl p-3 shadow-2xl z-50 flex flex-col gap-1 animate-fade-in"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {resourcesLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors group/item"
                >
                  <div className="text-brand-blueLight group-hover/item:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

      </nav>

      {/* Right Side: Phone & Dual CTA Actions (Desktop) */}
      <div className="hidden lg:flex items-center gap-6 shrink-0">
        
        {/* Phone Contact Block */}
        <div className="hidden 2xl:flex flex-col text-right">
          <a href="tel:+622112345678" className={`text-xs font-semibold flex items-center gap-1.5 justify-end transition-colors ${
            shouldUseDarkText ? "text-gray-600 hover:text-brand-darkBg" : "text-gray-300 hover:text-white"
          }`}>
            <Phone className="w-3 h-3 text-brand-blue" />
            <span>(021) 1234 5678</span>
          </a>
          <span className={`text-[9px] transition-colors ${shouldUseDarkText ? "text-gray-400" : "text-gray-500"}`}>
            Senin - Jumat 08.00 - 17.00
          </span>
        </div>

        {/* Secondary CTA: Hubungi Sales */}
        <a
          href={`https://wa.me/${salesProfile.phone}?text=Halo%20Sales%20PT%20Denko%20Wahana%20Sakti,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20alat%20material%20handling.`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 border font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all ${
            shouldUseDarkText 
              ? "border-brand-darkBg/20 hover:bg-brand-darkBg/5 text-brand-darkBg" 
              : "border-white/10 hover:bg-white/5 text-white"
          }`}
        >
          <Headphones className="w-3.5 h-3.5 text-gray-400" />
          <span>Hubungi Sales</span>
        </a>

        {/* Primary CTA: Minta Penawaran */}
        <Link
          href="/contact?subject=penawaran"
          className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md shadow-brand-blue/15 active:scale-95 transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Minta Penawaran</span>
        </Link>

      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`lg:hidden transition-colors focus:outline-none shrink-0 ${
          shouldUseDarkText ? "text-brand-darkBg hover:text-brand-blue" : "text-white hover:text-brand-blueLight"
        }`}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Panel Layout (Accordion) */}
      {isMenuOpen && (
        <div className="absolute top-full inset-x-0 bg-[#0E1F30] border-t border-white/5 max-h-[85vh] overflow-y-auto py-5 px-6 z-40 shadow-2xl flex flex-col gap-4 animate-fade-in">
          <nav className="flex flex-col gap-1 text-sm font-semibold">
            
            {/* Produk Accordion */}
            <div className="border-b border-white/5 py-2">
              <button 
                onClick={() => toggleMobileExpanded('produk')}
                className="w-full flex items-center justify-between text-white hover:text-brand-blueLight"
              >
                <span>PRODUK</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['produk'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['produk'] && (
                <div className="mt-3 pl-3 flex flex-col gap-3 animate-fade-in">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">MATERIAL HANDLING</div>
                  {produkMaterialHandling.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={handleLinkClick} className="text-xs text-gray-300 hover:text-white flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">DIVISI LAINNYA</div>
                  {produkLainnya.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={handleLinkClick} className="text-xs text-gray-300 hover:text-white flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Layanan Accordion */}
            <div className="border-b border-white/5 py-2">
              <button 
                onClick={() => toggleMobileExpanded('layanan')}
                className="w-full flex items-center justify-between text-white hover:text-brand-blueLight"
              >
                <span>LAYANAN</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['layanan'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['layanan'] && (
                <div className="mt-2 pl-3 flex flex-col gap-2 animate-fade-in">
                  {layananLinks.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={handleLinkClick} className="text-xs text-gray-300 hover:text-white py-1">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solusi Industri Accordion */}
            <div className="border-b border-white/5 py-2">
              <button 
                onClick={() => toggleMobileExpanded('solusi')}
                className="w-full flex items-center justify-between text-white hover:text-brand-blueLight"
              >
                <span>SOLUSI INDUSTRI</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['solusi'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['solusi'] && (
                <div className="mt-2 pl-3 flex flex-col gap-2 animate-fade-in">
                  {solusiLinks.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={handleLinkClick} className="text-xs text-gray-300 hover:text-white py-1">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Accordion */}
            <div className="border-b border-white/5 py-2">
              <button 
                onClick={() => toggleMobileExpanded('resources')}
                className="w-full flex items-center justify-between text-white hover:text-brand-blueLight"
              >
                <span>RESOURCES</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['resources'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['resources'] && (
                <div className="mt-2 pl-3 flex flex-col gap-2 animate-fade-in">
                  {resourcesLinks.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={handleLinkClick} className="text-xs text-gray-300 hover:text-white flex items-center gap-2 py-1">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Perusahaan Accordion */}
            <div className="border-b border-white/5 py-2">
              <button 
                onClick={() => toggleMobileExpanded('perusahaan')}
                className="w-full flex items-center justify-between text-white hover:text-brand-blueLight"
              >
                <span>PERUSAHAAN</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['perusahaan'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['perusahaan'] && (
                <div className="mt-2 pl-3 flex flex-col gap-2 animate-fade-in">
                  {companyLinks.map((item, idx) => (
                    <Link key={idx} href={item.href} onClick={handleLinkClick} className="text-xs text-gray-300 hover:text-white flex items-center gap-2 py-1">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* Mobile Phone & Call Action Buttons */}
          <div className="flex flex-col gap-3 pt-3 border-t border-white/5 mt-2">
            <a href="tel:+622112345678" className="text-white hover:text-brand-blueLight text-xs font-bold flex items-center gap-1.5 justify-center py-2 transition-colors">
              <Phone className="w-4 h-4 text-brand-blueLight" />
              <span>Hubungi DWS: (021) 1234 5678</span>
            </a>
            
            <a 
              href="https://wa.me/6285784380347?text=Halo%20Sales%20PT%20Denko%20Wahana%20Sakti,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1F2F3E] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              onClick={handleLinkClick}
            >
              <Headphones className="w-4 h-4" />
              <span>Hubungi Sales</span>
            </a>
            
            <Link 
              href="/contact?subject=penawaran"
              className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              onClick={handleLinkClick}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Minta Penawaran</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </header>
  );
}
