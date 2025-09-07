export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-black mb-4">How it works</h2>
        <p className="text-xl text-gray-600">
          Simple steps to create perfect Instagram grids
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">
            Upload Your Mural
          </h3>
          <p className="text-gray-600">
            Upload your large mural image. Our system automatically detects the
            optimal grid dimensions.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">
            AI Processing
          </h3>
          <p className="text-gray-600">
            Our advanced algorithm slices your image into perfectly aligned
            Instagram posts using the exact specifications.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">
            Download & Post
          </h3>
          <p className="text-gray-600">
            Download your perfectly sliced images in the correct posting order
            and upload them to Instagram.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
