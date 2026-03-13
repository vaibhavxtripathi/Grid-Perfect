import sharp from "sharp";

// Core Instagram post / grid constants (2026 update)
// Instagram now uses a 3:4 portrait ratio for both feed posts
// and the profile grid preview. We export 1080×1440px tiles so
// each slice matches how it appears in the grid.
export const POST_W = 1080;
export const POST_H = 1440;

// In the new 3:4 world the profile grid no longer crops a narrower
// "safe" width – what you upload at 3:4 is what shows. We keep
// GRID_* for compatibility but match them directly to the post size.
export const GRID_W = POST_W;
export const GRID_H = POST_H;

// Legacy padding values are no longer needed for the modern 3:4 mode,
// but we keep the exports (as zeros) to avoid breaking any external
// imports that still reference them.
export const PAD_TOTAL = 0;
export const LEFT_PAD = 0;
export const RIGHT_PAD = 0;

// Supported slicing modes:
// - "modern-3x4":  1080×1440 tiles, no additional safe-width tricks
// - "legacy-4x5":  original 1080×1350 posts with 1015×1350 grid-safe center
export type SliceMode = "modern-3x4" | "legacy-4x5";

// Legacy 4:5 / safe-width constants are kept here so we can still
// generate murals that behave exactly like the original app did.
const LEGACY_POST_W = 1080;
const LEGACY_POST_H = 1350;
const LEGACY_GRID_W = 1015;
const LEGACY_GRID_H = 1350;
const LEGACY_LEFT_PAD = 32;
const LEGACY_RIGHT_PAD = 33;
const LEGACY_PAD_TOTAL = LEGACY_LEFT_PAD + LEGACY_RIGHT_PAD; // 65

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
  mode?: SliceMode;
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
  // Calculate how many 1080x1440 (3:4) posts fit in the image
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
 * Normalize mural to exact size needed for slicing.
 * Resizes or center-crops the image to fit a perfect grid:
 *
 * - modern-3x4:  width = 1080 * columns, height = 1440 * rows
 * - legacy-4x5:  width = 1080 * columns, height = 1350 * rows
 */
export async function normalizeMural(
  imageBuffer: Buffer,
  targetColumns: number,
  targetRows: number,
  mode: SliceMode = "modern-3x4"
): Promise<Buffer> {
  const targetWidth = POST_W * targetColumns;
  const targetHeight =
    (mode === "legacy-4x5" ? LEGACY_POST_H : POST_H) * targetRows;

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
 * Core slicing algorithm
 *
 * - modern-3x4:
 *   Slice the normalized mural into equal 1080×1440 (3:4) tiles.
 *   Because the grid and feed share the same ratio, each tile
 *   appears seamless in both views without hidden crops.
 *
 * - legacy-4x5:
 *   Use the original smart algorithm:
 *   1) create a 1015×1350 slice centered on each tile
 *   2) place it on a 1080×1350 background from precise mural
 *      regions so the profile grid’s 1015×1350 safe area and
 *      the full 1080×1350 post both look seamless.
 */
export async function sliceMural(
  muralBuffer: Buffer,
  columns: number,
  rows: number,
  options: ProcessingOptions = {}
): Promise<SliceResult[]> {
  const { exportScale = 1, mode = "modern-3x4" } = options;

  const results: SliceResult[] = [];
  let order = 1;

  // Read original metadata once for format detection
  const originalMetadata = await sharp(muralBuffer).metadata();
  const originalFormat = originalMetadata.format;

  if (mode === "legacy-4x5") {
    // Legacy smart algorithm: 4:5 posts with 1015×1350 grid-safe center
    const scaledPostW = LEGACY_POST_W * exportScale;
    const scaledPostH = LEGACY_POST_H * exportScale;
    const scaledGridW = LEGACY_GRID_W * exportScale;
    const scaledGridH = LEGACY_GRID_H * exportScale;
    const scaledLeftPad = LEGACY_LEFT_PAD * exportScale;

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
  } else {
    // Modern 3:4 mode – simple, fully seamless tiles
    const basePostW = POST_W;
    const basePostH = POST_H;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const left = col * basePostW;
        const top = row * basePostH;

        // Extract the base 3:4 tile from the normalized mural
        let tile = await sharp(muralBuffer)
          .extract({
            left,
            top,
            width: basePostW,
            height: basePostH,
          })
          .toBuffer();

        // Optional high-res export via upscaling
        const targetW = Math.round(basePostW * exportScale);
        const targetH = Math.round(basePostH * exportScale);

        if (exportScale !== 1) {
          tile = await sharp(tile)
            .resize(targetW, targetH, { fit: "fill" })
            .toBuffer();
        }

        // Encode using the original format when possible
        let finalImage: Buffer;
        if (originalFormat === "png") {
          finalImage = await sharp(tile)
            .png({ compressionLevel: 0, quality: 100 })
            .toBuffer();
        } else {
          finalImage = await sharp(tile)
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
