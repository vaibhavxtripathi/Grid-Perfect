export default function BentoDownload() {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ease-out">
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          Download
        </h3>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 group-hover:bg-gray-100 group-hover:border-gray-300 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-gray-500 group-hover:text-gray-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
              grid-slices.zip
            </span>
          </div>
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
