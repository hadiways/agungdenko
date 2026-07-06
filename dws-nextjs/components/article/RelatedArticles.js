import ArticleCard from "./ArticleCard";

export default function RelatedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-gray-100">
      <h3 className="text-brand-darkBg font-display font-bold text-xl">Artikel Terkait</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.slice(0, 3).map((article) => (
          <div key={article._id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
