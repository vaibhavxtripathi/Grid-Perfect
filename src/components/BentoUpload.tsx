import BulletPoints from "./BulletPoints";

export default function BentoUpload() {
  return (
    <div className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ease-out">
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          Upload
        </h3>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300 group-hover:border-gray-400 group-hover:bg-gray-100 transition-all duration-200">
        <div className="text-center">
          <svg
            className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-gray-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
            Drag & drop your mural
          </p>
        </div>
      </div>
      <BulletPoints
        points={["Uploading image", "Analyzing dimensions", "Slicing image"]}
      />
    </div>
  );
}
