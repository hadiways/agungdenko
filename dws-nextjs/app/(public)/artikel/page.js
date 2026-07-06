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
  FileText,
  FolderOpen,
  ChevronDown,
  Home
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

  const postsPerPage = 9;

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

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case "tips-perawatan":
      case "tips-dan-perawatan":
      case "tips":
        return <Wrench className="w-4 h-4 text-brand-blueLight" />;
      case "berita-industri":
      case "berita":
        return <Newspaper className="w-4 h-4 text-brand-blueLight" />;
      case "produk":
        return <Box className="w-4 h-4 text-brand-blueLight" />;
      case "perusahaan":
        return <Building2 className="w-4 h-4 text-brand-blueLight" />;
      default:
        return <FileText className="w-4 h-4 text-brand-blueLight" />;
    }
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

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedArticles.length / postsPerPage);

  return (
    <>
      {/* Hero Header Section */}
      <section className="bg-brand-darkBg pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 z-0" 
          style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darkBg via-brand-darkBg/90 to-transparent z-1"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/60 text-xs font-semibold">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <span className="text-white">Artikel</span>
          </nav>
          
          <div className="space-y-3">
            <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Artikel & Berita Terbaru
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
              Ikuti tips perawatan material handling, berita industri, dan pembaruan seputar PT Denko Wahana Sakti.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Content Section */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar (Col Span 1) */}
            <aside className="lg:col-span-1 space-y-6">
              
              {/* Category Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
                <h4 className="text-brand-blue font-bold text-xs uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Semua Kategori</span>
                </h4>
                <div className="flex flex-col gap-1.5">
                  {/* All Articles Button */}
                  <button
                    onClick={() => { setSelectedCategory("all"); setCurrentPage(1); }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      selectedCategory === "all"
                        ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15 font-bold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Semua Artikel</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {articles.length}
                    </span>
                  </button>

                  {/* Dynamic Categories */}
                  {categories.map((cat) => {
                    const count = getCategoryCount(cat.slug);
                    const isActive = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                          isActive
                            ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15 font-bold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(cat.slug)}
                          <span>{cat.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shadow-inner">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-brand-darkBg font-bold text-xs sm:text-sm">
                    Berlangganan Newsletter
                  </h4>
                </div>
                <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">
                  Dapatkan update artikel dan informasi terbaru langsung di email Anda.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs bg-gray-50/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all shadow-inner"
                  />
                  <button className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md shadow-brand-blue/15 active:scale-95 transition-all">
                    Langganan
                  </button>
                </div>
              </div>

            </aside>

            {/* Right Main Content (Col Span 3) */}
            <main className="lg:col-span-3 space-y-6">
              
              {/* Filter and Stats Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                {/* Stats Info */}
                <div className="text-xs text-gray-500 font-medium">
                  {sortedArticles.length > 0 ? (
                    <span>
                      Menampilkan <strong className="text-gray-900">{indexOfFirstPost + 1}–{Math.min(indexOfLastPost, sortedArticles.length)}</strong> dari <strong className="text-gray-900">{sortedArticles.length}</strong> artikel
                    </span>
                  ) : (
                    <span>Menampilkan 0 artikel</span>
                  )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {/* Search bar */}
                  <div className="relative flex-grow sm:flex-grow-0 sm:w-48">
                    <input
                      type="text"
                      placeholder="Cari artikel..."
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 pr-8 text-xs focus:outline-none focus:border-brand-blue transition-colors shadow-inner"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Sort Select */}
                  <div className="relative w-28 sm:w-auto">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue transition-colors cursor-pointer appearance-none shadow-sm"
                    >
                      <option value="latest">Terbaru</option>
                      <option value="oldest">Terlama</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
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
                              className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500" 
                            />
                          </Link>
                          {post.category && (
                            <span className="absolute bottom-3 left-3 bg-brand-blue text-white text-[8px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded shadow-md z-10">
                              {post.category.name}
                            </span>
                          )}
                        </div>

                        {/* Article Info */}
                        <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
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

                          {/* Meta items */}
                          <div className="flex items-center gap-3 text-[9px] text-gray-400 pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span>
                                {new Date(post.publishedAt).toLocaleDateString("id-ID", { 
                                  day: "numeric", 
                                  month: "short", 
                                  year: "numeric" 
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span>{post.readingTime || 5} mnt baca</span>
                            </div>
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

          </div>
        </div>
      </section>
    </>
  );
}
