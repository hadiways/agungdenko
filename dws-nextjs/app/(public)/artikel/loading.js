export default function ArtikelLoading() {
  return (
    <div className="container mx-auto px-6 py-32 max-w-6xl space-y-12">
      {/* Featured Card Skeleton */}
      <div className="bg-gray-200/60 animate-pulse rounded-3xl h-[400px] w-full"></div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4">
            <div className="bg-gray-200/60 animate-pulse rounded-2xl aspect-[16/10] w-full"></div>
            <div className="bg-gray-200/60 animate-pulse rounded h-6 w-3/4"></div>
            <div className="bg-gray-200/60 animate-pulse rounded h-4 w-full"></div>
            <div className="bg-gray-200/60 animate-pulse rounded h-4 w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
