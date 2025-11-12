export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 bg-gray-300 rounded w-64 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl h-32"></div>
          ))}
        </div>
        <div className="bg-white rounded-xl h-96"></div>
      </div>
    </div>
  );
}