export const dynamic = "force-static";

import { sanityFetch } from "@/lib/sanity/fetch";
import { ALL_SLUGS_QUERY } from "@/lib/sanity/queries";

export default async function sitemap() {
  const baseUrl = "https://www.dws.co.id";

  // Static routes
  const routes = [
    "",
    "/about",
    "/products",
    "/services",
    "/gallery",
    "/testimonials",
    "/contact",
    "/artikel",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic articles routes from Sanity
  let articleRoutes = [];
  try {
    const slugs = await sanityFetch(ALL_SLUGS_QUERY);
    articleRoutes = slugs.map((slug) => ({
      url: `${baseUrl}/artikel/${slug}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Error fetching slugs for sitemap", err);
  }

  return [...routes, ...articleRoutes];
}
