import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, order } = await request.json();

    if (!sessionId || order === undefined) {
      return NextResponse.json(
        { error: "Session ID and order are required" },
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

    // Find the specific slice by order
    const slice = slices.find((s: any) => s.order === parseInt(order));

    if (!slice) {
      return NextResponse.json({ error: "Slice not found" }, { status: 404 });
    }

    // Determine file extension and content type
    const extension = slice.format === "png" ? "png" : "jpg";
    const contentType = slice.format === "png" ? "image/png" : "image/jpeg";
    const filename = `post_${String(slice.order).padStart(
      2,
      "0"
    )}.${extension}`;

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
