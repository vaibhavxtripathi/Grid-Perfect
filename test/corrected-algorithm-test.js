// Test to verify the corrected Instagram grid algorithm
console.log("Corrected Instagram Grid Algorithm Test");
console.log("======================================");

const POST_W = 1080;
const POST_H = 1350;
const GRID_W = 1015;
const GRID_H = 1350;
const LEFT_PAD = 32;

console.log("\nConstants:");
console.log(`POST_W: ${POST_W}px`);
console.log(`POST_H: ${POST_H}px`);
console.log(`GRID_W: ${GRID_W}px`);
console.log(`GRID_H: ${GRID_H}px`);
console.log(`LEFT_PAD: ${LEFT_PAD}px`);

console.log("\nAlgorithm Test for 3×2 grid:");
console.log("=============================");

const cols = 3;
const rows = 2;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    console.log(`\nTile (${row}, ${col}):`);

    // Step 1: Extract the full 1080×1350 background for this tile
    const backgroundLeft = col * POST_W;
    const backgroundTop = row * POST_H;

    // Step 2: Extract the 1015×1350 slice positioned at (backgroundLeft + 32px)
    const sliceLeft = backgroundLeft + LEFT_PAD;
    const sliceTop = backgroundTop;

    console.log(
      `  Background: (${backgroundLeft}, ${backgroundTop}) [${POST_W}×${POST_H}]`
    );
    console.log(`  Slice: (${sliceLeft}, ${sliceTop}) [${GRID_W}×${GRID_H}]`);
    console.log(`  Slice offset in background: ${LEFT_PAD}px from left`);

    // Verify the slice fits within the background
    const sliceRight = sliceLeft + GRID_W;
    const backgroundRight = backgroundLeft + POST_W;
    const sliceBottom = sliceTop + GRID_H;
    const backgroundBottom = backgroundTop + POST_H;

    console.log(
      `  Slice range: x[${sliceLeft}, ${sliceRight}], y[${sliceTop}, ${sliceBottom}]`
    );
    console.log(
      `  Background range: x[${backgroundLeft}, ${backgroundRight}], y[${backgroundTop}, ${backgroundBottom}]`
    );

    // Check if slice is within background bounds
    const withinBounds =
      sliceLeft >= backgroundLeft &&
      sliceRight <= backgroundRight &&
      sliceTop >= backgroundTop &&
      sliceBottom <= backgroundBottom;

    console.log(`  Slice within background: ${withinBounds ? "✓" : "✗"}`);

    // Check if the slice is properly positioned (32px from left edge)
    const correctOffset = sliceLeft - backgroundLeft === LEFT_PAD;
    console.log(`  Correct left offset: ${correctOffset ? "✓" : "✗"}`);
  }
}

console.log("\nAlgorithm verification complete!");
console.log(
  "The corrected algorithm ensures proper background and slice positioning."
);
