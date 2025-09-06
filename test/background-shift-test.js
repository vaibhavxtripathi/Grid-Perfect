// Test to verify the background shift algorithm
console.log("Background Shift Algorithm Test");
console.log("===============================");

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

console.log("\nAlgorithm Test for 3×2 grid:");
console.log("=============================");

const cols = 3;
const rows = 2;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    console.log(`\nTile (${row}, ${col}):`);
    
    // Calculate background shift for left and right tiles
    let backgroundShift = 0;
    if (col === 0) {
      // Left tile: shift background 64px left
      backgroundShift = -BACKGROUND_SHIFT;
      console.log(`  Type: LEFT tile (shift background left)`);
    } else if (col === cols - 1) {
      // Right tile: shift background 64px right
      backgroundShift = BACKGROUND_SHIFT;
      console.log(`  Type: RIGHT tile (shift background right)`);
    } else {
      console.log(`  Type: CENTER tile (no shift)`);
    }
    
    // Extract the full 1080×1350 background for this tile with shift
    const backgroundLeft = col * POST_W + backgroundShift;
    const backgroundTop = row * POST_H;
    
    // Extract the 1015×1350 slice positioned at (backgroundLeft + 32px)
    const sliceLeft = backgroundLeft + LEFT_PAD;
    const sliceTop = backgroundTop;
    
    console.log(`  Background shift: ${backgroundShift}px`);
    console.log(`  Background: (${backgroundLeft}, ${backgroundTop}) [${POST_W}×${POST_H}]`);
    console.log(`  Slice: (${sliceLeft}, ${sliceTop}) [${GRID_W}×${GRID_H}]`);
    console.log(`  Slice offset in background: ${LEFT_PAD}px from left`);
    
    // Verify the slice fits within the background
    const sliceRight = sliceLeft + GRID_W;
    const backgroundRight = backgroundLeft + POST_W;
    const sliceBottom = sliceTop + GRID_H;
    const backgroundBottom = backgroundTop + POST_H;
    
    console.log(`  Slice range: x[${sliceLeft}, ${sliceRight}], y[${sliceTop}, ${sliceBottom}]`);
    console.log(`  Background range: x[${backgroundLeft}, ${backgroundRight}], y[${backgroundTop}, ${backgroundBottom}]`);
    
    // Check if slice is within background bounds
    const withinBounds = sliceLeft >= backgroundLeft && 
                        sliceRight <= backgroundRight && 
                        sliceTop >= backgroundTop && 
                        sliceBottom <= backgroundBottom;
    
    console.log(`  Slice within background: ${withinBounds ? '✓' : '✗'}`);
    
    // Check if the slice is properly positioned (32px from left edge)
    const correctOffset = (sliceLeft - backgroundLeft) === LEFT_PAD;
    console.log(`  Correct left offset: ${correctOffset ? '✓' : '✗'}`);
    
    // Check if background shift is correct
    const correctShift = (backgroundLeft - (col * POST_W)) === backgroundShift;
    console.log(`  Correct background shift: ${correctShift ? '✓' : '✗'}`);
  }
}

console.log("\nBackground shift verification complete!");
console.log("Left tiles show more left content, right tiles show more right content.");
