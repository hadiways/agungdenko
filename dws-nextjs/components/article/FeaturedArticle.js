import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  const imageUrl = article.coverImage ? urlFor(article.coverImage).width(1200).height(675).url() : "/images/hero-forklift.jpg";
  const authorAvatarUrl = article.author?.avatar ? urlFor(article.author.avatar).width(80).height(80).url() : null;

  return (
    <div className="bg-brand-darkBg text-white rounded-3xl overflow-hidden shadow-2xl border border-white/5 group relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Banner Image */}
        <Link href={`/artikel/${article.slug}`} className="block relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:col-span-7 bg-brand-lightBg/5 min-h-[300px]">
          <img
            src={imageUrl}
            alt={article.title}
            className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-darkBg via-transparent to-transparent opacity-60"></div>
          {article.category && (
            <span className="absolute top-6 left-6 bg-brand-blue text-white text-xs uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-md z-10">
              {article.category.name}
            </span>
          )}
        </Link>

        {/* Content Info */}
        <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-between space-y-8 relative z-10 bg-brand-darkBg">
          <div className="space-y-4">
            <span className="text-brand-blueLight font-bold text-xs uppercase tracking-widest block">ARTIKEL UNGGULAN</span>
            
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span>•</span>
              <span>{article.readingTime || 5} min read</span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-brand-blueLight transition-colors leading-tight">
              <Link href={`/artikel/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-4">
              {article.excerpt}
            </p>
          </div>

          <div className="border-t border-white/5 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {authorAvatarUrl ? (
                <img src={authorAvatarUrl} alt={article.author.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-blueLight text-sm font-bold uppercase">
                  {article.author?.name ? article.author.name.charAt(0) : "D"}
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-white">{article.author?.name || "DWS Admin"}</h4>
                <p className="text-[10px] text-gray-500">Author</p>
              </div>
            </div>

            <Link href={`/artikel/${article.slug}`} className="bg-white/10 hover:bg-brand-blue text-white hover:text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-lg">
              Baca Selengkapnya
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
