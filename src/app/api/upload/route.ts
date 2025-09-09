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
    const contentType = request.headers.get("content-type") || "";
    let file: File | null = null;
    let urlFromClient: string | null = null;
    if (contentType.includes("application/json")) {
      const body = await request.json();
      urlFromClient = body.url || null;
    } else {
      console.log("Parsing form data...");
      const formData = await request.formData();
      file = formData.get("file") as File;
      console.log("Form data parsed, file:", file ? "present" : "missing");
    }

    if (!file && !urlFromClient) {
      console.log("No file or URL provided");
      return NextResponse.json(
        { error: "No file or URL provided" },
        { status: 400 }
      );
    }

    // Validate the image
    let imgBuffer: Buffer;
    if (urlFromClient) {
      console.log("Fetching image from URL for metadata...", urlFromClient);
      const res = await fetch(urlFromClient);
      if (!res.ok) throw new Error("Failed to fetch image from Cloudinary URL");
      imgBuffer = Buffer.from(await res.arrayBuffer());
    } else if (file) {
      console.log("Validating image...");
      const validation = validateImage(file);
      if (!validation.valid) {
        console.log("Image validation failed:", validation.error);
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }
      console.log("Image validation passed");

      // Convert file to buffer for Cloudinary upload
      console.log("Converting file to buffer...");
      const localBuffer = Buffer.from(await file.arrayBuffer());
      console.log("File info:", {
        name: file.name,
        size: file.size,
        type: file.type,
        bufferSize: localBuffer.length,
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
        `data:${file.type};base64,${localBuffer.toString("base64")}`,
        {
          folder: "grid-perfect/uploads",
          resource_type: "image",
          overwrite: true,
        }
      );
      console.log("Cloudinary upload successful:", uploadResult.secure_url);
      urlFromClient = uploadResult.secure_url;
      imgBuffer = localBuffer;
    } else {
      throw new Error("Unexpected state: neither URL nor File available");
    }

    // Use the buffer we have for metadata detection
    const metadata = await sharp(imgBuffer).metadata();

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
      filename: file ? file.name : null,
      fileSize: file ? file.size : null,
      url: urlFromClient,
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
