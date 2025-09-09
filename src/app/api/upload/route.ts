import { NextRequest, NextResponse } from "next/server";
import { detectMuralDimensions, validateImage } from "@/lib/slicer";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";
import "server-only";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  console.log("Upload API called");
  try {
    console.log("Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log("Form data parsed, file:", file ? "present" : "missing");

    if (!file) {
      console.log("No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate the image
    console.log("Validating image...");
    const validation = validateImage(file);
    if (!validation.valid) {
      console.log("Image validation failed:", validation.error);
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    console.log("Image validation passed");

    // Convert file to buffer for Cloudinary upload
    console.log("Converting file to buffer...");
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File info:", {
      name: file.name,
      size: file.size,
      type: file.type,
      bufferSize: buffer.length,
    });

    // Test Cloudinary config first
    console.log("Testing Cloudinary config...");
    try {
      console.log("Cloudinary config:", {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "set" : "missing",
        api_key: process.env.CLOUDINARY_API_KEY ? "set" : "missing",
        api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "missing",
      });
    } catch (configError) {
      console.error("Cloudinary config error:", configError);
      throw configError;
    }

    // Upload to Cloudinary using direct buffer upload
    console.log("Starting Cloudinary upload...");
    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        folder: "grid-perfect/uploads",
        resource_type: "image",
        overwrite: true,
      }
    );
    console.log("Cloudinary upload successful:", uploadResult.secure_url);

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
    console.error("=== UPLOAD ERROR CAUGHT ===");
    console.error("Error type:", typeof error);
    console.error("Error message:", error?.message);
    console.error("Error name:", error?.name);
    console.error("Error code:", error?.code);
    console.error("Error stack:", error?.stack);
    console.error("Full error object:", JSON.stringify(error, null, 2));

    const message =
      (error && (error.message || String(error))) || "Failed to process upload";
    console.error("Returning error message:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
