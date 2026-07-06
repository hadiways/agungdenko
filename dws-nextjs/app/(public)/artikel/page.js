"use client";

import { useState, useEffect } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { ARTICLES_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Link from "next/link";
import { 
  LayoutGrid, 
  Wrench, 
  Newspaper, 
  Box, 
  Building2, 
  Search, 
  Mail, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  FileText,
  FolderOpen,
  HelpCircle,
  Hash,
  SlidersHorizontal,
  ChevronDown,
  PhoneCall
} from "lucide-react";

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 6;

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedArticles, fetchedCategories] = await Promise.all([
          sanityFetch(ARTICLES_QUERY),
          sanityFetch(ALL_CATEGORIES_QUERY),
        ]);
        setArticles(fetchedArticles || []);
        setCategories(fetchedCategories || []);
      } catch (err) {
        console.error("Error loading blog data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getCategoryCount = (categorySlug) => {
    if (categorySlug === "all") return articles.length;
    return articles.filter((a) => a.category?.slug === categorySlug).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl space-y-8 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-3xl w-full"></div>
          <div className="h-16 bg-gray-200 rounded-2xl w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-96 bg-gray-200 rounded-2xl w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
                <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
              </div>
            </div>
            <div className="lg:col-span-4 h-96 bg-gray-200 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Filter & Search Logic
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" || article.category?.slug === selectedCategory;

    let matchesDuration = true;
    if (selectedDuration === "short") {
      matchesDuration = (article.readingTime || 5) < 5;
    } else if (selectedDuration === "medium") {
      matchesDuration = (article.readingTime || 5) >= 5 && (article.readingTime || 5) <= 10;
    } else if (selectedDuration === "long") {
      matchesDuration = (article.readingTime || 5) > 10;
    }

    return matchesSearch && matchesCategory && matchesDuration;
  });

  // Sort Logic
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
    if (sortBy === "oldest") {
      return new Date(a.publishedAt) - new Date(b.publishedAt);
    }
    return 0;
  });

  // Featured Hero Article (First article marked as featured, or the newest one)
  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  
  // Exclude featured article from the regular catalog listing to avoid repetition
  const listArticles = sortedArticles.filter((a) => a._id !== featuredArticle?._id);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(listArticles.length / postsPerPage);

  // Popular Articles (Top 5 list)
  const popularArticles = articles.slice(0, 5);

  // Trending tags list
  const trendingTags = [
    { label: "Forklift", slug: "forklift" },
    { label: "Gudang", slug: "gudang" },
    { label: "Warehouse", slug: "warehouse" },
    { label: "MaterialHandling", slug: "material-handling" },
    { label: "ElectricForklift", slug: "electric-forklift" },
    { label: "ReachTruck", slug: "reach-truck" },
    { label: "Safety", slug: "safety" },
    { label: "Logistik", slug: "logistik" },
  ];

  return (
    <>
      {/* Hero Header Section */}
      <section className="bg-brand-darkBg pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Artikel & Berita Terbaru
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Ikuti tips perawatan material handling, berita industri, dan pembaruan seputar PT Denko Wahana Sakti.
          </p>
        </div>
      </section>

      {/* Sub-Hero Stats Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm relative z-20">
        <div className="container mx-auto max-w-6xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
            <Link href="/" className="hover:text-brand-blue transition-colors">Beranda</Link>
            <span>&gt;</span>
            <span className="text-gray-900">Artikel</span>
          </nav>

          {/* Stats columns */}
          <div className="flex items-center gap-8 md:gap-12 text-xs text-gray-600">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-gray-900 block leading-tight">{articles.length}</span>
                <span className="text-[10px] text-gray-400">Artikel</span>
              </div>
            </div>
            <div className="border-l border-gray-200 h-8 hidden sm:block"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-gray-900 block leading-tight">{categories.length}</span>
                <span className="text-[10px] text-gray-400">Kategori</span>
              </div>
            </div>
            <div className="border-l border-gray-200 h-8 hidden sm:block"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-gray-900 block leading-tight">Update</span>
                <span className="text-[10px] text-gray-400">Setiap minggu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Section */}
      <section className="py-12 px-6 md:px-12 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left/Main Column (Col Span 8) */}
            <main className="lg:col-span-8 space-y-8">
              
              {/* Filters Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                {/* Search */}
                <div className="relative sm:col-span-4">
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-xs focus:outline-none focus:border-brand-blue transition-colors shadow-inner"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Category select */}
                <div className="relative sm:col-span-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs shadow-sm font-medium text-gray-700 outline-none focus:border-brand-blue transition-colors cursor-pointer appearance-none"
                  >
                    <option value="all">Semua Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Duration select */}
                <div className="relative sm:col-span-3">
                  <select
                    value={selectedDuration}
                    onChange={(e) => { setSelectedDuration(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs shadow-sm font-medium text-gray-700 outline-none focus:border-brand-blue transition-colors cursor-pointer appearance-none"
                  >
                    <option value="all">Semua Durasi</option>
                    <option value="short">Cepat (&lt; 5 mnt)</option>
                    <option value="medium">Sedang (5 - 10 mnt)</option>
                    <option value="long">Lama (&gt; 10 mnt)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative sm:col-span-2 flex gap-2">
                  <div className="relative flex-1">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs shadow-sm font-medium text-gray-700 outline-none focus:border-brand-blue transition-colors cursor-pointer appearance-none"
                    >
                      <option value="latest">Terbaru</option>
                      <option value="oldest">Terlama</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <button className="bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Big Slideshow/Featured Article Card */}
              {featuredArticle && !search && selectedCategory === "all" && currentPage === 1 && (
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 md:grid-cols-12 gap-0 relative">
                  {/* Image half */}
                  <div className="md:col-span-6 aspect-[16/11] md:aspect-auto relative bg-gray-50 overflow-hidden">
                    <img
                      src={featuredArticle.coverImage ? urlFor(featuredArticle.coverImage).width(600).height(450).url() : "/images/hero-forklift.jpg"}
                      alt={featuredArticle.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Content half */}
                  <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      {featuredArticle.category && (
                        <span className="inline-block bg-brand-blue/10 text-brand-blue text-[9px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-md">
                          {featuredArticle.category.name}
                        </span>
                      )}
                      
                      <h2 className="text-brand-darkBg font-display font-extrabold text-xl sm:text-2xl leading-tight">
                        <Link href={`/artikel/${featuredArticle.slug}`} className="hover:text-brand-blue transition-colors">
                          {featuredArticle.title}
                        </Link>
                      </h2>
                      
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Meta information */}
                      <div className="flex items-center gap-6 text-[10px] text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{featuredArticle.readingTime || 8} menit baca</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(featuredArticle.publishedAt).toLocaleDateString("id-ID", { 
                              day: "numeric", 
                              month: "long", 
                              year: "numeric" 
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Action link button */}
                      <Link 
                        href={`/artikel/${featuredArticle.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/30 active:scale-95 transition-all w-fit"
                      >
                        <span>Baca Selengkapnya</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Indicator slider dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 md:hidden">
                    <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  </div>
                </div>
              )}

              {/* Slider dots indicator for desktop (centered beneath card) */}
              {featuredArticle && !search && selectedCategory === "all" && currentPage === 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200 hover:bg-brand-blue/50 cursor-pointer transition-colors"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200 hover:bg-brand-blue/50 cursor-pointer transition-colors"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200 hover:bg-brand-blue/50 cursor-pointer transition-colors"></span>
                </div>
              )}

              {/* Section Header: Artikel Terbaru */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-4">
                <h3 className="text-brand-darkBg font-display font-extrabold text-lg">
                  Artikel Terbaru
                </h3>
                <Link href="/artikel" className="text-brand-blue hover:text-brand-blueDark font-bold text-xs flex items-center gap-1 transition-colors">
                  <span>Lihat semua artikel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Articles Grid List */}
              {currentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentPosts.map((post) => {
                    const coverUrl = post.coverImage ? urlFor(post.coverImage).width(400).height(250).url() : "/images/hero-forklift.jpg";
                    return (
                      <article 
                        key={post._id} 
                        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                      >
                        {/* Image Cover and Category badge overlay */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                          <Link href={`/artikel/${post.slug}`} className="block w-full h-full">
                            <img 
                              src={coverUrl} 
                              alt={post.title} 
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                            />
                          </Link>
                          {post.category && (
                            <span className="absolute bottom-3 left-3 bg-brand-blue text-white text-[8px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded shadow-md z-10">
                              {post.category.name}
                            </span>
                          )}
                        </div>

                        {/* Article Info */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-brand-darkBg font-bold text-xs sm:text-sm leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
                              <Link href={`/artikel/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h4>
                            <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="space-y-3">
                            {/* Meta items */}
                            <div className="flex items-center gap-3 text-[9px] text-gray-400 pt-3 border-t border-gray-50">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span>
                                  {new Date(post.publishedAt).toLocaleDateString("id-ID", { 
                                    day: "numeric", 
                                    month: "short", 
                                    year: "numeric" 
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span>{post.readingTime || 5} mnt</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3 text-gray-400" />
                                <span>{100 + Math.floor(Math.random() * 200)}</span>
                              </div>
                            </div>

                            {/* Baca link */}
                            <Link href={`/artikel/${post.slug}`} className="text-brand-blue hover:text-brand-blueDark font-bold text-[10px] flex items-center gap-0.5 transition-colors pt-1">
                              <span>Baca</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
                  <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-gray-700 font-bold text-sm">Tidak Ada Artikel</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Silakan masukkan kata kunci pencarian lain atau pilih filter yang berbeda.
                  </p>
                </div>
              )}

              {/* Bottom Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-blue disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array(totalPages).fill(0).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                        currentPage === i + 1
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                          : "border border-gray-200 bg-white text-gray-600 hover:text-brand-blue"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-blue disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </main>

            {/* Right Sidebar (Col Span 4) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Category Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-extrabold text-sm border-b border-gray-100 pb-2">
                  Kategori
                </h4>
                <div className="flex flex-col gap-1">
                  {/* All Categories Item */}
                  <button
                    onClick={() => { setSelectedCategory("all"); setCurrentPage(1); }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      selectedCategory === "all"
                        ? "bg-brand-blue/5 text-brand-blue font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>Semua Kategori</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedCategory === "all" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {articles.length}
                    </span>
                  </button>

                  {/* Dynamic Category Items */}
                  {categories.map((cat) => {
                    const count = getCategoryCount(cat.slug);
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                          selectedCategory === cat.slug
                            ? "bg-brand-blue/5 text-brand-blue font-bold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          selectedCategory === cat.slug ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Popular Articles Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-extrabold text-sm border-b border-gray-100 pb-2">
                  Artikel Terpopuler
                </h4>
                <div className="flex flex-col gap-4">
                  {popularArticles.map((post, idx) => (
                    <div key={post._id} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5 shadow-sm shadow-brand-blue/20">
                        {idx + 1}
                      </div>
                      <Link href={`/artikel/${post.slug}`} className="text-xs font-semibold text-gray-700 hover:text-brand-blue leading-snug line-clamp-2 transition-colors">
                        {post.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-extrabold text-sm border-b border-gray-100 pb-2">
                  Trending Topik
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag.slug}
                      onClick={() => setSearch(tag.label)}
                      className="bg-[#F8FAFC] hover:bg-brand-blue/5 border border-gray-100 hover:border-brand-blue/15 text-gray-500 hover:text-brand-blue text-[10px] font-semibold px-2.5 py-1.5 rounded-md transition-all flex items-center gap-0.5"
                    >
                      <Hash className="w-3 h-3 text-gray-400" />
                      <span>{tag.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-extrabold text-sm border-b border-gray-100 pb-2">
                  Newsletter
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Dapatkan update artikel dan informasi terbaru langsung di email Anda.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs bg-gray-50/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                  />
                  <button className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-brand-blue/10 active:scale-95 transition-all">
                    Berlangganan
                  </button>
                  <p className="text-[10px] text-gray-400 text-center pt-1">
                    🔒 Kami tidak akan membagikan email Anda.
                  </p>
                </div>
              </div>

            </aside>

          </div>

          {/* Solution Call to Action Banner (Bottom) */}
          <section className="mt-16 bg-gradient-to-r from-brand-blue to-brand-blueDark rounded-3xl p-8 sm:p-10 shadow-xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" style={{ backgroundImage: "url('/images/office.jpg')" }}></div>
            
            <div className="flex items-center gap-5 relative z-10 w-full md:w-3/4">
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-display font-extrabold text-base sm:text-lg">
                  Butuh Solusi Material Handling untuk Bisnis Anda?
                </h4>
                <p className="text-white/80 text-xs sm:text-sm">
                  Tim ahli kami siap membantu Anda menemukan solusi terbaik untuk kebutuhan gudang dan operasional Anda.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 shrink-0">
              <a 
                href="https://wa.me/6285724380347?text=Halo%20Pak%20Agung%20Ramdhani,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20material%20handling%20perusahaan%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0F172A] hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4 text-brand-blueLight" />
                <span>Konsultasi Gratis</span>
              </a>
              <Link 
                href="/products"
                className="bg-white hover:bg-gray-50 text-brand-blue hover:text-brand-blueDark font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl flex items-center justify-center transition-all border border-gray-100"
              >
                Lihat Produk
              </Link>
            </div>
          </section>

        </div>
      </section>
    </>
  );
}
