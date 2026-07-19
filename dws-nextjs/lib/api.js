export function getApiUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  return url.replace(/\/+$/, "");
}

export function formatProduct(p) {
  if (!p) return null;
  const categoryName = typeof p.category === "object" ? (p.category?.name || "Forklifts") : (p.category || "Forklifts");
  const thumbnail = p.thumbnail || p.image || "/images/products/forklift-electric.jpg";
  
  let images = [thumbnail];
  if (Array.isArray(p.images) && p.images.length > 0) {
    p.images.forEach(img => {
      const url = typeof img === "string" ? img : (img?.url || img?.path);
      if (url && !images.includes(url)) {
        images.push(url);
      }
    });
  }

  return {
    id: p.id,
    name: p.name || "",
    slug: p.slug || "",
    category: categoryName,
    image: thumbnail,
    images: images,
    description: p.description || p.short_description || "",
    short_description: p.short_description || p.description || "",
    specification: p.specification || "",
    isCustom: true
  };
}

export async function fetchProducts() {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const list = json.data || json;
    if (!Array.isArray(list)) return [];
    return list.map(formatProduct);
  } catch (err) {
    console.error("Failed to fetch products from API:", err);
    return [];
  }
}

export async function fetchProductBySlug(slug) {
  if (!slug) return null;
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/products/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success === false) return null;
    const data = json.data || json;
    return formatProduct(data);
  } catch (err) {
    console.error(`Failed to fetch product with slug ${slug}:`, err);
    return null;
  }
}
