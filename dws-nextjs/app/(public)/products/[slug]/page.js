import scrapedProducts from "@/data/scraped_products.json";
import ProductDetailClient from "@/components/ProductDetailClient";

// Mandatory for static exports in Next.js App Router
export async function generateStaticParams() {
  return scrapedProducts.map((p) => ({
    slug: p.slug,
  }));
}

// Server-side page routing entry
export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  
  // Find product in initial data list
  const product = scrapedProducts.find((p) => p.slug === resolvedParams.slug);
  
  // Find related base products
  const related = product 
    ? scrapedProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8)
    : [];

  return (
    <ProductDetailClient 
      initialProduct={product} 
      relatedProducts={related} 
    />
  );
}
