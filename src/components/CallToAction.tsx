import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Ready to create perfect Instagram grids?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of creators who are already using Grid Perfect to
          create stunning, seamless Instagram grids.
        </p>
        <Link
          href="/app"
          className="bg-white text-black px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group"
        >
          Get Started Now
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
      </div>
    </section>
  );
}
