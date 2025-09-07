"use client";

interface DownloadButtonProps {
  onDownload: () => void;
  isDownloading: boolean;
  totalSlices: number;
}

export default function DownloadButton({
  onDownload,
  isDownloading,
  totalSlices,
}: DownloadButtonProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-black mb-4">Download Slices</h2>

      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-black">Ready to Download</p>
              <p className="text-sm text-gray-600">
                {totalSlices} Instagram posts ready
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Format: Original (PNG/JPEG)
              </p>
              <p className="text-sm text-gray-500">Size: 1080×1350px</p>
            </div>
          </div>
        </div>

        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
        >
          {isDownloading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating ZIP...
            </div>
          ) : (
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
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
              Download All Slices (ZIP)
            </div>
          )}
        </button>

        <div className="text-xs text-gray-500 text-center">
          Files will be named: post_01.png/jpg, post_02.png/jpg, etc.
        </div>
      </div>
    </div>
  );
}
