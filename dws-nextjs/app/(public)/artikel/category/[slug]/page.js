import { sanityFetch } from "@/lib/sanity/fetch";
import { ARTICLES_BY_CATEGORY_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries";
import ArticleGrid from "@/components/article/ArticleGrid";
import Breadcrumbs from "@/components/article/Breadcrumbs";

export const dynamicParams = false;

// Generate categories static slugs
export async function generateStaticParams() {
  try {
    const categories = await sanityFetch(ALL_CATEGORIES_QUERY);
    if (!categories || categories.length === 0) {
      return [{ slug: "placeholder" }];
    }
    return categories.map((cat) => ({ slug: cat.slug }));
  } catch (err) {
    console.error("Error generating categories static params", err);
    return [{ slug: "placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const categories = await sanityFetch(ALL_CATEGORIES_QUERY);
  const currentCategory = categories.find((cat) => cat.slug === slug);
  const name = currentCategory ? currentCategory.name : "Kategori";

  return {
    title: `Artikel Kategori ${name} | PT Denko Wahana Sakti`,
    description: `Kumpulan artikel, tips, dan pembaruan seputar ${name} dari PT Denko Wahana Sakti.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const categories = await sanityFetch(ALL_CATEGORIES_QUERY);
  const currentCategory = categories.find((cat) => cat.slug === slug);
  const name = currentCategory ? currentCategory.name : "Kategori";

  const articles = await sanityFetch(ARTICLES_BY_CATEGORY_QUERY, { categorySlug: slug });

  const breadcrumbsItems = [
    { label: "Artikel", href: "/artikel" },
    { label: `Kategori: ${name}` }
  ];

  return (
    <main className="py-24 px-6 md:px-12 bg-brand-lightBg min-h-screen">
      <div className="container mx-auto max-w-5xl space-y-8">
        
        <Breadcrumbs items={breadcrumbsItems} />

        <div className="border-b border-gray-200 pb-6">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-widest block mb-2">KATEGORI ARTIKEL</span>
          <h1 className="text-brand-darkBg font-display font-extrabold text-3xl md:text-4xl">
            {name}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Menampilkan {articles.length} artikel di bawah kategori {name}.
          </p>
        </div>

        <div className="pt-4">
          <ArticleGrid articles={articles} />
        </div>

      </div>
    </main>
  );
}
