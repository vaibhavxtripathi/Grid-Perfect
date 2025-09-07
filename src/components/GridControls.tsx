"use client";

import { MuralDimensions } from "@/app/page";

interface GridControlsProps {
  dimensions: MuralDimensions;
  columns: number;
  rows: number;
  exportScale: number;
  onColumnsChange: (columns: number) => void;
  onRowsChange: (rows: number) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export default function GridControls({
  dimensions,
  columns,
  rows,
  exportScale,
  onColumnsChange,
  onRowsChange,
  onProcess,
  isProcessing,
}: GridControlsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-black mb-4">
        Grid Settings
      </h2>

      <div className="space-y-6">
        {/* Image Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-black mb-2">
            Image Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">
                Dimensions:
              </span>
              <span className="ml-2 font-mono text-black">
                {dimensions.width} × {dimensions.height}
              </span>
            </div>
            <div>
              <span className="text-gray-500">
                Detected Grid:
              </span>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Export Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-black mb-2">
            Export Settings
          </h3>
          <p className="text-sm text-gray-600">
            Images will be exported at original quality (1080×1350) preserving
            the original format (PNG/JPEG) with maximum quality settings.
          </p>
        </div>

        {/* Algorithm Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">
            Smart Grid Algorithm
          </h3>
          <p className="text-sm text-blue-700">
            This tool uses precise Instagram grid constants to ensure your mural
            looks seamless both in the profile grid (1015×1350) and as
            individual posts (1080×1350).
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
