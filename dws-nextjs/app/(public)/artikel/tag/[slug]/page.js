import { sanityFetch } from "@/lib/sanity/fetch";
import { ARTICLES_BY_TAG_QUERY, ALL_TAGS_QUERY } from "@/lib/sanity/queries";
import ArticleGrid from "@/components/article/ArticleGrid";
import Breadcrumbs from "@/components/article/Breadcrumbs";

export const dynamicParams = false;

// Generate tags static params for compilation
export async function generateStaticParams() {
  try {
    const tags = await sanityFetch(ALL_TAGS_QUERY);
    if (!tags || tags.length === 0) {
      return [{ slug: "placeholder" }];
    }
    return tags.map((t) => ({ slug: t.slug }));
  } catch (err) {
    console.error("Error generating tags static params", err);
    return [{ slug: "placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tags = await sanityFetch(ALL_TAGS_QUERY);
  const currentTag = tags.find((t) => t.slug === slug);
  const name = currentTag ? currentTag.name : "Tag";

  return {
    title: `Artikel Tag #${name} | PT Denko Wahana Sakti`,
    description: `Kumpulan artikel dengan label tag #${name} dari PT Denko Wahana Sakti.`,
  };
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const tags = await sanityFetch(ALL_TAGS_QUERY);
  const currentTag = tags.find((t) => t.slug === slug);
  const name = currentTag ? currentTag.name : "Tag";

  const articles = await sanityFetch(ARTICLES_BY_TAG_QUERY, { tagSlug: slug });

  const breadcrumbsItems = [
    { label: "Artikel", href: "/artikel" },
    { label: `Tag: #${name}` }
  ];

  return (
    <main className="py-24 px-6 md:px-12 bg-brand-lightBg min-h-screen">
      <div className="container mx-auto max-w-5xl space-y-8">
        
        <Breadcrumbs items={breadcrumbsItems} />

        <div className="border-b border-gray-200 pb-6">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-2">TAG ARTIKEL</span>
          <h1 className="text-brand-darkBg font-display font-extrabold text-3xl md:text-4xl">
            #{name}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Menampilkan {articles.length} artikel dengan tag #{name}.
          </p>
        </div>

        <div className="pt-4">
          <ArticleGrid articles={articles} />
        </div>

      </div>
    </main>
  );
}
