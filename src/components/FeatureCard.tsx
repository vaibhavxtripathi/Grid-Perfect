export default function FeatureCard({
  features,
  colors,
}: {
  features: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
  colors: Array<{ bg: string; fg: string }>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {features.map((feature, index) => {
        const palette = colors?.[index % (colors?.length || 1)] || {
          bg: "bg-gray-100",
          fg: "text-gray-700",
        };

        return (
          <div key={`${feature.title}-${index}`} className="text-center">
            <div
              className={`${palette.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              {feature.icon ? (
                feature.icon
              ) : (
                <svg
                  className={`w-8 h-8 ${palette.fg}`}
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
              )}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-black">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
