import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export default function ArticleCard({ article }) {
  const imageUrl = article.coverImage ? urlFor(article.coverImage).width(600).height(400).url() : "/images/hero-forklift.jpg";
  const authorAvatarUrl = article.author?.avatar ? urlFor(article.author.avatar).width(80).height(80).url() : null;

  return (
    <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      <Link href={`/artikel/${article.slug}`} className="block relative overflow-hidden aspect-[16/10] bg-gray-100">
        <img
          src={imageUrl}
          alt={article.title}
          loading="lazy"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {article.category && (
          <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-md">
            {article.category.name}
          </span>
        )}
      </Link>
      
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span>•</span>
            <span>{article.readingTime || 5} min read</span>
          </div>
          
          <h3 className="text-brand-darkBg font-display font-bold text-lg leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
            <Link href={`/artikel/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          
          <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {authorAvatarUrl ? (
              <img src={authorAvatarUrl} alt={article.author.name} className="w-8 h-8 rounded-full object-cover border border-gray-100" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold uppercase">
                {article.author?.name ? article.author.name.charAt(0) : "D"}
              </div>
            )}
            <span className="text-xs font-semibold text-gray-700">{article.author?.name || "DWS Admin"}</span>
          </div>

          <Link href={`/artikel/${article.slug}`} className="text-brand-blue group-hover:text-brand-blueDark font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors">
            Baca
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
