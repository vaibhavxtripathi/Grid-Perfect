"use client";

import { useState, useCallback, useRef } from "react";
import { MuralDimensions } from "@/app/app/page";

interface ImageUploaderProps {
  onFileUpload: (file: File, dimensions: MuralDimensions) => void;
}

export default function ImageUploader({ onFileUpload }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        // Read image dimensions in the browser
        const arrayBuffer = await file.arrayBuffer();
        const blobUrl = URL.createObjectURL(
          new Blob([arrayBuffer], { type: file.type })
        );
        const img = new Image();
        const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("Failed to load image"));
        });
        img.src = blobUrl;
        await loadPromise;

        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        // Detect columns/rows like server: width/1080, height/1350 with 5% tolerance
        const POST_W = 1080;
        const POST_H = 1350;
        const columnsFloat = originalWidth / POST_W;
        const rowsFloat = originalHeight / POST_H;
        const withinTolerance = (value: number) =>
          Math.abs(value - Math.round(value)) < 0.05;
        const columns = Math.max(
          1,
          withinTolerance(columnsFloat)
            ? Math.round(columnsFloat)
            : Math.floor(columnsFloat)
        );
        const rows = Math.max(
          1,
          withinTolerance(rowsFloat)
            ? Math.round(rowsFloat)
            : Math.floor(rowsFloat)
        );

        const targetWidth = POST_W * columns;
        const targetHeight = POST_H * rows;

        // If image is larger than target, resize client-side to reduce upload size
        let fileToUpload = file;
        if (originalWidth !== targetWidth || originalHeight !== targetHeight) {
          const canvas = document.createElement("canvas");
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas not supported");
          ctx.drawImage(
            img,
            0,
            0,
            originalWidth,
            originalHeight,
            0,
            0,
            targetWidth,
            targetHeight
          );

          // Preserve format: png stays png (lossless), jpeg/webp at quality 1.0
          const mimeType =
            file.type && /image\/(png|jpeg|jpg|webp)/.test(file.type)
              ? file.type === "image/jpg"
                ? "image/jpeg"
                : file.type
              : "image/jpeg";

          const blob: Blob = await new Promise((resolve) =>
            canvas.toBlob((b) => resolve(b as Blob), mimeType, 1.0)
          );

          fileToUpload = new File([blob], file.name, { type: mimeType });
        }

        URL.revokeObjectURL(blobUrl);

        const dimensions: MuralDimensions = {
          width: targetWidth,
          height: targetHeight,
          columns,
          rows,
        };

        // Bypass server upload step; pass file+dimensions forward for processing
        onFileUpload(fileToUpload, dimensions);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to prepare image: " + (error as Error).message);
      } finally {
        setIsUploading(false);
      }
    },
    [onFileUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-black mb-4">
        Upload Mural Image
      </h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Processing image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg font-medium text-black mb-2">
              Drop your mural image here
            </p>
            <p className="text-gray-500 mb-4">or click to browse files</p>
            <p className="text-sm text-gray-400">
              Supports JPEG, PNG, WebP up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
