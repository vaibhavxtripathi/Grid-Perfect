import sharp from "sharp";

// Constants as specified in the requirements
export const POST_W = 1080;
export const POST_H = 1350;
export const GRID_W = 1015;
export const GRID_H = 1350;
export const PAD_TOTAL = POST_W - GRID_W; // 65
export const LEFT_PAD = 32;
export const RIGHT_PAD = 33;

export interface SliceResult {
  buffer: Buffer;
  order: number;
  row: number;
  col: number;
  format: string;
}

export interface ProcessingOptions {
  exportScale?: number;
  columns?: number;
  rows?: number;
}

export interface MuralDimensions {
  width: number;
  height: number;
  columns: number;
  rows: number;
}

/**
 * Auto-detect columns and rows from image dimensions
 * Assumes the image is already properly sized for Instagram grid
 */
export function detectMuralDimensions(
  width: number,
  height: number
): MuralDimensions {
  // Calculate how many 1080x1350 posts fit in the image
  // Use more precise detection with tolerance for small variations
  const columnsFloat = width / POST_W;
  const rowsFloat = height / POST_H;

  // Allow for small variations (within 5% tolerance)
  const columns =
    Math.abs(columnsFloat - Math.round(columnsFloat)) < 0.05
      ? Math.round(columnsFloat)
      : Math.floor(columnsFloat);

  const rows =
    Math.abs(rowsFloat - Math.round(rowsFloat)) < 0.05
      ? Math.round(rowsFloat)
      : Math.floor(rowsFloat);

  return {
    width,
    height,
    columns: Math.max(1, columns),
    rows: Math.max(1, rows),
  };
}

/**
 * Normalize mural to exact size needed for slicing
 * Resizes or center-crops the image to fit the grid perfectly
 */
export async function normalizeMural(
  imageBuffer: Buffer,
  targetColumns: number,
  targetRows: number
): Promise<Buffer> {
  const targetWidth = POST_W * targetColumns;
  const targetHeight = POST_H * targetRows;

  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Invalid image metadata");
  }

  // If image is already the correct size, return as-is
  if (metadata.width === targetWidth && metadata.height === targetHeight) {
    return imageBuffer;
  }

  // Calculate scaling to fit the target dimensions while maintaining aspect ratio
  const scaleX = targetWidth / metadata.width;
  const scaleY = targetHeight / metadata.height;
  const scale = Math.max(scaleX, scaleY); // Use max to ensure we cover the entire target area

  const scaledWidth = Math.round(metadata.width * scale);
  const scaledHeight = Math.round(metadata.height * scale);

  // Resize and then center-crop to exact target dimensions
  // Preserve original format for better quality
  const originalFormat = metadata.format;

  if (originalFormat === "png") {
    return image
      .resize(scaledWidth, scaledHeight, { fit: "fill" })
      .extract({
        left: Math.max(0, Math.round((scaledWidth - targetWidth) / 2)),
        top: Math.max(0, Math.round((scaledHeight - targetHeight) / 2)),
        width: targetWidth,
        height: targetHeight,
      })
      .png({ compressionLevel: 0, quality: 100 })
      .toBuffer();
  } else {
    return image
      .resize(scaledWidth, scaledHeight, { fit: "fill" })
      .extract({
        left: Math.max(0, Math.round((scaledWidth - targetWidth) / 2)),
        top: Math.max(0, Math.round((scaledHeight - targetHeight) / 2)),
        width: targetWidth,
        height: targetHeight,
      })
      .jpeg({ quality: 100, mozjpeg: true })
      .toBuffer();
  }
}

/**
 * Core slicing algorithm as specified in requirements
 * This is the heart of the Instagram grid consistency solution
 *
 * The algorithm follows a simple 3-step process:
 * 1. Create 1015×1350 slice (centered on each tile)
 * 2. Create 1080×1350 background from specific mural regions:
 *    - First post: slice from 64px to 1144px
 *    - Second post: slice from 1080px to 2160px
 *    - Third post: slice from 2096px to 3176px
 * 3. Place the 1015×1350 slice centered on the 1080×1350 background
 *
 * This ensures perfect Instagram grid alignment with proper edge coverage.
 */
export async function sliceMural(
  muralBuffer: Buffer,
  columns: number,
  rows: number,
  options: ProcessingOptions = {}
): Promise<SliceResult[]> {
  const { exportScale = 1 } = options;

  // Scale constants if high-res export is requested
  const scaledPostW = POST_W * exportScale;
  const scaledPostH = POST_H * exportScale;
  const scaledGridW = GRID_W * exportScale;
  const scaledGridH = GRID_H * exportScale;
  const scaledLeftPad = LEFT_PAD * exportScale;

  const results: SliceResult[] = [];
  let order = 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      // Step 1: Create the 1080×1350 background based on column position
      let backgroundLeft: number;
      if (col === 0) {
        // First post: slice from 64px to 1144px (1080px total)
        backgroundLeft = 64 * exportScale;
      } else if (col === 1) {
        // Second (center) post: slice from 1080px to 2160px (1080px total)
        backgroundLeft = 1080 * exportScale;
      } else {
        // Third post: slice from 2096px to 3176px (1080px total)
        backgroundLeft = 2096 * exportScale;
      }
      const backgroundTop = row * scaledPostH;

      // Step 2: Create the 1015×1350 slice (centered on the tile)
      // The slice should be positioned relative to the background, not the tile
      const sliceLeft = backgroundLeft + scaledLeftPad;
      const sliceTop = backgroundTop;

      // Get original image format and metadata
      const originalMetadata = await sharp(muralBuffer).metadata();
      const originalFormat = originalMetadata.format;

      // Create the 1080×1350 background
      const background = await sharp(muralBuffer)
        .extract({
          left: backgroundLeft,
          top: backgroundTop,
          width: scaledPostW,
          height: scaledPostH,
        })
        .toBuffer();

      // Create the 1015×1350 slice
      const slice = await sharp(muralBuffer)
        .extract({
          left: sliceLeft,
          top: sliceTop,
          width: scaledGridW,
          height: scaledGridH,
        })
        .toBuffer();

      // Step 3: Place the 1015×1350 slice centered on the 1080×1350 background
      // The slice is centered with 32px left padding
      let finalImage: Buffer;

      if (originalFormat === "png") {
        // Use PNG for lossless compression
        finalImage = await sharp(background)
          .composite([
            {
              input: slice,
              left: scaledLeftPad,
              top: 0,
            },
          ])
          .png({ compressionLevel: 0, quality: 100 })
          .toBuffer();
      } else {
        // Use JPEG with maximum quality for other formats
        finalImage = await sharp(background)
          .composite([
            {
              input: slice,
              left: scaledLeftPad,
              top: 0,
            },
          ])
          .jpeg({ quality: 100, mozjpeg: true })
          .toBuffer();
      }

      results.push({
        buffer: finalImage,
        order,
        row,
        col,
        format: originalFormat || "jpeg",
      });

      order++;
    }
  }

  return results;
}

/**
 * Generate thumbnail previews for the UI
 */
export async function generateThumbnails(
  slices: SliceResult[],
  thumbnailSize: number = 200
): Promise<{ order: number; thumbnail: string }[]> {
  const thumbnails = await Promise.all(
    slices.map(async (slice) => {
      const thumbnailBuffer = await sharp(slice.buffer)
        .resize(thumbnailSize, thumbnailSize, { fit: "cover" })
        .jpeg({ quality: 95, mozjpeg: true })
        .toBuffer();

      return {
        order: slice.order,
        thumbnail: `data:image/jpeg;base64,${thumbnailBuffer.toString(
          "base64"
        )}`,
      };
    })
  );

  return thumbnails;
}

/**
 * Validate image file
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please upload a JPEG, PNG, or WebP image",
    };
  }

  // Remove size limit since Cloudinary handles large files
  // const maxSize = 10 * 1024 * 1024; // 10MB
  // if (file.size > maxSize) {
  //   return {
  //     valid: false,
  //     error: "Image size must be less than 10MB",
  //   };
  // }

  return { valid: true };
}
