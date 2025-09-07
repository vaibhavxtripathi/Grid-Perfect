"use client";

import { Thumbnail } from "@/app/page";
import { useState } from "react";

interface PreviewGridProps {
  thumbnails: Thumbnail[];
  columns: number;
  rows: number;
  sessionId: string | null;
}

export default function PreviewGrid({
  thumbnails,
  columns,
  rows,
  sessionId,
}: PreviewGridProps) {
  const [downloadingOrders, setDownloadingOrders] = useState<Set<number>>(
    new Set()
  );

  // Sort thumbnails by order to ensure correct display
  const sortedThumbnails = [...thumbnails].sort((a, b) => a.order - b.order);

  const handleIndividualDownload = async (order: number) => {
    if (!sessionId) return;

    setDownloadingOrders((prev) => new Set(prev).add(order));

    try {
      const response = await fetch("/api/download-individual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, order }),
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `post_${String(order).padStart(2, "0")}.${
        blob.type.includes("png") ? "png" : "jpg"
      }`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Individual download error:", error);
      alert("Failed to download individual post");
    } finally {
      setDownloadingOrders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(order);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-black mb-4">Preview Grid</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Posting order: Left → Right, Top → Bottom
        </p>
        <p className="text-sm text-gray-600">
          Total slices: {thumbnails.length}
        </p>
      </div>

      {/* Grid Preview */}
      <div
        className="grid gap-1 bg-gray-200 p-2 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          aspectRatio: `${columns} / ${rows}`,
        }}
      >
        {sortedThumbnails.map((thumbnail) => (
          <div
            key={thumbnail.order}
            className="relative bg-white rounded overflow-hidden shadow-sm"
          >
            <img
              src={thumbnail.thumbnail}
              alt={`Post ${thumbnail.order}`}
              className="w-full h-full object-cover"
            />

            {/* Posting Order Overlay */}
            <div className="absolute top-2 left-2 bg-black/75 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {thumbnail.order}
            </div>
          </div>
        ))}
      </div>

      {/* Individual Thumbnails */}
      <div className="mt-6 flex-1">
        <h3 className="text-lg font-medium text-black mb-3">
          Individual Posts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 content-start">
          {sortedThumbnails.map((thumbnail) => (
            <div
              key={thumbnail.order}
              className="relative bg-white rounded overflow-hidden shadow-sm group"
            >
              <img
                src={thumbnail.thumbnail}
                alt={`Post ${thumbnail.order}`}
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Posting Order Overlay */}
              <div className="absolute top-1 left-1 bg-black/75 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {thumbnail.order}
              </div>

              {/* Download Button */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleIndividualDownload(thumbnail.order)}
                  disabled={downloadingOrders.has(thumbnail.order)}
                  className="bg-white text-black px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {downloadingOrders.has(thumbnail.order) ? (
                    <>
                      <svg
                        className="w-3 h-3 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3"
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
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-green-50 rounded-lg p-4">
        <h3 className="font-medium text-green-900 mb-2">
          Posting Instructions
        </h3>
        <ol className="text-sm text-green-700 space-y-1">
          <li>1. Download the ZIP file containing all slices</li>
          <li>2. Post images in numerical order (1, 2, 3, etc.)</li>
          <li>3. Post from left to right, top to bottom</li>
          <li>4. Wait a few minutes between posts for best results</li>
        </ol>
      </div>
    </div>
  );
}
