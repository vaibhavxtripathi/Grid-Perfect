"use client";

import { useState, useCallback, useRef } from "react";
import { MuralDimensions } from "@/app/app/page";

interface ImageUploaderProps {
  onFileUpload: (file: File, dimensions: MuralDimensions, url?: string) => void;
}

export default function ImageUploader({ onFileUpload }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        // 1) Get a signed upload payload from our server
        const sigRes = await fetch(
          `/api/cloudinary-signature?folder=${encodeURIComponent(
            "grid-perfect/uploads"
          )}`
        );
        const sig = await sigRes.json();
        if (!sig.signature)
          throw new Error("Failed to get Cloudinary signature");

        // 2) Upload directly to Cloudinary from the browser
        const upForm = new FormData();
        upForm.append("file", file);
        upForm.append("api_key", sig.apiKey);
        upForm.append("timestamp", String(sig.timestamp));
        upForm.append("signature", sig.signature);
        upForm.append("folder", sig.folder);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
          {
            method: "POST",
            body: upForm,
          }
        );
        const cloudJson = await cloudRes.json();
        if (!cloudRes.ok) {
          throw new Error(
            cloudJson?.error?.message || "Cloudinary upload failed"
          );
        }

        // 3) Ask our server to detect dimensions from the Cloudinary URL
        const detectRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: cloudJson.secure_url,
            type: cloudJson.resource_type,
            format: cloudJson.format,
            bytes: cloudJson.bytes,
          }),
        });
        const result = await detectRes.json();

        if (result.success) {
          onFileUpload(file, result.dimensions, cloudJson.secure_url);
        } else {
          alert("Error uploading image: " + result.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert(
          "Failed to upload image: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
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
              Supports JPEG, PNG, WebP (Max Size 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
