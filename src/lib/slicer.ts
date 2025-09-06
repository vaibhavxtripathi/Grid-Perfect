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
  const columns = Math.round(width / POST_W);
  const rows = Math.round(height / POST_H);

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
  return image
    .resize(scaledWidth, scaledHeight, { fit: "fill" })
    .extract({
      left: Math.max(0, Math.round((scaledWidth - targetWidth) / 2)),
      top: Math.max(0, Math.round((scaledHeight - targetHeight) / 2)),
      width: targetWidth,
      height: targetHeight,
    })
    .jpeg({ quality: 95 })
    .toBuffer();
}

/**
 * Core slicing algorithm as specified in requirements
 * This is the heart of the Instagram grid consistency solution
 * 
 * The algorithm ensures perfect alignment by:
 * 1. Calculating background shift for left (-64px) and right (+64px) tiles
 * 2. Extracting the full 1080×1350 background for each tile with shift applied
 * 3. Extracting the 1015×1350 slice positioned at (backgroundLeft + 32px)
 * 4. Placing the slice on top of the background with 32px left padding
 * 
 * This ensures that when Instagram shrinks the 1080×1350 post to 1015×1350
 * in the grid, it shows exactly the right portion of the mural with proper
 * edge alignment for left and right tiles.
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
      // Step 1: Calculate background shift for left and right tiles
      let backgroundShift = 0;
      if (col === 0) {
        // Left tile: shift background 64px left to show more left content
        backgroundShift = -64 * exportScale;
      } else if (col === columns - 1) {
        // Right tile: shift background 64px right to show more right content
        backgroundShift = 64 * exportScale;
      }
      // Center tiles: no shift

      // Step 2: Extract the full 1080×1350 background for this tile with shift
      const backgroundLeft = col * scaledPostW + backgroundShift;
      const backgroundTop = row * scaledPostH;

      // Step 3: Extract the 1015×1350 slice that should be centered in this background
      // The slice should be positioned to show the right portion of the mural
      const sliceLeft = backgroundLeft + scaledLeftPad;
      const sliceTop = backgroundTop;

      // Create the background (1080×1350 section from the mural)
      const background = await sharp(muralBuffer)
        .extract({
          left: backgroundLeft,
          top: backgroundTop,
          width: scaledPostW,
          height: scaledPostH,
        })
        .toBuffer();

      // Create the slice (1015×1350 section from the mural)
      const slice = await sharp(muralBuffer)
        .extract({
          left: sliceLeft,
          top: sliceTop,
          width: scaledGridW,
          height: scaledGridH,
        })
        .toBuffer();

      // Step 3: Place the 1015×1350 slice centered onto the 1080×1350 background
      // The slice goes on top with 32px left padding
      const finalImage = await sharp(background)
        .composite([
          {
            input: slice,
            left: scaledLeftPad,
            top: 0,
          },
        ])
        .jpeg({ quality: 95 })
        .toBuffer();

      results.push({
        buffer: finalImage,
        order,
        row,
        col,
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
        .jpeg({ quality: 80 })
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

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Image size must be less than 10MB",
    };
  }

  return { valid: true };
}
