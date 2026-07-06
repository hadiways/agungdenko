"use client";

import { useState, useEffect } from "react";
import FeaturedArticle from "@/components/article/FeaturedArticle";
import ArticleGrid from "@/components/article/ArticleGrid";
import { sanityFetch } from "@/lib/sanity/fetch";
import { ARTICLES_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries";

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-32 max-w-6xl space-y-12">
        <div className="bg-gray-200/60 animate-pulse rounded-3xl h-[400px] w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4">
              <div className="bg-gray-200/60 animate-pulse rounded-2xl aspect-[16/10] w-full"></div>
              <div className="bg-gray-200/60 animate-pulse rounded h-6 w-3/4"></div>
              <div className="bg-gray-200/60 animate-pulse rounded h-4 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category?.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  
  const listArticles = articles.length > 1 
    ? filteredArticles.filter((a) => a._id !== featuredArticle?._id)
    : filteredArticles;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(listArticles.length / postsPerPage);

  return (
    <>
      {/* Title Header */}
      <section className="bg-brand-darkBg pt-32 pb-16 px-6 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block">PORTAL INFORMASI</span>
          <h1 className="text-white font-display font-extrabold text-3xl sm:text-4xl md:text-5xl">Artikel & Berita Terbaru</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Ikuti tips perawatan material handling, berita industri, dan pembaruan seputar PT Denko Wahana Sakti.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12 bg-brand-lightBg">
        <div className="container mx-auto max-w-6xl space-y-16">
          
          {/* Featured Article Banner */}
          {featuredArticle && currentPage === 1 && !search && selectedCategory === "all" && (
            <div className="space-y-4">
              <FeaturedArticle article={featuredArticle} />
            </div>
          )}

          {/* Filters & Search Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-200 pb-6">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none">
              <button
                onClick={() => { setSelectedCategory("all"); setCurrentPage(1); }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === "all"
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/10"
                    : "bg-white text-gray-500 hover:text-brand-blue border border-gray-100"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === cat.slug
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-white text-gray-500 hover:text-brand-blue border border-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 pr-10 text-sm focus:outline-none focus:border-brand-blue transition-colors shadow-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

          </div>

          {/* Grid List */}
          <div className="space-y-12">
            <ArticleGrid articles={currentPosts} />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-blue disabled:opacity-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                {Array(totalPages).fill(0).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-xs uppercase transition-all ${
                      currentPage === i + 1
                        ? "bg-brand-blue text-white shadow-md shadow-brand-blue/10"
                        : "border border-gray-200 bg-white text-gray-500 hover:text-brand-blue"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-blue disabled:opacity-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
