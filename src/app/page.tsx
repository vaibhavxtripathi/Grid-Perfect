"use client";

import { useState, useCallback } from "react";
import ImageUploader from "@/components/ImageUploader";
import GridControls from "@/components/GridControls";
import PreviewGrid from "@/components/PreviewGrid";
import DownloadButton from "@/components/DownloadButton";

export interface MuralDimensions {
  width: number;
  height: number;
  columns: number;
  rows: number;
}

export interface Thumbnail {
  order: number;
  thumbnail: string;
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<MuralDimensions | null>(null);
  const [columns, setColumns] = useState<number>(1);
  const [rows, setRows] = useState<number>(1);
  const [exportScale, setExportScale] = useState<number>(1);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleFileUpload = useCallback(
    (file: File, detectedDimensions: MuralDimensions) => {
      setUploadedFile(file);
      setDimensions(detectedDimensions);
      setColumns(detectedDimensions.columns);
      setRows(detectedDimensions.rows);
      setThumbnails([]);
      setSessionId(null);
    },
    []
  );

  const handleProcess = useCallback(async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("columns", columns.toString());
      formData.append("rows", rows.toString());
      formData.append("exportScale", exportScale.toString());

      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setThumbnails(result.thumbnails);
        setSessionId(result.sessionId);
      } else {
        alert("Error processing image: " + result.error);
      }
    } catch (error) {
      console.error("Processing error:", error);
      alert("Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, columns, rows, exportScale]);

  const handleDownload = useCallback(async () => {
    if (!sessionId) return;

    setIsDownloading(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "instagram-grid-slices.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download slices");
    } finally {
      setIsDownloading(false);
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Instagram Smart Grid Slicer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Upload a large mural image and automatically slice it into perfectly
          aligned Instagram posts that look seamless both in the grid preview
          and as individual posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          <ImageUploader onFileUpload={handleFileUpload} />

          {uploadedFile && dimensions && (
            <>
              <GridControls
                dimensions={dimensions}
                columns={columns}
                rows={rows}
                exportScale={exportScale}
                onColumnsChange={setColumns}
                onRowsChange={setRows}
                onExportScaleChange={setExportScale}
                onProcess={handleProcess}
                isProcessing={isProcessing}
              />

              {thumbnails.length > 0 && (
                <DownloadButton
                  onDownload={handleDownload}
                  isDownloading={isDownloading}
                  totalSlices={thumbnails.length}
                />
              )}
            </>
          )}
        </div>

        {/* Right Column - Preview */}
        <div>
          {thumbnails.length > 0 ? (
            <PreviewGrid
              thumbnails={thumbnails}
              columns={columns}
              rows={rows}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Preview Grid
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Upload an image and process it to see the preview grid here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
