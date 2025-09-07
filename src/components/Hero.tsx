import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-black mb-4 sm:mb-6 leading-tight"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Create Perfect Instagram Grids with AI
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        Upload your mural and let Grid Perfect slice it into perfectly aligned
        Instagram posts that look seamless in both grid and individual views.
      </motion.p>
      <motion.div
        className="flex sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <Link
          href="/app"
          className="w-full sm:w-auto bg-black text-white lg:px-5 py-3 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
        >
          Get Started
          <div className="rotate-0 group-hover:-rotate-45 transition-transform duration-300">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
          className="w-full sm:w-auto bg-white text-black border border-gray-300 px-6 py-3 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          Learn More
        </Link>
      </motion.div>
    </div>
  );
}
