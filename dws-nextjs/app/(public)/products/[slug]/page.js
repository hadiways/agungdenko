import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProductBySlug } from "@/lib/api";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan - PT Denko Wahana Sakti",
      description: "Halaman atau produk yang Anda cari tidak ditemukan di katalog PT Denko Wahana Sakti."
    };
  }

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

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  return <ProductDetailClient slug={slug} />;
}

