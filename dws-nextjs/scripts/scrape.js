import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://denkowahanasakti.co.id";

const CATEGORIES = [
  { name: "Material Handling", slug: "material-handling" },
  { name: "Dalton Hardware Tools", slug: "dalton-hardware-tools" },
  { name: "Castor Wheel Division", slug: "castor-wheel-division" },
  { name: "Turbin Ventilator", slug: "turbin-ventilator" }
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch helper with retries and timeout
async function fetchWithRetry(url, retries = 5, backoff = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(30000) // 30s timeout
      });
      if (response.ok) return response;
      if (response.status === 404) return null;
      console.warn(`Fetch warning: ${url} returned status ${response.status}. Retrying in ${backoff * (i + 1)}ms...`);
    } catch (err) {
      console.warn(`Fetch error for ${url}: ${err.message}. Retrying in ${backoff * (i + 1)}ms...`);
    }
    await delay(backoff * (i + 1));
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

// Helper to clean HTML entities and text
function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s{2,}/g, '\n\n')
    .trim();
}

async function scrapeAll() {
  const products = [];
  const visitedUrls = new Set();
  const queue = [];

  // 1. Initialize queue with the first page of each category
  for (const cat of CATEGORIES) {
    queue.push({
      url: `${BASE_URL}/category/${cat.slug}/`,
      type: 'archive',
      category: cat.name
    });
  }

  console.log(`Starting scraper. Initial queue size: ${queue.length}`);

  while (queue.length > 0) {
    const current = queue.shift();
    const url = current.url.replace(/^http:/, 'https:'); // Normalize to HTTPS

    if (visitedUrls.has(url)) {
      continue;
    }
    visitedUrls.add(url);

    console.log(`Processing (${current.type}): ${url}`);
    await delay(200); // 200ms polite delay between pages

    try {
      const response = await fetchWithRetry(url);
      if (!response) {
        console.warn(`Page not found (404): ${url}`);
        continue;
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      if (current.type === 'archive') {
        // A. Handle category archive pages
        // 1. Extract all product list links on this page
        $('.entry-title a').each((_, el) => {
          const href = $(el).attr('href');
          if (href) {
            const absoluteHref = href.startsWith('/') ? `${BASE_URL}${href}` : href;
            queue.push({
              url: absoluteHref,
              type: 'product',
              category: current.category
            });
          }
        });

        // 2. Extract pagination "Next Page" links (e.g. pagination or "Laman Berikutnya")
        $('a.next, a.nextpostslink').each((_, el) => {
          const href = $(el).attr('href');
          if (href) {
            const absoluteHref = href.startsWith('/') ? `${BASE_URL}${href}` : href;
            queue.push({
              url: absoluteHref,
              type: 'archive',
              category: current.category
            });
          }
        });
      } else {
        // B. Handle product detail/group pages
        // Extract title
        let title = $('h1.entry-title').text().trim();
        if (!title) {
          title = $('title').text().trim();
        }
        // Remove corporate suffix
        title = title.replace(/\s*[-–|]\s*PT\.\s*Denko\s*Wahana\s*Sakti.*$/i, '').trim();

        if (!title || title.toLowerCase() === 'home' || title.toLowerCase() === 'beranda') {
          console.warn(`Skipping page with title: ${title} for: ${url}`);
          continue;
        }

        // Get slug from URL
        const urlObj = new URL(url);
        const slug = urlObj.pathname.split('/').filter(Boolean).pop() || '';
        if (!slug || slug === 'home' || slug === 'beranda') {
          continue;
        }

        const entryContent = $('.entry-content');
        entryContent.find('script, style').remove();

        // Extract and filter image URLs
        const images = [];
        entryContent.find('img').each((_, imgEl) => {
          let src = $(imgEl).attr('src');
          if (src) {
            src = src.replace(/^http:/, 'https:');
            if (src.startsWith('/')) {
              src = `${BASE_URL}${src}`;
            }
            // Filter out avatar, logs or tiny spacers
            if (src.includes('gravatar') || src.includes('spacer') || src.includes('logo') || src.includes('captcha')) {
              return;
            }
            images.push(src);
          }
        });

        const mainImage = images.length > 0 ? images[0] : '/images/products/forklift-electric.jpg';

        // Extract description
        const rawDesc = entryContent.text();
        const description = cleanText(rawDesc);

        // Store this product
        products.push({
          id: `scraped-${slug}`,
          name: title,
          slug: slug,
          category: current.category,
          description: description,
          image: mainImage,
          images: images,
          source: url,
          scrapedAt: new Date().toISOString()
        });

        console.log(`  Scraped product: "${title}" (${images.length} images)`);

        // 3. Extract sub-product/detailed model links inside the page content
        entryContent.find('a').each((_, aEl) => {
          const href = $(aEl).attr('href');
          if (!href) return;

          // Normalize and check if it is an internal product link
          let absoluteHref = href.startsWith('/') ? `${BASE_URL}${href}` : href;
          absoluteHref = absoluteHref.replace(/^http:/, 'https:');

          if (absoluteHref.startsWith(BASE_URL)) {
            // Filter out: files, categories, author pages, contact pages, tags
            const lowercaseHref = absoluteHref.toLowerCase();
            const hasFileExtension = /\.(jpg|jpeg|png|gif|pdf|zip|doc|docx|xls|xlsx)$/i.test(lowercaseHref);
            const isSystemPage = lowercaseHref.includes('/category/') ||
                                 lowercaseHref.includes('/tag/') ||
                                 lowercaseHref.includes('/author/') ||
                                 lowercaseHref.includes('/contact') ||
                                 lowercaseHref.includes('/about') ||
                                 lowercaseHref.includes('/wp-content/') ||
                                 lowercaseHref.includes('/wp-admin/') ||
                                 lowercaseHref.includes('/wp-includes/');

            if (!hasFileExtension && !isSystemPage) {
              queue.push({
                url: absoluteHref,
                type: 'product',
                category: current.category
              });
            }
          }
        });
      }
    } catch (err) {
      console.error(`Error processing page ${url}:`, err.message);
    }
  }

  const outputPath = path.join(__dirname, '../data/scraped_products.json');
  let existingProducts = [];
  try {
    if (fs.existsSync(outputPath)) {
      existingProducts = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      console.log(`Loaded ${existingProducts.length} existing products from ${outputPath}`);
    }
  } catch (err) {
    console.warn("Failed to load existing products file, starting fresh:", err.message);
  }

  // Deduplicate products based on ID or source URL and merge with existing products
  const mergedProductsMap = new Map();
  for (const p of existingProducts) {
    mergedProductsMap.set(p.source, p);
  }
  for (const p of products) {
    if (p.source) {
      mergedProductsMap.set(p.source, p);
    }
  }
  const mergedProducts = Array.from(mergedProductsMap.values());

  console.log(`\n========================================`);
  console.log(`Scraping complete! Newly scraped items: ${products.length}`);
  console.log(`Merged with existing. Total products in database: ${mergedProducts.length}`);
  console.log(`========================================`);

  fs.writeFileSync(outputPath, JSON.stringify(mergedProducts, null, 2), 'utf-8');
  console.log(`Successfully saved products to: ${outputPath}`);
}

scrapeAll().catch(err => {
  console.error("Scraper crash:", err);
  process.exit(1);
});
