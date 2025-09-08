import { NextRequest, NextResponse } from "next/server";
import { normalizeMural, sliceMural, generateThumbnails } from "@/lib/slicer";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const columns = parseInt(formData.get("columns") as string);
    const rows = parseInt(formData.get("rows") as string);
    const exportScale = parseInt(formData.get("exportScale") as string) || 1;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!columns || !rows || columns < 1 || rows < 1) {
      return NextResponse.json(
        { error: "Invalid columns or rows" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

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
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}

// Extend global to include our cache
declare global {
  var slicesCache: Map<string, any> | undefined;
}
