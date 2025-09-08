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

    // Upload to Cloudinary first to remove hosting size limits
    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "grid-perfect/uploads",
            resource_type: "image",
            overwrite: true,
          },
          (error, result) => {
            if (error || !result)
              return reject(error || new Error("Upload failed"));
            resolve({ secure_url: (result as any).secure_url });
          }
        );

        const reader = new ReadableStream({
          start: async (controller) => {
            const ab = await file.arrayBuffer();
            controller.enqueue(new Uint8Array(ab));
            controller.close();
          },
        });
        // Pipe to cloudinary stream
        const readerStream = (reader as any).getReader();
        const pump = () =>
          readerStream.read().then(({ done, value }: any) => {
            if (done) return uploadStream.end();
            uploadStream.write(Buffer.from(value));
            return pump();
          });
        pump();
      }
    );

    // Fetch bytes back to read metadata locally for dimensions detection
    const response = await fetch(uploadResult.secure_url);
    const buffer = Buffer.from(await response.arrayBuffer());
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
