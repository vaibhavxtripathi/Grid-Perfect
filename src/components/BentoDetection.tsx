import BulletPoints from "./BulletPoints";

export default function BentoDetection() {
  return (
    <div>
      {/* AI Processing */}
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            AI Processing
          </h3>
        </div>
        <BulletPoints
          points={[
            "Analyzing dimensions",
            "Slicing image",
            "Optimizing quality",
          ]}
        />
      </div>
    </div>
  );
}
