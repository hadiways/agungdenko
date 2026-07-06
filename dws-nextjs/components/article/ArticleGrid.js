import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 bg-brand-lightBg rounded-3xl border border-gray-100">
        <p className="text-gray-500 text-sm">Tidak ada artikel ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <div key={article._id}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
}
