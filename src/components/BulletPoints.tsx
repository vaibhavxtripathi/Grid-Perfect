export default function BulletPoints({ points }: { points: string[] }) {
  return (
    <div className="mt-10">
      {points.map((point, index) => (
        <div key={`${point}-${index}`} className="mb-3 last:mb-0">
          <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.5}s` }}
              ></div>
              <div>{point}</div>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}
