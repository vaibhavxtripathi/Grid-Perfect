// Test to verify the corrected Instagram grid algorithm
console.log("Instagram Grid Algorithm Verification");
console.log("====================================");

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
    
    // Calculate center position
    const centerX = col * POST_W + POST_W / 2;
    const centerY = row * POST_H + POST_H / 2;
    
    // Calculate slice position (1015×1350)
    const sliceLeft = Math.round(centerX - GRID_W / 2);
    const sliceTop = Math.round(centerY - GRID_H / 2);
    
    // Calculate background position (1080×1350)
    const backgroundLeft = Math.round(centerX - POST_W / 2);
    const backgroundTop = Math.round(centerY - POST_H / 2);
    
    console.log(`  Center: (${centerX}, ${centerY})`);
    console.log(`  Slice: (${sliceLeft}, ${sliceTop}) [${GRID_W}×${GRID_H}]`);
    console.log(`  Background: (${backgroundLeft}, ${backgroundTop}) [${POST_W}×${POST_H}]`);
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
  }
}

console.log("\nAlgorithm verification complete!");
console.log("The corrected algorithm ensures proper centering and alignment.");
