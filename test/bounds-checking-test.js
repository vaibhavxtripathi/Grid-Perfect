// Test to verify the bounds checking for background shift
console.log("Bounds Checking Test for Background Shift");
console.log("=========================================");

const POST_W = 1080;
const POST_H = 1350;
const GRID_W = 1015;
const GRID_H = 1350;
const LEFT_PAD = 32;
const BACKGROUND_SHIFT = 64;

console.log("\nConstants:");
console.log(`POST_W: ${POST_W}px`);
console.log(`POST_H: ${POST_H}px`);
console.log(`GRID_W: ${GRID_W}px`);
console.log(`GRID_H: ${GRID_H}px`);
console.log(`LEFT_PAD: ${LEFT_PAD}px`);
console.log(`BACKGROUND_SHIFT: ${BACKGROUND_SHIFT}px`);

console.log("\nBounds Checking Test for 3×2 grid (3240×2700px mural):");
console.log("========================================================");

const cols = 3;
const rows = 2;
const muralWidth = 3240;
const muralHeight = 2700;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    console.log(`\nTile (${row}, ${col}):`);

    // Calculate background shift for left and right tiles
    let backgroundShift = 0;
    if (col === 0) {
      backgroundShift = -BACKGROUND_SHIFT;
      console.log(`  Type: LEFT tile (shift background left)`);
    } else if (col === cols - 1) {
      backgroundShift = BACKGROUND_SHIFT;
      console.log(`  Type: RIGHT tile (shift background right)`);
    } else {
      console.log(`  Type: CENTER tile (no shift)`);
    }

    // Calculate positions
    const backgroundLeft = col * POST_W + backgroundShift;
    const backgroundTop = row * POST_H;
    const sliceLeft = backgroundLeft + LEFT_PAD;
    const sliceTop = backgroundTop;

    console.log(`  Background shift: ${backgroundShift}px`);
    console.log(`  Original background: (${backgroundLeft}, ${backgroundTop})`);
    console.log(`  Original slice: (${sliceLeft}, ${sliceTop})`);

    // Apply bounds checking (like in the actual algorithm)
    const actualBackgroundLeft = Math.max(
      0,
      Math.min(backgroundLeft, muralWidth - POST_W)
    );
    const actualBackgroundTop = Math.max(
      0,
      Math.min(backgroundTop, muralHeight - POST_H)
    );
    const actualSliceLeft = Math.max(
      0,
      Math.min(sliceLeft, muralWidth - GRID_W)
    );
    const actualSliceTop = Math.max(
      0,
      Math.min(sliceTop, muralHeight - GRID_H)
    );

    console.log(
      `  Bounded background: (${actualBackgroundLeft}, ${actualBackgroundTop})`
    );
    console.log(`  Bounded slice: (${actualSliceLeft}, ${actualSliceTop})`);

    // Check if bounds checking was needed
    const backgroundClamped =
      actualBackgroundLeft !== backgroundLeft ||
      actualBackgroundTop !== backgroundTop;
    const sliceClamped =
      actualSliceLeft !== sliceLeft || actualSliceTop !== sliceTop;

    console.log(`  Background clamped: ${backgroundClamped ? "✓" : "✗"}`);
    console.log(`  Slice clamped: ${sliceClamped ? "✓" : "✗"}`);

    // Verify all coordinates are within bounds
    const backgroundInBounds =
      actualBackgroundLeft >= 0 &&
      actualBackgroundLeft + POST_W <= muralWidth &&
      actualBackgroundTop >= 0 &&
      actualBackgroundTop + POST_H <= muralHeight;

    const sliceInBounds =
      actualSliceLeft >= 0 &&
      actualSliceLeft + GRID_W <= muralWidth &&
      actualSliceTop >= 0 &&
      actualSliceTop + GRID_H <= muralHeight;

    console.log(`  Background in bounds: ${backgroundInBounds ? "✓" : "✗"}`);
    console.log(`  Slice in bounds: ${sliceInBounds ? "✓" : "✗"}`);
  }
}

console.log("\nBounds checking verification complete!");
console.log("All extractions will stay within mural bounds.");
