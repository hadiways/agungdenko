import { sanityFetch } from "@/lib/sanity/fetch";
import { 
  ARTICLE_BY_SLUG_QUERY, 
  ALL_SLUGS_QUERY, 
  ALL_CATEGORIES_QUERY, 
  ARTICLES_QUERY, 
  ALL_TAGS_QUERY 
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ArticleContent from "@/components/article/ArticleContent";
import AuthorCard from "@/components/article/AuthorCard";
import ShareButtons from "@/components/article/ShareButtons";
import ReadingProgress from "@/components/article/ReadingProgress";
import TOC from "@/components/article/TOC";
import RelatedArticles from "@/components/article/RelatedArticles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Eye, 
  Home, 
  LayoutGrid, 
  Wrench, 
  Newspaper, 
  Box, 
  Building2, 
  Mail, 
  Hash 
} from "lucide-react";

export const dynamicParams = false;
 
export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch(ALL_SLUGS_QUERY);
    if (!slugs || slugs.length === 0) {
      return [{ slug: "placeholder" }];
    }
    return slugs.map((slug) => ({ slug }));
  } catch (err) {
    console.error("Error generating static params", err);
    return [{ slug: "placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = await sanityFetch(ARTICLE_BY_SLUG_QUERY, { slug });

  if (!article) return {};

  const title = article.seoTitle || `${article.title} | PT Denko Wahana Sakti`;
  const description = article.seoDescription || article.excerpt;
  const ogImageUrl = article.seoImage 
    ? urlFor(article.seoImage).width(1200).height(630).url()
    : (article.coverImage ? urlFor(article.coverImage).width(1200).height(630).url() : "https://www.dws.co.id/images/hero-forklift.jpg");

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.dws.co.id/artikel/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.dws.co.id/artikel/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = params;

  // Parallel fetch Sanity data
  const [article, categories, allArticles, tags] = await Promise.all([
    sanityFetch(ARTICLE_BY_SLUG_QUERY, { slug }),
    sanityFetch(ALL_CATEGORIES_QUERY),
    sanityFetch(ARTICLES_QUERY),
    sanityFetch(ALL_TAGS_QUERY),
  ]);

  if (!article) {
    notFound();
  }

  const coverImageUrl = article.coverImage ? urlFor(article.coverImage).width(1200).height(675).url() : "/images/hero-forklift.jpg";
  const authorAvatarUrl = article.author?.avatar ? urlFor(article.author.avatar).width(80).height(80).url() : null;

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [coverImageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "PT Denko Wahana Sakti",
      "url": article.author?.slug ? `https://www.dws.co.id/author/${article.author.slug}` : "https://www.dws.co.id",
    },
    "publisher": {
      "@type": "Organization",
      "name": "PT Denko Wahana Sakti",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.dws.co.id/images/logo.png"
      }
    },
    "description": article.excerpt || article.seoDescription,
  };

  const getCategoryCount = (categorySlug) => {
    return allArticles.filter((a) => a.category?.slug === categorySlug).length;
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

  // Popular Articles (Top 5 list)
  const popularArticles = allArticles.slice(0, 5);

  // Generate dynamic tags list for widget
  const widgetTags = tags || [
    { name: "Forklift", slug: "forklift" },
    { name: "Gudang", slug: "gudang" },
    { name: "Warehouse", slug: "warehouse" },
    { name: "MaterialHandling", slug: "material-handling" },
    { name: "Safety", slug: "safety" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />

      <main className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-gray-400 text-xs font-semibold">
            <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span>&gt;</span>
            <Link href="/artikel" className="hover:text-brand-blue transition-colors">Artikel</Link>
            {article.category && (
              <>
                <span>&gt;</span>
                <Link href={`/artikel/category/${article.category.slug}`} className="hover:text-brand-blue transition-colors">
                  {article.category.name}
                </Link>
              </>
            )}
            <span>&gt;</span>
            <span className="text-gray-600 line-clamp-1">{article.title}</span>
          </nav>

          {/* Header Metadata */}
          <div className="space-y-4 max-w-4xl">
            {article.category && (
              <span className="inline-block bg-brand-blue text-white text-[9px] uppercase font-extrabold tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                {article.category.name}
              </span>
            )}
            
            <h1 className="text-brand-darkBg font-display font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
              {article.title}
            </h1>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-b border-gray-100 pb-5 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-3">
                {authorAvatarUrl ? (
                  <img src={authorAvatarUrl} alt={article.author.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold uppercase">
                    {article.author?.name ? article.author.name.charAt(0) : "D"}
                  </div>
                )}
                <div>
                  <span className="font-bold text-gray-700 block leading-tight">{article.author?.name || "Tim DWS"}</span>
                  <span className="text-[10px] text-gray-400">PT Denko Wahana Sakti</span>
                </div>
                <span className="hidden sm:inline text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <span className="hidden sm:inline text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{article.readingTime || 5} menit baca</span>
                </div>
                <span className="hidden sm:inline text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{120 + Math.floor(Math.random() * 200)} views</span>
                </div>
              </div>

              {/* Inlined small share buttons in header */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs font-bold uppercase">Bagikan:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://agungdenko.asia/artikel/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=https://agungdenko.asia/artikel/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title)}%20https://agungdenko.asia/artikel/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" /><path d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] w-full border border-gray-100 shadow-sm bg-gray-50">
            <img src={coverImageUrl} alt={article.title} className="object-cover w-full h-full" />
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            
            {/* Left Column (Col Span 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Table of Contents Widget */}
              <TOC content={article.content} />
              
              {/* Article Content Parser */}
              <ArticleContent content={article.content} />
              
              {/* Bottom Share Row */}
              <ShareButtons title={article.title} />

              {/* Author Biography */}
              <AuthorCard author={article.author} />

            </div>

            {/* Right Sidebar Column (Col Span 4) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Category Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-bold text-sm border-b border-gray-100 pb-2">
                  Kategori
                </h4>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => {
                    const count = getCategoryCount(cat.slug);
                    return (
                      <Link
                        key={cat.slug}
                        href={`/artikel/category/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(cat.slug)}
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Popular Articles Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-bold text-sm border-b border-gray-100 pb-2">
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

              {/* Tags Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="text-brand-darkBg font-display font-bold text-sm border-b border-gray-100 pb-2">
                  Tag Populer
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {widgetTags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/artikel/tag/${tag.slug}`}
                      className="bg-brand-blue/5 border border-blue-50/50 hover:border-brand-blue/15 text-brand-blue hover:text-brand-blueDark text-[10px] font-semibold px-2.5 py-1.5 rounded-md transition-all flex items-center gap-0.5"
                    >
                      <Hash className="w-3 h-3 text-brand-blueLight" />
                      <span>{tag.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shadow-inner">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-brand-darkBg font-bold text-xs sm:text-sm">
                    Newsletter
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
                    Berlangganan
                  </button>
                </div>
              </div>

              {/* CTA Widget */}
              <div className="bg-[#0B1B2B] text-white border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between h-64">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" style={{ backgroundImage: "url('/images/hero-forklift.jpg')" }}></div>
                <div className="relative z-10 space-y-3">
                  <h4 className="font-display font-extrabold text-sm sm:text-base leading-snug">
                    Butuh Forklift untuk Bisnis Anda?
                  </h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Dapatkan konsultasi gratis untuk menemukan forklift yang tepat sesuai kebutuhan gudang Anda.
                  </p>
                </div>
                <div className="relative z-10 pt-4">
                  <a
                    href="https://wa.me/6285724380347?text=Halo%20Pak%20Agung%20Ramdhani,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20forklift%20perusahaan%20saya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-gray-100 text-brand-darkBg font-bold text-xs py-3 rounded-xl flex items-center justify-center transition-all shadow-md shadow-black/10"
                  >
                    Konsultasi Gratis
                  </a>
                </div>
              </div>

            </aside>

          </div>

          {/* Related Articles list */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <RelatedArticles articles={article.relatedArticles} />
          )}

        </div>
      </main>
    </>
  );
}
