<?php
// Dynamic Sitemap Generator for agungdenko.asia
// Fetches live published articles directly from Sanity CMS API

header("Content-Type: application/xml; charset=utf-8");

$baseUrl = "https://agungdenko.asia";

// Static routes
$routes = [
    "",
    "/about",
    "/products",
    "/services",
    "/gallery",
    "/testimonials",
    "/contact",
    "/artikel"
];

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// 1. Output Static Routes
foreach ($routes as $route) {
    echo '  <url>' . "\n";
    echo '    <loc>' . $baseUrl . $route . '</loc>' . "\n";
    echo '    <lastmod>' . date('Y-m-d') . '</lastmod>' . "\n";
    echo '    <changefreq>' . ($route === "" ? "daily" : "monthly") . '</changefreq>' . "\n";
    echo '    <priority>' . ($route === "" ? "1.0" : "0.8") . '</priority>' . "\n";
    echo '  </url>' . "\n";
}

// 2. Fetch Dynamic Article Routes from Sanity CMS
$sanityProjectId = "wqs3olp2";
$dataset = "production";
$apiVersion = "v2021-10-21";

// Retrieve slug and published date of all published articles
$query = '*[_type == "article" && status == "published"] { "slug": slug.current, publishedAt }';
$url = "https://{$sanityProjectId}.api.sanity.io/{$apiVersion}/data/query/{$dataset}?query=" . urlencode($query);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);
curl_setopt($ch, CURLOPT_USERAGENT, "Caddy Sitemap Generator/1.0");

$response = curl_exec($ch);
curl_close($ch);

if ($response) {
    $resData = json_decode($response, true);
    if (isset($resData['result']) && is_array($resData['result'])) {
        foreach ($resData['result'] as $article) {
            if (empty($article['slug'])) continue;
            
            $slug = $article['slug'];
            // Fallback to today if publishedAt is empty
            $pubDate = !empty($article['publishedAt']) 
                ? date('Y-m-d', strtotime($article['publishedAt'])) 
                : date('Y-m-d');

            echo '  <url>' . "\n";
            echo '    <loc>' . $baseUrl . '/artikel/' . htmlspecialchars($slug) . '</loc>' . "\n";
            echo '    <lastmod>' . $pubDate . '</lastmod>' . "\n";
            echo '    <changefreq>weekly</changefreq>' . "\n";
            echo '    <priority>0.6</priority>' . "\n";
            echo '  </url>' . "\n";
        }
    }
}

echo '</urlset>' . "\n";
