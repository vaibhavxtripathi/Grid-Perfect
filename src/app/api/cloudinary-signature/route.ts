import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "grid-perfect/uploads";
    const timestamp = Math.floor(Date.now() / 1000);

    // Sign the upload parameters using Cloudinary secret
    const paramsToSign = { timestamp, folder } as Record<string, any>;
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      timestamp,
      folder,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Signature failed" },
      { status: 500 }
    );
  }
}
