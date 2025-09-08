export default function BentoIndividualPost() {
  return (
    <div className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ease-out h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          Individual Posts
        </h3>
      </div>
      <div className="space-y-2 flex-grow flex items-center justify-center">
        {[1].map((i) => (
          <div
            key={i}
            className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-medium text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
