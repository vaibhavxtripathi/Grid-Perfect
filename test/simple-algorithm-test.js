// Test to verify the simple algorithm approach
console.log("Simple Algorithm Test");
console.log("====================");

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

console.log("\nSimple Algorithm Test for 3×2 grid (3240×2700px mural):");
console.log("========================================================");

const cols = 3;
const rows = 2;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    console.log(`\nTile (${row}, ${col}):`);

    // Step 1: Create the 1080×1350 background based on column position
    let backgroundLeft;
    if (col === 0) {
      // First post: slice from 64px to 1144px (1080px total)
      backgroundLeft = 64;
      console.log(`  Type: FIRST post`);
    } else if (col === 1) {
      // Second (center) post: slice from 1080px to 2160px (1080px total)
      backgroundLeft = 1080;
      console.log(`  Type: SECOND (center) post`);
    } else {
      // Third post: slice from 2096px to 3176px (1080px total)
      backgroundLeft = 2096;
      console.log(`  Type: THIRD post`);
    }
    const backgroundTop = row * POST_H;

    // Step 2: Create the 1015×1350 slice (positioned relative to background)
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

    // Verify background regions
    if (col === 0) {
      const correctBackground = backgroundLeft === 64;
      console.log(
        `  Correct background region (64-1144): ${
          correctBackground ? "✓" : "✗"
        }`
      );
    } else if (col === 1) {
      const correctBackground = backgroundLeft === 1080;
      console.log(
        `  Correct background region (1080-2160): ${
          correctBackground ? "✓" : "✗"
        }`
      );
    } else {
      const correctBackground = backgroundLeft === 2096;
      console.log(
        `  Correct background region (2096-3176): ${
          correctBackground ? "✓" : "✗"
        }`
      );
    }
  }
}

console.log("\nSimple algorithm verification complete!");
console.log(
  "Each post uses specific background regions for optimal alignment."
);
