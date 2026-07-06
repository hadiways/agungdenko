import { sanityFetch } from "@/lib/sanity/fetch";
import { ARTICLE_BY_SLUG_QUERY, ALL_SLUGS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Breadcrumbs from "@/components/article/Breadcrumbs";
import ArticleContent from "@/components/article/ArticleContent";
import AuthorCard from "@/components/article/AuthorCard";
import ShareButtons from "@/components/article/ShareButtons";
import ReadingProgress from "@/components/article/ReadingProgress";
import TOC from "@/components/article/TOC";
import RelatedArticles from "@/components/article/RelatedArticles";
import { notFound } from "next/navigation";

export const dynamicParams = false;
 
// Generate static params for Next static export compilation
export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch(ALL_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch (err) {
    console.error("Error generating static params", err);
    return [];
  }
}

// Generate SEO metadata dynamically for crawlers
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
  const article = await sanityFetch(ARTICLE_BY_SLUG_QUERY, { slug });

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

  const breadcrumbsItems = [
    { label: "Artikel", href: "/artikel" },
    { label: article.category?.name || "Kategori", href: article.category?.slug ? `/artikel/category/${article.category.slug}` : null },
    { label: article.title }
  ];

  return (
    <>
      {/* JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <main className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-5xl space-y-8">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbsItems} />

          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            {article.category && (
              <span className="inline-block bg-brand-blue/10 text-brand-blue text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                {article.category.name}
              </span>
            )}
            
            <h1 className="text-brand-darkBg font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              {article.title}
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs md:text-sm text-gray-500 border-b border-gray-100 pb-6">
              {authorAvatarUrl ? (
                <img src={authorAvatarUrl} alt={article.author.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold uppercase">
                  {article.author?.name ? article.author.name.charAt(0) : "D"}
                </div>
              )}
              <div>
                <span className="font-bold text-gray-700 block sm:inline">{article.author?.name || "DWS Admin"}</span>
                <span className="hidden sm:inline mx-2">•</span>
                <span>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="mx-2">•</span>
                <span>{article.readingTime || 5} min read</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] w-full border border-gray-100 shadow-sm bg-gray-50">
            <img src={coverImageUrl} alt={article.title} className="object-cover w-full h-full" />
          </div>

          {/* Grid Layout Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
            {/* Main content body */}
            <div className="lg:col-span-8 space-y-8">
              <ArticleContent content={article.content} />
              
              <ShareButtons title={article.title} />

              <AuthorCard author={article.author} />
            </div>

            {/* Sticky Table of Contents */}
            <aside className="lg:col-span-4 hidden lg:block h-fit sticky top-24 space-y-6">
              <TOC content={article.content} />
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
