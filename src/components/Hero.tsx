import Link from "next/link";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-7xl md:text-8xl font-semibold text-black mb-6">
        Create Perfect Instagram Grids with AI
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Upload your mural and let Grid Perfect slice it into perfectly aligned
        Instagram posts that look seamless in both grid and individual views.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/app"
          className="bg-black text-white px-3 py-1 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
        >
          Get Started
          <div className="rotate-0 group-hover:-rotate-45 transition-transform duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </Link>
        <Link
          href="#how-it-works"
          className="bg-white text-black border border-gray-300 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
