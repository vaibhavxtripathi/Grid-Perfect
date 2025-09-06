import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-black">Grid Perfect</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-black transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link 
                href="/app" 
                className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Create Perfect Instagram Grid Murals
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload one large image and automatically slice it into perfectly
              aligned Instagram posts. Our algorithm solves the Instagram grid
              vs post size mismatch to create seamless murals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/app" 
                className="bg-black text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started
              </Link>
              <Link 
                href="#how-it-works" 
                className="border border-gray-300 text-black px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image - Dashboard Preview */}
          <div className="mt-16">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-6 bg-gray-100 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-100 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          3
                        </div>
                        <div className="text-sm text-blue-600">Columns</div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          1
                        </div>
                        <div className="text-sm text-green-600">Row</div>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          3
                        </div>
                        <div className="text-sm text-purple-600">Posts</div>
                      </div>
                    </div>

                    {/* Grid Preview */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-[3/4] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                      <div className="aspect-[3/4] bg-gradient-to-br from-green-400 to-green-600 rounded-lg"></div>
                      <div className="aspect-[3/4] bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">
            Trusted by creators worldwide
          </h2>
          <p className="text-gray-600 mb-12">
            Grid Perfect is the choice of content creators, designers, and social
            media managers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-2xl font-bold text-gray-400">Instagram</div>
            <div className="text-2xl font-bold text-gray-400">TikTok</div>
            <div className="text-2xl font-bold text-gray-400">YouTube</div>
            <div className="text-2xl font-bold text-gray-400">Twitter</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Packed with powerful features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Grid Perfect offers everything you need to create perfect Instagram
              murals. From automatic grid detection to high-quality exports, we
              have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-2xl p-8 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
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
                <div className="space-y-2">
                  <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-blue-100 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Smart Grid Detection
              </h3>
              <p className="text-gray-600">
                Automatically detects the optimal grid dimensions from your
                uploaded image. No manual configuration needed - just upload and
                slice.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-green-100 rounded-2xl p-8 mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-green-200 rounded w-2/3 mx-auto"></div>
                  <div className="h-3 bg-green-100 rounded w-1/3 mx-auto"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Perfect Alignment Algorithm
              </h3>
              <p className="text-gray-600">
                Our proprietary algorithm solves the Instagram grid vs post size
                mismatch, ensuring your murals look seamless both in the grid
                and as individual posts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-2xl p-8 mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
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
                <div className="space-y-2">
                  <div className="h-4 bg-purple-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-purple-100 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                High Quality Export
              </h3>
              <p className="text-gray-600">
                Export your sliced images in the original format with maximum
                quality settings. PNG files remain lossless, JPEG files use the
                highest quality compression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Why choose Grid Perfect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for Instagram creators who want perfect grid
              murals without the hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Precision Algorithm</h3>
              <p className="text-sm text-gray-600">
                Mathematically precise slicing that accounts for Instagram's
                grid display differences
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">
                Process large images in seconds with our optimized image
                processing engine
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">
                Your images are processed locally and never stored on our
                servers
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Free to Use</h3>
              <p className="text-sm text-gray-600">
                No subscriptions, no watermarks, no limits - completely free
                forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">How it works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Creating perfect Instagram grid murals is as simple as 1-2-3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Upload Your Mural
              </h3>
              <p className="text-gray-600">
                Drag and drop your large image or click to browse. Our system
                automatically detects the optimal grid dimensions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Preview & Adjust
              </h3>
              <p className="text-gray-600">
                Review the detected grid and make any adjustments. See exactly
                how your posts will look in the Instagram grid.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Download & Post
              </h3>
              <p className="text-gray-600">
                Download your perfectly sliced images in a ZIP file, ready to
                upload to Instagram in the correct order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to create perfect Instagram murals?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who use Grid Perfect to create stunning
            Instagram grid murals. No signup required - start slicing right now.
          </p>
          <Link
            href="/app"
            className="bg-white text-black px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center"
          >
            Start Slicing Now
            <svg
              className="w-5 h-5 ml-2"
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
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">Grid Perfect</h3>
              </div>
              <p className="text-gray-600">
                Copyright © 2024 Grid Perfect. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Made with ❤️ by{" "}
                <a 
                  href="https://github.com/vaibhavxtripathi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:underline font-medium"
                >
                  VXTR
                </a>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-semibold text-black mb-3">Product</h4>
                <div className="space-y-2">
                  <Link
                    href="#features"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    How it Works
                  </Link>
                  <Link
                    href="/app"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    Try Now
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-3">Support</h4>
                <div className="space-y-2">
                  <Link
                    href="#contact"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    FAQ
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-3">Connect</h4>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    Twitter
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-600 hover:text-black transition-colors"
                  >
                    Discord
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
