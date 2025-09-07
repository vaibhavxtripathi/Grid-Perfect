"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";
import GridControls from "@/components/GridControls";
import PreviewGrid from "@/components/PreviewGrid";
import DownloadButton from "@/components/DownloadButton";
import SiteFooter from "@/components/SiteFooter";
import { motion, AnimatePresence } from "framer-motion";

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

export default function AppPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<MuralDimensions | null>(null);
  const [columns, setColumns] = useState<number>(1);
  const [rows, setRows] = useState<number>(1);
  const exportScale = 1;
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

  const progress = useMemo(() => {
    const steps = [
      uploadedFile ? 1 : 0,
      dimensions ? 1 : 0,
      thumbnails.length > 0 ? 1 : 0,
    ];
    return Math.round((steps.reduce((a, b) => a + b, 0) / 3) * 100);
  }, [uploadedFile, dimensions, thumbnails]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-30 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-black">
              Grid Perfect
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black mb-4">
            Grid Perfect
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a large mural image and automatically slice it into perfectly
            aligned Instagram posts that look seamless both in the grid preview
            and individual posts.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImageUploader onFileUpload={handleFileUpload} />
          </motion.div>

          <AnimatePresence mode="wait">
            {uploadedFile && dimensions ? (
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
              >
                <GridControls
                  dimensions={dimensions}
                  columns={columns}
                  rows={rows}
                  exportScale={exportScale}
                  onColumnsChange={setColumns}
                  onRowsChange={setRows}
                  onProcess={handleProcess}
                  isProcessing={isProcessing}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {thumbnails.length > 0 ? (
              <PreviewGrid
                thumbnails={thumbnails}
                columns={columns}
                rows={rows}
                sessionId={sessionId}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-4">
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
                <h3 className="text-lg font-medium text-black mb-2">
                  Preview Grid
                </h3>
                <p className="text-gray-500">
                  Upload an image and process it to see the preview grid here.
                </p>
              </div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {thumbnails.length > 0 ? (
              <motion.div
                key="download"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.3 }}
              >
                <DownloadButton
                  onDownload={handleDownload}
                  isDownloading={isDownloading}
                  totalSlices={thumbnails.length}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {!uploadedFile ? (
            /* Centered Upload - No Image Uploaded */
            <div className="flex justify-center">
              <div className="w-[420px]">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageUploader onFileUpload={handleFileUpload} />
                </motion.div>
              </div>
            </div>
          ) : (
            /* Split Layout - Image Uploaded */
            <div className="flex gap-8">
              {/* Left panel: fixed width, sticky */}
              <div className="w-[380px] xl:w-[420px] flex-col sticky top-[96px] self-start space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageUploader onFileUpload={handleFileUpload} />
                </motion.div>
                <AnimatePresence mode="wait">
                  {uploadedFile && dimensions ? (
                    <motion.div
                      key="controls"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <GridControls
                        dimensions={dimensions}
                        columns={columns}
                        rows={rows}
                        exportScale={exportScale}
                        onColumnsChange={setColumns}
                        onRowsChange={setRows}
                        onProcess={handleProcess}
                        isProcessing={isProcessing}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Right panel: fluid, scrollable */}
              <div className="flex-1 min-w-0">
                <div className="space-y-8">
                  {thumbnails.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <PreviewGrid
                        thumbnails={thumbnails}
                        columns={columns}
                        rows={rows}
                        sessionId={sessionId}
                      />
                    </motion.div>
                  )}

                  <AnimatePresence mode="wait">
                    {thumbnails.length > 0 ? (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 14 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DownloadButton
                          onDownload={handleDownload}
                          isDownloading={isDownloading}
                          totalSlices={thumbnails.length}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
