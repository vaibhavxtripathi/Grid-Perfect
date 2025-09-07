import FeatureCard from "./FeatureCard";
import { features as featureData, colors as colorData } from "@/lib/constants";

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Packed with powerful features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grid Perfect offers a comprehensive suite of tools for creating
            perfect Instagram grids. We have everything you need to make your
            social media presence shine.
          </p>
        </div>
        <FeatureCard
          features={featureData}
          colors={colorData.map((bg) => ({
            bg,
            fg: bg.includes("blue")
              ? "text-blue-600"
              : bg.includes("green")
              ? "text-green-600"
              : bg.includes("purple")
              ? "text-purple-600"
              : "text-gray-700",
          }))}
        />
      </div>
    </section>
  );
}
