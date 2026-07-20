import { client } from "./client";

export async function sanityFetch(query, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (err) {
    console.warn("Sanity fetch error:", err);
    return [];
  }
}
