export const dynamic = "force-static";

import { sanityFetch } from "@/lib/sanity/fetch";
import { ARTICLES_QUERY } from "@/lib/sanity/queries";

export async function GET() {
  const baseUrl = "https://www.dws.co.id";
  let articles = [];

  try {
    articles = await sanityFetch(ARTICLES_QUERY);
  } catch (err) {
    console.error("Error fetching articles for RSS feed", err);
  }

  const itemsXml = articles
    .map((article) => {
      return `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <link>${baseUrl}/artikel/${article.slug}</link>
          <guid>${baseUrl}/artikel/${article.slug}</guid>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
          <description><![CDATA[${article.excerpt || ""}]]></description>
        </item>
      `;
    })
    .join("");

  const feedXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>PT Denko Wahana Sakti</title>
        <link>${baseUrl}</link>
        <description>Berita &amp; Artikel Industri PT Denko Wahana Sakti</description>
        <language>id</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
        ${itemsXml}
      </channel>
    </rss>
  `;

  return new Response(feedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
