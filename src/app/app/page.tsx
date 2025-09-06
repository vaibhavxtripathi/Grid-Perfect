"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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

export interface ThumbnailResult {
  order: number;
  thumbnail: string;
}

export default function AppPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<MuralDimensions | null>(null);
  const [columns, setColumns] = useState<number>(1);
  const [rows, setRows] = useState<number>(1);
  const [thumbnails, setThumbnails] = useState<ThumbnailResult[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadedFile(file);
      setDimensions(data.dimensions);
      setColumns(data.dimensions.columns);
      setRows(data.dimensions.rows);
      setSessionId(data.sessionId);
      setThumbnails([]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  }, []);

  const handleProcess = useCallback(async () => {
    if (!uploadedFile || !dimensions) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      formData.append("columns", columns.toString());
      formData.append("rows", rows.toString());

      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const data = await response.json();
      setThumbnails(data.thumbnails);
    } catch (error) {
      console.error("Processing error:", error);
      alert("Processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, dimensions, sessionId, columns, rows]);

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
      alert("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/landing"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Grid Slicer
            </Link>
            <Link
              href="/landing"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back to Landing
            </Link>
          </div>
        </div>
      </header>

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
              <GridControls
                dimensions={dimensions}
                columns={columns}
                rows={rows}
                onColumnsChange={setColumns}
                onRowsChange={setRows}
                onProcess={handleProcess}
                isProcessing={isProcessing}
              />
            )}

            {thumbnails.length > 0 && (
              <DownloadButton
                totalSlices={thumbnails.length}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {thumbnails.length > 0 && <PreviewGrid thumbnails={thumbnails} />}
          </div>
        </div>
      </div>
    </div>
  );
}
