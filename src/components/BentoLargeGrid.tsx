export default function BentoLargeGrid() {
  return (
    <div className="lg:col-span-2 lg:row-span-2 group bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ease-out">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            Instagram Grid Preview
          </h3>
          <p className="text-sm text-gray-500">
            Perfect alignment across all posts
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-medium text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
