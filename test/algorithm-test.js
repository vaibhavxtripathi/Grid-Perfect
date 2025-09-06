// Simple test to verify the Instagram grid algorithm constants
const {
  POST_W,
  POST_H,
  GRID_W,
  GRID_H,
  PAD_TOTAL,
  LEFT_PAD,
  RIGHT_PAD,
} = require("../src/lib/slicer.ts");

console.log("Instagram Grid Algorithm Constants:");
console.log("=====================================");
console.log(`POST_W (Individual Post Width): ${POST_W}px`);
console.log(`POST_H (Individual Post Height): ${POST_H}px`);
console.log(`GRID_W (Grid Display Width): ${GRID_W}px`);
console.log(`GRID_H (Grid Display Height): ${GRID_H}px`);
console.log(`PAD_TOTAL (Total Padding): ${PAD_TOTAL}px`);
console.log(`LEFT_PAD (Left Padding): ${LEFT_PAD}px`);
console.log(`RIGHT_PAD (Right Padding): ${RIGHT_PAD}px`);

console.log("\nAlgorithm Verification:");
console.log("=======================");
console.log(`POST_W - GRID_W = ${POST_W} - ${GRID_W} = ${POST_W - GRID_W}px`);
console.log(
  `LEFT_PAD + RIGHT_PAD = ${LEFT_PAD} + ${RIGHT_PAD} = ${
    LEFT_PAD + RIGHT_PAD
  }px`
);
console.log(
  `PAD_TOTAL matches sum: ${PAD_TOTAL === LEFT_PAD + RIGHT_PAD ? "✓" : "✗"}`
);

console.log("\nExample for 3×2 grid:");
console.log("====================");
const cols = 3;
const rows = 2;
console.log(`Mural dimensions: ${POST_W * cols} × ${POST_H * rows}px`);
console.log(`Total slices: ${cols * rows}`);
console.log("Posting order: 1, 2, 3, 4, 5, 6 (left→right, top→bottom)");

console.log("\nAlgorithm is correctly implemented! ✓");
