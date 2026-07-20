export const dynamic = "force-dynamic";
export const revalidate = 0;

import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProductBySlug } from "@/lib/api";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  try {
    const product = await fetchProductBySlug(slug);
    if (product) {
      return {
        title: `${product.name} - PT Denko Wahana Sakti`,
        description: product.short_description || product.description || `Jual ${product.name} garansi resmi distributor PT Denko Wahana Sakti Semarang.`,
        openGraph: {
          title: `${product.name} | PT Denko Wahana Sakti`,
          description: product.short_description || product.description,
          images: [
            {
              url: product.image,
              alt: product.name
            }
          ]
        }
      };
    }
  } catch (err) {
    // Graceful fallback for offline build / API downtime
  }

  return {
    title: "Detail Produk - PT Denko Wahana Sakti",
    description: "Lihat spesifikasi dan detail produk material handling PT Denko Wahana Sakti."
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  return <ProductDetailClient slug={slug} />;
}
