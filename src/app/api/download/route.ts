import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "No session ID provided" },
        { status: 400 }
      );
    }

    // Get slices from cache
    if (!global.slicesCache || !global.slicesCache.has(sessionId)) {
      return NextResponse.json(
        { error: "Session expired or not found" },
        { status: 404 }
      );
    }

    const slices = global.slicesCache.get(sessionId);

    // Create ZIP archive
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Maximum compression
    });

    // Set response headers for file download
    const headers = new Headers();
    headers.set("Content-Type", "application/zip");
    headers.set(
      "Content-Disposition",
      'attachment; filename="instagram-grid-slices.zip"'
    );

    // Create a readable stream for the response
    const stream = new ReadableStream({
      start(controller) {
        archive.on("data", (chunk) => {
          controller.enqueue(chunk);
        });

        archive.on("end", () => {
          controller.close();
        });

        archive.on("error", (err) => {
          controller.error(err);
        });

        // Add each slice to the ZIP
        slices.forEach((slice: any, index: number) => {
          const filename = `post_${String(slice.order).padStart(2, "0")}.jpg`;
          archive.append(slice.buffer, { name: filename });
        });

        // Finalize the archive
        archive.finalize();
      },
    });

    // Clean up the cache
    global.slicesCache.delete(sessionId);

    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to generate download" },
      { status: 500 }
    );
  }
}

// Extend global to include our cache
declare global {
  var slicesCache: Map<string, any> | undefined;
}
