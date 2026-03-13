"use client";

import type { MuralDimensions } from "@/app/app/page";

interface GridControlsProps {
  dimensions: MuralDimensions;
  columns: number;
  rows: number;
  exportScale: number;
  mode: "modern-3x4" | "legacy-4x5";
  onColumnsChange: (columns: number) => void;
  onRowsChange: (rows: number) => void;
  onModeChange: (mode: "modern-3x4" | "legacy-4x5") => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export default function GridControls({
  dimensions,
  columns,
  rows,
  exportScale,
  mode,
  onColumnsChange,
  onRowsChange,
  onModeChange,
  onProcess,
  isProcessing,
}: GridControlsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-black mb-4">Grid Settings</h2>

      <div className="space-y-6 flex-1">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-black mb-2">Image Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Dimensions:</span>
              <span className="ml-2 font-mono text-black">
                {dimensions.width} × {dimensions.height}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Detected Grid:</span>
              <span className="ml-2 font-mono text-black">
                {dimensions.columns} × {dimensions.rows}
              </span>
            </div>
          </div>
        </div>

        {/* Grid Configuration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Columns
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={columns}
              onChange={(e) => onColumnsChange(parseInt(e.target.value) || 1)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rows
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={rows}
              onChange={(e) => onRowsChange(parseInt(e.target.value) || 1)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Export Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-black mb-2">Export Settings</h3>
          <p className="text-sm text-gray-600">
            Images will be exported at original quality preserving the original
            format (PNG/JPEG) with maximum quality settings.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Modern mode uses 3:4 posts (1080×1440) to match Instagram&apos;s new
            grid. Legacy mode recreates the original 4:5 smart slicing with a
            1015×1350 safe area inside each 1080×1350 post.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-black mb-2">Instagram Mode</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="modern-3x4"
                checked={mode === "modern-3x4"}
                onChange={() => onModeChange("modern-3x4")}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                Modern 3:4 (1080×1440) – recommended for 2025+ grid
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="legacy-4x5"
                checked={mode === "legacy-4x5"}
                onChange={() => onModeChange("legacy-4x5")}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                Legacy 4:5 smart slicing (1080×1350 posts, 1015×1350 grid)
              </span>
            </label>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">
            Smart Grid Algorithm
          </h3>
          <p className="text-sm text-blue-700">
            This tool keeps your murals seamless both in the profile grid and
            when each individual post is opened. Use Modern for the new 3:4
            grid, or Legacy to match the original 4:5 smart behavior with no
            unexpected crops or borders in either view.
          </p>
        </div>

        {/* Process Button */}
        <button
          onClick={onProcess}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Generate Instagram Slices"
          )}
        </button>
      </div>
    </div>
  );
}
