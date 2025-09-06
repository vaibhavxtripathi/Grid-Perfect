"use client";

import { Thumbnail } from "@/app/page";

interface PreviewGridProps {
  thumbnails: Thumbnail[];
  columns: number;
  rows: number;
}

export default function PreviewGrid({
  thumbnails,
  columns,
  rows,
}: PreviewGridProps) {
  // Sort thumbnails by order to ensure correct display
  const sortedThumbnails = [...thumbnails].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Preview Grid
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Posting order: Left → Right, Top → Bottom
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total slices: {thumbnails.length}
        </p>
      </div>

      {/* Grid Preview */}
      <div
        className="grid gap-1 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          aspectRatio: `${columns} / ${rows}`,
        }}
      >
        {sortedThumbnails.map((thumbnail) => (
          <div
            key={thumbnail.order}
            className="relative bg-white dark:bg-gray-600 rounded overflow-hidden shadow-sm"
          >
            <img
              src={thumbnail.thumbnail}
              alt={`Post ${thumbnail.order}`}
              className="w-full h-full object-cover"
            />

            {/* Posting Order Overlay */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {thumbnail.order}
            </div>
          </div>
        ))}
      </div>

      {/* Individual Thumbnails */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Individual Posts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sortedThumbnails.map((thumbnail) => (
            <div
              key={thumbnail.order}
              className="relative bg-white dark:bg-gray-600 rounded overflow-hidden shadow-sm"
            >
              <img
                src={thumbnail.thumbnail}
                alt={`Post ${thumbnail.order}`}
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Posting Order Overlay */}
              <div className="absolute top-1 left-1 bg-black bg-opacity-75 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {thumbnail.order}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <h3 className="font-medium text-green-900 dark:text-green-300 mb-2">
          Posting Instructions
        </h3>
        <ol className="text-sm text-green-700 dark:text-green-400 space-y-1">
          <li>1. Download the ZIP file containing all slices</li>
          <li>2. Post images in numerical order (1, 2, 3, etc.)</li>
          <li>3. Post from left to right, top to bottom</li>
          <li>4. Wait a few minutes between posts for best results</li>
        </ol>
      </div>
    </div>
  );
}
