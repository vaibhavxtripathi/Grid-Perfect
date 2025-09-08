import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, order } = await request.json();
    console.log("Download request - sessionId:", sessionId, "order:", order);

    if (!sessionId || order === undefined) {
      console.error("Missing sessionId or order");
      return NextResponse.json(
        { error: "Session ID and order are required" },
        { status: 400 }
      );
    }

    // Get slices from cache
    if (!global.slicesCache) {
      console.error("No global cache found");
      return NextResponse.json(
        { error: "Cache not initialized" },
        { status: 500 }
      );
    }

    if (!global.slicesCache.has(sessionId)) {
      console.error("Session not found in cache:", sessionId);
      console.log("Available sessions:", Array.from(global.slicesCache.keys()));
      return NextResponse.json(
        { error: "Session expired or not found" },
        { status: 404 }
      );
    }

    const slices = global.slicesCache.get(sessionId);
    console.log(
      "Found slices:",
      slices.length,
      "slices for session:",
      sessionId
    );

    // Find the specific slice by order
    const slice = slices.find((s: any) => s.order === parseInt(order));
    console.log("Looking for slice with order:", parseInt(order));
    console.log(
      "Available orders:",
      slices.map((s: any) => s.order)
    );

    if (!slice) {
      console.error("Slice not found for order:", order);
      return NextResponse.json({ error: "Slice not found" }, { status: 404 });
    }

    // Determine file extension and content type
    const extension = slice.format === "png" ? "png" : "jpg";
    const contentType = slice.format === "png" ? "image/png" : "image/jpeg";
    const filename = `post_${String(slice.order).padStart(
      2,
      "0"
    )}.${extension}`;

    console.log(
      "Serving slice:",
      filename,
      "size:",
      slice.buffer.length,
      "bytes"
    );

    // Set response headers for file download
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);

    // Return the image buffer directly
    return new NextResponse(slice.buffer, { headers });
  } catch (error) {
    console.error("Individual download error:", error);
    return NextResponse.json(
      { error: "Failed to download individual post" },
      { status: 500 }
    );
  }
}

// Extend global to include our cache
declare global {
  var slicesCache: Map<string, any> | undefined;
}
