import { NextRequest, NextResponse } from "next/server";
import { detectMuralDimensions, validateImage } from "@/lib/slicer";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";
import "server-only";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate the image
    const validation = validateImage(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary using direct buffer upload
    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        folder: "grid-perfect/uploads",
        resource_type: "image",
        overwrite: true,
      }
    );

    // Use the buffer we already have for metadata detection
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      );
    }

    // Auto-detect columns and rows
    const dimensions = detectMuralDimensions(metadata.width, metadata.height);

    return NextResponse.json({
      success: true,
      dimensions,
      filename: file.name,
      fileSize: file.size,
      url: uploadResult.secure_url,
    });
  } catch (error: any) {
    const message =
      (error && (error.message || String(error))) || "Failed to process upload";
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
