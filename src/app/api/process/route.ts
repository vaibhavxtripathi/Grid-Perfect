import { NextRequest, NextResponse } from "next/server";
import { normalizeMural, sliceMural, generateThumbnails } from "@/lib/slicer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let file: File | null = null;
    let imageUrl: string | null = null;
    let columns: number;
    let rows: number;
    let exportScale: number = 1;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      imageUrl = body.url;
      columns = parseInt(String(body.columns));
      rows = parseInt(String(body.rows));
      exportScale = parseInt(String(body.exportScale || 1)) || 1;
    } else {
      const formData = await request.formData();
      file = formData.get("file") as File;
      imageUrl = (formData.get("url") as string) || null;
      columns = parseInt(formData.get("columns") as string);
      rows = parseInt(formData.get("rows") as string);
      exportScale = parseInt(formData.get("exportScale") as string) || 1;
    }

    if (!file && !imageUrl) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!columns || !rows || columns < 1 || rows < 1) {
      return NextResponse.json(
        { error: "Invalid columns or rows" },
        { status: 400 }
      );
    }

    // Load image bytes from file or URL
    let buffer: Buffer;
    if (imageUrl) {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error("Failed to fetch image from URL");
      buffer = Buffer.from(await res.arrayBuffer());
    } else if (file) {
      buffer = Buffer.from(await file.arrayBuffer());
    } else {
      throw new Error("No image source available");
    }

    // Normalize the mural to exact size needed
    const normalizedBuffer = await normalizeMural(buffer, columns, rows);

    // Slice the mural into individual posts
    const slices = await sliceMural(normalizedBuffer, columns, rows, {
      exportScale,
    });

    // Generate thumbnails for preview
    const thumbnails = await generateThumbnails(slices);

    // Store slices in memory (in production, you might want to use Redis or a database)
    // For now, we'll return the thumbnails and store the full slices for download
    const sessionId = Date.now().toString();

    // In a real app, you'd store this in a database or cache
    // For this demo, we'll store it in a global variable (not recommended for production)
    if (!global.slicesCache) {
      global.slicesCache = new Map();
    }
    global.slicesCache.set(sessionId, slices);

    return NextResponse.json({
      success: true,
      sessionId,
      thumbnails,
      totalSlices: slices.length,
      dimensions: {
        columns,
        rows,
        exportScale,
      },
    });
  } catch (error: any) {
    const message =
      (error && (error.message || String(error))) || "Failed to process image";
    console.error("Processing error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Extend global to include our cache
declare global {
  var slicesCache: Map<string, any> | undefined;
}
